/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [require('daisyui')],
  content: [
    `components/**/*.{vue,js}`,
    `layouts/**/*.vue`,
    `pages/**/*.vue`,
    `composables/**/*.{js,ts}`,
    `plugins/**/*.{js,ts}`,
    `App.{js,ts,vue}`,
    `app.{js,ts,vue}`
  ],
  theme: {
    extend: {
      container:{
        center: true,
        padding: '2rem'
      }
    },
  },
  plugins: [],
}
