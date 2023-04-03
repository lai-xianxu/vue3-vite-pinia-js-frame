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
  scrollBehavior(to, from, savedPosition) {
    // 新页面滚动行为
    return new Promise((resolve) => {
      if (savedPosition) {
        return savedPosition;
      }
      resolve({ left: 0, top: 0, behavior: 'smooth' });
    });
  },
});

export default router;
