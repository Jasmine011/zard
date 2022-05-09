<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cart in cartInfoList" :key="cart.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="cart.isChecked==1" @change="changeSelect(cart.skuId,$event.target.checked?'1':'0')">
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl">
            <div class="item-msg">{{cart.skuName}}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{cart.cartPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="handler('mins',1,cart)">-</a>
            <input autocomplete="off" type="text" :value="cart.skuNum" minnum="1" class="itxt" @change="handler('change',$event.target.value*1,cart)">
            <a href="javascript:void(0)" class="plus" @click="handler('add',-1,cart)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{cart.cartPrice*cart.skuNum}}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="clickDeleteCart(cart.skuId)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllChecked&&cartInfoList.length!=0" @change="updateAllChangeCart($event)">
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllChangeCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{sumMoney}}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState,mapGetters} from 'vuex'
import{deleteCart,changeCart} from '@/api'
//节流
import throttle from 'lodash/throttle'
  export default {
    name: 'ShopCart',
    mounted(){
      this.getData()
    },
    computed:{
      ...mapState({cartList:state=>state.shopCart.cartList[0]}),
      ...mapGetters(['cartList']),
      //购物车数据
      cartInfoList:function(){
        return this.cartList.cartInfoList||[]
      },
      //计算商品总价
      sumMoney:function(){
        let sum= 0;
        this.cartInfoList.forEach(cart => {
          if(cart.isChecked==1){
            sum+=(cart.skuPrice*cart.skuNum)
          }
        })
        return sum;
      },
      //全选按钮,判断是否全选
      isAllChecked:function(){
        return this.cartInfoList.every(cart=>{
          return cart.isChecked==1
        })
      }
    },
    methods:{
      //获取购物车数据
      getData(){
        this.$store.dispatch('getCartListAsync')
      },
      //商品的复选框
      async changeSelect(skuId,isChecked){
        try{
          await changeCart(skuId,isChecked)
          this.getData()
        }catch(err){
          alert('切换复选框状态失败')
        }
      },
      //改变商品数量,这里添加了一个节流，防止点击过快
      handler:throttle(async function(type,disNum,cart){
            //type用来分辨三个元素
        //disNum用来记录改变的数量
        //cart是商品，里面有商品id
        switch(type){
          //点击加号
          case 'add':
            disNum=1;
            break;
          //点击减号，等于1时传递0（数量保持1不变）
          case 'mins':
            disNum = cart.skuNum<=1?0:-1;
            break;
          //在输入框改变数量
          case 'change':
            if(isNaN(disNum)||disNum<1){
              disNum = 0
            }else{
              disNum = Math.floor(disNum - cart.skuNum)
            }
        }
        try{
          //发送修改请求给服务器
          await this.$store.dispatch('AddSku',{skuId:cart.skuId,skuNum:disNum})
          //重新发送获取数据请求，动态渲染页面
          this.getData()
        }catch(err){
          alert('修改数据失败')
        }
        },700),
      //删除某个商品
      async clickDeleteCart(skuId){
        try{
          //向服务器发送删除请求
          await deleteCart(skuId)
          //重新渲染数据
          this.getData()
        }catch(err){
          alert('删除失败，请稍后再试')
        }
      },
      //删除所有选中的商品
      deleteAllChangeCart(){
       // this.$store.dispatch('deleteChangeCart')
        let promiseAll = []
        this.cartInfoList.forEach(cart=>{
          //判断是否勾选
          if(cart.isChecked==1){
            let promise = this.clickDeleteCart(cart.skuId)
            //console.log(this.clickDeleteCart(cart.skuId)); 返回的是多个promise，可以用promise.all来获取删除结果，如果但凡有一个promise失败，那返回的结果就是失败
            //把promise收集起来，到后面用promise.all执行
            promiseAll.push(promise)
          }
        })
        try{
          Promise.all(promiseAll)
          //删除成功后重新加载页面
          this.getData()
        }catch(err){
          console.log('删除失败');
        }
      },
      //点击全选按钮
      updateAllChangeCart(event){
        let isChecked = event.target.checked?'1':'0';
        this.cartList.cartInfoList.forEach(cart=>{
          this.changeSelect(cart.skuId,isChecked)
        })
        this.getData()
      }
    }
  }
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 15%;
          }

          .cart-list-con2 {
            width: 35%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }


          .cart-list-con4 {
            width: 10%;

          }

          .cart-list-con5 {
            width: 17%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 10%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 13%;

            a {
              color: #666;
              cursor: pointer;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>