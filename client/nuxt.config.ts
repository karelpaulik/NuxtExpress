// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      baseURL: 'http://localhost:5000'
    }
  },
  modules: [
    '@vueuse/nuxt',
    'nuxt-quasar-ui'
  ],
  quasar: {
    //iconSet: 'material-icons',        //Toto je default, a není to nutno vůbec uvádět.
    //iconSet: 'material-icons-outlined', //Nastavení jiné sady ikon
    config: {
      brand: {
        //primary: '#1976d2',
        primary: 'teal',
        secondary: '#26A69A',
        accent: '#9C27B0',
  
        dark: '#1d1d1d',
  
        positive: '#21BA45',
        negative: '#C10015',
        info: '#31CCEC',
        warning: '#F2C037'
      }
    }
  }
})
