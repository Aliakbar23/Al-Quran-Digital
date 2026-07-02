/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Hijau islami
        emerald: {
          950: "#052e16",
          900: "#0D2818",
          800: "#1B4332",
          700: "#2D6A4F",
          600: "#40916C",
          500: "#52B788",
          400: "#74C69D",
        },
        // Gold
        gold: {
          DEFAULT: "#C9A227",
          light: "#E8C547",
          pale: "#F4E0A0",
          muted: "#7A6115",
        },
        // Surface
        cream: "#FAF6F0",
        parchment: "#F0E6D3",
        dark: "#0A1F12",
      },
      fontFamily: {
        amiri: ["var(--font-amiri)", "serif"],
        poppins: ["var(--font-poppins)", "sans-serif"],
        arabic: ["var(--font-amiri)", "serif"],
      },
      backgroundImage: {
        "green-gold": "linear-gradient(135deg, #1B4332 0%, #2D6A4F 50%, #0D2818 100%)",
        "gold-shine": "linear-gradient(135deg, #C9A227 0%, #E8C547 50%, #C9A227 100%)",
        "card-dark": "linear-gradient(135deg, #1B4332, #0D2818)",
      },
      boxShadow: {
        gold: "0 4px 24px rgba(201,162,39,0.25)",
        card: "0 8px 32px rgba(13,40,24,0.18)",
        soft: "0 4px 16px rgba(0,0,0,0.08)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: 0, transform: "translateY(16px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        pulse: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.5 },
        },
      },
      animation: {
        "fade-up": "fade-up 0.4s ease both",
      },
    },
  },
  plugins: [],
};
