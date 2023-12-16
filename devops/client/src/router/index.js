import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import CountryPage from '../components/CountryPage.vue';
import StudentPage from '../components/StudentPage.vue';
import ClassPage from '../components/ClassPage.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/country',
    name: 'country',
    component: CountryPage
  },
  {
    path: '/student',
    name: 'student',
    component: StudentPage
  },
  {
    path: '/class',
    name: 'class',
    component: ClassPage
  },
  // Existing 'about' route can remain as is if you plan to use it
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
