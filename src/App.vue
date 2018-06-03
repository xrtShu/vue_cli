<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
    <!-- loading -->
    <vue-loading :visible="this.$store.state.loading.isLoading"></vue-loading>
  </div>
</template>

<script>
import vueLoading from '@/components/VueLoading'
export default {
  name: 'App',
  components: {
    vueLoading
  }
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
