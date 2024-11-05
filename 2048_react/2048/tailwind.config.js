/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        gray: '#555555',
        tan: {
          100: '#cdc1b5',
          200: '#bbada0',
          300: '#a09182',
        },
        tile: {
          2: '#eee4da',
          4: '#ece0ca',
          8: '#f4b17a',
          16: '#f59575',
          32: '#f57c5f',
          64: '#f65d3b',
          128: '#edce71',
          256: '#edcc63',
          512: '#edc651',
          1024: '#eec744',
          2048: '#ecc230',
          4096: '#fe3d3d',
          8192: '#ff2020',
        },
      },
    },
  },
  plugins: [],
}
