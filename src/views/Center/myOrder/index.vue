<template>
    <div class="order-right">
          <div class="order-content">
            <div class="title">
              <h3>我的订单</h3>
            </div>
            <div class="chosetype">
              <table>
                <thead>
                  <tr>
                    <th width="29%">商品</th>
                    <th width="31%">订单详情</th>
                    <th width="13%">收货人</th>
                    <th>金额</th>
                    <th>状态</th>
                    <th>操作</th>
                  </tr>
                </thead>
              </table>
            </div>
            <div class="orders">

              <table class="order-item" v-for="(order) in orderList.records" :key="order.id">
                <thead>
                  <tr>
                    <th colspan="5">
                      <span class="ordertitle">{{order.createTime}}　订单编号：{{order.consigneeTel}} <span
                          class="pull-right delete"><img src="../images/delete.png"></span></span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(cart,index) in order.orderDetailList" :key="cart.id">
                    <td width="60%">
                      <div class="typographic">
                        <img :src="cart.imgUrl" style="height:100px;width:100px">
                        <a href="#" class="block-text">{{cart.skuName}}</a>
                        <span>x{{cart.skuNum}}</span>
                        <a href="#" class="service">售后申请</a>
                      </div>
                    </td>
                    <td :rowspan="order.orderDetailList.length" width="8%" class="center" v-if="index==0">{{order.consignee}}</td>
                    <td :rowspan="order.orderDetailList.length" width="13%" class="center" v-if="index==0">
                      <ul class="unstyled">
                        <li>总金额¥{{order.totalAmount}}</li>
                        <li>在线支付</li>

                      </ul>
                    </td>
                    <td :rowspan="order.orderDetailList.length" width="8%" class="center" v-if="index==0">
                      <a href="#" class="btn">{{order.orderStatusName}} </a>
                    </td>
                    <td :rowspan="order.orderDetailList.length" width="13%" class="center" v-if="index==0">
                      <ul class="unstyled">
                        <li>
                          <a href="mycomment.html" target="_blank">评价|晒单</a>
                        </li>

                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="choose-order">
              <Pagination :pageNo="page" :pageSize="limit" :total="orderList.total" :continues="5" @getPage="getPage"/>
            </div>
          </div>
          </div>
</template>
<script>
export default {
  name: "MyOrder",
  data() {
    return {
      page: 1,
      limit: 3,
      orderList: {},
    };
  },
  mounted() {
    this.getMyOrder();
  },
  methods: {
    //发送请求获取我的订单列表
    async getMyOrder() {
      let { page, limit } = this;
      let result = await this.$API.getMyOrderList(page, limit);
      console.log(result);
      if (result.code == 200) {
        this.orderList = result.data;
      }
    },
    //获取当前页数
    getPage(page){
      this.page = page
      //根据页码重新获取数据
      this.getMyOrder()
    }
  },
};
</script>
<style lang="">
</style>