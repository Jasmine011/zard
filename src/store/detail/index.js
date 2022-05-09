//获取详情页的请求
import { getGoodsInfo, reqAddSku } from '@/api'
//引入我们生成的uuid
import { getUUID } from '@/utils/getUUID'
export default {
    state: {
        goodsInfo: {},
        UUID_token: getUUID()
    },
    mutations: {
        getGoods(state, goodsData) {
            state.goodsInfo = goodsData
        }
    },
    actions: {
        //发送请求获取商品详情页信息
        async getGoodsInfoAsync(context, id) {
            let result = await getGoodsInfo(id)
            if (result.code == 200) {
                context.commit('getGoods', result.data)
            } else {
                console.log('详情页请求失败');
            }
        },
        //将商品添加到购物车
        async AddSku(context, { skuId, skuNum }) {
            let result = await reqAddSku(skuId, skuNum)
            if (result.code == 200) {
                //注意async下的函数返回一定是promise
                return 'ok'
            } else {
                return Promise.reject(new Error('fail'))
            }
        }
    },
    getters: {
        //面包屑
        categoryView: state => {
            return state.goodsInfo.categoryView || {};
        },
        //产品信息，名称价格
        skuInfo: state => {
            return state.goodsInfo.skuInfo || {};
        },
        //产品参数
        spuSaleAttrList: state => {
            return state.goodsInfo.spuSaleAttrList || [];
        }
    }
}