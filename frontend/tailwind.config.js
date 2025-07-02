module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        twinkle: 'twinkle 5s infinite alternate',
      },
      keyframes: {
        twinkle: {
          '0%': { opacity: 0.2 },
          '100%': { opacity: 1 },
        },
      },
      colors: {
        dark: {
          100: '#1a202c',
          200: '#2d3748',
          300: '#4a5568',
          400: '#718096',
        },
      },
    },
  },
  plugins: [],
}