const AtkSampleView = () => import("@/views/Report/AtkSampleView.vue");
const IsoftSampleView = () => import("@/views/Report/IsoftSampleView.vue");

export default [
  {
    path: "/reports/atk-sample/:id",
    name: "atk-sample",
    component: AtkSampleView,
  },
  {
    path: "/reports/isoft-sample/:id",
    name: "isoft-sample",
    component: IsoftSampleView,
  },
];
