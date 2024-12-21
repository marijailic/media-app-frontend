import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/login",
        name: "LoginView",
        component: () => import("@/views/LoginView.vue"),
        meta: {
            // authRequired: false,
        },
    },
    {
        path: "/",
        name: "AppWrapper",
        component: () => import("@/wrappers/AppWrapper.vue"),
        meta: {
            // authRequired: true,
        },
        children: [
            {
                path: "home",
                name: "HomeView",
                component: () => import("@/views/HomeView.vue"),
            },
        ],
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

// TODO:: dodati auth za router

export default router;
