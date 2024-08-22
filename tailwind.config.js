export default {
    content: [
        "./public/index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: { 
            backgroundColor: {
                'header-pattern': '#EEDBCD',
                'custom-bg-color': '#F4E9E0',
            },
            boxShadow: {
                'header-bottom': '0 4px 10px -2px #F4E9E0',
            },
            fontFamily: {
                'custom': ['Roboto', 'sans-serif'],
            },
        },
    },
    plugins: [],
}