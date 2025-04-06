const TableCompanyView = () => import("@/views/Company/TableCompanyView.vue");
const CreateCompanyView = () => import("@/views/Company/CreateCompanyView.vue");
const UpdateCompanyView = () => import("@/views/Company/UpdateCompanyView.vue");
const DetailCompanyView = () => import("@/views/Company/DetailCompanyView.vue");
const CreateIsoftView = () =>
  import("@/views/Company/Isoft/CreateIsoftView.vue");
const TableIsoftView = () => import("@/views/Company/Isoft/TableIsoftView.vue");
const updateIsoftView = () =>
  import("@/views/Company/Isoft/UpdateIsoftView.vue");

export default [
  {
    path: "companies",
    name: "table-companies",
    component: TableCompanyView,
  },
  {
    path: "companies/create",
    name: "create-company",
    component: CreateCompanyView,
  },
  {
    path: "companies/update/:id",
    name: "update-company",
    component: UpdateCompanyView,
  },
  {
    path: "companies/detail/:id",
    name: "detail-company",
    component: DetailCompanyView,
  },
  {
    path: "companies/:id/isofts/create",
    name: "create-isoft",
    component: CreateIsoftView,
  },
  {
    path: "companies/:id/isofts",
    name: "table-isofts",
    component: TableIsoftView,
  },
  {
    path: "companies/:id/isofts/update",
    name: "update-isoft",
    component: updateIsoftView,
  },
];
