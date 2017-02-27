<template>
  <div class="book-container">
    <el-row v-loading.body="loading">
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
    <book-details></book-details>

  </div>
</template>

<script>
  import Vue from 'vue';
  import Vuex from 'vuex';
  import BookDetails from './BookDetails';
  import { database } from '../firebaseInstance'
  import eventHub from '../EventHub'

  const booksRef = database.ref('books');

  // var eventHub = new Vue()


  export default Vue.extend({
    data() {
      return {
        loading: false
      };
    },
    computed: Vuex.mapGetters([
      "/books"
    ]),
    firebase: {
      books: booksRef,
    },
    methods: {
      details(book) {
        console.log("OPENING DETAILS");
        eventHub.$emit('open-modal', book)
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
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
    components: { BookDetails },
    mounted() {
      this.loading = true;
      booksRef.on('value', () => { //when data arrived
        this.loading = false;
      })
    }
  });
</script>
<style>
  .book-container {
    min-height:1000px;
  }

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
