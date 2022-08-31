import { createI18n } from 'vue-i18n/dist/vue-i18n.esm-bundler.js' 
import store from '@/store'
import { computed } from 'vue'
const i18n = createI18n({ locale: "en", }); 
export async function loadMessage(locale) { 
    if (Object.keys(i18n.global.getLocaleMessage(locale)).length === 0) {
        
        const messages = await import(`@/lang/${locale}.json`);
       
        i18n.global.setLocaleMessage(locale, messages); 
    }
    if (i18n.mode === 'legacy') {
        if (i18n.global.locale != locale) i18n.global.locale = locale
    } else {
        if (i18n.global.locale.value != locale) i18n.global.locale.value = locale
    }
    document.querySelector('html').setAttribute('lang', locale)
}
// export const local = computed(()=> store.getters['i18n/local'])

 
(async function () {   
        // loadMessage(local)
    // loadMessage(computed(() => store.getters['i18n/local']).value);
})(); 
export default i18n;