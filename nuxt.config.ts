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
        { name: 'description', content: 'emoji kitchen: create fun custom emojis!' },
        { name: 'keyworld', content: 'emoji kitchen,emoji kitchen online' }
      ],
    }
  }
  // js: ['@/assets/js/picker.js']
})
