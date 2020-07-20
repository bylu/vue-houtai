<template>
  <div class="app-container">
    <h3 class="showTit">用户基本信息</h3>
    <el-row :gutter="32">
      <el-form ref="from" :model="form">
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.userID" size="small" placeholder="用户ID" clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.gameid" size="small" placeholder="游戏ID" clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.account" size="small" placeholder="账号" clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.nicename" size="small" placeholder="昵称" clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="6" v-has="'userProfile_search'" >
          <el-button type="primary" size="small"   @click="onSubmitMoney()">财富查询</el-button>
          <el-button type="danger"  size="small"   @click="onSubmitBaseinfo()">基本信息</el-button>
           <el-button type="success" size="small"  @click="onSubmitLogin()">登录信息</el-button>
        </el-col>
      </el-form>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-card :class="classtype == true ?'box-cardPhone':'box-card'" v-show="moneyinfotable">
          <div slot="header" class="clearfix">
            <span>财富信息</span>
          </div>
          <div v-for="(money,i) in moneytableData" :key="i" class="text item">
              <div :class="classtype == true ?'showItemPhone':'showItem'" >
                <label>总幸运豆数量: </label><span>{{money.sumscore  | numTenthousand }}</span>
              </div>
              <div :class="classtype == true ?'showItemPhone':'showItem'" >
                <label>用户输赢总计:</label><span> {{money.winLoseScore | numTenthousand }}</span>
              </div>
              <div :class="classtype == true ?'showItemPhone':'showItem'">
                <label>奖卷总数量:</label><span>  {{money.userLotteryNum | null2Zero }}</span>
              </div>
              <div :class="classtype == true ?'showItemPhone':'showItem'">
                <label>携带幸运豆:</label><span> {{money.score | numTenthousand }}</span>
              </div>
              <div :class="classtype == true ?'showItemPhone':'showItem'">
                <label>银行幸运豆:</label><span> {{money.insureScore | numTenthousand }}</span>
              </div>
              <div :class="classtype == true ?'showItemPhone':'showItem'">
                <label>大转盘获取奖券:</label><span> {{money.gameinlotterynum | null2Zero }}</span>
              </div>
              <div :class="classtype == true ?'showItemPhone':'showItem'">
                <label>后台赠送幸运豆:</label><span> {{money.addscore | numTenthousand }}</span>
              </div>
              <div :class="classtype == true ?'showItemPhone':'showItem'">
                <label>游戏税收幸运豆:</label><span> {{money.revenue | numTenthousand }}</span>
              </div>
              <div :class="classtype == true ?'showItemPhone':'showItem'">
                <label>系统奖励幸运豆:</label><span> {{money.systemSendScore | numTenthousand }}</span>
              </div>
              <div :class="classtype == true ?'showItemPhone':'showItem'">
                <label>签到获得幸运豆:</label><span> {{money.qiandaoScore | numTenthousand }}</span>
              </div>
              <div :class="classtype == true ?'showItemPhone':'showItem'">
                <label>水晶:</label><span> {{money.userCrystalNum | numTenthousand }}</span>
              </div>

              <div :class="classtype == true ?'showItemPhone':'showItem'">
                <label>绑定邮箱:</label><span> {{money.email | checkEmail }}</span>
              </div>
              <div :class="classtype == true ?'showItemPhone':'showItem'">
                <label>绑定手机:</label><span> {{money.mobilePhone | checkMobiphone }}</span>
              </div>
              <div :class="classtype == true ?'showItemPhone':'showItem'">
                <label>水晶使用:</label>
                <span style="color:#1890ff;cursor: pointer;" @click="openWindowByShopGoodsRecord(money.gameID)">{{money.userCrystalConsume}}</span>
              </div>
              <div :class="classtype == true ?'showItemPhone':'showItem'">
                <label>金币兑换幸运豆:</label><span>{{money.goldScore | numTenthousand }}</span>
              </div>
              <div :class="classtype == true ?'showItemPhone':'showItem'">
                <label>奖券兑换幸运豆:</label><span> {{money.duihuanScore | numTenthousand }}</span>
              </div>
              <div :class="classtype == true ?'showItemPhone':'showItem'">
                <label>奖券兑换礼品:</label><span> {{money.shoplotterynum}}</span>
              </div>
              <div :class="classtype == true ?'showItemPhone':'showItem'">
                <label>中奖获得幸运豆:</label><span>  {{money.gameGetScore | numTenthousand }}</span>
              </div>
              <div :class="classtype == true ?'showItemPhone':'showItem'">
                <label>经验:</label><span> {{money.currExp}}</span>
              </div>
              <div :class="classtype == true ?'showItemPhone':'showItem'">
                <label>等级:</label><span> {{money.currLevel}}</span>
              </div>
          </div>
        </el-card>

        <el-card :class="classtype == true ?'box-cardPhone':'box-card'" v-show="baseinfoTable">
          <div slot="header" class="clearfix">
            <span>基本信息</span>
          </div>
          <div v-for="(baseinfo,i) in baseinfotableData" :key="i" class="text item">
              <div :class="classtype == true ?'showItem1Phone':'showItem1'">
                <label>用户ID: </label><span>{{baseinfo.userID }}</span>
              </div>
              <div :class="classtype == true ?'showItem1Phone':'showItem1'">
                <label>游戏ID:</label><span> {{baseinfo.gameID }}</span>
              </div>
              <div :class="classtype == true ?'showItem1Phone':'showItem1'">
                <label>用户账号:</label><span>  {{baseinfo.accounts}}</span>
              </div>
              <div :class="classtype == true ?'showItem1Phone':'showItem1'">
                <label>用户昵称:</label><span> {{baseinfo.nickName}}</span>
              </div>
              <div :class="classtype == true ?'showItem1Phone':'showItem1'">
                <label>账号状态:</label><span> {{baseinfo.nullity | permissiontype }}</span>
              </div>
              <div :class="classtype == true ?'showItem1Phone':'showItem1'">
                <label>会员等级:</label><span> {{baseinfo.memberOrder }}</span>
              </div>
              <div :class="classtype == true ?'showItem1Phone':'showItem1'">
                <label>总充值金额:</label>
                <span style="color:#1890ff;cursor: pointer;" @click="openWindowByShareDetailInfo(baseinfo.payamountSum)"> {{baseinfo.payamountSum}}</span>
              </div>
              <div :class="classtype == true ?'showItem1Phone':'showItem1'">
                <label>充值次数:</label><span> {{baseinfo.paytimescount }}</span>
              </div>

              <div :class="classtype == true ?'showItem1Phone':'showItem1'">
                <label>渠道:</label>
                <span style="color:#1890ff;cursor: pointer;" @click="openWindowBySpreaderAchievement(baseinfo.spreaderID)">{{baseinfo.spreaderID}}({{baseinfo.spreaderName | null2empty }})</span>
              </div>
              <div :class="classtype == true ?'showItem1Phone':'showItem1'">
                <label>玩家的渠道账号ID:</label><span> {{baseinfo.passPortID }}</span>
              </div>

              <div :class="classtype == true ?'showItem1Phone':'showItem1'">
                <label>赠送弹头安全码:</label><span>{{baseinfo.givepassword  }}</span>
              </div>
              <div :class="classtype == true ?'showItem1Phone':'showItem1'">
                <label>邮箱:</label><span> {{baseinfo.email | checkEmail }}</span>
              </div>
              <div :class="classtype == true ?'showItem1Phone':'showItem1'">
                <label>QQ:</label><span> {{baseinfo.qq}}</span>
              </div>

              <div :class="classtype == true ?'showItem1Phone':'showItem1'">
                <label>手机号码:</label><span> {{baseinfo.mobilePhone | checkMobiphone }}</span>
              </div>
          </div>
        </el-card>

        <el-card :class="classtype == true ?'box-cardPhone':'box-card'"  v-show="logininfoTable">
          <div slot="header" class="clearfix">
            <span>登录信息</span>
          </div>
          <div v-for="(logininfo,i) in logininfotableData" :key="i" class="text item">
              <div :class="classtype == true ?'showItem1Phone':'showItem1'">
                <label>登录次数: </label><span>{{logininfo.gameLogonTimes }}</span>
              </div>
              <div :class="classtype == true ?'showItem1Phone':'showItem1'">
                <label>最后登录渠道:</label><span> {{logininfo.spreaderID }} ({{logininfo.spreaderName | null2empty}})</span>
              </div>
              <div :class="classtype == true ?'showItem1Phone':'showItem1'">
                <label>最后登录版本:</label><span>  {{logininfo.versionNo}}</span>
              </div>
              <div :class="classtype == true ?'showItem1Phone':'showItem1'">
                <label>最后登录时间:</label><span> {{logininfo.lastLogonDate}}</span>
              </div>
               <div :class="classtype == true ?'showItem1Phone':'showItem1'">
                <label>最后登录IP:</label>
                <span style="color:#1890ff;cursor: pointer;" @click="openWindow(logininfo,1)"> {{logininfo.lastLogonIP}}</span>
              </div>
              <div :class="classtype == true ?'showItem1Phone':'showItem1'">
                <label>最后登录地址:</label><span> {{logininfo.lastLoginAddress  }}</span>
              </div>
              <div :class="classtype == true ?'showItem1Phone':'showItem1'">
                <label>登录机器码:</label>
                <span style="color:#1890ff;cursor: pointer;" @click="openWindow(logininfo,2)"> {{logininfo.lastlogonmachine }}</span>
              </div>
              <div :class="classtype == true ?'showItem1Phone':'showItem1'">
                <label>注册IP:</label>
                <span style="color:#1890ff;cursor: pointer;" @click="openWindow(logininfo,3)"> {{logininfo.registerIP}}</span>
              </div>
              <div :class="classtype == true ?'showItem1Phone':'showItem1'">
                <label>注册地址:</label><span> {{logininfo.registerAddress }}</span>
              </div>

              <div :class="classtype == true ?'showItem1Phone':'showItem1'">
                <label>注册时间:</label><span> {{logininfo.registerDate }}</span>
              </div>

              <div :class="classtype == true ?'showItem1Phone':'showItem1'">
                <label>注册机器码:</label>
                <span style="color:#1890ff;cursor: pointer;" @click="openWindow(logininfo,4)" > {{logininfo.registerMachine }}</span>
              </div>

              <!--<div :class="classtype == true ?'showItem1Phone':'showItem1'">
                <label>邮箱:</label><span> {{logininfo.email | checkEmail }}</span>
              </div>
              <div :class="classtype == true ?'showItem1Phone':'showItem1'">
                <label>赠送弹头安全码:</label><span>{{logininfo.givepassword  }}</span>
              </div>

              <div :class="classtype == true ?'showItem1Phone':'showItem1'">
                <label>手机号码:</label><span> {{logininfo.mobilePhone | checkMobiphone }}</span>
              </div>
               <div :class="classtype == true ?'showItem1Phone':'showItem1'">
                <label>QQ:</label><span> {{logininfo.qq}}</span>
              </div> -->
          </div>
        </el-card>

      </el-col>
    </el-row>
  </div>
</template>

<script>
    export default {
        name: "userbaseinfo",
        data(){
            return{
                form: {
                    userID:'',
                    gameid: '',
                    account: '',
                    nicename:''
                },
                moneyinfotable:true,
                baseinfoTable:false,
                logininfoTable:false,
                moneytableData: [],
                baseinfotableData:[],
                logininfotableData:[],
                tableloading:false,
                classtype:false
            }
        },
        created(){
          this.getParams();
          this.getPhone();
        },
        methods:{
            getParams() {
              // 取到路由带过来的参数
              this.form.gameid = this.$route.query.gameID;
              if(this.form.gameid == "" || this.form.gameid ==null || typeof(this.form.gameid) == undefined){

              }else{
                 this.onSubmitBaseinfo(1);
              }
            },
            onSubmitMoney(){
              if((this.form.userID == "" || this.form.userID ==null || typeof(this.form.userID) == undefined) &&(this.form.gameid == "" || this.form.gameid ==null || typeof(this.form.gameid) == undefined) &&(this.form.account == "" || this.form.account ==null || typeof(this.form.account) == undefined) &&(this.form.nicename == "" || this.form.nicename ==null || typeof(this.form.nicename) == undefined) ) {
                this.$message({
                  message:'请输入信息进行查询',
                  type: "error"
                });
                return ;
              }
                this.moneyinfotable=true;
                this.baseinfoTable=false;
                this.logininfoTable=false;
                let param = {
                  userID:this.form.userID,
                  gameID:this.form.gameid,
                  nickName:this.form.nicename,
                  accounts:this.form.account
                };
                this.tableloading=true;
                this.$api.searchTreasure(param).then(res =>{
                  if (res.success) {
                    this.moneytableData = res.data.records;
                    this.tableloading=false;
                  } else {
                    this.$message({
                      message: res.message,
                      type: "error"
                    });
                  }
                }).catch(err =>{
                  this.$message({
                    message: '请求失败!',
                    type: "error"
                  });
                })
            },
            onSubmitBaseinfo(){
              if((this.form.userID == "" || this.form.userID ==null || typeof(this.form.userID) == undefined) &&(this.form.gameid == "" || this.form.gameid ==null || typeof(this.form.gameid) == undefined) &&(this.form.account == "" || this.form.account ==null || typeof(this.form.account) == undefined) &&(this.form.nicename == "" || this.form.nicename ==null || typeof(this.form.nicename) == undefined) ) {
                this.$message({
                  message:'请输入信息进行查询',
                  type: "error"
                });
                return ;
              }
                this.moneyinfotable=false;
                this.baseinfoTable=true;
                this.logininfoTable=false;
                let param = {
                  userID:this.form.userID,
                  gameID:this.form.gameid,
                  nickName:this.form.nicename,
                  accounts:this.form.account
                };
                this.tableloading=true;
                this.$api.searchBasic(param).then(res =>{
                  if (res.success) {
                    this.baseinfotableData = res.data.records;
                    this.tableloading=false;
                  } else {
                    this.$message({
                      message: res.message,
                      type: "error"
                    });
                  }
                }).catch(err =>{
                  this.$message({
                    message: '请求失败!',
                    type: "error"
                  });
                })
            },
            onSubmitLogin(){
              if((this.form.userID == "" || this.form.userID ==null || typeof(this.form.userID) == undefined) &&(this.form.gameid == "" || this.form.gameid ==null || typeof(this.form.gameid) == undefined) &&(this.form.account == "" || this.form.account ==null || typeof(this.form.account) == undefined) &&(this.form.nicename == "" || this.form.nicename ==null || typeof(this.form.nicename) == undefined) ) {
                this.$message({
                  message:'请输入信息进行查询',
                  type: "error"
                });
                return ;
              }
                this.moneyinfotable=false;
                this.baseinfoTable=false;
                this.logininfoTable=true;
                let param = {
                  userID:this.form.userID,
                  gameID:this.form.gameid,
                  nickName:this.form.nicename,
                  accounts:this.form.account
                };
                this.tableloading=true;
                this.$api.searchLogin(param).then(res =>{
                  if (res.success) {
                    this.logininfotableData = res.data.records;
                    this.tableloading=false;
                  } else {
                    this.$message({
                      message: res.message,
                      type: "error"
                    });
                  }
                }).catch(err =>{
                  this.$message({
                    message: '请求失败!',
                    type: "error"
                  });
                })

            },
            /**
             * 跳转
             */
            openWindow(data,typeid){
              let param={};
              let setparam="";
              let setid="";
              if(typeid == 1){
                  param={
                    setid:1,
                    setparam:data.lastLogonIP
                  }
              }
              if(typeid == 2){
                  param={
                    setid:2,
                    setparam:data.lastlogonmachine
                  }
              }
              if(typeid == 3){
                  param={
                    setid:3,
                    setparam:data.registerIP
                  }
              }
              if(typeid == 4){
                  param={
                    setid:4,
                    setparam:data.registerMachine
                  }
              }
              const {href} = this.$router.resolve({
                path: '/registerUser',
                query: param
              })
              window.open(href, '_blank')
            },
            openWindowByShopGoodsRecord(data){
              const {href} = this.$router.resolve({
                path: '/shopGoodsRecord',
                query: {
                  gameID: data
                }
              })
              window.open(href, '_blank')
            },
            openWindowByShareDetailInfo(data){
              const {href} = this.$router.resolve({
                path: '/shareDetailInfo',
                query: {
                  gameID: data
                }
              })
              window.open(href, '_blank')
            },
            openWindowBySpreaderAchievement(data){
              const {href} = this.$router.resolve({
                path: '/spreaderAchievement',
                query: {
                  spread: data
                }
              })
              window.open(href, '_blank')
            },
            getPhone(){
              let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
              if(flag){
                this.classtype=true;
              }
            },
        }
    }
</script>

<style scoped>
 .text {
    font-size: 14px;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 80%;
    margin:0px auto;
  }
  .box-cardPhone{
    width:98%;
    margin:0px auto;
  }
  .item {
    margin-bottom: 18px;
  }
  .showItem{
     width:32%;
     margin-right:1%;
      float: left;
     margin-bottom: 18px;
  }
  .showItemPhone{
    width:99%;
     margin-right:1%;
      float: left;
     margin-bottom: 18px;
  }
  .showItem span,.showItemPhone span{
    width:48%;
    /* float: left; */
    margin-left:2%;
  }
  .showItemPhone span,.showItemPhone label{
      font-size: 12px;
  }
  .showItem label,.showItemPhone label{
    width:50%;
    float: left;
    font-weight: normal;
  }
   .showItem1{
     width:48%;
     margin-right:1%;
     float: left;
     margin-bottom: 18px;
  }
  .showItem1Phone{
    width:99%;
     margin-right:1%;
     float: left;
     margin-bottom: 18px;
  }
  .showItem1 span,.showItem1Phone span{
    width:70%;
    float: left;
    margin-left:2%;
    /* font-size:16px; */
  }
  .showItem1 label,.showItem1Phone label{
    width:25%;
    float: left;
    font-weight: normal;
  }
  .showItem1Phone label{
    width:15%;
  }
  .showItem1Phone span,.showItem1Phone label{
    font-size: 12px;
  }
</style>
