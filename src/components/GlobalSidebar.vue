<template>
  <el-aside class="global-sidebar" ref="sidebar" :class="{ 'collapsed': isCollapsed }">
    <header>
    </header>

    <nav>
      <ul>
      </ul>

    </nav>

    <footer>
    </footer>
  </el-aside>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useGlobalStore } from '@/stores/GlobalStore';
import { useRouter } from 'vue-router';
import emitter from '@/utils/EventBus';

const router = useRouter();
const route = router.currentRoute;

const GlobalStore = useGlobalStore();
const isCollapsed = ref(false);

const menus = ref([
  {
    name: 'Overview',
    icon: 'home',
    path: '/',
    meta: 'overview'
  },
  {
    name: 'Manage',
    icon: 'palette',
    path: '/manage',
    meta: 'manage',
    sub_menus: [
      {
        name: 'Posts',
        path: '/manage/posts'
      },
      {
        name: 'Pages',
        path: '/manage/pages'
      }
    ]
  },
  {
    name: 'Analytics',
    icon: 'analytics',
    path: '/analytics',
    meta: 'analytics',
    sub_menus: [
      {
        name: 'Overview',
        path: '/analytics/overview'
      }
    ]
  },
  {
    name: 'Messages',
    icon: 'comments',
    path: '/messages',
    meta: 'messages',
  },
  {
    name: 'Earnings',
    icon: 'pig',
    path: '/earnings',
    meta: 'earnings'
  },
  {
    name: 'Social Insights',
    icon: 'line',
    path: '/social-insights',
    meta: 'social-insights'
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

    h1 {
      display: flex;

      .heading {
        display: none;
        font: var(--demi-24);
        color: var(--Text-primary);
      }

      .logo {
        flex: 1;
        color: var(--Text-brand);
        width: 172px;
        height: 40px;
        position: relative;

        svg {
          position: absolute;
          transition: var(--sidebar-collapse-transition);
        }

        .svg-icon__logo-text {
          width: 100%;
          height: 100%;
          opacity: 1;
          left: -16px;
        }

        .svg-icon__logo-a {
          width: 54px;
          height: 54px;
          opacity: 0;
          left: -16px;
          top: -2px;
        }
      }

      i {
        height: 24px;
        width: 24px;
        cursor: pointer;
        border-radius: var(--radius);
        transition: all 0.2s ease;
        color: var(--Black-40);
        position: fixed;
        z-index: 9;
        top: 26px;
        left: 226px;
        transition: var(--sidebar-collapse-transition);

        svg {
          width: 100%;
          height: 100%;
          transition: var(--sidebar-collapse-transition);
        }

        &:hover {
          background-color: var(--Neu-30);
          color: var(--Text-brand);
        }
      }
    }

    .mobile-menu {
      display: none;
    }
  }

  & > nav {
    padding: 16px 0;

    & > ul {
      padding: 8px;

      & > li {
        margin: 8px 0;

        & > a {
          display: flex;
          align-items: center;
          padding: 0 12px;
          border-radius: var(--radius);
          transition: var(--sidebar-collapse-transition);
          color: var(--Text-default);
          text-decoration: none;
          height: 44px;
          font: var(--medium-16);
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
            width: 20px;
            height: 20px;
            margin-right: 8px;
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
