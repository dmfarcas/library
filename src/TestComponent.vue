<template>
  <div>
    <h1>TEST</h1>
    <ul>
      <li v-for="book in bookz">
        {{ book.text }}
      </li>
    </ul>
  </div>
</template>


<script>
  import { database } from './firebaseInstance';
  import Vuex from 'vuex';
  import Vue from 'vue';



  export default Vue.extend({
    computed: Vuex.mapGetters([
      'bookz'
    ]),
    firebase: {
      items: database.ref('bookz')
    }
  })

</script>
