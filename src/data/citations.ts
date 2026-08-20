// Les citations du site.
//
// POURQUOI ELLES EXISTENT. Les fiches en portent une depuis le début, en bas de
// page, et c'est ce que le user en retient : une phrase courte qui dit pourquoi
// on a fait tout ça. Elles étaient jusqu'ici invisibles sur le site — la fiche
// papier et la page « remplir en ligne » les montraient, la page d'activité non.
// Ce fichier les étend à toutes les pages de repère : chaque endroit du site où
// un élève arrive a maintenant une phrase qui lui dit ce qu'il vient y chercher.
//
// DEUX RÈGLES DE RÉDACTION, à tenir pour toute citation ajoutée ici :
//
//  1. **Aucune attribution inventée.** Ce sont des maximes de la maison, pas des
//     mots d'auteurs célèbres. Mettre « — Léonard de Vinci » sous une phrase
//     qu'il n'a jamais écrite est un faux, et des élèves la recopieront dans un
//     devoir. Le champ `auteur` existe (il sert aux fiches), mais il reste vide
//     tant qu'on ne cite pas une source réelle et vérifiée.
//  2. **Une phrase, concrète, qui tient sur deux lignes.** Elle doit parler d'un
//     geste que l'élève a fait ou va faire — mesurer, se tromper, refermer sa
//     fiche —, pas d'une abstraction sur « le savoir ». Les citations des fiches
//     donnent le ton : « L'ingénieur n'a pas d'avis : il a des mesures. »

export type Citation = { texte: string; auteur?: string };

/** La citation principale : celle de l'accueil. Elle vise la fierté plutôt que
 *  la performance — un élève de 5ème doit se reconnaître dans le métier avant
 *  de se demander s'il est bon dans la matière. */
export const citationPrincipale: Citation = {
  texte: "Tout ce qui t'entoure a été imaginé par quelqu'un. Un jour, ce sera toi.",
};

/** Une citation par page de repère, indexée par la clé passée au composant. */
export const citations: Record<string, Citation> = {
  accueil: citationPrincipale,

  '5eme': {
    texte: "Une séquence, ce n'est pas six fiches : c'est une seule question qu'on creuse six fois.",
  },
  '4eme': {
    texte: "Comprendre un objet, c'est pouvoir le réparer, l'améliorer — ou décider de ne pas l'acheter.",
  },

  projets: {
    texte: "Un projet ne se raconte pas : il se pose sur la table, et on le charge jusqu'à ce qu'il cède.",
  },
  // Une par projet : c'est la page où l'élève arrive en scannant le QR de sa
  // fiche, et chaque projet a sa propre leçon.
  'pont-a4': {
    texte: "À quantité de matière égale, ce n'est pas la feuille qui porte : c'est la forme qu'on lui a donnée.",
  },
  'abat-jour': {
    texte: "Quand deux exigences se contredisent, on ne choisit pas un camp : on cherche l'endroit où l'on perd le moins des deux côtés.",
  },
  'amplificateur-passif': {
    texte: "On ne crée pas de son : on l'empêche seulement de partir dans toutes les directions.",
  },

  ressources: {
    texte: "Ce que tu ne sais pas encore n'est pas un mur : c'est une page que tu n'as pas encore ouverte.",
  },
  lexique: {
    texte: "Mettre le mot juste sur une chose, c'est déjà la moitié du travail de l'ingénieur.",
  },
  syntheses: {
    texte: "Réviser, ce n'est pas relire : c'est refermer la fiche et regarder ce qui reste.",
  },
  animations: {
    texte: "Ce qu'on manipule, on s'en souvient. Ce qu'on regarde passer, on l'oublie.",
  },

  reviser: {
    texte: "Se tromper ici ne coûte rien. C'est exactement pour cela qu'il faut se tromper ici.",
  },

  'mode-demploi': {
    texte: "Un outil qu'on ne sait pas utiliser n'est pas un outil : c'est un objet posé là.",
  },
};

export const citationDe = (cle: string): Citation | null => citations[cle] ?? null;
