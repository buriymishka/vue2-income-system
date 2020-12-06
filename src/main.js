import Vue from 'vue'
import VuetifyConfirm from 'vuetify-confirm'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import './assets/css/main.css';
import currencyFilter from './filters/currency';
import localizeFilter from './filters/localize';

Vue.config.productionTip = false

Vue.use(VuetifyConfirm, { vuetify })
Vue.filter('currency', currencyFilter)
Vue.filter('loc', localizeFilter)

store.dispatch("user/load", true).then(() => {
  new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
  }).$mount('#app')
})

