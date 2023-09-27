// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  css: [
    '@/assets/style/tailwind.css'
  ],
  app: {
    head: {
      charset: 'utf-16',
      title: 'Emoji Kitchen Online',
      meta: [
        { name: 'description', content: 'Pick two emojis you really like, then blend them together to create a brand new emoji. Create fun custom emojis!' },
        { name: 'keyworld', content: 'emoji kitchen, emoji kitchen online' }
      ],
    }
  }
})
