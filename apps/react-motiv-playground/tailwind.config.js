const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'),
    join(__dirname, '../../libs/motiv-editor-react/src/**/*.{ts,tsx}'),
    join(__dirname, '../../libs/motiv-editor-react/components/**/*.{ts,tsx}'),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};