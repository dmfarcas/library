<template>
  <div id="list">
    <h1>Items</h1>
    <ul>
      <li v-for="item in items">
        {{ item.text }}
        <button @click="removeTodo(item['.key'])">X</button>
      </li>
    </ul>
    <form @submit.prevent="addTodo">
      <input v-model="newTodo">
      <button>Add #{{ items.length }}</button>
    </form>

  </div>
</template>



<script>
  import firebase from 'firebase';
  import { database } from '../firebaseInstance';


  var itemsRef = database.ref('/items');

  console.log(itemsRef);

  export default {
      data: () => {
        return {
          newTodo: "",
          items: []
        }
      },
    firebase: {
      items: database.ref('/items'),
    },
    methods: {
      removeTodo: function (key) {
        itemsRef.child(key).remove();
      },
      addTodo: function () {
        if (this.newTodo.trim()) {
          itemsRef.push({
            text: this.newTodo
          });
          this.newTodo = "";
        }
      }
    }
  };

</script>
