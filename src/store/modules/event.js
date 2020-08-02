const state = () => ({
  event: {
    name: '',
    data: null
  }
})

const mutations = {
  emit(state, event) {
    state.event = event
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
