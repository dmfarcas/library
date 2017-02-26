<template>
<div>
    <h1>User view</h1>
    <books></books>
</div>
</template>


<script>
  import firebase from 'firebase';
  import { database } from '../../firebaseInstance';
  import Books from '../Books'

  var itemsRef = database.ref('/items');

  console.log(database.ref('/items'));

  export default {
    data: () => {
      return {
        //data goes here
      }
    },
    components: { Books }
  };
</script>

