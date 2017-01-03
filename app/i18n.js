import i18n from 'i18next'
import XHR from 'i18next-xhr-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import Cache from 'i18next-localstorage-cache'
import sprintf from 'i18next-sprintf-postprocessor'


i18n
  .use(XHR) // or any other backend implementation
  .use(Cache) // or any other cache implementation
  .use(LanguageDetector) // or any other implementation
  .use(sprintf) // or any other post processor
  .init({
    loadPath: '/locales/{{lng}}/{{ns}}.json',
    fallbackLng: 'en',

    // have a common namespace used around the full app
    ns: ['common', 'app'],
    defaultNS: 'common',

    // lng: 'fr', // disables user language detection

    preload: ['it', 'en', 'fr'],

    debug: true,

    interpolation: {
      escapeValue: false // not needed for react!!
    },

    cache: {
      enabled: true,
      expirationTime: 24 * 60 * 60 * 1000
    }
  });


export default i18n;
