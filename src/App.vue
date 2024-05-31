<script>
import axios from 'axios';
import { store } from './data/store';
  export default {
    data(){
      return{


      }

    },

    methods:{

      getApiUrl(){

        axios.get(store.apiUrl)
        .then(res =>{

          console.log(res);

        })
        .catch(error =>{

          console.log(error);

        })
        

      }

    },

    mounted(){

      this.getApiUrl()

    }


    
  }
</script>

<template>
  <div>
    <h1>ciaooo</h1>
  </div>
</template>

<style lang="scss" scoped>

</style>