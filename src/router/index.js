import Vue from 'vue';
import Router from 'vue-router';
import Login from 'components/Login';
import Admin from 'components/Admin/Admin';
import Dashboard from 'components/User/Dashboard';
import Resources from 'components/Resources';
import Nas from 'components/Nas';
import NotFound from 'components/NotFound';
import firebase from 'firebase';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/admin',
      name: 'Admin',
      meta: { //TODO this should require auth AND the admin role ICHIM
        requiresAuth: true,
      },
      component: Admin,
    },
     {
      path: '/dashboard',
      name: 'Dashboard',
      meta: {
        requiresAuth: true,
      },
      component: Dashboard,
    },
    {
      path: '/resources',
      name: 'Resources',
      component: Resources,
    },
    {
      path: '/nas',
      name: 'Nas',
      component: Nas,
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound,
    }
  ],
});


router.beforeEach((to, from, next) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (to.path === "/") {
      if (user) {
        next('/dashboard');
      } else {
        next('/login');
      }
    }
  });

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!firebase.auth().currentUser) {
      next('/');
    } else {
      next();
    }
  } else {
    next();
  }
});


export default router;
