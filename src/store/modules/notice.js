const state = () => ({
  error: {
    text: ''
  }
})

const mutations = {
  error(state, error) {
    state.error = error
  }
}

export default {
  //namespaced: true,
  state,
  mutations
}




    // "@topology/core": "^0.2.19",
    // "@topology/activity-diagram": "^0.2.17",
    // "@topology/class-diagram": "^0.2.17",
    // "@topology/flow-diagram": "^0.2.17",
    // "@topology/sequence-diagram": "^0.2.17",
    // "@topology/chart-diagram": "^0.2.17",
    // "@topology/layout": "^0.2.17",