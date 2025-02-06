<template>
  <el-aside class="global-sidebar" ref="sidebar" :class="{ 'collapsed': isCollapsed }">
    <header>
      <h1 class="logo">
        <svg viewBox="0 0 688 166.4">
          <polygon points="62.5 0 0 29.7 0 48.3 45.2 27.7 45.2 166.4 62.4 166.4 62.5 0" class="one"></polygon>
          <polyline points="0 77.7 19 69 19 166.4 36.2 166.4 36.2 41.3 0 58.6" class="one">
          </polyline>
          <g class="tu">
              <polygon points="209.6 0 88.8 0 82.2 0 82.2 8.4 82.2 8.8 82.2 17.2 88.8 17.2 209.6 17.2 215 17.2 215 8.8 215 8.4 215 0 209.6 0">
              </polygon>
              <path d="M143.5,166.4H126.3V45.2h-44V28h61.2Z"></path>
              <path d="M153.8,166.4H171V45.2h44V28H153.8Z"></path>
              <path d="M299,138c21.7,0,35.9-17.8,35.9-39.6V0H317.5V98.4c0,12.3-6.4,22.3-18.5,22.3s-18.5-10-18.5-22.3V0H263.1V98.4C263.2,120.2,277.3,138,299,138Z">
              </path>
              <path d="M345.4,0V94.9c0,30-18.9,54.5-46.4,54.5s-46.4-24.4-46.4-54.5V0h-17V94.9c0,28.4,13.7,52.9,35.2,64.5a58.2,58.2,0,0,0,28.1,7.1h.3c36.9,0,63.5-32.1,63.5-71.5V0Z">
              </path>
          </g>
          <g class="cn">
              <polygon points="574.5 110.4 574.5 94.4 636.2 94.4 638.4 90.8 660.6 90.8 647.6 110.4 574.5 110.4">
              </polygon>
              <polygon points="574.5 133.9 574.5 117.9 636.2 117.9 638.4 114.3 660.6 114.3 647.6 133.9 574.5 133.9">
              </polygon>
              <polygon points="603.9 52.5 618.8 62.8 644.1 45.1 597.6 45.1 594.5 49.1 574.5 49.1 591.3 25 610.2 25 606.6 29.2 660.6 29.2 660.6 52.5 635.3 67.2 660.6 73 660.6 87.2 617.8 77.3 574.5 87.2 574.5 72.6 599.6 67.2 574.5 52.5 603.9 52.5">
              </polygon>
              <path d="M547.1.6V158.3H688V.6ZM670.9,141.2H564.2V17.8H670.9Z"></path>
              <path d="M490.2,143v-9.9h24.5V91.5H408.6v41.6h25.5V143H392.4v15.4H531.8V143Zm-65.5-36.6h73.8v11.2H424.7Zm24.8,26.7h25.3V143H449.5Z">
              </path>
              <path d="M531.9,46.4H392.3v35h16.9v5.2H515V81.4h16.9ZM516.5,71H407.8V61.9H516.5Z">
              </path>
              <polygon points="531.9 21.2 532 5.7 469.8 5.7 469.8 0.2 454.4 0.2 454.4 5.7 392.3 5.7 392.3 21.2 454.4 21.2 454.4 26 401.8 26 401.8 41.5 522.4 41.5 522.4 26 469.8 26 469.8 21.2 531.9 21.2">
              </polygon>
          </g>
        </svg>
      </h1>
    </header>

    <nav>
      <ul>
        <li v-for="(menu, index) in menus" :key="index" :class="['menu-item', 'menu-type-' + menu.type, { 'active': route.meta === menu.meta }]">
          <template v-if="menu.type === 'link'">
            <router-link :to="menu.path" @click="openSubMenu(menu, $event)">
              <component :is="menu.icon" />
              <span>{{ menu.name }}</span>
            </router-link>
          </template>

          <template v-else-if="menu.type === 'fun'">
            <span @click="menu.cb">
              <component :is="menu.icon" />
              <span>{{ menu.name }}</span>
            </span>
          </template>

          <template v-else-if="menu.type === 'hr'">
            <hr>
          </template>
        </li>
      </ul>

    </nav>

    <footer>
    </footer>
  </el-aside>
</template>

<script setup>
import { ref, defineAsyncComponent, onMounted } from 'vue';
import { useGlobalStore } from '@/stores/Global';
import { useRouter } from 'vue-router';
import event from '@/utils/EventBus';
// import { Service } from '@element-plus/icons-vue';

const router = useRouter();
const route = router.currentRoute;

const GlobalStore = useGlobalStore();
const isCollapsed = ref(false);
const menus = ref([
{
    name: '首页',
    type: 'link',
    icon: 'HomeFilled',
    path: '/',
    meta: 'home'
  },
  {
    name: '探索',
    type: 'link',
    icon: 'CoffeeCup',
    path: '/explore',
    meta: 'explore'
  },
  {
    name: '个人主页',
    type: 'link',
    icon: 'User',
    path: '/personal',
    meta: 'personal',
  },
  {
    name: '资产',
    type: 'link',
    icon: 'Box',
    path: '/asset',
    meta: 'asset',
  },
  {
    name: '图片生成',
    type: 'fun',
    icon: 'MagicStick',
    // path: '/image/generate',
    meta: 'generate-image',
    cb: () => {
      event.emit('open-ai');
    }
  },
  {
    type: 'hr',
  },
  {
    name: '消息中心',
    type: 'fun',
    icon: 'Bell',
    meta: 'notification',
    cb: () => {
      event.emit('open-notification');
    }
  },
  {
    name: '邀请',
    type: 'fun',
    icon: 'Message',
    meta: 'social-insights',
    cb: () => {
      event.emit('open-invite');
    }
  }
]);



const openSubMenu = (menu, event) => {
  event.preventDefault();
  console.log(menu);
};

const collapseMenu = () => {
  isCollapsed.value = !isCollapsed.value;
};

const toggleMobileMenu = () => {
  document.body.classList.toggle('open-mobile-navi');
};

// const navigateToUrl = (url) => {
//   router.push(url);
// };

onMounted(() => {

  if (window.innerWidth <= 1180) {
    isCollapsed.value = true;
  }

  window.addEventListener('resize', () => {
    if (!isCollapsed.value && window.innerWidth <= 1180) {
      isCollapsed.value = true;
    }
  });
});
</script>

<style lang="scss">
.global-sidebar {
  --sidebar-collapse-transition: all 0.321s ease;

  display: grid;
  grid-template-rows: auto 1fr auto;
  transition: width 0.3s ease;
  overflow: hidden;
  overflow-x: hidden !important;

  & > header {
    padding: 24px 16px 0;


    .logo {
      height: 32px;
      position: relative;

      svg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }

      .one {
        fill: var(--Text-brand);
      }

      .tu {
        fill: var(--Text-primary);
      }

      .cn {
        fill: var(--Text-default);
      }
    }

    .mobile-menu {
      display: none;
    }
  }

  & > nav {
    padding: 8px 0;

    & > ul {
      padding: 8px;

      & > li {
        margin: 8px 0;

        & > span,
        & > a {
          cursor: pointer;
          display: flex;
          align-items: center;
          padding: 0 12px;
          border-radius: var(--radius);
          transition: var(--sidebar-collapse-transition);
          color: var(--Text-default);
          text-decoration: none;
          height: 40px;
          font-size: 14px;
          font-weight: 400;
          transition: var(--sidebar-collapse-transition);

          &.router-link-active,
          &.router-link-exact-active,
          &.router-link-active:hover,
          &.router-link-exact-active:hover {
            color: white;
            background-color: var(--Text-brand);

            svg {
              fill: white;
            }
          }

          & > svg {
            width: 16px;
            height: 16px;
            margin-right: 10px;
            transition: var(--sidebar-collapse-transition);
          }

          span {
            flex: 1;
            overflow: hidden;
            white-space: nowrap;
          }

          i {
            height: 20px;
            width: 20px;
            cursor: pointer;
            border-radius: var(--radius);
            transition: var(--sidebar-collapse-transition);
            color: var(--Black-40);
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;

            svg {
              width: 100%;
              height: 100%;
            }

            &:hover {
              color: var(--Text-primary);
            }
          }

          &:hover {
            background-color: var(--Neu-30);
            color: var(--Text-primary);
          }
        }

        hr {
          border: 0;
          border-top: 1px solid var(--Black-10);
          margin: 16px 0;
        }
      }
    }

    .sub-menu {
      display: none;
    }

    & > footer {
      display: none;
    }
  }

  footer {
    padding: 16px;

    .info {
      display: flex;
      align-items: center;
      padding: 16px 0;

      & > li {
        margin-right: 16px;

        span {
          display: block;
          border: 2px solid var(--Black-75);
        }

        a {
          color: var(--Text-default);
          text-decoration: none;
          height: 34px;
          width: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: all 0.2s ease;

          svg {
            width: 20px;
            height: 20px;
          }

          &:hover {
            background-color: var(--Neu-30);
          }
        }
      }

    }

    .links {
      display: flex;
      flex-wrap: wrap;

      & > li {
        width: 50%;

        a {
          color: var(--Text-default);
          text-decoration: none;
          transition: all 0.2s ease;
          font: var(--book-12);

          &:hover {
            color: var(--Text-link);
          }
        }
      }
    }

    & > p {
      padding: 12px 0 0;
      color: var(--Text-default);
      font: var(--book-12);

      a {
        color: var(--Text-default);
        text-decoration: none;
        transition: all 0.2s ease;

        &:hover {
          color: var(--Text-link);
        }
      }
    }
  }

  .ui-popper {
    .ui-button {
      justify-content: flex-start;
    }
  }

  @media screen and (max-width: $tablet_size) {
    & {
      position: fixed;
      background-color: var(--Bg-01);
      z-index: 9;
      height: 100%;
      left: 0;
    }

    @at-root {
      #app > .ui-container {
        padding-left: 68px;
      }
    }
  }

  @media screen and (min-width: $mobile_size) {
    &.collapsed {
      width: 64px;

      & > header {
        padding: 24px 16px 0;

        h1 {

          .logo {

            .svg-icon__logo-text {
              opacity: 0;
            }

            .svg-icon__logo-a {
              opacity: 1;
              left: -12px;
            }
          }

          i {
            left: 52px;
            top: 36px;
            background-color: var(--Bg-01);

            svg {
              transform: rotate(180deg);
            }
          }
        }
      }

      & > nav {
        padding: 16px 0;

        & > ul {
          & > li {
            & > a {
              padding: 0;
              border-radius: 22px;
              height: 44px;
              width: 44px;
              position: relative;
              left: 1px;


              & > svg {
                width: 24px;
                height: 24px;
                margin-right: 0;
                position: absolute;
                left: 10px;
              }

              span {
                width: 0px;
                opacity: 0;
              }

              i {
                width: 0px;
              }

              &:hover {
                background-color: var(--Neu-30);
                color: var(--Text-primary);
              }
            }
          }
        }

        .sub-menu {
          display: none;
        }
      }

      & > footer {
        padding: 16px;

        .info {
          padding: 16px 0;
          width: 34px;
          flex-wrap: wrap;

          & > li {
            margin: 0;

            &:nth-child(1) {
              order: 3;
              margin-top: 12px;
            }

            &:nth-child(2) {
              order: 2;
              margin-top: 6px;
            }

            &:nth-child(3) {
              order: 1;
            }
          }
        }

        .links,
        & > p {
          display: none;
        }
      }

    }
  }

  @media screen and (max-width: $mobile_size) {
    & {
      left: 0;
      top: 0 !important;
      height: auto;
      display: flex;
      align-items: center;
      width: 100% !important;
      overflow: hidden !important;
      position: fixed !important;

      & > header {
        padding: 8px;
        display: flex;
        align-items: center;
        flex: 1;

        h1 {
          display: flex;

          .logo {
            width: 120px;
            height: 30px;

            .svg-icon__logo-text {
              left: 0;
            }
          }

          .heading.is-show {
            display: block;

            & + .logo {
              display: none;
            }
          }

          i {
            display: none;
          }
        }

        .mobile-menu {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 30px;
          width: 30px;
          cursor: pointer;
          color: var(--Text-primary);
          margin-right: 6px;
          position: relative;
          top: 1px;

          svg {
            width: 80%;
            height: 80%;
          }
        }
      }

      & > nav {
        position: fixed;
        left: 0;
        top: 40px;
        background-color: var(--Bg-01);
        width: 100%;
        height: calc(100vh - 40px);
        overflow-y: auto;
        transform: translateX(-100%);
        transition: transform 0.3s ease;
        display: grid;
        grid-template-rows: 1fr auto;

        @at-root {
          body.open-mobile-navi {
            overflow: hidden;
          }

          body.open-mobile-navi &  {
            transform: translateX(0);
          }
        }

        & > footer {
          display: block;
        }
      }

      & > footer {
        padding: 0;

        .info {
          padding: 8px 16px;
          width: auto;

          & > li {
            margin: 0;

            a {
              height: 28px;
              width: 28px;
            }

            &:nth-child(1) {
              order: 3;
              margin-left: 8px;
            }

            &:nth-child(2) {
              order: 2;
            }

            &:nth-child(3) {
              order: 1;
            }
          }
        }

        .links,
        & > p {
          display: none;
        }
      }
    }

    @at-root {
      #app > .ui-container {
        display: block;
        padding: 50px 0 0;

        & > .ui-main {
          padding: 0;
          overflow: visible;
          box-shadow: none;
          border-radius: unset;
          margin: 0;
        }
      }
    }
  }

}
</style>
