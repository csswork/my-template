<template>
  <el-container>
    <global-sidebar />
    <el-main class="main-content">
      <div class="home-content">
        <div class="home-page">
          <h2>Home Page</h2>
          <p>Welcome to the home page</p>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script setup>
import router from '../router';
import GlobalSidebar from '../components/GlobalSidebar.vue';
</script>

<style lang="scss">
.home-content {
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  .home-page {
    h2 {
      margin-bottom: 20px;
    }
  }
}
</style>
