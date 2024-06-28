import {createRouter, createWebHistory} from 'vue-router'
import {useUserStore} from "@/stores/user.js";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/LoginView.vue')
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('../views/RegisterView.vue')
        },
        {
            path: '/home',
            name: 'home',
            component: () => import('../views/HomeView.vue')
        },
        {
            path: '/edit/:order_id',
            name: 'edit',
            component: () => import('../views/EditView.vue')
        }
    ]
})
// 路由守卫
router.beforeEach(async (to, from, next) => {
    const user = useUserStore();
    if (user.isLogin || to.name === 'login') {
        next();
    } else {
        next({name: 'login'});
    }
});

export default router
