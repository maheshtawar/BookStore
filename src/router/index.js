import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BookDetails from '../views/BookDetails.vue'
import CartView from '../views/CartView.vue'
import LoginForm from '../views/LoginForm.vue'
import SignupForm from '../views/SignupForm.vue'
import SearchResult from '../views/SearchResult.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    { path: '/book/:id', component: BookDetails },
    { path: '/cart', component: CartView },
    { path: '/login', component: LoginForm },
    { path: '/signup', component: SignupForm },
    { path: '/book', component: SearchResult, props: (route) => ({ searchQuery: route.query.q }) }
  ]
})

export default router
