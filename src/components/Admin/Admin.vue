<template>

  <div class="main-container">
    <el-row>
      <el-col :span="24">
        <div id="list">
          <h3 class="text-center">Admin View</h3>
          <el-row :gutter="20">
            <el-col :span="12" :offset="6"><search></search></el-col>
          </el-row>
          <books></books>
        </div>
      </el-col>
    </el-row>
  </div>

</template>

<script>
  import firebase from 'firebase';
  import { database } from '../../firebaseInstance';
  import Books from '../Books'
  import Search from './Search';
  import Vuex from 'vuex';

  export default {
    components: { Books, Search }
  };
</script>

<style>

</style>
