import { createRouter, createWebHistory } from "vue-router";
import routes from "./main";

const history = createWebHistory(import.meta.env.BASE_URL);

const router = createRouter({
  history,
  routes,
});

export default router;
