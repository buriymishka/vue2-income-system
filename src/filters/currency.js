import store from '@/store'
export default function currencyFilter(value, currency = 'USD') {
  return new Intl.NumberFormat(store.getters["user/user"].locale, {
    style: 'currency',
    currency
  }).format(value)
}
