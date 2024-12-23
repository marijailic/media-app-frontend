/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                blue: "#A4D4B4",
                black: "#1a1a1a",
            },
        },
    },
    plugins: [],
};
