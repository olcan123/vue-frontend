<template>
  <DataTable :value="employees" filterDisplay="row" v-model:filters="filters" data-key="id">
    <template #header>
      <div class="flex justify-between">
        <h5 class="m-0 text-3xl font-bold">Personeller</h5>
        <router-link
          :to="{ name: 'create-employee' }"
          class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >Personel Ekle</router-link
        >
      </div>
    </template>
    <Column field="firstName" header="Ad" />
    <Column field="lastName" header="Soyad" />
    <Column field="nationalIdentity" header="Kimlik No." />
    <Column field="isoftId" header="Isot No." />
    <Column field="educationLevel" header="Egitim" />
    <Column field="companyId" header="Sirket" filterField="companyId" :showFilterMenu="false">
      <template #body="slotProps">
        {{ companies.find((company) => company.id === slotProps.data.companyId).name }}
      </template>
      <template #filter="{ filterModel, filterCallback }">
        <Select
          v-model="filterModel.value"
          @change="filterCallback()"
          :options="uniqueCompanies"
          optionLabel="name"
          optionValue="id"
          placeholder="Şirket seçiniz"
          class="w-full"
          :showClear="true"
        />
      </template>
    </Column>
    <Column header="Islemler">
      <template #body="slotProps">
        <div class="flex flex-wrap gap-2">
          <!-- <router-link
            :to="`/employees/detail/${slotProps.data.id}`"
            class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 text-sm font-medium"
          >
            Detay
          </router-link> -->

          <router-link
            :to="{ name: 'update-employee', params: { id: slotProps.data.id } }"
            class="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 text-sm font-medium"
          >
            Düzenle
          </router-link>

          <button
            type="button"
            class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 text-sm font-medium"
            @click="employeeStore.deleteEmployee(slotProps.data.id)"
          >
            Sil
          </button>
        </div>
      </template>
    </Column>
  </DataTable>
</template>

<script setup>
import { ref, computed } from "vue";
import { DataTable, Column, Select } from "primevue";
import { storeToRefs } from "pinia";
import { FilterMatchMode } from "@primevue/core/api";

import { useEmployeeStore } from "@/stores/employee.store";
import { useCompanyStore } from "@/stores/company.store";

const filters = ref({
  companyId: { value: null, matchMode: FilterMatchMode.EQUALS },
});

const employeeStore = useEmployeeStore();
const companyStore = useCompanyStore();
const { employees } = storeToRefs(employeeStore);
const { companies } = storeToRefs(companyStore);
await employeeStore.fetchEmployees();
await companyStore.fetchCompanies();

const uniqueCompanies = computed(() => {
  return Array.from(new Set(companies.value.map((company) => company.id))).map((id) => {
    return companies.value.find((company) => company.id === id);
  });
});
</script>

<style></style>
