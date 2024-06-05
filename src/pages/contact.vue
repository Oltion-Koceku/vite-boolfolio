<script>
export default {
  name: "home",
};
</script>

<template>
  <div>
    <form class="container">
      <h1>Inserisci i tuoi Contatti</h1>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email address</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
        
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Nome</label>
        <input
          type="text"
          class="form-control"
          id="exampleInputPassword1"
        />
      </div>

      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Messaggio</label>
        <textarea
          type="text"
          class="form-control"
          id="exampleInputPassword1"
          ></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
</style>