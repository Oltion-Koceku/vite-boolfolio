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

    data(){
      return{
        store
      }

    },

    methods:{

      getApiUrl(){

        axios.get(store.apiUrl)
        .then(res =>{

        store.arrayApi = res.data.data

        })
        .catch(error =>{

          console.log('errore');

        })
        

      }

    },

    mounted(){

      this.getApiUrl()

    }


    
  }
</script>

<template>
  <headerVue />
  <!-- <div class="container">
    <div class="row">
      <div class="text-center w-100">
        <h1>Projects</h1>
      </div>
      
         <ProjectCardVue/>
      
      
     
    </div>
    
    
  </div> -->

  <router-view></router-view>
</template>

<style lang="scss" scoped>

  

</style>