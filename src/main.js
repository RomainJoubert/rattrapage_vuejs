import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './Home.vue'
import VueRouter from 'vue-router'
import projet from './Projet'
import listeProjets from './ListeProjets'


Vue.use(BootstrapVue);

Vue.use(VueRouter);


const routes = [
  {
    path: '/',
    name: 'listeProjets',
    component: listeProjets,
    props: true,
  },
  {
    path: '/projet',
    name: 'detailProjet',
    component: projet,
    props: true,
  },


]
const router = new VueRouter({
  routes
})

new Vue({
  el: '#app',
  router, //ajouter l'instance router dans la Vue
  render: h => h(App)
})

