<script>
import axios from 'axios';
import { store } from './data/store';
import ProjectCardVue from './components/ProjectCard.vue';
  export default {

    components:{

      ProjectCardVue

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
  <div class="container">
    <div class="row">
      <div class="text-center w-100">
        <h1>Projects</h1>
      </div>
      
         <ProjectCardVue/>
      
      
     
    </div>
    
    
  </div>
</template>

<style lang="scss" scoped>

  

</style>