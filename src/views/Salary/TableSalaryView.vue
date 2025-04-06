<template>
  <DataTable
    :value="salarySummaries"
    v-model:expandedRows="expandedRows"
    dataKey="id"
    @rowExpand="onRowExpand"
    @rowCollapse="onRowCollapse"
    filterDisplay="row"
    v-model:filters="filters"
  >
    <template #header>
      <div class="flex justify-between">
        <h5 class="m-0 text-3xl font-bold">Maaslar</h5>
        <router-link
          :to="{ name: 'create-salary' }"
          class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >Maas Ekle</router-link
        >
      </div>
    </template>
    <Column expander style="width: 5rem" />
    <Column field="companyId" header="Şirket" filterField="companyId" :showFilterMenu="false">
      <template #body="slotProps">
        {{ companies.find((company) => company.id === slotProps.data.companyId)?.name || "—" }}
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

    <Column field="period" header="Periyod" filterField="period" :showFilterMenu="false">
      <template #filter="{ filterModel, filterCallback }">
        <Select
          v-model="filterModel.value"
          @change="filterCallback()"
          :options="uniqueSortedPeriods"
          placeholder="Periyot seçiniz"
          class="w-full"
          :showClear="true"
        />
      </template>
      <template #body="slotProps">
        {{ slotProps.data.period.split("-")[1] }}.{{ slotProps.data.period.split("-")[0] }}
      </template>
    </Column>

    <Column field="sumNetSalary" header="Toplam Net Maas" />
    <Column field="sumGrossSalary" header="Toplam Brut Maas" />
    <Column field="sumTax" header="Toplam Vergi" />
    <Column field="sumEmployeeContribute" header="Toplam Personel Katkı" />
    <Column field="sumEmployerContribute" header="Toplam Sirket Katkı" />
    <Column header="Islemler">
      <template #body="slotProps">
        <div class="flex flex-wrap gap-2">

          <ExcelExport :id="slotProps.data.id" />

          <router-link
            :to="{ name: 'update-salary', params: { id: slotProps.data.id } }"
            class="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 text-sm font-medium"
          >
            Düzenle
          </router-link>

          <button
            type="button"
            class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 text-sm font-medium"
            @click="salaryStore.deleteSalary(slotProps.data.id)"
          >
            Sil
          </button>
        </div>
      </template>
    </Column>
    <template #expansion="slotProps">
      <div class="p-4">
        <h5 class="m-0 text-2xl font-bold">Calisan Maaslar</h5>
        <DataTable :value="slotProps.data.salaryLines">
          <Column header="Personel">
            <template #body="slotProps">
              {{ getEmployeeFullName(slotProps.data.employeeId) }}
            </template>
          </Column>
          <Column field="netSalary" header="Net Maas" />
          <Column field="grossSalary" header="Brut Maas" />
          <Column field="tax" header="Vergi" />
          <Column field="employeeContribute" header="Personel Katkı" />
          <Column field="employerContribute" header="Sirket Katkı" />
        </DataTable>
      </div>
    </template>
  </DataTable>
</template>

<script setup>
import { ref, computed } from "vue";
import { DataTable, Column, Select } from "primevue";
import { FilterMatchMode } from "@primevue/core/api";
import { storeToRefs } from "pinia";
import ExcelExport from "@/components/excel/ExcelExport.vue";

import { useSalaryStore } from "@/stores/salary.store";
import { useEmployeeStore } from "@/stores/employee.store";
import { useCompanyStore } from "@/stores/company.store";

const expandedRows = ref({});
const filters = ref({
  period: { value: null, matchMode: FilterMatchMode.EQUALS },
  companyId: { value: null, matchMode: FilterMatchMode.EQUALS },
});

const salaryStore = useSalaryStore();
const employeeStore = useEmployeeStore();
const companyStore = useCompanyStore();
const { salarySummaries, salaries, uniqueSortedPeriods } = storeToRefs(salaryStore);
const { employees } = storeToRefs(employeeStore);
const { companies } = storeToRefs(companyStore);

await employeeStore.fetchEmployees();
await salaryStore.fetchSalaries();
await companyStore.fetchCompanies();

const onRowExpand = (event) => {};
const onRowCollapse = (event) => {};
const expandAll = () => {
  expandedRows.value = salarySummaries.value.reduce((acc, p) => (acc[p.id] = true) && acc, {});
};
const collapseAll = () => {
  expandedRows.value = null;
};

const getEmployeeFullName = (id) => {
  const employee = employees.value.find((e) => e.id === id);
  return employee ? `${employee.firstName} ${employee.lastName}` : "Bilinmeyen Personel";
};

const uniqueCompanies = computed(() => {
  const ids = [...new Set(salaries.value.map((s) => s.companyId))]; // benzersiz id'ler
  return ids.map((id) => companies.value.find((c) => c.id === id)).filter(Boolean); // null olanları filtrele
});
</script>
