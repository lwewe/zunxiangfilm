<template>
  <div class="pageMax">
    <div v-for="item in orderList" :key="item.id">
      <!--    电影-->
      <div class="listItem" v-if="item.ord_bs==1" @click="tomoveOrder(item.id)">
        <div class="orderNo">
          <div class="orderNum">订单号: <span>{{ item.order_id }}</span></div>
          <!--    订单状态-->
          <div v-if="item.type==1">
            <!--            "orderstatus": "N", //N：待支付-->
            <!--            //C：已取消-->
            <!--            //E：订单有效期过后，没有收到付款通知-->
            <!--            //P：已付款-->
            <!--            //T：通知处理中-->
            <!--            //S：出票成功-->
            <!--            //F：出票失败，等待退款-->
            <!--            //R：退款完成-->
            <div class="time" v-if="item.orderstatus=='N'">待付款</div>
            <div class="otherType" v-if="item.orderstatus=='C'">已取消</div>
            <div class="otherType" v-if="item.orderstatus=='E'">订单已过期</div>
<!--                        <div class="otherType" v-if="item.orderstatus=='N'">已完成</div>-->
            <div class="otherType" v-if="item.orderstatus=='S'">已出票</div>
            <div class="otherType" v-if="item.orderstatus=='P'">已付款</div>
            <div class="otherType" v-if="item.orderstatus=='T'">通知处理中</div>
            <div class="otherType" v-if="item.orderstatus=='F'">出票失败，等待退款</div>
            <div class="otherType" v-if="item.orderstatus=='R'">退款完成</div>
          </div>
          <div v-else>
            <div class="time" v-if="item.orderstatus==0">待付款</div>
            <div class="otherType" v-if="item.orderstatus==1">待出票</div>
            <div class="otherType" v-if="item.orderstatus==2">已取消</div>
            <div class="otherType" v-if="item.orderstatus==4">出票成功</div>
            <div class="otherType" v-if="item.orderstatus==7">出票失败(退款)</div>
            <div class="otherType" v-if="item.orderstatus=='8'">超时未付(取消)</div>
            <div class="otherType" v-if="item.orderstatus=='11'">正在出票</div>
          </div>
        </div>
        <!--      影片-->
        <div class="filmBox">
          <div class="film">
            <div class="filmImg">
              <img class="img" :src="item.movielogo" alt="">
            </div>
            <div class="rightBox">
              <div class="filmName">{{ item.moviename }}</div>
              <div class="startTime" style="margin-top: 5px">{{ item.playtime }}</div>
              <div class="startTime textBox">{{ item.cinemaname }}</div>
              <div class="seat textBox" v-if="item.seats">
                <span v-for="item2 in item.seats.split(',')">{{ item2 }}</span>
              </div>
            </div>
          </div>
          <div class="btnBox" @click="gopay(item.id,item.type==2?1:0)">
            <van-button class="btnno" type="danger"  v-if="item.orderstatus=='N'||item.orderstatus==0">去支付</van-button>
          </div>
        </div>
        <!--      价格-->
        <div class="priceBox">
          <div>共{{ item.quantity }}张</div>
          <div>
            总计: <span class="priceNum">{{ item.showamount }}</span><span class="first">元</span>
          </div>
        </div>
      </div>
      <!--    卡券-->
      <div class="listItem" v-if="item.ord_bs==2" @click="tocardOrder(item.id)">
        <div class="orderNo">
          <div class="orderNum orderTime">{{ timestampToTime(item.add_time) }}</div>
          <!--    订单状态-->
          <div>
            <!--          <div class="time">支付剩余时间 10:25</div>-->
            <!--                    <div class="otherType">已取消</div>-->
            <div class="otherType" v-if="item.state==2">交易成功</div>
            <!--                    <div class="otherType">待使用</div>-->
          </div>
        </div>
        <!--      影片-->
        <div class="filmBox"  v-if="item.kaquan">
          <div class="film">
            <div class="filmImg cardImg">
              <img class="img" :src=" item.kaquan.img" alt="">
            </div>
            <div class="rightBox">
              <div class="filmName">{{ item.kaquan.title }}</div>
              <div class="startTime textBox" style="margin-top: 0px">{{ item.kaquan.gueige }}</div>
            </div>
          </div>
          <div>
            <!--          <div class="btnBox">-->
            <!--            <van-button class="btnno" type="danger">去支付</van-button>-->
            <!--          </div>-->
            <div class="payNum">×{{ item.number }}</div>
          </div>
        </div>
        <!--      价格-->
        <div class="priceBox priceBottom">
          <div>共1件商品</div>
          <div>
            总计: <span class="priceNum">{{ item.total_fee }}</span><span class="first">元</span>
          </div>
        </div>
        <div class="button">
          <div class="cancel">查看详情</div>
          <!--          <div class="cancel toPay">去支付</div>-->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "OrderList",
  props: {
    orderList: [Object, Array],
  },
  data(){
    return{

    }
  },
  methods: {
    gopay(id,new1){
      this.$router.push({path:"/paymentpage",query:{order:id,change:0,new:new1}})
    },
    tomoveOrder(id){
      this.$router.push({path:"/orderpage",query:{id}})
      
    },
    tocardOrder(id){
      this.$router.push({path:"/cardorderinfo",query:{id}})
    },
    timestampToTime(time) {
      // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var date = new Date(time * 1000)
      let y = date.getFullYear()
      let MM = date.getMonth() + 1
      MM = MM < 10 ? ('0' + MM) : MM
      let d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      let h = date.getHours()
      h = h < 10 ? ('0' + h) : h
      let m = date.getMinutes()
      m = m < 10 ? ('0' + m) : m
      let s = date.getSeconds()
      s = s < 10 ? ('0' + s) : s
      return y + '-' + MM + '-' + d + " " + h + ":" + m + ":" + s
    },
  }
}
</script>

<style scoped lang="less">
.pageMax {
  padding: 0px 10px 15px;
}

.listItem {
  background-color: white;
  border-radius: 10px;
  margin-top: 10px;
  padding: 15px 18px;
  //订单号
  .orderNo {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .orderNum {
      font-size: 12px;
      color: #878787;
      font-weight: bold;
    }

    .time {
      font-size: 13px;
      font-weight: bold;
      color: #EE3F45;
      white-space: nowrap;
    }

    .otherType {
      font-size: 14px;
      //font-weight: bold;
      color: #B6B6B6;
    }
  }

  //  影片
  .filmBox {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 15px;

    .film {
      display: flex;
      align-items: center;
      gap: 14px;
      width: 78%;

      .filmImg {
        width: 73px;
        border-radius: 3px;
        overflow: hidden;
      }

      .rightBox {
        display: flex;
        flex-direction: column;
        gap: 5px;
        width: 65%;
      }

      .filmName {
        font-size: 14px;
        font-weight: bold;
        margin-top: -10px;
      }

      .startTime {
        font-size: 12px;
        color: #818080;
      }

      .seat {
        //display: flex;
        //align-items: center;
        //gap: 4px;
        font-size: 12px;
        color: #818080;
        white-space: nowrap;
        margin-left: -4px;
      }

      .seat span {
        padding-left: 4px;
      }
    }

    .btnBox {
      min-width: 56px;
    }

    .btnno {
      background-color: #ED3036 !important;
      border-radius: 30px !important;
      width: 100%;
      height: 28px !important;
      line-height: 27px !important;
      margin-top: 10px;
      font-size: 12px;
      white-space: nowrap;
      padding: 0;
    }
  }

  //  价格
  .priceBox {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
    color: #818080;
    margin-top: 8px;

    .priceNum {
      color: #EF4E53;
      font-weight: bold;
      font-size: 17px;
    }

    .first {
      color: #EF4E53;
      font-weight: bold;
    }
  }
}

//卡券
.orderTime {
  color: #292929 !important;
}

.payNum {
  color: #979797;
  font-size: 14px;
}

.cardImg {

}

.priceBottom {
  //border-top: 1px solid #F3F3F3;
  //padding-top: 6px !important;
}

.textBox {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
}
.button {
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: flex-end;
  width: 100%;
  border-top: 1px solid #F6F6F6;
  padding-top: 8px;
  margin-top: 5px;

  .cancel {
    color: #949393;
    border-radius: 30px;
    border: 1px solid #949393;
    text-align: center;
    width: 70px;
    height: 25px;
    line-height: 25px;
    font-size: 13px;
  }

  .toPay {
    color: white;
    background-color: #ED3036;
    border: 1px solid #ED3036;
  }
}
</style>