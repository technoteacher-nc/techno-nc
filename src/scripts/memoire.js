// La mémoire du site — entièrement locale.
//
// POURQUOI. Le site donnait ce qu'on venait chercher, puis oubliait qui était
// passé : aucune trace des activités ouvertes, aucun score de quiz, aucune
// reprise là où l'on s'était arrêté. Un élève n'avait aucune raison de revenir
// autrement que pour re-télécharger un PDF.
//
// CE QUE ÇA NE FAIT PAS, et c'est le point important. Le pied de page promet
// « aucun compte, aucun cookie, aucun traceur », et la promesse tient :
//
//   - `localStorage` n'est pas un cookie : il n'est JAMAIS envoyé au serveur,
//     ni à personne d'autre. Le site est un site statique — il n'a pas de
//     serveur qui pourrait le recevoir ;
//   - rien n'identifie l'élève : ni nom, ni identifiant, ni empreinte. On
//     stocke des adresses de pages et des nombres ;
//   - tout est effaçable en un clic depuis le mode d'emploi, et disparaît de
//     toute façon si l'élève vide les données de son navigateur.
//
// Un téléphone partagé entre frères et sœurs mélangera donc les deux mémoires.
// C'est assumé : l'alternative serait un compte, c'est-à-dire exactement ce
// qu'on ne veut pas.

const CLE = 'techno-nc:v1';

// Toute lecture peut échouer : navigation privée sur iOS, stockage plein,
// réglage d'entreprise. Dans ce cas le site fonctionne comme avant, sans
// mémoire — jamais avec une erreur à l'écran.
function lire() {
  try {
    const brut = localStorage.getItem(CLE);
    if (!brut) return { vues: {}, quiz: {}, dernier: null };
    const o = JSON.parse(brut);
    return {
      vues: o && typeof o.vues === 'object' ? o.vues : {},
      quiz: o && typeof o.quiz === 'object' ? o.quiz : {},
      dernier: o && o.dernier ? o.dernier : null,
    };
  } catch {
    return { vues: {}, quiz: {}, dernier: null };
  }
}

function ecrire(etat) {
  try { localStorage.setItem(CLE, JSON.stringify(etat)); } catch { /* tant pis */ }
}

/** Note qu'une activité a été ouverte, et retient où reprendre. */
export function noterVisite(slug, titre, lien) {
  if (!slug) return;
  const e = lire();
  e.vues[slug] = Date.now();
  e.dernier = { slug, titre, lien };
  ecrire(e);
}

/** Les identifiants d'activités déjà ouvertes. */
export function activitesVues() {
  return lire().vues;
}

/** Retient le MEILLEUR score d'un quiz, jamais le dernier : rejouer et rater
 *  ne doit pas effacer une réussite. */
export function noterQuiz(id, justes, total) {
  if (!id) return;
  const e = lire();
  const ancien = e.quiz[id];
  if (!ancien || justes > ancien.justes) e.quiz[id] = { justes, total };
  ecrire(e);
}

export function scoresQuiz() {
  return lire().quiz;
}

/** La dernière activité ouverte, pour le bouton « reprendre ». */
export function dernierePage() {
  return lire().dernier;
}

export function toutEffacer() {
  try { localStorage.removeItem(CLE); } catch { /* tant pis */ }
}

/** Y a-t-il quelque chose en mémoire ? Sert à n'afficher les blocs de reprise
 *  que lorsqu'ils ont un sens. */
export function memoireNonVide() {
  const e = lire();
  return Object.keys(e.vues).length > 0 || Object.keys(e.quiz).length > 0;
}
