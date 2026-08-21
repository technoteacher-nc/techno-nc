// typographie-fr.cjs — applique les règles typographiques françaises au site
// construit, dans les nœuds de TEXTE uniquement.
//
// POURQUOI À LA CONSTRUCTION, ET PAS DANS LES SOURCES
//
// Le texte du site vient de partout : des pages .astro, du lexique JSON, des
// quiz, des corrigés, et surtout des fiches extraites de fichiers Word. Exiger
// de celui qui écrit qu'il tape une espace insécable — un caractère invisible,
// absent des claviers — serait intenable : la première correction faite dans
// Word repartirait avec des espaces normales, et le site redeviendrait faux.
//
// La règle est donc appliquée ICI, une fois, sur le HTML produit. Le CI passe
// par `npm run build`, qui enchaîne ce script : le site déployé est corrigé,
// les sources restent lisibles et modifiables au clavier ordinaire.
//
// LES RÈGLES, telles que les donne le Lexique des règles typographiques en
// usage à l'Imprimerie nationale — la référence de l'édition scolaire :
//
//   - espace insécable AVANT  : ; ! ? %  et à l'intérieur des guillemets « »
//   - apostrophe typographique ’ entre deux lettres, jamais l'apostrophe droite
//   - points de suspension … en un seul signe
//
// LE CHOIX DE L'ESPACE. L'Imprimerie nationale demande une espace FINE
// insécable (U+202F) devant ; ! ? et une espace MOT insécable (U+00A0) devant :.
// Ce script pose U+00A0 partout. Raison : U+202F manque encore à certaines
// polices installées sur les postes de collège, et une police qui n'a pas le
// glyphe affiche un rectangle vide au milieu de la phrase. Une espace un peu
// large vaut mieux qu'un carré noir devant un élève.
//
// CE QUI N'EST JAMAIS TOUCHÉ : le contenu des balises (attributs, URL,
// classes), et le texte de <script>, <style>, <code>, <pre>, <kbd>, <samp>.
// Une apostrophe droite dans du code est une apostrophe droite.
//
// Usage : node scripts/typographie-fr.cjs [dossier]   (défaut : dist)

const fs = require('fs');
const path = require('path');

const RACINE = path.join(__dirname, '..');
const DIST = path.resolve(process.argv[2] ? path.join(RACINE, process.argv[2]) : path.join(RACINE, 'dist'));

const NBSP = ' ';
const INTOUCHABLES = new Set(['script', 'style', 'code', 'pre', 'kbd', 'samp', 'textarea']);

/** Applique les règles à un fragment de texte brut (jamais à du balisage). */
function corriger(t) {
  return t
    // Apostrophe typographique, entre deux lettres seulement : « l'élève »
    // devient « l’élève », mais le ' d'un identifiant reste intact.
    //
    // Astro échappe les apostrophes des chaînes interpolées : le HTML porte
    // `&#39;` et non `'`. Sans cette première passe, toutes les citations, tout
    // le lexique et toutes les fiches — c'est-à-dire l'essentiel du texte du
    // site — passaient à travers la règle sans être corrigés.
    // La lettre qui SUIT n'est pas exigée : sur une fiche remplissable,
    // « une suite d'…… » se termine par l'apostrophe, la case de saisie
    // venant juste après dans une autre balise. Ces élisions-là restaient
    // droites. En français, une apostrophe collée à une lettre est toujours
    // une élision — le site n'emploie jamais le ' comme guillemet fermant.
    .replace(/([A-Za-zÀ-ÖØ-öø-ÿ])(?:&#0*39;|&#x0*27;|&apos;)/gi, '$1’')
    .replace(/([A-Za-zÀ-ÖØ-öø-ÿ])'/g, '$1’')

    // Espace insécable devant la ponctuation double. On n'agit que si une
    // espace ORDINAIRE est déjà là : ajouter une espace là où l'auteur n'en a
    // pas mis changerait le texte, et « 12:30 » n'en veut pas.
    .replace(/([^\s  ]) ([;:!?%])/g, '$1' + NBSP + '$2')

    // Guillemets français : insécable à l'intérieur, des deux côtés.
    .replace(/«[ ]?(?![  ])/g, '«' + NBSP)
    .replace(/(?<![  ])[ ]?»/g, NBSP + '»')

    // Points de suspension. Exactement trois points : les longues suites de
    // points sont les lignes de réponse des fiches, on n'y touche pas.
    .replace(/(?<!\.)\.{3}(?!\.)/g, '…');
}

/** Parcourt le HTML et n'applique `corriger` qu'aux nœuds de texte. */
function traiter(html) {
  let sortie = '';
  let i = 0;

  while (i < html.length) {
    const lt = html.indexOf('<', i);

    // Reste du document : du texte jusqu'au bout.
    if (lt === -1) { sortie += corriger(html.slice(i)); break; }

    sortie += corriger(html.slice(i, lt));

    // Commentaire HTML : recopié d'un bloc, il n'a pas d'attributs à suivre.
    if (html.startsWith('<!--', lt)) {
      const fin = html.indexOf('-->', lt);
      const bout = fin > -1 ? fin + 3 : html.length;
      sortie += html.slice(lt, bout);
      i = bout;
      continue;
    }

    // La balise elle-même, recopiée telle quelle. Un `>` peut apparaître dans
    // la valeur d'un attribut : on suit les guillemets pour ne pas s'arrêter
    // au milieu d'une balise.
    let j = lt + 1, guillemet = null;
    while (j < html.length) {
      const c = html[j];
      if (guillemet) { if (c === guillemet) guillemet = null; }
      else if (c === '"' || c === "'") guillemet = c;
      else if (c === '>') break;
      j++;
    }
    sortie += html.slice(lt, j + 1);
    i = j + 1;

    // Élément à contenu BRUT (script, style…). Rien de ce qu'il contient n'est
    // du balisage : seule la chaîne littérale `</nom` y met fin, comme le veut
    // la spécification HTML.
    //
    // C'est ce qui manquait à la première version, et le défaut n'était pas
    // théorique : les quiz embarquent leurs questions dans un
    // `<script type="application/json">`, et une question de la séquence 06
    // contenait un `<` (une comparaison de programmation). L'analyseur le
    // prenait pour une balise, se perdait dans les guillemets du JSON, avalait
    // le `</script>` — et tout le reste de la page échappait à la correction.
    const nom = (html.slice(lt, j + 1).match(/^<([a-zA-Z0-9-]+)/) || [])[1];
    if (!nom || !INTOUCHABLES.has(nom.toLowerCase())) continue;
    if (html.slice(lt, j + 1).endsWith('/>')) continue;

    const ferme = new RegExp('</' + nom + '[\\s>]', 'i');
    const reste = html.slice(i);
    const k = reste.search(ferme);
    if (k === -1) { sortie += reste; i = html.length; continue; }
    sortie += reste.slice(0, k);
    i += k;
  }
  return sortie;
}

// ────────────────────────────────────────────────────────────── exécution

function pages(dir) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir)) {
    const p = path.join(dir, e);
    if (fs.statSync(p).isDirectory()) out.push(...pages(p));
    else if (p.endsWith('.html')) out.push(p);
  }
  return out;
}

const liste = pages(DIST);
if (!liste.length) {
  console.error('typographie-fr : aucun fichier .html dans ' + DIST);
  process.exit(1);
}

let modifiees = 0, apostrophes = 0, insecables = 0, points = 0;

for (const f of liste) {
  const avant = fs.readFileSync(f, 'utf8');
  const apres = traiter(avant);
  if (apres === avant) continue;
  apostrophes += (apres.match(/’/g) || []).length - (avant.match(/’/g) || []).length;
  insecables += (apres.match(/ /g) || []).length - (avant.match(/ /g) || []).length;
  points += (apres.match(/…/g) || []).length - (avant.match(/…/g) || []).length;
  fs.writeFileSync(f, apres, 'utf8');
  modifiees++;
}

console.log('typographie-fr : ' + modifiees + '/' + liste.length + ' pages corrigées  ·  '
  + apostrophes + ' apostrophes, ' + insecables + ' espaces insécables, ' + points + ' points de suspension');
