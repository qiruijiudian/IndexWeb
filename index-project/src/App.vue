<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <!-- <div class="col-lg-12">
    <div class="section-title">项目</div>
    <h2 style="margin-bottom: 2.25rem">我们的项目案例</h2>
  </div> -->
  <HelloWorld msg="Welcome to Your Vue.js App"/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  // margin-top: 60px;
}
</style>
