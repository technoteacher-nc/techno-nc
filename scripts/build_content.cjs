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

function copie(nom, srcDocx, srcPdf, pubDocs) {
  if (!nom) return { pdf: false, docx: false };
  let ok = { pdf: false, docx: false };
  if (INTERDIT.test(nom)) {
    throw new Error("REFUS publication : " + nom + " (corrigé/éval interdits sur le dépôt public)");
  }
  const pdfSrc = path.join(srcPdf, nom + ".pdf");
  if (fs.existsSync(pdfSrc)) {
    fs.copyFileSync(pdfSrc, path.join(pubDocs, nom + ".pdf"));
    ok.pdf = true;
  }
  const docxSrc = path.join(srcDocx, nom + ".docx");
  if (fs.existsSync(docxSrc)) {
    fs.copyFileSync(docxSrc, path.join(pubDocs, nom + ".docx"));
    ok.docx = true;
  }
  return ok;
}

function yamlList(arr) {
  if (!arr || !arr.length) return " []";
  return arr.map(x => `\n  - ${JSON.stringify(x)}`).join("");
}

(async () => {
  let totalN = 0;
  const manquants = [];
  const ignorees = [];

  for (const { SEQ, ACTIVITES } of SEQUENCES) {
    const srcDocx = path.join(SRC_ROOT, SEQ.code);
    const srcPdf = path.join(srcDocx, "pdf");
    if (!fs.existsSync(srcDocx)) {
      ignorees.push(SEQ.code);
      continue;
    }

    const pubDocs = path.join(ROOT, "public", ANNEE, SEQ.code);
    fs.mkdirSync(pubDocs, { recursive: true });

    let n = 0;
    for (const a of ACTIVITES) {
      const s = slug(a);
      const url = `${BASE_URL}/${ANNEE}/${SEQ.code}/${s}`;

      // --- documents
      const f = copie(a.fiche, srcDocx, srcPdf, pubDocs);
      const e = copie(a.ebep, srcDocx, srcPdf, pubDocs);
      if (a.fiche && !f.pdf) manquants.push(a.fiche + ".pdf");
      if (a.ebep && !e.pdf) manquants.push(a.ebep + ".pdf");

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
      fs.writeFileSync(path.join(CONTENT, s + ".md"), md);
      n++;
    }
    console.log(`✓ ${SEQ.code} (${SEQ.nom}) : ${n} activités`);
    totalN += n;
  }

  console.log(`\n✓ total ${totalN} activités`);
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
