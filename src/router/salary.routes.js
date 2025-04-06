const CreateSalaryView = () => import("@/views/Salary/CreateSalaryView.vue");
const TableSalaryView = () => import("@/views/Salary/TableSalaryView.vue");
const UpdateSalaryView = () => import("@/views/Salary/UpdateSalaryView.vue");

export default [
  {
    path: "/salaries",
    name: "table-salaries",
    component: TableSalaryView,
  },
  {
    path: "/salaries/create",
    name: "create-salary",
    component: CreateSalaryView,
  },
  {
    path: "/salaries/update/:id",
    name: "update-salary",
    component: UpdateSalaryView,
  },
];
