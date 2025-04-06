<template>
    <div class="flex flex-col w-full">
      <!-- Label -->
      <label
        :for="fieldName"
        class="font-medium mb-1 text-lg"
        :class="{ 'text-red-600': errorMessage, 'text-gray-700': !errorMessage }"
      >
        {{ labelName }}
      </label>
  
      <!-- Input Field -->
      <input
        :id="fieldName"
        type="text"
        v-model="value"
        :placeholder="placeholderName"
        class="w-full border rounded-lg px-4 py-3 text-lg focus:outline-none transition shadow-sm"
        :class="{
          'border-red-500 focus:ring-red-500 focus:border-red-500': errorMessage,
          'border-gray-300 focus:ring-blue-500 focus:border-blue-500': !errorMessage
        }"
      />
  
      <!-- Hata Mesajı -->
      <span v-if="errorMessage" class="text-red-600 text-sm mt-1">{{ errorMessage }}</span>
    </div>
  </template>
  
  <script setup>
  import { toRefs } from "vue";
  import { useField } from "vee-validate";
  
  const props = defineProps({
    labelName: {
      type: String,
      required: true,
    },
    fieldName: {
      type: String,
      required: true,
    },
    placeholderName: {
      type: String,
      default: "",
    },
  });
  
  const { fieldName } = toRefs(props);
  const { value, errorMessage } = useField(fieldName.value);
  </script>
  