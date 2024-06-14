// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },

  //--- env -----
  runtimeConfig :{
    mongo_url : process.env.MONGODB_URL
  },

  // ---- tailwind ---
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  // ---- font google poppins ---
  app :{
    head :{
      link : [
        {
          rel : 'preconnect',
          href : 'https://fonts.googleapis.com'
        },
        {
          rel : 'preconnect',
          href : 'https://fonts.gstatic.com'
        },
        {
          rel : 'stylesheet',
          href : 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap'
        },
      ]
    }
  },

  // --- nuxt/ui -----------
  modules: ["@nuxt/ui",'@pinia/nuxt'],
  // --- main.css -----------
  css: ['~/assets/css/main.css'] ,

  vite :{
    server: {
      hmr: {
        overlay: false
      }
    }
  }

})