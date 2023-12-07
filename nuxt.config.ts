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
        { name: 'keywords', content: 'emoji kitchen iphone, emoji kitchen apple, emojie kitchen, emoji kitchen descargar' }
      ],
      script: [
        { async: true, src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1504730712788512', crossorigin: 'anonymous' },
        { async: true, src: 'https://www.googletagmanager.com/gtag/js?id=G-VY2KECY47Y' },
        { type: 'text/javascript', innerHTML: "window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-VY2KECY47Y');" }
      ]
    }
  }
})