<script>
import { store } from "@/data/store";
import axios from "axios";
import paginatorVue from "@/components/partials/paginator.vue";

export default {
  name: "projects",

  components: {
    paginatorVue,
  },

  data() {
    return {
      store,
      view: false,

      loader: false,
    };
  },

  methods: {
    getApiUrl(getApi, type = "") {
      this.loader = false;
      axios
        .get(getApi + type)

        .then((reuslt) => {
          if (type == "projects" || type == "") {
            store.arrayApi = reuslt.data.data.map((project) => ({
              ...project,
              viewAll: false,
            }));
            console.log(store.arrayApi);

            store.paginatorData.current_page = reuslt.data.current_page;
            store.paginatorData.total = reuslt.data.total;
            store.paginatorData.links = reuslt.data.links;

            this.loader = true;
          } else if (type == "types") {
            store.arrayType = reuslt.data;
            this.loader = true;
          } else {
            store.arrayTechnologie = reuslt.data;
            this.loader = true;
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    },

    getdate(project) {
      const first = project[8];
      const second = project[9];

      return first + second;
    },
    getmonth(project) {
      const monthInitials = [
        "Gen", // Gennaio
        "Feb", // Febbraio
        "Mar", // Marzo
        "Apr", // Aprile
        "Mag", // Maggio
        "Giu", // Giugno
        "Lug", // Luglio
        "Ago", // Agosto
        "Set", // Settembre
        "Ott", // Ottobre
        "Nov", // Novembre
        "Dic", // Dicembre
      ];

      const first = project[5];
      const second = project[6];

      if (first == 0) {
        return monthInitials[second - 1];
      } else {
        return monthInitials[first + second - 1];
      }
    },
  },

  mounted() {
    this.getApiUrl(store.apiUrl, "projects");
    //  this.getApiUrl (store.apiUrl ,"projects");
    this.getApiUrl(store.apiUrl, "types");
    this.getApiUrl(store.apiUrl, "technologies");
  },
};
</script>


<template>
  <div>
    <div class="container">
      <div v-if="loader == true" class="row">
        <div
          v-for="(project, index) in store.arrayApi"
          :key="index"
          class="col-lg-4"
        >
          <div class="card card-margin">
            <div class="card-header no-border">
              <router-link
                :to="{ name: 'detailproject', params: { slug: project.slug } }"
                class="card-title"
                >{{ project.title }}</router-link
              >
            </div>
            <div class="card-body pt-0">
              <div class="widget-49">
                <div class="widget-49-title-wrapper">
                  <div class="widget-49-date-primary">
                    <span class="widget-49-date-day">{{
                      getdate(project.updated_at)
                    }}</span>
                    <span class="widget-49-date-month">{{
                      getmonth(project.updated_at)
                    }}</span>
                  </div>
                  <div class="widget-49-meeting-info">
                    <span class="widget-49-pro-title">{{
                      project.updated_at
                    }}</span>
                  </div>
                </div>
                <p class="widget-49-meeting-points">
                  {{ project.description }}
                </p>
                <div class="widget-49-meeting-action">
                  <button
                    @click="project.viewAll = !project.viewAll"
                    class="btn btn-sm btn-flash-border-primary"
                  >
                    View Type and Technologies
                  </button>
                  <div
                    :class="project.viewAll === true ? '' : 'd-none'"
                    class="container d-flex"
                  >
                    <div class="types mx-3">
                      <h3>Types</h3>
                      <div v-if="project.type != null">
                        <span class="badge text-bg-warning">{{
                          project.type?.title
                        }}</span>
                      </div>
                      <div v-else class="technologies">
                        <span class="badge text-bg-danger"
                          >Nessun Type</span
                        >
                      </div>
                    </div>
                    <div class="mx-3">
                      <h3>Technologies</h3>

                      <div
                        v-if="project.technologie.length > 0"
                        class="technologies"
                      >
                        <div v-for="item in project.technologie" :key="item.id">
                          <span class="badge text-bg-warning">{{
                            item.title
                          }}</span>
                        </div>
                      </div>

                      <div v-else class="technologies">
                        <span class="badge text-bg-danger"
                          >Nessuna Technologie</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span v-else class="loader"></span>
    </div>
    <paginatorVue @callApi="getApiUrl" />
  </div>
</template>

<style lang="scss" scoped>
body {
  background: #f4f7fd;
  margin-top: 20px;
}

.card-margin {
  margin-bottom: 1.875rem;
}

.card {
  border: 0;
  box-shadow: 0px 0px 10px 0px rgba(82, 63, 105, 0.1);
  -webkit-box-shadow: 0px 0px 10px 0px rgba(82, 63, 105, 0.1);
  -moz-box-shadow: 0px 0px 10px 0px rgba(82, 63, 105, 0.1);
  -ms-box-shadow: 0px 0px 10px 0px rgba(82, 63, 105, 0.1);
}
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #ffffff;
  background-clip: border-box;
  border: 1px solid #e6e4e9;
  border-radius: 8px;
}

.card .card-header.no-border {
  border: 0;
}
.card .card-header {
  background: none;
  padding: 0 0.9375rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  min-height: 50px;
}
.card-header:first-child {
  border-radius: calc(8px - 1px) calc(8px - 1px) 0 0;
}

.widget-49 .widget-49-title-wrapper {
  display: flex;
  align-items: center;
}

.widget-49 .widget-49-title-wrapper .widget-49-date-primary {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #edf1fc;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
}

.widget-49
  .widget-49-title-wrapper
  .widget-49-date-primary
  .widget-49-date-day {
  color: #4e73e5;
  font-weight: 500;
  font-size: 1.5rem;
  line-height: 1;
}

.widget-49
  .widget-49-title-wrapper
  .widget-49-date-primary
  .widget-49-date-month {
  color: #4e73e5;
  line-height: 1;
  font-size: 1rem;
  text-transform: uppercase;
}

.widget-49 .widget-49-title-wrapper .widget-49-date-secondary {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #fcfcfd;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
}

.widget-49
  .widget-49-title-wrapper
  .widget-49-date-secondary
  .widget-49-date-day {
  color: #dde1e9;
  font-weight: 500;
  font-size: 1.5rem;
  line-height: 1;
}

.widget-49
  .widget-49-title-wrapper
  .widget-49-date-secondary
  .widget-49-date-month {
  color: #dde1e9;
  line-height: 1;
  font-size: 1rem;
  text-transform: uppercase;
}

.widget-49 .widget-49-title-wrapper .widget-49-date-success {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #e8faf8;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
}

.widget-49
  .widget-49-title-wrapper
  .widget-49-date-success
  .widget-49-date-day {
  color: #17d1bd;
  font-weight: 500;
  font-size: 1.5rem;
  line-height: 1;
}

.widget-49
  .widget-49-title-wrapper
  .widget-49-date-success
  .widget-49-date-month {
  color: #17d1bd;
  line-height: 1;
  font-size: 1rem;
  text-transform: uppercase;
}

.widget-49 .widget-49-title-wrapper .widget-49-date-info {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #ebf7ff;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
}

.widget-49 .widget-49-title-wrapper .widget-49-date-info .widget-49-date-day {
  color: #36afff;
  font-weight: 500;
  font-size: 1.5rem;
  line-height: 1;
}

.widget-49 .widget-49-title-wrapper .widget-49-date-info .widget-49-date-month {
  color: #36afff;
  line-height: 1;
  font-size: 1rem;
  text-transform: uppercase;
}

.widget-49 .widget-49-title-wrapper .widget-49-date-warning {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: floralwhite;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
}

.widget-49
  .widget-49-title-wrapper
  .widget-49-date-warning
  .widget-49-date-day {
  color: #ffc868;
  font-weight: 500;
  font-size: 1.5rem;
  line-height: 1;
}

.widget-49
  .widget-49-title-wrapper
  .widget-49-date-warning
  .widget-49-date-month {
  color: #ffc868;
  line-height: 1;
  font-size: 1rem;
  text-transform: uppercase;
}

.widget-49 .widget-49-title-wrapper .widget-49-date-danger {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #feeeef;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
}

.widget-49 .widget-49-title-wrapper .widget-49-date-danger .widget-49-date-day {
  color: #f95062;
  font-weight: 500;
  font-size: 1.5rem;
  line-height: 1;
}

.widget-49
  .widget-49-title-wrapper
  .widget-49-date-danger
  .widget-49-date-month {
  color: #f95062;
  line-height: 1;
  font-size: 1rem;
  text-transform: uppercase;
}

.widget-49 .widget-49-title-wrapper .widget-49-date-light {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #fefeff;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
}

.widget-49 .widget-49-title-wrapper .widget-49-date-light .widget-49-date-day {
  color: #f7f9fa;
  font-weight: 500;
  font-size: 1.5rem;
  line-height: 1;
}

.widget-49
  .widget-49-title-wrapper
  .widget-49-date-light
  .widget-49-date-month {
  color: #f7f9fa;
  line-height: 1;
  font-size: 1rem;
  text-transform: uppercase;
}

.widget-49 .widget-49-title-wrapper .widget-49-date-dark {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #ebedee;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
}

.widget-49 .widget-49-title-wrapper .widget-49-date-dark .widget-49-date-day {
  color: #394856;
  font-weight: 500;
  font-size: 1.5rem;
  line-height: 1;
}

.widget-49 .widget-49-title-wrapper .widget-49-date-dark .widget-49-date-month {
  color: #394856;
  line-height: 1;
  font-size: 1rem;
  text-transform: uppercase;
}

.widget-49 .widget-49-title-wrapper .widget-49-date-base {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #f0fafb;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
}

.widget-49 .widget-49-title-wrapper .widget-49-date-base .widget-49-date-day {
  color: #68cbd7;
  font-weight: 500;
  font-size: 1.5rem;
  line-height: 1;
}

.widget-49 .widget-49-title-wrapper .widget-49-date-base .widget-49-date-month {
  color: #68cbd7;
  line-height: 1;
  font-size: 1rem;
  text-transform: uppercase;
}

.widget-49 .widget-49-title-wrapper .widget-49-meeting-info {
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
}

.widget-49
  .widget-49-title-wrapper
  .widget-49-meeting-info
  .widget-49-pro-title {
  color: #3c4142;
  font-size: 14px;
}

.widget-49
  .widget-49-title-wrapper
  .widget-49-meeting-info
  .widget-49-meeting-time {
  color: #b1bac5;
  font-size: 13px;
}

.widget-49 .widget-49-meeting-points {
  font-weight: 400;
  font-size: 13px;
  margin-top: 0.5rem;
}

.widget-49 .widget-49-meeting-points .widget-49-meeting-item {
  display: list-item;
  color: #727686;
}

.widget-49 .widget-49-meeting-points .widget-49-meeting-item span {
  margin-left: 0.5rem;
}

.widget-49 .widget-49-meeting-action {
  text-align: right;
}

.widget-49 .widget-49-meeting-action a {
  text-transform: uppercase;
}

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

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>