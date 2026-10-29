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

- [Astro](https://astro.build) — site 100 % statique. Pages lisibles sans JavaScript ;
  un script léger sert seulement à la mémoire de l'élève (activités ouvertes, scores
  de quiz) et aux fiches à remplir en ligne (sauvegarde locale, corrigé chiffré)
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

`scripts/activites.cjs` est le registre des activités : un ajout s'y fait une
fois, la page, le QR et les liens en découlent. Les fichiers
`src/content/activites/*.md` déjà présents sont une source versionnée : le build
ne les écrase pas (voir l'en-tête de `scripts/build_content.cjs`).

## Développer en local

```bash
npm ci
npm run dev       # serveur local
npm run build     # contenu + site → dist/
npm run verifier  # contrôles de dist/ (documents interdits, liens, structure)
npm run couverture # objectifs du programme couverts par les activités
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

### Remettre en page les fiches élèves

Les fiches `FICHE_*` suivent la mise en page décrite dans `PRODUCT.md`
(« Fiches papier »). Pour les régénérer depuis `src/data/fiches/` — après une
nouvelle extraction, ou si l'outil de génération a réécrit les DOCX dans
l'ancien format :

```bash
npm install --no-save docx@9
python3 scripts/fiches-papier/mettre-en-page.py          # toutes les fiches
python3 scripts/fiches-papier/mettre-en-page.py s2-a08-5eme   # une seule
```

Le script reprend l'en-tête, le QR et les schémas du DOCX en place, et choisit
pour chaque fiche le saut de page qui tient en deux pages sans couper de partie.
Il ne touche pas aux versions adaptées (`EBEP_*`).

### Corrigés à remplir en ligne

Les pages « Remplir en ligne » embarquent le corrigé **chiffré**
(`src/data/corriges/`, AES-GCM, clé dérivée par PBKDF2) : il ne s'ouvre qu'avec
le mot de passe donné en classe. Le chiffré est public : sa solidité tient au mot
de passe. Règles à respecter dans l'outil qui les produit :

- un mot de passe différent par activité, d'au moins trois mots tirés au hasard ;
- jamais le mot de passe dans le dépôt, sur le site ou dans un document distribué
  avant la correction.

`npm run verifier` bloque la publication si un corrigé est en clair, s'il a moins
de 310 000 itérations, ou si un sel ou un vecteur d'initialisation est réutilisé.

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
build, `npm run verifier`, contrôle de la couverture, puis publication sur
GitHub Pages. Une erreur bloque la publication.

Chaque pull request lance les mêmes contrôles (`.github/workflows/verifier.yml`),
sans publier.

## Programme et couverture

- `src/data/programme.json` : objectifs d'apprentissage 5ᵉ/4ᵉ du projet
  d'aménagement des programmes (CSP, juin 2025), libellés recopiés à l'identique.
- `src/data/couverture.json` : correspondance activité → objectifs. Tant que
  son `statut` n'est pas `valide`, rien n'est affiché sur le site.
- `npm run couverture -- --md docs/couverture-programme.md` régénère le tableau
  de couverture (jamais dans `public/`).

## Licence

Ressources : CC BY-NC-SA 4.0 · Code : MIT
