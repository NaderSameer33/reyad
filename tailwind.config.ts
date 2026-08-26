import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        tajawal: ['var(--font-tajawal)', 'sans-serif'],
        cairo:   ['var(--font-cairo)',   'sans-serif'],
      },
      colors: {
        brand: {
          navy:'#0B1C3E', navyDark:'#060F22', navyMid:'#112454',
          slate:'#1E3A5F', amber:'#F59E0B', amberLight:'#FCD34D',
          amberDeep:'#D97706', teal:'#0D9488', tealLight:'#2DD4BF',
          tealDark:'#0F766E', muted:'#94A3B8', light:'#E2E8F0',
        },
      },
    },
  },
  plugins: [],
}
export default config
