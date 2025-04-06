import { defineStore, acceptHMRUpdate } from "pinia";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import axiosService from "@/services/api/axios.service";

export const useCompanyStore = defineStore("company", () => {
  const router = useRouter();
  const toast = useToast();

  const company = ref({});
  const companies = ref([]);
  const error = ref(null);
  const loading = ref(false);
  const message = ref(null);

  const optionCompanies = computed(() => {
    return companies.value.map((company) => ({
      label: company.name,
      value: company.id,
    }));
  });

  const fetchCompanies = async () => {
    try {
      loading.value = true;
      const response = await axiosService.get("companies");
      companies.value = response.data.data;
    } catch (e) {
      error.value = e;
    } finally {
      loading.value = false;
    }
  };

  const fetchCompany = async (id) => {
    try {
      loading.value = true;
      const response = await axiosService.get(`companies/id/${id}`);
      company.value = response.data.data;
    } catch (e) {
      error.value = e;
    } finally {
      loading.value = false;
    }
  };

  const createCompany = async (data) => {
    try {
      loading.value = true;
      const response = await axiosService.post("companies", data);
      message.value = response.data.message;
      router.push({ name: "table-companies" });
      toast.success(message.value);
    } catch (e) {
      error.value = e;
      console.error(e.request.responseText);
    } finally {
      loading.value = false;
    }
  };

  const deleteCompany = async (id) => {
    try {
      loading.value = true;
      const response = await axiosService.delete(`companies/id/${id}`);
      companies.value = companies.value.filter((company) => company.id !== id);
      message.value = response.data.message;
      router.push({ name: "table-companies" });
      toast.success(message.value);
    } catch (e) {
      error.value = e;
      console.error(e.response.data);
    } finally {
      loading.value = false;
    }
  };

  const updateCompany = async (id, data) => {
    try {
      loading.value = true;
      const response = await axiosService.put(`companies/id/${id}`, data);
      message.value = response.data.message;
      router.push({ name: "table-companies" });
      toast.success(message.value);
    } catch (e) {
      error.value = e;
      console.error(e.response.data);
    } finally {
      loading.value = false;
    }
  };

  return {
    company,
    companies,
    error,
    loading,
    message,
    optionCompanies,
    fetchCompanies,
    fetchCompany,
    createCompany,
    deleteCompany,
    updateCompany,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCompanyStore, import.meta.hot));
}
