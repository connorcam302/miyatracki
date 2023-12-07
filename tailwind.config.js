/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				ember: '#F05E1B'
			},
			fontFamily: {
				display: ['Poppins', 'sans-serif'],
				sans: ['Lato', 'sans-serif'],
				title: ['Alegreya Sans SC', 'sans-serif']
			}
		}
	},
	plugins: []
};
