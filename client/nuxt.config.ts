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
  quasar: { /* */ }
})
