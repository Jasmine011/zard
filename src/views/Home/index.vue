<template lang="">
    <div class="home-container">
        <type-nav/>
        <list-index/>
        <recommend/>
        <rank-index/>
        <like-index/>
        <floor-index v-for="list in floorList" :key="list.id" :list="list"/>
        <brand-index/>
    </div>
</template>
<script>
import ListIndex from '@/views/Home/ListContainer'
import Recommend from '@/views/Home/Recommend'
import RankIndex from '@/views/Home/rank'
import LikeIndex from '@/views/Home/Like'
import FloorIndex from '@/views/Home/Floor'
import BrandIndex from '@/views/Home/Brand'
import {mapState} from 'vuex'
export default {
    name:"HomeIndex",
    components:{
        ListIndex,
        Recommend,
        RankIndex,
        LikeIndex,
        FloorIndex,
        BrandIndex
    },
    mounted(){
        this.$store.dispatch('getFloorListStore')
        //我们不在这里获取用户信息，在导航守卫再获取
        //this.$store.dispatch('getUserInfo')
    },
    computed:{
        ...mapState({floorList:state=>state.home.floorList})
    }
}
</script>
<style lang="">
    
</style>