<template>
  <div id="app">
    <!--Contenedor global -->
    <v-app>
      <Drawer></Drawer>
      <v-content>
        <router-view></router-view>
      </v-content>
    </v-app>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Drawer from './components/Drawer.vue';


@Component({
  components: {
    Drawer,
  },
})
export default class App extends Vue {
}
</script>


<style lang="scss">
  html,
  body {
    margin: 0 auto;
    //width: 100%;
    //height: 100%;
  }

  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
</style>