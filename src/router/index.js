import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter ({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            redirect: 'login'

        },
        {
            path: '/login',
            component: () => import('../views/AdminLogin.vue')

        },
        {
            path: '/dashboard',
            component: () => import('../views/Dashboard.vue')
        },
        {
            path: '/senior-records',
            component: () => import('../views/StudentRecords/Senior.vue')
        },
        {
            path: '/junior-records',
            component: () => import('../views/StudentRecords/Junior.vue')
        },
        {
            path: '/consultationrecords',
            component: () => import('../views/ConsultationRecords.vue')
        },
        {
           path: '/inventory',
            component: () => import('../views/Inventory.vue')
        },  
        {
            path: '/medicalcertificate',
             component: () => import('../views/Med_Cert.vue')
        },
        {
            path: '/dental',
             component: () => import('../views/Dental_Cert.vue')
        },
    ]
})

export default router