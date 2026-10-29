// verifier-dist.cjs — contrôles du site construit, avant publication.
// Usage : npm run build && npm run verifier
//
// Le site est public et lu par des élèves : ce script fait échouer la CI
// plutôt que de laisser partir une page cassée ou un document interdit.
//
//  1. aucun fichier CORRIGE_* ou EVAL_* dans dist/ (même règle que build_content.cjs) ;
//  2. tout corrigé embarqué dans une page `en-ligne` est CHIFFRÉ (sel, iv, charge),
//     jamais en clair ;
//  3. chaque page HTML a lang="fr", un <title> non vide et un seul <h1> ;
//  4. chaque <img> a un attribut alt (vide autorisé pour une image décorative) ;
//  5. chaque lien ou ressource interne (href/src sous la base du site) existe dans dist/.
//
// Lecture seule : ce script ne modifie rien.

const fs = require("fs");
const path = require("path");

const DIST = process.env.DIST || path.join(__dirname, "..", "dist");
const BASE = "/techno-nc";
const INTERDIT = /^(CORRIGE|EVAL)_/i;

if (!fs.existsSync(DIST)) {
  console.error("✗ dist/ absent : lancer `npm run build` d'abord.");
  process.exit(1);
}

const fichiers = [];
(function parcours(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) parcours(p);
    else fichiers.push(p);
  }
})(DIST);

const erreurs = [];
const rel = p => path.relative(DIST, p).split(path.sep).join("/");
const err = (fichier, msg) => erreurs.push(`${rel(fichier)} : ${msg}`);

// 1. documents interdits
for (const f of fichiers) {
  if (INTERDIT.test(path.basename(f))) err(f, "document corrigé/éval publié");
}

// Résout un chemin du site vers un fichier de dist/, ou null.
function existe(url) {
  let p = url.split("#")[0].split("?")[0];
  if (!p.startsWith(BASE)) return true; // hors base : non vérifié ici
  p = decodeURIComponent(p.slice(BASE.length)) || "/";
  const cible = path.join(DIST, p);
  if (fs.existsSync(cible) && fs.statSync(cible).isFile()) return true;
  return fs.existsSync(path.join(cible, "index.html"));
}

const html = fichiers.filter(f => f.endsWith(".html"));
let liens = 0;

for (const f of html) {
  const src = fs.readFileSync(f, "utf8");

  // 2. corrigé embarqué : uniquement sous forme chiffrée
  const paquet = src.match(/<script type="application\/json" id="fl-corrige-donnees">([\s\S]*?)<\/script>/);
  if (paquet) {
    let ok = false;
    try {
      const o = JSON.parse(paquet[1]);
      ok = typeof o.sel === "string" && typeof o.iv === "string" && typeof o.charge === "string"
        && !("champs" in o) && !("notes" in o);
    } catch { ok = false; }
    if (!ok) err(f, "corrigé embarqué non chiffré ou illisible");
  }

  // 3. structure minimale
  if (!/<html[^>]*\slang="fr"/.test(src)) err(f, 'lang="fr" manquant');
  const titre = src.match(/<title>([\s\S]*?)<\/title>/);
  if (!titre || !titre[1].trim()) err(f, "<title> manquant ou vide");
  const h1 = (src.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) err(f, `${h1} <h1> (1 attendu)`);

  // 4. images
  for (const img of src.match(/<img\b[^>]*>/g) || []) {
    if (!/\salt=/.test(img)) err(f, `image sans alt : ${img.slice(0, 80)}`);
  }

  // 5. liens et ressources internes
  for (const m of src.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
    const url = m[1];
    if (!url.startsWith(BASE + "/") && url !== BASE) continue;
    liens++;
    if (!existe(url)) err(f, `lien interne cassé : ${url}`);
  }
}

if (erreurs.length) {
  console.error(`✗ ${erreurs.length} problème(s) dans dist/ :`);
  erreurs.forEach(e => console.error("   - " + e));
  process.exit(1);
}
console.log(`✓ dist/ vérifié : ${html.length} pages, ${liens} liens internes, aucun document interdit, corrigés tous chiffrés.`);
