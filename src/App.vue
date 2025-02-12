<script setup>
import ChatButton from './components/chatButton.vue'; // Đảm bảo đường dẫn đúng
</script>

<template>
  <div>
    <router-view></router-view>
    <ChatButton /> <!-- Thêm component ChatButton ở đây -->
  </div>
</template>

<style scoped>
</style>