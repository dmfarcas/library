<template>
  <div id="list">
    <h1>Admin View</h1>
    <search></search>
    <books></books>
  </div>
</template>

<script>
  import firebase from 'firebase';
  import { database } from '../../firebaseInstance';
  import Books from '../Books'
  import Search from './Search';
  import Vuex from 'vuex';

  //Totally not copied from the todo app sample
  export default {
    components: { Books, Search }
  };
</script>