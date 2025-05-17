// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  future: {
    compatibilityVersion: 4,
  },
  experimental: {
    scanPageMeta: 'after-resolve',
    sharedPrerenderData: false,
    compileTemplate: true,
    resetAsyncDataToUndefined: true,
    templateUtils: true,
    relativeWatchPaths: true,
    normalizeComponentNames: false,
    spaLoadingTemplateLocation: 'within',
    parseErrorData: false,
    pendingWhenIdle: true,
    defaults: {
      useAsyncData: {
        deep: true
      }
    }
  },
  features: {
    inlineStyles: true
  },
  unhead: {
    renderSSRHeadOptions: {
      omitLineBreaks: false
    }
  },
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxthub/core',
  ],
  css: ['~/assets/css/main.css']
})