<template>
    <header>
      <h1 class="logo">
        <strong>壹图网</strong><sup>{AI}</sup>
      </h1>
    </header>
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

  // window.addEventListener('resize', () => {
  //   if (!isCollapsed.value && window.innerWidth <= 1180) {
  //     isCollapsed.value = true;
  //   }
  // });
});
</script>

<style lang="scss">
.global-sidebar {
  --sidebar-collapse-transition: all 0.321s ease;
  display: grid;
  grid-template-rows: auto 1fr auto;
  transition: width 0.3s ease;
  border-right: 1px solid rgba(0, 0, 0, 0.08);

  & > header {
    padding: 24px 16px 0;


    .logo {
      font-weight: 400;
      position: relative;
      display: inline-flex;

      strong {
        font-weight: 700;
        font-size: 26px;
        color: var(--Text-primary);
      }

      sup {
        font-size: 12px;
        position: absolute;
        color: var(--Text-secondary);
        font-weight: 400;
        top: 14px;
        left: calc(100% + 4px);
      }
    }

    .mobile-menu {
      display: none;
    }
  }

  & > nav {
    padding: 8px 0;

    & > ul {
      padding: 8px 16px;

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
          color: var(--Text-secondary);
          text-decoration: none;
          height: 40px;
          font-size: 14px;
          font-weight: 400;
          border: 1px solid transparent;
          transition: var(--sidebar-collapse-transition);

          &.router-link-active,
          &.router-link-exact-active,
          &.router-link-active:hover,
          &.router-link-exact-active:hover {
            color: var(--Text-brand);
            background-color: var(--Neu-20);
            border-color: var(--Neu-40);

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
            background-color: var(--Neu-20);
            color: var(--Text-primary);
          }
        }

        hr {
          border: 0;
          border-top: 1px solid rgba(0, 0, 0, 0.08);
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
