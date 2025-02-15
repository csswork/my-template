

<template>
  <div>
    <h1>Nuxt Routing set up successfully!</h1>
    <p>Current route: {{ route.path }}</p>
    {{ message }}
    <a href="https://nuxt.com/docs/getting-started/routing" target="_blank">Learn more about Nuxt Routing</a>
    <router-link to="/about">Go to About page</router-link>
  </div>
</template>

<script setup lang="ts">
  // import { useRoute, directives } from 'vue';
  const route = useRoute();
  const message = 'Hello, Nuxt Routing!';

  console.log(message);

</script>