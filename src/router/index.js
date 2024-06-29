import {createRouter, createWebHistory} from 'vue-router'
import {useUserStore} from "@/stores/user.js";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            // redirect: '/login'
            redirect:'/user/reserve'
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
        },
        {
            path: '/user/reserve',
            name: 'reserve',
            component: () => import('../views/UserReserveView.vue')
        }
    ]
})
// // 路由守卫
// router.beforeEach(async (to, from, next) => {
//     const user = useUserStore();
//     //放行注册页面
//     if (to.name === 'register') {
//         next();
//     }
//     // 登录页面放行
//     if (user.isLogin || to.name === 'login') {
//         next();
//     } else {
//         // 未登录，跳转到登录页面
//         next({name: 'login'});
//     }
// });

export default router
