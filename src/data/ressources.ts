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
      ['Objet et Système Technique (OST)', "Tout ce qui a été fabriqué par l'homme pour répondre à un besoin : un objet, mais aussi un service, un logiciel ou un programme. Une montre connectée est un objet ; la montre reliée au réseau qui la localise forme un système.", ['s2-a06-4eme','s2-a06-5eme','s2-a07-4eme','s2-a07-5eme']],
      ['Besoin', "Ce qui manque à quelqu'un et que l'objet doit venir combler. On le formule du point de vue de l'utilisateur, pas de celui qui fabrique.", ['s5-a01-4eme','s5-a01-5eme','s2-a07-5eme','s2-a06-4eme']],
      ['Cahier des charges (CDC)', "La liste écrite de ce que l'objet doit faire et des limites à respecter : les fonctions attendues, les contraintes et les critères mesurables. Il dit CE QU'IL FAUT OBTENIR, jamais comment s'y prendre.", ['s5-a01-4eme','s5-a01-5eme','s5-a02-4eme','s5-a04-4eme','s5-a05-4eme','s5-a03-5eme','pont-a4-a01','abat-jour-a01','amplificateur-passif-a01']],
      ['Usage', "La façon dont on se sert d'un objet, et dans quelles circonstances. « Je mets mes écouteurs le soir, pour ne pas déranger » décrit un usage.", ['s2-a06-4eme','s2-a06-5eme','s2-a07-5eme']],
      ['Utilité', "Ce à quoi l'objet sert, sa raison d'exister. « Des écouteurs servent à écouter de la musique sans fil » décrit l'utilité.", ['s2-a06-5eme','s2-a07-4eme']],
      ['Expérience utilisateur (UX)', "Ce que ressent une personne pendant qu'elle se sert d'un objet : facile ou pénible, agréable ou agaçant. Un objet peut être très utile et désagréable à utiliser.", ['s2-a06-4eme','s2-a06-5eme']],
      ['Critère', "Ce qu'on décide de mesurer pour dire si l'objet convient. Un critère se vérifie avec un instrument, jamais au jugé : « tient 250 g pendant 1 minute » est un critère, « solide » n'en est pas un.", ['s2-a07-4eme','s2-a07-5eme','s5-a01-4eme','s5-a01-5eme']],
      ['Compromis', "La solution retenue quand deux critères s'opposent et qu'on ne peut pas satisfaire les deux à fond. On perd un peu des deux côtés, exprès.", ['s2-a07-4eme','s5-a01-4eme']],
      ['Réparabilité', "La facilité avec laquelle un objet peut être réparé : pièces trouvables, vis accessibles, notice disponible. Plus un objet est réparable, plus il dure.", ['s2-a07-4eme','s2-a07-5eme']],
      ['Contrainte', "Une obligation que le concepteur ne peut pas contourner : la sécurité, le prix, la place disponible, le respect de l'environnement. Elle limite les solutions possibles.", ['s5-a01-4eme','s5-a01-5eme']],
      ['Cycle de vie', "Toutes les étapes de la vie d'un objet, dans l'ordre : on extrait la matière, on fabrique, on transporte, on utilise, puis on jette ou on recycle. Chaque étape a un coût pour l'environnement.", ['s2-a07-4eme']],
    ],
  },
  {
    titre: 'La structure interne — Matière, Énergie, Information',
    repere: 'MEI',
    termes: [
      ["Chaîne d'énergie", "Ensemble des constituants qui permettent de réaliser une action (mouvement, chaleur, lumière). Ses fonctions : alimenter (batterie), distribuer (relais), convertir (moteur, lampe) et transmettre (engrenages).", ['s6-a01-4eme']],
      ["Chaîne d'information", "Ensemble des constituants qui permettent d'acquérir des données, de les traiter et de les communiquer.", ['s6-a01-4eme','s6-a03-4eme']],
      ['Capteur', "Élément de la chaîne d'information qui prélève une grandeur physique (température, présence, distance…) et la transforme en signal exploitable.", ['s6-a01-4eme','s6-a03-4eme']],
      ['Actionneur', "Élément de la chaîne d'énergie qui transforme l'énergie reçue en un effet physique (rotation d'un moteur, mouvement d'un vérin…).", ['s6-a01-4eme']],
      ['Microcontrôleur', "Unité de traitement de l'information qui exécute le programme pour piloter les actionneurs en fonction des données des capteurs.", ['s6-a01-4eme','s6-a02-4eme']],
    ],
  },
  {
    titre: 'Informatique et programmation',
    repere: 'CODE',
    termes: [
      ['Algorithme', 'Description précise, étape par étape, de la manière de résoudre un problème.', ['s6-a01-5eme','s6-a02-5eme']],
      ['Programme (codage)', "Assemblage d'instructions informatiques (souvent par blocs au collège) qui guide un robot ou un objet connecté.", ['s6-a02-4eme','s6-a02-5eme','s6-a04-4eme','s6-a04-5eme']],
      ['Instruction conditionnelle', 'Structure de type « Si… alors… sinon » qui exécute des actions différentes selon une condition.', ['s6-a03-4eme','s6-a03-5eme']],
      ['Variable', "Donnée stockée par le programme (nombre, mot ou booléen) dont la valeur peut changer pendant l'exécution.", ['s6-a03-5eme']],
      ['Boucle', "Bloc de programme qui répète des instructions au lieu de les réécrire. « Répéter 4 fois » remplace quatre lignes identiques.", ['s6-a01-5eme','s6-a02-5eme','s6-a02-4eme']],
      ['Événement', "Ce qui déclenche un programme : un clic sur le drapeau vert, l'appui sur une touche, un capteur qui change d'état. Sans événement, rien ne démarre.", ['s6-a02-5eme','s6-a03-5eme']],
      ['Téléverser', "Envoyer le programme depuis l'ordinateur vers l'objet qui va l'exécuter — la carte du robot, par exemple. Tant qu'on n'a pas téléversé, le robot exécute l'ancien programme.", ['s6-a02-4eme','s6-a03-4eme','s6-a04-4eme']],
      ['Réseau local', "Ensemble d'équipements informatiques (terminaux, commutateurs…) reliés entre eux pour échanger des données au sein d'un bâtiment.", ['s3-a01-4eme','s3-a01-5eme','s3-a02-4eme','s3-a04-5eme']],
      // Les élèves se sont perdus en salle Filius faute d'une définition
      // explicite : ils lisaient « 192.168.0.10 » comme un nombre unique, sans
      // voir les quatre parties ni comprendre que les valeurs sont attribuées.
      ['Adresse IP', "Le numéro qui identifie une machine sur un réseau, comme un numéro de maison identifie une maison dans une rue. Elle s'écrit avec QUATRE nombres séparés par des points : 192.168.0.10. Chaque nombre va de 0 à 255, jamais plus. Ces valeurs ne se calculent pas et ne veulent rien dire en elles-mêmes : elles sont attribuées. Dans la salle, les trois premiers nombres (192.168.0) sont les mêmes pour toutes les machines — c'est le RÉSEAU ; seul le dernier change d'une machine à l'autre — c'est LA MACHINE.", ['s3-a01-4eme','s3-a01-5eme','s3-a02-4eme','s3-a03-4eme','s3-a04-5eme']],
      ['Masque de sous-réseau', "Le nombre qui dit quelle partie de l'adresse IP désigne le réseau et quelle partie désigne la machine. Avec 255.255.255.0, les trois premiers nombres sont le réseau et le dernier est la machine.", ['s3-a02-4eme','s3-a04-5eme']],
      ['Commutateur (switch)', "Boîtier qui relie entre elles les machines d'un MÊME réseau. Chaque machine y est branchée par un câble : c'est la topologie en étoile.", ['s3-a01-4eme','s3-a02-4eme','s3-a04-5eme']],
      ['Routeur', "Appareil qui fait communiquer DEUX réseaux différents. Il possède une adresse dans chacun d'eux et aiguille les données de l'un vers l'autre.", ['s3-a01-4eme','s3-a03-4eme']],
      ['Passerelle', "L'adresse du routeur, enregistrée dans chaque machine : c'est la porte de sortie du réseau. Sans elle, une machine ne peut joindre que ses voisines directes.", ['s3-a03-4eme']],
      ['Serveur DNS', "L'annuaire d'Internet : il traduit une adresse écrite en toutes lettres (www.exemple.nc) en adresse IP, la seule que les machines savent utiliser.", ['s3-a03-4eme']],
      ['ping', "Commande qui envoie un petit message à une machine et attend sa réponse. 0 % de paquets perdus : elle répond, la communication fonctionne. 100 % perdus : elle ne répond pas.", ['s3-a02-4eme','s3-a04-5eme']],
    ],
  },
  {
    titre: 'Innovation et prototypage',
    repere: 'PROTO',
    termes: [
      ['Prototypage', "Réalisation d'un modèle concret, souvent simplifié, pour tester et valider des solutions techniques avant la fabrication finale.", ['s5-a05-4eme','s5-a05-5eme','s5-a06-4eme','s5-a06-5eme','pont-a4-a04','abat-jour-a05']],
      ['CAO / Modélisation numérique', "Utilisation de logiciels (Sweet Home 3D, SketchUp, Tinkercad…) pour créer une représentation virtuelle d'un objet en 3D et simuler son comportement.", ['s5-a03-4eme','s5-a03-5eme','s5-a04-4eme','s5-a04-5eme']],
      ['Fabrication soustractive', "Procédé qui fabrique en RETIRANT de la matière : la découpe laser, la scie, la perceuse. C'est l'inverse de la fabrication additive.", ['s5-a06-4eme','s5-a06-5eme']],
      ['Découpe laser', "Machine qui découpe une plaque à plat en la brûlant sur un trait très fin. Elle ne sait travailler que le plat : un volume doit d'abord être développé.", ['s5-a06-4eme','s5-a06-5eme']],
      ['DXF', "Le format de fichier envoyé à la découpe laser. Il ne contient que des traits, à plat.", ['s5-a06-4eme']],
      ['STL', "Le format de fichier envoyé à l'imprimante 3D. Il contient un volume.", ['s5-a06-4eme','s5-a06-5eme']],
      ['Temps machine', "La durée pendant laquelle une machine est occupée par TA pièce. C'est un coût : pendant ce temps, personne d'autre ne peut l'utiliser.", ['s5-a06-4eme','s5-a06-5eme']],
      ['Fabrication additive', 'Procédé de fabrication par ajout de matière, couramment appelé impression 3D.', ['s5-a06-4eme','s5-a06-5eme']],
    ],
  },
  {
    titre: 'Internet, données et citoyenneté numérique',
    repere: 'NUM',
    termes: [
      ['URL', "L'adresse d'une page sur Internet, celle qu'on tape dans la barre du navigateur. Elle se lit par morceaux : https://www.exemple.nc/page — le protocole, le nom du site, le pays, puis la page.", ['s3-a03-5eme','s3-a04-4eme']],
      ['Navigateur', "Le logiciel qui affiche les pages web : Chrome, Firefox, Edge, Safari. Il n'est pas un moteur de recherche — c'est la fenêtre, pas le moteur.", ['s3-a03-5eme','s3-a04-4eme','s3-a03-4eme']],
      ['Moteur de recherche', "Le service qui cherche des pages à partir de mots-clés : Google, Qwant, Ecosia. Il s'utilise DANS un navigateur.", ['s3-a03-5eme','s3-a04-4eme']],
      ["Système d'exploitation", "Le logiciel de base qui fait fonctionner l'appareil et lance tous les autres : Windows, Android, iOS, Linux.", ['s3-a03-5eme']],
      ['Serveur', "Un ordinateur allumé en permanence qui rend un service aux autres : stocker des fichiers, héberger un site, distribuer des pages. Le tien, en face, est le client.", ['s3-a02-5eme','s3-a03-4eme','s3-a01-5eme']],
      ['Paquet', "Un message envoyé sur un réseau est découpé en petits morceaux, les paquets. Chacun voyage de son côté et porte l'adresse d'arrivée ; ils sont remis dans l'ordre à la fin.", ['s3-a02-5eme']],
      ['Donnée personnelle', "Toute information qui permet de te reconnaître : nom, âge, photo, adresse, mais aussi la liste des sites que tu visites. Elle t'appartient, et la loi te donne des droits dessus.", ['s4-a02-4eme','s4-a02-5eme']],
      ['Trace numérique', "Ce que ton activité laisse derrière elle sans que tu l'aies écrit : sites visités, heures de connexion, position. Tu en laisses même quand tu ne publies rien.", ['s4-a02-4eme','s4-a02-5eme']],
      ['Cookie', "Petit fichier qu'un site dépose dans ton navigateur pour te reconnaître d'une visite à l'autre. Certains sont utiles au site, d'autres servent à suivre ce que tu fais ailleurs.", ['s4-a02-4eme','s4-a02-5eme']],
      ['RGPD', "La loi européenne de 2018 sur les données personnelles. Elle te donne quatre droits : savoir ce qu'on a sur toi, faire corriger, faire effacer, refuser un usage.", ['s4-a02-4eme']],
      ['Mot de passe', "La clé qui protège un compte. Ce qui le rend solide est d'abord sa LONGUEUR, pas les caractères bizarres — et il ne sert que pour un seul site.", ['s4-a01-5eme']],
      ['Hameçonnage (phishing)', "Un faux message qui imite une vraie entreprise pour te faire donner ton mot de passe ou ta carte bancaire. Il met presque toujours la pression : « sous 24 h ».", ['s4-a01-4eme']],
      ['Cyberharcèlement', "Des propos ou des actes répétés en ligne qui blessent une personne. C'est un délit puni par la loi, même « pour rire ». Le numéro national est le 3018.", ['s4-a03-5eme']],
      ['Service « gratuit »', "Un service qu'on ne paie pas en argent, mais avec ses données et son attention : l'entreprise revend la possibilité de t'afficher de la publicité ciblée.", ['s3-a04-4eme','s3-a04-5eme']],
    ],
  },
  {
    titre: 'Structures : ce qui tient debout',
    repere: 'STRUCT',
    termes: [
      ['Structure', "La partie d'un objet qui supporte les efforts sans se déformer : la charpente d'une maison, le tablier d'un pont, le cadre d'un vélo.", ['pont-a4-a01']],
      ['Appui', "L'endroit où la structure repose. Un pont a deux appuis : une berge de chaque côté.", ['pont-a4-a01']],
      ['Portée', "La distance entre les deux appuis — et rien d'autre. Ce n'est pas la longueur totale du pont, qui dépasse souvent de ses appuis.", ['pont-a4-a01','pont-a4-a03']],
      ['Charge', "Le poids que la structure doit supporter, en plus du sien.", ['pont-a4-a01','pont-a4-a05']],
      ['Flexion', "La déformation d'une poutre qui plie sous une charge. En fléchissant, elle se raccourcit d'un côté et s'allonge de l'autre.", ['pont-a4-a01']],
      ['Zone comprimée', "La partie de la poutre dont les fibres se rapprochent : le DESSUS, quand la charge est posée au milieu.", ['pont-a4-a01']],
      ['Zone tendue', "La partie de la poutre dont les fibres s'écartent : le DESSOUS, dans le même cas.", ['pont-a4-a01']],
      ['Fibre neutre', "La ligne du milieu de la poutre, qui ne se raccourcit ni ne s'allonge. Plus la matière en est éloignée, plus la structure résiste.", ['pont-a4-a01','pont-a4-a02']],
      ['Ratio', "Le résultat d'une division qui compare deux grandeurs. Ici : la charge de rupture divisée par la masse de la structure. Un ratio n'a pas d'unité : c'est un nombre de fois.", ['pont-a4-a05','pont-a4-a06']],
    ],
  },
  {
    titre: 'Mesurer et prouver',
    repere: 'MESURE',
    termes: [
      ['Protocole', "La liste précise des gestes à faire pour une mesure, écrite AVANT de mesurer. Deux résultats ne se comparent que s'ils viennent du même protocole.", ['s5-a05-4eme','pont-a4-a05','amplificateur-passif-a05']],
      ['Grandeur contrôlée', "Une grandeur qu'on maintient identique exprès, pour qu'elle n'explique pas le résultat.", ['amplificateur-passif-a02','amplificateur-passif-a04']],
      ['Variable expérimentale', "La grandeur qu'on fait varier exprès, et la seule. Si on en change deux à la fois, on ne sait plus laquelle a produit l'effet.", ['amplificateur-passif-a02']],
      ["Plan d'expérience", "L'organisation d'une campagne de mesures entre plusieurs groupes : une variable par groupe, tout le reste identique. C'est ce qui rend le tableau de classe exploitable.", ['amplificateur-passif-a02']],
      ['Étendue', "L'écart entre la plus grande et la plus petite de plusieurs mesures répétées. Une étendue faible veut dire que la mesure est fiable.", ['amplificateur-passif-a05']],
      ['Gain', "La différence entre une mesure et une mesure de référence. Un gain seul ne veut rien dire : il faut savoir par rapport à quoi.", ['amplificateur-passif-a01','amplificateur-passif-a05']],
      ['Objet passif', "Un objet qui ne consomme aucune énergie : ni pile, ni branchement. Il ne crée rien, il se contente de mieux diriger ce qui existe déjà.", ['amplificateur-passif-a01']],
    ],
  },
  {
    titre: 'Dessiner pour fabriquer',
    repere: 'DESSIN',
    termes: [
      ['Développé', "Le dessin à plat d'un objet en volume, tel qu'il faut le découper avant de le rouler ou de le plier. Le développé d'un cylindre est un rectangle de longueur π × D.", ['abat-jour-a03','amplificateur-passif-a03']],
      ['Génératrice', "Sur un cône, la distance qui va de la pointe au bord du cercle en suivant la surface. Elle se calcule avec le théorème de Pythagore.", ['amplificateur-passif-a03']],
      ['Entraxe', "La distance entre les centres de deux perçages voisins. Elle se mesure de centre à centre, pas de bord à bord.", ['abat-jour-a02','abat-jour-a03']],
      ['Pont de matière', "Ce qui reste de matière entre deux perçages. En dessous de 3 mm, le carton se déchire au montage.", ['abat-jour-a03']],
      ["Taux d'ajour", "Le pourcentage de la surface qui est percée. Plus il est élevé, plus la lumière passe — et moins la pièce tient.", ['abat-jour-a02','abat-jour-a06']],
      ['Cotation', "L'écriture des dimensions sur un dessin. En Technologie, toutes les cotes s'écrivent en millimètres.", ['s5-a02-4eme','s5-a02-5eme','s5-a05-5eme','s5-a03-5eme']],
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

// Les mots du lexique employés dans une activité donnée. Le troisième élément
// d'un terme liste les activités où il est réellement mobilisé : c'est ce qui
// permet d'afficher le vocabulaire utile SUR la fiche, plutôt que de renvoyer
// l'élève à une liste de 18 définitions dont 2 le concernent.
export const motsDe = (slug: string) =>
  lexique.flatMap(s =>
    s.termes
      .filter(t => (t[2] as string[] | undefined)?.includes(slug))
      .map(t => ({ mot: t[0] as string, def: t[1] as string, theme: s.repere })));
