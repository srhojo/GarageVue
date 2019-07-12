import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from './views/dashboard.view.vue';
import Garage from './views/garage.view.vue';
import Vehicle from './views/vehicle.view.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
    },
    {
      path: '/garage',
      name: 'garage',
      component: Garage,
    },
    {
      path: '/vehicle',
      name: 'vehicle',
      component: Vehicle,
      props: true,
    },
    {
      path: '/about',
      name: 'about',
      component: () =>
        import('./views/About.vue'),
    },
  ],
});
