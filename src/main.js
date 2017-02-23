// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import config from '../config/firebase.config.js';
import firebase from 'firebase';
import VueFire from 'vuefire';


const db = firebase.initializeApp(config);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});



export default db; //TODO this could be cleaner, separated from vue logic