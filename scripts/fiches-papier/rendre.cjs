// Rend une fiche papier (DOCX) à partir de son contenu structuré
// src/data/fiches/<id>.json, dans la mise en page décrite dans PRODUCT.md
// (« Fiches papier »). Appelé par mettre-en-page.py, qui choisit le niveau de
// compacité et le saut de page.
//   node rendre.cjs <travail> <sortie> --lot lot.json   ([[id, niveau, saut, nom], ...])
// <travail> contient meta.json, les QR et les schémas extraits des DOCX actuels.
const fs = require("fs");
const path = require("path");
const L = require("./lib.cjs");
const { D, r, p, trou, cell, tab, row, lignes, consigne, identite, partie, img, espace, doc, setBase, W, CM, ENCRE, GRIS, FOND, sans, aucun, fin, AlignmentType, VerticalAlign } = L;
const { Paragraph, ImageRun, BorderStyle, ShadingType } = D;

const REPO = path.resolve(__dirname, "../..");
const ICI = path.resolve(process.argv[2] || ".");
const META = JSON.parse(fs.readFileSync(path.join(ICI, "meta.json"), "utf8"));
const LOGO = fs.readFileSync(path.join(__dirname, "media/logo.png"));

// Réglages par niveau de compacité : 0 = aéré, 2 = le plus serré.
const NIV = [
  { h: 1.05, ligne: 1.0, avant: 280, img: 1.0, zone: 1.0 },
  { h: 0.92, ligne: 0.92, avant: 200, img: 0.85, zone: 0.85 },
  { h: 0.82, ligne: 0.85, avant: 150, img: 0.72, zone: 0.6 },
  { h: 0.8, ligne: 0.8, avant: 120, img: 0.65, zone: 0.75, base: 20 },
];

// Un champ de n points (pointillés du DOCX d'origine) devient un blanc ~30 % plus long.
const blanc = pts => "…".repeat(Math.max(4, Math.round(pts / 3)));
const LONG = 55; // au-delà : réponse longue, sur des lignes d'écriture

function entete(m) {
  const trait = { style: BorderStyle.SINGLE, size: 6, color: "000000" };
  const cadre = { top: trait, bottom: trait, left: trait, right: trait };
  const c = (kids, w) => cell(kids, w, { borders: cadre, m: 60 });
  const t = (x, o = {}) => p([r(x, { size: 15, ...o })], { after: o.after ?? 0, al: o.al });
  const qr = fs.readFileSync(path.join(ICI, "qr-" + m.id + ".png"));
  return tab([1300, 4200, 3666, 1300], [row([
    c([new Paragraph({ alignment: AlignmentType.CENTER, children: [new ImageRun({ type: "png", data: LOGO, transformation: { width: 62, height: 48 } })] })], 1300),
    c([t("ACADÉMIE TECHNOLOGIQUE", { b: true, size: 18, al: AlignmentType.CENTER, after: 20 }), t(m.classe, { al: AlignmentType.CENTER }), t("Salle 207 TEC 3", { al: AlignmentType.CENTER })], 4200),
    c([t(m.l1, { b: true, after: 10 }), t(m.l2, { after: 10 }), t(m.l3)], 3666),
    c([new Paragraph({ alignment: AlignmentType.CENTER, children: [new ImageRun({ type: "png", data: qr, transformation: { width: 56, height: 56 } })] })], 1300),
  ])]);
}

// segments [{t:'texte',v}|{t:'champ',points}] -> runs ; les champs longs en fin de
// phrase sont sortis sur des lignes d'écriture (renvoyées à part).
function runsDe(segs, o = {}) {
  const out = []; let lignesApres = 0;
  segs.forEach((s, i) => {
    if (s.t === "texte") out.push(r(s.v, o));
    else if (s.points >= LONG && i === segs.length - 1 && !o.inline) lignesApres = Math.max(1, Math.round(s.points / 120));
    else out.push(r(blanc(s.points), o));
  });
  return { runs: out, lignesApres, aChamp: segs.some(s => s.t === "champ") };
}
// « LIBELLÉ — suite » : le libellé en gras
function libelle(segs) {
  if (!segs.length || segs[0].t !== "texte") return null;
  const m = segs[0].v.match(/^([A-ZÀ-ÖØ-Ý0-9' ]{3,40}?(?: \d)?)\s+—\s+(.*)$/s);
  return m ? [{ t: "texte", v: m[1], b: true }, { t: "texte", v: " — " + m[2] }, ...segs.slice(1)] : null;
}
const caseCoche = () => r("☐ ", { size: 28 });

function rendre(id, niv, saut) {
  const N = NIV[niv]; const H = Math.round(CM * N.h); const HL = N.ligne;
  const m = { ...META[id], id };
  const blocs = JSON.parse(fs.readFileSync(path.join(REPO, "src/data/fiches", id + ".json"), "utf8")).blocs;
  setBase(N.base || 22);
  const out = [entete(m), identite()];
  let imgLibres = m.images.slice(); const imgSchemas = new Set();
  blocs.forEach(b => { if (b.type === "schema") imgSchemas.add(b.index); });
  const imgsZone = m.images.filter((_, k) => !imgSchemas.has(k));
  let nPartie = 0;
  for (let k = 0; k < blocs.length; k++) {
    const b = blocs[k], suiv = blocs[k + 1];
    switch (b.type) {
      case "titre": out.push(p([r(b.texte, { b: true, size: 30, c: ENCRE })], { before: 0, after: 100, kn: true })); break;
      case "situation":
        b.lignes.forEach((l, i) => out.push(p(l, { after: i === b.lignes.length - 1 ? 80 : 30 })));
        out.push(p([r("?  ", { b: true, size: 30, c: ENCRE }), r(b.question, { b: true, size: 24 })], { after: 120, kn: true }));
        break;
      case "partie": {
        nPartie++;
        out.push(partie(b.numero, b.titre, { saut: saut && String(nPartie) === String(saut), avant: N.avant }));
        break;
      }
      case "consigne": out.push(consigne(b.texte, { before: 60 })); break;
      case "texte": {
        const segs = b.segments; const t0 = segs[0]?.t === "texte" ? segs[0].v : "";
        if (/^OBJECTIF\s*[—-]/.test(t0)) {
          const t = t0.replace(/^OBJECTIF\s*[—-]\s*/, "").replace(/^Tu sauras/, "tu sauras");
          out.push(tab([W], [row([cell([p([r("À LA FIN, ", { b: true, size: 18, c: GRIS }), r(t)], { after: 0 })], W, { fond: FOND, borders: sans, m: 90 })])]));
          break;
        }
        if (/^D'APRÈS TOI/.test(t0)) {
          out.push(p([r("D'après toi ?", { b: true }), r("  " + t0.replace(/^D'APRÈS TOI\s*[?—:-]*\s*/, ""), { c: GRIS, size: 20 })], { before: 160, after: 0, kn: true }));
          break; // les lignes qui suivent sont rendues par le bloc « lignes »
        }
        if (/^Banque de mots/i.test(t0)) {
          const R = runsDe(segs);
          out.push(tab([W], [row([cell([p(R.runs, { after: 0 })], W, { fond: FOND, borders: sans, m: 90 })])]));
          break;
        }
        // une phrase suivie de cases à cocher courtes : sur la même ligne
        const lib = libelle(segs);
        const R2 = runsDe(segs);
        const fusionCoches = suiv && suiv.type === "coches" && !R2.aChamp && suiv.items.every(x => x.label.length <= 28) && !/[.!?]$/.test(t0.trim());
        let rr = lib ? [r(lib[0].v, { b: true }), ...runsDe(lib.slice(1)).runs] : R2.runs;
        let la = lib ? runsDe(lib.slice(1)).lignesApres : R2.lignesApres;
        if (fusionCoches) {
          suiv.items.forEach(x => { rr.push(r("   ")); rr.push(caseCoche()); rr.push(r(x.label + (x.points ? " " + blanc(x.points) : ""))); });
          if (suiv.justif) rr.push(r("   car " + blanc(suiv.justif)));
          k++;
        }
        const aBlanc = R2.aChamp || fusionCoches;
        const apresTab = blocs[k - 1] && blocs[k - 1].type === "tableau" ? 100 : 0;
        out.push(aBlanc ? trou(rr, { line: Math.round(CM * HL), after: 40, before: apresTab }) : p(rr, { after: 60, before: apresTab, kn: la > 0 }));
        if (la) out.push(lignes(la, { h: HL }));
        break;
      }
      case "lignes": {
        let n = b.n; while (blocs[k + 1] && blocs[k + 1].type === "lignes") { n += blocs[k + 1].n; k++; }
        out.push(lignes(n, { h: HL }));
        break;
      }
      case "coches": {
        const court = b.items.every(x => x.label.length <= 28) && b.items.length <= 5;
        if (court) {
          const rr = []; b.items.forEach((x, i) => { if (i) rr.push(r("      ")); rr.push(caseCoche()); rr.push(r(x.label + (x.points ? " " + blanc(x.points) : ""))); });
          if (b.justif) rr.push(r("      car " + blanc(b.justif)));
          out.push(trou(rr, { line: Math.round(CM * HL), after: 40 }));
        } else {
          b.items.forEach(x => out.push(p([r("☐  ", { size: 28 }), r(x.label + (x.points ? " " + blanc(x.points) : ""))], { after: 30, line: x.points ? Math.round(CM * HL) : undefined })));
          if (b.justif) out.push(trou("car " + blanc(b.justif), { line: Math.round(CM * HL) }));
        }
        break;
      }
      case "definition":
        out.push(p([r("DÉFINITION — ", { b: true, c: ENCRE }), r(b.label, { b: true })], { before: 120, after: 0, kn: true }));
        out.push(lignes(Math.max(2, b.n), { h: HL }));
        break;
      case "zone": {
        const im = imgsZone.shift();
        out.push(p([r(b.label || "", { b: true })], { before: 100, after: 40, kn: true }));
        if (im) out.push(imageDe(path.join(ICI, im.f), im.cx, im.cy, N.img));
        else { const h = b.hauteur > 500 ? b.hauteur : Math.round(CM * 6); out.push(tab([W], [row([cell([p("", { after: 0 })], W, { borders: { top: fin, bottom: fin, left: fin, right: fin } })], Math.round(h * N.zone), { exact: true })])); }
        break;
      }
      case "schema": {
        const im = m.images[b.index];
        if (im) out.push(imageDe(path.join(ICI, im.f), im.cx, im.cy, N.img));
        else if (b.src) out.push(img(path.join(REPO, "public", b.src), 14 * N.img, 0.5));
        break;
      }
      case "tableau": out.push(tableau(b, H)); break;
      case "bilan": {
        out.push(espace(niv ? 60 : 120));
        out.push(tab([W], [row([cell([
          p([r("JE RETIENS", { b: true, size: 20, c: ENCRE })], { after: 60, kn: true }),
          ...b.lignes.map(l => trou(runsDe(l, { inline: true }).runs, { after: 20, line: Math.round(CM * HL) })),
        ], W, { borders: { top: { style: BorderStyle.SINGLE, size: 12, color: ENCRE }, bottom: fin, left: fin, right: fin }, m: 110, va: VerticalAlign.TOP })])]));
        break;
      }
      case "citation": break; // affichée sur la page de l'activité
    }
  }
  return doc(out);
}

function imageDe(f, cx, cy, k) {
  // taille d'origine (EMU), plafonnée à 17 cm de large, réduite selon le niveau
  const cm = 360000; let w = cx / cm * k, h = cy / cm * k;
  if (w > 17) { h *= 17 / w; w = 17; }
  return new Paragraph({ alignment: AlignmentType.CENTER, keepNext: false, spacing: { before: 60, after: 60 },
    children: [new ImageRun({ type: "png", data: fs.readFileSync(f), transformation: { width: Math.round(w * 37.8), height: Math.round(h * 37.8) } })] });
}

function tableau(b, H) {
  const tot = b.largeurs.reduce((a, x) => a + x, 0);
  const ws = b.largeurs.map(x => Math.round(x * W / tot)); ws[ws.length - 1] += W - ws.reduce((a, x) => a + x, 0);
  const nCol = ws.length; const sz = nCol >= 6 ? 18 : 20;
  const contenu = (c, ic) => {
    const rr = [];
    c.contenu.forEach(x => {
      if (x.t === "coches") x.items.forEach((it, i) => { if (i || rr.length) rr.push(r("  ")); rr.push(r("☐", { size: 26 })); if (it.label) rr.push(r(" " + it.label, { size: sz })); });
      else x.v.forEach(s => rr.push(s.t === "texte" ? r(s.v, { size: sz }) : r(blanc(Math.min(s.points, 40)), { size: sz })));
    });
    return rr;
  };
  const aEcrire = ligne => ligne.some(c => c.contenu.length === 0 || c.contenu.every(x => x.t === "seg" && x.v.every(s => s.t === "champ" || !s.v.trim())) || c.contenu.some(x => x.t === "seg" && x.v.some(s => s.t === "champ")));
  const ex = ligne => { const t = ligne[0]?.contenu?.[0]?.v?.[0]?.v || ""; return /^EXEMPLE/.test(t); };
  const rows = [];
  if (b.entetes && b.entetes.some(h => h)) rows.push(row(b.entetes.map((h, i) => cell([p([r(h || "", { b: true, size: sz })], { after: 0, kn: true })], ws[i], { fond: FOND })), null, { entete: true }));
  b.lignes.forEach(ligne => {
    const e = ex(ligne);
    rows.push(row(ligne.map((c, i) => cell([p(contenu(c, i).map(x => x), { after: 0, kn: true })], ws[i], { fond: c.shade ? "9AA5B4" : undefined })), aEcrire(ligne) && !e ? H : null));
  });
  return tab(ws, rows);
}

module.exports = { rendre };
if (require.main === module) (async () => {
  const [, dir, a, b] = process.argv.slice(2);
  fs.mkdirSync(dir, { recursive: true });
  const lot = JSON.parse(fs.readFileSync(b, "utf8"));
  for (const [id, niv, saut, nom] of lot) fs.writeFileSync(path.join(dir, nom), await D.Packer.toBuffer(rendre(id, niv, saut)));
  console.log("ok", lot.length);
})();
