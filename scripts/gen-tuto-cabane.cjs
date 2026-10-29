// gen-tuto-cabane.cjs — dessine les étapes du tuto SketchUp « la cabane ».
// Usage : node scripts/gen-tuto-cabane.cjs
//
// Chaque étape est calculée à partir des vraies cotes du croquis (en m, ici
// converties en cm pour le calcul) et projetée en
// perspective axonométrique, vue de devant-gauche, comme la vue de départ de
// SketchUp. Le dessin est donc juste : ce que l'élève voit sur la fiche est ce
// qu'il doit obtenir. Sortie : src/visuels/tuto-cabane/etape-NN.svg

const fs = require("fs");
const path = require("path");

const OUT = path.join(__dirname, "..", "src", "visuels", "tuto-cabane");
fs.mkdirSync(OUT, { recursive: true });

// --- cotes (cm), axes SketchUp : x rouge, y vert, z bleu
const L = 500, P = 300, E = 20;      // dalle 500 × 300, épaisseur 20
const T = 100;                        // terrasse devant la cabane
const H = 200, F = 100;               // hauteur des murs, montée du faîtage
const PORTE = { y: 110, l: 80, h: 180 };

// --- projection : l'observateur regarde depuis (−x, −y, +z)
const V = [-1, -1, 1];
const S2 = Math.SQRT2, S6 = Math.sqrt(6);
const ecran = ([x, y, z]) => [(x - y) / S2, (x + y + 2 * z) / S6];
const prof = ([x, y, z]) => x * V[0] + y * V[1] + z * V[2];

const C = {
  encre: "#11223D", bleu: "#1C5FBF", papier: "#FCFCFA", calque: "#EDF1F6",
  ombre: "#DCE3EC", trait: "#C3CEDC", beton: "#D5D9DE", bois: "#EBDDC3",
  boisOmbre: "#DCCBA9", toit: "#B9553C", toitClair: "#C96A50", porte: "#8C6A45",
};

// Une face : sommets 3D, normale, couleur. Visible si sa normale regarde l'observateur.
const face = (pts, n, fill, extra = {}) => ({ pts, n, fill, ...extra });
const visible = f => f.n[0] * V[0] + f.n[1] * V[1] + f.n[2] * V[2] > 0;

function boite(x0, y0, z0, x1, y1, z1, c) {
  return [
    face([[x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]], [0, 0, 1], c.dessus),
    face([[x0, y0, z0], [x0, y1, z0], [x0, y1, z1], [x0, y0, z1]], [-1, 0, 0], c.face),
    face([[x0, y0, z0], [x1, y0, z0], [x1, y0, z1], [x0, y0, z1]], [0, -1, 0], c.cote),
  ];
}

const dalle = (c = {}) => boite(0, 0, 0, L, P, E, { dessus: C.calque, face: C.papier, cote: C.ombre, ...c });
const z1 = E, z2 = E + H, z3 = E + H + F;

function cabaneBloc(c = {}) {
  return boite(T, 0, z1, L, P, z2, { dessus: C.calque, face: C.papier, cote: C.ombre, ...c });
}

function cabaneToit(c = {}) {
  const k = { face: C.papier, cote: C.ombre, pan: C.calque, pan2: C.calque, ...c };
  return [
    // pignon avant (x = T) : un pentagone
    face([[T, 0, z1], [T, P, z1], [T, P, z2], [T, P / 2, z3], [T, 0, z2]], [-1, 0, 0], k.face),
    // mur latéral (y = 0)
    face([[T, 0, z1], [L, 0, z1], [L, 0, z2], [T, 0, z2]], [0, -1, 0], k.cote),
    // pan gauche (côté y = 0) et pan droit
    face([[T, 0, z2], [L, 0, z2], [L, P / 2, z3], [T, P / 2, z3]], [0, -F, P / 2], k.pan),
    face([[T, P / 2, z3], [L, P / 2, z3], [L, P, z2], [T, P, z2]], [0, F, P / 2], k.pan2),
  ];
}

function porte(fill, trait) {
  const { y, l, h } = PORTE, x = T - 0.5;
  return [face([[x, y, z1], [x, y + l, z1], [x, y + l, z1 + h], [x, y, z1 + h]], [-1, 0, 0], fill, { devant: true, trait })];
}

// Lignes : de construction (pointillés) ou mises en évidence (bleu).
const ligne = (a, b, style) => ({ a, b, style });

function rendu(faces, lignes = []) {
  const vis = faces.filter(visible);
  vis.sort((f, g) => (f.devant ? 1 : 0) - (g.devant ? 1 : 0)
    || prof(centre(f.pts)) - prof(centre(g.pts)));
  const tous = [...vis.flatMap(f => f.pts), ...lignes.flatMap(l => [l.a, l.b])].map(ecran);
  const xs = tous.map(p => p[0]), ys = tous.map(p => p[1]);
  const m = 14, minX = Math.min(...xs), maxX = Math.max(...xs), minY = Math.min(...ys), maxY = Math.max(...ys);
  const ech = 300 / Math.max(maxX - minX, maxY - minY);
  const w = Math.round((maxX - minX) * ech + 2 * m), h = Math.round((maxY - minY) * ech + 2 * m);
  const pt = p => { const [x, y] = ecran(p); return [((x - minX) * ech + m).toFixed(1), ((maxY - y) * ech + m).toFixed(1)]; };
  const poly = f => `<polygon points="${f.pts.map(p => pt(p).join(",")).join(" ")}" fill="${f.fill}" stroke="${f.trait || C.encre}" stroke-width="${f.trait ? 2.8 : 1.6}" stroke-linejoin="round"/>`;
  const trait = l => {
    const [x1, y1] = pt(l.a), [x2, y2] = pt(l.b);
    return l.style === "construction"
      ? `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${C.encre}" stroke-width="1.2" stroke-dasharray="5 4"/>`
      : `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${C.bleu}" stroke-width="3.2" stroke-linecap="round"/>`;
  };
  return { w, h, corps: vis.map(poly).join("\n  ") + "\n  " + lignes.map(trait).join("\n  ") };
}

const centre = pts => pts.reduce((s, p) => s.map((v, i) => v + p[i] / pts.length), [0, 0, 0]);

const etapes = [
  // 1 · le rectangle au sol
  [[face([[0, 0, 0], [L, 0, 0], [L, P, 0], [0, P, 0]], [0, 0, 1], C.calque)], [], "Un rectangle de 5 m × 3 m posé sur le sol, entre les axes rouge et vert."],
  // 2 · la dalle
  [dalle(), [], "La dalle : le rectangle tiré de 0,2 m vers le haut."],
  // 3 · la ligne de construction à 100 cm
  [dalle(), [ligne([T, 0, E], [T, P, E], "construction")], "Une ligne en pointillés à 1 m du bord : elle sépare la terrasse de la cabane."],
  // 4 · le sol de la cabane
  [[...dalle(), face([[T, 0, E + .2], [L, 0, E + .2], [L, P, E + .2], [T, P, E + .2]], [0, 0, 1], "#D6E3F6", { devant: true, trait: C.bleu })],
    [ligne([T, 0, E], [T, P, E], "construction")], "Le rectangle du sol de la cabane, de la ligne en pointillés jusqu'au fond de la dalle."],
  // 5 · les murs
  [[...dalle(), ...cabaneBloc()], [], "Le volume de la cabane : le rectangle tiré de 2 m."],
  // 6 · le faîtage
  [[...dalle(), ...cabaneBloc()], [ligne([T, P / 2, z2], [L, P / 2, z2])], "Une ligne qui relie les milieux des deux petits côtés du dessus."],
  // 7 · le toit
  [[...dalle(), ...cabaneToit()], [ligne([T, P / 2, z3], [L, P / 2, z3])], "La ligne montée de 1 m : le toit à deux pans apparaît tout seul."],
  // 8 · le repère de la porte
  [[...dalle(), ...cabaneToit()], [ligne([T - .5, PORTE.y, z1], [T - .5, PORTE.y, z2 + 30], "construction")], "Une ligne en pointillés à 1,1 m du bord gauche du mur avant."],
  // 9 · la porte dessinée
  [[...dalle(), ...cabaneToit(), ...porte("#D6E3F6", C.bleu)], [], "Le rectangle de la porte, 0,8 m × 1,8 m, posé sur le bas du mur."],
  // 10 · la porte creusée
  [[...dalle(), ...cabaneToit(), ...porte(C.trait)], [], "La porte poussée de 0,1 m dans le mur : elle se creuse."],
  // 11 · les matières
  [[...dalle({ dessus: C.beton, face: "#E4E7EA", cote: "#C9CED4" }),
    ...cabaneToit({ face: C.bois, cote: C.boisOmbre, pan: C.toitClair, pan2: C.toit }), ...porte(C.porte)],
    [], "Les matières : béton pour la dalle, bois pour les murs, tuiles pour le toit."],
];

etapes.forEach(([faces, lignes, desc], i) => {
  const n = String(i + 1).padStart(2, "0");
  const { w, h, corps } = rendu(faces, lignes);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="Étape ${i + 1} : ${desc}" class="visuel-svg">
  ${corps}
</svg>
`;
  fs.writeFileSync(path.join(OUT, `etape-${n}.svg`), svg);
});
console.log(`✓ ${etapes.length} étapes → ${path.relative(process.cwd(), OUT)}`);
