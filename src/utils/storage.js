// 存储Token
export const setItem = (key, value) => {
    window.localStorage.setItem(key, value)
}

//获取Token
export const getItem = (key) => {
    return window.localStorage.getItem(key)

}

//删除Token
export const removeItem = (key) => {
    window.localStorage.removeItem(key)
}