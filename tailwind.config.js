/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors:{
        dgrey1: {
          DEFAULT: "#F3F3F3"
        },
        dwhite1: {
          DEFAULT: "#FFF"
        },
        dborderblack: {
          DEFAULT: "#0d143c"
        },
        dbasenavy: {
          DEFAULT: "#002b5c"
        },
        dbasenavy: {
          DEFAULT: "#002b5c"
        },
      }
    },
  },
  plugins: [],
}
