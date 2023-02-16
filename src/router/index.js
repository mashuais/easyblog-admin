import { createRouter, createWebHistory } from 'vue-router'
import VueCookies from 'vue-cookies'
const routes = [
    {
        name: '登录',
        path: '/login',
        component: () => import('../views/Login.vue'),
    },
    {
        name: '框架页',
        path: '/',
        component: () => import('../views/Framework.vue'),
        redirect: "/blog/list",
        children: [
            {
                path: "/blog/list",
                name: "博客管理",
                component: () => import('../views/blog/BlogList.vue')
            },
            {
                path: "/blog/category",
                name: "分类管理",
                component: () => import('../views/blog/BlogCategory.vue')
            },
            {
                path: "/special/list",
                name: "专题管理",
                component: () => import('../views/special/SpecialList.vue')
            }, {
                path: "/settings/my",
                name: "个人信息",
                component: () => import('../views/settings/MyInfo.vue')
            }, {
                path: "/settings/user",
                name: "博客成员",
                component: () => import('../views/settings/TeamUser.vue')
            }, {
                path: "/settings/sysInfo",
                name: "系统设置",
                component: () => import('../views/settings/SysInfo.vue')
            }, {
                path: "/recovery/list",
                name: "回收站",
                component: () => import('../views/recovery/RecoveryList.vue')
            }

        ]
    }
];

//这里不是通过new来创建，通过createRouter 方法创建，使用的模式不是通过mode来定义
const router = createRouter({
    routes,
    history: createWebHistory(),
})

router.beforeEach((to, from, next) => {
    const userInfo = VueCookies.get("userInfo");
    if (!userInfo && to.path != "/login") {
        router.push("/login");
    }
    next();
})

export default router