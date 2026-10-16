/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  corePlugins: {
    // Preserve Phive's base styling and avoid preflight resetting custom font variables
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        phive: {
          yellow: '#ffe000',
          warmYellow: '#ffd904',
          subduedYellow: '#f6c548',
          lightYellow: '#fff4a6',
          darkBrown: '#161003',
          midBrown: '#211e16',
          lightBrown: '#3c3627',
          warmGrey: '#f3efd7',
          stream: '#b76eff',
          pilates: '#f7bbce',
          nutrition: '#d9f7bb',
        }
      },
      fontFamily: {
        formula: ['PPFormula', 'sans-serif'],
        grotesk: ['AcidGrotesk', 'sans-serif'],
        script: ['PureHeart', 'cursive'],
      }
    },
  },
  plugins: [],
}
