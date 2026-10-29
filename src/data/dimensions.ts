// Dimensions d'une image PNG de public/, lues au build dans son en-tête.
//
// Écrites dans <img width height>, elles permettent au navigateur de réserver
// la place du schéma avant son arrivée : en 3G, la page ne saute plus quand
// l'image finit de charger. Le CSS (max-width: 100%; height: auto) garde le
// redimensionnement. Fichier absent ou non PNG : aucune dimension, comme avant.
import { openSync, readSync, closeSync } from 'node:fs';
import path from 'node:path';

export function dimensionsPng(rel: string): { width?: number; height?: number } {
  try {
    const fd = openSync(path.join(process.cwd(), 'public', rel), 'r');
    const tete = Buffer.alloc(24);
    readSync(fd, tete, 0, 24, 0);
    closeSync(fd);
    if (tete.toString('latin1', 1, 4) !== 'PNG') return {};
    return { width: tete.readUInt32BE(16), height: tete.readUInt32BE(20) };
  } catch {
    return {};
  }
}
