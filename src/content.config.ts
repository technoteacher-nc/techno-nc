import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const activites = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/activites' }),
  schema: z.object({
    code: z.string(),
    niveau: z.enum(['5eme', '4eme']),
    niveauLabel: z.string(),
    semaine: z.string(),
    phase: z.string(),
    titre: z.string(),
    question: z.string(),
    objectif: z.string(),
    competences: z.array(z.string()),
    prerequis: z.string(),
    materiel: z.string(),
    annee: z.string(),
    seq: z.string(),
    seqTitre: z.string(),
    fichePdf: z.string(),
    ficheDocx: z.string(),
    ebepPdf: z.string(),
    qr: z.string(),
  }),
});

export const collections = { activites };
