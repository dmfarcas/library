<template>
<div>
      <h1>User Dashboard</h1>
 <ul is="transition-group">
    <li v-for="user in users" class="user" :key="user['.key']">
      <span>{{user.name}} - {{user.email}}</span>
      <button v-on:click="removeUser(user)">X</button>
    </li>
  </ul>
  <form id="form" v-on:submit.prevent="addUser">
    <input type="text" v-model="newUser.name" placeholder="Username">
    <input type="email" v-model="newUser.email" placeholder="email@email.com">
    <input type="submit" value="Add User">
  </form>
  <ul class="errors">
    <li v-show="!validation.name">Name cannot be empty.</li>
    <li v-show="!validation.email">Please provide a valid email address.</li>
  </ul>


  <button v-on:click="logout">Logout</button>
</div>
</template>


<script>
import { logout } from '../auth';
import {db } from '../main'
// import { database } from '../firebaseInstance';

console.log(db);


// console.log(database.ref('url/to/my/collection'));

// import firebase from 'firebase';
// // console.log(logout)

// var emailRE = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
// var usersRef = db.ref('users')

export default {
//   data: {
//     newUser: {
//       name: '',
//       email: ''
//     }
//   },
//   firebase: {
//     users: usersRef
//   },
  methods: { 
    logout: logout,
//     addUser: function () {
//       if (this.isValid) {
//         usersRef.push(this.newUser)
//         this.newUser.name = ''
//         this.newUser.email = ''
//       }
//     },
//     removeUser: function (user) {
//       usersRef.child(user['.key']).remove()
//     }
  }
//   events: {
//   }
};
</script>