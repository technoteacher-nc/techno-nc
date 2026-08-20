// Consolidation — les notions de maths et de physique-chimie SANS lesquelles
// les activités ne peuvent pas être faites : convertir des mm en cm pour coter
// un croquis, savoir que 1 m² ne fait pas 100 cm², appliquer une échelle, lire
// un pourcentage.
//
// Ce n'est pas un cours d'une autre discipline. C'est la liste des points sur
// lesquels les élèves butent EN TECHNOLOGIE, et rien d'autre : chaque notion
// est rattachée à l'activité où le besoin apparaît réellement, ce qui permet de
// renvoyer l'élève vers la bonne remise à niveau au bon moment.
//
// Deux champs portent l'essentiel de la valeur pédagogique :
//   `repere` — un ordre de grandeur concret, calédonien quand c'est possible ;
//   `piege`  — l'erreur que les élèves font vraiment, pas une erreur théorique.

export type Notion = {
  nom: string;
  symbole?: string;
  def: string;
  repere?: string;
  piege?: string;
  activites?: string[];
};

export type BlocConsolidation = {
  titre: string;
  repere: string;
  intro: string;
  schema?: string;
  notions: Notion[];
};

export const consolidation: BlocConsolidation[] = [
  {
    titre: 'Longueurs : mesurer et convertir',
    repere: 'LONGUEURS',
    intro: "En Technologie, on cote toujours en millimètres. Savoir passer d'une unité à l'autre est la première condition pour qu'un dessin soit fabricable.",
    notions: [
      {
        nom: 'Millimètre', symbole: 'mm',
        def: "L'unité du dessin technique et de l'atelier. Toutes les cotes d'un croquis coté s'écrivent en mm.",
        repere: "L'épaisseur d'une pièce de 100 F CFP fait environ 2 mm.",
        activites: ['s5-a02-4eme', 's5-a03-4eme', 's5-a05-4eme'],
      },
      {
        nom: 'Centimètre', symbole: 'cm',
        def: '1 cm = 10 mm. Utilisé pour les maquettes et les mesures à la règle.',
        repere: "La largeur d'un doigt fait environ 1,5 cm.",
        activites: ['s5-a05-5eme', 's5-a02-5eme'],
      },
      {
        nom: 'Mètre', symbole: 'm',
        def: '1 m = 100 cm = 1 000 mm. Unité des plans de bâtiment et des dimensions réelles.',
        repere: 'La hauteur sous plafond réglementaire en Nouvelle-Calédonie : 2,50 m.',
        activites: ['s5-a01-5eme', 's5-a02-5eme'],
      },
      {
        nom: 'Convertir',
        def: 'On multiplie en descendant vers les petites unités, on divise en remontant. De m à cm à mm : dix fois à chaque marche.',
        piege: "Écrire 1,5 m = 15 cm. Non : 1,5 m = 150 cm. Une virgule mal placée sur un plan, et le mur fait dix fois la mauvaise taille.",
      },
    ],
  },
  {
    titre: 'Aires et volumes',
    repere: 'AIRES · VOLUMES',
    intro: "Calculer la surface d'une pièce ou le volume d'un objet revient sans cesse. C'est aussi là que se produit l'erreur la plus fréquente de la séquence 05.",
    schema: '/2026/schemas/aires-volumes.png',
    notions: [
      {
        nom: 'Aire (surface)', symbole: 'm², cm²',
        def: 'Ce que couvre une figure plate. Pour un rectangle : longueur × largeur. Les deux mesures doivent être dans la MÊME unité avant de multiplier.',
        repere: 'Une chambre de 3 m × 3 m fait 9 m² — le minimum réglementaire.',
        activites: ['s5-a01-5eme', 's5-a02-5eme', 's5-a03-5eme'],
      },
      {
        nom: 'Le piège du carré',
        def: "Quand on passe du mètre au centimètre, l'aire est multipliée DEUX fois : une fois pour la longueur, une fois pour la largeur.",
        piege: '1 m² = 10 000 cm², et non 100 cm². De même 1 cm² = 100 mm².',
        activites: ['s5-a02-5eme'],
      },
      {
        nom: 'Volume', symbole: 'm³, cm³, dm³',
        def: "La place occupée dans l'espace. Pour un pavé : longueur × largeur × hauteur.",
        piege: '1 m³ = 1 000 000 cm³ : le facteur est au cube, pas au carré.',
      },
      {
        nom: 'Litre', symbole: 'L',
        def: "1 L = 1 dm³, c'est-à-dire un cube de 10 cm de côté. C'est le pont entre les volumes de maths et les contenances de la vie courante.",
        repere: 'Une brique de lait : 1 L, soit 1 dm³.',
      },
    ],
  },
  {
    titre: 'Les échelles',
    repere: 'ÉCHELLES',
    intro: "Une échelle dit combien de fois le dessin est plus petit que la réalité. C'est la même opération en 5ème (plan au 1/100) et en 4ème (maquette au 1/20).",
    schema: '/2026/schemas/echelles.png',
    notions: [
      {
        nom: 'Échelle 1/100',
        def: '1 unité sur le plan représente 100 unités en vrai. Donc 1 cm sur le plan = 100 cm = 1 m en réalité.',
        repere: 'Un séjour de 4 m × 3 m se dessine 4 cm × 3 cm.',
        activites: ['s5-a02-5eme'],
      },
      {
        nom: 'Échelle 1/20',
        def: '1 cm sur la maquette représente 20 cm en vrai. Pour dessiner, on DIVISE la mesure réelle par 20.',
        repere: 'Des murs de 2,40 m, soit 240 cm, deviennent 12 cm sur la maquette.',
        activites: ['s5-a05-5eme'],
      },
      {
        nom: 'Échelle 1:1',
        def: "Grandeur réelle : le dessin fait exactement la taille de l'objet. C'est l'échelle du patron qu'on découpe.",
        activites: ['s5-a05-4eme'],
      },
      {
        nom: 'Sens du calcul',
        def: 'Du réel vers le dessin : on divise. Du dessin vers le réel : on multiplie.',
        piege: 'Multiplier au lieu de diviser donne une maquette 400 fois trop grande. Vérifier que le résultat est plausible avant de tracer.',
      },
    ],
  },
  {
    titre: 'Angles, masses, durées',
    repere: 'MESURES',
    intro: "Les grandeurs qu'on relève pendant les tests et les protocoles.",
    notions: [
      {
        nom: 'Degré', symbole: '°',
        def: "L'unité d'angle, mesurée au rapporteur. Un quart de tour vaut 90°, un demi-tour 180°, un tour complet 360°.",
        repere: 'Le cahier des charges du support impose un angle compris entre 30° et 60°.',
        activites: ['s5-a04-4eme', 's5-a05-4eme', 's6-a02-4eme'],
      },
      {
        nom: 'Gramme et kilogramme', symbole: 'g, kg',
        def: '1 kg = 1 000 g. La masse se mesure à la balance.',
        repere: 'La charge de test du support : 250 g, soit un quart de kilo.',
        activites: ['s5-a01-4eme', 's5-a05-4eme'],
      },
      {
        nom: 'Seconde, minute, heure', symbole: 's, min, h',
        def: '1 min = 60 s et 1 h = 60 min. Les durées ne se comptent pas en base 10.',
        piege: '1,5 min ne fait pas 1 min 50 s mais 1 min 30 s.',
        activites: ['s6-a04-4eme', 's6-a02-4eme'],
      },
      {
        nom: 'Vitesse', symbole: 'cm/s, km/h',
        def: 'Une distance divisée par une durée. Un robot qui parcourt 60 cm en 2 s avance à 30 cm/s.',
        activites: ['s6-a02-4eme'],
      },
    ],
  },
  {
    titre: 'Pourcentages et proportionnalité',
    repere: 'CALCULS',
    intro: "Ajouter 10 % de dégagements, régler une vitesse à 50 %, lire « 0 % de paquets perdus » : le pourcentage traverse toutes les séquences.",
    notions: [
      {
        nom: 'Pourcentage', symbole: '%',
        def: "Une part sur cent. Prendre 10 % d'un nombre, c'est le diviser par 10 ; prendre 50 %, c'est le diviser par 2.",
        repere: 'Aux 53 m² des pièces, on ajoute 10 %, soit 5,3 m² de couloirs.',
        activites: ['s5-a01-5eme', 's6-a02-4eme'],
      },
      {
        nom: 'Ajouter un pourcentage',
        def: "On calcule la part, puis on l'ajoute au total de départ.",
        piege: 'Ajouter « 10 » au lieu de « 10 % » : sur 53 m², cela donne 63 m² au lieu de 58,3 m².',
      },
      {
        nom: 'Proportionnalité',
        def: "Deux grandeurs sont proportionnelles quand l'une double si l'autre double. C'est ce qui permet d'appliquer une échelle, ou de calculer le prix de 15 postes à partir du prix d'un seul.",
        activites: ['s2-a07-5eme', 's2-a07-4eme'],
      },
    ],
  },
  {
    titre: 'Électricité et information',
    repere: 'PHYSIQUE · NUMÉRIQUE',
    intro: "Les grandeurs qui décrivent ce qui circule dans un objet technique : de l'énergie d'un côté, de l'information de l'autre.",
    notions: [
      {
        nom: 'Volt', symbole: 'V',
        def: "L'unité de tension : ce qui « pousse » le courant dans le circuit.",
        repere: 'Une pile bâton fournit 1,5 V ; le pack du mBot environ 6 V.',
        activites: ['s6-a01-4eme'],
      },
      {
        nom: 'Ampère', symbole: 'A',
        def: "L'unité d'intensité : la quantité de courant qui circule réellement.",
        activites: ['s6-a01-4eme'],
      },
      {
        nom: 'Watt', symbole: 'W',
        def: "L'unité de puissance : l'énergie fournie ou consommée par seconde.",
        repere: 'Une ampoule LED de bureau : environ 8 W. Un ordinateur portable : environ 45 W.',
      },
      {
        nom: 'Octet', symbole: 'o, ko, Mo, Go',
        def: "L'unité de quantité d'information. 1 ko vaut environ 1 000 o, 1 Mo environ 1 000 ko, 1 Go environ 1 000 Mo.",
        repere: 'Une fiche PDF du site pèse environ 240 ko. 8 Go de mémoire vive font 8 000 Mo.',
        activites: ['s2-a07-4eme', 's3-a01-5eme'],
      },
      {
        nom: 'Débit', symbole: 'Mb/s',
        def: "La quantité d'information transportée par seconde sur un réseau. Plus le débit est élevé, plus un fichier arrive vite.",
        repere: "C'est ce que le câble Gondwana apporte à la Nouvelle-Calédonie.",
        activites: ['s3-a02-5eme'],
      },
    ],
  },
];

export const nbNotions = consolidation.reduce((n, b) => n + b.notions.length, 0);

/** Les notions de consolidation utiles à une activité donnée. */
export const notionsDe = (slug: string) =>
  consolidation.flatMap(b =>
    b.notions.filter(n => n.activites?.includes(slug))
      .map(n => ({ nom: n.nom, symbole: n.symbole, bloc: b.titre })));

/* ---------------------------------------------------------------- conversions
   Les tableaux de conversion des manuels de technologie, repris ici parce que
   c'est la forme que les élèves reconnaissent — et parce qu'un tableau se
   consulte pendant l'activité, là où une règle écrite en phrase ne se relit
   jamais.

   Chaque tableau porte SA règle de passage (× 10, × 100, × 1 000, × 60) : c'est
   elle qu'on confond, pas les noms d'unités. Et le piège est celui qu'on voit
   réellement sur les copies. */

export type TableauConversion = {
  titre: string;
  regle: string;
  unites: string[];
  /** Une égalité par ligne, écrite comme on la lit. */
  egalites: string[];
  piege?: string;
};

export const conversions: TableauConversion[] = [
  {
    titre: 'Longueurs',
    regle: 'D’une colonne à la suivante vers la droite : × 10. Vers la gauche : ÷ 10.',
    unites: ['km', 'hm', 'dam', 'm', 'dm', 'cm', 'mm'],
    egalites: [
      '1 m = 10 dm = 100 cm = 1 000 mm',
      '1 cm = 10 mm',
      '2,5 m = 250 cm = 2 500 mm',
      '1 km = 1 000 m',
    ],
    piege: 'En Technologie on cote en millimètres : 1,5 m s’écrit 1 500 mm, pas 150 mm.',
  },
  {
    titre: 'Aires (surfaces)',
    regle: 'D’une colonne à la suivante : × 100, et non × 10. Une aire a deux dimensions.',
    unites: ['km²', 'hm²', 'dam²', 'm²', 'dm²', 'cm²', 'mm²'],
    egalites: [
      '1 m² = 100 dm² = 10 000 cm²',
      '1 cm² = 100 mm²',
      '1 dm² = 100 cm²',
    ],
    piege: '1 m² ne fait PAS 100 cm² mais 10 000 cm² : le côté est multiplié par 100, donc l’aire par 100 × 100.',
  },
  {
    titre: 'Volumes et capacités',
    regle: 'D’une colonne à la suivante : × 1 000. Un volume a trois dimensions.',
    unites: ['m³', 'dm³', 'cm³', 'mm³'],
    egalites: [
      '1 dm³ = 1 L  (c’est la même chose)',
      '1 cm³ = 1 mL',
      '1 m³ = 1 000 dm³ = 1 000 L',
      '1 L = 100 cL = 1 000 mL',
    ],
    piege: 'Le litre n’est pas une unité à part : 1 L EST un décimètre cube. Une brique de lait fait 1 dm³.',
  },
  {
    titre: 'Masses',
    regle: 'D’une colonne à la suivante vers la droite : × 10.',
    unites: ['t', 'kg', 'hg', 'dag', 'g', 'dg', 'cg', 'mg'],
    egalites: [
      '1 kg = 1 000 g',
      '1 t = 1 000 kg',
      '250 g = 0,25 kg',
      '1 g = 1 000 mg',
    ],
    piege: 'Entre la tonne et le kilogramme il y a trois colonnes, pas une : 1 t = 1 000 kg.',
  },
  {
    titre: 'Durées',
    regle: 'ATTENTION : × 60 d’une colonne à l’autre, jamais × 10. Les durées ne sont pas décimales.',
    unites: ['h', 'min', 's'],
    egalites: [
      '1 h = 60 min = 3 600 s',
      '1 min = 60 s',
      '1 min 30 s = 90 s',
      '2 h 15 min = 135 min',
    ],
    piege: '1,5 h vaut 1 h 30 min, pas 1 h 50 min. La calculatrice affiche 1,5 : c’est une demi-heure, donc 30 minutes.',
  },
  {
    titre: 'Puissance et énergie',
    regle: 'D’une unité à la suivante : × 1 000.',
    unites: ['mW', 'W', 'kW', 'MW'],
    egalites: [
      '1 kW = 1 000 W',
      '1 kWh = 1 000 Wh',
      'Une LED de 8 W allumée 10 h consomme 80 Wh',
    ],
    piege: 'Le watt (W) est une PUISSANCE — ce que l’appareil demande à l’instant. Le wattheure (Wh) est une ÉNERGIE — ce qu’il a consommé au total. Ce ne sont pas les mêmes grandeurs.',
  },
];
