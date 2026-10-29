// Objectifs d'apprentissage du programme travaillés par une activité.
//
// programme.json : les objectifs, libellés recopiés à l'identique du projet
// d'aménagement des programmes (CSP, juin 2025).
// couverture.json : la correspondance activité → objectifs.
//
// Tant que la correspondance n'est pas validée par l'enseignant
// (statut « valide »), rien n'est affiché : une proposition non relue ne
// part pas sur un site public. `npm run couverture` montre l'état complet.
import programme from './programme.json';
import couverture from './couverture.json';

const libelles = new Map(
  programme.parties.flatMap(p => p.objectifs.map(o => [o.id, o.libelle] as const)),
);

export const objectifsDe = (id: string): string[] =>
  couverture.statut === 'valide'
    ? ((couverture.activites as Record<string, string[]>)[id] ?? []).map(o => libelles.get(o)!).filter(Boolean)
    : [];
