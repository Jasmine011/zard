import { getSearchInfo } from '@/api'
//search模块的小仓库
export default {
    state: {
        SearchList: {}
    },
    mutations: {
        getSearchInfo(state, SearchList) {
            state.SearchList = SearchList
        }
    },
    actions: {
        async getSearchInfoList(context, params = {}) {
            try {
                const result = await getSearchInfo(params)
                context.commit('getSearchInfo', result.data)
            } catch (err) {
                alert('获取Search数据失败，请稍后再试')
            }
        }
    },
    getters: {
        goodsList: state => {
            //在刚开始加载时state.SearchList是空对象，空对象里当然没有goodsList，这会报一共undefined错误，所以或一共空数组
            return state.SearchList.goodsList || []
        },
        attrsList: state => {
            return state.SearchList.attrsList || []
        },
        trademarkList: state => {
            return state.SearchList.trademarkList || []
        },
    }

}