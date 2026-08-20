import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://technoteacher-nc.github.io',
  base: '/techno-nc',
  trailingSlash: 'ignore',
  // La compression HTML d'Astro ne réduit pas le saut de ligne à une espace :
  // elle le SUPPRIME. Un texte écrit sur deux lignes, avec la mise en gras au
  // début de la seconde, sortait collé — « Ce site est là pourrécupérer une
  // fiche ». Le défaut touchait toutes les pages, et le gain de poids ne vaut
  // pas des mots collés dans un texte lu par des élèves.
  compressHTML: false,
  build: { format: 'directory' },
  integrations: [sitemap()],
});
