/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#0A0D12",
        panel: "#161E29",      // Was #0E131A
        console: "#0F141C",    // NEW token
        primary: {
          DEFAULT: "#5FC9F0",
          dim: "#2A5A72",
        },
        secondary: {
          DEFAULT: "#FF8A3D",
          dim: "#7A4A20",
        },
        paper: "#D4DDE3",
        line: "#2E4A5E",       // Was #152230
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        breathe: 'breathe 6s ease-in-out infinite',
        flicker: 'flicker 0.55s steps(1, end) forwards',
        blink: 'blink 1s steps(1) infinite',
        pulseCustom: 'pulseCustom 1.6s ease-in-out infinite',
      },
      keyframes: {
        breathe: {
          '0%, 100%': { boxShadow: 'inset 0 0 150px rgba(0,0,0,0.7)' },
          '50%': { boxShadow: 'inset 0 0 175px rgba(0,0,0,0.8)' },
        },
        flicker: {
          '0%': { opacity: '1' },
          '10%': { opacity: '0.1' },
          '18%': { opacity: '1' },
          '28%': { opacity: '0.05' },
          '40%': { opacity: '0.8' },
          '55%': { opacity: '0' },
          '100%': { opacity: '0', visibility: 'hidden' },
        },
        blink: {
          '50%': { opacity: '0' },
        },
        pulseCustom: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
      },
    },
  },
  plugins: [],
}