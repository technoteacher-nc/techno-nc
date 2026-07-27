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
