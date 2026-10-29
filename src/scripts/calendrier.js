// La semaine de classe du jour (S1… S36), d'après src/data/calendrier.json.
// S1 est la semaine de la rentrée ; les semaines de vacances ne comptent pas.
// Partagé par « Cette semaine en classe » (accueil) et les pages de niveau.
//
// Renvoie { semaine, lundi } pendant une semaine de classe,
//         { reprise: { date, semaine } } pendant des vacances,
//         null avant la rentrée ou après la fin des cours.
export const JOUR = 86400000;
const SEM = 7 * JOUR;
const jour = s => Date.UTC(+s.slice(0, 4), +s.slice(5, 7) - 1, +s.slice(8, 10));

// La date du jour en Nouvelle-Calédonie, quel que soit le réglage de l'appareil.
export const aujourdhui = () => jour(new Intl.DateTimeFormat('en-CA', { timeZone: 'Pacific/Noumea' }).format(new Date()));

export function semaineDeClasse(cal, auj = aujourdhui()) {
  if (!cal || cal.statut !== 'valide') return null;
  const periodes = [];
  let debut = jour(cal.rentree);
  for (const v of cal.vacances) { periodes.push([debut, jour(v.debut)]); debut = jour(v.reprise); }
  periodes.push([debut, jour(cal.finCours)]);
  let avant = 0;
  for (const [a, b] of periodes) {
    if (auj >= a && auj < b) { const k = Math.floor((auj - a) / SEM); return { semaine: avant + k + 1, lundi: a + k * SEM }; }
    if (auj < a) return avant > 0 ? { reprise: { date: a, semaine: avant + 1 } } : null;
    avant += Math.ceil((b - a) / SEM);
  }
  return null;
}
