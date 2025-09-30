import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import '@fortawesome/fontawesome-free/css/all.css'
import Cookies from 'js-cookie'
import { createI18n } from 'vue-i18n'

import en from './locales/en.json'
import pt from './locales/pt.json'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

function getBrowserLanguage() {
  const language = navigator.language || navigator.userLanguage
  return language.split('-')[0]
}

const locale = getBrowserLanguage() || 'en'

const i18n = createI18n({
  locale: locale,
  fallbackLocale: 'pt',
  messages: {
    pt: pt,
    en: en
  }
})

const app = createApp(App)
app.config.globalProperties.$cookies = Cookies
app.use(i18n)
app.use(createPinia())
app.use(router)

app.mount('#app')
