<script>
import axios from 'axios';
import { store } from './data/store';
import ProjectCardVue from './components/ProjectCard.vue';
import headerVue from './components/partials/header.vue';

  export default {

    components:{

      ProjectCardVue,
      headerVue
    },
    
    
  }
</script>

<template>
  <headerVue />

  <router-view></router-view>
</template>

<style lang="scss" scoped>

  

</style>