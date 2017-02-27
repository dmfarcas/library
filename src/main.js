// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import { initialize } from  './firebaseInstance';
import VuexFire from 'vuefire';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import store from './vuex/store'
import firebase from 'firebase'
Vue.use(VuexFire)
Vue.use(ElementUI)

console.log("THIS USER IS LOGED", firebase.auth().currentUser);
import { init } from './auth';

init();

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});
