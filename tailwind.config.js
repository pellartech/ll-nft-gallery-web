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
    },
    backgroundColor: {
      "dark-90": "#1C1C1C",
      grey: "#161616",
      white: "#FFFFFF",
      line: "#2C2C2C",
    },
    colors: {
      "grey-80": "#A9A9A9",
      white: "#FFFFFF",
      black: "#000000",
    },
  },
  plugins: [],
};
