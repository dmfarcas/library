<template lang="html">
  <div class="block text-center mt15">
    <el-date-picker
      v-model="dateRange"
      format="dd.MM.yyyy"
      type="daterange"
      align="right"
      placeholder="Pick a range"
      :picker-options="pickerOptions">
    </el-date-picker>
    <el-button @click="borrowBook()" type="primary">Borrow</el-button>
    <p v-if="rangeTooHigh">Range too high. Maximum is 14 days.</p>
</template>

<script>
import Vue from 'vue';
import eventHub from '../EventHub';
import { database } from '../firebaseInstance'
import firebase from 'firebase';
import moment from 'moment';

const booksRef = database.ref('books');
const borrowsRef = database.ref('borrows');

export default Vue.extend({
  props: ['bookKey'],
  firebase: {
    borrows: borrowsRef,
  },
  data() {
    return {
      rangeTooHigh: false,
      dateRange: [],
      dirtyHack: []
    };
  },
  methods: {
    borrowBook () {
      const userBorrowsRef = database.ref(`borrows/${this.bookKey}`);
      userBorrowsRef.child(firebase.auth().currentUser.uid).update(this.dateRange)
    }
  },
  computed: {
    pickerOptions() {
      var vm = this;
      return {            
       firstDayOfWeek: 1,
       disabledDate(dateRendering) {
          //  console.log(dateRendering);
          const yesterday = new Date((new Date()).valueOf() - 1000*60*60*24);
          if (dateRendering < yesterday) return true;

          const listOfUsersThatBorrowBook = vm.borrows.filter(e => { return e[".key"] === vm.bookKey })[0];
          if (!listOfUsersThatBorrowBook) return false;
          const listOfIntervalsOccupied = Object.keys(listOfUsersThatBorrowBook).map(key => listOfUsersThatBorrowBook[key]);
          vm.dirtyHack = _.remove(listOfIntervalsOccupied, e => typeof e === "object");

          // console.log(dirtyHack.forEach(range => console.log(range[0], range[1])));
          // debugger;

          // console.log(dateRendering);
          return vm.dirtyHack.forEach((range) => {
            // vm.dirtyHack.splice(1);
            return moment(dateRendering).isBetween(range[0], range[1])
          });
        }
      }
    }
  },
  watch: {
    dateRange (range) {
      this.rangeTooHigh = false;
      const millisecondsInADay = 8.64e7;
      if (Math.round(Math.abs((+range[0]) - (+range[1]))/millisecondsInADay) > 14) {
        this.rangeTooHigh = true;
      }
    }
  }
});
</script>

<style lang="css">
  .mt15 {
    margin-top: 15px;
  }
</style>
