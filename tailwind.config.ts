import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        sable: '#D8C3A5',
        encre: '#101827',
        nuit: '#0B1220',
        acier: '#5A6A85'
      },
      fontFamily: {
        sans: ['var(--font-manrope)', 'sans-serif'],
        serif: ['var(--font-playfair)', 'serif']
      },
      boxShadow: {
        premium: '0 20px 45px -20px rgba(16, 24, 39, 0.45)'
      }
    }
  },
  plugins: []
};

export default config;
