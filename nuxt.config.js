import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  meta: {
    title: 'Host Aquarium Club Auctions',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Host your own in person Aquarium Club Auction for your club that everyone can engage with, manage items effortlessly.',
        author: 'Jens Phanich'
      },
      { hid: 'description', name: 'description', content: 'Host Aquarium Club Auctions' },
      { hid: 'og:title', property: 'og:title', content: 'host and participate in club auctions' },
      { hid: 'og:url', property: 'og:url', content: 'https://getscales.net/' },
      { hid: 'og:description', property: 'og:description', content: 'Host your own in person Aquarium Club Auction for your club that everyone can engage with, manage items effortlessly.'},
      { hid: 'og:image', property: 'og:image', content: 'https://getscales.net/_nuxt/bettahuy-phan.a2ccffa1.jpg'},
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  modules: [
    '@pinia/nuxt', '@nuxtjs/tailwindcss', '@nuxtjs/color-mode'
  ],
  // meta: {
  // link:[
  //   {
  //     rel: "stylesheet",
  //     href: "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
  //   },


  // ],


  // },


})
