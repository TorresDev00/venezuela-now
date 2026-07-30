// @ts-check

import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { SITE_URL } from './src/consts.ts';

// https://astro.build/config
export default defineConfig({
	site: SITE_URL,
	i18n: {
		defaultLocale: 'en',
		locales: ['en', 'es'],
		routing: {
			prefixDefaultLocale: false, // inglés sin prefijo: /donate, /about — español con prefijo: /es/donar, /es/acerca
		},
	},
	integrations: [sitemap()],
	prefetch: {
		prefetchAll: true,
	},
	vite: {
		plugins: [tailwindcss()],
	},
	// Los iconos flotantes (mano/arrastre, engranaje de ajustes) que se veían
	// abajo a la izquierda superpuestos al indicador "Conocer más" del Hero
	// son la barra de herramientas de desarrollo de Astro, no un componente
	// del sitio. Nunca se incluye en el build de producción; se desactiva
	// aquí para que la vista previa local coincida con producción.
	devToolbar: {
		enabled: false,
	},
});
