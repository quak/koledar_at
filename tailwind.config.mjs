/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  prefix: "",
  theme: {
    fontFamily: {
			sans: ['Bitter', 'sans-serif'],
			serif: ['Oswald', 'serif'],
		},
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {

      letterSpacing: {
        kkwide: '6px',
      },
      width: {
        '18': '72px',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      colors:{
        'kklight': '#F7F7F8',
        'kklightyellow': '#F5F5EE',

        'kkred': '#96264C',
        'kkgreen': '#B0C2A7',
        'kkorange': '#E8A273',
        'kklorange': '#F0D7BC',
        'kkrose': '#A99292',
        
      }
    },

  },
  plugins: [require("tailwindcss-animate")],
}