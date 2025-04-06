<template>
  <div v-if="isoft" class="overflow-x-auto">
    <!-- Başlık ve Butonlar -->
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">{{ company.name }}</h1>
      <div class="space-x-2">
        <router-link
          :to="{ name: 'update-isoft', params: { id } }"
          class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md shadow-sm transition"
        >
          Düzenle
        </router-link>
        <button
          @click="deleteIsoft(isoft.id)"
          class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md shadow-sm transition"
        >
          Sil
        </button>
      </div>
    </div>

    <!-- Tablo -->
    <table class="min-w-full divide-y divide-gray-200 border border-gray-300 rounded-md">
      <thead class="bg-gray-100">
        <tr>
          <th class="px-6 py-3 text-left text-sm font-medium text-gray-700">Hesap Isimi</th>
          <th class="px-6 py-3 text-left text-sm font-medium text-gray-700">Hesap Numrası</th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200 text-sm">
        <tr>
          <td class="px-6 py-4 text-gray-900">Calisan</td>
          <td class="px-6 py-4 text-gray-600">{{ isoft.employeeAccount }}</td>
        </tr>
        <tr>
          <td class="px-6 py-4 text-gray-900">Vergi</td>
          <td class="px-6 py-4 text-gray-600">{{ isoft.taxAccount }}</td>
        </tr>
        <tr>
          <td class="px-6 py-4 text-gray-900">Kontribut</td>
          <td class="px-6 py-4 text-gray-600">{{ isoft.contributeAccount }}</td>
        </tr>
        <tr>
          <td class="px-6 py-4 text-gray-900">Brut Maas</td>
          <td class="px-6 py-4 text-gray-600">{{ isoft.grossAccount }}</td>
        </tr>
        <tr>
          <td class="px-6 py-4 text-gray-900">Isveren Kontribut</td>
          <td class="px-6 py-4 text-gray-600">{{ isoft.employerContributeAccount }}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Kayıt yoksa -->
  <div
    v-else
    class="flex flex-col items-center justify-center py-16 bg-gray-50 border border-dashed border-gray-300 rounded-md"
  >
    <p class="text-gray-600 text-lg mb-4">Henüz bir kayıt yok.</p>
    <router-link
      :to="{ name: 'create-isoft', params: { id } }"
      class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md shadow-sm transition"
    >
      + Ekle
    </router-link>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useIsoftStore } from "@/stores/isoft.store";
import { useCompanyStore } from "@/stores/company.store";
import router from "@/router";

const { id } = useRoute().params;
const isoftStore = useIsoftStore();
const companyStore = useCompanyStore();
const { isoft } = storeToRefs(isoftStore);
const { company } = storeToRefs(companyStore);

await isoftStore.fetchIsoftByCompanyId(id);
await companyStore.fetchCompany(id);

const deleteIsoft = async (id) => {
  await isoftStore.deleteIsoft(id);
};
</script>

<style></style>
