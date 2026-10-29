// couverture.cjs — couverture des objectifs du programme par les activités.
// Usage : npm run couverture            (affiche le tableau)
//         npm run couverture -- --md F  (l'écrit aussi dans le fichier F)
//
// Sources : src/data/programme.json (objectifs, libellés exacts) et
// src/data/couverture.json (correspondance activité → objectifs).
// Échoue si la correspondance cite un objectif inconnu, une activité
// inexistante, ou un objectif d'un autre niveau que l'activité.
// Le rapport n'est jamais écrit dans public/ : il ne concerne que l'enseignant.

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const prog = JSON.parse(fs.readFileSync(path.join(ROOT, "src/data/programme.json"), "utf8"));
const couv = JSON.parse(fs.readFileSync(path.join(ROOT, "src/data/couverture.json"), "utf8"));
const projets = JSON.parse(fs.readFileSync(path.join(ROOT, "src/data/projets.json"), "utf8"));

// Activités connues et leur niveau
const niveaux = {};
for (const f of fs.readdirSync(path.join(ROOT, "src/content/activites"))) {
  const m = f.match(/^(.+)\.md$/);
  if (m) niveaux[m[1]] = m[1].slice(-4);
}
for (const p of Array.isArray(projets) ? projets : projets.projets) {
  for (const a of p.activites) niveaux[a.id] = p.niveau;
}

const objectifs = {};
for (const partie of prog.parties) {
  for (const o of partie.objectifs) objectifs[o.id] = { ...o, partie: partie.nom, theme: partie.theme, par: [] };
}

const erreurs = [];
for (const [act, ids] of Object.entries(couv.activites)) {
  if (!niveaux[act]) { erreurs.push(`activité inconnue : ${act}`); continue; }
  for (const id of ids) {
    const o = objectifs[id];
    if (!o) erreurs.push(`${act} : objectif inconnu ${id}`);
    else if (o.niveau !== niveaux[act]) erreurs.push(`${act} (${niveaux[act]}) : objectif ${id} de ${o.niveau}`);
    else o.par.push(act);
  }
}
const absentes = Object.keys(niveaux).filter(a => !(a in couv.activites) && !a.startsWith("amplificateur-passif"));
if (erreurs.length) {
  console.error("✗ couverture.json incohérent :");
  erreurs.forEach(e => console.error("   - " + e));
  process.exit(1);
}

const lignes = [
  "# Couverture des objectifs du programme",
  "",
  `Statut de la correspondance : **${couv.statut}**. Source des objectifs : ${prog.source}`,
  "",
  "Généré par `npm run couverture` — ne pas éditer à la main.",
  "",
];
const ETIQ = { "5eme": "5ᵉ", "4eme": "4ᵉ", "3eme": "3ᵉ" };
for (const niv of ["5eme", "4eme", "3eme"]) {
  const liste = Object.values(objectifs).filter(o => o.niveau === niv);
  const couverts = liste.filter(o => o.par.length);
  lignes.push(`## ${ETIQ[niv]} — ${couverts.length}/${liste.length} objectifs travaillés`, "");
  if (niv === "3eme") lignes.push("Les séances du projet de 3ᵉ ne sont pas encore rattachées aux objectifs : voir `docs/progression-3eme.md`.", "");
  lignes.push("| Thème | Partie | Objectif | Activités |", "|---|---|---|---|");
  for (const o of liste) {
    lignes.push(`| ${o.theme} | ${o.partie} | ${o.libelle} | ${o.par.length ? o.par.join(", ") : "**aucune**"} |`);
  }
  lignes.push("");
}
const sans = Object.entries(couv.activites).filter(([, ids]) => !ids.length).map(([a]) => a);
lignes.push(`## Activités sans objectif direct identifié (${sans.length})`, "", sans.join(", ") || "aucune", "");
if (absentes.length) lignes.push(`## Activités absentes de la correspondance (${absentes.length})`, "", absentes.join(", "), "");

const md = lignes.join("\n");
console.log(md);
const i = process.argv.indexOf("--md");
if (i > 0 && process.argv[i + 1]) {
  const dest = path.resolve(process.argv[i + 1]);
  if (dest.startsWith(path.join(ROOT, "public")) || dest.startsWith(path.join(ROOT, "dist"))) {
    console.error("✗ refus : le rapport de couverture ne va pas dans public/ ni dist/.");
    process.exit(1);
  }
  fs.writeFileSync(dest, md + "\n");
}
