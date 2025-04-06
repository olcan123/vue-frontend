<template>
  <div class="bg-white dark:bg-gray-800">
    <h2 class="text-xl font-semibold text-gray-700 dark:text-white mb-4">Genel Bilgiler</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Şirket Seçimi -->
      <select-field
        fieldName="salaryHead.companyId"
        label-name="Şirket"
        :options="optionCompanies"
        @on-change="handleChange"
      />

      <!-- Dönem -->
      <date-field fieldName="salaryHead.period" label-name="Dönem" dateType="month" />

      <!-- Not -->
      <textarea-field fieldName="salaryHead.note" label-name="Not" />
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";

import { useCompanyStore } from "@/stores/company.store";
import { useEmployeeStore } from "@/stores/employee.store";
import SelectField from "../form/SelectField.vue";
import DateField from "../form/DateField.vue";
import TextareaField from "../form/TextareaField.vue";

const companyStore = useCompanyStore();
const employeeStore = useEmployeeStore();
const { optionCompanies } = storeToRefs(companyStore);

const handleChange = (value) => {
  employeeStore.fetchEmployeesByCompany(value);
};
</script>

<style></style>
