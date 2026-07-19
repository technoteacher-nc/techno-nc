# Académie Technologique — Technologie au collège (NC)

[![Publier le site](https://github.com/technoteacher-nc/techno-nc/actions/workflows/deploy.yml/badge.svg)](https://github.com/technoteacher-nc/techno-nc/actions/workflows/deploy.yml)

Fiches d'activité de Technologie, cycle 4, **programme 2024 (BO n°9)**,
contextualisées Nouvelle-Calédonie. Collège d'Auteuil, salle 207 TEC 3.

**Site : https://technoteacher-nc.github.io/techno-nc/**

## Ce que contient ce dépôt

- Fiches élève (standard + version adaptée EBEP), PDF et .docx
- Une page web par activité : objectif, compétences BO 2024, prérequis, matériel
- Un QR code par activité, à imprimer sur la fiche papier

**Ne contient pas** les corrigés ni les évaluations — dépôt privé séparé.
Le script `scripts/build_content.cjs` refuse de publier tout fichier
`CORRIGE_*` ou `EVAL_*`.

## Pile technique

- [Astro](https://astro.build) — site 100 % statique, zéro JavaScript côté client
- Sitemap XML, `robots.txt`, balises Open Graph et données structurées
  (schema.org `LearningResource`) générés au build
- Aucun compte, aucun cookie, aucun traceur

## Chaîne de production

```
gen_s5_*.js  →  .docx  →  soffice  →  .pdf
                  │                     │
                  └────────┬────────────┘
                           ▼
              scripts/build_content.cjs
                           │
              ┌────────────┼─────────────┐
              ▼            ▼             ▼
        public/*.pdf   public/qr/   src/content/
                           │
                           ▼
                      astro build  →  dist/
```

Source unique : `scripts/activites.cjs`. Un ajout d'activité s'y fait une
seule fois — la page, le QR et les liens en découlent.

## Développer en local

```bash
npm ci
npm run dev       # serveur local
npm run build     # contenu + site → dist/
npm run preview   # prévisualiser dist/
```

## Régénérer les documents

```bash
# 1. produire les .docx (nécessite shared.js + docx@9.6.1)
cd techno_nc/v2 && node gen_s5_fiches_5e.js && node gen_s5_fiches_4e.js

# 2. convertir en PDF
soffice --headless --convert-to pdf --outdir out/pdf out/*.docx

# 3. assembler le site
cd techno-nc && npm run build
```

Les PDF sont versionnés dans `public/` : la CI n'a pas besoin de LibreOffice.

## Ajouter une séquence

1. Ajouter les entrées dans `scripts/activites.cjs` (changer `SEQ`)
2. `npm run build`

Les URL sont versionnées par année (`/2026/seq05/...`) : les QR codes
imprimés restent valides indéfiniment.

## Visuels de marque

Favicon, icônes et image Open Graph (`public/og-cover.png`) sont versionnés.
Pour les régénérer : `npm i -D sharp && node scripts/gen_visuels.cjs`.

## Déploiement

Chaque push sur `main` déclenche `.github/workflows/deploy.yml` :
build Astro puis publication sur GitHub Pages.

## Licence

Ressources : CC BY-NC-SA 4.0 · Code : MIT
