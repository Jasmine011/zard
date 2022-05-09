import { reqGetUserAddress, reqGetUserTrade } from '@/api'
export default {
    state: {
        address: [],
        trade: {}
    },
    mutations: {
        GETADDRESS(state, data) {
            state.address = data
        },
        GETTRADE(state, data) {
            state.trade = data
        }
    },
    actions: {
        //获取收件人信息
        async getUserAddress(context) {
            let result = await reqGetUserAddress()
            if (result.code == 200) {
                context.commit('GETADDRESS', result.data)
                return 'ok'
            } else {
                console.log('actions,获取收件人信息有问题');
                return Promise.reject(new Error('fail'))
            }
        },
        //获取结算商品清单
        async getUserTrade(context) {
            let result = await reqGetUserTrade()
            if (result.code == 200) {
                context.commit('GETTRADE', result.data)
                return 'ok'
            } else {
                console.log('actions,获取结算商品信息有问题');
                return Promise.reject(new Error('fail'))
            }
        }
    },
    getters: {}
}