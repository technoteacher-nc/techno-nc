#!/usr/bin/env python3
"""Remet en page les fiches élèves (FICHE_*.docx et .pdf de public/2026/).

Le contenu vient de src/data/fiches/<id>.json ; l'en-tête (séquence, n°
d'activité, titre court), le QR code et les schémas sont repris du DOCX
actuel de la fiche. Pour chaque fiche, le script essaie un saut de page
avant chaque partie, du réglage le plus aéré au plus serré, et garde le
premier qui donne exactement deux pages ; entre deux sauts valables, celui
qui équilibre le mieux recto et verso. Aucune partie, aucun tableau n'est
donc coupé entre les deux pages.

Usage :  python3 scripts/fiches-papier/mettre-en-page.py [id ...]
Besoins : node + le paquet npm docx (npm install --no-save docx@9), python3-lxml,
LibreOffice (commande soffice, ou variable SOFFICE). Les versions adaptées
(EBEP_*) ne sont pas touchées.
"""
import glob, json, os, re, shutil, subprocess, sys, tempfile, zipfile
from lxml import etree

ICI = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.abspath(os.path.join(ICI, "../.."))
W = '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}'
WP = '{http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing}'
A = '{http://schemas.openxmlformats.org/drawingml/2006/main}'
R = '{http://schemas.openxmlformats.org/officeDocument/2006/relationships}'
NIVEAUX = 4  # réglages de compacité définis dans rendre.cjs (NIV)


def inventaire():
    """id de fiche -> chemin du DOCX publié (activités de séquence et séances de projet)."""
    m = {}
    for f in glob.glob(f'{REPO}/src/content/activites/*.md'):
        g = re.search(r'ficheDocx: "([^"]*)"', open(f, encoding='utf8').read())
        if g: m[os.path.basename(f)[:-3]] = g[1]
    for p in json.load(open(f'{REPO}/src/data/projets.json', encoding='utf8'))['projets']:
        for a in p['activites']:
            if a.get('fichePdf'): m[a['id']] = a['fichePdf'][:-4] + '.docx'
    return m


def extraire(ids, docx_de, travail):
    """En-tête, QR et images de chaque DOCX actuel -> travail/meta.json."""
    meta = {}
    for i in ids:
        z = zipfile.ZipFile(REPO + '/public' + docx_de[i])
        body = etree.fromstring(z.read('word/document.xml')).find(W + 'body')
        rels = {r.get('Id'): r.get('Target') for r in etree.fromstring(z.read('word/_rels/document.xml.rels'))}
        cells = body.find(W + 'tbl').findall('.//' + W + 'tc')
        lignes = lambda c: [t for t in (''.join(x.text or '' for x in p.iter(W + 't')) for p in c.findall('.//' + W + 'p')) if t]
        c1, c2 = lignes(cells[1]), lignes(cells[2])
        blip = cells[3].find('.//' + A + 'blip')
        open(f'{travail}/qr-{i}.png', 'wb').write(z.read('word/' + rels[blip.get(R + 'embed')]))
        images = []
        for el in list(body)[1:]:
            for d in el.iter(WP + 'inline'):
                e, b = d.find(WP + 'extent'), d.find('.//' + A + 'blip')
                nom = f'img-{i}-{len(images)}.png'
                open(f'{travail}/{nom}', 'wb').write(z.read('word/' + rels[b.get(R + 'embed')]))
                images.append({'f': nom, 'cx': int(e.get('cx')), 'cy': int(e.get('cy'))})
        meta[i] = {'docx': docx_de[i], 'classe': c1[1] if len(c1) > 1 else '', 'l1': c2[0],
                   'l2': c2[1] if len(c2) > 1 else '', 'l3': c2[2] if len(c2) > 2 else '', 'images': images}
    json.dump(meta, open(f'{travail}/meta.json', 'w', encoding='utf8'), ensure_ascii=False)


def rendre(travail, sortie, lot):
    os.makedirs(sortie, exist_ok=True)
    json.dump(lot, open(f'{sortie}/lot.json', 'w'))
    subprocess.run(['node', f'{ICI}/rendre.cjs', travail, sortie, '--lot', f'{sortie}/lot.json'], check=True, stdout=subprocess.DEVNULL)
    docs = sorted(glob.glob(f'{sortie}/*.docx'))
    soffice = os.environ.get('SOFFICE', 'soffice').split()
    for j in range(0, len(docs), 40):
        subprocess.run([*soffice, '--headless', '--convert-to', 'pdf', '--outdir', sortie, *docs[j:j + 40]],
                       stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)


def pages(pdf):
    out = subprocess.check_output(['pdfinfo', pdf], text=True)
    return int(re.search(r'Pages:\s+(\d+)', out)[1])


def desequilibre(pdf):
    """Écart entre le bas du texte du recto et celui du verso."""
    x = subprocess.check_output(['pdftotext', '-bbox', pdf, '-'], text=True)
    bas = [max([float(y) for y in re.findall(r'yMax="([0-9.]+)"', pg)] or [0]) for pg in x.split('<page ')[1:]]
    return abs(bas[0] - bas[1])


def main():
    docx_de = inventaire()
    ids = sorted(os.path.basename(f)[:-5] for f in glob.glob(f'{REPO}/src/data/fiches/*.json'))
    if len(sys.argv) > 1: ids = [i for i in ids if i in sys.argv[1:]]
    ids = [i for i in ids if i in docx_de]
    nparties = {i: sum(1 for b in json.load(open(f'{REPO}/src/data/fiches/{i}.json', encoding='utf8'))['blocs'] if b['type'] == 'partie') for i in ids}
    travail = tempfile.mkdtemp(prefix='fiches-papier-')
    extraire(ids, docx_de, travail)
    choix = {}
    for niv in range(NIVEAUX):
        reste = [i for i in ids if i not in choix]
        if not reste: break
        d = f'{travail}/essais{niv}'
        rendre(travail, d, [[i, niv, k, f'{i}__{k}.docx'] for i in reste for k in range(2, nparties[i] + 1)])
        for i in reste:
            ok = [(desequilibre(f'{d}/{i}__{k}.pdf'), k) for k in range(2, nparties[i] + 1)
                  if os.path.exists(f'{d}/{i}__{k}.pdf') and pages(f'{d}/{i}__{k}.pdf') == 2]
            if ok: choix[i] = (niv, min(ok)[1])
        print(f'réglage {niv} : {len(choix)}/{len(ids)} fiches sur deux pages', flush=True)
    for i, (niv, k) in choix.items():
        src = f'{travail}/essais{niv}/{i}__{k}'
        dest = REPO + '/public' + docx_de[i][:-5]
        shutil.copyfile(src + '.docx', dest + '.docx')
        shutil.copyfile(src + '.pdf', dest + '.pdf')
    sans = [i for i in ids if i not in choix]
    print(f'{len(choix)} fiches remises en page' + (f' ; laissées telles quelles (pas de solution en deux pages) : {", ".join(sans)}' if sans else ''))
    shutil.rmtree(travail)


if __name__ == '__main__':
    main()
