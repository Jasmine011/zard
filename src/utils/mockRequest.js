//基于axios封装的请求模块
import axios from 'axios'
//引入nprogress进度条插件
import nprogress from 'nprogress';
//引入进度条样式
import 'nprogress/nprogress.css'

const request = axios.create({
    //接口的基准路径
    baseURL: '/mock',
    //请求超时
    timeout: 9000
});
//添加一个请求拦截器
request.interceptors.request.use(function(config) {
    //在请求发出之前进行一些信息设置，比如请求头配置
    //config.headers.mytoken = 'hihao'; //配置请求头
    nprogress.start();
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