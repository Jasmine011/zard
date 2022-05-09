<template>
    <div class="Header-container">
        <header class="header">
            <!-- 头部的第一行 -->
            <div class="top">
                <div class="container">
                    <div class="loginList">
                        <p v-upper='{color:"red"}'>尚品汇欢迎您！</p>
                        <!-- 未登录 -->
                        <p v-if="!userName">
                            <span>请</span>
                            <router-link to="/login">登陆</router-link>
                            <router-link to="/register" class="register">免费注册</router-link>
                        </p>
                        <!-- 已登录 -->
                        <p v-else>
                            <a>{{userName}}</a>
                            <a class="register" @click="toLogout">退出登陆</a>
                        </p>
                    </div>
                    <div class="typeList">
                        <router-link to="/center">我的订单</router-link>
                        <router-link to="/shopCart">我的购物车</router-link>
                        <a href="###">我的尚品汇</a>
                        <a href="###">尚品汇会员</a>
                        <a href="###">企业采购</a>
                        <a href="###">关注尚品汇</a>
                        <a href="###">合作招商</a>
                        <a href="###">商家后台</a>
                    </div>
                </div>
            </div>
            <!--头部第二行 搜索区域-->
            <div class="bottom">
                <h1 class="logoArea">
                    <router-link class="logo" title="尚品汇" to="/home">
                        <img src="./images/logo.png" alt="">
                    </router-link>
                </h1>
                <div class="searchArea">
                    <form action="###" class="searchForm">
                        <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="keyword"/>
                        <button class="sui-btn btn-xlarge btn-danger" type="button" @click="toSearch">搜索</button>
                    </form>
                </div>
            </div>
        </header>
    </div>
</template>
<script>
export default {
    name:"HeaderIndex",
    data(){
        return{
            keyword:'',
            msg:'尚品汇欢迎您！'
        }
    },
    mounted(){
        this.$bus.$on('removeSearchKeyword',()=>{
            this.keyword = ''
        });
    },
    methods:{
        toSearch(){
            let location = {name:"Search",params:{keyword:this.keyword||undefined}}
            //this.$router.push('/search/'+this.keyword+'/?key='+this.keyword.toUpperCase());
            //如果route已经有query数据了，那么在跳转时把query也带上
            if(this.$route.query){
                location.query = this.$route.query
            }
            this.$router.push(location)
            // this.$router.push({name:"Search",query:{key:this.keyword.toUpperCase()}})
        },
        //退出登陆
        async toLogout(){
            try{
                await this.$store.dispatch('reqLogout')
                //退出成功，回到home页面
                this.$router.push('/home')
            }catch(err){

            }
        }
    },
    computed:{
        userName(){
            return this.$store.state.user.userInfo.name
        }
    }
}
</script>
<style scoped lang="less">
        .header {
        &>.top {
            background-color: #eaeaea;
            height: 30px;
            line-height: 30px;

            .container {
                width: 1200px;
                margin: 0 auto;
                overflow: hidden;

                .loginList {
                    float: left;

                    p {
                        float: left;
                        margin-right: 10px;

                        .register {
                            border-left: 1px solid #b3aeae;
                            padding: 0 5px;
                            margin-left: 5px;
                        }
                    }
                    a{
                        cursor: pointer;
                    }
                }

                .typeList {
                    float: right;

                    a {
                        padding: 0 10px;

                        &+a {
                            border-left: 1px solid #b3aeae;
                        }
                    }

                }

            }
        }

        &>.bottom {
            width: 1200px;
            margin: 0 auto;
            overflow: hidden;

            .logoArea {
                float: left;

                .logo {
                    img {
                        width: 175px;
                        margin: 25px 45px;
                    }
                }
            }

            .searchArea {
                float: right;
                margin-top: 35px;

                .searchForm {
                    overflow: hidden;

                    input {
                        box-sizing: border-box;
                        width: 490px;
                        height: 32px;
                        padding: 0px 4px;
                        border: 2px solid #ea4a36;
                        float: left;

                        &:focus {
                            outline: none;
                        }
                    }

                    button {
                        height: 32px;
                        width: 68px;
                        background-color: #ea4a36;
                        border: none;
                        color: #fff;
                        float: left;
                        cursor: pointer;

                        &:focus {
                            outline: none;
                        }
                    }
                }
            }
        }
    }
    
</style>