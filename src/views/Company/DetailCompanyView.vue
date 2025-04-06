<template>
  <!-- Sayfa Başlığı -->
  <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-6">Şirket Detayları</h1>

  <!-- Kart / Panel -->
  <div class="bg-white dark:bg-gray-800">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Sol kolon -->
      <div>
        <DetailItem label="Şirket Adı" :value="company.name" />
        <DetailItem label="Ticari Ünvan" :value="company.tradeName" />
        <DetailItem label="UID Numarası" :value="company.uidNumber" />
        <DetailItem label="Vergi Numarası" :value="company.vatNumber" />
        <DetailItem label="Adres" :value="company.address" />
      </div>

      <!-- Sağ kolon -->
      <div>
        <DetailItem label="Şehir" :value="company.city" />
        <DetailItem label="Ülke" :value="company.country" />
        <DetailItem label="Yetkili Kişi" :value="company.representativeName" />
        <DetailItem label="Telefon" :value="company.phone" />
        <DetailItem label="E-posta" :value="company.email" />
      </div>
    </div>

    <!-- Butonlar -->
    <div class="mt-8 flex justify-end gap-4">
      <router-link
        :to="{ name: 'table-companies' }"
        class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 text-sm font-medium"
      >
        ← Tüm Şirketler
      </router-link>
      <router-link
        :to="{ name: 'update-company', params: { id: id } }"
        class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 text-sm font-medium"
        >Düzenle</router-link
      >
    </div>
  </div>
</template>

<script setup>
import DetailItem from "@/components/detail/DetailItem.vue";
import { storeToRefs } from "pinia";
import { useCompanyStore } from "@/stores/company.store";
import { useRoute } from "vue-router";
import router from "@/router";

const { id } = useRoute().params;

const companyStore = useCompanyStore();
const { company } = storeToRefs(companyStore);
await companyStore.fetchCompany(id);
</script>
