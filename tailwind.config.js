/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#050e51",
        accent: "#1c6e77",
        softGreen: "#3ab480",
        mutedPurple: "#a33a94",
        lightGray: "#fdf0f1",
      },
    },
  },
  plugins: [daisyui],
};


