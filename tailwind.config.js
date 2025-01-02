/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                blue: "#A4D4B4",
                black: "#1a1a1a",
                red: "#A63446",
            },
            spacing: {
                22: "5.5rem",
                24: "6rem",
                26: "6.5rem",
                28: "7rem",
                30: "7.5rem",
                32: "8rem",
                34: "8.5rem",
            },
        },
    },
    plugins: [],
};
