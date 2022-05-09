//基于axios封装的请求模块
import axios from 'axios'
//引入nprogress进度条插件
import nprogress from 'nprogress';
//引入进度条样式
import 'nprogress/nprogress.css'
//引入仓库中的uuid，把它放入请求头
import store from '@/store'

const request = axios.create({
    //接口的基准路径
    baseURL: 'http://gmall-h5-api.atguigu.cn',
    //请求超时
    timeout: 9000
});
//添加一个请求拦截器
request.interceptors.request.use(function(config) {
    //在请求发出之前进行一些信息设置，比如请求头配置
    //config.headers.mytoken = 'hihao'; //配置请求头
    //nprogress加载进度条样式
    nprogress.start();
    //给请求头一个uuid
    if (store.state.detail.UUID_token) {
        //这里的userTempId这个属性不是瞎写的，是和后台接口相对应的
        config.headers.userTempId = store.state.detail.UUID_token;
    }
    //给请求头一个token
    if (store.state.user.Token) {
        //这里的token这个属性不是瞎写的，是和后台接口相对应的
        config.headers.token = store.state.user.Token;
    }
    return config; //这句话必写
}, function(err) {
    //处理响应的错误
})

//添加一个响应拦截器
request.interceptors.response.use(function(res) {
    //在这里对返回的数据进行处理
    nprogress.done();
    return res.data;
}, function(err) {
    //处理响应的错误
})

//响应拦截器
export default request