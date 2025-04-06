<template>
    <Navbar />
  <div class="w-full h-[calc(100vh-80px)] bg-gray-100 flex items-center justify-center">
    <div class="w-full max-w-[95%] h-[90vh] mx-auto p-8 bg-white shadow-lg rounded-lg overflow-auto">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import Navbar from "@/components/layouts/navbar/index.vue";
</script>
