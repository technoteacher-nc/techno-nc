# Académie Technologique — Technologie au collège (NC)

Fiches d'activité de Technologie, cycle 4, **programme 2024 (BO n°9)**,
contextualisées Nouvelle-Calédonie. Collège d'Auteuil, salle 207 TEC 3.

Site : https://techno-nc.github.io/techno-nc

## Ce que contient ce dépôt

- Fiches élève (standard + version adaptée EBEP), PDF et .docx
- Une page web par activité : objectif, compétences BO 2024, prérequis, matériel
- Un QR code par activité, à imprimer sur la fiche papier

**Ne contient pas** les corrigés ni les évaluations — dépôt privé séparé.
Le script `scripts/build_content.js` refuse de publier tout fichier
`CORRIGE_*` ou `EVAL_*`.

## Chaîne de production

```
gen_s5_*.js  →  .docx  →  soffice  →  .pdf
                  │                     │
                  └────────┬────────────┘
                           ▼
              scripts/build_content.js
                           │
              ┌────────────┼─────────────┐
              ▼            ▼             ▼
        public/*.pdf   public/qr/   src/content/
                           │
                           ▼
                      astro build  →  dist/
```

Source unique : `scripts/activites.js`. Un ajout d'activité s'y fait une
seule fois — la page, le QR et les liens en découlent.

## Régénérer

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

1. Ajouter les entrées dans `scripts/activites.js` (changer `SEQ`)
2. `npm run build`

Les URL sont versionnées par année (`/2026/seq05/...`) : les QR codes
imprimés restent valides indéfiniment.

## Licence

Ressources : CC BY-NC-SA 4.0 · Code : MIT
