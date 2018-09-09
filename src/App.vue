<template>
  <div id="app">
    <side-menu/>
    <router-view style="position: relative; width: 100%"/>
  </div>
</template>

<script>
  import SideMenu from './components/SideMenu'
export default {
    components: {SideMenu},
    name: 'App',
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: row;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
