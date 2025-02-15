<template>
  <div>
    <h1>Vue.js</h1>
    <p>{{ message }}</p>
  </div>
  <NuxtPage />
</template>


<script setup>

import { ref } from 'vue'

const message = ref('Hello, Vue.js!')

</script>

<style>
h1 {
  color: red;
}
</style>