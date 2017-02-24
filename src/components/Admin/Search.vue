<template>
  <el-autocomplete
    v-model="state4"
    :fetch-suggestions="querySearchAsync"
    placeholder="Please enter Author/Book"
    @select="handleSelect"
  ></el-autocomplete>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
    props: ['emitter', 'objects', 'center'],
    ready() {
        var self = this;
    },
    data() {
      return {
        links: [],
        state4: '',
        timeout:  null
      };
    },
    methods: {
      querySearchAsync(queryString, cb) {
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${queryString}&key=AIzaSyBPhoh6CYEtQ2SQhhU5XzK-OwB9WIfteCE`)
          .then(function(response) {
            return response.json()
          })
          .then(function(json) {
            cb(json.items.map((e) => { return {"value": e.volumeInfo.title } }));
          }).catch(function(ex) {
            console.log('parsing failed', ex)
          });
      },
      createFilter(queryString) {
        return (link) => {
          return (link.value.indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        console.log(item);
      }
    },
    mounted() {
      this.links = this.loadAll();
    }
    
});
</script>

