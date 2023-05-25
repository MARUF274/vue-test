import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/supplier',
    name: 'Supplier',
    component: () => import('../views/Supplier.vue'),
  },
  {
    path: '/create-barang',
    name: 'CreateBarang',
    component: () => import('../views/CreateBarang.vue'),
  },
  {
    path: '/edit-barang/:id',
    name: 'EditBarang',
    component: () => import('../views/EditBarang.vue'),
  },
  {
    path: '/create-supplier',
    name: 'CreateSupplier',
    component: () => import('../views/CreateSupplier.vue'),
  },
  {
    path: '/edit-supplier/:id',
    name: 'EditSupplier',
    component: () => import('../views/EditSupplier.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
