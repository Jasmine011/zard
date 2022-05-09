import { reqGetCode, reqUserRegister, reqUserLogin, reqGetUserInfo, reqLogout } from '@/api'
//本地存储
import { setItem, getItem, removeItem } from '@/utils/storage'
const TOKEN_KEY = 'TOUTIAO_USER'
export default {
    state: {
        code: '',
        Token: getItem(TOKEN_KEY),
        userInfo: {}
    },
    mutations: {
        //存储验证码到仓库
        getCode(state, codeData) {
            state.code = codeData
        },
        //存储token到仓库
        USERLOGIN(state, token) {
            state.Token = token
        },
        //存储用户信息
        GETUSERINFO(state, userInfo) {
            state.userInfo = userInfo
        },
        //删除用户信息
        clearUserInfo(state) {
            state.Token = '',
                state.userInfo = '',
                removeItem(TOKEN_KEY)
        }
    },
    actions: {
        //发送获取验证码请求，并把获取到的验证码保存到仓库
        async getCodeAsync(context, phone) {
            let result = await reqGetCode(phone)
            if (result.code == 200) {
                context.commit('getCode', result.data)
                return 'ok'
            } else {
                return Promise.reject(new Error('fail'))
            }
        },
        //点击注册
        async userRegister(context, data) {
            let result = await reqUserRegister(data)
            if (result.code == 200) {
                return 'ok'
            }
        },
        //点击登录
        async userLogin(context, data) {
            let result = await reqUserLogin(data)
            if (result.code == 200) {
                context.commit('USERLOGIN', result.data.token)
                    //把token存储到本地存储
                setItem(TOKEN_KEY, result.data.token)
                return 'ok'
            }
        },
        //获取用户信息
        async getUserInfo(context) {
            let result = await reqGetUserInfo()
            if (result.code == 200) {
                context.commit('GETUSERINFO', result.data)
                return 'ok'
            } else {
                return Promise.reject(new Error('fail'))
            }
        },
        //退出登陆
        async reqLogout(context) {
            let result = await reqLogout()
            if (result.code == 200) {
                context.commit('clearUserInfo')
                return 'ok'
            } else {
                return Promise.reject(new Error('fail'))
            }
        }
    },
    getters: {}
}