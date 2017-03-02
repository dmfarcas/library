<template lang="html">
  <div class="block text-center mt15">
    <el-date-picker
      v-model="dateRange"
      format="dd.MM.yyyy"
      type="daterange"
      align="right"
      placeholder="Pick a range"
      :picker-options="pickerOptions2">
    </el-date-picker>
    <el-button @click="borrowBook()" type="primary">Borrow</el-button>
    <p v-if="rangeTooHigh">Range too high. Maximum is 14 days.</p>
</template>

<script>
import Vue from 'vue';
import eventHub from '../EventHub';
import { database } from '../firebaseInstance'
import firebase from 'firebase';

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
      pickerOptions2: {
        firstDayOfWeek: 1,
        disabledDate(dateRendering) {
          const yesterday = new Date((new Date()).valueOf() - 1000*60*60*24);
          if (dateRendering < yesterday) return true;
        },
        // shortcuts: [{
        //   text: 'One week',
        //   onClick(picker) {
        //     const end = new Date();
        //     const start = new Date();
        //     console.log('sta', )
        //     start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
        //     picker.$emit('pick', [start, end]);
        //   }
        // }, {
        //   text: 'Two weeks',
        //   onClick(picker) {
        //     const end = new Date();
        //     const start = new Date();
        //     start.setTime(start.getTime() + 3600 * 1000 * 24 * 14);
        //     picker.$emit('pick', [start, end]);
        //   }
        // }]
      },
      dateRange: []
    };
  },
  methods: {
    borrowBook () {
      const userBorrowsRef = database.ref(`borrows/${this.bookKey}`);
      debugger;
      userBorrowsRef.child(firebase.auth().currentUser.uid).update(this.dateRange)
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
