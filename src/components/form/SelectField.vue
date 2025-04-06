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

    <!-- Select Field -->
    <select
      :id="fieldName"
      v-model="value"
      @change="emit('onChange', $event.target.value)"
      class="w-full border rounded-lg px-4 py-3 text-lg focus:outline-none transition shadow-sm"
      :class="{
        'border-red-500 focus:ring-red-500 focus:border-red-500': errorMessage,
        'border-gray-300 focus:ring-blue-500 focus:border-blue-500': !errorMessage,
      }"
    >
      <option value="" disabled selected>Seçiniz...</option>
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>

    <!-- Hata Mesajı -->
    <span v-if="errorMessage" class="text-red-600 text-sm mt-1">{{ errorMessage }}</span>
  </div>
</template>

<script setup>
import { toRefs } from "vue";
import { useField } from "vee-validate";

const emit = defineEmits(["onChange"]);

const props = defineProps({
  labelName: {
    type: String,
    required: true,
  },
  fieldName: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
    required: true,
  },
});

const { fieldName } = toRefs(props);
const { value, errorMessage } = useField(fieldName.value);
</script>
