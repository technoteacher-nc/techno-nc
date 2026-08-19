// Données des ressources, partagées entre les pages qui les affichent.
//
// Elles vivaient toutes dans une seule page `/ressources` qui avait fini à
// 1052 mots et 30 liens — quatre fois plus que n'importe quelle autre page du
// site. Un élève qui cherchait une définition traversait 20 liens de
// simulateurs pour l'atteindre. D'où la séparation : une intention, une page.
//
// Le champ `activites` de chaque simulateur est ce qui permet de proposer la
// bonne animation SUR la page de l'activité concernée, au moment où l'élève en
// a besoin, plutôt que de le laisser fouiller un index.

export type Simulateur = {
  nom: string;
  source: string;
  navigateur: boolean;
  desc: string;
  url: string;
  activites?: string[];   // slugs des activités où proposer ce lien
};

export type GroupeSimulateurs = {
  seq: string | null;
  titre: string;
  repere: string;
  items: Simulateur[];
};

export const syntheses = [
  {
    titre: "Les deux chaînes d'un objet",
    description:
      "Chaîne d'information (capteur, microcontrôleur) et chaîne d'énergie (actionneur), avec l'exemple du robot mBot. Schémas + quiz.",
    pdf: '/ressources/SYNTHESE_ChainesEnergieInformation_Cycle4.pdf',
    docx: '/ressources/SYNTHESE_ChainesEnergieInformation_Cycle4.docx',
  },
  {
    titre: "Le cycle de vie d'un objet",
    description:
      'Des matières premières à la fin de vie : les 5 étapes, la réparabilité et le cas particulier de la Nouvelle-Calédonie. Schéma + quiz.',
    pdf: '/ressources/SYNTHESE_CycleDeVie_Cycle4.pdf',
    docx: '/ressources/SYNTHESE_CycleDeVie_Cycle4.docx',
  },
  {
    titre: 'Les matériaux : familles et propriétés',
    description:
      'Métalliques, organiques, minéraux, composites : les propriétés qui guident le choix, la corrosion en bord de mer et le nickel calédonien. Quiz.',
    pdf: '/ressources/SYNTHESE_Materiaux_Cycle4.pdf',
    docx: '/ressources/SYNTHESE_Materiaux_Cycle4.docx',
  },
  {
    titre: 'Pannes : diagnostiquer, réparer',
    description:
      'La démarche d\'enquête du technicien en 5 étapes, la maintenance, et où chercher la panne grâce aux deux chaînes. Exemple mBot + quiz.',
    pdf: '/ressources/SYNTHESE_PannesDiagnostic_Cycle4.pdf',
    docx: '/ressources/SYNTHESE_PannesDiagnostic_Cycle4.docx',
  },
];

export const lexiquePdf = '/ressources/LEXIQUE_Technologie_Cycle4.pdf';
export const lexiqueDocx = '/ressources/LEXIQUE_Technologie_Cycle4.docx';

export const lexique = [
  {
    titre: 'Analyser et concevoir les objets et systèmes techniques',
    repere: 'OST',
    termes: [
      ['Objet et Système Technique (OST)', "Ensemble des produits, services, logiciels et programmes créés pour répondre à un besoin. On passe de l'objet seul (une montre connectée) au système (la montre reliée à un réseau de géolocalisation)."],
      ['Besoin', "Nécessité ou désir éprouvé par un utilisateur, auquel l'objet technique doit répondre."],
      ['Cahier des charges (CDC)', "Document qui liste les fonctions attendues, les contraintes (sécurité, environnement…) et les critères de performance d'un objet."],
      ['Contrainte', "Exigence liée à l'usage, à la sécurité, à l'ergonomie ou au développement durable, que le concepteur doit respecter."],
      ['Cycle de vie', "Ensemble des étapes de la vie d'un objet, de l'extraction des matières premières à sa fin de vie (recyclage ou déchet), en passant par sa fabrication et son utilisation."],
    ],
  },
  {
    titre: 'La structure interne — Matière, Énergie, Information',
    repere: 'MEI',
    termes: [
      ["Chaîne d'énergie", "Ensemble des constituants qui permettent de réaliser une action (mouvement, chaleur, lumière). Ses fonctions : alimenter (batterie), distribuer (relais), convertir (moteur, lampe) et transmettre (engrenages)."],
      ["Chaîne d'information", "Ensemble des constituants qui permettent d'acquérir des données, de les traiter et de les communiquer."],
      ['Capteur', "Élément de la chaîne d'information qui prélève une grandeur physique (température, présence, distance…) et la transforme en signal exploitable."],
      ['Actionneur', "Élément de la chaîne d'énergie qui transforme l'énergie reçue en un effet physique (rotation d'un moteur, mouvement d'un vérin…)."],
      ['Microcontrôleur', "Unité de traitement de l'information qui exécute le programme pour piloter les actionneurs en fonction des données des capteurs."],
    ],
  },
  {
    titre: 'Informatique et programmation',
    repere: 'CODE',
    termes: [
      ['Algorithme', 'Description précise, étape par étape, de la manière de résoudre un problème.'],
      ['Programme (codage)', "Assemblage d'instructions informatiques (souvent par blocs au collège) qui guide un robot ou un objet connecté."],
      ['Instruction conditionnelle', 'Structure de type « Si… alors… sinon » qui exécute des actions différentes selon une condition.'],
      ['Variable', "Donnée stockée par le programme (nombre, mot ou booléen) dont la valeur peut changer pendant l'exécution."],
      ['Réseau local', "Ensemble d'équipements informatiques (terminaux, commutateurs…) reliés entre eux pour échanger des données au sein d'un bâtiment."],
    ],
  },
  {
    titre: 'Innovation et prototypage',
    repere: 'PROTO',
    termes: [
      ['Prototypage', "Réalisation d'un modèle concret, souvent simplifié, pour tester et valider des solutions techniques avant la fabrication finale."],
      ['CAO / Modélisation numérique', "Utilisation de logiciels (Sweet Home 3D, SketchUp, Tinkercad…) pour créer une représentation virtuelle d'un objet en 3D et simuler son comportement."],
      ['Fabrication additive', 'Procédé de fabrication par ajout de matière, couramment appelé impression 3D.'],
    ],
  },
];

// Chaque lien a été vérifié (réponse 200) au moment de la mise en ligne.
// `navigateur: true` = rien à installer : c'est l'information décisive pour un
// élève qui travaille à la maison sur le téléphone familial.
export const simulateurs: GroupeSimulateurs[] = [
  {
    seq: 'seq03', titre: 'Réseaux et données', repere: 'SÉQUENCE 03',
    items: [
      { nom: 'Le réseau du collège', source: 'Techno-Flash', navigateur: true,
        desc: "L'animation reprend exactement le schéma de la fiche : poste, switch, serveur.",
        url: 'https://techno-flash.com/animations/reseau_college/reseau_college.html',
        activites: ['s3-a01-5eme'] },
      { nom: 'Fonctionnement des réseaux', source: 'Techno-Flash', navigateur: true,
        desc: 'Adresse IP, paquets, routage : le voyage du message pas à pas.',
        url: 'https://techno-flash.com/animations/FRju49qz/Fonctionnement_reseaux.html',
        activites: ['s3-a01-4eme', 's3-a02-5eme', 's3-a03-4eme'] },
      { nom: 'Filius', source: 'Logiciel libre', navigateur: false,
        desc: 'Le simulateur de réseau utilisé en classe. Gratuit, à installer.',
        url: 'https://www.lernsoftware-filius.de/',
        activites: ['s3-a02-4eme', 's3-a03-4eme', 's3-a04-5eme'] },
      { nom: "L'unité centrale · Les périphériques", source: 'Techno-Flash', navigateur: true,
        desc: "Ce qu'il y a dans un ordinateur, pièce par pièce.",
        url: 'https://techno-flash.com/animations/unicenligne/unite_centrale.html',
        activites: ['s2-a07-4eme', 's2-a07-5eme'] },
    ],
  },
  {
    seq: 'seq04', titre: 'Sécurité et citoyenneté numérique', repere: 'SÉQUENCE 04',
    items: [
      { nom: 'Cybertech', source: 'Techno-Flash', navigateur: true,
        desc: 'Mots de passe, hameçonnage, traces : le jeu-parcours de la cybersécurité.',
        url: 'https://techno-flash.com/animations/Cybertech-45ejsu78f/cybertech.html',
        activites: ['s4-a01-4eme', 's4-a01-5eme', 's4-a02-4eme'] },
      { nom: 'Internet Sans Crainte', source: 'Programme national', navigateur: true,
        desc: 'Cyberharcèlement, données personnelles : ressources pour les 11-15 ans.',
        url: 'https://www.internetsanscrainte.fr/',
        activites: ['s4-a02-5eme', 's4-a03-5eme'] },
      { nom: 'Cybermalveillance.gouv.fr', source: 'Service public', navigateur: true,
        desc: "Que faire en cas de piratage ou d'arnaque — la référence officielle.",
        url: 'https://www.cybermalveillance.gouv.fr/',
        activites: ['s4-a01-4eme'] },
      { nom: 'Pix', source: 'Service public', navigateur: true,
        desc: 'Teste et certifie tes compétences numériques (utilisé au collège et au lycée).',
        url: 'https://pix.fr/' },
    ],
  },
  {
    seq: 'seq05', titre: 'Concevoir, représenter, modéliser', repere: 'SÉQUENCE 05',
    items: [
      { nom: 'Le cahier des charges fonctionnel', source: 'Techno-Flash', navigateur: true,
        desc: 'Besoin, fonctions, contraintes : exactement la démarche de la fiche.',
        url: 'https://techno-flash.com/animations/cahier_des_charges/cahier_des_charges_fonctionnel.html',
        activites: ['s5-a01-4eme', 's5-a01-5eme'] },
      { nom: 'Le dessin technique', source: 'Techno-Flash', navigateur: true,
        desc: 'Échelles, vues, codes de représentation.',
        url: 'https://techno-flash.com/animations/dessin_technique/dessin_technique.html',
        activites: ['s5-a02-4eme', 's5-a02-5eme'] },
      { nom: 'Sweet Home 3D', source: 'Logiciel libre', navigateur: false,
        desc: 'La maquette numérique de la maison. Gratuit, version en ligne possible.',
        url: 'https://www.sweethome3d.com/fr/',
        activites: ['s5-a03-5eme', 's5-a04-5eme'] },
      { nom: 'Tinkercad', source: 'Autodesk', navigateur: true,
        desc: 'Modélisation 3D directement dans le navigateur (compte gratuit).',
        url: 'https://www.tinkercad.com/',
        activites: ['s5-a03-4eme'] },
      { nom: 'SketchUp', source: 'Trimble', navigateur: true,
        desc: 'La modélisation 3D utilisée en 4ème, version web gratuite.',
        url: 'https://www.sketchup.com/fr',
        activites: ['s5-a03-4eme', 's5-a04-4eme'] },
    ],
  },
  {
    seq: 'seq06', titre: 'Programmer et piloter', repere: 'SÉQUENCE 06',
    items: [
      { nom: "Chaîne d'énergie · Chaîne d'information", source: 'Techno-Flash', navigateur: true,
        desc: 'Les deux chaînes en animation — le cœur de la synthèse à réviser.',
        url: 'https://techno-flash.com/animations/chaine_information/chaine_information.html',
        activites: ['s6-a01-4eme'] },
      { nom: 'Capteurs, actionneurs, interface', source: 'Techno-Flash', navigateur: true,
        desc: 'Qui capte, qui décide, qui agit : à voir avant de programmer le mBot.',
        url: 'https://techno-flash.com/animations/CAIkf46es/capteurs_actionneurs_interface.html',
        activites: ['s6-a01-4eme', 's6-a03-4eme'] },
      { nom: 'Scratch', source: 'MIT', navigateur: true,
        desc: 'La programmation par blocs, directement en ligne.',
        url: 'https://scratch.mit.edu/',
        activites: ['s6-a01-5eme', 's6-a02-5eme', 's6-a03-5eme', 's6-a04-5eme'] },
      { nom: 'mBlock', source: 'Makeblock', navigateur: true,
        desc: 'Programmer le robot mBot par blocs, version en ligne.',
        url: 'https://ide.mblock.cc/',
        activites: ['s6-a02-4eme', 's6-a03-4eme', 's6-a04-4eme'] },
    ],
  },
  {
    seq: null, titre: 'Matériaux, énergie, cycle de vie', repere: 'POUR LES SYNTHÈSES',
    items: [
      { nom: 'Les familles de matériaux', source: 'Techno-Flash', navigateur: true,
        desc: 'Métalliques, organiques, minéraux, composites — à croiser avec la synthèse.',
        url: 'https://techno-flash.com/animations/familles_materiaux2/familles_materiaux.html' },
      { nom: 'La résistance des matériaux', source: 'Techno-Flash', navigateur: true,
        desc: 'Flexion, traction, compression : pourquoi une feuille pliée devient rigide.',
        url: 'https://techno-flash.com/animations/resistance_materiaux/resistance_materiaux.html' },
      { nom: 'Evolutech', source: 'Techno-Flash', navigateur: true,
        desc: "L'évolution des objets techniques dans le temps.",
        url: 'https://techno-flash.com/animations/Evoulutech-dgka75bx/Evolutech.html' },
    ],
  },
];

/** Les simulateurs à proposer sur la page d'une activité donnée. */
export const simulateursDe = (slug: string): Simulateur[] =>
  simulateurs.flatMap(g => g.items).filter(s => s.activites?.includes(slug));

export const nbSimulateurs = simulateurs.reduce((n, g) => n + g.items.length, 0);
export const nbTermes = lexique.reduce((n, s) => n + s.termes.length, 0);
