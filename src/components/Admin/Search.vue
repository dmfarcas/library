<template>
  <div>
    <el-autocomplete
      popper-class="my-autocomplete"
      v-model="textfieldBook"
      :fetch-suggestions="querySearchAsync"
      placeholder="Please enter Author/Book"
      :trigger-on-focus="false"
      @select="handleSelect"
      icon="plus"
      :on-icon-click="handleIconClick"
      custom-item="my-item-en"
    ></el-autocomplete>
    <el-button
      type="primary"
      @click="addBook"
      :disabled="disabled"
      icon="plus"
    ></el-button>
  </div>
</template>

<style>
  .my-autocomplete {
  li {
    line-height: normal;
    padding: 7px;

  .value {
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .link {
    font-size: 12px;
    color: #b4b4b4;
  }
  }
  }
</style>

<script>
  //TODO the autocomplete result should contain Author/Title and maybe a picture?
  import Vue from 'vue';
  import { mapActions } from 'vuex';
  import { database } from '../../firebaseInstance';

  const booksRef = database.ref('books');

  Vue.component('my-item-en', {
    functional: true,
    render: function (h, ctx) {
      var item = ctx.props.item;
      return h('li', ctx.data, [
        h('div', { attrs: { class: 'value' } }, [item.value]),
        h('span', { attrs: { class: 'authors' } }, [item.authors])
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
            description: e.volumeInfo.description || '',
            image: e.volumeInfo.imageLinks || '',
            pageCount: e.volumeInfo.pageCount || '',
            categories: e.volumeInfo.categories || '',
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
        console.log("ADDING BOOK");
        //button is now disabled
        this.disabled = true;
        //clears the field..
        this.textfieldBook = '';
        // this.$store.commit('addBook', this.selectedItem)
        booksRef.push(this.selectedItem);

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
      },
      handleIconClick(ev) {
          if (this.selectedItem) {
              console.log('zzz', this.selectedItem);
              booksRef.push(this.selectedItem)
          }
        console.log(ev);
      }
    }

  });
</script>
