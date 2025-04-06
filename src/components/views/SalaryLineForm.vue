<template>
  <div class="text-right">
    <button
      type="button"
      @click="
        push({
          employeeId: 0,
          netSalary: 0,
          grossSalary: 0,
          tax: 0,
          employeeContribute: 0,
          employerContribute: 0,
          isPrimary: true,
          contribIncluded: true,
          taxApplied: true,
        })
      "
      class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-all duration-200"
    >
      Satır Ekle
    </button>
    <button
      type="submit"
      :disabled="salaryLines.length === 0"
      :title="salaryLines.length === 0 ? 'En az bir satır eklemelisiniz' : ''"
      :class="[
        'px-6 py-2 rounded-md text-white transition-all duration-200',
        salaryLines.length > 0
          ? 'bg-green-600 hover:bg-green-700 cursor-pointer'
          : 'bg-gray-400 hover:bg-gray-300 opacity-50 cursor-not-allowed',
      ]"
    >
      {{ id ? "Güncelle" : "Ekle" }}
    </button>
  </div>
  <div class="overflow-x-auto pt-12">
    <table class="min-w-full table-auto">
      <thead class="bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
        <tr class="text-base font-semibold">
          <th class="p-2 text-left"></th>
          <th class="p-2 text-left">Calisan</th>
          <th class="p-2 text-left">Net</th>
          <th class="p-2 text-left">Brüt</th>
          <th class="p-2 text-left">Vergi</th>
          <th class="p-2 text-left">Ç. Kontr.</th>
          <th class="p-2 text-left">İ. Kontr.</th>
          <th class="p-2 text-left">Ek Çalisan</th>
          <th class="p-2 text-left">Ek İşveren</th>
          <th class="p-2 text-center">Primary</th>
          <th class="p-2 text-center">Katkı Dahil</th>
          <th class="p-2 text-center">Vergi Dahil</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="(line, index) in salaryLines"
          :key="index"
          class="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <td class="p-2">
            <button
              type="button"
              class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 text-sm font-medium"
              @click="removeLine(line.value.id, index)"
            >
              Sil
            </button>
          </td>
          <!-- Select Field -->
          <td class="p-2">
            <select
              v-model="line.value.employeeId"
              class="w-[170px] px-3 py-2 border border-gray-300 rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            >
              <option value="" disabled selected>Çalışan Seçin</option>
              <option v-for="employee in employees" :key="employee.id" :value="employee.id">
                {{ employee.firstName + " " + employee.lastName }}
              </option>
            </select>
          </td>

          <td class="p-2">
            <input
              v-model="line.value.netSalary"
              @input="netSalaryCalculation(line.value)"
              step="any"
              type="number"
              class="w-full px-3 py-2 border border-gray-300 rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </td>
          <td class="p-2">
            <input
              v-model="line.value.grossSalary"
              @input="grossSalaryCalculation(line.value)"
              step="any"
              type="number"
              class="w-full px-3 py-2 border border-gray-300 rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </td>
          <td class="p-2">
            <input
              v-model="line.value.tax"
              type="number"
              step="any"
              readonly
              title="Bu alan otomatik hesaplanır"
              class="w-full px-3 py-2 border border-gray-300 rounded-md text-xs bg-gray-100 text-gray-600 cursor-not-allowed focus:outline-none dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600"
            />
          </td>
          <td class="p-2">
            <input
              v-model="line.value.employeeContribute"
              type="number"
              step="any"
              readonly
              title="Bu alan otomatik hesaplanır"
              class="w-full px-3 py-2 border border-gray-300 rounded-md text-xs bg-gray-100 text-gray-600 cursor-not-allowed focus:outline-none dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600"
            />
          </td>
          <td class="p-2">
            <input
              v-model="line.value.employerContribute"
              type="number"
              step="any"
              readonly
              title="Bu alan otomatik hesaplanır"
              class="w-full px-3 py-2 border border-gray-300 rounded-md text-xs bg-gray-100 text-gray-600 cursor-not-allowed focus:outline-none dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600"
            />
          </td>

          <td class="p-2">
            <input
              v-model="line.value.suppEmpContrib"
              type="number"
              step="any"
              class="w-full px-3 py-2 border border-gray-300 rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </td>
          <td class="p-2">
            <input
              v-model="line.value.suppEmprContrib"
              type="number"
              step="any"
              class="w-full px-3 py-2 border border-gray-300 rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </td>

          <!-- Checkboxes -->
          <td class="p-2 text-center">
            <input
              type="checkbox"
              v-model="line.value.isPrimary"
              class="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            />
          </td>
          <td class="p-2 text-center">
            <input
              type="checkbox"
              v-model="line.value.contribIncluded"
              class="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            />
          </td>
          <td class="p-2 text-center">
            <input
              type="checkbox"
              v-model="line.value.taxApplied"
              class="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { useFieldArray } from "vee-validate";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";

import { useEmployeeStore } from "@/stores/employee.store";
import { useSalaryStore } from "@/stores/salary.store";
import { useSalaryCalculator } from "@/composables/useSalaryCalculator";

const { id } = useRoute().params;

const employeeStore = useEmployeeStore();
const salaryStore = useSalaryStore();
const { employees } = storeToRefs(employeeStore);

const { fields: salaryLines, remove, push } = useFieldArray("salaryLines");

const { grossSalaryCalculation, netSalaryCalculation } = useSalaryCalculator();

const removeLine = async (id, idx) => {
  if (id > 0) {
    await salaryStore.deleteSalaryLine(id);
  }
  remove(idx);
};
</script>
