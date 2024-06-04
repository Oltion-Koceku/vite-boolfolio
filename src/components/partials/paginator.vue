<script>
import { store } from '@/data/store'

  export default {
    
    data(){

      return{

        store

      }

    },

    methods:{

      callApi(data){
       this.$emit('callApi', data)

      }


    }

  }
</script>

<template>
  <nav aria-label="Page navigation example">
  <ul class="pagination">
    <li  v-for="data in this.store.paginatorData.links" :key="data.id" class="page-item">
      <button class="page-link" v-html="data.label" @click="callApi(data.url)"></button>
    </li>
  </ul>
</nav>
</template>

<style lang="scss" scoped>

</style>