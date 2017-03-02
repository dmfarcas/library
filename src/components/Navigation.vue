<template>
  <el-menu :router="true" theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <el-menu-item index="0" class="logo-header"><img src="../assets/logo-assist.png" alt="" width="100"></el-menu-item>
    <el-menu-item index="dashboard">Dashboard</el-menu-item>
    <el-menu-item index="admin">Admin</el-menu-item>
    <el-menu-item index="resources">Resources</el-menu-item>
    <el-menu-item index="nas">NAS</el-menu-item>
    <el-menu-item index="" v-on:click='onClickMeal'>Meal</el-menu-item>
    <el-submenu v-if="isLoggedIn" class="toggle-login" index="2">
      <template slot="title">{{ displayName }}</template>
      <el-menu-item index="2-2" v-on:click="logout">Logout</el-menu-item>
    </el-submenu>
    <el-menu-item v-else class="toggle-login" v-bind:class="{ hidden: isLoggedIn }" index="5"><router-link v-bind:to="'login'">Login</router-link></el-menu-item>
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
      firebase: firebase,
      onClickMeal() {
          var win = window.open('http://lunch.assist.ro', '_blank');
          win.focus();
      }
    },
    mounted() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.displayName = user.displayName;
          this.isLoggedIn = user;
        } else {
          // this.displayName = user.displayName;
        }

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
