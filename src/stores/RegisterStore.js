import { defineStore } from 'pinia';

export const useRegisterStore = defineStore('register', {
  state: () => ({
    //1.step如果進頁面有socailToken.google，social match成功走2，沒有走1-2
    //2.step如果進頁面有socailToken.tk或ig，social match成功走2(matchNum要歸零)，沒有的話matchNum+1，走1-2(matchNum到2的話畫面會提示)
    loading: false,
    step: '1-1', //step一開始為1-1 //1-1,1-2,2-1,2-2,3
    inviteBrand: null, //紀錄邀請的brand，在termslist第一個顯示邀請的brand
    registerData: {
      //紀錄註冊的各種資料
      email: '',
      user_status: 0,
      avatar: null,
      name: ''
    },
    //handle要存 localStorage,避免回來其他hanlde資訊遺失
    socialList: JSON.parse(window.localStorage.getItem('CREATOR_PROTAL_socialList')) || null,
    matchSocial: false, //針對email沒有match才需要使用的match social，沒有match不允許繼續註冊
    matchNum: Number(window.localStorage.getItem('CREATOR_PROTAL_match_count')) || 0, //只允許match 2次，match 2次要讓使用者重整才可再使用
    socailToken: {
      //連接出去的時候會產key存在這裡，頁免返回要根據有的key去做事，但有key做完事就要移除key(就算做失敗也要移除)
      google: JSON.parse(window.localStorage.getItem('CREATOR_PROTAL_google_social_key')) || null,
      tk: JSON.parse(window.localStorage.getItem('CREATOR_PROTAL_tk_social_key')) || null,
      ig: JSON.parse(window.localStorage.getItem('CREATOR_PROTAL_ig_social_key')) || null
    },
    goSocialStep: false //如果email submit按過後，email驗證沒過，開啟的下一步去驗證social"提示"(這時候都還是step1)
  }),

  getters: {
    // Define your getters here
    // https://pinia.vuejs.org/core-concepts/getters.html
  },

  actions: {
    matchEmail(res) {
      //user_status=30 ⇒ email not match
      //user_status=40 ⇒ email match, need to update display_name & password
      //user_status=100 ⇒ had email
      switch (res.user_status) {
        case 30:
          this.step = '1-2';
          //email沒有match,所以走socail match,數值都轉原始
          this.cleanUserHandle();
          this.setMatchCount(0);
          window.localStorage.removeItem(`CREATOR_PROTAL_socialList`);
          break;
        case 40:
          this.step = '2-1';
          break;
        case 100:
          this.step = '2-2';
          //後端告訴前端已經有註冊(並且拿到token)，這時候要強制清除token，避免沒登錄動作就直接被轉進畫面
          window.localStorage.removeItem('token');
          break;
      }
    },
    cleanUserHandle() {
      this.socialList = [
        { icon: 'instagram', name: 'Instagram', handle: '', tag: 'ig', matched: false },
        { icon: 'tiktok-pure', name: 'TikTok', handle: '', tag: 'tk', matched: false }
      ];
    },
    getUserHandle(tag, handle, matched) {
      if (!this.socialList) {
        this.cleanUserHandle();
      }

      const target = this.socialList.find((e) => e.tag === tag);
      if (target) {
        target.handle = handle;
        target.matched = matched;
      }
      window.localStorage.setItem('CREATOR_PROTAL_socialList', JSON.stringify(this.socialList));
    },
    clearUserHandle(tag) {
      switch (tag) {
        case 'google':
          this.socailToken.google = null;
          break;
        case 'tk':
          this.socailToken.tk = null;
          break;
        case 'ig':
          this.socailToken.ig = null;
          break;
      }
      window.localStorage.removeItem(`CREATOR_PROTAL_${tag}_social_key`);
    },
    //只有restart可以重製match，或是當match2滿足再次重新整理畫面的時候(觸發getKeyFineWhere)
    setMatchCount(num) {
      if (num) {
        this.matchNum = Number(this.matchNum) + 1;
        window.localStorage.setItem('CREATOR_PROTAL_match_count', this.matchNum);
      } else {
        this.matchNum = 0;
        window.localStorage.removeItem(`CREATOR_PROTAL_match_count`);
      }
    }
  }
});
