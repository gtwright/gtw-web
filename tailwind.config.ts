import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-noto-sans)'],
        serif: ['var(--font-noto-serif)'],
      },
    },
  },
  plugins: [],
} satisfies Config
