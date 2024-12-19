/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        '6/7': '85.7142857%', 
        '3/7': '42.8571429%',
      },
      width: {
        '6/7': '85.7142857%', 
        '3/7': '42.8571429%',
        '1/7': '14.2857142857%'
      },
      borderRadius: {
        '4xl': '2rem', 
      },
      boxShadow: {
        'custom-shadow': '0px 4px 20px rgba(0, 0, 0, 0.25)',
      },
      colors: {
        'dark': "#EFEFED",
        'light':"#F7F7F5",
        'textcolour':'#1E1E1E',
        'purple':'#D1B7FF',
        'orange':'#FF5732',
        'white':'#FFFFFF',
        'darkpurple':'#B6A6D2'
      },
    },
    
    
    
  },
  plugins: [],
}

