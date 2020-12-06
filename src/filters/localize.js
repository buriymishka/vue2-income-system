import store from '@/store'
import en from '@/locales/en'
import ru from '@/locales/ru'

const locales = {
  'en-US': en,
  'ru-RU': ru
}

export default function localizeFilter(key) {
  const locale = store.getters["user/user"] ? store.getters["user/user"].locale || 'en-US' : 'en-US'
  return locales[locale][key] || `Localize error. Key ${key} not found`
}