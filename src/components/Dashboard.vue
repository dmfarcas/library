<template>
<div>
    <h1>Book list.</h1>
    <li v-for="item in items">
      {{ item.text }}
    </li>
</div>
</template>


<script>
  import firebase from 'firebase';
  import { database } from '../firebaseInstance';


  var itemsRef = database.ref('/items');

  console.log(database.ref('/items'));

  export default {
      data: () => {
        return {
          newTodo: "",
        }
      },
    firebase: {
      items: database.ref('/items'),
    }
  };
</script>

