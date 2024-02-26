import { createApp } from 'vue'
import { createWebHistory, createRouter } from 'vue-router'

// styles

import './assets/main.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

import App from './App.vue'

// views for Auth layout

import Login from '@/views/auth/Login.vue'
import Register from '@/views/auth/Register.vue'
import Calculate from '@/views/Calculate.vue'

import Index from '@/views/Index.vue'

const router = new createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Index },
    { path: '/login', component: Login },
    { path: '/calculate', component: Calculate },
    { path: '/register', component: Register }
  ]
})

createApp(App).use(router).mount('#app')
