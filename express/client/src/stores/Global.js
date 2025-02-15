import { defineStore } from 'pinia';

export const useGlobalStore = defineStore('global', {
  state: () => ({
    // Define your store variables here
    // https://pinia.vuejs.org/core-concepts/state.html
    token: '',
    user: null,
    is_login: false,
  }),

  getters: {
    // Define your getters here
    // https://pinia.vuejs.org/core-concepts/getters.html
    // login user
  },

  actions: {
    // Define your actions here
    // https://pinia.vuejs.org/core-concepts/actions.html
    setToken(token) {
      // console.log('setToken', token);
      if (token === null) {
        this.token = '';
        window.localStorage.removeItem('token');
        return;
      }

      this.token = token;
      window.localStorage.setItem('token', token);
    },

    setUser(user) {
      if (user === null) {
        this.user = null;
        this.is_login = false;
        return;
      }

      this.user = user;
      this.is_login = true;

    },
  }
});
