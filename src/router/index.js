import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import Empty from '@/views/Empty.vue'
import Main from '@/views/Main.vue'
import Error from '@/views/Error.vue'
import Login from '@/components/pages/Login.vue'
import Register from '@/components/pages/Register.vue'
import Recover from '@/components/pages/Recover.vue'
import Cabinet from '@/components/pages/cabinet/Cabinet.vue'
import RecordsList from '@/components/pages/cabinet/records/List.vue'
import RecordsCreate from '@/components/pages/cabinet/records/Create.vue'
import RecordsEdit from '@/components/pages/cabinet/records/Edit.vue'
import CategoriesList from '@/components/pages/cabinet/categories/List.vue'
import CategoriesCreate from '@/components/pages/cabinet/categories/Create.vue'
import categoriesEdit from '@/components/pages/cabinet/categories/Edit.vue'
import Settings from '@/components/pages/cabinet/Settings.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Empty,
    beforeEnter(to, from, next) {
      if(store.getters["user/user"]){
        next({ name: 'cabinet' })
      } else {
        next()
      }
    },
    children: [
      {
        path: '',
        name: 'Login',
        component: Login,
      },
      {
        path: 'register',
        name: 'Register',
        component: Register,
      },
      {
        path: 'recover',
        name: 'Recover',
        component: Recover,
      },
    ],
  },
  {
    path: '/cabinet',
    component: Main,
    children: [
      {
        path: '',
        name: 'cabinet',
        component: Cabinet,
      },
      {
        path: 'records',
        name: 'recordsList',
        component: RecordsList,
      },
      {
        path: 'records/create',
        name: 'recordsCreate',
        component: RecordsCreate,
      },
      {
        path: 'records/:id',
        name: 'recordsEdit',
        component: RecordsEdit,
      },
      {
        path: 'categories',
        name: 'categoriesList',
        component: CategoriesList,
      },
      {
        path: 'categories/create',
        name: 'categoriesCreate',
        component: CategoriesCreate,
      },
      {
        path: 'categories/:id',
        name: 'categoriesEdit',
        component: categoriesEdit,
      },
      {
        path: 'settings',
        name: 'settings',
        component: Settings,
      },
    ]
  },
  {
    path: '*',
    component: Error
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
