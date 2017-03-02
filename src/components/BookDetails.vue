<template lang="html">
  <el-dialog :title="currentBook.title" v-model="dialogVisible" size="tiny">
  <span>{{currentBook.description }}</span>
  <img :src="currentBook.image.thumbnail" class="image">
  <calendar :bookKey="currentBook['.key']"></calendar>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false">Done</el-button>
  </span>
  </el-dialog>
</template>

<script>
import Vue from 'vue';
import eventHub from '../EventHub';
import { database } from '../firebaseInstance'
import Calendar from './Calendar'

const booksRef = database.ref('books');

export default Vue.extend({
  data() {
    return {
      currentBook: {
        title: "",
        description: "",
        image: {
          thumbnail: ""
        }
      },
      dialogVisible: false,
    };
  },
  methods: {
    details (currentBook) {
      this.currentBook = currentBook;
      console.log("CUR", currentBook);
      this.dialogVisible = true;

    }
  },
  created() {
    eventHub.$on('open-modal', this.details)
  },
  components: { Calendar }
});
</script>

<style lang="css">
</style>
