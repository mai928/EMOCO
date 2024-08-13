/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        shelley: ['"Shelley Script LT Std"', 'cursive'],
      },
      colors:{
        // primary_color:'#f7c35f',
        primary_color:'#8d2f3c',
        // secondary_color:"#49a760",
        secondary_color:"#598fbb",   
        color_heading:'#04000b',
        dark_Green:'#1f4e3d',
        paragraph_color:'#666666',
        wave_gray:'#f7f7f5',
        footer_color:'#154c79'

      }
    },
  },
  options: {
    safelist: [
      'hidden',
      'lg:block',
      'block',
      'lg:hidden',
      // Add more classes if necessary
    ],
  },
  plugins: [],
};
