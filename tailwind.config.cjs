/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: ['./docs/**/*.{html,js,vue,ts,md}'],
    theme: {
        extend: {
            colors: {
                primary: '#f26f25',
            },
        },
    },
    plugins: [],
};
