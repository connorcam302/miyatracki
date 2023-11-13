/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        extend: {
            colors: {
                ember: '#F05E1B'
            },
            fontFamily: {
                sans: ['Alegreya Sans SC', 'sans-serif'],
                display: ['Open Sans', 'sans-serif']
            }
        }
    },
    plugins: []
};
