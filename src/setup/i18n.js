import { createI18n } from 'vue-i18n'
import messages from '@/lang/en.json'
import axios from 'axios'
export const i18n = createI18n({
  locale: 'en', // set locale
  fallbackLocale: 'en',
  messages, // set locale messages
  silentTranslationWarn: true,
  silentFallbackWarn: true,
  missingWarn: false,
  fallbackWarn: false
})

const loadedLanguages = [] // our default language that is preloaded

function setI18nLanguage(lang) {
  i18n.global.locale = lang
  i18n.global.fallbackLocale = lang
  axios.defaults.headers.common['Accept-Language'] = lang
  document.querySelector('html').setAttribute('lang', lang)
  return lang
}

export async function loadLanguageAsync(lang) {
  if (lang === '' || lang === undefined) {
    const msgs = await import(/* webpackChunkName: "locale-[request]" */ `../lang/${lang}.json`)
    i18n.global.setLocaleMessage('en', msgs.default)
    return setI18nLanguage('en')
  } else {
    if (!i18n.global.locale.value !== lang) {
      if (!loadedLanguages.includes(lang)) {
        const msgs_1 = await import(
          /* webpackChunkName: "locale-[request]" */ `../lang/${lang}.json`
        )
        i18n.global.setLocaleMessage(lang, msgs_1.default)
        loadedLanguages.push(lang)
        return setI18nLanguage(lang)
      }
      return Promise.resolve(setI18nLanguage(lang))
    }
  }

  return Promise.resolve(lang)
}
