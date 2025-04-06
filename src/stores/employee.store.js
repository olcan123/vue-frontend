import { defineStore, acceptHMRUpdate } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import axiosService from "@/services/api/axios.service";

export const useEmployeeStore = defineStore("employee", () => {
  const router = useRouter();
  const toast = useToast();

  const employee = ref({});
  const employees = ref([]);
  const error = ref(null);
  const loading = ref(false);
  const message = ref(null);

  const employementTypes = ref([
    {
      value: "FullTime",
      label: "Full Time",
    },
    {
      value: "PartTime",
      label: "Part Time",
    },
    { value: "Contractor", label: "Contractor" },
  ]);

  const fetchEmployees = async () => {
    try {
      loading.value = true;
      const response = await axiosService.get("employees");
      employees.value = response.data.data;
    } catch (e) {
      error.value = e;
    } finally {
      loading.value = false;
    }
  };

  const fetchEmployee = async (id) => {
    try {
      loading.value = true;
      const response = await axiosService.get(`employees/id/${id}`);
      employee.value = response.data.data;
    } catch (e) {
      error.value = e;
    } finally {
      loading.value = false;
    }
  };

  const fetchEmployeesByCompany = async (id) => {
    try {
      loading.value = true;
      const response = await axiosService.get(`employees/companyid/${id}`);
      employees.value = response.data.data;
    } catch (e) {
      error.value = e;
    } finally {
      loading.value = false;
    }
  };

  const createEmployee = async (data) => {
    try {
      loading.value = true;
      const response = await axiosService.post("employees", data);
      message.value = response.data.message;
      router.push({ name: "table-employees" });
      toast.success(message.value);
    } catch (e) {
      error.value = e;
      console.error(e);
    } finally {
      loading.value = false;
    }
  };

  const deleteEmployee = async (id) => {
    try {
      loading.value = true;
      const response = await axiosService.delete(`employees/id/${id}`);
      employees.value = employees.value.filter(
        (employee) => employee.id !== id
      );
      message.value = response.data.message;
      router.push({ name: "table-employees" });
      toast.success(message.value);
    } catch (e) {
      error.value = e;
      //console.error(e.response.data);
      console.error(e);
    } finally {
      loading.value = false;
    }
  };

  const updateEmployee = async (id, data) => {
    try {
      loading.value = true;
      const response = await axiosService.put(`employees/id/${id}`, data);
      message.value = response.data.message;
      router.push({ name: "table-employees" });
      toast.success(message.value);
    } catch (e) {
      error.value = e;
      console.error(e.response.data);
    } finally {
      loading.value = false;
    }
  };

  return {
    employee,
    employees,
    error,
    loading,
    message,
    employementTypes,
    fetchEmployees,
    fetchEmployee,
    fetchEmployeesByCompany,
    createEmployee,
    deleteEmployee,
    updateEmployee,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useEmployeeStore, import.meta.hot));
}
