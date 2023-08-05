/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        code: "#476582",
        "code-dark": "#c9def1",
      },
      backgroundColor: {
        code: "#f6f6f7",
        "code-dark": "#313136",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
}
// linear-gradient(to bottom,transparent,rgb(var(--background-end-rgb))) rgb(var(--background-start-rgb));
