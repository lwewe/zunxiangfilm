<template>
  <div class="securitycards">

    <ReturnBack :rcolor="'#fff'" :bcolor="'rgba(0,0,0,0.3)'" v-if="!change"></ReturnBack>
    <!--    <van-tabs :line-width="20" v-model="active" @change="onClickTab">-->
    <!--      <van-tab title="可使用">-->
    <!--      </van-tab>-->
    <!--      <van-tab title="不可用">-->
    <!--      </van-tab>-->
    <!--&lt;!&ndash;      <van-tab title="卡合并">&ndash;&gt;-->
    <!--&lt;!&ndash;      </van-tab>&ndash;&gt;-->
    <!--    </van-tabs>-->
    <div class="tabs">
      <div v-for="item in tabList" :key="item.id" @click="onClickTab(item.id)">
        <div class="tabText" :class="{tabText1:active==item.id}">{{item.text}}</div>
        <div class="tabImg" v-if="active==item.id">
          <img class="img" src="../../assets/card/del.png" alt="">
        </div>
      </div>
    </div>
    <div>
      <div class="filter" v-if="active==0">
        <span @click="cardsort(0,$event)" class="select">可使用</span>
        <span @click="cardsort(1,$event)" class="select">即将过期</span>
        <span @click="sortA(2,$event)" class="select sort" style="position: relative;padding-right: 20px;">
            点数

              <img src="../../assets/Group 919.png" alt="" style="width: 10px;position: absolute;top: 6px;right: 6px;">
              <img src="../../assets/Group 920.png" alt="" style="width: 10px;position: absolute;top: 11px;right: 6px;">

          </span>

      </div>
      <div v-if="active==2">
        <div class="tipitsBox">
          <div class="tipits">
            <img class="img" src="../../assets/fukaxq/jg.png" alt="">
          </div>
          <div class="tipitsText">温馨提示：只适用于同类卡进行合并;合并后有效期为最长有效期，余额为相加总金额。</div>
        </div>
        <div class="cardTitle">卡片管理</div>
      </div>
      <div class="cardbody" :class="{cardbody2:change&&active==2,cardbody3:change&&active!=2}"
           :style="{paddingTop:active==2?'0px':'',paddingBottom:active==2?'70px':'10px'}">
        <Loading v-if="isloading"></Loading>
        <!-- 尊享券 -->
        <!-- 超级卡:style="'background-image: url('+item.backImg+')'"  -->
        <div style="position: relative" v-for="(item,index) in list" :key="index" v-if="list.length>0">
          <div v-if="active==2">
            <div class="choose" v-if="!item.isCheckout" @click="chooseCard(item)">选择</div>
            <div class="choose choosed" v-else @click="nochooseCard(item)">已选择</div>
          </div>
          <div :style="'backgroundImage:url('+item.backImg+')'" class="card1" @click="gocardinfo(item)">
            <div class="left">
                <span class="cardtitle"><img v-if="item.pid==1" src="../../assets/card/23.png" alt=""
                                             style="width: 40px;height: 37px;">
                  <span
                      style="padding-top: 2px;" :style="'background: linear-gradient(to right,'+item.btnGradient+'); -webkit-background-clip: text;\n'+
'  background-clip: text;\n'+
'  color: transparent;'">{{ item.cardName }}</span>
                </span>
              <span class="cardaccount" :style="'color:'+item.colorText2+''">{{ item.num }}</span>
              <p class="cardinfo"><span :style="'color:'+item.colorText2+''">余额(点)</span> <span
                  :style="'color:'+item.colorText2+''">有效期</span>
              </p>
              <p class="cardinforesult"><span :style="'background: linear-gradient(to bottom,'+item.btnGradient+');-webkit-background-clip: text;\n'+
'  background-clip: text;\n'+
'  color: transparent;'">{{ item.price }}</span>
                <span :style="'background: linear-gradient(to bottom,'+item.btnGradient+');-webkit-background-clip: text;\n'+
'  background-clip: text;\n'+
'  color: transparent;'">{{ timestampToTime(item.end_time) }}</span></p>
            </div>
            <div class="right">
              <div class="seemore" :style="'border:1px solid '+item.colorText2+';color:'+item.colorText2+''">
                <div>查看权益</div>
                <div class="iconBack" :style="'background-color:'+item.iconColor+';color:'+item.colorText3+''">
                  <van-icon class="jiantou" name="arrow" size="11px" style=""/>
                </div>
              </div>
              <!-- 失效状态 -->
              <button @click.stop="go(item.pid)"
                      :style="'background: linear-gradient(to right,'+item.btnGradient+');color:'+item.btnColor+''">
                立即购买
              </button>
            </div>
          </div>
        </div>
        <!-- 福利券 -->
        <div v-for="(item,index) in list2" :key="index" v-if="list2.length>0" @click="gocardinfo(item)">
          <!-- 超级券 -->
          <div class="voucher1 " :style="'backgroundImage:url('+item.backImg+')'">
            <div class="left">
              <div class="see" :style="'border:1px solid '+item.borderColor+';color:'+item.borderTextColor+''"
                   v-if="item.pid!=10&&item.pid!=11">
                <div style="font-size: 12px;">查看权益</div>
                <div class="iconBack" :style="'background-color:'+item.borderTextColor+''">
                  <van-icon class="jiantou" name="arrow" color="#fff" size="10px"/>
                </div>
              </div>
            </div>
            <div class="center">
              <div class="title titleBox">
                <div style="white-space: nowrap">{{ item.cardName }}</div>
                <div class="seeBox" :style="'border:1px solid '+item.borderColor+';color:'+item.borderTextColor+''"
                     v-if="item.pid==10||item.pid==11">
                  <div style="font-size: 12px;white-space: nowrap">查看权益</div>
                  <div class="iconBack" :style="'background-color:'+item.borderTextColor+''">
                    <van-icon class="jiantou" name="arrow" color="#fff" size="10px"/>
                  </div>
                </div>
              </div>
              <div class="account">{{ item.num }}</div>
              <div class="info"><span>余额(点)</span><span>有效期</span></div>
              <div class="result"><span>{{ item.price }}</span><span>{{ timestampToTime(item.end_time) }}</span></div>
            </div>
            <div class="right">
              <button style="white-space: nowrap" @click.stop="go(item.pid,item.id,item.gid)">立即购买</button>
            </div>
          </div>
        </div>
        <!--        绑卡按钮-->
        <div v-if="active==0" class="bindcard" @click="gobindingCard()">
          <van-icon name="plus" />
          <span>绑定新卡</span>
          <span> 扫码/输入券密绑定</span>
        </div>
      </div>
    </div>
    <!--    合并按钮-->
    <div class="merge" :class="{merge2:change}" v-if="list.length>0&&active==2">
      <div class="mergeBtn" :class="{mergeBtn2:list.filter(item=>item.isCheckout==true).length>1}" @click="mergecards">
        合并
        <span
            v-if="list.filter(item=>item.isCheckout==true).length>0">({{
            list.filter(item => item.isCheckout == true).length
          }})</span>
      </div>
    </div>
    <NProgress v-if="loadingflag"/>
    <ShopTab v-if="change==1" :active="3"></ShopTab>
    <CakeTab v-if="change==2" :active="2"></CakeTab>
    <BookTab v-if="change==3" :active="3"></BookTab>
  </div>
</template>

<script>
import {getCardList, getEnableCard} from "@/api/minecard"
import ShopTab from "@/components/ShopTab.vue";
import CakeTab from "@/components/CakeTab.vue";
import BookTab from "@/components/BookTab.vue";
import {checkmergecards, mergecards} from "@/api/locality/card";
import Loading from "@/components/loding.vue";

export default {
  components: {Loading, CakeTab, ShopTab, BookTab},

  data() {
    return {
      tabList:[
        {
          id:0,
          text:"可使用"
        },
        {
          id:1,
          text:"不可用"
        },
      ],
      active: 0,
      token: null,
      endtime: "2026-12-13",
      list: [],
      list2: [],
      num: 1,
      disablelist: [],
      zanwu: false,
      sort: true,
      loadingflag: false,
      change: "",
      npid: "",
      pidsList: [],
      isloading: false
    };
  },

  mounted() {

  },
  created() {
    this.token = localStorage.getItem("token")
    //加载
    this.loadingflag = true
    this.change = this.$route.query.change || sessionStorage.getItem("change")
    if (this.$route.query.active) {
      this.active = this.$route.query.active
      if (this.active == 0) {
        this.getCards()
      } else if (this.active == 1) {
        this.getEnableCardList()
      } else if (this.active == 2) {
        this.getCards()
      }
    } else {
      this.getCards()
    }
  },

  methods: {
    mergecards() {
      if (this.list.filter(item => item.isCheckout == true).length <= 1) {
        this.$toast("暂无可合并卡")
        return
      }
      var ids = ""
      this.list.filter(item => {
        if (item.isCheckout) {
          ids += item.id + ","
        }
      })
      checkmergecards({
        fulika: ids,
        pid: this.npid
      }).then(res => {
        if (res.code == 200 && res.data) {
          this.messageinfo(res.data, ids)
        } else {
          this.$toast(res.msg)
        }
      })
    },
    messageinfo(data, ids) {
      this.$dialog.confirm({
        message: '即将删除' + data.del_ka_str + ',金额合并到' + data.hb_ka_str + ',合并之后的金额为' + (Number(data.del_ka_price) + Number(data.hb_ka_price)),
        confirmButtonColor: 'red'
      }).then(() => {
        mergecards({
          fulika: ids,
          pid: this.npid,
          code: data.code
        }).then(res => {
          this.$toast(res.msg)
          if (res.code == 200) {
            this.getCards()
          }
        })
      }).catch(() => {
      })

    },
    chooseCard(item) {
      if (this.list.filter(item => item.isCheckout == true).length == 0) {
        this.pidsList = []
      }
      this.npid = item.pid
      this.pidsList.push(this.npid)
      if (this.pidsList[this.pidsList.length - 2] != this.pidsList[this.pidsList.length - 1] && this.pidsList.length > 1) {
        this.pidsList.pop(this.npid)
        this.$toast("只可合并同一类型的卡")
        return
      }
      this.list.forEach(item2 => {
        if (item2.id == item.id) {
          item2.isCheckout = true
        }
      })
    },
    nochooseCard(item) {
      this.list.forEach(item2 => {
        if (item2.id == item.id) {
          item2.isCheckout = false
        }
      })
    },
    onClickTab(e) {
      this.active = e
      this.$router.replace({path: '/SecurityCards', query: {active: e}})
      this.list = []
      this.list2 = []
      if (e == 0) {
        this.getCards()
      } else if (e == 1) {
        this.getEnableCardList()
      } else if (e == 2) {
        this.getCards()
      }
    },
    gocardinfo(item) {
      // backImg = require("../../assets/card/7.png")
      // cardName = "电影券"
      this.$router.push({
        path: "/cardinfo",
        query: {
          id: item.pid,
          cardid: item.id,
          backImg: item.backImg2,
          cardName: item.cardName,
          data: JSON.stringify(item)
        }
      })
    },
    changePid(card_list) {
      if (card_list) {
        var backImg = ""
        var backImg2 = ""
        var cardName = ""
        var colorText2 = ""
        var colorText3 = ""
        var gradient = ""
        var btnGradient = ""
        var btnColor = ""
        var iconColor = ""
        var borderColor = ""
        var borderTextColor = ""
        //卡类型 10-商城尊享券11-电影尊享券12-蛋糕尊享券
        card_list.filter(item2=>item2.pid>=10).forEach(item => {
          if (item.pid == 10) {
            backImg = require("../../assets/card/10.png")
            backImg2 = require("../../assets/card/110.png")
            cardName = "商城尊享券"
            borderColor = "#F69C9E"
            borderTextColor = "#ED343A"
          } else if (item.pid == 11) {
            backImg = require("../../assets/card/11.png")
            backImg2 = require("../../assets/card/100.png")
            cardName = "电影尊享券"
            borderColor = "#BABCCA"
            borderTextColor = "#1D2551"
          }else if (item.pid == 12) {
            backImg = require("../../assets/card/12.png")
            backImg2 = require("../../assets/card/120.png")
            cardName = "蛋糕尊享券"
            borderColor = "#FD8D99"
            borderTextColor = "#FD8D99"
          }
          if (cardName.includes("卡")) {
            this.list.push({
              ...item,
              backImg,
              backImg2,
              cardName,
              colorText2,
              colorText3,
              gradient,
              btnGradient,
              btnColor,
              iconColor,
              borderColor,
              borderTextColor,
              isCheckout: false
            })
          } else {
            this.list2.push({
              ...item,
              backImg,
              backImg2,
              cardName,
              colorText2,
              gradient,
              btnGradient,
              btnColor,
              iconColor,
              borderColor,
              borderTextColor
            })
          }
          // console.log(this.list2)
          // console.log(this.list)
        })
      }
    },
    // 获取可使用卡
    getCards(flag = 1) {
      this.isloading = true
      getCardList({
        token: this.token,
        flag
      }).then(res => {
        this.loadingflag = false
        this.isloading = false
        // console.log(res)
        this.list = []
        this.list2 = []
        if (res.data.card_list.length > 0) {
          this.changePid(res.data.card_list)
        }
        // this.list = res.data.card_list
      })
    },
    // 获取不可用卡
    getEnableCardList() {
      this.isloading = true
      getEnableCard({
        token: this.token
      }).then(res => {
        this.loadingflag = false
        this.isloading = false
        this.list = []
        this.list2 = []
        if (res.data.card_list.length > 0) {
          this.changePid(res.data.card_list)
        }
        if (this.disablelist.length == 0) {
          this.zanwu = true
        }
      })
    },
    // 时间戳转换为日期
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
      return y + '-' + MM + '-' + d
    },
    gobindingCard() {
      this.$router.push({path: "/bindingCard"})
    },
    cardsort(num) {
      document.getElementsByClassName("sort")[0].style.background = "#f0f0f0"
      document.getElementsByClassName("sort")[0].style.color = "#000"
      // var number=[0,1,2]
      var s = document.getElementsByClassName("select")[num]
      // s.style.background="#f0f0f0"
      s.style.background = "#fff1f1"
      s.style.color = "red"
      for (var i = 0; i < 2; i++) {
        if (i != num) {
          var s = document.getElementsByClassName("select")[i]
          s.style.background = "#f0f0f0"
          s.style.color = "#000"
        }
      }
      this.getCards(num + 1)
    },
    go(pid,kid,gid) {
      if (pid >= 10) {
        localStorage.setItem("kid",kid)
        localStorage.setItem("gid",gid)
        localStorage.setItem("pid",pid)
        if(pid==10){
          // window.location.replace(this.$store.state.shopUrl+"/index")
          window.location.href = this.$store.state.shopUrl+"/index"
        }else if (pid == 11) {
          this.$router.push({path: "/index"})
        }else if (pid == 12) {
          // window.location.replace(this.$store.state.cakeUrl+"/index")
          window.location.href = this.$store.state.cakeUrl+"/index"
        }
      }
      // 待操作
    },
    // 排序
    sortA() {
      // console.log(this.sort);
      var s = document.getElementsByClassName("select")[2]
      this.sort = !this.sort
      if (!this.sort) {
        s.style.background = "#fff1f1"
        s.style.color = "red"
        this.getCards(3)
      } else {

        s.style.background = "#fff1f1"
        s.style.color = "red"
        this.getCards(4)
      }
    },


  },
};
</script>

<style scoped>
.securitycards {
  height: 100vh;
  background: #f0f0f0;
  box-sizing: border-box;
}


.securitycards ::v-deep .van-ellipsis {
  font-weight: 600;
}

.securitycards ::v-deep .van-tab--active {
  font-weight: 600 !important;
  font-size: 15px !important;
}

.securitycards .filter {
  font-size: 13px;
  background-color: #fff;
  height: 40px;
  line-height: 40px;
  color: #696969;
}

.securitycards .filter span:nth-of-type(2) {
  padding: 5px 10px;
  background-color: #F7F7F7;
  border-radius: 5px;
}

.securitycards .filter span:nth-of-type(3) {
  padding: 5px 10px;
  background-color: #F7F7F7;
  border-radius: 5px;
}

.select:nth-of-type(1) {
  padding: 5px 10px;
  border-radius: 5px;
  background: #FFF2F2;
  color: #ED343A;
}

.securitycards .filter span:nth-of-type(1) {
  margin-left: 11vw;
}

.securitycards .filter span:nth-of-type(2) {
  margin-left: 9vw;
}

.securitycards .filter span:nth-of-type(3) {
  margin-left: 25vw;
}

.securitycards .cardbody {
  background: #f0f0f0;
  padding-top: 5px;
  padding-left: 20px;
  padding-right: 20px;
}

.securitycards .cardbody .bindcard {
  width: 100%;
  border-radius: 8px;
  background-color: white;
  padding: 22px 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.securitycards .cardbody .bindcard span:nth-of-type(1) {
  font-size: 15px;
  padding-left: 10px;
}
.securitycards .cardbody .bindcard span:nth-of-type(2) {
  font-size: 13px;
  color: #F3A04C;
  padding-left: 15px;
}

/* 尊享券 */
/* 超级卡 */
.securitycards .cardbody .card1 {
  width: 100%;
  height: 200px;
  background-size: 100% 100%;
  border-radius: 20px;
  margin-top: 10px;
  display: flex;
}

.securitycards .cardbody .card1 .left {
  flex: 1.4;
}

.securitycards .cardbody .card1 .left .cardtitle {
  font-weight: 800;
  font-size: 24px;
  //color: #f1dec3;
  /* display: inline-block; */
  display: flex;
  align-content: center;
  padding-top: 50px;
  padding-left: 14px;

}

.securitycards .cardbody .card1 .left .cardaccount {
  color: goldenrod;
  font-size: 13px;
  margin-left: 25px;
  margin-top: 5px;
  display: inline-block;
}

.securitycards .cardbody .card1 .left .cardinfo {
  color: goldenrod;
  font-size: 13px;
  margin-left: 25px;
  margin-top: 30px;
}

.securitycards .cardbody .card1 .left .cardinfo span {
  display: inline-block;
  width: 40%;
}

.securitycards .cardbody .cardinforesult {
  color: #dcc7a8;
  font-size: 15px;
  font-weight: 600;
  margin-left: 25px;
  margin-top: 10px;
}

.securitycards .cardbody .cardinforesult span {
  display: inline-block;
  width: 40%;
}

.securitycards .cardbody .cardinforesult span:nth-of-type(2) {
  width: 55%
}

.securitycards .cardbody .card1 .right {
  flex: 1;
}

.securitycards .cardbody .card1 .right .seemore {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 68px;
  margin-left: 6vw;
  border: 1px solid #999;
  width: 58%;
  border-radius: 50px;
  padding-top: 5px;
  padding-bottom: 5px;
  margin-left: 11vw;
  gap: 5px;
}

.securitycards .cardbody .card1 .right .seemore div {
  font-size: 12px;
}

.securitycards .cardbody .card1 .right button {
  width: 60%;
  font-weight: 800;
  font-size: 15px;
  height: 35px;
  border-radius: 50px;
  border: none;
  background-color: #efdeba;
  color: #b79a73;
  margin-top: 40px;
  margin-left: 40px;
}


/* 超级卡 */
/* ------------------------------------------------------------------------ */
/* 尊享券 */

/* 福利券 */
.securitycards .cardbody .voucher1 {
  width: 100%;
  height: 98px;
  margin-top: 10px;
  background-size: 100% 100%;
  display: flex;
  padding-bottom: 10px;
}

.securitycards .cardbody .voucher1 .left {
  flex: 0.5;
}

.securitycards .cardbody .voucher1 .left .see {
  border: 1px solid red;
  width: 70px;
  border-radius: 50px;
  padding-top: 1px;
  padding-bottom: 1px;
  text-align: center;
  margin-top: 67px;
  margin-left: 5px;
  display: flex;
  align-items: center;
  gap: 3px;
  justify-content: center;
  padding: 3px 2px;
}

.seeBox {
  border: 1px solid red;
  width: 70px;
  border-radius: 50px;
  padding-top: 1px;
  padding-bottom: 1px;
  text-align: center;
  display: flex;
  align-items: center;
  gap: 3px;
  justify-content: center;
  padding: 3px 2px;
}

.securitycards .cardbody .voucher1 .left .see div {

}

.securitycards .cardbody .voucher1 .center {
  flex: 1;
  margin-left: 15px;
}

.securitycards .cardbody .voucher1 .center .title {
  margin-top: 13px;
  font-weight: 600;
  font-size: 13px;
}

.securitycards .cardbody .voucher1 .center .account {
  color: #999999;
  font-size: 12px;
  margin-top: 3px;
  margin-block: 3px;
}

.securitycards .cardbody .voucher1 .center .info {
  font-size: 11px;
  font-weight: 600;
}

.securitycards .cardbody .voucher1 .center .info span {
  display: inline-block;
  width: 40%;
}

.securitycards .cardbody .voucher1 .center .result {
  margin-top: 2px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
}

.securitycards .cardbody .voucher1 .center .result span {
  color: #999999;
  display: inline-block;
  width: 40%;
}

.securitycards .cardbody .voucher1 .right {
  flex: 0.5;
}

.securitycards .cardbody .voucher1 .right button {
  background: #ed3036;
  color: #fff;
  border-radius: 50px;
  border: none;
  font-size: 12px;
  padding-left: 2vw;
  padding-right: 2vw;
  padding-top: 5px;
  padding-bottom: 5px;
  margin-top: 35px;
  margin-left: 2vw;
}

/* 超级券 */

>>> .van-tabs--line {
  padding-top: 30px !important;
}

.iconBack {
  border-radius: 50%;
  width: 10px;
  height: 10px;
  padding: 2px;
}

.jiantou {
  margin-top: -1px;
  display: flex;
}

.tipits {
  width: 14px;
  height: 14px;
}

.tipitsText {
  font-size: 13px;
  color: #939393;
  width: calc(100% - 19px);
  line-height: 17px;
}

.tipitsBox {
  padding: 25px 25px 15px;
  display: flex;
  gap: 5px;
}

.cardTitle {
  text-align: center;
  font-weight: bold;
  font-size: 15px;
}

.choose {
  position: absolute;
  top: -4px;
  right: -4px;
  background-image: linear-gradient(to right, #FCB1B1, #EE8685);
  color: white;
  border-bottom-left-radius: 15px;
  border-top-right-radius: 15px;
  width: 60px;
  height: 35px;
  text-align: center;
  line-height: 35px;
  font-size: 14px;
  letter-spacing: 1px;
}

.choosed {
  background-image: linear-gradient(to right, #FB6968, #DC0A08);
}

.merge {
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: white;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding: 10px 23px;
  box-sizing: border-box;
  font-size: 14px;
}

.merge2 {
  bottom: 50px;
}

.mergeBtn {
  background-image: linear-gradient(to right, #FDC3C3, #F3A1A0);
  width: 100px;
  height: 38px;
  text-align: center;
  line-height: 38px;
  border-radius: 30px;
  color: white;
}

.mergeBtn2 {
  background-image: linear-gradient(to right, #FB6968, #DD0B09);
}

.cardbody2 {
  padding-bottom: 120px !important;
}

.cardbody3 {
  padding-bottom: 60px !important;
}

.titleBox {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 85%;
  gap: 10px;
}
.tabs{
  background-color: white;
  padding: 10px 10px 0px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  box-sizing: border-box;
}
.tabImg{
  width: 55px;
  margin: auto;
  margin-top: -10px;
}
.tabText{
  position: relative;
  z-index: 1;
  color: #646464;
  font-size: 13px;
}
.tabText1{
  font-weight: bold;
  font-size: 15px;
  color: black;
}
</style>