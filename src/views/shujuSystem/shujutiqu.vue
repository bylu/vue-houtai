<template>
  <div class="app-container">
    <h3 class="showTit">数据提取</h3>
    <el-row :gutter="32">
      <div style="margin-left:1%;" v-has="'excel_itemRecord'">
        <el-button type="primary" size="small" @click="btnPropLog" style="margin-bottom:10px;">道具获取日志</el-button>
        <el-button type="success" size="small" @click="btndantouLog" style="margin-bottom:10px;">弹头交易日志</el-button>
        <el-button type="warning" size="small" @click="btnbanbenLog" style="margin-bottom:10px;">版本分布用户</el-button>
        <el-button type="danger" size="small"  @click="btnchangeShopRecord" style="margin-bottom:10px;">商品兑换记录</el-button>
        <el-button type="primary" size="small" @click="btnuseCountLog" plain style="margin-bottom:10px;">弹头使用数量统计</el-button>
        <el-button type="success" size="small" @click="btnPayandPhoneLog" plain style="margin-bottom:10px;">充值区间，手机号未冻结</el-button>
        <el-button type="warning" size="small" @click="btnLoginLog" plain style="margin-bottom:10px;">用户登录日志</el-button>
        <el-button type="danger" size="small"  @click="btnLastLuckbeanLog" plain style="margin-bottom:10px;">幸运豆余量</el-button>
        <el-button type="primary" size="small" @click="btnuserInfoSearch" plain style="margin-bottom:10px;">指定用户信息</el-button>
        <!-- <el-button type="primary" size="small" @click="btnDaojuSearch" style="margin-bottom:10px;">道具余量</el-button> -->
        <el-button type="success" size="small" @click="btnPayLog">充值日志</el-button>
        <el-button type="warning" size="small" @click="btnRegisterLog">注册日志</el-button>
        <el-button type="danger" size="small"  @click="btnDayuleijijifen">打鱼活动累计积分</el-button>
      </div>
    </el-row>
    <el-row :gutter="32">
        <PropLog v-show="showPropLog"></PropLog><!--道具获取日志-->
        <dantouLog v-show="showdantouLog" ></dantouLog><!--弹头交易日志-->
        <banbenLog v-show="showbanbenLog"></banbenLog><!--版本分布用户-->
        <changeShopRecord v-show="showchangeShopRecord"></changeShopRecord><!--商品兑换记录-->
        <useCountLog v-show="showuseCountLog"></useCountLog><!--弹头使用数量统计-->
        <PayandPhoneLog v-show="showPayandPhoneLog"></PayandPhoneLog><!--充值区间，手机号未冻结-->
        <LoginLog v-show="showLoginLog"></LoginLog><!--用户登录日志-->
        <LastLuckbeanLog v-show="showLastLuckbeanLog"></LastLuckbeanLog><!--幸运豆余量-->
        <userInfoSearch v-show="showuserInfoSearch"></userInfoSearch> <!--指定用户信息-->
        <DaojuSearch v-show="showDaojuSearch"></DaojuSearch><!--道具余量-->
        <PayLog v-show="showPayLog"></PayLog><!--充值日志-->
        <RegisterLog v-show="showRegisterLog"></RegisterLog><!--注册日志-->
        <Dayukeijijifen v-show="showDayuleijijifen"></Dayukeijijifen><!--打鱼活动累计积分-->
    </el-row>
  </div>
</template>

<script>

    export default {
        name: "shujutiqu",
        components:{
          PropLog:() => import('./shujutiquPropLog.vue'),
          dantouLog:() => import('./shujutiqudantouLog.vue'),
          banbenLog:() => import('./shujutiqubanbenLog.vue'),
          changeShopRecord:() => import('./shujutiquchangeShopRecord.vue'),
          useCountLog:() => import('./shujutiquuseCountLog.vue'),
          PayandPhoneLog:() => import('./shujutiquPayandPhoneLog.vue'),
          LoginLog:() => import('./shujutiquLoginLog.vue'),
          LastLuckbeanLog:()=>import('./shujutiquLastLuckbeanLog.vue'),
          userInfoSearch:()=>import('./shujutiquuserInfoSearch.vue'),
          DaojuSearch:()=>import('./shujutiquDaojuSearch.vue'),
          PayLog:()=>import('./shujutiquPayLog.vue'),
          RegisterLog:()=>import('./shujutiquRegisterLog.vue'),
          Dayukeijijifen:()=>import('./accumulatedPointsForFishingActivities.vue')
        },
        data(){
            return{
              showPropLog:false,
              showdantouLog:false,
              showbanbenLog:false,
              showchangeShopRecord:false,
              showuseCountLog:false,
              showPayandPhoneLog:false,
              showLoginLog:false,
              showLastLuckbeanLog:false,
              showuserInfoSearch:false,
              showDaojuSearch:false,
              showPayLog:false,
              showRegisterLog:false,
              showDayuleijijifen:false,
            }
        },
        mounted(){},
        methods:{
          btnPropLog(){
            this.showPropLog=true;
            this.showdantouLog=false;
            this.showbanbenLog=false;
            this.showchangeShopRecord=false;
            this.showuseCountLog=false;
            this.showPayandPhoneLog=false;
            this.showLoginLog=false;
            this.showLastLuckbeanLog=false;
            this.showuserInfoSearch=false;
            this.showDaojuSearch=false;
            this.showPayLog=false;
            this.showRegisterLog=false;
            this.showDayuleijijifen=false;
          },
          btndantouLog(){
            this.showPropLog=false;
            this.showdantouLog=true;
            this.showbanbenLog=false;
            this.showchangeShopRecord=false;
            this.showuseCountLog=false;
            this.showPayandPhoneLog=false;
            this.showLoginLog=false;
            this.showLastLuckbeanLog=false;
            this.showuserInfoSearch=false;
            this.showDaojuSearch=false;
            this.showPayLog=false;
            this.showRegisterLog=false;
            this.showDayuleijijifen=false;
          },
          btnbanbenLog(){
            this.showPropLog=false;
            this.showdantouLog=false;
            this.showbanbenLog=true;
            this.showchangeShopRecord=false;
            this.showuseCountLog=false;
            this.showPayandPhoneLog=false;
            this.showLoginLog=false;
            this.showLastLuckbeanLog=false;
            this.showuserInfoSearch=false;
            this.showDaojuSearch=false;
            this.showPayLog=false;
            this.showRegisterLog=false;
            this.showDayuleijijifen=false;
          },
          btnchangeShopRecord(){
            this.showPropLog=false;
            this.showdantouLog=false;
            this.showbanbenLog=false;
            this.showchangeShopRecord=true;
            this.showuseCountLog=false;
            this.showPayandPhoneLog=false;
            this.showLoginLog=false;
            this.showLastLuckbeanLog=false;
            this.showuserInfoSearch=false;
            this.showDaojuSearch=false;
            this.showPayLog=false;
            this.showRegisterLog=false;
            this.showDayuleijijifen=false;
          },
          btnuseCountLog(){
            this.showPropLog=false;
            this.showdantouLog=false;
            this.showbanbenLog=false;
            this.showchangeShopRecord=false;
            this.showuseCountLog=true;
            this.showPayandPhoneLog=false;
            this.showLoginLog=false;
            this.showLastLuckbeanLog=false;
            this.showuserInfoSearch=false;
            this.showDaojuSearch=false;
            this.showPayLog=false;
            this.showRegisterLog=false;
            this.showDayuleijijifen=false;
          },
          btnPayandPhoneLog(){
            this.showPropLog=false;
            this.showdantouLog=false;
            this.showbanbenLog=false;
            this.showchangeShopRecord=false;
            this.showuseCountLog=false;
            this.showPayandPhoneLog=true;
            this.showLoginLog=false;
            this.showLastLuckbeanLog=false;
            this.showuserInfoSearch=false;
            this.showDaojuSearch=false;
            this.showPayLog=false;
            this.showRegisterLog=false;
            this.showDayuleijijifen=false;
          },
          btnLoginLog(){
            this.showPropLog=false;
            this.showdantouLog=false;
            this.showbanbenLog=false;
            this.showchangeShopRecord=false;
            this.showuseCountLog=false;
            this.showPayandPhoneLog=false;
            this.showLoginLog=true;
            this.showLastLuckbeanLog=false;
            this.showuserInfoSearch=false;
            this.showDaojuSearch=false;
            this.showPayLog=false;
            this.showRegisterLog=false;
            this.showDayuleijijifen=false;
          },
          btnLastLuckbeanLog(){
            this.showPropLog=false;
            this.showdantouLog=false;
            this.showbanbenLog=false;
            this.showchangeShopRecord=false;
            this.showuseCountLog=false;
            this.showPayandPhoneLog=false;
            this.showLoginLog=false;
            this.showLastLuckbeanLog=true;
            this.showuserInfoSearch=false;
            this.showDaojuSearch=false;
            this.showPayLog=false;
            this.showRegisterLog=false;
            this.showDayuleijijifen=false;
          },
          btnuserInfoSearch(){
            this.showPropLog=false;
            this.showdantouLog=false;
            this.showbanbenLog=false;
            this.showchangeShopRecord=false;
            this.showuseCountLog=false;
            this.showPayandPhoneLog=false;
            this.showLoginLog=false;
            this.showLastLuckbeanLog=false;
            this.showuserInfoSearch=true;
            this.showDaojuSearch=false;
            this.showPayLog=false;
            this.showRegisterLog=false;
            this.showDayuleijijifen=false;
          },
          // btnDaojuSearch(){
          //   this.showPropLog=false;
          //   this.showdantouLog=false;
          //   this.showbanbenLog=false;
          //   this.showchangeShopRecord=false;
          //   this.showuseCountLog=false;
          //   this.showPayandPhoneLog=false;
          //   this.showLoginLog=false;
          //   this.showLastLuckbeanLog=false;
          //   this.showuserInfoSearch=false;
          //   this.showDaojuSearch=true;
          //   this.showPayLog=false;
          //   this.showRegisterLog=false;
          //   this.showDayuleijijifen=false;
          // },
          btnPayLog(){
            this.showPropLog=false;
            this.showdantouLog=false;
            this.showbanbenLog=false;
            this.showchangeShopRecord=false;
            this.showuseCountLog=false;
            this.showPayandPhoneLog=false;
            this.showLoginLog=false;
            this.showLastLuckbeanLog=false;
            this.showuserInfoSearch=false;
            this.showDaojuSearch=false;
            this.showPayLog=true;
            this.showRegisterLog=false;
            this.showDayuleijijifen=false;
          },
          btnRegisterLog(){
            this.showPropLog=false;
            this.showdantouLog=false;
            this.showbanbenLog=false;
            this.showchangeShopRecord=false;
            this.showuseCountLog=false;
            this.showPayandPhoneLog=false;
            this.showLoginLog=false;
            this.showLastLuckbeanLog=false;
            this.showuserInfoSearch=false;
            this.showDaojuSearch=false;
            this.showPayLog=false;
            this.showRegisterLog=true;
            this.showDayuleijijifen=false;
          },
          btnDayuleijijifen(){
            this.showPropLog=false;
            this.showdantouLog=false;
            this.showbanbenLog=false;
            this.showchangeShopRecord=false;
            this.showuseCountLog=false;
            this.showPayandPhoneLog=false;
            this.showLoginLog=false;
            this.showLastLuckbeanLog=false;
            this.showuserInfoSearch=false;
            this.showDaojuSearch=false;
            this.showPayLog=false;
            this.showRegisterLog=false;
            this.showDayuleijijifen=true;
          }
        }
    }
</script>

<style scoped>
</style>
