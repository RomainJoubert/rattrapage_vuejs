<template>
  <div id="app" class="container-fluid">
    <h1>Gestion des projets</h1>
    <br>
    <router-view></router-view>
  </div>
</template>

<script>
  import listeProjets from './ListeProjets';

  export default {
    name: 'app',
    components: {'listeProjets': listeProjets},


    data() {
      return {
        // fields:[{name:'Liste des projets'}],
      }
    }
  }
</script>

<style lang="scss">
  @import "~bootstrap/scss/bootstrap.scss";

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  h1, h2 {
    font-weight: normal;
  }

  a {
    color: #42b983;
  }

</style>
