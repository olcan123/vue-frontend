<template>
  <div class="flex justify-between items-center border-b pb-4 mb-6">
    <h2 class="text-2xl font-bold text-gray-800">Yeni Calisan Ekle</h2>
    <button
      @click.prevent="onSubmit"
      :disabled="Object.keys(errors).length > 0"
      class="px-6 py-3 font-semibold rounded-lg shadow-md transition-all duration-300 active:scale-95 text-white bg-blue-500 hover:bg-blue-600 disabled:bg-red-300 disabled:opacity-70 disabled:cursor-not-allowed"
    >
      Kaydet
    </button>
  </div>

  <!-- Form -->
  <form class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <SelectField label-name="Sirket" field-name="companyId" :options="optionCompanies" />
    <TextField label-name="Ad" field-name="firstName" />
    <TextField label-name="Soyad" field-name="lastName" />
    <TextField label-name="Kimlik Numarası" field-name="nationalIdentity" />
    <TextField label-name="Isoft Numarası" field-name="isoftId" />
    <TextField label-name="E-posta" field-name="email" />
    <TextField label-name="Telefon" field-name="phone" />
    <TextField label-name="Adres" field-name="address" />
    <TextField label-name="Sehir" field-name="city" />
    <TextField label-name="Ulkeler" field-name="country" />
    <SelectField label-name="Calisan Tipi" field-name="employmentType" :options="employementTypes" />
    <CheckboxField label-name="Aktif" field-name="isActive" />
  </form>
</template>

<script setup>
import { computed } from "vue";
import { useForm } from "vee-validate";
import { storeToRefs } from "pinia";
import { toTypedSchema } from "@vee-validate/zod";
import zod from "zod";

import { useCompanyStore } from "@/stores/company.store";
import { useEmployeeStore } from "@/stores/employee.store";
import TextField from "@/components/form/TextField.vue";
import SelectField from "@/components/form/SelectField.vue";
import CheckboxField from "@/components/form/CheckboxField.vue";

const companyStore = useCompanyStore();
const employeeStore = useEmployeeStore();

const { optionCompanies } = storeToRefs(companyStore);
const { employementTypes } = storeToRefs(employeeStore);
await companyStore.fetchCompanies();

const { handleSubmit, errors } = useForm({
  initialValues: {
    firstName: "",
    lastName: "",
    companyId: "",
    nationalIdentity: "",
    isoftId: "",
    educationLevel: "",
    email: "",
    phone: "",
    employmentType: "",
    address: "",
    city: "",
    country: "",
    isActive: true,
  },
});

const onSubmit = handleSubmit(async (values) => {
  await employeeStore.createEmployee(values);
});
</script>

<style></style>
