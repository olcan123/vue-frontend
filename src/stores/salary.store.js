import { defineStore, acceptHMRUpdate } from "pinia";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import axiosService from "@/services/api/axios.service";

export const useSalaryStore = defineStore("salary", () => {
  const router = useRouter();
  const toast = useToast();

  const salary = ref({});
  const salaries = ref([]);
  const error = ref(null);
  const loading = ref(false);
  const message = ref(null);

  const salarySummaries = computed(() => {
    return salaries.value.map((salary) => {
      const lines = salary.salaryLines || [];

      const sumNetSalary = lines.reduce(
        (acc, line) => acc + (parseFloat(line.netSalary) || 0),
        0
      );

      const sumGrossSalary = lines.reduce(
        (acc, line) => acc + (parseFloat(line.grossSalary) || 0),
        0
      );

      const sumTax = lines.reduce(
        (acc, line) => acc + (parseFloat(line.tax) || 0),
        0
      );

      const sumEmployeeContribute = lines.reduce(
        (acc, line) => acc + (parseFloat(line.employeeContribute) || 0),
        0
      );

      const sumEmployerContribute = lines.reduce(
        (acc, line) => acc + (parseFloat(line.employerContribute) || 0),
        0
      );

      // 🧩 Çalışan bazlı detayları da koyalım
      const salaryLines = lines.map((line) => ({
        employeeId: line.employeeId,
        netSalary: parseFloat((line.netSalary || 0).toFixed(2)),
        grossSalary: parseFloat((line.grossSalary || 0).toFixed(2)),
        tax: parseFloat((line.tax || 0).toFixed(2)),
        employeeContribute: parseFloat(
          (line.employeeContribute || 0).toFixed(2)
        ),
        employerContribute: parseFloat(
          (line.employerContribute || 0).toFixed(2)
        ),
        suppEmpContrib: parseFloat((line.suppEmpContrib || 0).toFixed(2)),
        suppEmprContrib: parseFloat((line.suppEmprContrib || 0).toFixed(2)),
        isPrimary: line.isPrimary,
        contribIncluded: line.contribIncluded,
        taxApplied: line.taxApplied,
      }));

      return {
        id: salary.id,
        companyId: salary.companyId,
        period: salary.period,
        note: salary.note,
        sumNetSalary: parseFloat(sumNetSalary.toFixed(2)),
        sumGrossSalary: parseFloat(sumGrossSalary.toFixed(2)),
        sumTax: parseFloat(sumTax.toFixed(2)),
        sumEmployeeContribute: parseFloat(sumEmployeeContribute.toFixed(2)),
        sumEmployerContribute: parseFloat(sumEmployerContribute.toFixed(2)),
        salaryLines, // 🔥 çalışan bazlı detaylar burada!
      };
    });
  });

  const uniqueSortedPeriods = computed(() => {
    const all = salaries.value.map((s) => s.period);
    return [...new Set(all)].sort(); // alfabetik olarak sıralar: ["2025-01", "2025-02"]
  });

  // 🔢 Map ile salaryHead başına toplamlar hesaplanıyor
  const fetchSalaries = async () => {
    try {
      loading.value = true;
      const response = await axiosService.get("salaries");
      salaries.value = response.data.data;
    } catch (e) {
      error.value = e;
    } finally {
      loading.value = false;
    }
  };

  const fetchSalary = async (id) => {
    try {
      loading.value = true;
      const response = await axiosService.get(`salaries/id/${id}`);
      salary.value = response.data.data;
    } catch (e) {
      error.value = e;
    } finally {
      loading.value = false;
    }
  };

  const createSalary = async (data) => {
    try {
      loading.value = true;
      const response = await axiosService.post("salaries", data);
      message.value = response.data.message;
      router.push({ name: "table-salaries" });
      toast.success(message.value);
    } catch (e) {
      error.value = e;
      console.error(e);
    } finally {
      loading.value = false;
    }
  };

  const updateSalary = async (id, data) => {
    try {
      loading.value = true;
      const response = await axiosService.put(`salaries/id/${id}`, data);
      message.value = response.data.message;
      router.push({ name: "table-salaries" });
      toast.success(message.value);
    } catch (e) {
      error.value = e;
      console.error(e.response.data);
    } finally {
      loading.value = false;
    }
  };

  const deleteSalary = async (id) => {
    try {
      loading.value = true;
      const response = await axiosService.delete(`salaries/id/${id}`);
      salaries.value = salaries.value.filter((salary) => salary.id !== id);
      message.value = response.data.message;
      router.push({ name: "table-salaries" });
      toast.success(message.value);
    } catch (e) {
      error.value = e;
      console.error(e.response.data);
    } finally {
      loading.value = false;
    }
  };

  const deleteSalaryLine = async (id) => {
    try {
      loading.value = true;
      const response = await axiosService.delete(`salaries/lines/id/${id}`);
    } catch (e) {
      error.value = e;
      console.error(e.response.data);
    } finally {
      loading.value = false;
    }
  };

  return {
    salary,
    salaries,
    error,
    loading,
    message,
    salarySummaries,
    uniqueSortedPeriods,
    fetchSalaries,
    fetchSalary,
    createSalary,
    deleteSalary,
    deleteSalaryLine,
    updateSalary,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSalaryStore, import.meta.hot));
}
