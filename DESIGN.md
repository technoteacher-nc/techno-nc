---
name: Académie Technologique
description: Le carnet de plans d'un atelier de Technologie, pas un manuel scolaire numérisé.
colors:
  encre: "#11223D"
  bleu: "#1C5FBF"
  vif: "#00B3A4"
  papier: "#FCFCFA"
  calque: "#EDF1F6"
  trait: "#C3CEDC"
  mine: "#5B6B80"
  phase-analyser: "#1C5FBF"
  phase-representer: "#C8447A"
  phase-modeliser: "#00B3A4"
  phase-fabriquer: "#D9791E"
  phase-produire: "#6B4FCC"
typography:
  display:
    fontFamily: "'Space Grotesk', ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 6.5vw, 3.4rem)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  title:
    fontFamily: "'Space Grotesk', ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.35rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  body:
    fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "ui-monospace, 'SF Mono', Menlo, Consolas, monospace"
    fontSize: "0.72rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.14em"
rounded:
  chip: "100px"
  card: "10px"
  circle: "50%"
spacing:
  xs: "0.35rem"
  sm: "0.6rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2.5rem"
  2xl: "4rem"
components:
  button-primary:
    backgroundColor: "{colors.encre}"
    textColor: "{colors.papier}"
    rounded: "{rounded.chip}"
    padding: "0.7rem 1.15rem"
  button-primary-hover:
    backgroundColor: "{colors.bleu}"
    textColor: "{colors.papier}"
    rounded: "{rounded.chip}"
  button-secondary:
    backgroundColor: "{colors.papier}"
    textColor: "{colors.encre}"
    rounded: "{rounded.chip}"
    padding: "0.7rem 1.15rem"
  card-niveau:
    backgroundColor: "{colors.papier}"
    textColor: "{colors.encre}"
    rounded: "{rounded.card}"
    padding: "1.5rem"
  chain-node:
    backgroundColor: "{colors.papier}"
    rounded: "{rounded.circle}"
    width: "40px"
    height: "40px"
---

# Design System: Académie Technologique

## 1. Overview

**Creative North Star : « Le carnet de plans de l'atelier »**

Ce n'est pas un site web scolaire, c'est le carnet de plans d'un enseignant de Technologie ouvert sur la table : traits de construction, cotes, grilles, annotations à la main. Chaque page ressemble à un dessin technique qu'on pourrait retrouver punaisé dans l'atelier 207 TEC 3, pas à un cours importé dans un CMS. La densité d'information reste élevée mais jamais chargée : on est dans la précision d'un plan, pas dans le bruit visuel.

Le système rejette explicitement l'esthétique « application pour enfants » (mascottes, couleurs bonbon, formes arrondies façon primaire) et l'esthétique « SaaS générique » (dégradés violets, illustrations flat interchangeables, hero à gros chiffre). Un collégien de 11-15 ans doit sentir qu'on s'adresse à lui comme à un futur technicien, pas comme à un enfant qu'on occupe.

Contrainte non négociable : la 3G calédonienne est la ligne de base de conception, pas le cas dégradé. Un seul fichier de police (variable, sous-coupé aux caractères latins), zéro dépendance JavaScript côté client, images strictement optionnelles. La sobriété technique du système est autant un choix esthétique qu'une décision de performance — les deux se renforcent.

**Key Characteristics :**
- Fond papier clair, encre foncée, aucun noir pur ni blanc pur
- Une seule couleur d'accent vive (turquoise) réservée à ce qui progresse réellement
- Typographie display géométrique (Space Grotesk) pour les titres, texte courant en pile système
- Aucune ombre : la profondeur vient du trait et du contraste de fond, jamais du flou
- La couleur ne porte jamais seule une information : toujours doublée d'un texte ou d'une forme

## 2. Colors

Palette resserrée : une encre, un bleu de tracé, un seul accent vif, trois neutres froids. Cinq couleurs de phase s'ajoutent pour coder la progression dans une séquence, jamais pour décorer.

### Primary
- **Turquoise de progression** (`#00B3A4`) : l'unique accent vif du système. Réservé à ce qui avance réellement — le marqueur de marque, le soulignement du mot-clé en hero, la phase « Modéliser ». Sa rareté est le signal : s'il apparaît, quelque chose progresse.

### Secondary
- **Bleu de tracé** (`#1C5FBF`) : la couleur des liens et des traits de construction. Utilisé pour les eyebrows, les liens de texte, la phase « Analyser ». C'est le bleu d'un stylo à bille sur un plan, pas un bleu corporate.

### Neutral
- **Encre** (`#11223D`) : texte principal, fonds forts (en-tête, bouton principal). Jamais de noir pur : cette encre reste bleutée, cohérente avec le bleu de tracé.
- **Papier** (`#FCFCFA`) : fond de page. Jamais de blanc pur — un blanc légèrement chaud, comme du papier réel.
- **Calque** (`#EDF1F6`) : aplat froid pour les surfaces survolées ou actives (nav courante, hover de carte). Le nom vient du calque de dessin technique.
- **Trait** (`#C3CEDC`) : bordures, séparateurs, pointillés de la chaîne d'activités.
- **Mine** (`#5B6B80`) : texte secondaire, légendes, métadonnées. « Mine » comme la mine de crayon — plus clair que l'encre, jamais gris neutre.

### Named Rules
**La règle de la rareté du vif.** Le turquoise ne dépasse jamais 10 % d'une page. S'il se retrouve sur plus d'un élément par écran (hors code couleur de phase), c'est qu'il a perdu son sens de signal de progression.

**La règle du double codage.** Aucune information ne repose sur la couleur seule. Le texte de la phase reste toujours visible à côté de sa pastille de couleur ; un badge de progression porte toujours un chiffre ou un mot, jamais une couleur nue.

## 3. Typography

**Display Font :** Space Grotesk (variable, 500-700), avec repli `ui-sans-serif, system-ui, sans-serif`
**Body Font :** pile système (`-apple-system, 'Segoe UI', Roboto`) — zéro poids réseau supplémentaire
**Label/Mono Font :** pile monospace système (`ui-monospace, 'SF Mono', Menlo, Consolas`)

**Character :** Space Grotesk apporte la géométrie technique (le O presque carré, les terminaisons franches) sans tomber dans le futurisme froid. Le monospace en petites capitales espacées habille tout ce qui est repère ou métadonnée — eyebrows, labels de phase, poids de fichier — comme des annotations de plan tracées à la règle.

### Hierarchy
- **Display** (700, `clamp(2rem, 6.5vw, 3.4rem)`, 1.02) : le H1 de chaque page (accueil, niveau, activité). Un seul par page.
- **Title** (700, 1.35rem, 1.2) : titres de séquence, titres de section.
- **Body** (400, 17px, 1.6) : texte courant, questions d'activité, descriptions. Plafonné à 68-75ch de large.
- **Label** (600, 0.7-0.85rem, 1.4, majuscules + tracking 0.1-0.14em) : eyebrows, badges de phase, navigation, métadonnées de fichier.

### Named Rules
**La règle du monospace pour les faits, du display pour les titres.** Tout ce qui est mesurable, daté ou classable (poids de fichier, code de séquence, étape n/n) passe en monospace ; tout ce qui nomme une activité ou une section passe en Space Grotesk. Ne jamais les inverser.

## 4. Elevation

Système plat par doctrine : aucune ombre portée nulle part dans le code actuel. La profondeur se lit dans le contraste de fond (papier → calque au survol) et dans l'épaisseur/couleur du trait (1px `trait` au repos, `encre` ou `bleu` à l'état actif), jamais dans le flou. C'est cohérent avec la métaphore du plan technique : un dessin d'ingénieur n'a pas d'ombre portée, il a des traits plus ou moins appuyés.

### Named Rules
**La règle du plan plat.** Aucun `box-shadow` décoratif. Si un élément a besoin de se détacher, on épaissit son trait ou on bascule son fond sur `calque`/`encre` — jamais un flou.

## 5. Components

### Buttons
- **Forme :** pilule pleine (`border-radius: 100px`), jamais anguleuse.
- **Primaire (`.btn--fort`) :** fond `encre`, texte `papier`, bordure `encre`. Au survol, bascule sur `bleu` (fond + bordure) — jamais d'assombrissement générique.
- **Secondaire (`.btn`) :** fond `papier`, bordure 1.5px `trait`, texte `encre`. Au survol, la bordure devient `encre`.
- **Métadonnée intégrée (`.btn-meta`) :** un fragment monospace (format + poids) séparé par un trait vertical fin à l'intérieur même du bouton — le bouton annonce honnêtement son coût réseau avant le clic.

### Cartes (niveau, synthèse)
- **Forme du coin :** 10px (`--r`), jamais pleinement arrondi.
- **Fond :** `papier` au repos, `calque` au survol.
- **Bordure :** 1.5px `trait` au repos, `encre` au survol — pas de halo, pas d'ombre.
- **Padding interne :** 1.25-1.5rem.
- **Flèche `→` :** apparaît en semi-transparence (opacité 0.35-1) et glisse de 3px au survol ; seul mouvement du système avec les pastilles de la chaîne.

### La chaîne d'activités (composant signature)
- **Concept :** chaque séquence est une chaîne verticale de médaillons numérotés reliés par un trait pointillé — littéralement le schéma d'un processus, pas une liste.
- **Médaillon :** cercle 40px, fond `papier`, bordure 2px de la couleur de la phase (`--phase`), numéro en Space Grotesk 700.
- **Trait de liaison :** dégradé répété vertical 2px, couleur `trait`, qui matérialise la dépendance entre deux étapes.
- **Badge de phase :** pilule avec pastille pleine 6px de la couleur de phase + le nom de la phase en toutes lettres — jamais la pastille seule.

### Navigation
- **En-tête :** collant (`position: sticky`), fond papier à 90 % d'opacité + flou léger (8px) pour rester lisible au défilement sans peser sur le rendu (le flou est un effet CSS pur, aucune dépendance).
- **Liens :** Space Grotesk 600, pilule au survol (fond `calque`), état actif en fond `encre` plein.
- **Marque :** losange turquoise pivoté à 45° devant le nom — seul usage du logo dans la navigation.

## 6. Do's and Don'ts

### Do :
- **Do** garder le turquoise (`#00B3A4`) sous les 10 % de couverture visuelle d'un écran — c'est le signal de progression, pas une couleur de marque à étaler.
- **Do** doubler systématiquement toute couleur porteuse de sens (phase, statut) d'un texte ou d'un mot visible à côté.
- **Do** préférer un trait plus épais ou un fond `calque` à toute tentation d'ombre portée pour créer de la hiérarchie.
- **Do** afficher le poids et le format d'un fichier avant le téléchargement (déjà en place sur les boutons `.btn-meta`) — c'est un principe de respect du réseau 3G, pas un détail cosmétique.
- **Do** utiliser le monospace pour tout repère chiffré ou daté (poids, étape n/n, semaine), le Space Grotesk pour tout ce qui nomme une activité.

### Don't :
- **Don't** ajouter de mascotte, de couleur bonbon ou de forme arrondie façon application pour primaire — ce sont des collégiens de 11-15 ans, pas des enfants du premier degré.
- **Don't** utiliser de dégradé décoratif, d'illustration flat-design générique, ni de bloc « gros chiffre + petit label » façon page d'accueil SaaS.
- **Don't** charger de police supplémentaire, d'image non optimisée ou de script front qui alourdirait le premier chargement en 3G — chaque octet ajouté doit se justifier face à ce public réseau.
- **Don't** utiliser `border-left`/`border-right` coloré comme accent décoratif sur une carte ou un item de liste.
- **Don't** appliquer `background-clip: text` avec un dégradé pour l'emphase — l'emphase passe par le poids ou la taille, jamais par un dégradé de texte.
