import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/zh-CN'
import 'element-ui/lib/theme-chalk/index.css'

import 'element-ui/lib/theme-chalk/fonts/element-icons.woff'
import './assets/css/iconfont/font_1113798_nklzr6lk7z.css'
import './assets/css/iconfont/font_1331132_5lvbai88wkb.css'

Vue.use(Element, { locale })

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
