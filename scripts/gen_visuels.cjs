// Génération ponctuelle des visuels de marque (favicon, icônes, image OG).
// Les PNG produits sont versionnés : ce script ne tourne pas en CI.
// Prérequis : npm i -D sharp (retiré des dépendances une fois les visuels commités).
const sharp = require('sharp');
const path = require('path');
const PUB = path.join(__dirname, '..', 'public');

// Charte du site (src/styles/global.css)
const ENCRE = '#11223D', BLEU = '#1C5FBF', VIF = '#00B3A4', PAPIER = '#FCFCFA',
      MINE = '#5B6B80', TRAIT = '#C3CEDC';
// Phases, ordre pédagogique
const PHASES = [BLEU, '#C8447A', VIF, '#D9791E', '#6B4FCC'];

// La marque : carré turquoise pivoté à 45°, sur fond encre
function icone(taille, marge) {
  const c = taille / 2, d = taille * (0.5 - marge);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${taille}" height="${taille}">
  <rect width="${taille}" height="${taille}" rx="${taille * 0.22}" fill="${ENCRE}"/>
  <rect x="${c - d / 2}" y="${c - d / 2}" width="${d}" height="${d}" rx="${d * 0.14}"
        fill="${VIF}" transform="rotate(45 ${c} ${c})"/>
</svg>`;
}

// Image OG 1200x630 : hero du site + chaîne des phases
function og() {
  const chaine = PHASES.map((coul, i) => {
    const x = 116 + i * 132;
    return `
    <circle cx="${x}" cy="472" r="30" fill="${PAPIER}" stroke="${coul}" stroke-width="5"/>
    <text x="${x}" y="483" text-anchor="middle" font-family="'Segoe UI', Arial, sans-serif"
          font-size="30" font-weight="700" fill="${coul}">${i + 1}</text>`;
  }).join('');
  const liens = PHASES.slice(0, -1).map((_, i) => {
    const x = 116 + i * 132;
    return `<line x1="${x + 34}" y1="472" x2="${x + 98}" y2="472" stroke="${TRAIT}"
          stroke-width="4" stroke-dasharray="2 8" stroke-linecap="round"/>`;
  }).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="${PAPIER}"/>
  <rect x="0" y="622" width="1200" height="8" fill="${VIF}"/>

  <rect x="84" y="66" width="26" height="26" rx="5" fill="${VIF}" transform="rotate(45 97 79)"/>
  <text x="126" y="89" font-family="'Segoe UI', Arial, sans-serif" font-size="27"
        font-weight="700" letter-spacing="1" fill="${ENCRE}">ACADÉMIE TECHNOLOGIQUE</text>

  <line x1="86" y1="168" x2="118" y2="168" stroke="${BLEU}" stroke-width="2"/>
  <text x="130" y="176" font-family="Consolas, monospace" font-size="22" letter-spacing="3"
        fill="${BLEU}">TECHNOLOGIE AU COLLÈGE · NOUVELLE-CALÉDONIE</text>

  <text x="82" y="270" font-family="'Segoe UI', Arial, sans-serif" font-size="82"
        font-weight="700" letter-spacing="-2" fill="${ENCRE}">Toutes tes séquences</text>
  <text x="82" y="366" font-family="'Segoe UI', Arial, sans-serif" font-size="82"
        font-weight="700" letter-spacing="-2" fill="${ENCRE}">de <tspan fill="${BLEU}">Technologie</tspan></text>

  ${liens}${chaine}

  <text x="82" y="586" font-family="Consolas, monospace" font-size="23" fill="${MINE}">Collège d'Auteuil — Programme 2024 (BO n°9) · Fiches, versions adaptées, QR codes</text>
</svg>`;
}

(async () => {
  const fs = require('fs');
  fs.writeFileSync(path.join(PUB, 'favicon.svg'),
    icone(64, 0.19).replace(/\n\s*/g, ' ').trim() + '\n');

  await sharp(Buffer.from(icone(64, 0.19))).resize(32, 32).png().toFile(path.join(PUB, 'favicon-32.png'));
  await sharp(Buffer.from(icone(180, 0.21))).png().toFile(path.join(PUB, 'apple-touch-icon.png'));
  await sharp(Buffer.from(icone(192, 0.21))).png().toFile(path.join(PUB, 'icon-192.png'));
  await sharp(Buffer.from(icone(512, 0.21))).png().toFile(path.join(PUB, 'icon-512.png'));
  await sharp(Buffer.from(og())).png({ quality: 90 }).toFile(path.join(PUB, 'og-cover.png'));
  console.log('visuels ok');
})();
