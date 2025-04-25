
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Arimo', 'sans-serif'],
      },
      colors: {
        background: '#f4f5f6',
        primary: '#59dae3',
        secondary: '#188ba7',
        heading: '#012443',
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        foreground: "hsl(var(--foreground))",
        sidebar: {
          DEFAULT: '#f4f5f6',
          foreground: '#012443',
          border: '#e2e8f0',
          accent: '#59dae3',
        },
        automation: {
          primary: '#59dae3',
          secondary: '#188ba7',
          accent: '#012443',
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
