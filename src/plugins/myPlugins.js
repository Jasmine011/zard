//插件一般为对象
let myPlugins = {}
myPlugins.install = function(Vue, options) {
        Vue.directive(options.name, {
            inserted: function(el, binding) {
                el.style.color = binding.value.color;
            }
        })
    }
    /* 定义了一个让dom自定义文字颜色的指令，可全局使用 */
    /* 调用：<input type="text" v-color='{color:"orange"}'></input> */
export default myPlugins