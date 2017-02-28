<template>
  <div class="book-container">
    <el-row v-loading.body="loading">

      <div class="product-list-container clearfix">
        <article class="product-list-item clearfix" v-for="book in books">
          <a href="#" class="product-list-item-image-container cursor-hover">
            <img class="product-list-item-image" :src="book.image.thumbnail" alt="{{ book.title }}">
          </a>
          <div class="product-list-item-price">
            <div class="price-container">
              <div class="price-old-container clearfix">
                <span class="price-percent">Pagini:</span>
              </div>
              <span class="price-good">222</span>
            </div>
          </div>
          <div class="product-list-item-info">
            <h1 class="product-list-item-title">
              <a class="cursor-hover">{{ book.title }}</a>
            </h1>
            <span class="product-list-item-author">{{ book.author }} </span>
            <span class="product-list-item-brand"><span class="product-list-item-brand-type">Editura:</span> Nume</span>
            <ul class="product-list-item-details">
              <li><strong>Format</strong> : Paperback</li>
              <li><strong>Data Publicarii</strong> : 06 Aug 2015</li>
              <li><strong>ISBN</strong> : 9780241217931</li>
            </ul>
            <div class="product-list-item-share">
              <span class="product-list-item-info-text">Share: </span>
              <div class="social-icons">
                <el-button plain type="text" class="button" @click="details(book['.key'])">Details</el-button>
                <el-button plain type="text" class="button" @click="removeBook(book['.key'])">Delete</el-button>
              </div>
            </div>
          </div>
        </article>
      </div>

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
      }
    },
    components: { BookDetails },
    mounted() {
      this.loading = true;
      booksRef.on('value', () => { //when data arrived
        console.log('date ', booksRef);
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
