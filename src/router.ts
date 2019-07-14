import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from '@/views/dashboard.view.vue';
import Garage from '@/views/garage/garage.view.vue';
import Vehicle from '@/views/garage/vehicle.view.vue';

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
      path: '/vehicle/:vehicleId',
      name: 'vehicle',
      component: Vehicle,
    },
    {
      path: '/*',
      name: 'page-not-found',
      component: () =>
        import('@/components/no-found.vue'),
    },
  ],
});
