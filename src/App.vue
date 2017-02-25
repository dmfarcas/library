<template>
  <div id="app">
    <navigation></navigation>
    <router-view></router-view>
  </div>
</template>


<script>
  import Navigation from './components/Navigation'

  console.log(Navigation);

  export default {
    components: { Navigation }
  }
</script>
