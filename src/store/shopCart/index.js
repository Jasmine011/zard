import { getCartList } from "../../api";

export default {
    state: {
        cartList: []
    },
    mutations: {
        GETCARTLIST(state, cartListData) {
            state.cartList = cartListData
        }
    },
    actions: {
        //获取购物车列表数据
        async getCartListAsync(context) {
            const result = await getCartList()
            if (result.code == 200) {
                context.commit('GETCARTLIST', result.data)
            } else {
                console.log('获取购物车列表失败');
            }
        },
        //删除选择的商品
        /* deleteChangeCart(context){
            let {getters,dispatch} = context;
            getters.cartList.cartInfoList.forEach(cart=>{
                dispatch('getCartListAsync',)
            })
        } */
    },
    getters: {
        cartList(state) {
            return state.cartList[0] || {}
        }
    }
}