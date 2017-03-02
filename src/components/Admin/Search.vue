<template>
  <div class="container-search">
    <el-autocomplete
      popper-class="my-autocomplete"
      v-model="textfieldBook"
      :fetch-suggestions="querySearchAsync"
      placeholder="Please enter Author/Book"
      :trigger-on-focus="false"
      @select="handleSelect"
      icon="plus"
      :on-icon-click="addBook"
      custom-item="my-item-en"
    ></el-autocomplete>
  </div>
</template>

<style scoped>
  .el-autocomplete {
    width: 100%;
  }
  .container-search {
    margin-top: 9px;
  }
  li {
    line-height: normal;
    padding: 7px;
    position: relative;
  }
  .title {
    margin-left: 15px;
    display: inline;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .description {
    font-size: 12px;
    margin-left: 15px;
  }
  .authors {
    margin-left: 15px;
    font-size: 12px;
    color: #b4b4b4;
    line-height: 12px;
  }
  .img-search {
    float: left;
    padding-top: 10px;
    padding-bottom: 10px;
    height: 100px;
    display: inline;
  }
</style>

<script>
  import Vue from 'vue';
  import { mapActions } from 'vuex';
  import { database } from '../../firebaseInstance';

  const booksRef = database.ref('books');

  Vue.component('my-item-en', {
    functional: true,
    render: function (h, ctx) {
      var item = ctx.props.item;
      return h('li', ctx.data, [
        h('img', { attrs: { src: item.image.smallThumbnail, class: 'img-search' } }, []),
        h('div', { attrs: { class: 'title' } }, [item.value]),
        h('div', { attrs: { class: 'authors' } }, [item.authors])
      ]);
    },
    props: {
      item: { type: Object, required: true }
    }
  });

  function querySearchAsync (queryString, cb) {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${queryString}&key=AIzaSyBPhoh6CYEtQ2SQhhU5XzK-OwB9WIfteCE`)
      .then(response => {
        return response.json()
      })
      .then(json => {
        cb(json.items.map(e => {
          return {
            value: e.volumeInfo.title, //TODO how to send title directly in the callback.
            title: e.volumeInfo.title || '',
            subtitle: e.volumeInfo.subtitle || '',
            description: e.volumeInfo.description || '',
            image: e.volumeInfo.imageLinks || '',
            pageCount: e.volumeInfo.pageCount || '',
            categories: e.volumeInfo.categories || '',
            publisherDate: e.volumeInfo.publisherDate || '',
            publisher: e.volumeInfo.publisher || '',
            authors: e.volumeInfo.authors || '',
            preview: e.volumeInfo.previewLink || ''
          }
        }));
      }).catch(ex => {
      console.log('parsing failed', ex)
    });
  }

  export default Vue.extend({
    name: 'Search',
    props: ['Search'],
    ready () {
      var self = this;
    },
    data () {
      return {
        textfieldBook: '',
        disabled: true,
        selectedItem: {}
      };
    },
    methods: {
      addBook () {
        //button is now disabled
        this.disabled = true;
        //clears the field..
        this.textfieldBook = '';
        if (this.selectedItem) {
          booksRef.push(this.selectedItem);
        }
      },
      querySearchAsync,
      createFilter (queryString) {
        return (link) => {
          return (link.title.indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect (item) {
        this.selectedItem = item;
        this.disabled = false;
      }
    }

  });
</script>
