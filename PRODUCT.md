# Product

## Register

brand

## Users

Élèves de 5ème et 4ème (11-15 ans) du Collège d'Auteuil, Nouvelle-Calédonie, cycle 4, programme 2024 (BO n°9). Ils arrivent sur le site depuis un QR code imprimé sur leur fiche papier, ou en tapant l'URL de mémoire après une absence ou une fiche perdue. Contexte réseau réel en Nouvelle-Calédonie : connexions souvent lentes ou instables (3G, wifi collège partagé) — ce n'est pas un cas limite à tolérer, c'est la condition normale d'usage à concevoir en premier.

Public secondaire : l'enseignant lui-même (vérification, partage de lien), et occasionnellement des parents.

## Product Purpose

Donner accès, sans compte ni friction, aux fiches d'activité de Technologie (standard + version adaptée EBEP), aux ressources de révision (lexique, synthèses) et au contexte pédagogique de chaque séquence. Remplacer la fiche papier perdue ou la séance manquée. Réussite = un élève retrouve sa fiche en quelques secondes, comprend où il en est dans la séquence, et a envie de revenir consulter le site plutôt que de le subir.

## Brand Personality

**Atelier d'ingénieur, pas salle de classe.** Le site prolonge visuellement le contenu : la Technologie s'apprend en dessinant, mesurant, construisant — le site doit avoir l'air d'un carnet de plans, pas d'un manuel scolaire numérisé. Trois mots : **précis, vivant, artisanal.**

- Précis : traits de construction, cotes, grilles, typographie technique (Space Grotesk) — le sérieux d'un vrai outil de conception, pas d'un gadget.
- Vivant : la couleur d'accent (turquoise) et les micro-détails marquent la progression réelle de l'élève dans sa séquence — jamais décoratifs sans porter une information.
- Artisanal : les élèves doivent sentir qu'un prof a dessiné ça pour eux, pas qu'un gabarit générique a été rempli. Annotations à la main, textures de grille, détails de carnet d'ingénieur bienvenus s'ils restent lisibles et légers en poids.

Ton du texte (accueil, intitulés, micro-copie) : direct, jamais infantilisant, jamais jargonneux côté marketing — des phrases qu'un collégien lit sans effort, au niveau adulte du contenu technique.

## Anti-references

- **Application pour enfants** : pas de mascotte, pas de couleurs bonbon, pas de formes arrondies façon jeu pour primaire. Ce sont des collégiens, pas des élèves de CP — un ton trop enfantin serait perçu comme condescendant.
- **SaaS générique** : pas de dégradés violets, pas d'illustrations flat-design interchangeables, pas de "hero section" avec gros chiffre + petit label.
- **Portail administratif terne** : le site ne doit jamais donner l'impression d'un ENT ou d'un CDI numérique austère — c'est tout l'inverse de ce qu'on veut prouver.
- **Lourdeur** : tout effet visuel qui dégraderait l'usage en 3G (images non optimisées, polices multiples, animations lourdes, dépendances JS front) est un anti-pattern ici, pas un compromis acceptable.

## Design Principles

1. **La 3G est la ligne de base, pas le cas dégradé.** Chaque choix visuel (police, image, animation) est d'abord jugé à son coût réseau ; le confort sur bonne connexion est un bonus, jamais la cible de conception.
2. **La couleur et la forme portent toujours une information réelle** (progression dans la séquence, phase du processus, priorité de l'action) — jamais de décoration gratuite qui n'aide pas l'élève à se repérer.
3. **Zéro JavaScript côté client par défaut.** Le site reste 100 % statique ; toute interactivité visuelle (survols, transitions) passe par CSS pur, jamais par une dépendance runtime qui ralentit ou casse hors-ligne.
4. **Montrer, pas raconter.** La chaîne d'activités d'une séquence doit se lire d'un coup d'œil comme un vrai schéma de processus, pas comme une liste à puces déguisée.
5. **Un ton d'adulte technique, jamais un ton d'appli pour enfants.** Le respect du niveau des élèves passe aussi par le refus de l'infantilisation visuelle et textuelle.

## Accessibility & Inclusion

- Contraste et lisibilité déjà exigeants (texte encre sur papier clair, jamais de gris sur gris) ; à maintenir sur toute nouvelle surface.
- Le code couleur des phases (Analyser/Représenter/Modéliser/Fabriquer/Produire) n'est jamais le seul porteur de sens : le texte de la phase reste toujours visible à côté de la couleur — règle à respecter pour tout nouvel élément coloré.
- `prefers-reduced-motion` déjà respecté (transitions désactivées) — à étendre à toute nouvelle animation.
- Lien d'évitement clavier, `aria-label` sur les navigations, focus visibles déjà en place — à maintenir strictement, ce public inclut des élèves EBEP qui naviguent parfois au clavier ou avec un lecteur d'écran.
- Les besoins EBEP les plus spécifiques (fiches en version adaptée : police, densité, formulation) sont traités au niveau du contenu du document, pas du site — le site doit rester un vecteur neutre et accessible vers les deux versions.

## Illustrations

Décision du 29/10/2026 : le site reste un **carnet de plans**, pas un manuel numérisé, mais il **montre** avant de raconter. Ce qui fait qu'un élève s'y retrouve et a envie d'y revenir, c'est de reconnaître *son* robot, *sa* salle, *sa* situation, pas une image de banque d'images.

- **Schémas de situation en SVG en ligne**, dessinés au trait dans les couleurs de la charte (encre, bleu de tracé, hachures et cotes de dessin technique). Quelques Ko, nets à toute taille, lisibles en 3G. Fichiers dans `src/visuels/`, déclarés dans `src/data/enrichissements.json`.
- **Un schéma montre la question, jamais la réponse.** Une page d'activité est publique : rien de ce que la fiche demande de compléter (légendes, chaînes, constituants) n'y apparaît déjà rempli. La correction reste chiffrée dans « Remplir en ligne ».
- **Repères numérotés dans le dessin, questions écrites en HTML dessous** : le texte reste lisible sur téléphone et par un lecteur d'écran.
- **Photos de l'enseignant bienvenues** (objets réels, atelier 207, contexte calédonien), compressées, sans visage ni nom d'élève.
- **Proscrit** : photos d'ambiance, illustrations « flat » génériques, mascottes, images générées décoratives, et toute image dont la licence n'est pas vérifiée.

## Fiches papier

Repères de mise en page, appliqués à toutes les fiches élèves (`FICHE_*`). Les 79 fiches décrites dans `src/data/fiches/` sont régénérées par `scripts/fiches-papier/mettre-en-page.py` ; les quatre fiches ajoutées en octobre 2026 (S2-A09, S6-A05, S6-A06, S5-A03 bis) ont été écrites directement dans cette mise en page. Les versions adaptées (`EBEP_*`) gardent leur format propre, y compris pour les quatre nouvelles activités : une page, texte en 20 pt gras, « 1 — Avec ton AESH » (gestes à cocher), « 2 — Entoure ta réponse », une ligne de bilan.

- **Deux pages, une feuille recto verso.** Le saut de page est choisi : une partie ou un tableau ne commence jamais en bas de page pour finir au verso.
- **Écrite pour la main, pas pour le clavier.** Lignes d'écriture espacées de 1 cm, cases de tableau à remplir d'au moins 1 cm de haut, blancs dans les phrases d'au moins 4 cm, cases à cocher en 14 pt. Version adaptée : une page, texte en 12 pt, lignes à 1,1 cm.
- **De l'air entre les parties.** Chaque partie s'ouvre sur un numéro en pastille et un filet ; les consignes commencent par ▸. Noir et gris seulement : la fiche est photocopiée.
- **Ce qui n'a pas besoin du papier va sur le site.** Une question de prolongement, un fichier à ouvrir dans un logiciel, une citation : bloc « Pour aller plus loin » de la page de l'activité (`plusLoin` dans `src/data/enrichissements.json`). Jamais une correction.
