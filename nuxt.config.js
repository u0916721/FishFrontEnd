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
        content: 'Host your own Aquarium Club Auction for your club that everyone can engage with, keep track of items being auctioned and sold items effortlessly.',
        author: 'Jens Phanich'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: 'public/favicon.ico' }]
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
