const TableEmployeeView = () => import("@/views/Employee/TableEmployeeView.vue");
const CreateEmployeeView = () => import("@/views/Employee/CreateEmployeeView.vue");
const UpdateEmployeeView = () => import("@/views/Employee/UpdateEmployeeView.vue");

export default [
    {
        path: "/employees",
        name: "table-employees",
        component: TableEmployeeView,
    },
    {
        path: "/employees/create",
        name: "create-employee",
        component: CreateEmployeeView,
    },
    {
        path: "/employees/update/:id",
        name: "update-employee",
        component: UpdateEmployeeView,
    }
];