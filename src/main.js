import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/pagination'
import { MessageBox } from 'element-ui';
//注册全局组件
Vue.component('TypeNav', TypeNav);
//注册轮播图全局组件
Vue.component('Carousel', Carousel);
//分页器全局组件
Vue.component('Pagination', Pagination);

//全局注册这个按需引入的element-ui
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

Vue.config.productionTip = false

//把api文件夹的所有接口引入
import * as $API from '@/api'


//测试接口
/* import { getBaseCategoryList, getSearchInfo, getGoodsInfo, reqGetUserTrade } from '@/api'
console.log(getBaseCategoryList());
console.log(getSearchInfo({}));
async function run() {
    console.log(await getBaseCategoryList());
    console.log(await getSearchInfo({}));
    console.log(await getGoodsInfo(12));
    console.log(await reqGetUserTrade());
}
run() */

//测试自定义插件
import myPlugins from '@/plugins/myPlugins'
Vue.use(myPlugins, {
    name: 'upper'
})

//引入mock模拟数据
import '@/mock/mockServe.js'
//引入swiper轮播图样式
import 'swiper/css/swiper.css'

//引入图片懒加载插件
import VueLazyload from 'vue-lazyload'
import GIF from '@/assets/2.gif'
//加载插件
Vue.use(VueLazyload, {
    //自定义懒加载图片
    loading: GIF
})

//使用表单验证插件vee-validate
import '@/plugins/validate'


new Vue({
    //$router路由跳转，$route路由信息
    router,
    store,
    render: h => h(App),
    beforeCreate() {
        Vue.prototype.$bus = this,
            Vue.prototype.$API = $API
    }
}).$mount('#app')