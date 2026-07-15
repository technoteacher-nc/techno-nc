import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://technoteacher-nc.github.io',
  base: '/techno-nc',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
});
