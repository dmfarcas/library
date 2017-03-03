<template lang="html">
  <el-dialog :title="currentBook.title" v-model="dialogVisible">
    <el-row :gutter="20">
      <el-col :span="8" class="details-left">
        <img :src="currentBook.image.thumbnail" class="image text-center">
        <ul>
          <li>Author: auth</li>
          <li><strong>Editura</strong>: {{currentBook.publisher}}</li>
          <li>Pagini: {{currentBook.pageCount}}</li>
        </ul>
      </el-col>
      <el-col :span="16">
        <span>{{currentBook.description }}</span>
      </el-col>
    </el-row>

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
        this.dialogVisible = true;
        // eventHub.$emit('open-modal', this.details) //lol
      }
    },
    created() {
      eventHub.$on('open-modal', this.details)
    },
    components: { Calendar }
  });
</script>

<style lang="css">
.details-left img {
  width: 100%;
}
</style>
