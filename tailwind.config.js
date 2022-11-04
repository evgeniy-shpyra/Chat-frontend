/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                main: '#fff',
                gray_5: '#F2F2F2',
                gray_10: '#E6E6E6',
                gray_15: '#D9D9D9',
                gray_20: '#CCCCCC',
                gray_30: '#B3B3B3',
                gray_40: '#999999',
                gray_50: '#808080',
                gray_60: '#666666',
                background_1: '#84C7AE',
                background_2: '#709587',
                background_3: '#2B8161',
                background_4: '#AAE3CD',
                background_5: '#B9E3D3',
                paragraph: '#32403B',
                second_bg: '#F6FBF9',
            },
        },
        fontFamily: {
            main: 'inter',
        },
    },
    plugins: [require('tailwind-scrollbar')({ nocompatible: true })],
}
