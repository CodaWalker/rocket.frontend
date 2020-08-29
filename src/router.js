import Vue from 'vue'
import Router from 'vue-router'
import store from './store/store.js'
import Home from './view/Home.vue'
import About from './view/About.vue'
import Login from './component/Login.vue'
import Secure from './component/Secure.vue'
import Register from './component/Register.vue'
import Store from './store/store.js'
import UserPage from './component/User/UserPage.vue'

Vue.use(Router)

let router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/userPage/:id?',
            props:true,
            name: 'userPage',
            component: UserPage,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/secure',
            name: 'secure',
            component: Secure,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/about',
            name: 'about',
            component: About
        },
        {
            path: '/logout',
            name: 'logout',
            component: function () {
                Store.dispatch('logout')
                    .then(() => {
                        router.push('/login')
                    })
            }
        }
    ]
})

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.isLoggedIn) {
            next()
            return
        }
        next('/login')
    } else {
        next()
    }
})


export default router