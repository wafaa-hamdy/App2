/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container:{
      center:true,
    },
    screens:{
      "2xl" : "1320px",
      "xl" : "1024px",
      "lg" : "768px",
    },
    extend: {

      colors:{
        primary: {
          50:"#e7f7e7",
          100:"#b6e6b6",
          200:"#85d685",
          300:"#54c654",
          400:"#23b523",
          500: "#0aad0a",
          600:"#099c09",
          700:"#077907",
          800:"#055705",
          900:"#033403",
          950:"#022302",
        },
      }
    },
  },
  plugins: [],
}

