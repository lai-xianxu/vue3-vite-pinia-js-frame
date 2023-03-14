import Demo from '@/views/Demo.vue';
import * as directives from '@/utils/directives';

export default {
  install(Vue) {
    Vue.component('Demo', Demo);
    Object.keys(directives).forEach((key) => {
      Vue.directive(key, directives[key]);
    });
  },
};

export function globalMount(app) {
  app.config.globalProperties.$demo = 'demo';
}
