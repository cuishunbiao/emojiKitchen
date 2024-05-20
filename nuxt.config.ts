// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  css: [
    '@/assets/style/tailwind.css'
  ],
  app: {
    head: {
    charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Emoji Kitchen Online',
      meta: [
        { name: 'description', content: 'Pick two emojis you really like, then blend them together to create a brand new emoji. Create fun custom emojis!' },
        { name: 'keywords', content: 'emoji kitchen browser, emoji kitchen online, emoji kitchen apple, emojie kitchen, emoji kitchen list' }
      ]
    },
  }
})