<template>
  <div class="relative inline-block text-left">
    <!-- Ana Excel Butonu -->
    <!-- Ana Excel Butonu -->
    <button
      @click="toggleDropdown"
      ref="triggerRef"
      class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 text-sm font-medium"
    >
      Excel
    </button>

    <!-- Teleport ile menüyü body’e taşıyoruz -->
    <Teleport to="body">
      <div
        v-if="showDropdown"
        ref="dropdownRef"
        class="absolute z-[9999] bg-white p-2 rounded shadow-lg w-28 space-y-1"
        :style="dropdownStyle"
      >
        <router-link
          :to="{ name: 'atk-sample', params: { id } }"
          class="block bg-blue-500 text-white text-center py-1 rounded hover:bg-blue-600 text-sm"
        >
          ATK
        </router-link>

        <router-link
          :to="{ name: 'isoft-sample', params: { id } }"
          class="block bg-cyan-500 text-white text-center py-1 rounded hover:bg-cyan-600 text-sm"
        >
          Isoft
        </router-link>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from "vue";

const props = defineProps({
  id: {
    type: [String, Number],
    required: true,
  },
});

const showDropdown = ref(false);
const triggerRef = ref(null);
const dropdownRef = ref(null);
const dropdownStyle = ref({});

// Aç/kapa
const toggleDropdown = async () => {
  showDropdown.value = !showDropdown.value;

  await nextTick();

  if (showDropdown.value && triggerRef.value) {
    const rect = triggerRef.value.getBoundingClientRect();
    dropdownStyle.value = {
      position: "absolute",
      top: `${rect.bottom + window.scrollY}px`,
      left: `${rect.left + window.scrollX}px`,
    };
  }
};

// Dış tıklamayla kapama
const handleClickOutside = (event) => {
  if (
    showDropdown.value &&
    dropdownRef.value &&
    !dropdownRef.value.contains(event.target) &&
    !triggerRef.value.contains(event.target)
  ) {
    showDropdown.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>
