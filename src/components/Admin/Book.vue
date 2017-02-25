<template>
  <el-row>
    <el-col :span="8" v-for="book in books">
      <el-card :body-style="{ padding: '0px' }">
        <img :src="book.volumeInfo.imageLinks.thumbnail" class="image">
        <div style="padding: 14px;">
          <span>{{ book.volumeInfo.title }}</span>
          <div class="bottom clearfix">
            <small class="time">{{ book.volumeInfo.description }}</small>

            <el-button type="text" class="button">Operating button</el-button>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
  import mock from '../../mockbook'
  import Vue from 'vue';

  console.log(mock);
  export default Vue.extend({
    data() {
      return {
        books: mock
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
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
