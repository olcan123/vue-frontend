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
import SalaryHeadForm from "@/components/views/SalaryHeadForm.vue";
import SalaryLineForm from "@/components/views/SalaryLineForm.vue";

import { useCompanyStore } from "@/stores/company.store";
import { useSalaryStore } from "@/stores/salary.store";

const companyStore = useCompanyStore();
const salaryStore = useSalaryStore();

await companyStore.fetchCompanies();

const { handleSubmit, errors } = useForm({
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

const onSubmit = handleSubmit(async (values) => {
  try {
    // salaryLines içinden geçerli olmayanları filtrele
    const filteredLines = values.salaryLines.filter(line =>
      line.employeeId !== 0 &&
      line.netSalary !== 0 &&
      line.grossSalary !== 0
    );

    // Yeni değerleri oluştur
    const cleanedValues = {
      ...values,
      salaryLines: filteredLines
    };

    await salaryStore.createSalary(cleanedValues);
  } catch (e) {
    console.log(e);
  }
});
</script>
