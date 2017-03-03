<template lang="html">
  <div class="block text-center mt15">
    <!--<el-date-picker
      v-model="dateRange"
      format="dd.MM.yyyy"
      type="daterange"
      align="right"
      placeholder="Pick a range"
      :picker-options="pickerOptions">
    </el-date-picker>-->

    {{currentlyAt}}
<el-tooltip content="Are you sure? Click this button once you are in possesion of the book." placement="top">
      <el-button @click="borrowBook()" type="primary">{{buttonContent}}</el-button>
    </el-tooltip>
</template>

<script>
import Vue from 'vue';
import eventHub from '../EventHub';
import { database } from '../firebaseInstance'
import firebase from 'firebase';
import moment from 'moment';

const booksRef = database.ref('books');
const borrowsRef = database.ref('borrows');
const usersRef = database.ref('users');

export default Vue.extend({
  props: ['bookKey'],
  firebase: {
    borrows: borrowsRef,
    users: usersRef
  },
  data() {
    return {
      buttonContent: "Borrow",
      currentlyAt: "There is currently no one in possesion of the book."
    };
  },
  methods: {
    borrowBook () {
      // if (this.buttonContent === "Borrow") {
      //   this.buttonContent = "I really borrowed this book."
      // } else {
        const userBorrowsRef = database.ref(`borrows/`);
        userBorrowsRef.child(this.bookKey).update({currentlyAt: firebase.auth().currentUser.uid, date: new Date()});
        this.buttonContent = "Borrowed"
      // }


    },
    bookIsAt() {
         if (!vm.borrows.length || !vm.borrows) return;
    const getCurrentlyAtId = vm.borrows.filter(e => e['.key'] === vm.bookKey)[0].currentlyAt;


    const displayName = vm.users.filter(e => e['uid'] === getCurrentlyAtId)[0].displayName;

    vm.currentlyAt = `This book is currently at ${displayName}`;
    }
  },
  mounted() {
    var vm = this;
    console.log(vm.bookKey);

    // eventHub.$on('open-modal', this.bookIsAt)

  }
});
</script>

<style lang="css">
  .mt15 {
    margin-top: 15px;
  }
</style>
