// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import ElementUI from 'element-ui';
import 'es6-promise/auto'
import locale from 'element-ui/lib/locale/lang/ru-RU';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router';
import VueCookies from 'vue-cookies'
import _ from 'lodash'
import 'reset-css';
import store from './store/store';

import YmapPlugin from 'vue-yandex-maps'

Vue.config.productionTip = false;
Vue.use(ElementUI, {locale});
Vue.use(VueCookies);
Vue.use(_);
Vue.use(YmapPlugin);

window._ = _;

new Vue({
    el: '#app',
    router,
    store,
    components: {App},
    template: '<App/>',
    created(){
      this.$store.dispatch('loadCurrentMail');
      this.$store.dispatch('loadBuildings');
    }
});
