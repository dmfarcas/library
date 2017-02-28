<template>
  <el-menu router="true" theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <el-menu-item index="0" class="logo-header"><img src="../assets/logo-assist.png" alt="" width="100"></el-menu-item>
    <el-menu-item index="dashboard">Dashboard</el-menu-item>
    <el-menu-item index="admin">Admin</el-menu-item>
    <el-menu-item index="4"><a href="/resources" target="_self">Resources</a></el-menu-item>
    <el-submenu class="toggle-login" v-bind:class="{ hidden: !isLoggedIn }" index="2">
      <template slot="title">{{ displayName }}</template>
      <el-menu-item index="2-1">Edit</el-menu-item>
      <el-menu-item index="2-2" v-on:click="logout">Logout</el-menu-item>
    </el-submenu>
    <el-menu-item class="toggle-login" v-bind:class="{ hidden: isLoggedIn }" index="5"><router-link v-bind:to="'login'">Login</router-link></el-menu-item>
  </el-menu>
</template>

<script>
  import firebase from 'firebase';
  import { logout, getUser } from '../auth';
  import Vue from 'vue';

  export default Vue.extend({
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1',
        isLoggedIn: false,
        displayName: ""
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      logout: logout,
      firebase: firebase
    },
    mounted() {
      firebase.auth().onAuthStateChanged((user) => {
        this.displayName = user.displayName;
        this.isLoggedIn = user;
      });
    }
  });
</script>

<style>
  .el-menu--horizontal .el-menu-item a, .el-menu--horizontal .el-menu-item a:hover {
    text-decoration: none;
  }
  .toggle-login {
    float: right!important;
    margin-right: 2em!important;
  }
  .logo-header {
    margin-left: 2em!important;
    background-color: #fff;
    opacity: 1;
  }
  .logo-header:hover {
    opacity: 0.7;
    background-color: #fff!important;
  }
</style>
