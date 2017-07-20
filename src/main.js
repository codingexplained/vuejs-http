// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import { routes } from './routes';
import 'bootstrap/dist/css/bootstrap.css';

Vue.config.productionTip = false

Vue.filter('currency', function(value) {
  let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  });

  return formatter.format(value);
});

export const eventBus = new Vue();
export const authService = { isLoggedIn: false };

Vue.use(VueRouter);
const router = new VueRouter({
  routes: routes,
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        selector: to.hash
      };
    }

    if (savedPosition) {
      return savedPosition;
    }

    return { x: 0, y: 0 };
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.isAuthRequired)) {
    if (!authService.isLoggedIn) {
      alert("You must be logged in!");
      return next(false);
    }
  }

  next();
});

Vue.use(VueResource);
Vue.http.options.root = 'http://localhost:3000';
Vue.http.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router: router
})
