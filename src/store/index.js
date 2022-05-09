import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
    //主页
import home from './home'
//搜索
import search from './search'
//商品详情仓库
import detail from './detail'
//购物车仓库
import shopCart from './shopCart'
//登陆注册仓库
import user from './user'
//结算页面仓库
import trade from './trade'

export default new Vuex.Store({
    modules: {
        home,
        search,
        detail,
        shopCart,
        user,
        trade
    }
})