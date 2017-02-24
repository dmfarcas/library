<template>
  <div id="list">
    <h1>Admin View</h1>
    <search></search>
    <ul>
      <li v-for="item in items">
        {{ item.text }}
        <button @click="removeBook(item['.key'])">X</button>
      </li>
    </ul>
    <form @submit.prevent="addBook">
      <input v-model="newBook"> 
      <button>Add #{{ items.length }}</button>
    </form>
  </div>
</template>

<script>
  import firebase from 'firebase';
  import { database } from '../../firebaseInstance';
  import Book from '../Book'
  import Search from './Search';

  var itemsRef = database.ref('/items');

  //Totally not copied from the todo app sample
  export default {
      data: () => {
        return {
          newBook: "",
        }
      },
    firebase: {
      items: database.ref('/items'),
    },
    methods: {
      removeBook (key) {
        itemsRef.child(key).remove();
      },
      addBook () {
        if (this.newBook.trim()) {
          itemsRef.push({
            text: this.newBook
          });
          this.newBook = "";
        }
      }
    },
    components: { Book, Search }
  };
</script>
