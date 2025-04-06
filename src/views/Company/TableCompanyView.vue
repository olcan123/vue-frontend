<template>
  <DataTable :value="companies">
    <template #header>
      <div class="flex justify-between">
        <h5 class="m-0 text-3xl font-bold">Sirketler</h5>
        <router-link
          :to="{ name: 'create-company' }"
          class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >Sirket Ekle</router-link
        >
      </div>
    </template>
    <Column field="name" header="Sirket Ismi" />
    <Column field="tradeName" header="Sirket Ticari Adi" />
    <Column field="uidNumber" header="UID Numarasi" />
    <Column field="vatNumber" header="Vergi Numarasi" />
    <Column field="address" header="Adres" />
    <Column field="city" header="Sehir" />
    <Column field="country" header="Ulkeler" />
    <Column field="representativeName" header="Sirket Sahibi" />
    <Column header="Islemler">
      <template #body="slotProps">
        <div class="flex flex-wrap gap-2">
          <router-link
            :to="`/companies/detail/${slotProps.data.id}`"
            class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 text-sm font-medium"
          >
            Detay
          </router-link>

          <router-link
            :to="{ name: 'update-company', params: { id: slotProps.data.id } }"
            class="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 text-sm font-medium"
          >
            Düzenle
          </router-link>

          <button
            type="button"
            class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 text-sm font-medium"
            @click="companyStore.deleteCompany(slotProps.data.id)"
          >
            Sil
          </button>
          <router-link
            :to="{ name: 'table-isofts', params: { id: slotProps.data.id } }"
            class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 text-sm font-medium"
          >
            Isoft Tablo
          </router-link>

        </div>
      </template>
    </Column>
  </DataTable>
</template>

<script setup>
import { DataTable, Column } from "primevue";
import { storeToRefs } from "pinia";

import { useCompanyStore } from "@/stores/company.store";

const companyStore = useCompanyStore();
const { companies } = storeToRefs(companyStore);
await companyStore.fetchCompanies();
</script>

<style></style>
