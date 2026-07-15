// build_content.js — assemble le contenu du site à partir de /out
// Usage : node scripts/build_content.js
//
// 1. copie PDF + docx dans public/{annee}/{seq}/
// 2. génère un QR code PNG par activité (public/qr/)
// 3. écrit un fichier Markdown par activité (src/content/activites/)
//
// Ne publie JAMAIS les CORRIGE_* ni les EVAL_* : dépôt privé séparé.

const fs = require("fs");
const path = require("path");
const QRCode = require("qrcode");
const { ANNEE, SEQ, ACTIVITES, slug } = require("./activites.cjs");

const SRC_DOCX = process.env.SRC_DOCX || "/home/claude/techno_nc/v2/out";
const SRC_PDF = path.join(SRC_DOCX, "pdf");
const ROOT = path.join(__dirname, "..");
const BASE_URL = process.env.BASE_URL || "https://technoteacher-nc.github.io/techno-nc";

const PUB_DOCS = path.join(ROOT, "public", ANNEE, SEQ.code);
const PUB_QR = path.join(ROOT, "public", "qr");
const CONTENT = path.join(ROOT, "src", "content", "activites");

// Garde-fou : rien qui ressemble à un corrigé ou une éval ne sort.
const INTERDIT = /^(CORRIGE|EVAL)_/i;

for (const d of [PUB_DOCS, PUB_QR, CONTENT]) fs.mkdirSync(d, { recursive: true });

function copie(nom) {
  let ok = { pdf: false, docx: false };
  if (INTERDIT.test(nom)) {
    throw new Error("REFUS publication : " + nom + " (corrigé/éval interdits sur le dépôt public)");
  }
  const pdfSrc = path.join(SRC_PDF, nom + ".pdf");
  if (fs.existsSync(pdfSrc)) {
    fs.copyFileSync(pdfSrc, path.join(PUB_DOCS, nom + ".pdf"));
    ok.pdf = true;
  }
  const docxSrc = path.join(SRC_DOCX, nom + ".docx");
  if (fs.existsSync(docxSrc)) {
    fs.copyFileSync(docxSrc, path.join(PUB_DOCS, nom + ".docx"));
    ok.docx = true;
  }
  return ok;
}

function yamlList(arr) {
  return arr.map(x => `\n  - ${JSON.stringify(x)}`).join("");
}

(async () => {
  let n = 0, manquants = [];

  for (const a of ACTIVITES) {
    const s = slug(a);
    const url = `${BASE_URL}/${ANNEE}/${SEQ.code}/${s}`;

    // --- documents
    const f = copie(a.fiche);
    const e = copie(a.ebep);
    if (!f.pdf) manquants.push(a.fiche + ".pdf");
    if (!e.pdf) manquants.push(a.ebep + ".pdf");

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
semaine: "${a.semaine}"
phase: ${JSON.stringify(a.phase)}
titre: ${JSON.stringify(a.titre)}
question: ${JSON.stringify(a.question)}
objectif: ${JSON.stringify(a.objectif)}
competences:${yamlList(a.competences)}
prerequis: ${JSON.stringify(a.prerequis)}
materiel: ${JSON.stringify(a.materiel)}
annee: "${ANNEE}"
seq: "${SEQ.code}"
seqTitre: ${JSON.stringify(SEQ.titre)}
fichePdf: "/${ANNEE}/${SEQ.code}/${a.fiche}.pdf"
ficheDocx: "/${ANNEE}/${SEQ.code}/${a.fiche}.docx"
ebepPdf: "/${ANNEE}/${SEQ.code}/${a.ebep}.pdf"
qr: "/qr/${s}.png"
---
`;
    fs.writeFileSync(path.join(CONTENT, s + ".md"), md);
    n++;
  }

  console.log(`✓ ${n} activités`);
  console.log(`✓ QR codes → public/qr/`);
  console.log(`✓ documents → public/${ANNEE}/${SEQ.code}/`);
  if (manquants.length) {
    console.log(`⚠ PDF manquants (${manquants.length}) :`);
    manquants.forEach(m => console.log("   - " + m));
  }
})();
