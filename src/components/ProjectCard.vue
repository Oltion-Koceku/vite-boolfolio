<template>
  <div class="d-flex flex-wrap">
    <div v-for="data in store.arrayApi" :key="data.id" class="card m-2" style="width: 18rem;">
      <img src="..." class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">{{data.title}}</h5>
        <p class="card-text">{{data.description}} </p>
        <a href="http://127.0.0.1:8000/admin" class="btn btn-primary">Vai nel Database</a>
      </div>
    </div>
  </div>
</template>

<script>
import { store } from '@/data/store';
export default {
data(){
  
  return{
    store

  }

}
}
</script>

<style lang="scss" scoped></style>