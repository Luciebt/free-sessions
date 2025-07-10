/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Include all your source files
  ],
  theme: {
    extend: {
      colors: {
        primary: '#946b5c',
        secondary: '#7c2d12',
        accent: '#ffedd5',
        lightAccent: '#ffedd5',
        background: '#fff7ed',
        text: '#15191C',
        lightText: '#3D4447',
        white: '#fff7ed',
        black: '#15191C',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

