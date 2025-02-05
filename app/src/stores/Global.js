import { defineStore } from 'pinia';

export const useGlobalStore = defineStore('global', {
  state: () => ({
    // Define your store variables here
    // https://pinia.vuejs.org/core-concepts/state.html
    key: 'value',
  }),

  getters: {
    // Define your getters here
    // https://pinia.vuejs.org/core-concepts/getters.html
  },

  actions: {
    // Define your actions here
    // https://pinia.vuejs.org/core-concepts/actions.html
  }
});
