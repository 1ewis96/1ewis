/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
      },
      animation: {
        'pulse-green-slow': 'pulseGreenSlow 3s infinite',
        'pulse-green-fast': 'pulseGreenFast 2s infinite',
        'pulse-red-slow': 'pulseRedSlow 3s infinite',
        'pulse-red-fast': 'pulseRedFast 2s infinite',
        'float': 'float 3s ease-in-out infinite',
        'sparkle': 'sparkle 2s ease-in-out infinite',
      },
      keyframes: {
        pulseGreenSlow: {
          '0%, 100%': { boxShadow: '0 0 0 rgba(34, 197, 94, 0)' },
          '50%': { boxShadow: '0 0 10px rgba(34, 197, 94, 0.3)' },
        },
        pulseGreenFast: {
          '0%, 100%': { boxShadow: '0 0 0 rgba(34, 197, 94, 0)' },
          '50%': { boxShadow: '0 0 15px rgba(34, 197, 94, 0.5)' },
        },
        pulseRedSlow: {
          '0%, 100%': { boxShadow: '0 0 0 rgba(239, 68, 68, 0)' },
          '50%': { boxShadow: '0 0 10px rgba(239, 68, 68, 0.3)' },
        },
        pulseRedFast: {
          '0%, 100%': { boxShadow: '0 0 0 rgba(239, 68, 68, 0)' },
          '50%': { boxShadow: '0 0 15px rgba(239, 68, 68, 0.5)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        sparkle: {
          '0%, 100%': { opacity: 0, transform: 'scale(0)' },
          '50%': { opacity: 1, transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
