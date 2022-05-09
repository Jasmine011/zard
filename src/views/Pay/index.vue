<template>
  <div class="pay-main">
    <div class="pay-container">
      <div class="checkout-tit">
        <h4 class="tit-txt">
          <span class="success-icon"></span>
          <span class="success-info"
            >订单提交成功，请您及时付款，以便尽快为您发货~~</span
          >
        </h4>
        <div class="paymark">
          <span class="fl"
            >请您在提交订单<em class="orange time">4小时</em
            >之内完成支付，超时订单会自动取消。订单号：<em>{{
              orderId
            }}</em></span
          >
          <span class="fr"
            ><em class="lead">应付金额：</em
            ><em class="orange money">￥{{ orderInfo.totalFee }}</em></span
          >
        </div>
      </div>
      <div class="checkout-info">
        <h4>重要说明：</h4>
        <ol>
          <li>
            尚品汇商城支付平台目前支持<span class="zfb">支付宝</span>支付方式。
          </li>
          <li>其它支付渠道正在调试中，敬请期待。</li>
          <li>为了保证您的购物支付流程顺利完成，请保存以下支付宝信息。</li>
        </ol>
        <h4>
          支付宝账户信息：（很重要，<span class="save">请保存！！！</span>）
        </h4>
        <ul>
          <li>支付帐号：11111111</li>
          <li>密码：111111</li>
          <li>支付密码：111111</li>
        </ul>
      </div>
      <div class="checkout-steps">
        <div class="step-tit">
          <h5>支付平台</h5>
        </div>
        <div class="step-cont">
          <ul class="payType">
            <li><img src="./images/pay2.jpg" /></li>
            <li><img src="./images/pay3.jpg" /></li>
          </ul>
        </div>
        <div class="hr"></div>

        <div class="payshipInfo">
          <div class="step-tit">
            <h5>支付网银</h5>
          </div>
          <div class="step-cont">
            <ul class="payType">
              <li><img src="./images/pay10.jpg" /></li>
              <li><img src="./images/pay11.jpg" /></li>
              <li><img src="./images/pay12.jpg" /></li>
              <li><img src="./images/pay13.jpg" /></li>
              <li><img src="./images/pay14.jpg" /></li>
              <li><img src="./images/pay15.jpg" /></li>
              <li><img src="./images/pay16.jpg" /></li>
              <li><img src="./images/pay17.jpg" /></li>
              <li><img src="./images/pay18.jpg" /></li>
              <li><img src="./images/pay19.jpg" /></li>
              <li><img src="./images/pay20.jpg" /></li>
              <li><img src="./images/pay21.jpg" /></li>
              <li><img src="./images/pay22.jpg" /></li>
            </ul>
          </div>
        </div>
        <div class="hr"></div>

        <div class="submit">
          <a class="btn" @click="toPay">立即支付</a>
        </div>
        <div class="otherpay">
          <div class="step-tit">
            <h5>其他支付方式</h5>
          </div>
          <div class="step-cont">
            <span><a href="weixinpay.html" target="_blank">微信支付</a></span>
            <span>中国银联</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//生成支付二维码
import QRCode from "qrcode";
export default {
  name: "Pay",
  data() {
    return {
      //存储支付订单信息
      orderInfo: {},
      //监听是否支付成功的定时器
      timer: null,
      //支付状态码
      code: "",
    };
  },
  computed: {
    orderId: function () {
      return this.$route.query.orderId;
    },
  },
  mounted() {
    this.getPay();
  },
  methods: {
    //获取支付页面订单信息
    async getPay() {
      let result = await this.$API.getPayInfo(this.orderId);
      // console.log(result);
      if (result.code == 200) {
        this.orderInfo = result.data;
      } else {
        //获取支付信息失败
        console.log("获取支付信息失败", result);
      }
    }, 
    //点击立即支付按钮
    async toPay() {
      this.orderInfo.codeUrl =
        "wxp://f2f0-8XQWflwaaOYxVt-_ZztK5wZrDzNXv_fecdpcsYjN-i2HLK9nOujIHYb3PiFHc0q"; //因为后台返回的qr码已失效，我们手动给一个
      let Url = await QRCode.toDataURL(this.orderInfo.codeUrl);
      this.$alert(`<img src=${Url} />`, "请用微信支付", {
        //Vue.prototype.$alert = MessageBox.alert;
        dangerouslyUseHTMLString: true,
        //MessageBox 是否显示右上角关闭按钮
        showClose: false,
        //showCancelButton
        showCancelButton: true,
        //取消按钮的文本内容
        cancelButtonText: "支付遇见问题",
        //确定按钮的文本内容
        confirmButtonText: "支付已完成",
        //是否居中布局
        center: true,
        //配置用户点击按钮
        beforeClose: (type,instance,done) => {
          //type可判断用户点击的是哪个按钮
          //console.log(type);
          if ((type == "cancel")) {
            alert("请联系客服");
            clearInterval(this.timer);
            this.timer = null;
            //关闭支付弹窗
            done();
          } else {
            this.code=200
            //点击已支付按钮
            if (this.code == 200) {
              //说明支付成功了
              clearInterval(this.timer);
              this.timer = null;
              //关闭支付弹窗
              done();
              this.$router.push('/PaySuccess')
              //这里模拟已经支付成功
            }
          }
        },
      });
      //支付成功跳转路由，支付失败跳出提示
      if (!this.timer) {
        this.timer = setInterval(async () => {
          //获取支付状态，监听是否支付
          let result = await this.$API.getPayStatus(this.orderInfo.orderId);
          //console.log(result); 
          if (result.code == 200) {
            //清除定时器
            clearInterval(this.timer);
            this.timer = null;
            //保存返回的code
            this.code = result.code;
            //隐藏支付框
            this.$msgbox.close();
            //路由跳转到支付成功的提示页面
            this.$router.push("/PaySuccess");
          }
        }, 1000);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.pay-main {
  margin-bottom: 20px;

  .pay-container {
    margin: 0 auto;
    width: 1200px;

    a:hover {
      color: #4cb9fc;
    }

    .orange {
      color: #e1251b;
    }

    .money {
      font-size: 18px;
    }

    .zfb {
      color: #e1251b;
      font-weight: 700;
    }

    .checkout-tit {
      padding: 10px;

      .tit-txt {
        font-size: 14px;
        line-height: 21px;

        .success-icon {
          width: 30px;
          height: 30px;
          display: inline-block;
          background: url(./images/icon.png) no-repeat 0 0;
        }

        .success-info {
          padding: 0 8px;
          line-height: 30px;
          vertical-align: top;
        }
      }

      .paymark {
        overflow: hidden;
        line-height: 26px;
        text-indent: 38px;

        .fl {
          float: left;
        }

        .fr {
          float: right;

          .lead {
            margin-bottom: 18px;
            font-size: 15px;
            font-weight: 400;
            line-height: 22.5px;
          }
        }
      }
    }

    .checkout-info {
      padding-left: 25px;
      padding-bottom: 15px;
      margin-bottom: 10px;
      border: 2px solid #e1251b;

      h4 {
        margin: 9px 0;
        font-size: 14px;
        line-height: 21px;
        color: #e1251b;
      }

      ol {
        padding-left: 25px;
        list-style-type: decimal;
        line-height: 24px;
        font-size: 14px;
      }

      ul {
        padding-left: 25px;
        list-style-type: disc;
        line-height: 24px;
        font-size: 14px;
      }
    }

    .checkout-steps {
      border: 1px solid #ddd;
      padding: 25px;

      .hr {
        height: 1px;
        background-color: #ddd;
      }

      .step-tit {
        line-height: 36px;
        margin: 15px 0;
      }

      .step-cont {
        margin: 0 10px 12px 20px;

        ul {
          font-size: 0;

          li {
            margin: 2px;
            display: inline-block;
            padding: 5px 20px;
            border: 1px solid #ddd;
            cursor: pointer;
            line-height: 18px;
          }
        }
      }
    }

    .submit {
      text-align: center;

      .btn {
        display: inline-block;
        padding: 15px 45px;
        margin: 15px 0 10px;
        font: 18px "微软雅黑";
        font-weight: 700;
        border-radius: 0;
        background-color: #e1251b;
        border: 1px solid #e1251b;
        color: #fff;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
        user-select: none;
        text-decoration: none;
      }
    }
  }
}
</style>