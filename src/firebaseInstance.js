import firebase from 'firebase';
import config from '../config/firebase.config.js';
// import VueFire from 'vuefire';
// import Vue from 'vue';

// Vue.use(VueFire)

firebase.initializeApp(config);
const database = firebase.database();

export { database };
