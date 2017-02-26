<template>
  <el-row>
    <el-col :span="8" v-for="book in books">
      <el-card :body-style="{ padding: '0px' }">
        <img :src="book.image.thumbnail" class="image">
        <div style="padding: 14px;">
          <span>{{ book.title }}</span>
          <div class="bottom clearfix">
            <small class="time">{{ book.description }}</small>
            <el-button plain type="text" class="button" @click="details(book['.key'])">Details</el-button>
            <el-button plain type="text" class="button" @click="removeBook(book['.key'])">Delete</el-button>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
  import Vue from 'vue';
  import Vuex from 'vuex';
  import { database } from '../firebaseInstance'

  const booksRef = database.ref('books');
  export default Vue.extend({
    // data() {
    //   return {
    //     books: ""
    //   };
    // },
    computed: Vuex.mapGetters([
      "/books"
    ]),
    firebase: {
      books: booksRef,
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      details (key) {
        console.log("//TODO");
      },
      removeBook (key) {

      booksRef.child(key).remove();
        this.$notify({
          title: 'Deleted',
          message: 'Successfuly deleted book!',
          type: 'success'
        });
      },
    },
    mounted () {
      console.log(this.books);
    }
  });
</script>
<style>
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    /*width: 100%;*/
    /*display: block;*/
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>
