<template>
  <div class="app-container">
    <h3 class="showTit">用户操作记录</h3>

    <el-row :gutter="32">
      <div style="margin-left:2%;">
        <!-- <el-button type="primary" size="small" v-has="'userOperationRecord_gaveScoe'" @click="btngoldCoin" >赠送金币</el-button> -->
        <el-button type="success" size="small" v-has="'userOperationRecord_gaveLuckyBeans'" @click="btnluckbean" >赠送幸运豆</el-button>
        <el-button type="warning" size="small" v-has="'userOperationRecord_gaveExperience'" @click="btnexperience" >赠送经验值</el-button>
        <el-button type="danger" size="small" v-has="'userOperationRecord_gaveGameID'" @click="btnlianghao" >赠送靓号</el-button>
        <!-- <el-button type="primary" size="small" v-has="'userOperationRecord_gaveTrumpet'" @click="btnborn" plain>赠送喇叭</el-button> -->
        <el-button type="success" size="small" v-has="'userOperationRecord_gaveMember'" @click="btnMember" plain>赠送会员</el-button>
        <!-- <el-button type="warning" size="small" v-has="'userOperationRecord_gavelottery'" @click="btnLottery" plain>赠送奖券</el-button> -->
        <el-button type="danger" size="small" v-has="'userOperationRecord_updatePwd'"  @click="btneditPwd" plain>修改密码</el-button>
        <el-button type="primary" size="small" v-has="'userOperationRecord_freeze'" @click="btnReleaseOfTitle" plain>封号解封</el-button>
        <el-button type="danger" size="small" v-has="'userOperationRecord_bind'" @click="btnBind">绑定解绑</el-button>
        <el-button type="success" size="small" v-has="'userOperationRecord_reviewHead'" @click="btncheckFace">审核头像</el-button>
        <el-button type="warning" size="small" v-has="'userOperationRecord_banned'" @click="btnjinyan">禁言解禁</el-button>
        <el-button type="primary" size="small"  v-has="'userOperationRecord_giveItem'" @click="btnprop" plain>赠送道具</el-button>
      </div>
    </el-row>
    <el-row :gutter="32" style="margin-top:10px;">
        <goldCoin v-show="showgoldCoin"></goldCoin><!--赠送金币-->
        <luckbean v-show="showluckbean" ></luckbean><!--赠送幸运豆-->
        <experience v-show="showexperience"></experience><!--赠送经验值-->
        <lianghao v-show="showlianghao"></lianghao><!--赠送靓号-->
        <born v-show="showborn"></born><!--赠送喇叭-->
        <Member v-show="showMember"></Member><!--赠送会员-->
        <Lottery v-show="showLottery"></Lottery><!--赠送奖券-->
        <editPwd v-show="showeditPwd"></editPwd><!--修改密码-->
        <ReleaseOfTitle v-show="showReleaseOfTitle"></ReleaseOfTitle> <!--封号解封-->
        <Bind v-show="showBind"></Bind><!--绑定解绑-->
        <checkFace v-show="showcheckFace"></checkFace><!--审核头像-->
        <jinyan v-show="showjinyan"></jinyan><!--禁言解禁-->
        <prop v-show="showprop"></prop><!--赠送道具-->
    </el-row>
  </div>
</template>

<script>
  
    export default {
        name: "userOperationRecord",
        components:{
          goldCoin:() => import('./userOperagoldCoin.vue'),
          luckbean:() => import('./userOperaluckbean.vue'), 
          experience:() => import('./userOperaexperience.vue'),
          lianghao:() => import('./userOperalianghao.vue'),
          born:() => import('./userOperaborn.vue'),
          Member:() => import('./userOperaMember.vue'),
          Lottery:() => import('./userOperaLottery.vue'),
          editPwd:()=>import('./userOperaeditPwd.vue'),
          ReleaseOfTitle:()=>import('./userOperaReleaseOfTitle.vue'),
          Bind:()=>import('./userOperaBind.vue'),
          checkFace:()=>import('./userOperacheckFace.vue'),
          jinyan:()=>import('./userOperajinyan.vue'),
          prop:()=>import('./userOperaprop.vue'),
        },
        data(){
            return{
              showgoldCoin:false,
              showluckbean:false,
              showexperience:false,
              showlianghao:false,
              showborn:false,
              showMember:false,
              showLottery:false,
              showeditPwd:false,
              showReleaseOfTitle:false,
              showBind:false,
              showcheckFace:false,
              showjinyan:false,
              showprop:false,
            }
        },
        mounted(){},
        methods:{
          btngoldCoin(){
            this.showgoldCoin=true;
            this.showluckbean=false;
            this.showexperience=false;
            this.showlianghao=false;
            this.showborn=false;
            this.showMember=false;
            this.showLottery=false;
            this.showeditPwd=false;
            this.showReleaseOfTitle=false;
            this.showBind=false;
            this.showcheckFace=false;
            this.showjinyan=false;
            this.showprop=false;
          },
          btnluckbean(){
            this.showgoldCoin=false;
            this.showluckbean=true;
            this.showexperience=false;
            this.showlianghao=false;
            this.showborn=false;
            this.showMember=false;
            this.showLottery=false;
            this.showeditPwd=false;
            this.showReleaseOfTitle=false;
            this.showBind=false;
            this.showcheckFace=false;
            this.showjinyan=false;
            this.showprop=false;
          },
          btnexperience(){
            this.showgoldCoin=false;
            this.showluckbean=false;
            this.showexperience=true;
            this.showlianghao=false;
            this.showborn=false;
            this.showMember=false;
            this.showLottery=false;
            this.showeditPwd=false;
            this.showReleaseOfTitle=false;
            this.showBind=false;
            this.showcheckFace=false;
            this.showjinyan=false;
            this.showprop=false;
          },
          btnlianghao(){
            this.showgoldCoin=false;
            this.showluckbean=false;
            this.showexperience=false;
            this.showlianghao=true;
            this.showborn=false;
            this.showMember=false;
            this.showLottery=false;
            this.showeditPwd=false;
            this.showReleaseOfTitle=false;
            this.showBind=false;
            this.showcheckFace=false;
            this.showjinyan=false;
            this.showprop=false;
          },
          btnborn(){
            this.showgoldCoin=false;
            this.showluckbean=false;
            this.showexperience=false;
            this.showlianghao=false;
            this.showborn=true;
            this.showMember=false;
            this.showLottery=false;
            this.showeditPwd=false;
            this.showReleaseOfTitle=false;
            this.showBind=false;
            this.showcheckFace=false;
            this.showjinyan=false;
            this.showprop=false;
          },
          btnMember(){
            this.showgoldCoin=false;
            this.showluckbean=false;
            this.showexperience=false;
            this.showlianghao=false;
            this.showborn=false;
            this.showMember=true;
            this.showLottery=false;
            this.showeditPwd=false;
            this.showReleaseOfTitle=false;
            this.showBind=false;
            this.showcheckFace=false;
            this.showjinyan=false;
            this.showprop=false;
          },
          btnLottery(){
            this.showgoldCoin=false;
            this.showluckbean=false;
            this.showexperience=false;
            this.showlianghao=false;
            this.showborn=false;
            this.showMember=false;
            this.showLottery=true;
            this.showeditPwd=false;
            this.showReleaseOfTitle=false;
            this.showBind=false;
            this.showcheckFace=false;
            this.showjinyan=false;
            this.showprop=false;
          },
          btneditPwd(){
            this.showgoldCoin=false;
            this.showluckbean=false;
            this.showexperience=false;
            this.showlianghao=false;
            this.showborn=false;
            this.showMember=false;
            this.showLottery=false;
            this.showeditPwd=true;
            this.showReleaseOfTitle=false;
            this.showBind=false;
            this.showcheckFace=false;
            this.showjinyan=false;
            this.showprop=false;
          },
          btnReleaseOfTitle(){
            this.showgoldCoin=false;
            this.showluckbean=false;
            this.showexperience=false;
            this.showlianghao=false;
            this.showborn=false;
            this.showMember=false;
            this.showLottery=false;
            this.showeditPwd=false;
            this.showReleaseOfTitle=true;
            this.showBind=false;
            this.showcheckFace=false;
            this.showjinyan=false;
            this.showprop=false;
          },
          btnBind(){
            this.showgoldCoin=false;
            this.showluckbean=false;
            this.showexperience=false;
            this.showlianghao=false;
            this.showborn=false;
            this.showMember=false;
            this.showLottery=false;
            this.showeditPwd=false;
            this.showReleaseOfTitle=false;
            this.showBind=true;
            this.showcheckFace=false;
            this.showjinyan=false;
            this.showprop=false;
          },
          btncheckFace(){
            this.showgoldCoin=false;
            this.showluckbean=false;
            this.showexperience=false;
            this.showlianghao=false;
            this.showborn=false;
            this.showMember=false;
            this.showLottery=false;
            this.showeditPwd=false;
            this.showReleaseOfTitle=false;
            this.showBind=false;
            this.showcheckFace=true;
            this.showjinyan=false;
            this.showprop=false;
          },
          btnjinyan(){
            this.showgoldCoin=false;
            this.showluckbean=false;
            this.showexperience=false;
            this.showlianghao=false;
            this.showborn=false;
            this.showMember=false;
            this.showLottery=false;
            this.showeditPwd=false;
            this.showReleaseOfTitle=false;
            this.showBind=false;
            this.showcheckFace=false;
            this.showjinyan=true;
            this.showprop=false;
          },
          btnprop(){
            this.showgoldCoin=false;
            this.showluckbean=false;
            this.showexperience=false;
            this.showlianghao=false;
            this.showborn=false;
            this.showMember=false;
            this.showLottery=false;
            this.showeditPwd=false;
            this.showReleaseOfTitle=false;
            this.showBind=false;
            this.showcheckFace=false;
            this.showjinyan=false;
            this.showprop=true;
          },
        }
    }
</script>

<style scoped>
</style>
