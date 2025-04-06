<template>
  <div class="p-4">
    <h2 class="text-xl font-bold mb-4">ISoft Sample</h2>

    <div class="overflow-x-auto shadow ring-1 ring-gray-200 rounded-md">
      <table class="min-w-full divide-y divide-gray-200 text-sm text-left">
        <thead class="bg-gray-100 text-gray-700">
          <tr>
            <th class="px-4 py-2">Data</th>
            <th class="px-4 py-2">Konto</th>
            <th class="px-4 py-2">KontoPershkrimi</th>
            <th class="px-4 py-2">KlientID</th>
            <th class="px-4 py-2">KlientEmri</th>
            <th class="px-4 py-2">NrDok</th>
            <th class="px-4 py-2">Pershkrimi</th>
            <th class="px-4 py-2">DEBI</th>
            <th class="px-4 py-2">KREDI</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 bg-white">
          <tr v-for="(line, index) in lines" :key="index">
            <td class="px-4 py-2">{{ line.date }}</td>
            <td class="px-4 py-2">{{ line.employeeAccount }}</td>
            <td class="px-4 py-2">{{ line.accountName ?? "" }}</td>
            <td class="px-4 py-2">{{ line.isoftId ?? "" }}</td>
            <td class="px-4 py-2">{{ line.name ?? "" }}</td>
            <td class="px-4 py-2">{{ line.nrDoc }}</td>
            <td class="px-4 py-2">{{ line.description }}</td>
            <td class="px-4 py-2">{{ parseFloat(line.debit).toFixed(2) }}</td>
            <td class="px-4 py-2">{{ parseFloat(line.credit).toFixed(2) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="mt-6">
      <button @click="exportToExcel" class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md">
        Excel (.xls) Çıktısı Al
      </button>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { useIsoftStore } from "@/stores/isoft.store";
import { useEmployeeStore } from "@/stores/employee.store";
import { useSalaryStore } from "@/stores/salary.store";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

// Route param
const { id } = useRoute().params;

// Stores
const isoftStore = useIsoftStore();
const employeeStore = useEmployeeStore();
const salaryStore = useSalaryStore();

// Refs
const { employees } = storeToRefs(employeeStore);
const { salary } = storeToRefs(salaryStore);
const { isoft } = storeToRefs(isoftStore);

// Data fetch
await employeeStore.fetchEmployees();
await salaryStore.fetchSalary(id);
await isoftStore.fetchIsoftByCompanyId(salary.value.companyId);

// 🔧 Yardımcı: "2025-03" → "03-2025"
function formatPeriodToMMYYYY(period) {
  const [year, month] = period.split("-");
  return `${month}-${year}`;
}

// 🔧 Tarih formatı: "2025-03" → "31.03.2025"
function formatPeriodToEndDate(period) {
  const [year, month] = period.split("-").map(Number);
  const endDate = new Date(year, month, 0);
  const day = String(endDate.getDate()).padStart(2, "0");
  const mm = String(endDate.getMonth() + 1).padStart(2, "0");
  const yyyy = endDate.getFullYear();
  return `${day}.${mm}.${yyyy}`;
}

// Satır oluşturucu
function generateAccountingLines(salary, employees, isoft) {
  const date = formatPeriodToEndDate(salary.period);
  const nrDoc = formatPeriodToMMYYYY(salary.period);
  const lines = [];

  let sumTax = 0;
  let sumContribute = 0;
  let sumGross = 0;
  let sumEmployerContribute = 0;

  salary.salaryLines.forEach((line) => {
    const employee = employees.find((emp) => emp.id === line.employeeId);

    const netSalary = parseFloat(line.netSalary || 0);
    const tax = parseFloat(line.tax || 0);
    const employeeContribute = parseFloat(line.employeeContribute || 0);
    const grossSalary = parseFloat(line.grossSalary || 0);
    const employerContribute = parseFloat(line.employerContribute || 0);

    lines.push({
      date,
      employeeAccount: isoft.employeeAccount || "505000",
      accountName: null,
      isoftId: employee?.isoftId ?? null,
      name: employee ? `${employee.firstName} ${employee.lastName}` : null,
      nrDoc,
      description: "LLOG PAGA",
      debit: 0,
      credit: netSalary.toFixed(2),
    });

    sumTax += tax;
    sumContribute += employeeContribute * 2;
    sumGross += grossSalary;
    sumEmployerContribute += employerContribute;
  });

  // Toplamlar
  lines.push({
    date,
    employeeAccount: isoft.taxAccount || "506300",
    accountName: null,
    isoftId: null,
    name: null,
    nrDoc,
    description: "LLOG PAGA",
    debit: 0,
    credit: sumTax.toFixed(2),
  });

  lines.push({
    date,
    employeeAccount: isoft.contributeAccount || "506600",
    accountName: null,
    isoftId: null,
    name: null,
    nrDoc,
    description: "LLOG PAGA",
    debit: 0,
    credit: sumContribute.toFixed(2),
  });

  // sumGross ➜ DEBI tarafına yazılmalı
  lines.push({
    date,
    employeeAccount: "740000",
    accountName: null,
    isoftId: null,
    name: null,
    nrDoc,
    description: "LLOG PAGA",
    debit: sumGross.toFixed(2),
    credit: 0,
  });

  // sumEmployerContribute ➜ DEBI tarafına yazılmalı
  lines.push({
    date,
    employeeAccount: "752000",
    accountName: null,
    isoftId: null,
    name: null,
    nrDoc,
    description: "LLOG PAGA",
    debit: sumEmployerContribute.toFixed(2),
    credit: 0,
  });

  return lines;
}

const lines = generateAccountingLines(salary.value, employees.value, isoft.value);

// Excel export (.xls)
function exportToExcel() {
  const data = lines.map((line) => ({
    Data: line.date,
    Konto: line.employeeAccount,
    KontoPershkrimi: line.accountName ?? null,
    KlientID: line.isoftId ?? null,
    KlientEmri: line.name ?? null,
    NrDok: line.nrDoc,
    Pershkrimi: line.description,
    DEBI: parseFloat(line.debit).toFixed(2),
    KREDI: parseFloat(line.credit).toFixed(2),
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const blob = new Blob([excelBuffer], {
    type: "application/vnd.ms-excel",
  });

  saveAs(blob, "export.xls");
}
</script>

<style scoped>
table th,
table td {
  white-space: nowrap;
}
</style>
