import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Bridgerton Pastel Wedding Color Palette
        bridgerton: {
          50: '#F5ECEA',
          100: '#E8D5D3',
          200: '#D4BEBB',
          300: '#C9B896',
          400: '#A8C5D1',
          500: '#7BA3B5', // Dusty blue - primary
          600: '#5A8899',
          700: '#4A7080',
          800: '#3A5866',
          900: '#2A404D',
        },
        dusty: {
          50: '#F0F5F7',
          100: '#E1EBEF',
          200: '#C3D7DF',
          300: '#A8C5D1',
          400: '#8FB4C3',
          500: '#7BA3B5', // Primary dusty blue
          600: '#5A8899',
          700: '#4A7080',
          800: '#3A5866',
          900: '#2A404D',
        },
        sage: {
          50: '#F4F7F2',
          100: '#E9EFE5',
          200: '#D3DFCB',
          300: '#B8C9A9',
          400: '#A8BC96',
          500: '#9CAF88', // Primary sage
          600: '#7A9268',
          700: '#627550',
          800: '#4A5838',
          900: '#323B20',
        },
        blush: {
          50: '#FDF9F8',
          100: '#FAF3F1',
          200: '#F5ECEA',
          300: '#E8D5D3',
          400: '#D4BEBB',
          500: '#C0A7A4', // Primary blush
          600: '#A88E8B',
          700: '#8F7572',
          800: '#775C59',
          900: '#5E4340',
        },
        cream: {
          50: '#FFFEF9', // Ivory
          100: '#FAF8F5', // Cream
          200: '#F5F0E8', // Soft beige
          300: '#EBE4D9',
          400: '#E1D8CA',
          500: '#D7CCBB',
          600: '#C4B6A3',
          700: '#B1A08B',
          800: '#9E8A73',
          900: '#8B745B',
        },
        champagne: {
          50: '#FAF7F2',
          100: '#F5EFE5',
          200: '#EBE0CB',
          300: '#DED4BC',
          400: '#D1C4A3',
          500: '#C9B896', // Primary champagne
          600: '#B5A47F',
          700: '#9A8A68',
          800: '#7F7051',
          900: '#64563A',
        },
        charcoal: {
          50: '#F5F5F5',
          100: '#E8E8E8',
          200: '#D1D1D1',
          300: '#BABABA',
          400: '#9A9A9A',
          500: '#6B6B6B', // Warm gray
          600: '#5A5A5A',
          700: '#4A4A4A',
          800: '#3D3D3D', // Primary charcoal
          900: '#2D2D2D',
        },
        // Backward-compatible aliases
        ivory: {
          50: '#FFFEF9',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Lato', 'Helvetica', 'Arial', 'sans-serif'],
        script: ['Great Vibes', 'cursive'],
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out',
        'fade-in-up': 'fadeInUp 0.8s ease-out',
        'fade-in-down': 'fadeInDown 0.8s ease-out',
        'slide-in-left': 'slideInLeft 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.6s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
        'gentle-float': 'gentleFloat 4s ease-in-out infinite',
        'subtle-pulse': 'subtlePulse 3s ease-in-out infinite',
        'spin-elegant': 'spinElegant 1s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        gentleFloat: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        subtlePulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        spinElegant: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(0, 0, 0, 0.05)',
        'soft-lg': '0 12px 40px rgba(0, 0, 0, 0.08)',
        'blush': '0 8px 30px rgba(232, 213, 211, 0.4)',
        'dusty-blue': '0 8px 30px rgba(123, 163, 181, 0.3)',
        'sage': '0 8px 30px rgba(156, 175, 136, 0.3)',
      },
      backgroundImage: {
        'cream-gradient': 'linear-gradient(180deg, #FFFEF9 0%, #FAF8F5 50%, #F5F0E8 100%)',
        'blush-gradient': 'linear-gradient(180deg, #FAF8F5 0%, #F5ECEA 50%, #E8D5D3 100%)',
        'sage-gradient': 'linear-gradient(180deg, #FAF8F5 0%, #B8C9A9 100%)',
        'dusty-blue-gradient': 'linear-gradient(180deg, #FAF8F5 0%, #A8C5D1 100%)',
        'soft-gradient': 'linear-gradient(135deg, #FFFEF9 0%, #FAF8F5 50%, #F5ECEA 100%)',
      },
    },
  },
  plugins: [],
};
export default config;
