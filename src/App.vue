<template>
  <div id="app">
    <test-component></test-component>
    <navigation></navigation>
    <router-view></router-view>
  </div>
</template>


<script>
  import Navigation from './components/Navigation'
  import TestComponent from './TestComponent'
  console.log(Navigation);

  export default {
    components: { Navigation, TestComponent }
  }
</script>
