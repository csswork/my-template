

<template>
    <div>
      <h1>cms</h1>
      <router-link to="/">back to home</router-link>
    </div>
  </template>
  
  <script setup lang="ts">
    // import { useRoute, directives } from 'vue';
    const route = useRoute();
    const message = 'Hello, Nuxt Routing!';
  
    console.log(message);
  
  </script>