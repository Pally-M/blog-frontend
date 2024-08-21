export default {
    content: [
        "./public/index.html",
        "./scr/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: { 
            backgroundColor: {
                'header-pattern': '#EEDBCD',
                'custom-bg-color': '#FFB0B0',
            },
            boxShadow: {
                'header-bottom': '0 4px 10px -2px #FFB0B0',
            },
            fontFamily: {
                'custom': ['Roboto', 'sans-serif'],
            },
        },
    },
    plugins: [],
}