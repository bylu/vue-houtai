<template>
<div>
   <el-form :model="form" :inline="true" :rules="rules" ref="form" label-width="140px" class="demo-ruleForm">
        <el-form-item label="状态名字"  prop="value1">
          <el-input v-model.trim="form.value1" :readonly="status ? false : 'readonly'" size="small" placeholder="" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="状态显示名字"  prop="value2">
          <el-input v-model.trim="form.value2" size="small" placeholder="" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="状态数值"  prop="value3">
          <el-input v-model.trim="form.value3" size="small" placeholder="" autocomplete="off" clearable></el-input>
        </el-form-item>

        <el-form-item label="字符描述"  prop="value5">
          <el-input v-model="form.value5"  size="small" placeholder="" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="类型"  prop="value6">
          <el-select v-model="form.value6" size="small" placeholder="请选择">
            <el-option  v-for="list in selectList.addSystemStatusInfoList" :key="list.key" :label="list.value" :value="list.key"></el-option>
          </el-select>
        </el-form-item>
        <div class="addSpecalcss">
            <el-form-item label="状态字符"  prop="value4">
                <el-input v-model="form.value4" type="textarea" style="width:310%;" :autosize="{ minRows: 4, maxRows: 4}" size="small" placeholder="" autocomplete="off"></el-input>
            </el-form-item>
        </div>
        <div class="el-form-item">
            <label for="checkedList" class="el-form-item__label" style="width: 130px;float:left;">部门列表:</label>
            <div style="width:78%;float:left;">
                <el-checkbox-group v-model="checkedList" size="small">
                <template v-for="(item,index) in departmentlist">
                <el-checkbox  :checked="item.checked" :label="item.id"  :key="index">
                    <span >{{item.name}}</span>
                </el-checkbox>
                </template>
                </el-checkbox-group>
            </div>
        </div>
    </el-form>
    <div style="width:100%;float:left;">
      <table id="contentBody">

      </table>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button  size="small" @click="cancel">取消</el-button>
      <el-button  size="small" type="primary" @click="gameFunction(1,2)">应用所有版本</el-button>
      <el-button  size="small" type="danger" plain="" @click="gameFunction(2,2)">应用当前版本</el-button>
      <el-button  size="small" type="success" @click="gameFunction(3,2)">设置默认配置</el-button>
      <el-button  size="small" type="warning" @click="gameFunction(4,2)">保存</el-button>
    </div>
</div>
</template>

<script>
export default {
  name: "",
  props: ['getdata','isAdd'],
  data() {
    return {
      loading: false,
      status:false,
      form: {
        id:'',
        value1:'',
        value2:'',
        value3:'',
        value4:'',
        value5:'',
        value6:'0',
      },
      checkedList:[],
      departmentlist:[],
      rules: {
          value1: [
              { required: true, message: '填写状态名字', trigger: 'blur' }
          ],
          value2: [
              { required:true,message:'填写状态显示名字',trigger:'blur'}
          ],
          value3: [
              { required: true, message: '填写状态数值', trigger: 'blur' }
          ],
          value4: [
              { required: true, message: '填写状态字符', trigger: 'blur' }
          ],
          value5: [
              { required: true, message: '填写状态描述', trigger: 'blur' }
          ],
          value6: [
              { required: true, message: '选择类型', trigger: 'change' }
          ],
      },
      userID:'',
      gameFunctions:{
                0: {
                    "name": "room_shezhi",
                    "alias": "roomShezhi",
                    "title": "大厅.设置按钮"
                },
                1: {
                    "name": "room_chongzhi",
                    "alias": "roomChongzhi",
                    "title": "大厅.充值按钮"
                },
                2: {
                    "name": "room_yinhang",
                    "alias": "roomYinhang",
                    "title": "大厅.银行按钮"
                },
                3: {
                    "name": "room_beibao",
                    "alias": "roomBeibao",
                    "title": "大厅.背包按钮"
                }
                , 5: {
                    "name": "room_xiaolipin",
                    "alias": "roomXiaolipin",
                    "title": "大厅.头像旁边礼品按钮"
                }
                , 6: {
                    "name": "room_xiaochongzhi",
                    "alias": "roomXiaochongzhi",
                    "title": "大厅.头像旁边充值按钮"
                }
                , 7: {
                    "name": "room_gerenzhongxin",
                    "alias": "roomGerenzhongxin",
                    "title": "大厅.点击头像个人中心开关"
                }
                , 8: {
                    "name": "room_fenxiang",
                    "alias": "roomFenxiang",
                    "title": "大厅.分享.免费金币按钮"
                }
                , 10: {
                    "name": "room_paihangbang",
                    "alias": "roomPaihangbang",
                    "title": "大厅.排行榜按钮"
                }
                , 11: {
                    "name": "room_huodong",
                    "alias": "roomHuodong",
                    "title": "大厅.活动按钮"
                }
                , 12: {
                    "name": "room_qiandao",
                    "alias": "roomQiandao",
                    "title": "大厅.签到按钮"
                }
                , 13: {
                    "name": "room_lipin",
                    "alias": "roomLipin",
                    "title": "大厅.商城按钮"
                }
                , 14: {
                    "name": "room_kefubangzhu",
                    "alias": "roomKefubangzhu",
                    "title": "大厅.客服帮助按钮"
                }
                , 15: {
                    "name": "bank_jilu",
                    "alias": "bankJilu",
                    "title": "银行.记录"
                }
                , 16: {
                    "name": "bank_dingdan",
                    "alias": "bankDingdan",
                    "title": "银行.订单记录"
                }
                , 17: {
                    "name": "bank_hongbao",
                    "alias": "bankHongbao",
                    "title": "银行.红包记录"
                }
                , 18: {
                    "name": "bank_duihuan",
                    "alias": "bankDuihuan",
                    "title": "银行.兑换记录"
                }
                , 20: {
                    "name": "room_youjian",
                    "alias": "roomYoujian",
                    "title": "大厅.邮件按钮"
                }
                , 21: {
                    "name": "room_renwu",
                    "alias": "roomRenwu",
                    "title": "大厅.任务按钮"
                }
                , 22: {
                    "name": "room_gengduo",
                    "alias": "roomGengduo",
                    "title": "大厅.更多按钮"
                }
                , 23: {
                    "name": "game_liaotiankuang",
                    "alias": "gameLiaotiankuang",
                    "title": "游戏内聊天框.进入时隐藏"
                }
                , 24: {
                    "name": "game_liaotianyincang",
                    "alias": "gameLiaotianyincang",
                    "title": "游戏内聊天.开启/关闭"
                }
                , 26: {
                    "name": "game_renwu",
                    "alias": "gameRenwu",
                    "title": "游戏内任务"
                }
                , 28: {
                    "name": "paihangbang_tuhao",
                    "alias": "paihangbangTuhao",
                    "title": "排行榜.土豪帮"
                }
                , 29: {
                    "name": "paihangbang_jiangquan",
                    "alias": "paihangbangJiangquan",
                    "title": "排行榜.奖券"
                }
                , 30: {
                    "name": "paihangbang_buyu",
                    "alias": "paihangbangBuyu",
                    "title": "排行榜.捕鱼达人"
                }
                , 31: {
                    "name": "paihangbang_zaixian",
                    "alias": "paihangbangZaixian",
                    "title": "排行榜.在线时长"
                }
                , 32: {
                    "name": "paihangbang_meiri",
                    "alias": "paihangbangMeiri",
                    "title": "排行榜.每日点赞"
                }
                , 33: {
                    "name": "jiangquan_yincang",
                    "alias": "jiangquanYincang",
                    "title": "隐藏所有奖券显示，包括大厅和充值页面"
                }
                , 34: {
                    "name": "game_beibao",
                    "alias": "gameBeibao",
                    "title": "游戏内背包开关"
                }
                , 35: {
                    "name": "socket_timeoutcheck",
                    "alias": "socketimeoutcheck",
                    "title": "连接超时计时器判断断线"
                }
                , 36: {
                    "name": "swsdk_svconfig",
                    "alias": "swsdksvconfig",
                    "title": "是否开启服务端的支付类型"
                }
                , 37: {
                    "name": "swsdk_svpaytype",
                    "alias": "swsdksvpaytype",
                    "title": "是否开启官网容错"
                }
                , 38: {
                    "name": "app_review",
                    "alias": "appreview",
                    "title": "苹果好评有礼"
                }
                , 39: {
                    "name": "lua_phone_bind",
                    "alias": "luaphonebind",
                    "title": "手机绑定"
                }
                , 40: {
                    "name": "ios_other",
                    "alias": "iosOther",
                    "title": "只使用IOS支付"
                }
                , 41: {
                    "name": "game_arena_btn",
                    "alias": "gameArenaBtn",
                    "title": "游戏场内竞技场按钮"
                }
                , 42: {
                    "name": "game_log",
                    "alias": "gameLog",
                    "title": "游戏纪录"
                }
                , 43: {
                    "name": "game_prize_pool",
                    "alias": "gamePrizePool",
                    "title": "游戏内聚宝盆按钮"
                }
                , 44: {
                    "name": "buy_item_tab",
                    "alias": "buyItemTab",
                    "title": "支付页面道具商城按钮"
                }
                , 45: {
                    "name": "room_other_game_btn",
                    "alias": "roomOtherGameBtn",
                    "title": "大厅小游戏按钮"
                }
                , 46: {
                    "name": "room_xiazaiyouli_btn",
                    "alias": "roomXiazaiyouliBtn",
                    "title": "大厅下载有礼按钮"
                }
                , 47: {
                    "name": "game_notify_icons",
                    "alias": "gameNotifyIcons",
                    "title": "游戏内任务/邮件推送图标"
                }
                , 48: {
                    "name": "game_expand_button",
                    "alias": "gameExpandButton",
                    "title": "游戏内所有按钮折叠/展开按钮"
                }
                , 49: {
                    "name": "paihangbang_daoju",
                    "alias": "paihangbangDaoju",
                    "title": "排行榜.道具达人"
                }
                , 50: {
                    "name": "isShow_user_aut_card",
                    "alias": "isShowuserautcard",
                    "title": "身份认证"
                }
                , 51: {
                    "name": "isShow_redPackYard",
                    "alias": "isShowredPackYard",
                    "title": "红包码"
                }
                , 52: {
                    "name": "isShow_800WeChat",
                    "alias": "isShow800WeChat",
                    "title": "800联系客服"
                }
                , 53: {
                    "name": "isShow_exchangecode",
                    "alias": "isShowxchangecode",
                    "title": "兑换码是否显示"
                }
                , 54: {
                    "name": "isShow_huoyuedu",
                    "alias": "isShowhuoyuedu",
                    "title": "活跃度排行榜"
                }
                , 55: {
                    "name": "game_notify_exchange",
                    "alias": "gameNotifyExchange",
                    "title": "小图标礼品商城"
                }
                , 56: {
                    "name": "game_notify_limitsatch",
                    "alias": "gameNotifyLimitsatch",
                    "title": "小图标限量抢购"
                }
                , 57: {
                    "name": "game_notify_arena",
                    "alias": "gameNotifyArena",
                    "title": "小图标竞技场"
                }
                , 58: {
                    "name": "room_privateroom_btn",
                    "alias": "roomPrivateroomBtn",
                    "title": "私人房间开关"
                }
                , 59: {
                    "name": "rank_everyday_praise",
                    "alias": "rankEverydayPraise",
                    "title": "排行榜每日点赞"
                }
                , 60: {
                    "name": "feature_roomshortcut_left",
                    "alias": "featureRoomshortcutLeft",
                    "title": "大厅左侧快捷按钮"
                }
                , 61: {
                    "name": "feature_roomshortcut_right",
                    "alias": "featureRoomshortcutRight",
                    "title": "大厅右侧活动快捷方式"
                }
                , 62: {
                    "name": "feature_gameshortcut_act",
                    "alias": "featureGameshortcutAct",
                    "title": "游戏内活动快捷方式"
                }
                , 63: {
                    "name": "feature_login_zhuxiao",
                    "alias": "featureLoginZhuxiao",
                    "title": "登陆注销按钮"
                }
                , 64: {
                    "name": "room_isShow_noticebtn",
                    "alias": "roomIsShowNoticebtn",
                    "title": "大厅公告按钮"
                }
                , 65: {
                    "name": "room_isShow_servicebtn",
                    "alias": "roomIsShowServicebtn",
                    "title": "大厅客服按钮"
                }
                , 66: {
                    "name": "room_isShow_setbtn",
                    "alias": "roomIsShowSetbtn",
                    "title": "大厅设置按钮"
                }
                , 67: {
                    "name": "room_isShow_club",
                    "alias": "roomIsShowClub",
                    "title": "俱乐部开关"
                }
                , 68: {
                    "name" : "feature_login_tip_sign",
                    "alias" : "featureLoginTipSign",
                    "title" : "签到自动弹出"
                }
                , 69: {
                    "name" : "feature_third_realname",
                    "alias" : "featureThirdRealname",
                    "title" : "第三方实名认证"
                }
       }
    }
  },
  mounted(){
   this.init();
   this.getUserID();
  },
  created(){
    self = this;
    window.oneGameFunction= self.oneGameFunction
  },
  methods: {
    getUserID() {
      let user = localStorage.getItem("HTusername");
      if (null != user && "" != user) {
        this.userID = JSON.parse(user).userID;
      }
    },
    getGameFunctionLastIndex() {
        return 69;
    },
    //新增和编辑今日入页面初始化
    init(){
      if(this.isAdd){    //添加时id=0
        this.status=true;
        this.form.id='0';
      }else{
        //非游戏开关修改时id=2(即状态类型不是游戏功能开关时 id=2)
        if((this.getdata.statusType).toString() != "1"){
          this.status=false;
          this.form.id='2';
        }else{
          this.status=true;
          //游戏开关修改时 需调取另一个接口
          this.form.id='';
        }
        this.form.id=this.form.id;
        this.form.value1=this.getdata.statusName;
        this.form.value2=this.getdata.statusTip;
        this.form.value3=this.getdata.statusValue;
        this.form.value4=this.getdata.statusString;
        this.form.value5=this.getdata.statusDescription;
        this.form.value6=(this.getdata.statusType).toString();
        this.departmentlist=this.getdata.lists;

        var statusJson=$.parseJSON(this.getdata.statusString);
        let statusName=this.getdata.statusName;
        var trObj1=$("<div></div>");
        var trObj2=$("<div></div>");
        var trObj3=$("<div></div>");
        trObj1.append("<tr class='showtr'><td class='name'>是否比赛：</td>"+
            "<td class='userOpera'>"+
              "<input type='radio' name='match' id='match_1' value='1'>是"+
              "<input type='radio' name='match' id='match_0'value='0'>否"+
              "</td><td class='userbtnclick'>"+
              "<input type='button' class='userinputbtn' value='同类版本' title='将此项配置应用于当前版本'  onclick='oneGameFunction(2,\"match\",\"" + statusName + "\")' >"+
              "<input type='button' class='userinputbtn1' value='所有版本' title='将此项配置应用于所有版本' onclick='oneGameFunction(1,\"match\",\"" + statusName + "\")'>"+
            "</td></tr>");
        trObj2.append("<tr class='showtr'><td class='name'>是否沙盒：</td>"+
            "<td class='userOpera'>"+
            "<input type='radio' name='sandbox' id='sandbox_1' value='1'>是<input type='radio' name='sandbox' id='sandbox_0' value='0'>否</td>"+
            "<td class='userbtnclick'>"+
            "<input type='button' class='userinputbtn' value='同类版本' title='将此项配置应用于当前版本' onclick='oneGameFunction(2,\"sandbox\",\"" + statusName + "\")'>"+
            "<input type='button' class='userinputbtn1' value='所有版本' title='将此项配置应用于所有版本' onclick='oneGameFunction(1,\"sandbox\",\"" + statusName + "\")'>"+
            "</td></tr>");

        var feature = statusJson.feature;
        for (var i = 0; i <= this.getGameFunctionLastIndex(); i++) {
            var gameFunctionStatus;
            if (feature[i] == undefined) {
                if (i != 36 && i != 37) {
                    gameFunctionStatus = 1;
                } else {
                    gameFunctionStatus = 0;
                }
            } else {
                if (i != 36 && i != 37) {
                    gameFunctionStatus = feature[i] == 0 ? 0 : 1;
                } else {
                    gameFunctionStatus = feature[i];
                }
            }
            var gameFunctionInfo = this.getGameFunctionInfo(i);
            if (gameFunctionInfo != undefined) {
                if (i == 36 || i == 37) {
                    trObj3.append("<tr class='showtr'><td class='name'>" + gameFunctionInfo.title + "：</td>" +
                        "<td class='userOpera'>" +
                        "<input type='text' class='textCheck' name='" + gameFunctionInfo.alias + "_" + i + "' id='" + gameFunctionInfo.alias + "_1" + "' value=" + gameFunctionStatus + " " +
                        "onkeyup='this.value=this.value.replace(" + /[^\- \d.]/g + ",\"\")'  onafterpaste='this.value=this.value.replace(" + /[^\- \d.]/g + ",\"\")' maxlength=1>" +
                        "</td><td class='userbtnclick'>"+
                        "<input type='button' class='userinputbtn' value='同类版本' title='将此项配置应用于当前版本' onclick='oneGameFunction(2,\"" + gameFunctionInfo.alias + "_" + i + "\",\"" + statusName + "\")'>" +
                        "<input type='button' class='userinputbtn1' value='所有版本' title='将此项配置应用于所有版本' onclick='oneGameFunction(1,\"" + gameFunctionInfo.alias + "_" + i + "\",\"" + statusName + "\")'>" +
                        "</td></tr>");
                }
                if (i == 26) {
                    trObj3.append("<tr class='showtr'><td class='name'>" + gameFunctionInfo.title + "：</td>" +
                        "<td class='userOpera'>" +
                        "<input type='radio' name='" + gameFunctionInfo.alias + "_" + i + "' id='" + gameFunctionInfo.alias + "_1" + "' value=1 onclick='alert(\"此功能已被禁用!\");event.returnValue = false;'>显示" +
                        "<input type='radio' name='" + gameFunctionInfo.alias + "_" + i + "' id='" + gameFunctionInfo.alias + "_0" + "' value=0 onclick='alert(\"此功能已被禁用!\");event.returnValue = false;'>隐藏" +
                        "</td><td class='userbtnclick'>"+
                        "<input type='button' class='userinputbtn' value='同类版本' title='将此项配置应用于当前版本' onclick='oneGameFunction(2,\"" + gameFunctionInfo.alias + "_" + i + "\",\"" + statusName + "\")'>" +
                        "<input type='button' class='userinputbtn1' value='所有版本' title='将此项配置应用于所有版本' onclick='oneGameFunction(1,\"" + gameFunctionInfo.alias + "_" + i + "\",\"" + statusName + "\")'>" +
                        "</tr>");
                } else {
                    trObj3.append("<tr class='showtr'><td class='name'>" + gameFunctionInfo.title + "：</td>" +
                        "<td class='userOpera'>" +
                        "<input type='radio' name='" + gameFunctionInfo.alias + "_" + i + "' id='" + gameFunctionInfo.alias + "_1" + "' value=1>显示" +
                        "<input type='radio' name='" + gameFunctionInfo.alias + "_" + i + "' id='" + gameFunctionInfo.alias + "_0" + "' value=0>隐藏" +
                        "</td><td class='userbtnclick'>"+
                        "<input type='button' class='userinputbtn' value='同类版本' title='将此项配置应用于当前版本' onclick='oneGameFunction(2,\"" + gameFunctionInfo.alias + "_" + i + "\",\"" + statusName + "\")'>" +
                        "<input type='button' class='userinputbtn1' value='所有版本' title='将此项配置应用于所有版本' onclick='oneGameFunction(1,\"" + gameFunctionInfo.alias + "_" + i + "\",\"" + statusName + "\")'>" +
                        "</tr>");
                }

                trObj3.appendTo($('#contentBody'));
                if (trObj3.children("td").length >= 6) {
                    trObj3 = $("<tr/>");
                }
                var suffix = gameFunctionStatus == 0 ? 0 : 1;
                $('#' + gameFunctionInfo.alias + "_" + suffix).attr("checked", "checked");
            }
        }
        trObj1.appendTo($('#contentBody'));
        trObj2.appendTo($('#contentBody'));
        var matchIdSuffix = statusJson.match == 0 ? 0 : 1;
        $('#match_' + matchIdSuffix).attr("checked", "checked");
        if (statusJson.sandbox == undefined) {
            $('#sandbox_1').attr("checked", "checked");
        } else {
            var sandboxIdSuffix = statusJson.match == 0 ? 0 : 1;
            $('#sandbox_' + sandboxIdSuffix).attr("checked", "checked");
        }
        trObj3.find('radio').attr("style", "margin-top:-5px;margin-left:2px;margin-right:2px");
       // $('.modalBtn').attr("style", "height:20px;margin-top:-2px;padding-top:0px !important");
      }
    },
    //提交新增、修改游戏功能开关状态信息
    //type:1应用所有版本\2应用当前版本\3设为默认配置\4保存此项配置
    //opType:1新增\2修改
    gameFunction(type, opType) {
        var statustipM2 = this.form.value1;
        var statusvalueM2 =this.form.value3;
        var statusdescriptionM2 = this.form.value5;
        if (statustipM2 == "") {
            alert("请输入状态显示名称！");
            return;
        }
        if (statusdescriptionM2 == "") {
            alert("请输入字符的描述！");
            return;
        }
        let functionName;
        let idx;
        let val;
        let featureArr = new Array();
        let feature = "";
        let statusString = new Map();
        let statusStringName = new Array();
        let statusStringValue = new Array();
        let checkedInputs = $("#contentBody input:checked");
        let textInputs = $("#contentBody .textCheck");
        let length=textInputs.length;
        for (var j = 0; j < textInputs.length; j++) {
            checkedInputs.push(textInputs.get(j));
        }
        for (var i = 0; i < checkedInputs.length; i++) {
            statusStringName[i] = checkedInputs.get(i).name;//name后缀表示位置
            val = checkedInputs.get(i).value.trim() == '' ? 0 : checkedInputs.get(i).value;
            if (statusStringName[i].indexOf("_") != -1) {
                var statusNameArr = statusStringName[i].split("_");
                functionName = statusNameArr[0];
                idx = statusNameArr[1];
                //36 37功能不做特殊处理
                if (idx != 36 && idx != 37) {
                    //0否，非0是;此处所有的“是”都为1，将1转为任意随机数
                    val = val == 0 ? 0 : parseInt(Math.random() * 9 + 1, 10);
                }
                if (i == idx) {
                    featureArr[i] = val;
                } else {
                    var diff = idx - i;
                    //生成1-9的随机数
                    var tempVal = parseInt(Math.random() * 9 + 1, 10)
                    for (var m = 0; m <= Math.abs(diff); m++) {
                        if (diff < 0) {
                            if (m != Math.abs(diff)) {
                                if (featureArr[i + m] == null) {
                                    featureArr[i + m] = tempVal;
                                }
                            } else {
                                featureArr[idx] = val;
                            }
                        } else if (diff > 0) {
                            if (m != Math.abs(diff)) {
                                if (featureArr[i - m] == null) {
                                    featureArr[i - m] = tempVal;
                                }
                            } else {
                                featureArr[idx] = val;
                            }
                        }
                    }
                }
            } else {
                statusString.set(statusStringName[i], val);
            }
        }
        for (var n = 0; n < featureArr.length; n++) {
            feature += featureArr[n];
        }
        statusString.set("feature", feature);
        this.form.value4=this.map2json(statusString);
        let param={
            statusName:this.form.value1, //状态名字
            statusTip: this.form.value2, //状态显示名字
            statusValue: this.form.value3, //状态数值
            statusString: this.form.value4, //状态字符
            statusDescription: this.form.value5,//状态描述
            statusType: this.form.value6, //类型
            opType: opType,
            type: type,
            departmentId: (this.checkedList).toString()
        }
        this.$api.systemStatusInfogameFunction(param).then(res =>{
            if (res.success) {
                this.$message({
                message: res.message,
                type: "success"
                });
                this.$emit('shuaxin');
                this.$emit('closedialog');
            }else{
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
    map2json(strMap){
      let obj= Object.create(null);
        for (let[k,v] of strMap) {
          obj[k] = v;
        }
        return JSON.stringify(obj);

    },
    getGameFunctionInfo(idx) {
        return this.gameFunctions[idx];
    },
    //游戏功能开关单个状态修改
    //type:1应用所有版本\2应用当前版本;param要修改的配置名;statusName系统状态名
    oneGameFunction(type, param, statusName){
        var paraStatus;
        if (param == "swsdksvconfig_36" || param == "swsdksvpaytype_37") {
            paraStatus = $('input[name=' + param + ']').val().trim() == '' ? 0 : $('input[name=' + param + ']').val();
        } else {
            paraStatus = $('input[name=' + param + ']:checked').val();
        }
        this.$nextTick(function(){
            let setparam={
                type: type,
                param: param,
                statusName: statusName,
                paramStatus: paraStatus,
                token:sessionStorage.getItem("token"),
                userID:this.userID
            }
            this.$api.systemStatusInfooneGameFunction(setparam).then(res =>{
                if (res.success) {
                    this.$message({
                        message: res.message,
                        type: "success"
                    });
                }else{
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
        })
    },
    //取消按钮操作
    cancel() {
      this.resetForm();
      this.$emit('closedialog');
    },
    resetForm() {
      this.$refs["form"].resetFields();
    },
  }
};
</script>
<style>
#contentBody{
  width:100%;
  float: left;
}

.showtr{
  width:50%;
  float: left;
  margin:10px 0;
}

.showtr .name{
  width:33%;
  float: left;
  display:inline-block;
  text-align: right;
  font-size:13px;
}
.showtr .userOpera{
  width:26%;
  float: left;
  display:inline-block;
  font-size:13px;
}
.userOpera .textCheck{
    width: 50px;
    height: 20px;
    margin-left: 5px;
}
.showtr .userbtnclick{
  width:37%;
  float: left;
  display:inline-block;
}
.showtr .userbtnclick .userinputbtn{
  display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #DCDFE6;
    border-color: #DCDFE6;
    color: #606266;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: none;
    margin: 0 5px;
    -webkit-transition: .1s;
    transition: .1s;
    font-weight: 400;
    padding: 5px 10px;
    font-size: 12px;
    border-radius: 3px;
    color: #fff;
    background-color: #FFBA00;
    border-color: #FFBA00;
}
.showtr .userbtnclick .userinputbtn1{
  display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #DCDFE6;
    border-color: #DCDFE6;
    color: #606266;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: none;
    margin: 0 5px;
    -webkit-transition: .1s;
    transition: .1s;
    font-weight: 400;
    padding: 5px 10px;
    font-size: 12px;
    border-radius: 3px;
    color: #fff;
  background-color: #ff4949;
  border-color: #ff4949;
}
</style>
<style scoped>
.el-form{
  width:100%;
  float: left;
  margin:3% 0;
}
.el-form-item{
  width:auto;
  float: left;
  margin-bottom:20px;
}
.el-input{
  width:120%;
  margin-bottom:0px;
}
.el-select{
    width:90%;
}
.el-checkbox-group{
  width:100%;
}
.el-checkbox {
  width: auto;
  float: left;
  margin-right: 15px;
  margin-bottom:10px;
}
.el-checkbox__label {
  float: left;
  padding-left: 0;
}
.addSpecalcss{
  width:100%;
  float: left;
}
.dialog-footer{
    width:100%;
    float: left;
    text-align: right;
    padding-right:3%;
    margin-bottom: 4%;
    margin-top:2%;
}
</style>
