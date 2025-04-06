<template>
  <header class="bg-white dark:bg-gray-900 shadow-md">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center py-4">
        <!-- LOGO -->
        <router-link to="/" class="flex flex-col text-xl font-bold text-gray-800 dark:text-white leading-tight">
          <span>Emp-Calc</span>
          <span class="text-sm font-normal text-gray-500 dark:text-gray-400">by Pin-Tech</span>
        </router-link>

        <!-- ORTA: Navigasyon -->
        <nav class="hidden md:flex space-x-6">
          <router-link
            to="/"
            exact-active-class="text-blue-600 dark:text-blue-400 font-semibold"
            class="text-gray-600 dark:text-gray-300 hover:text-blue-500"
          >Anasayfa</router-link>

          <router-link
            to="/companies"
            active-class="text-blue-600 dark:text-blue-400 font-semibold"
            class="text-gray-600 dark:text-gray-300 hover:text-blue-500"
          >Şirketler</router-link>

          <router-link
            to="/employees"
            active-class="text-blue-600 dark:text-blue-400 font-semibold"
            class="text-gray-600 dark:text-gray-300 hover:text-blue-500"
          >Personel</router-link>

          <router-link
            to="/salaries"
            active-class="text-blue-600 dark:text-blue-400 font-semibold"
            class="text-gray-600 dark:text-gray-300 hover:text-blue-500"
          >Maaslar</router-link>
        </nav>

        <!-- SAĞDA: Auth İşlemleri -->
        <div class="hidden md:flex items-center space-x-4">
          <template v-if="isAuthenticated">
            <button class="text-gray-600 dark:text-gray-300 hover:text-blue-500">Profilim</button>
            <button class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">Çıkış Yap</button>
          </template>
          <template v-else>
            <!--
            <router-link to="/login" class="text-gray-600 dark:text-gray-300 hover:text-blue-500">Giriş Yap</router-link>
            <router-link to="/register" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Kayıt Ol</router-link>
            -->
          </template>
        </div>

        <!-- Mobil Menü Butonu -->
        <button @click="isOpen = !isOpen" class="md:hidden text-gray-600 dark:text-gray-300 focus:outline-none">
          <svg v-if="!isOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- MOBİL MENÜ -->
      <nav v-if="isOpen" class="md:hidden bg-gray-100 dark:bg-gray-800 p-4 space-y-2">
        <router-link
          to="/"
          exact-active-class="text-blue-600 dark:text-blue-400 font-semibold"
          class="block text-gray-600 dark:text-gray-300 hover:text-blue-500"
        >Anasayfa</router-link>

        <router-link
          to="/companies"
          active-class="text-blue-600 dark:text-blue-400 font-semibold"
          class="block text-gray-600 dark:text-gray-300 hover:text-blue-500"
        >Şirketler</router-link>

        <router-link
          to="/employees"
          active-class="text-blue-600 dark:text-blue-400 font-semibold"
          class="block text-gray-600 dark:text-gray-300 hover:text-blue-500"
        >Personel</router-link>

        <router-link
          to="/salaries"
          active-class="text-blue-600 dark:text-blue-400 font-semibold"
          class="block text-gray-600 dark:text-gray-300 hover:text-blue-500"
        >Maaslar</router-link>

        <template v-if="isAuthenticated">
          <button class="block text-gray-600 dark:text-gray-300 hover:text-blue-500">Profilim</button>
          <button class="block bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">Çıkış Yap</button>
        </template>
        <template v-else>
          <!--
          <router-link to="/login" class="block text-gray-600 dark:text-gray-300 hover:text-blue-500">Giriş Yap</router-link>
          <router-link to="/register" class="block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Kayıt Ol</router-link>
          -->
        </template>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue";

const isAuthenticated = ref(false);
const isOpen = ref(false);
</script>
