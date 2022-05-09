import Mock from 'mockjs'
import banner from './banner.json'
import floor from './floor.json'

//Mock下面有mock方法，第一个参数是请求路径，第二个参数为根据请求返回的数据
Mock.mock('/mock/banner', { code: 200, data: banner })
Mock.mock('/mock/floor', { code: 200, data: floor })