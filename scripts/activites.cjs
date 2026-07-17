// activites.js — registre des activités SEQ05
// Source unique : alimente le site ET les QR codes.
// Les champs objectif/competences/prerequis proviennent de gen_s5_deroules.js
// Les champs titre/question proviennent de gen_s5_fiches_*.js

const ANNEE = "2026";
const SEQ = { code: "seq05", num: "05", nom: "CONCEPTION", titre: "Séquence 05 — Conception" };

const ACTIVITES_SEQ05 = [
  // ---------- 5ÈME ----------
  {
    code: "S5-A01", niveau: "5eme", niveauLabel: "5ème", semaine: "S26",
    phase: "Analyser",
    titre: "Ma maison en NC : du besoin au cahier des charges",
    question: "Comment passer d'un besoin à un cahier des charges que l'architecte peut utiliser ?",
    objectif: "Distinguer besoin/envie, rédiger un CDC simplifié avec contraintes NC, dimensionner ses pièces (+10 % dégagements).",
    competences: ["OST22 — Contraintes et exigences d'un CDC", "CCRI11 — S'inscrire dans un processus de conception"],
    prerequis: "Aucun (lancement de séquence).",
    materiel: "Fiche S5-A01 · calculatrice",
    fiche: "FICHE_S5-A01_BesoinCDC_5eme",
    ebep: "EBEP_S5-A01_BesoinCDC_5eme",
  },
  {
    code: "S5-A02", niveau: "5eme", niveauLabel: "5ème", semaine: "S27",
    phase: "Représenter",
    titre: "Le plan aux normes : les codes de représentation",
    question: "Comment dessiner un plan que tout le monde comprend, à la bonne échelle ?",
    objectif: "Connaître les symboles architecturaux, maîtriser l'échelle 1/100, produire SON plan conforme au CDC.",
    competences: ["OST13/SFC16 — Codes de représentation, échelle", "OST22 — Cahier des charges"],
    prerequis: "S5-A01 (CDC, surfaces).",
    materiel: "Fiche S5-A02 · papier quadrillé · règle",
    fiche: "FICHE_S5-A02_PlanCodes_5eme",
    ebep: "EBEP_S5-A02_PlanCodes_5eme",
  },
  {
    code: "S5-A03", niveau: "5eme", niveauLabel: "5ème", semaine: "S28",
    phase: "Modéliser",
    titre: "Sweet Home 3D (1) : pièces et murs",
    question: "Comment transformer mon plan papier en maquette numérique ?",
    objectif: "Identifier les 4 zones du logiciel, créer et nommer les pièces, tracer les murs, contrôler les surfaces vs CDC.",
    competences: ["CCRI16 — Réaliser une forme selon une procédure (modélisation)", "OST13 — Organiser et stocker ses fichiers"],
    prerequis: "S5-A02 (plan validé).",
    materiel: "Sweet Home 3D · fiche S5-A03 · plan papier de S27",
    fiche: "FICHE_S5-A03_SweetHome1_5eme",
    ebep: "EBEP_S5-A03_SweetHome1_5eme",
  },
  {
    code: "S5-A04", niveau: "5eme", niveauLabel: "5ème", semaine: "S29",
    phase: "Modéliser",
    titre: "Sweet Home 3D (2) : ouvertures, meubles et vues",
    question: "Comment finaliser et présenter ma maquette numérique ?",
    objectif: "Poser portes/fenêtres, meubler, produire le dossier client (captures 2D/3D commentées), s'auto-critiquer.",
    competences: ["CCRI16 — Réaliser une forme à l'aide d'une modélisation", "OST13 — Organiser ses fichiers"],
    prerequis: "S5-A03 (fichier .sh3d avec pièces et murs).",
    materiel: "Sweet Home 3D · fiche S5-A04",
    fiche: "FICHE_S5-A04_SweetHome2_5eme",
    ebep: "EBEP_S5-A04_SweetHome2_5eme",
  },
  {
    code: "S5-A05", niveau: "5eme", niveauLabel: "5ème", semaine: "S30",
    phase: "Fabriquer",
    titre: "La maquette papier de ma pièce préférée (échelle 1/20)",
    question: "Comment passer de la maquette numérique à une maquette en volume, à l'échelle ?",
    objectif: "Convertir à l'échelle 1/20, tracer un patron (sol + 4 murs + languettes), fabriquer, contrôler (±2 mm, équerrage ficelle).",
    competences: ["CCRI12/CCRI15 — Fabriquer, assembler", "SFC16 — Échelle"],
    prerequis: "S5-A04 (dimensions de sa pièce dans Sweet Home).",
    materiel: "Papier 160 g · règle, équerre, ciseaux, colle · ficelle · fiche S5-A05",
    fiche: "FICHE_S5-A05_MaquettePapier_5eme",
    ebep: "EBEP_S5-A05_Maquette_5eme",
  },
  {
    code: "S5-A06", niveau: "5eme", niveauLabel: "5ème", semaine: "S31",
    phase: "Produire",
    titre: "L'atelier de fabrication : imprimante 3D et découpe laser",
    question: "Comment une machine fabrique-t-elle un objet à partir d'un simple fichier ?",
    objectif: "Découvrir les procédés additif et soustractif, les règles de sécurité d'atelier, comparer les procédés.",
    competences: ["SFC23 — Découvrir les procédés d'un atelier de fabrication"],
    prerequis: "S5-A05 (maquettes fabriquées).",
    materiel: "Imprimante 3D · découpeuse laser · fiche S5-A06 · maquettes de S30",
    fiche: "FICHE_S5-A06_Atelier3DLaser_5eme",
    ebep: "EBEP_S5-A06_Atelier_5eme",
  },

  // ---------- 4ÈME ----------
  {
    code: "S5-A01", niveau: "4eme", niveauLabel: "4ème", semaine: "S26",
    phase: "Analyser",
    titre: "Le support de smartphone : du besoin au CDC",
    question: "Comment traduire un besoin flou en cahier des charges précis et vérifiable ?",
    objectif: "Formuler un besoin (3 questions), rédiger un CDC 4 colonnes avec critères mesurables, analyser l'existant.",
    competences: ["OST22 — CDC (critère, niveau)", "CCRI11 — Processus de conception"],
    prerequis: "Retour du brevet blanc.",
    materiel: "Fiche S5-A01 · réglet",
    fiche: "FICHE_S5-A01_CDC_4eme",
    ebep: "EBEP_S5-A01_CDC_4eme",
  },
  {
    code: "S5-A02", niveau: "4eme", niveauLabel: "4ème", semaine: "S27",
    phase: "Représenter",
    titre: "Croquis coté et perspective",
    question: "Comment représenter une solution pour qu'un autre puisse la fabriquer ?",
    objectif: "Appliquer les règles du croquis coté (mm, cotes uniques), produire 3 solutions dont une perspective, choisir par le CDC.",
    competences: ["CCRI12 — Représenter des solutions (croquis coté)", "OST22 — Cahier des charges"],
    prerequis: "S5-A01 (CDC + largeur d'encoche mesurée).",
    materiel: "Fiche S5-A02 · réglet · équerre",
    fiche: "FICHE_S5-A02_CroquisCote_4eme",
    ebep: "EBEP_S5-A02_Croquis_4eme",
  },
  {
    code: "S5-A03", niveau: "4eme", niveauLabel: "4ème", semaine: "S28",
    phase: "Modéliser",
    titre: "SketchUp (1) : formes exactes et poussé-tiré",
    question: "Comment modéliser ma solution aux dimensions exactes de mon croquis ?",
    objectif: "Prendre en main SketchUp (axes, mesures, poussé-tiré), modéliser la base aux cotes exactes, contrôler à l'outil Mètre.",
    competences: ["CCRI16 — Modifier une forme à l'aide d'une modélisation"],
    prerequis: "S5-A02 (croquis coté).",
    materiel: "SketchUp Make 2017 · fiche S5-A03 · croquis coté de S27",
    fiche: "FICHE_S5-A03_SketchUp1_4eme",
    ebep: "EBEP_S5-A03_SketchUp1_4eme",
  },
  {
    code: "S5-A04", niveau: "4eme", niveauLabel: "4ème", semaine: "S29",
    phase: "Modéliser",
    titre: "SketchUp (2) : le modèle final coté",
    question: "Comment finaliser un modèle 3D prêt pour la fabrication ?",
    objectif: "Creuser l'encoche (poussé-tiré négatif), créer la butée, vérifier l'angle, poser les cotes, exporter le dossier.",
    competences: ["CCRI16 — Produire la forme voulue", "OST22 — Revue de conception vs CDC"],
    prerequis: "S5-A03 (base modélisée aux cotes).",
    materiel: "SketchUp · fiche S5-A04",
    fiche: "FICHE_S5-A04_SketchUp2_4eme",
    ebep: "EBEP_S5-A04_SketchUp2_4eme",
  },
  {
    code: "S5-A05", niveau: "4eme", niveauLabel: "4ème", semaine: "S30",
    phase: "Fabriquer",
    titre: "Prototype carton : je teste ma solution",
    question: "Comment fabriquer un prototype et PROUVER qu'il respecte le CDC ?",
    objectif: "Fabriquer le prototype à l'échelle 1:1 (carton + ficelle), définir et appliquer un protocole de test rigoureux.",
    competences: ["CCRI12 — Fabriquer une solution", "CCRI22/OST34 — Protocole de test, mesure de performance"],
    prerequis: "S5-A04 (cotes réelles du modèle).",
    materiel: "Carton · cutter + tapis + règle métal · ficelle · rapporteur · fiche S5-A05",
    fiche: "FICHE_S5-A05_Prototype_4eme",
    ebep: "EBEP_S5-A05_Prototype_4eme",
  },
  {
    code: "S5-A06", niveau: "4eme", niveauLabel: "4ème", semaine: "S31",
    phase: "Produire",
    titre: "Atelier : impression 3D et découpe laser du modèle",
    question: "Comment passe-t-on d'un modèle 3D à un objet réel, et quel procédé choisir ?",
    objectif: "Observer la chaîne numérique CFAO (.skp → .stl → g-code → pièce), comparer additif/soustractif, choisir un procédé pour une série.",
    competences: ["SFC23 — Choisir les procédés de réalisation", "SFC14 — Relier forme d'une pièce et procédé"],
    prerequis: "S5-A05 (prototypes testés).",
    materiel: "Imprimante 3D · découpeuse laser · fiche S5-A06",
    fiche: "FICHE_S5-A06_Atelier_4eme",
    ebep: "EBEP_S5-A06_Atelier_4eme",
  },
];

// slug URL : s5-a01-5eme
const slug = a => `${a.code.toLowerCase()}-${a.niveau}`;

// --- SEQ_MERGE_MARKER --- (les séquences migrées sont insérées après ce point)
const SEQ_SEQ02 = { code: "seq02", num: "02", nom: "USAGES", titre: "Séquence 02 — USAGES" };
const ACTIVITES_SEQ02 = [
  {
    code: "S2-A06", niveau: "4eme", niveauLabel: "4ème",
    semaine: "", // À COMPLÉTER — non extrait automatiquement
    phase: "Analyser",
    titre: "L'EXPÉRIENCE UTILISATEUR — CONCEVOIR POUR L'UTILISATEUR",
    question: "PROBLÉMATIQUE : Comment améliorer un objet ou un service numérique sans changer sa fonction d'usage ?",
    objectif: "", // À COMPLÉTER
    competences: [], // À COMPLÉTER
    prerequis: "", // À COMPLÉTER
    materiel: "", // À COMPLÉTER
    fiche: "FICHE_S2-A06_UX_4eme",
    ebep: null,
  },
  {
    code: "S2-A06", niveau: "5eme", niveauLabel: "5ème",
    semaine: "", // À COMPLÉTER — non extrait automatiquement
    phase: "Analyser",
    titre: "L'EXPÉRIENCE UTILISATEUR — FACILE OU GALÈRE ?",
    question: "PROBLÉMATIQUE : Pourquoi deux objets qui rendent le même service ne sont-ils pas aussi agréables à utiliser ?",
    objectif: "", // À COMPLÉTER
    competences: [], // À COMPLÉTER
    prerequis: "", // À COMPLÉTER
    materiel: "", // À COMPLÉTER
    fiche: "FICHE_S2-A06_UX_5eme",
    ebep: null,
  },
  {
    code: "S2-A07", niveau: "4eme", niveauLabel: "4ème",
    semaine: "", // À COMPLÉTER — non extrait automatiquement
    phase: "Analyser",
    titre: "COMPARER POUR CHOISIR — LES ORDINATEURS DE LA SALLE 207",
    question: "PROBLÉMATIQUE : Comment comparer objectivement plusieurs objets techniques pour choisir selon un besoin et un budget ?",
    objectif: "", // À COMPLÉTER
    competences: [], // À COMPLÉTER
    prerequis: "", // À COMPLÉTER
    materiel: "", // À COMPLÉTER
    fiche: "FICHE_S2-A07_CHOISIR_4eme",
    ebep: null,
  },
  {
    code: "S2-A07", niveau: "5eme", niveauLabel: "5ème",
    semaine: "", // À COMPLÉTER — non extrait automatiquement
    phase: "Analyser",
    titre: "BIEN CHOISIR UN OBJET TECHNIQUE",
    question: "PROBLÉMATIQUE : Comment choisir l'objet le plus adapté à un besoin, sans se tromper ?",
    objectif: "", // À COMPLÉTER
    competences: [], // À COMPLÉTER
    prerequis: "", // À COMPLÉTER
    materiel: "", // À COMPLÉTER
    fiche: "FICHE_S2-A07_CHOISIR_5eme",
    ebep: null,
  },
];
const SEQ_SEQ03 = { code: "seq03", num: "03", nom: "DONNÉES", titre: "Séquence 03 — DONNÉES" };
const ACTIVITES_SEQ03 = [
  {
    code: "S3-A01", niveau: "4eme", niveauLabel: "4ème",
    semaine: "", // À COMPLÉTER — non extrait automatiquement
    phase: "Analyser",
    titre: "DEUX RÉSEAUX AU COLLÈGE : IP, SWITCH, ROUTEUR",
    question: "PROBLÉMATIQUE : Comment les ordinateurs sont-ils organisés en réseaux, et comment deux réseaux différents communiquent-ils ?",
    objectif: "", // À COMPLÉTER
    competences: [], // À COMPLÉTER
    prerequis: "", // À COMPLÉTER
    materiel: "", // À COMPLÉTER
    fiche: "FICHE_S3-A01_DeuxReseaux_4eme",
    ebep: "EBEP_S3-A01_DeuxReseaux_4eme",
  },
  {
    code: "S3-A01", niveau: "5eme", niveauLabel: "5ème",
    semaine: "", // À COMPLÉTER — non extrait automatiquement
    phase: "Analyser",
    titre: "OÙ VONT MES FICHIERS ? — LE RÉSEAU DU COLLÈGE",
    question: "PROBLÉMATIQUE : Comment mon travail peut-il me suivre d'un ordinateur à l'autre au collège ?",
    objectif: "", // À COMPLÉTER
    competences: [], // À COMPLÉTER
    prerequis: "", // À COMPLÉTER
    materiel: "", // À COMPLÉTER
    fiche: "FICHE_S3-A01_ReseauCollege_5eme",
    ebep: "EBEP_S3-A01_ReseauCollege_5eme",
  },
  {
    code: "S3-A02", niveau: "4eme", niveauLabel: "4ème",
    semaine: "", // À COMPLÉTER — non extrait automatiquement
    phase: "Modéliser",
    titre: "FILIUS (1) : MON RÉSEAU LOCAL OPÉRATIONNEL",
    question: "PROBLÉMATIQUE : Comment construire un réseau local et PROUVER qu'il fonctionne ?",
    objectif: "", // À COMPLÉTER
    competences: [], // À COMPLÉTER
    prerequis: "", // À COMPLÉTER
    materiel: "", // À COMPLÉTER
    fiche: "FICHE_S3-A02_Filius1_4eme",
    ebep: "EBEP_S3-A02_Filius1_4eme",
  },
  {
    code: "S3-A02", niveau: "5eme", niveauLabel: "5ème",
    semaine: "", // À COMPLÉTER — non extrait automatiquement
    phase: "Représenter",
    titre: "LE VOYAGE D'UN MESSAGE : DE NOUMÉA À PARIS",
    question: "PROBLÉMATIQUE : Quel chemin parcourt un message qui voyage sur Internet ?",
    objectif: "", // À COMPLÉTER
    competences: [], // À COMPLÉTER
    prerequis: "", // À COMPLÉTER
    materiel: "", // À COMPLÉTER
    fiche: "FICHE_S3-A02_VoyageMessage_5eme",
    ebep: "EBEP_S3-A02_VoyageMessage_5eme",
  },
  {
    code: "S3-A03", niveau: "4eme", niveauLabel: "4ème",
    semaine: "", // À COMPLÉTER — non extrait automatiquement
    phase: "Modéliser",
    titre: "FILIUS (2) : UN INTERNET MINIATURE — ROUTEUR ET DNS",
    question: "PROBLÉMATIQUE : Comment des réseaux différents communiquent-ils, et comment une URL devient-elle une adresse IP ?",
    objectif: "", // À COMPLÉTER
    competences: [], // À COMPLÉTER
    prerequis: "", // À COMPLÉTER
    materiel: "", // À COMPLÉTER
    fiche: "FICHE_S3-A03_Filius2_4eme",
    ebep: "EBEP_S3-A03_Filius2_4eme",
  },
  {
    code: "S3-A03", niveau: "5eme", niveauLabel: "5ème",
    semaine: "", // À COMPLÉTER — non extrait automatiquement
    phase: "Analyser",
    titre: "NAVIGATEUR, MOTEUR, SYSTÈME : QUI FAIT QUOI ?",
    question: "PROBLÉMATIQUE : Quels logiciels utilisons-nous vraiment pour aller sur Internet, et qui les possède ?",
    objectif: "", // À COMPLÉTER
    competences: [], // À COMPLÉTER
    prerequis: "", // À COMPLÉTER
    materiel: "", // À COMPLÉTER
    fiche: "FICHE_S3-A03_LogicielsGAFAM_5eme",
    ebep: "EBEP_S3-A03_Logiciels_5eme",
  },
  {
    code: "S3-A04", niveau: "4eme", niveauLabel: "4ème",
    semaine: "", // À COMPLÉTER — non extrait automatiquement
    phase: "Analyser",
    titre: "GRATUITS, VRAIMENT ? URL, MOTEURS ET GAFAM",
    question: "PROBLÉMATIQUE : Que payons-nous vraiment quand un service en ligne est « gratuit » ?",
    objectif: "", // À COMPLÉTER
    competences: [], // À COMPLÉTER
    prerequis: "", // À COMPLÉTER
    materiel: "", // À COMPLÉTER
    fiche: "FICHE_S3-A04_GAFAM_4eme",
    ebep: "EBEP_S3-A04_GAFAM_4eme",
  },
  {
    code: "S3-A04", niveau: "5eme", niveauLabel: "5ème",
    semaine: "", // À COMPLÉTER — non extrait automatiquement
    phase: "Modéliser",
    titre: "FILIUS : JE CONSTRUIS MON PREMIER RÉSEAU",
    question: "PROBLÉMATIQUE : Comment relier des ordinateurs pour qu'ils communiquent, et comment vérifier que ça marche ?",
    objectif: "", // À COMPLÉTER
    competences: [], // À COMPLÉTER
    prerequis: "", // À COMPLÉTER
    materiel: "", // À COMPLÉTER
    fiche: "FICHE_S3-A04_Filius_5eme",
    ebep: "EBEP_S3-A04_Filius_5eme",
  },
];
const SEQ_SEQ04 = { code: "seq04", num: "04", nom: "CYBERSEC", titre: "Séquence 04 — CYBERSEC" };
const ACTIVITES_SEQ04 = [
  {
    code: "S4-A01", niveau: "4eme", niveauLabel: "4ème",
    semaine: "", // À COMPLÉTER — non extrait automatiquement
    phase: "Analyser",
    titre: "PHISHING : L'AUDIT DE LA BOÎTE MAIL",
    question: "PROBLÉMATIQUE : Comment repérer un message piégé, et comment verrouiller ses accès ?",
    objectif: "", // À COMPLÉTER
    competences: [], // À COMPLÉTER
    prerequis: "", // À COMPLÉTER
    materiel: "", // À COMPLÉTER
    fiche: "FICHE_S4-A01_Phishing_4eme",
    ebep: "EBEP_S4-A01_Phishing_4eme",
  },
  {
    code: "S4-A01", niveau: "5eme", niveauLabel: "5ème",
    semaine: "", // À COMPLÉTER — non extrait automatiquement
    phase: "Analyser",
    titre: "MOT DE PASSE : LA CLÉ DE MA VIE NUMÉRIQUE",
    question: "PROBLÉMATIQUE : Comment protéger efficacement mes comptes ?",
    objectif: "", // À COMPLÉTER
    competences: [], // À COMPLÉTER
    prerequis: "", // À COMPLÉTER
    materiel: "", // À COMPLÉTER
    fiche: "FICHE_S4-A01_MotsDePasse_5eme",
    ebep: "EBEP_S4-A01_MotsDePasse_5eme",
  },
  {
    code: "S4-A02", niveau: "4eme", niveauLabel: "4ème",
    semaine: "", // À COMPLÉTER — non extrait automatiquement
    phase: "Analyser",
    titre: "TRACES, COOKIES, RGPD : REPRENDRE LA MAIN",
    question: "PROBLÉMATIQUE : Comment nos traces sont-elles exploitées, et quels sont nos droits (RGPD) ?",
    objectif: "", // À COMPLÉTER
    competences: [], // À COMPLÉTER
    prerequis: "", // À COMPLÉTER
    materiel: "", // À COMPLÉTER
    fiche: "FICHE_S4-A02_RGPD_4eme",
    ebep: "EBEP_S4-A02_RGPD_4eme",
  },
  {
    code: "S4-A02", niveau: "5eme", niveauLabel: "5ème",
    semaine: "", // À COMPLÉTER — non extrait automatiquement
    phase: "Analyser",
    titre: "MES TRACES NUMÉRIQUES",
    question: "PROBLÉMATIQUE : Quelles traces est-ce que je laisse sur Internet, et qui peut les voir ?",
    objectif: "", // À COMPLÉTER
    competences: [], // À COMPLÉTER
    prerequis: "", // À COMPLÉTER
    materiel: "", // À COMPLÉTER
    fiche: "FICHE_S4-A02_Traces_5eme",
    ebep: "EBEP_S4-A02_Traces_5eme",
  },
  {
    code: "S4-A03", niveau: "5eme", niveauLabel: "5ème",
    semaine: "", // À COMPLÉTER — non extrait automatiquement
    phase: "Produire",
    titre: "CYBERHARCÈLEMENT : RECONNAÎTRE ET RÉAGIR",
    question: "PROBLÉMATIQUE : Comment reconnaître le cyberharcèlement, et que faire — que l'on soit victime ou témoin ?",
    objectif: "", // À COMPLÉTER
    competences: [], // À COMPLÉTER
    prerequis: "", // À COMPLÉTER
    materiel: "", // À COMPLÉTER
    fiche: "FICHE_S4-A03_Cyberharcelement_5eme",
    ebep: "EBEP_S4-A03_Cyberharcelement_5eme",
  },
];
const SEQ_SEQ06 = { code: "seq06", num: "06", nom: "MEI", titre: "Séquence 06 — MEI" };
const ACTIVITES_SEQ06 = [
  {
    code: "S6-A01", niveau: "4eme", niveauLabel: "4ème",
    semaine: "", // À COMPLÉTER — non extrait automatiquement
    phase: "Analyser",
    titre: "mBOT : UN VRAI SYSTÈME À DÉCORTIQUER",
    question: "PROBLÉMATIQUE : Que se passe-t-il entre l'obstacle détecté et le demi-tour du robot ?",
    objectif: "", // À COMPLÉTER
    competences: [], // À COMPLÉTER
    prerequis: "", // À COMPLÉTER
    materiel: "", // À COMPLÉTER
    fiche: "FICHE_S6-A01_AnatomieMBot_4eme",
    ebep: "EBEP_S6-A01_MBot_4eme",
  },
  {
    code: "S6-A01", niveau: "5eme", niveauLabel: "5ème",
    semaine: "", // À COMPLÉTER — non extrait automatiquement
    phase: "Représenter",
    titre: "LE ROBOT ASPIRATEUR : PROGRAMMER SANS ORDINATEUR",
    question: "PROBLÉMATIQUE : Comment donner des ordres à une machine qui ne comprend que des instructions précises ?",
    objectif: "", // À COMPLÉTER
    competences: [], // À COMPLÉTER
    prerequis: "", // À COMPLÉTER
    materiel: "", // À COMPLÉTER
    fiche: "FICHE_S6-A01_Debranche_5eme",
    ebep: "EBEP_S6-A01_Debranche_5eme",
  },
  {
    code: "S6-A02", niveau: "4eme", niveauLabel: "4ème",
    semaine: "", // À COMPLÉTER — non extrait automatiquement
    phase: "Modéliser",
    titre: "mBLOCK : MES PREMIERS PROGRAMMES SUR SYSTÈME RÉEL",
    question: "PROBLÉMATIQUE : Comment programmer un robot réel… et régler ce que la simulation ne montre pas ?",
    objectif: "", // À COMPLÉTER
    competences: [], // À COMPLÉTER
    prerequis: "", // À COMPLÉTER
    materiel: "", // À COMPLÉTER
    fiche: "FICHE_S6-A02_mBlock_4eme",
    ebep: "EBEP_S6-A02_mBlock_4eme",
  },
  {
    code: "S6-A02", niveau: "5eme", niveauLabel: "5ème",
    semaine: "", // À COMPLÉTER — non extrait automatiquement
    phase: "Modéliser",
    titre: "SCRATCH (1) : LE PARCOURS CARRÉ",
    question: "PROBLÉMATIQUE : Comment traduire mon algorithme papier en programme qui s'exécute ?",
    objectif: "", // À COMPLÉTER
    competences: [], // À COMPLÉTER
    prerequis: "", // À COMPLÉTER
    materiel: "", // À COMPLÉTER
    fiche: "FICHE_S6-A02_Scratch1_5eme",
    ebep: "EBEP_S6-A02_Scratch1_5eme",
  },
  {
    code: "S6-A03", niveau: "4eme", niveauLabel: "4ème",
    semaine: "", // À COMPLÉTER — non extrait automatiquement
    phase: "Modéliser",
    titre: "CAPTEURS : ÉVITER UN OBSTACLE, SUIVRE UNE LIGNE",
    question: "PROBLÉMATIQUE : Comment un robot peut-il adapter son comportement à ce que mesurent ses capteurs ?",
    objectif: "", // À COMPLÉTER
    competences: [], // À COMPLÉTER
    prerequis: "", // À COMPLÉTER
    materiel: "", // À COMPLÉTER
    fiche: "FICHE_S6-A03_Capteurs_4eme",
    ebep: "EBEP_S6-A03_Capteurs_4eme",
  },
  {
    code: "S6-A03", niveau: "5eme", niveauLabel: "5ème",
    semaine: "", // À COMPLÉTER — non extrait automatiquement
    phase: "Modéliser",
    titre: "SCRATCH (2) : VARIABLES ET ÉVÉNEMENTS",
    question: "PROBLÉMATIQUE : Comment un programme peut-il mémoriser et faire évoluer une valeur ?",
    objectif: "", // À COMPLÉTER
    competences: [], // À COMPLÉTER
    prerequis: "", // À COMPLÉTER
    materiel: "", // À COMPLÉTER
    fiche: "FICHE_S6-A03_Scratch2_5eme",
    ebep: "EBEP_S6-A03_Scratch2_5eme",
  },
  {
    code: "S6-A04", niveau: "4eme", niveauLabel: "4ème",
    semaine: "", // À COMPLÉTER — non extrait automatiquement
    phase: "Produire",
    titre: "LE GRAND DÉFI ROBOT DES MAISONS",
    question: "PROBLÉMATIQUE : Comment mesurer et améliorer objectivement la performance d'un système programmé ?",
    objectif: "", // À COMPLÉTER
    competences: [], // À COMPLÉTER
    prerequis: "", // À COMPLÉTER
    materiel: "", // À COMPLÉTER
    fiche: "FICHE_S6-A04_DefiRobot_4eme",
    ebep: "EBEP_S6-A04_Defi_4eme",
  },
  {
    code: "S6-A04", niveau: "5eme", niveauLabel: "5ème",
    semaine: "", // À COMPLÉTER — non extrait automatiquement
    phase: "Produire",
    titre: "LE DÉFI SCRATCH DES MAISONS",
    question: "PROBLÉMATIQUE : Comment concevoir, tester et améliorer un programme qui répond à un cahier des charges ?",
    objectif: "", // À COMPLÉTER
    competences: [], // À COMPLÉTER
    prerequis: "", // À COMPLÉTER
    materiel: "", // À COMPLÉTER
    fiche: "FICHE_S6-A04_DefiScratch_5eme",
    ebep: "EBEP_S6-A04_Defi_5eme",
  },
];

const SEQUENCES = [
  { SEQ, ACTIVITES: ACTIVITES_SEQ05 },
  { SEQ: SEQ_SEQ02, ACTIVITES: ACTIVITES_SEQ02 },
  { SEQ: SEQ_SEQ03, ACTIVITES: ACTIVITES_SEQ03 },
  { SEQ: SEQ_SEQ04, ACTIVITES: ACTIVITES_SEQ04 },
  { SEQ: SEQ_SEQ06, ACTIVITES: ACTIVITES_SEQ06 },
];

module.exports = { ANNEE, SEQ, ACTIVITES: ACTIVITES_SEQ05, SEQUENCES, slug };
