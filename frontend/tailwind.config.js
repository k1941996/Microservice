module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class', // Enable dark mode by adding a class
  theme: {
    extend: {
      colors: {
        dark: {
          background: '#1a202c', // Example dark background color
          navbar: '#2d3748', // Example dark navbar color
          text: '#e2e8f0', // Example dark text color
        },
        light: {
          background: '#f7fafc', // Example light background color
          navbar: '#edf2f7', // Example light navbar color
          text: '#2d3748', // Example light text color
        },
      },
    },
  },
  plugins: [require("daisyui")],
};
