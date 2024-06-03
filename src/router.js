import { createMemoryHistory, createRouter } from 'vue-router'

import home from './pages/home.vue';
import info from './pages/info.vue';
import projects from './pages/projects.vue';
import error404 from './pages/error404.vue';

const router = createRouter({

  history: createMemoryHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: home

    },
    {
      path: '/info',
      name: 'info',
      component: info

    },
    {
      path: '/projects',
      name: 'projects',
      component: projects

    },
    {
      path: '/:pathMatch(.*)*',
      name: 'error404',
      component: error404

    }
  ]

});

export { router };