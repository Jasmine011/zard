//获取三级联动商品数据
import { getBaseCategoryList, getFloorList } from '@/api'
//home模块的小仓库
export default {
    state: {
        BaseCategoryList: [],
        floorList: []
    },
    mutations: {
        getList(state, list) {
            state.BaseCategoryList = list
        },
        getFloorList(state, floorList) {
            state.floorList = floorList
        }
    },
    actions: {
        async getCategoryList(context) {
            try {
                const result = await getBaseCategoryList()
                context.commit('getList', result.data)
            } catch (err) {
                alert('获取三级联动数据失败，请稍后再试呀')
            }
        },
        async getFloorListStore(context) {
            try {
                const result = await getFloorList()
                context.commit('getFloorList', result.data)
            } catch (err) {
                alert('获取floor数据失败，请稍后再试')
            }
        }
    },
    modules: {}
}