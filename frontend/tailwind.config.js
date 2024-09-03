/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["dark"], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
  },
};
