import Vue from 'vue'
import VueRouter from 'vue-router'
//引入user仓库，导航守卫要用到
import store from '@/store'

Vue.use(VueRouter)
    //push是一个promise，要传递成功或者失败两个参数，我们在路由跳转的时候没有彻底，如果同时push同一个参数就会在控制台报错
    // 重写push、replace方法start
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
VueRouter.prototype.push = function(location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => {}, () => {})
    }
}
VueRouter.prototype.replace = function(location, resolve, reject) {
        if (resolve && reject) {
            originReplace.call(this, location, resolve, reject)
        } else {
            originReplace.call(this, location, () => {}, () => {})
        }
    }
    // 重写push、replace方法end

const routes = [{
        path: '/home',
        name: 'Home',
        component: () =>
            import ('@/views/Home'),
        meta: { show: true }
    }, {
        path: '/login',
        name: 'Login',
        component: () =>
            import ('@/views/Login'),
        meta: { show: false }
    }, {
        path: '/search/:keyword?',
        name: 'Search',
        component: () =>
            import ('@/views/Search'),
        meta: { show: true },
        props: $route => {
            return { keyword: $route.params.id, k: $route.query.key }
        }
    }, {
        path: '/register',
        name: 'Register',
        component: () =>
            import ('@/views/Register'),
        meta: { show: false }
    }, {
        //刚开始的默认地址就是'/'
        //其中path表示需要被重定向的原地址，redirect表示重定向的新地址
        path: '/',
        redirect: '/home'
    },
    {
        //详情页
        path: '/detail/:id',
        name: 'Detail',
        component: () =>
            import ('@/views/Detail'),
        meta: { show: true }
    },
    {
        //添加到购物车成功
        path: '/addCartSuccess',
        name: 'AddCartSuccess',
        component: () =>
            import ('@/views/AddCartSuccess'),
        meta: { show: true }
    },
    {
        //购物车组件
        path: '/shopCart',
        name: 'ShopCart',
        component: () =>
            import ('@/views/ShopCart'),
        meta: { show: true }
    },
    {
        //提交订单页面
        path: '/trade',
        name: 'Trade',
        component: () =>
            import ('@/views/Trade'),
        meta: { show: true },
        //路由独享守卫
        beforeEnter: (to, from, next) => {
            //只能从/ShopCart跳转到本路由，其他路由都拦截
            if (from.path == '/ShopCart') {
                next()
            } else {
                //next(false)代表从哪里来回哪里去
                next(false)
            }
        }
    },
    {
        //提交订单后到达支付页面
        path: '/pay',
        name: 'Pay',
        component: () =>
            import ('@/views/Pay'),
        meta: { show: true },
        beforeEnter: (to, from, next) => {
            if (from.path == '/trade') {
                next()
            } else {
                //next(false)代表从哪里来回哪里去
                next(false)
            }
        }
    },
    {
        //支付成功提示页面
        path: '/PaySuccess',
        name: 'PaySuccess',
        component: () =>
            import ('@/views/PaySuccess'),
        meta: { show: true }
    },
    {
        //个人中心页面
        //如果父路由有默认子路由，那么父路由的name无意义
        path: '/center',
        //name: 'Center',
        component: () =>
            import ('@/views/Center'),
        meta: { show: true },
        children: [{
                path: '', //如果这里为空，默认一开始就渲染home这个子路由
                name: 'MyOrder',
                component: () =>
                    import ('@/views/Center/myOrder')
            },
            {
                path: 'groupOrder',
                name: 'GroupOrder',
                component: () =>
                    import ('@/views/Center/groupOrder')
            }
        ]
    },
    {
        //测试
        path: '/test',
        name: 'Test',
        component: () =>
            import ('@/views/test'),
        meta: { show: true }
    }
]

const router = new VueRouter({
    routes,
    //路由跳转到新页面默认滚动条在顶部
    scrollBehavior(to, from, savedPosition) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({ y: 0 })
            }, 500)
        })
    }
})

//全局守卫，前置守卫（路由跳转之前）
router.beforeEach(async(to, from, next) => {
    let Token = store.state.user.Token;
    let userName = store.state.user.userInfo.name;
    next()
    if (Token) {
        //有Token代表已登陆
        if (to.path == '/login' || to.path == '/register') {
            //登录后访问登录注册页面，不允许
            next('/home')
        } else {
            //登录后访问非login页面
            if (!userName) {
                try {
                    //登录后面有用户信息（因为vuex中的数据刷新后就会不存在了，所以要重新获取用户消息）
                    await store.dispatch('getUserInfo')
                } catch (error) {
                    //获取用户信息失败，说明Token失效了
                    //相当于执行退出登陆操作
                    await store.dispatch('reqLogout')
                    next('/login')
                }
            } else {
                //登录后有用户信息，直接放行
                next()
            }
        }
    } else {
        //未登录
        if (to.path.includes("/pay") || to.path.includes("/trade") || to.path.includes("/PaySuccess") || to.path.includes("/center")) {
            //把要去的页面地址存储到query中，在登陆页面做判断，登陆后去往这个页面
            next('/login?redirect=' + to.path)
        }
    }
})

export default router