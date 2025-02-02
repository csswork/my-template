import { defineStore } from 'pinia';
import defaultUserImg from '@/assets/images/user.png';
import ajax from '@/utils/Ajax';
import emitter from '@/utils/EventBus';

export const useGlobalStore = defineStore('global', {
  state: () => ({
    // Define your store variables here
    // https://pinia.vuejs.org/core-concepts/state.html
    default_user_img: defaultUserImg,
    user: null, //登入人的資訊
    token: window.localStorage.getItem('token') || null,
    page_heading: '',
    is_mobile: false,
    loading: false,
    initSocial: [
      {
        icon: 'instagram',
        name: 'Instagram',
        handle: '',
        tag: 'ig',
        matched: false,
        backName: ['instagram', 'instagram_business']
      },
      {
        icon: 'tiktok-pure',
        name: 'TikTok',
        handle: '',
        tag: 'tk',
        matched: false,
        backName: ['tikTok', 'tiktok_business']
      }
    ],
    sortlink_content:'Includes data from affiliate shortlinks shared by the creator that go directly to the product page.',
    
  }),

  getters: {
    // Define your getters here
    // https://pinia.vuejs.org/core-concepts/getters.html
  },

  actions: {
    // Define your actions here
    // https://pinia.vuejs.org/core-concepts/actions.html
    setPageHeading(heading) {
      this.page_heading = heading;
    },

    setIsMobile(isMobile) {
      this.is_mobile = isMobile;
    },

    setToken(token) {
      this.token = token;
      window.localStorage.setItem('token', token);
    },

    clearToken() {
      this.token = null;
      window.localStorage.removeItem('token');
    },

    async getUserMe() {
      this.loading = true;
      try {
        const res = await ajax.get('/me', { token: this.token });
        this.user = res.data.data;
        emitter.emit('refresh-user');
      } catch (err) {
        this.clearToken();
        window.location.href = '/login';
      } finally {
        this.loading = false;
      }
    }
  }
});
