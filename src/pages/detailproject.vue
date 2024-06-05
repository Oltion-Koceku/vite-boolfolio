<script>
import { store } from "@/data/store";
import axios from "axios";

export default {
  name: "detailproject",
  data() {
    return {
      detail: {},
    };
  },
  methods: {
    getApiUrl() {
      const slug = this.$route.params.slug;
      axios
        .get(store.apiUrl + "get-detail-slug/" + slug)
        .then((result) => {
          console.log(result.data);
          this.detail = result.data.detail;
          console.log(this.detail);
        })
        .catch((error) => {
          console.log(error.message);
        });
    },

    formatDate() {
      // console.log(this.detail);

      // const d = new Date(this.detail.updated_at);

      // let options = {

      //  weekday: "long",
      //  year:"numeric",
      //  month: "long",
      //  day: "numeric",

      // };

      // return new Intl.DateTimeFormat(navigator.language, options).format(d);
      let data = new Date("2024-06-04T16:17:57.000000Z");
      let dataFormattata = data.toLocaleDateString("it-IT", {
        day: "2-digit", // giorno con due cifre
        month: "2-digit", // mese con due cifre
        year: "numeric", // anno con quattro cifre
      });

      return dataFormattata;
    },
  },

  computed: {},

  mounted() {
    this.getApiUrl();
  },
};
</script>

<template>
  <div>
    <h1>Dettagli del Project</h1>

    <div class="card text-center d-flex align-items-center">
      <img
        :src="detail.img"
        :alt="detail.title"
        class="w-25"
      />
      <div class="card-body">
        <h5 class="card-title">{{ detail.title }}</h5>
        <p class="card-text">
          {{ detail.description }}
        </p>
        <p>
          Type:
          <span v-if="detail.type != null" class="badge text-bg-warning">{{
            detail.type?.title
          }}</span>
          <span v-else class="badge text-bg-danger">Nessun Type</span>
        </p>
        <div class="d-flex justify-content-center mb-2">
          Technologie:
          <div v-if="detail.technologie?.length > 0" class="technologies">
            <div v-for="item in detail.technologie" :key="item.id">
              <span class="badge text-bg-warning">{{ item.title }}</span>
            </div>
          </div>
          <div v-else class="technologies">
            <span class="badge text-bg-danger">Nessuna Technologie</span>
          </div>
        </div>
        <router-link :to="{ name: 'projects' }" class="btn btn-primary"
          >Torna Indietro</router-link
        >
      </div>
      <div class="card-footer text-body-secondary">
        {{ formatDate() }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>