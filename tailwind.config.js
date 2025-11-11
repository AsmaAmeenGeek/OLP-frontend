/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  purge: false, 
  theme: {
    extend: {
      colors: {
        'butter-brown': {
          50: '#FDFDFD',
          100: '#F5F5F5',
          500: '#D4A574',
          600: '#B8946A',
          700: '#A67C00',
        },
        'warm-gray': {
          900: '#333333',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      }
    },
  },
  safelist: [  
    'bg-butter-brown-50', 'bg-butter-brown-100', 'bg-butter-brown-500', 'bg-butter-brown-600', 'bg-butter-brown-700',
    'text-butter-brown-500', 'text-warm-gray-900',
    'shadow-soft', 'card', 'btn-primary',
    { pattern: /butter-brown/, variants: ['hover', 'focus'] },
  ],
  plugins: [],
}