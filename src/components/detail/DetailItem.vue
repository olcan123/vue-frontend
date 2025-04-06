<!-- components/DetailItem.vue -->
<template>
    <div class="mb-4">
      <div class="text-sm text-gray-500 dark:text-gray-400">{{ label }}</div>
      <div class="text-base font-medium text-gray-800 dark:text-white">{{ value || "-" }}</div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    label: String,
    value: String
  });
  </script>
  