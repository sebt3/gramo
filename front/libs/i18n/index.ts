const { createI18n } = await import("vue-i18n")
import translate from './translate.js'
import en from "../../i18n/en.json"
const locale = translate.guessDefaultLocale();
export const i18n = createI18n({
    locale,
    fallbackLocale: 'en',
    legacy: false,
    globalInjection: true,
    messages: { en },
    runtimeOnly: false
});
if (locale!='en') {
    await translate.loadLocaleMessages(i18n, locale)
}
export default i18n