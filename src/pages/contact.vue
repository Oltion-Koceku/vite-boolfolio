<script>
import { store } from '@/data/store';
import axios from 'axios';

export default {
  name: "home",
  data() {
    return {
      store,
      name: "",
      email: "",
      message: "",

      loader : false,

      messageError : {},
      messageSuccess : false
    };
  },

  methods: {
    sendForm() {
      this.loader = true
      console.log("form inviato");
      const data = {

        name : this.name,
        email : this.email,
        message : this.message,

      }

      axios.post(store.apiUrl + 'form-message/', data)
      .then(result =>{
        
        console.log(result.data);
        this.messageError = result.data
        if (result.data.success === true) {
          this.messageSuccess = true
        }
        this.loader = false
        

      })
      .catch(error =>{

        console.log(error.message);

      })
    },
  },
};
</script>

<template>
  <div class="container">
    <h1 :class="messageSuccess === true ? 'd-none' : '' ">Inserisci i tuoi Contatti</h1>
    <form :class="messageSuccess === true ? 'd-none' : '' " v-if="loader == false" @submit.prevent="sendForm">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email address</label>
        <input
          v-model="email"
          type="text"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
        <p class="text-danger">{{ messageError.errors?.email.toString() }}</p> 
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Nome</label>
        <input
          v-model="name"
          type="text"
          class="form-control"
          id="exampleInputPassword1"
        />
        <p class="text-danger">{{ messageError.errors?.name.toString() }}</p> 

      </div>

      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Messaggio</label>
        <textarea
          v-model="message"
          type="text"
          class="form-control"
          id="exampleInputPassword1"
        ></textarea>
        <p class="text-danger">{{ messageError.errors?.message.toString() }}</p> 

      </div>
      <button type="submit" class="btn btn-primary">Invio</button>
    </form>
    <span v-else class="loader"></span>
    <div v-if="messageError.success === true" class="success">
      <h1>I dati sono stati inviati correttamente !</h1>
    </div>
  </div>
</template>

<style lang="scss" scoped>

.loader {
  width: 48px;
  height: 48px;
  border: 5px solid black;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}
</style>