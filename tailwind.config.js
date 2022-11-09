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
        d17: "17px",
        d18: "18px",
        d20: "20.5712px",
        d30: "30px",
        d25: "25px",
        d27: "27px",
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
        dgrey5: {
          DEFAULT: "#dddddd"  //desktopmenu hover bg page
        },
        dgrey6:{
          DEFAULT: "#9d9d9c" // footer text color
        },
        dgrey7:{
          DEFAULT: "#eee"
        },
        dgrey8:{
          DEFAULT: "#f9f9f9" 
        },
        dgrey9:{
          DEFAULT: "#555"  // for search icon bg color
        },
        dgrey10:{
          DEFAULT: "#F7F6F6"  // for search icon bg color
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
        dborderblack3: {
          DEFAULT: "#666"
        },
        dbordergrey: {
          DEFAULT: "#D3D3D1"
        },
        dbordergrey2: {
          DEFAULT: "#F8F8F8"
        },
        dbordergrey3: {
          DEFAULT: "#D8D8D8"
        },
        dbordergrey4: {
          DEFAULT: "#ebebeb"
        },
        dbasenavy: {
          DEFAULT: "#002b5c"
        },
     
        dred1: {
          DEFAULT: "#FF0000"
        },
        dred2: {
          DEFAULT: "#97191a"
        },
        dred3: {
          DEFAULT: "#d01344"  //for % badge
        },
        dred4: {
          DEFAULT: "#b60000"  //for errors
        },
        dblue1: {
          DEFAULT: "#4688d7"
        },
        dblue2: {
          DEFAULT: "#2c4f79"
        },
        dblue3: {
          DEFAULT: "#004ea8" // for login button
        },
        dblue4: {
          DEFAULT: "#1a73e8" // for sign in with google button
        },
        dyellow1: {
          DEFAULT: "#F7F5EE"
        },
        dyellow2: {
          DEFAULT: "#f6f4ee"
        },
        dblack1: {
          DEFAULT: "#333"
        },
        dblack2: {
          DEFAULT: "#000"
        },
        dblackOverlay: {
          DEFAULT: "rgba(0,0,0,0.5)"
        },

        

        
      },
      height:{
        "7.5": "31.5px",
        "17" : "70px",
      }
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".container": {
          width: "100%",
          //maxWidth: "1440px",
          padding: "0 5px",
          marginRight: "auto",
          marginLeft: "auto",
          //overflow: "hidden"
        },
      });
    },
  ],
}
