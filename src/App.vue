<template>
  <div id="app">
    <article class="main" v-bind:class="{'start': !user.uid}">
      <div class="title">
        <h1 class="">Library</h1>
      </div>

      <div class="login" v-show="!user.uid">
        <h1>Login</h1>
        <div id="firebaseui-auth-container"></div>
      </div>
    </article>

  </div>
</template>

<script>
  import firebase from 'firebase';
  import auth from './auth';
  import { firebaseConfig } from '../config/firebase';
  import Hello from './components/Hello';

  const user = auth.getUser();
  const initApp = function initApp() {
    firebase.initializeApp(firebaseConfig);
    auth.init();
  }
  export default {
    data() {
      return { user };
    },
    methods: { },
    created: initApp,
    events: {
    },
    components: {
      Hello,
    },
  };
</script>
