import Vue from 'vue'
import App from './App.vue'

// central stylesheet
import './scss/main.scss';

// bootstrap js
import 'bootstrap/dist/js/bootstrap.min';

// vue2filters
import Vue2Filters from 'vue2-filters';
Vue.use(Vue2Filters);

// vue-select
import vSelect from 'vue-select';
Vue.component('vSelect', vSelect);

// inline svg
import InlineSvg from 'vue-inline-svg';
Vue.component('inline-svg', InlineSvg);

Vue.config.productionTip = false;

new Vue({
    render: h => h(App)
}).$mount('#app');
