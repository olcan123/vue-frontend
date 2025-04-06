import { acceptHMRUpdate, defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import axiosService from "@/services/api/axios.service";

export const useIsoftStore = defineStore("isoft", () => {
  const router = useRouter();
  const toast = useToast();

  const isoft = ref({});
  const isofts = ref([]);
  const error = ref(null);
  const loading = ref(false);
  const message = ref(null);

  const fetchIsoftByCompanyId = async (companyId) => {
    try {
      loading.value = true;
      const response = await axiosService.get(
        `isoftaccounts/companyid/${companyId}`
      );
      isoft.value = response.data.data;
    } catch (e) {
      error.value = e;
    } finally {
      loading.value = false;
    }
  };

  const fetchIsoft = async (id) => {
    try {
      loading.value = true;
      const response = await axiosService.get(`isoftaccounts/id/${id}`);
      isoft.value = response.data.data;
    } catch (e) {
      error.value = e;
    } finally {
      loading.value = false;
    }
  };

  const createIsoft = async (data) => {
    try {
      loading.value = true;
      const response = await axiosService.post("isoftaccounts", data);
      message.value = response.data.message;
      router.push({ name: "table-isofts" });
      toast.success(message.value);
    } catch (e) {
      error.value = e;
      console.error(e.request.responseText);
    } finally {
      loading.value = false;
    }
  };

  const updateIsoft = async (id, data) => {
    try {
      loading.value = true;
      const response = await axiosService.put(`isoftaccounts/id/${id}`, data);
      message.value = response.data.message;
      router.push({ name: "table-isofts" });
      toast.success(message.value);
    } catch (e) {
      error.value = e;
      console.error(e.response.data);
    } finally {
      loading.value = false;
    }
  };

  const deleteIsoft = async (id) => {
    try {
      loading.value = true;
      const response = await axiosService.delete(`isoftaccounts/id/${id}`);
      isofts.value = isofts.value.filter((isoft) => isoft.id !== id);
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
    isoft,
    isofts,
    error,
    loading,
    message,
    fetchIsoftByCompanyId,
    fetchIsoft,
    createIsoft,
    updateIsoft,
    deleteIsoft,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useIsoftStore, import.meta.hot));
}
