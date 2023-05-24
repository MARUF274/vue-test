import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
  state() {
    return {
      user: null,
    };
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
      login(credentials) {
        console.log(credentials)
    //   return axios.post('/auth/login', credentials).then((response) => {
    //     const user = response.data;
    //     commit('setUser', user);
    //     return user;
    //   });
    },
    register(userInfo) {
        console.log(userInfo)
      // Make a POST request to the register API
    //   return axios.post('auth/register', userInfo).then((response) => {
    //     const user = response.data;
    //     console.log(user)
    //     commit('setUser', user);
    //     return user;
    //   });
    },
    logout({ commit }) {
      commit('setUser', null);
    },
  },
});

export default store;
