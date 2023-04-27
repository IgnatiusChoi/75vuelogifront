import Vue from 'vue'
import FeatherIcon from '@core/components/feather-icon/FeatherIcon.vue'
import VueGoodTablePlugin from "vue-good-table";
import {TablePlugin} from "bootstrap-vue";
//css
import 'vue-good-table/dist/vue-good-table.css';
// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.use(VueGoodTablePlugin).use(TablePlugin).component(FeatherIcon.name, FeatherIcon )