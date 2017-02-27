<template>

  <div class="main-container">
    <el-row>
      <el-col :span="24">
        <div id="list">
          <el-row>
            <el-col :span="8"><h3 class="text-center">Admin View</h3></el-col>
            <el-col :span="16"><search></search></el-col>
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
  .main-container {
    margin-top: -80px;
    padding: 80px 15px 150px;
    box-sizing: border-box;
    min-height: 100%;
  }
</style>
