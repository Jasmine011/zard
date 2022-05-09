<template>
    <div class="testIndex">
        <h1>父组件</h1><input :value="msg" @input="msg=$event.target.value">
        <enter-1 :toSon="msg" @toFather="msg=$event" aann="aaaaaaa"/>
        <enter-2 :text.sync='msg'/>
        el
    </div>
</template>
<script>
import enter1 from './son/enter1.vue'
import enter2 from './son/enter2.vue'
export default {
    name:"TestIndex",
    components:{
        enter1,
        enter2
    },
    data(){
        return {
            msg:10000
        }
    }
}
</script>
<style lang="less">
    .testIndex{
        height: 100px;
        width: 100%;
        background-color: cadetblue;
    }
</style>