<template>
  <div class="ui-loading">
    <div>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ui-loading'
};
</script>
<style lang="scss">
.ui-loading {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: rgba(#fff, 0.5);
  z-index: 999999999;

  &.absolute {
    position: absolute;
  }

  &.static {
    display: block;
    background: transparent;
    position: static;
    width: 100%;

    & > div {
      width: 160px;
      height: 160px;
      position: relative;
      left: auto;
      top: auto;
      margin: auto;
      transform: unset;
    }
  }

  &.static-back {
    width: 100vw;
    height: 100vh;
    position: fixed;
    background-color: rgba(0, 0, 0, 0.15);
    margin-top: 0 !important;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &.small {
    display: block;
    background: transparent;
    position: static;
    width: 100%;
    margin-top: 0px !important;

    & > div {
      height: 30px;
      position: relative;
      left: auto;
      top: auto;
      margin: auto;
      transform: unset;
    }
  }

  & > div {
    width: 50vw;
    height: 50vw;
    max-width: 160px;
    max-height: 160px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
    display: flex;
    justify-content: center;
    align-items: center;

    .line {
      display: inline-block;
      width: 15px;
      height: 15px;
      border-radius: 15px;
      background-color: var(--Text-brand);
      margin-right: 5px;
    }

    .line:nth-last-child(1) {
      animation: loadingC 0.6s 0.1s linear infinite;
    }

    .line:nth-last-child(2) {
      animation: loadingC 0.6s 0.2s linear infinite;
    }

    .line:nth-last-child(3) {
      animation: loadingC 0.6s 0.3s linear infinite;
    }
  }
}

@-webkit-keyframes loadingC {
  0% {
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
  }

  50% {
    -webkit-transform: translate(0, 15px);
    transform: translate(0, 15px);
  }

  100% {
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
  }
}

@keyframes loadingC {
  0% {
    transform: translate(0, 0);
  }

  50% {
    transform: translate(0, 15px);
  }

  100% {
    transform: translate(0, 0);
  }
}
</style>
