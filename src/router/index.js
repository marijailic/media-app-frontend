import { createRouter, createWebHistory } from "vue-router";
import { getAuthToken } from "@/services/authService";

const routes = [
    {
        path: "/login",
        name: "LoginView",
        component: () => import("@/views/LoginView.vue"),
        meta: {
            authRequired: false,
        },
    },
    {
        path: "/home",
        name: "HomeView",
        component: () => import("@/views/HomeView.vue"),
        meta: {
            authRequired: true,
        },
    },
    {
        path: "/:pathMatch(.*)*",
        name: "NotFoundView",
        component: () => import("@/views/NotFoundView.vue"),
        meta: {
            authRequired: false,
        },
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior(_to, _from, _savedPosition) {
        if (_savedPosition) {
            return _savedPosition;
        }
        return { top: 0 };
    },
});

router.beforeEach(async (to, _from, next) => {
    const token = getAuthToken();
    const isUserLoggedIn = token !== null;

    if (!isUserLoggedIn && to.meta.authRequired) {
        return next({ name: "LoginView" });
    } else if (isUserLoggedIn && to.name === "LoginView") {
        return next({ name: "HomeView" });
    }

    return next();
});

export default router;
