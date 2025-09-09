import { useAuthStore } from 'src/stores/auth-store'

const routes = [
  {
    path: "/login",
    component: () => import("pages/LoginPage.vue"),

  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
    // Index stranica ne treba auth
  },
  {
    path: "/profesori",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/ProfesorPage.vue") }],
    meta: { requiresAuth: true }
  },
  {
    path: "/tecajevi",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/TecajPage.vue") }],
    meta: { requiresAuth: true }
  },
  {
    path: "/upisi",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/UpisPage.vue") }],
    meta: { requiresAuth: true }
  },
  {
    path: "/statistika",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/StatistikaPage.vue") }],
    meta: { requiresAuth: true }
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;

// FAKE LOGIN
export function setupRouter(router) {
  router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()

    // Provjeri localStorage za token
    const token = localStorage.getItem('auth_token')
    const email = localStorage.getItem('user_email')

    // Ažuriraj store ako je pronašao token
    if (token && email && !authStore.isLoggedIn) {
      authStore.login({ email }, token)
    }

    // Provjeri treba li ruta autentifikaciju
    if (to.meta.requiresAuth) {
      if (!authStore.isAuthenticated) {
        // Nije prijavljen -> idi na login
        next('/login')
        return
      }
    }

    // Ako je na login stranici a već je prijavljen -> idi na početnu
    if (to.path === '/login' && authStore.isAuthenticated) {
      next('/')
      return
    }

    // Sve je OK, nastavi na rutu
    next()
  })
}
