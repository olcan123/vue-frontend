const DefaultLayout = () => import("@/layouts/DefaultLayout.vue");
const AuthLayout = () => import("@/layouts/AuthLayout.vue");
import homeRoutes from "./home.routes";
import companyRoutes from "./company.routes";
import employeeRoutes from "./employee.routes";
import salaryRoutes from "./salary.routes";
import reportRoutes from "./report.routes";

const routes = [
  {
    path: "/",
    component: DefaultLayout,
    children: [
      ...homeRoutes,
      ...companyRoutes,
      ...employeeRoutes,
      ...salaryRoutes,
      ...reportRoutes,

      //ornek auth 
      // { 
      //   path: 'dashboard', 
      //   name: 'Dashboard', 
      //   component: DashboardView,
      //   meta: { requiresAuth: true }
      // }
    ],
  },
  {
    path: "/auth",
    component: AuthLayout,
    // children: [
    //   { path: 'login', name: 'Login', component: LoginView }
    // ]
  },
];

export default routes;

// // 🚀 Rota Koruma (Auth Guard)
// router.beforeEach((to, from, next) => {
//   const auth = useAuthStore();

//   if (to.meta.requiresAuth && !auth.isAuthenticated) {
//     next({ name: 'Login' });
//   } else {
//     next();
//   }
// });
