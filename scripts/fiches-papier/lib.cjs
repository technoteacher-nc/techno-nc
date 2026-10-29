// Mise en page des fiches, version 2 : aérée, écrite pour la main.
// Repères : lignes d'écriture à 1 cm, cases de tableau à écrire d'au moins
// 1 cm de haut, cases à cocher en 14 pt, saut de page choisi (jamais une
// partie ou un tableau coupé), noir et gris seulement (photocopie).
const fs = require("fs");
const path = require("path");
const D = require("docx");
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, AlignmentType, BorderStyle, ShadingType, ImageRun, VerticalAlign, HeightRule } = D;

const DIR = __dirname;
const LOGO = fs.readFileSync(path.join(DIR, "media/logo.png"));
const W = 10466, F = "Arial";
const ENCRE = "11223D", GRIS = "5B6675", TRAIT = "AEB7C3", FOND = "EEF1F5";
const CM = 567; // twips par cm

// --- texte -------------------------------------------------------------
let BASE = 22; // 11 pt ; 24 pour les versions adaptées
const setBase = n => { BASE = n; };
const r = (t, o = {}) => new TextRun({ text: t, font: F, size: o.size || BASE, bold: o.b, italics: o.i, color: o.c || "000000", shading: o.fondRun ? { type: ShadingType.CLEAR, color: "auto", fill: o.fondRun } : undefined });
const runs = x => (Array.isArray(x) ? x : [r(x)]);
const p = (x, o = {}) => new Paragraph({
  children: runs(x), alignment: o.al, keepNext: o.kn, keepLines: true, pageBreakBefore: o.saut,
  spacing: { before: o.before ?? 0, after: o.after ?? 80, line: o.line, lineRule: o.line ? "atLeast" : undefined },
  indent: o.ind ? { left: o.ind } : undefined,
});
// phrase à compléter : interligne d'au moins 1 cm pour écrire dans les blancs
const trou = (x, o = {}) => p(x, { line: o.line || Math.round(CM * (BASE > 22 ? 1.1 : 1)), after: o.after ?? 60, before: o.before ?? 0, kn: o.kn });
const B = (n = 14) => "…".repeat(n); // blanc : 14 « … » ≈ 5 cm en 11 pt

// --- tableaux ----------------------------------------------------------
const aucun = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const sans = { top: aucun, bottom: aucun, left: aucun, right: aucun };
const fin = { style: BorderStyle.SINGLE, size: 4, color: TRAIT };
const grilleB = { top: fin, bottom: fin, left: fin, right: fin };
const cell = (kids, w, o = {}) => new TableCell({
  children: Array.isArray(kids) ? kids : [p(kids, { after: 0, al: o.al })],
  width: { size: w, type: WidthType.DXA }, borders: o.borders || grilleB,
  shading: o.fond ? { type: ShadingType.CLEAR, color: "auto", fill: o.fond } : undefined,
  verticalAlign: o.va || VerticalAlign.CENTER,
  margins: { top: o.m ?? 50, bottom: o.m ?? 50, left: 110, right: 110 },
  columnSpan: o.span,
});
const tab = (ws, rows, o = {}) => new Table({ width: { size: ws.reduce((a, b) => a + b, 0), type: WidthType.DXA }, columnWidths: ws, rows, borders: o.borders });
const row = (cells, h, o = {}) => new TableRow({ children: cells, cantSplit: true, tableHeader: o.entete, height: h ? { value: h, rule: o.exact ? HeightRule.EXACT : HeightRule.ATLEAST } : undefined });

// tableau de lecture (compact) ou à écrire (h = hauteur des lignes à remplir)
function grille(ws, head, rows, o = {}) {
  const sz = o.size || BASE - 2;
  const al = i => ((o.centre || []).includes(i) ? AlignmentType.CENTER : AlignmentType.LEFT);
  const ex = rw => String(rw[0]).startsWith("EXEMPLE");
  return tab(ws, [
    row(head.map((h, i) => cell([p([r(h, { b: true, size: sz })], { al: al(i), after: 0, kn: true })], ws[i], { fond: FOND })), null, { entete: true }),
    ...rows.map(rw => row(rw.map((x, i) => cell([p([r(String(x), { size: sz, b: ex(rw) && i === 0, c: ex(rw) ? GRIS : "000000", i: ex(rw) && i > 0 })], { al: al(i), after: 0, kn: true })], ws[i], { fond: o.fondCase && o.fondCase(rw, i) })),
      o.h && !(o.hSaufExemple && ex(rw)) ? o.h : (o.hLecture || null))),
  ]);
}

// lignes d'écriture : un tableau à bordure basse seulement, 1 cm entre lignes
const lignes = (n, o = {}) => tab([o.w || W], Array.from({ length: n }, () => row([cell([p("", { after: 0 })], o.w || W, { borders: { top: aucun, left: aucun, right: aucun, bottom: { style: BorderStyle.DOTTED, size: 6, color: "8A94A3" } }, m: 0 })], Math.round(CM * (o.h || (BASE > 22 ? 1.1 : 1))), { exact: true })));

const coche = (t, o = {}) => p([r("☐  ", { size: BASE + 6 }), ...runs(t)], { after: o.after ?? 40, kn: o.kn, ind: o.ind });
const coches = (items, o = {}) => p(items.flatMap((t, i) => [r((i ? "      " : "") + "☐ ", { size: BASE + 6 }), r(t)]), { after: o.after ?? 80, before: o.before ?? 20 });
const consigne = (t, o = {}) => p([r("▸ ", { b: true, c: ENCRE }), ...runs(t)], { before: o.before ?? 100, after: o.after ?? 60, kn: true });

// --- blocs -------------------------------------------------------------
// En-tête identique aux fiches déjà en ligne : logo, établissement, séquence et
// numéro d'activité, QR code, dans quatre cases encadrées.
function entete({ niveau, sequence, numero, titreCourt, suffixe = "", qr }) {
  const trait = { style: BorderStyle.SINGLE, size: 6, color: "000000" };
  const cadre = { top: trait, bottom: trait, left: trait, right: trait };
  const c = (kids, w) => cell(kids, w, { borders: cadre, m: 60 });
  const t = (x, o = {}) => p([r(x, { size: 15, ...o })], { after: o.after ?? 0, al: o.al });
  return tab([1300, 4200, 3666, 1300], [row([
    c([new Paragraph({ alignment: AlignmentType.CENTER, children: [new ImageRun({ type: "png", data: LOGO, transformation: { width: 62, height: 48 } })] })], 1300),
    c([t("ACADÉMIE TECHNOLOGIQUE", { b: true, size: 18, al: AlignmentType.CENTER, after: 20 }), t("Technologie — Classe de " + niveau, { al: AlignmentType.CENTER }), t("Salle 207 TEC 3", { al: AlignmentType.CENTER })], 4200),
    c([t(sequence, { b: true, after: 10 }), t("ACTIVITÉ N°" + numero + (suffixe ? " · " + suffixe : ""), { after: 10 }), t(titreCourt)], 3666),
    c([new Paragraph({ alignment: AlignmentType.CENTER, children: [new ImageRun({ type: "png", data: fs.readFileSync(path.join(DIR, qr)), transformation: { width: 56, height: 56 } })] })], 1300),
  ])]);
}
const identite = () => p([r("Prénom : ", { size: 18, c: GRIS }), r("…".repeat(22), { size: 18, c: TRAIT }), r("      Classe : ", { size: 18, c: GRIS }), r("…".repeat(8), { size: 18, c: TRAIT }), r("      Date : ", { size: 18, c: GRIS }), r("…".repeat(10), { size: 18, c: TRAIT })], { before: 100, after: 160, line: 400 });
const titre = t => p([r(t, { b: true, size: BASE > 22 ? 36 : 34, c: ENCRE })], { after: 80, kn: true });
const situation = lignesTxt => lignesTxt.map((t, i) => p(t, { after: i === lignesTxt.length - 1 ? 100 : 40 }));
const question = t => p([r("?  ", { b: true, size: BASE + 8, c: ENCRE }), r(t, { b: true, size: BASE + 2 })], { after: 120, kn: true });
const objectif = t => tab([W], [row([cell([p([r("À LA FIN, ", { b: true, size: BASE - 4, c: GRIS }), r(t, { size: BASE })], { after: 0 })], W, { fond: FOND, borders: sans, m: 90 })])]);
const daprestoi = () => [p([r("D'après toi ?", { b: true }), r("  Réponds avant de commencer, même sans être sûr. Ça ne se note pas.", { c: GRIS, size: BASE - 2 })], { before: 160, after: 0, kn: true }), lignes(1)];
// titre de partie : numéro en pastille foncée, filet sous le titre
const partie = (n, t, o = {}) => new Paragraph({
  children: [r(" " + n + " ", { b: true, size: BASE + 4, c: "FFFFFF", fondRun: ENCRE }), r("   " + t, { b: true, size: BASE + 4, c: ENCRE })],
  keepNext: true, pageBreakBefore: o.saut, spacing: { before: o.saut ? 0 : (o.avant ?? 280), after: 100 },
  border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: ENCRE, space: 4 } },
});
const bilan = items => tab([W], [row([cell([
  p([r("JE RETIENS", { b: true, size: BASE - 2, c: ENCRE })], { after: 60, kn: true }),
  ...items.map(t => trou(t, { after: 20 })),
], W, { borders: { top: { style: BorderStyle.SINGLE, size: 12, color: ENCRE }, bottom: fin, left: fin, right: fin }, m: 110, va: VerticalAlign.TOP })])]);
const img = (f, wcm, ratio, o = {}) => new Paragraph({ children: [new ImageRun({ type: "png", data: fs.readFileSync(path.join(DIR, f)), transformation: { width: Math.round(wcm * 37.8), height: Math.round(wcm * 37.8 * ratio) } })], alignment: o.al ?? AlignmentType.CENTER, keepNext: o.kn, spacing: { before: o.before ?? 60, after: o.after ?? 60 } });
// deux colonnes sans bordure (une image à côté d'un tableau, par exemple)
const cote = (ws, kids) => tab(ws, [row(kids.map((k, i) => cell(k, ws[i], { borders: sans, m: 0, va: VerticalAlign.TOP })))]);
const espace = (h = 120) => p("", { after: h });

const doc = children => new Document({
  styles: { default: { document: { run: { font: F, size: BASE } } } },
  sections: [{ properties: { page: { margin: { top: 560, right: 720, bottom: 560, left: 720 } } }, children }],
});
async function ecrire(nom, d) { fs.writeFileSync(path.join(DIR, nom), await Packer.toBuffer(d)); }

module.exports = { D, r, p, trou, B, cell, tab, row, grille, lignes, coche, coches, consigne, entete, identite, titre, situation, question, objectif, daprestoi, partie, bilan, img, cote, espace, doc, ecrire, setBase, W, CM, ENCRE, GRIS, TRAIT, FOND, sans, aucun, fin, AlignmentType, VerticalAlign };
