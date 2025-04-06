<template>
  <div class="flex justify-between items-center border-b pb-4 mb-6">
    <h2 class="text-2xl font-bold text-gray-800">Yeni Şirket Ekle</h2>
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
    <!-- <TextField label-name="Sirket" field-name="companyId" /> -->
    <TextField label-name="Calisan" field-name="employeeAccount" />
    <TextField label-name="Vergi" field-name="taxAccount" />
    <TextField label-name="Kontribut" field-name="contributeAccount" />
    <TextField label-name="Brut Maas" field-name="grossAccount" />
    <TextField label-name="Isveren Kontribut" field-name="employerContributeAccount" />
  </form>
</template>

<script setup>
import { useForm } from "vee-validate";
import { useRoute } from "vue-router";

import { useIsoftStore } from "@/stores/isoft.store";
import TextField from "@/components/form/TextField.vue";

const id = Number(useRoute().params.id);
const isoftStore = useIsoftStore();

const { handleSubmit, errors } = useForm({
  initialValues: {
    companyId: id,
    employeeAccount: "",
    taxAccount: "",
    contributeAccount: "",
    grossAccount: "",
    employerContributeAccount: "",
  },
});

const onSubmit = handleSubmit(async (values) => {
  await isoftStore.createIsoft(values);
});
</script>

<style></style>
