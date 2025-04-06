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
    <TextField label-name="Şirket İsmi" field-name="name" />
    <TextField label-name="Şirket Ticari Adı" field-name="tradeName" />
    <TextField label-name="UID Numarası" field-name="uidNumber" />
    <TextField label-name="Vergi Numarası" field-name="vatNumber" />
    <TextField label-name="address" field-name="address" />
    <TextField label-name="Sehir" field-name="city" />
    <TextField label-name="Ulkeler" field-name="country" />
    <TextField label-name="Sirket Sahibi" field-name="representativeName" />
    <TextField label-name="Telefon" field-name="phone" />
    <TextField label-name="E-posta" field-name="email" />
  </form>
</template>

<script setup>
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import zod from "zod";

import { useCompanyStore } from "@/stores/company.store";
import TextField from "@/components/form/TextField.vue";

const companyStore = useCompanyStore();

const validationSchema = toTypedSchema(
  zod.object({
    name: zod.string().min(3, "Şirket ismi en az 3 karakter olmalıdır"),
  })
);

// Vee-Validate Form Yönetimi
const { handleSubmit, errors } = useForm({
  //  validationSchema,
  initialValues: {
    name: "",
    tradeName: "",
    uidNumber: "",
    vatNumber: "",
    address: "",
    city: "",
    country: "",
    representativeName: "",
    phone: "",
    email: "",
  },
});

// Form Gönderme İşlemi
const onSubmit = handleSubmit(async (values) => {
  await companyStore.createCompany(values);
});
</script>
