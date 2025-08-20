/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",          // escanea todos tus archivos React
        "node_modules/flowbite-react/**/*.{js,ts,jsx,tsx}", // Flowbite React
    ],
    theme: {
        extend: {
        colors: {
            primary: '#1D4ED8',
            secondary: '#9333EA',
        },
        },
    },
    plugins: [
        require('flowbite/plugin'), 
    ],
}
