<template>
  <div>
    <el-autocomplete
      v-model="state"
      :fetch-suggestions="querySearchAsync"
      placeholder="Please enter Author/Book"
      :trigger-on-focus="false"
      @select="handleSelect"
    ></el-autocomplete>
    <el-button
      type="primary"
      icon="plus"
    ></el-button>
  </div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
    props: ['emitter', 'objects', 'center'],
    ready () {
        var self = this;
    },
    data () {
      return {
        links: [],
        state: ''
      };
    },
    methods: {
      querySearchAsync (queryString, cb) {
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${queryString}&key=AIzaSyBPhoh6CYEtQ2SQhhU5XzK-OwB9WIfteCE`)
          .then(function(response) {
            return response.json()
          })
          .then(function(json) {
//            debugger;
            cb(json.items.map((e) => {
              console.log(JSON.stringify(e));
              return {
                value: e.volumeInfo.title,
                description: e.volumeInfo.description,
                image: e.imageLinks,
                pageCount: e.pageCount,
                category: e.category,
                authors: e.authors,
                preview: e.previewLink
              }
            }));
          }).catch(function(ex) {
            console.log('parsing failed', ex)
          });
      },
      createFilter (queryString) {
        return (link) => {
          return (link.title.indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect (item) {
        console.log(item);
      }
    }

});
</script>

