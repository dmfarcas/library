<template>
  <div class="book-container">
    <el-row v-loading.body="loading">

      <div class="product-list-container clearfix">
        <article class="product-list-item clearfix" v-for="book in books">
          <a @click="details(book['.key'])" class="product-list-item-image-container cursor-hover">
            <img class="product-list-item-image" :src="book.image.thumbnail" alt="aaa">
          </a>
          <div class="product-list-item-price">
            <div class="price-container">
              <div class="price-old-container clearfix">
                <span class="price-percent">Pagini:</span>
              </div>
              <span class="price-good">{{book.pageCount}}</span>
            </div>
          </div>
          <div class="product-list-item-info">
            <h1 class="product-list-item-title">
              <a @click="details(book['.key'])" class="cursor-hover">{{ book.title }}</a>
            </h1>
            <span class="product-list-item-author">{{ book.authors }} </span>
            <span class="product-list-item-brand"><span class="product-list-item-brand-type">Editura:</span> Nume</span>
            <ul class="product-list-item-details">
              <li><strong>Format</strong> : Paperback</li>
              <li><strong>Data Publicarii</strong> : 06 Aug 2015</li>
              <li><strong>ISBN</strong> : 9780241217931</li>
            </ul>
            <div class="product-list-item-share">
              <div class="social-icons">
                <el-button plain type="text" class="button" @click="details(book['.key'])">Details</el-button>
                <el-button plain type="text" class="button" :href="book.preview" target="_blank">Preview</el-button>
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
        this.loading = false;
      })
    }
  });
</script>
<style>
  .product-list-container {
    border-bottom: solid 1px #b8b8b8;
    margin-bottom: 1.875em;
    overflow: hidden;
  }

  .product-list-item {
    position: relative;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    float: left;
    width: 50%;
    border-top: solid 1px #b8b8b8;
    padding: 1.875em 0;
  }

  .product-list-container article:nth-child(2n+1) {
    clear: left;
    border-right: solid 1px #b8b8b8;
    padding-right: 1.875em;
  }

  .product-list-container article:nth-child(2n+1):before {
    content: "";
    display: block;
    background-color: #b8b8b8;
    width: 100%;
    height: 1px;
    position: absolute;
    top: -1px;
    left: 100%;
  }

  .product-list-container article:nth-child(2n+1):after {
    content: "";
    display: block;
    background-color: #b8b8b8;
    width: 1px;
    height: 100%;
    position: absolute;
    top: 100%;
    right: -1px;
  }

  .product-list-container article:nth-child(2n) {
    clear: right;
    padding-left: 1.875em;
  }

  .product-list-item-image-container {
    float: left;
    display: block;
    width: 9.375em;
    height: 9.375em;
    margin-right: 0.625em;
  }

  .product-list-item-image {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
  }

  .product-list-item-info {
    overflow: hidden;
  }

  .product-list-item-title {
    color: #404040;
    font-size: 1.250em;
    line-height: 1.2;
    font-weight: bold;
    text-transform: none;
    text-decoration: none;
    margin-bottom: 0.250em;
  }

  .product-list-item-title a {
    color: #404040;
    font-weight: bold;
    text-transform: none;
    text-decoration: none;
  }

  .product-list-item-title a:hover {
    text-decoration: underline;
  }

  .product-list-item-author,
  .product-list-item-brand {
    display: block;
    line-height: 1.2;
    margin-bottom: 0.125em;
  }

  .product-list-item-brand,
  .product-list-item-brand a {
    font-weight: 300;
  }

  .product-list-item-author a,
  .product-list-item-brand a {
    color: #404040;
    text-transform: none;
    text-decoration: none;
  }

  .product-list-item-author a:hover,
  .product-list-item-brand a:hover {
    text-decoration: underline;
  }

  .product-list-item-details {
    line-height: 1.4;
    margin-top: 1.250em;
  }

  .product-list-item-share {
    margin-top: 1.250em;
  }

  .product-list-item-info-text {
    font-size: 0.875em;
    font-weight: 300;
    margin-right: 0.625em;
  }

  .product-list-item-share .social-icons {
    display: inline-block;
    vertical-align: middle;
  }

  .product-list-item-price {
    float: right;
    margin-left: 0.625em;
    font-size: 1.250em;
  }
  .price-container {
    cursor: default;
    line-height: 1;
  }

  .price-container .price-good {
    display: block;
    color: #f27928;
    font-size: 1.250em;
    font-weight: normal;
    text-decoration: none;
    text-transform: none;
  }

  .price-container .price-old-container {
    display: block;
    color: #404040;
    font-size: 0.750em;
    font-weight: 300;
    text-transform: none;
    margin-bottom: 0.500em;
  }

  .price-container .price-old {
    text-decoration: line-through;
  }



  .social-icons {
    line-height: 0;
  }

  .social-icons a {
    display: inline-block;
    width: 1.875em;
    height: 1.875em;
    margin-right: 0.625em;
    text-indent: 200%;
    white-space: nowrap;
    overflow: hidden;
    background: url(/img/images/sprites.png) no-repeat;
  }

  .social-icons .social-twitter {
    background-position: 0 -150px;
  }

  .social-icons .social-facebook {
    background-position: -50px -150px;
  }

  .social-icons .social-google {
    background-position: -100px -150px;
  }

  .social-icons .social-instagram {
    background-position: -150px -150px;
  }

  .social-icons .social-wishlist {
    background-position: -100px -250px;
  }

  .social-icons .social-library {
    background-position: -150px -250px;
  }
</style>
