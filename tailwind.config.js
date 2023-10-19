/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            fontSize: {
                dynamicSmall: 'clamp(0.75rem, 0.0344rem + 3.0534vw, 1.5rem)',
                dynamicMid: 'clamp(1.5rem, 1.0229rem + 2.0356vw, 2rem)',
                dynamicLarge: 'clamp(1rem, 0.6667rem + 0.5208vw, 1.5rem)'
            },
            width: {
                dynamicBorder: 'clamp(64rem, 42.6667rem + 33.3333vw, 96rem)'
            }
        }
    },
    plugins: []
};
