<template>
    <div class="flex flex-col w-full">
      <!-- Label -->
      <label
        :for="fieldName"
        class="font-medium mb-1 text-lg flex items-center gap-2"
        :class="{ 'text-red-600': errorMessage, 'text-gray-700': !errorMessage }"
      >
        <input
          :id="fieldName"
          type="checkbox"
          v-model="value"
          class="form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out"
          :class="{
            'border-red-500 ring-red-500': errorMessage,
            'border-gray-300 focus:ring-blue-500': !errorMessage
          }"
        />
        {{ labelName }}
      </label>
  
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
  });
  
  const { fieldName } = toRefs(props);
  const { value, errorMessage } = useField(fieldName.value);
  </script>
  