// src/router/router.js
import { createRouter, createWebHistory } from 'vue-router';
import Auth from '../components/Auth.vue'; // Adjust the path as necessary

const routes = [
  {
    path: '/',
    name: 'Auth',
    component: Auth,
  },
  // Add other routes as needed
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router; // This line is crucial
