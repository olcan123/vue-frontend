<template>
  <div class="p-4">
    <button @click="exportFullTable" class="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
      Excel'e Aktar (Tüm Tablo)
    </button>

    <div class="overflow-auto rounded-xl shadow">
      <table ref="exportTable" class="min-w-full border border-gray-300 text-sm">
        <thead>
          <!-- Gerçek başlıklar -->
          <tr class="bg-gray-100 text-gray-700 font-semibold text-xs">
            <th class="px-4 py-2 border">Emri</th>
            <th class="px-4 py-2 border">Mbiemri</th>
            <th class="px-4 py-2 border">Numri Individual i punëtorit</th>
            <th class="px-4 py-2 border">Bruto paga për muaj</th>
            <th class="px-4 py-2 border">Kontributi pensional (Punonjës)</th>
            <th class="px-4 py-2 border">Kontributi pensional (Punëdhënës)</th>
            <th class="px-4 py-2 border">Suplementar (Punonjës)</th>
            <th class="px-4 py-2 border">Suplementar (Punëdhënës)</th>
            <th class="px-4 py-2 border">Punë Primare</th>
            <th class="px-4 py-2 border">Përfshihen Kontributet</th>
            <th class="px-4 py-2 border">Tatimi në Paga</th>
          </tr>
          <!-- Teknik başlıklar -->
          <tr class="bg-gray-50 text-gray-500 text-xs uppercase">
            <th class="px-2 py-1 border">a</th>
            <th class="px-2 py-1 border">b</th>
            <th class="px-2 py-1 border">c</th>
            <th class="px-2 py-1 border">d</th>
            <th class="px-2 py-1 border">e=(d*5%)</th>
            <th class="px-2 py-1 border">f=(d*5%)</th>
            <th class="px-2 py-1 border">g</th>
            <th class="px-2 py-1 border">h</th>
            <th class="px-2 py-1 border">i</th>
            <th class="px-2 py-1 border">j</th>
            <th class="px-2 py-1 border">k</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="line in enrichedSalaryLines" :key="line.employeeId" class="hover:bg-gray-50">
            <td class="px-4 py-2 border">{{ line.firstName }}</td>
            <td class="px-4 py-2 border">{{ line.lastName }}</td>
            <td class="px-4 py-2 border">{{ line.nationalIdentity }}</td>
            <td class="px-4 py-2 border">{{ line.grossSalary }}</td>
            <td class="px-4 py-2 border">{{ line.employeeContribute }}</td>
            <td class="px-4 py-2 border">{{ line.employerContribute }}</td>
            <td class="px-4 py-2 border">{{ line.suppEmpContrib }}</td>
            <td class="px-4 py-2 border">{{ line.suppEmprContrib }}</td>
            <td class="px-4 py-2 border">{{ line.isPrimary ? "PO" : "JO" }}</td>
            <td class="px-4 py-2 border">{{ line.contribIncluded ? "PO" : "JO" }}</td>
            <td class="px-4 py-2 border">{{ line.taxApplied ? "PO" : "JO" }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";

import { useSalaryStore } from "@/stores/salary.store";
import { useEmployeeStore } from "@/stores/employee.store";
import { useCompanyStore } from "@/stores/company.store";

const { id } = useRoute().params;

// Store'ları çekiyoruz
const salaryStore = useSalaryStore();
const employeeStore = useEmployeeStore();
const companyStore = useCompanyStore();

const { employees } = storeToRefs(employeeStore);
const { companies } = storeToRefs(companyStore);
const { salary } = storeToRefs(salaryStore);

// Verileri yüklüyoruz
await employeeStore.fetchEmployees();
await companyStore.fetchCompanies();
await salaryStore.fetchSalary(id);

// Hesaplanmış veri: çalışan bilgileriyle zenginleştirilmiş satırlar
const enrichedSalaryLines = computed(() => {
  if (!salary.value || !Array.isArray(salary.value.salaryLines)) return [];

  return salary.value.salaryLines.map((line) => {
    const employee = employees.value.find((emp) => emp.id === line.employeeId);
    return {
      ...line,
      firstName: employee?.firstName || "N/A",
      lastName: employee?.lastName || "N/A",
      nationalIdentity: employee?.nationalIdentity || "N/A",
    };
  });
});

const exportTable = ref(null);

const exportFullTable = () => {
  const tableEl = exportTable.value;
  if (!tableEl) return;

  // 1. HTML tablosunu Excel Sheet'e çevir
  const worksheet = XLSX.utils.table_to_sheet(tableEl);

  // 2. Yeni Excel dosyası (workbook) oluştur
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // 3. Tüm hücreleri gezerek stil uygula
  const range = XLSX.utils.decode_range(worksheet["!ref"]);

  for (let R = range.s.r; R <= range.e.r; ++R) {
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const cellRef = XLSX.utils.encode_cell({ r: R, c: C });
      const cell = worksheet[cellRef];
      if (!cell) continue;

      // Hücre tipi ve biçimi: metin
      cell.t = "s";
      cell.z = "@";

      // Stil uygula: sarı arka plan + bold yazı + kenarlık
      cell.s = {
        font: { bold: true },
        alignment: { horizontal: "center", vertical: "center" },
      };
    }
  }

  // 4. Excel dosyasını oluştur
  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
    cellStyles: true,
  });

  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  });

  const companyName = companies.value.find((c) => c.id === salary.value.companyId)?.name || "Unknown";
  const fileName = `ATK Mostra Puntor ${salary.value.period} ${companyName}.xlsx`;

  // 5. Dosyayı indir
  saveAs(blob, fileName);
};
</script>
