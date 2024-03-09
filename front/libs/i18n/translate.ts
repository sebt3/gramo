import i18n from "@/libs/i18n"
import { nextTick } from "vue"

const Trans = {
  get defaultLocale() {
    return 'en'
  },

  get supportedLocales() {
    return ['en', 'fr']
  },

  get currentLocale() {
    return i18n.global.locale.value
  },

  set currentLocale(newLocale) {
    i18n.global.locale.value = newLocale
  },

  async switchLanguage(newLocale) {
    await Trans.loadLocaleMessages(newLocale)
    Trans.currentLocale = newLocale
    (document.querySelector("html") as HTMLHtmlElement).setAttribute("lang", newLocale)
    localStorage.setItem("user-locale", newLocale)
  },

  async loadLocaleMessages(i18n,locale) {
    //if(!i18n.global.availableLocales.includes(locale)) {
      i18n.global.setLocaleMessage(locale, (await import(/* @vite-ignore */`/i18n/${locale}.json`)).default)
    //}
//    return nextTick()
  },

  isLocaleSupported(locale) {
    return Trans.supportedLocales.includes(locale)
  },

  getUserLocale() {
    const locale = window.navigator.language || window.navigator.userLanguage || Trans.defaultLocale
    return {
      locale: locale,
      localeNoRegion: locale.split('-')[0]
    }
  },

  getPersistedLocale() {
    const persistedLocale = localStorage.getItem("user-locale")
    if(Trans.isLocaleSupported(persistedLocale)) return persistedLocale;
    return null
  },

  guessDefaultLocale() {
    const userPersistedLocale = Trans.getPersistedLocale()
    if(userPersistedLocale) return userPersistedLocale;
    const userPreferredLocale = Trans.getUserLocale()
    if (Trans.isLocaleSupported(userPreferredLocale.locale)) return userPreferredLocale.locale;
    if (Trans.isLocaleSupported(userPreferredLocale.localeNoRegion)) return userPreferredLocale.localeNoRegion;
    return Trans.defaultLocale
  },
}

export default Trans