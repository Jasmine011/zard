import request from '@/utils/request'
import mockRequest from '@/utils/mockRequest'

//请求三级分类信息
export const getBaseCategoryList = () => {
        return request({
            method: 'GET',
            url: '/api/product/getBaseCategoryList'
        })
    }
    //获取mock模拟数据banner轮播图
export const getBannerList = () => {
        return mockRequest('/banner')
    }
    //获取mock模拟数据floor
export const getFloorList = () => {
        return mockRequest('/floor')
    }
    //获取search数据
export const getSearchInfo = (params) => {
    return request({
        method: 'POST',
        url: '/api/list',
        data: params
    })
}

//获取商品详情
export const getGoodsInfo = (id) => {
    return request({
        method: 'GET',
        url: `/api/item/${id}`
    })
}

//加入商品到购物车，传递两个参数：商品id，商品数量
export const reqAddSku = (skuId, skuNum) => {
    return request({
        method: 'POST',
        url: `/api/cart/addToCart/${skuId}/${skuNum}`
    })
}

//获取购物车列表
export const getCartList = () => {
    return request({
        method: 'GET',
        url: '/api/cart/cartList'
    })
}

//删除购物车某个商品
export const deleteCart = (skuId) => {
    return request({
        method: 'DELETE',
        url: `/api/cart/deleteCart/${skuId}`
    })
}

//切换商品选中状态
export const changeCart = (skuId, isChecked) => {
    return request({
        method: 'GET',
        url: `/api/cart/checkCart/${skuId}/${isChecked}`
    })
}

//注册获取验证码
export const reqGetCode = (phone) => {
    return request({
        method: 'GET',
        url: `/api/user/passport/sendCode/${phone}`
    })
}


//点击注册按钮，发送注册请求
export const reqUserRegister = (data) => {
    return request({
        method: 'POST',
        url: '/api/user/passport/register',
        data
    })
}

//点击登陆
export const reqUserLogin = (data) => {
    return request({
        method: 'POST',
        url: '/api/user/passport/login',
        data
    })
}

//获取用户消息，根据token
export const reqGetUserInfo = () => {
    return request({
        method: 'GET',
        url: '/api/user/passport/auth/getUserInfo'
    })
}

//退出登陆
export const reqLogout = () => {
    return request({
        method: 'GET',
        url: '/api/user/passport/logout'
    })
}

//trade结算页面收件人信息
export const reqGetUserAddress = () => {
    return request({
        method: 'GET',
        url: '/api/user/userAddress/auth/findUserAddressList'
    })
}

//trade获取要结算的商品清单
export const reqGetUserTrade = () => {
    return request({
        method: 'GET',
        url: '/api/order/auth/trade'
    })
}

//trade获取要结算的商品清单
export const submitOrder = (tradeNo, data) => {
    return request({
        method: 'POST',
        url: `/api/order/auth/submitOrder?tradeNo=${tradeNo}`,
        data
    })
}

//支付页面信息
export const getPayInfo = (orderId) => {
    return request({
        method: 'GET',
        url: `/api/payment/weixin/createNative/${orderId}`
    })
}


//支付状态查询
export const getPayStatus = (orderId) => {
    return request({
        method: 'GET',
        url: `/api/payment/weixin/queryPayStatus/${orderId}`
    })
}


//获取个人中心下的我的订单列表
export const getMyOrderList = (page, limit) => {
    return request({
        method: 'GET',
        url: `/api/order/auth/${page}/${limit}`
    })
}