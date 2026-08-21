// build_content.js — assemble le contenu du site à partir de /out
// Usage : node scripts/build_content.js
//
// 1. copie PDF + docx dans public/{annee}/{seq}/
// 2. génère un QR code PNG par activité (public/qr/)
// 3. écrit un fichier Markdown par activité (src/content/activites/)
//
// Ne publie JAMAIS les CORRIGE_* ni les EVAL_* : dépôt privé séparé.
//
// Multi-séquences (depuis migration seq02/03/04/06, 17/07/2026) :
// pour chaque séquence de activites.cjs::SEQUENCES, on cherche son dossier
// source sous SRC_ROOT/<seq.code>/ (docx) et SRC_ROOT/<seq.code>/pdf/ (pdf).
// Une séquence sans dossier source correspondant est ignorée (déjà publiée
// précédemment, ex. seq05) : ses fichiers publics existants ne sont pas touchés.

const fs = require("fs");
const path = require("path");
const QRCode = require("qrcode");
const { ANNEE, SEQUENCES, slug } = require("./activites.cjs");

const SRC_ROOT = process.env.SRC_ROOT || "C:\\cowork-technoNC\\out";
const ROOT = path.join(__dirname, "..");
const BASE_URL = process.env.BASE_URL || "https://technoteacher-nc.github.io/techno-nc";

const PUB_QR = path.join(ROOT, "public", "qr");
const CONTENT = path.join(ROOT, "src", "content", "activites");

// Garde-fou : rien qui ressemble à un corrigé ou une éval ne sort.
const INTERDIT = /^(CORRIGE|EVAL)_/i;

fs.mkdirSync(PUB_QR, { recursive: true });
fs.mkdirSync(CONTENT, { recursive: true });

// ⚠ NE JAMAIS ÉCRASER UN DOCUMENT DÉJÀ PUBLIÉ.
//
// `out/` est un dépôt de travail figé, antérieur à la réparation des fiches :
// pagination, bandeau d'identité replié dans l'en-tête, schémas corrigés. Le
// 21/08/2026, un `npm run build` a recopié 140 fichiers de `out/` par-dessus
// les fiches réparées — soit, en une commande, l'annulation de tout le travail
// de mise en page. Les DOCX de `public/2026/` sont la source de vérité
// (voir CLAUDE.md) : ce script ne peut que les CRÉER, jamais les remplacer.
const preserve = (src, dest) => {
  if (!fs.existsSync(src)) return false;
  if (fs.existsSync(dest) && !process.argv.includes("--force")) { preserves++; return true; }
  fs.copyFileSync(src, dest);
  return true;
};

let preserves = 0;

function copie(nom, srcDocx, srcPdf, pubDocs) {
  if (!nom) return { pdf: false, docx: false };
  if (INTERDIT.test(nom)) {
    throw new Error("REFUS publication : " + nom + " (corrigé/éval interdits sur le dépôt public)");
  }
  return {
    pdf: preserve(path.join(srcPdf, nom + ".pdf"), path.join(pubDocs, nom + ".pdf")),
    docx: preserve(path.join(srcDocx, nom + ".docx"), path.join(pubDocs, nom + ".docx")),
  };
}

function yamlList(arr) {
  if (!arr || !arr.length) return " []";
  return arr.map(x => `\n  - ${JSON.stringify(x)}`).join("");
}

(async () => {
  let totalN = 0, gardes = 0;
  const manquants = [];
  const ignorees = [];

  for (const { SEQ, ACTIVITES } of SEQUENCES) {
    const srcDocx = path.join(SRC_ROOT, SEQ.code);
    const srcPdf = path.join(srcDocx, "pdf");
    const hasSource = fs.existsSync(srcDocx);
    if (!hasSource) ignorees.push(SEQ.code); // docx/pdf déjà en place : pas de recopie, mais le markdown se régénère quand même

    const pubDocs = path.join(ROOT, "public", ANNEE, SEQ.code);
    fs.mkdirSync(pubDocs, { recursive: true });

    let n = 0;
    for (const a of ACTIVITES) {
      const s = slug(a);
      const url = `${BASE_URL}/${ANNEE}/${SEQ.code}/${s}`;

      // --- documents (uniquement si un dossier source est disponible)
      if (hasSource) {
        const f = copie(a.fiche, srcDocx, srcPdf, pubDocs);
        const e = copie(a.ebep, srcDocx, srcPdf, pubDocs);
        if (a.fiche && !f.pdf) manquants.push(a.fiche + ".pdf");
        if (a.ebep && !e.pdf) manquants.push(a.ebep + ".pdf");
      }

      // --- QR code (pointe vers la page activité, pas vers le PDF :
      //     l'URL de page reste stable même si le nom de fichier change)
      await QRCode.toFile(path.join(PUB_QR, s + ".png"), url, {
        width: 512, margin: 1,
        color: { dark: "#000000", light: "#FFFFFF" },
        errorCorrectionLevel: "M",
      });

      // --- markdown
      const md = `---
code: "${a.code}"
niveau: "${a.niveau}"
niveauLabel: "${a.niveauLabel}"
semaine: "${a.semaine || ""}"
phase: ${JSON.stringify(a.phase || "")}
titre: ${JSON.stringify(a.titre || "")}
question: ${JSON.stringify(a.question || "")}
objectif: ${JSON.stringify(a.objectif || "")}
competences:${yamlList(a.competences)}
prerequis: ${JSON.stringify(a.prerequis || "")}
materiel: ${JSON.stringify(a.materiel || "")}
annee: "${ANNEE}"
seq: "${SEQ.code}"
seqTitre: ${JSON.stringify(SEQ.titre)}
fichePdf: "${a.fiche ? `/${ANNEE}/${SEQ.code}/${a.fiche}.pdf` : ""}"
ficheDocx: "${a.fiche ? `/${ANNEE}/${SEQ.code}/${a.fiche}.docx` : ""}"
ebepPdf: "${a.ebep ? `/${ANNEE}/${SEQ.code}/${a.ebep}.pdf` : ""}"
qr: "/qr/${s}.png"
---
`;
      // ⚠ NE JAMAIS ÉCRASER UN .md QUI EXISTE DÉJÀ.
      //
      // Ce script a longtemps été le seul à produire les fichiers d'activité.
      // Ce n'est plus vrai : `tools/gen-fiches-seq.cjs --md` écrit ceux des
      // séquences 01 et 02, et plusieurs frontmatters ont été enrichis à la
      // main (les compétences T2b/T2c ajoutées à S6-A03 4ème, les versions
      // adaptées de S2-A06 et S2-A07). Le registre `activites.cjs` d'ici, lui,
      // n'a pas suivi.
      //
      // Le 21/08/2026, un simple `npm run build` a donc silencieusement effacé
      // deux compétences du programme et quatre liens de fiche adaptée. Les
      // .md sont désormais une SOURCE versionnée, pas une sortie de build.
      // `--force` reste possible pour une régénération volontaire.
      const dest = path.join(CONTENT, s + ".md");
      if (fs.existsSync(dest) && !process.argv.includes("--force")) { gardes++; continue; }
      fs.writeFileSync(dest, md);
      n++;
    }
    console.log(`✓ ${SEQ.code} (${SEQ.nom}) : ${n} activités`);
    totalN += n;
  }

  console.log(`\n✓ total ${totalN} activité(s) écrite(s)`);
  if (gardes) console.log(`✓ ${gardes} fichier(s) .md préservé(s) — déjà présents, non écrasés (--force pour forcer)`);
  if (preserves) console.log(`✓ ${preserves} document(s) préservé(s) dans public/ — déjà publiés, non remplacés par ceux de out/`);
  console.log(`✓ QR codes → public/qr/`);
  console.log(`✓ documents → public/${ANNEE}/<seq>/`);
  if (ignorees.length) {
    console.log(`⏭ séquences ignorées (pas de dossier source sous ${SRC_ROOT}) : ${ignorees.join(", ")}`);
  }
  if (manquants.length) {
    console.log(`⚠ PDF manquants (${manquants.length}) :`);
    manquants.forEach(m => console.log("   - " + m));
  }
})();
