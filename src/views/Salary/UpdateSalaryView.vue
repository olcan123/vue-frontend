<template>
  <h1 class="text-3xl font-bold text-gray-800 dark:text-white">Maaş Bordrosu Oluştur</h1>

  <!-- Salary Head -->
  <form @submit.prevent="onSubmit">
    <SalaryHeadForm />

    <!-- Salary Lines Table -->
    <SalaryLineForm />
  </form>

  <!-- Submit Button -->
</template>

<script setup>
import { useForm } from "vee-validate";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import SalaryHeadForm from "@/components/views/SalaryHeadForm.vue";
import SalaryLineForm from "@/components/views/SalaryLineForm.vue";

import { useCompanyStore } from "@/stores/company.store";
import { useEmployeeStore } from "@/stores/employee.store";
import { useSalaryStore } from "@/stores/salary.store";

const route = useRoute();
const { id } = route.params;
const companyStore = useCompanyStore();
const employeeStore = useEmployeeStore();
const salaryStore = useSalaryStore();

await companyStore.fetchCompanies();
await employeeStore.fetchEmployees();
await salaryStore.fetchSalary(id);

const { salary } = storeToRefs(salaryStore);

const { handleSubmit, setValues } = useForm({
  initialValues: {
    salaryHead: {
      companyId: 0,
      period: "",
      note: "",
    },
    salaryLines: [
      {
        employeeId: 0,
        netSalary: 0,
        grossSalary: 0,
        tax: 0,
        employeeContribute: 0,
        employerContribute: 0,
        suppEmpContrib: 0,
        suppEmprContrib: 0,
        isPrimary: true,
        contribIncluded: true,
        taxApplied: true,
      },
    ],
  },
});

const { salaryLines, ...salaryHead } = salary.value;
setValues({
  salaryHead: salaryHead,
  salaryLines: salaryLines,
});

const onSubmit = handleSubmit(async (values) => {
  // ID'yi kaldır
  delete values.salaryHead.id;

  // Boş satırları filtrele
  const filteredLines = values.salaryLines.filter(line =>
    line.employeeId !== 0 &&
    line.netSalary !== 0 &&
    line.grossSalary !== 0
  );

  // Yeni temizlenmiş değerler
  const cleanedValues = {
    ...values,
    salaryLines: filteredLines,
  };

  try {
    await salaryStore.updateSalary(id, cleanedValues);
  } catch (e) {
    console.log(e);
  }
});

</script>
