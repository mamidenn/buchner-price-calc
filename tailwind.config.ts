import { join } from 'path';
import type { Config } from 'tailwindcss';
import { skeleton } from '@skeletonlabs/tw-plugin';
import typoggraphy from '@tailwindcss/typography';
import forms from '@tailwindcss/forms';
import { buchner } from './buchner-theme';

const config = {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
	],
	theme: {
		extend: {}
	},
	plugins: [typoggraphy, forms, skeleton({ themes: { preset: ['skeleton'], custom: [buchner] } })]
} satisfies Config;

export default config;
