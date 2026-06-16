/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1a365d',
          50: '#f0f5ff',
          100: '#e0ecff',
          200: '#c4d9ff',
          300: '#9abcff',
          400: '#6e96fd',
          500: '#4574f5',
          600: '#2955e8',
          700: '#1a365d',
          800: '#152d4d',
          900: '#0f1f33',
        },
        accent: {
          DEFAULT: '#0ea5e9',
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        sidebar: '#1e293b',
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans SC', 'PingFang SC', 'system-ui', 'sans-serif'],
        display: ['Noto Sans SC', 'PingFang SC', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'sm': '6px',
        'md': '8px',
        'lg': '12px',
      },
      boxShadow: {
        'sm': '0 1px 2px rgba(0,0,0,0.05)',
        'md': '0 4px 6px -1px rgba(0,0,0,0.1)',
        'lg': '0 10px 15px -3px rgba(0,0,0,0.1)',
      },
      animation: {
        'fade-in': 'fadeIn 300ms ease-out',
        'slide-up': 'slideUp 300ms ease-out',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
