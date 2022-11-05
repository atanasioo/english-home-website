/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  important: true,
  theme: {
    extend: {

      screens: {
        xs: "320px",
        sm: "640px",
        // => @media (min-width: 640px) { ... }
  
        md: "768px",
        // => @media (min-width: 768px) { ... }
  
        lg: "1024px",
        // => @media (min-width: 1024px) { ... }
  
        xl: "1280px",
        // => @media (min-width: 1280px) { ... }
  
        "2xl": "1536px"
      },

      fontSize: {
        d13: "13px",
        d11: "11px",
        d12: "12px",
        d10: "10px",
        d14: "14px",
        d15: "15px",
        d16: "16px",
        d20: "20.5712px",
  
        d6: "6px",
        d22: "22px",
        xs: ".75rem",
        sm: ".875rem",
        tiny: ".875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        m: "1.6rem",
        xxl: "2em",
  
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "4rem",
        "7xl": "5rem"
      },

      colors:{
        dgrey1: {
          DEFAULT: "#F3F3F3"
        },
        dgrey2: {
          DEFAULT: "#FEFEFE"
        },
        dgrey3: {
          DEFAULT: "#EAEAEA"
        },
        dgrey4: {
          DEFAULT: "#F7F5EE"  //category bg page
        },
        dgreyTransp1: {
          DEFAULT: "rgba(255,255,255,0.9)"  //slick arrow bg color
        },
        dgreyTransp2: {
          DEFAULT: "rgba(255,255,255,0.7)"  //hover on carousel cart
        },
        dwhite1: {
          DEFAULT: "#FFF"
        },
        dborderblack1: {
          DEFAULT: "#0d143c"
        },
        dborderblack2: {
          DEFAULT: "#0a2240"
        },
        dbordergrey: {
          DEFAULT: "#D3D3D1"
        },
        dbasenavy: {
          DEFAULT: "#002b5c"
        },
        dbasenavy: {
          DEFAULT: "#022c5c" //ehm
        },
        dred1: {
          DEFAULT: "#FFFFFF"
        },
        dred2: {
          DEFAULT: "#97191a"
        },
        dred3: {
          DEFAULT: "#d01344"  //for % badge
        },
        dblue1: {
          DEFAULT: "#46688d7"
        },
        dblue2: {
          DEFAULT: "#2c4f79"
        },
        dyellow1: {
          DEFAULT: "#F7F5EE"
        },
        dblack1: {
          DEFAULT: "#333"
        },
        dblack2: {
          DEFAULT: "#000"
        },

        

        
      }
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".container": {
          width: "100%",
          maxWidth: "1440px",
          padding: "0 0.75rem",
          margin: "auto",
          overflow: "hidden"
        },
      });
    },
  ],
}
