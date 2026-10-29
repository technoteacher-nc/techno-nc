// Titres d'activité en casse de phrase.
//
// Les titres arrivent des fiches en MAJUSCULES (50 sur 64), sauf ceux de la
// séquence 05. Un titre tout en capitales se lit plus lentement et fait croire
// à deux sites différents. On ne touche pas aux sources : la conversion se fait
// à l'affichage, dans le schéma de contenu, et seulement pour un titre
// (presque) entièrement en capitales. Les noms propres et les sigles sont
// rétablis d'après la liste ci-dessous.
const NOMS: Record<string, string> = {
  'nouvelle-calédonie': 'Nouvelle-Calédonie', 'nouméa': 'Nouméa', 'paris': 'Paris',
  'scratch': 'Scratch', 'filius': 'Filius', 'mbot': 'mBot', 'mblock': 'mBlock', 'mei': 'MEI', 'sketchup': 'SketchUp',
  'ip': 'IP', 'dns': 'DNS', 'url': 'URL', 'gafam': 'GAFAM', 'rgpd': 'RGPD', 'ux': 'UX',
  'led': 'LED', 'pc': 'PC', 'nc': 'NC', 'ia': 'IA', 'ost': 'OST', 'cdc': 'CDC',
};

export function casse(t: string): string {
  const lettres = t.replace(/[^A-Za-zÀ-ÖØ-öø-ÿŒœ]/g, '');
  if (!lettres) return t;
  const capitales = lettres.replace(/[^A-ZÀ-ÖØ-ÞŒ]/g, '').length;
  if (capitales / lettres.length < 0.8) return t;
  let s = t.toLocaleLowerCase('fr-FR')
    .replace(/[\p{L}-]+/gu, mot => NOMS[mot] ?? mot)
    // les « Maisons » du collège (équipes), pas une maison
    .replace(/\bdes maisons\b/g, 'des Maisons');
  // un nom qui commence par une minuscule (mBot, mBlock) la garde en tête de titre
  return /^m[A-Z]/.test(s) ? s : s.charAt(0).toLocaleUpperCase('fr-FR') + s.slice(1);
}

// « Séquence 02 — USAGES » : seul le nom, après le tiret, est en capitales.
export function casseSeq(t: string): string {
  const i = t.indexOf(' — ');
  return i < 0 ? casse(t) : t.slice(0, i + 3) + casse(t.slice(i + 3));
}
