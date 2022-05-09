<template>
    <div style="background:skyblue;">
        <input type="text" :value="toSon" @input="$emit('toFather',$event.target.value)"><span>子组件1</span>
    </div>
</template>
<script>
export default {
    name:"SonOneIndex",
    props:['toSon'],
    data(){
        return {
            msg:'我是第一个子组件'
        }
    },
    mounted(){
        console.log(this.$attrs);
    }
}
</script>
<style lang="">
    
</style>