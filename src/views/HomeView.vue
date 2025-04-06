<template>
  <div class="dark:bg-gray-900 flex items-center justify-center">
    <div class="max-w-4xl w-full px-6 py-16 text-center">
      <!-- Başlık -->
      <h1 class="text-4xl sm:text-5xl font-bold text-gray-800 dark:text-white mb-6">
        Şirket Yönetim Sistemine Hoş Geldiniz
      </h1>

      <!-- Açıklama -->
      <p class="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Şirket bilgilerinizi kolayca yönetin, beyanname türlerini takip edin ve sorumlu kişileri kontrol altında tutun.
      </p>

      <!-- Butonlar -->
      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <router-link
          to="/companies"
          class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md font-semibold transition"
        >
          Şirketleri Gör
        </router-link>
        <router-link
          to="/companies/create"
          class="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md font-semibold transition"
        >
          Yeni Şirket Ekle
        </router-link>
        <!-- <router-link
          to="/login"
          class="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-3 rounded-md font-semibold transition dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
        >
          Giriş Yap
        </router-link> -->
      </div>
    </div>
  </div>
</template>


<script setup></script>