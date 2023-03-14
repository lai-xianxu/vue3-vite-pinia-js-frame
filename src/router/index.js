import { createRouter, createWebHashHistory } from 'vue-router';

import demoRouters from './modules/demo';

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/demo',
  },
  ...demoRouters,
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return {
      el: '#app',
      top: 0,
      behavior: 'smooth',
    };
  },
});

export default router;
