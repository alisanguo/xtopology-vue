import Vue from 'vue'
import Vuex from 'vuex'
import canvas from './modules/canvas'
import event from './modules/event'
import notice from './modules/notice'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    canvas,
    event,
    notice
  }
})
