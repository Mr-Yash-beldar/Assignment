import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{ts,tsx,mdx,stories.tsx}'
  ],
  theme: {
    extend: {
      ringWidth: {
        3: '3px'
      }
    },
  },
  plugins: [],
} satisfies Config;
