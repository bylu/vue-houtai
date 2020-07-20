export default {
    //数字千分位
    numThousandth(num){
        if(num != null){
        return num.toString().replace(/\d+/, function (n) { // 先提取整数部分
            return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) { // 对整数部分添加分隔符
            return $1 + ",";
            });
        });
        }else{
        return 0 ;
        }
    },
    //格式化日期+时间
    formatDateTime(str){
        if(str){
        let date = new Date(str);
        let year = date.getFullYear();
        let month = (date.getMonth() + 1).toString().padStart(2,'0');
        let day = date.getDate().toString().padStart(2,'0');
        let hour = date.getHours().toString().padStart(2,'0');
        let minute = date.getMinutes().toString().padStart(2,'0');
        let second = date.getSeconds().toString().padStart(2,'0');
        return `${year}-${month}-${day} ${hour}:${minute}:${second}`
        }
        return str;
    },
    //获取当前日期
    getCurDate(days){
        let curDateTime = new Date().getTime() + 1000*60*60*24*(+days || 0); // days 前(-)或后(+)的天数
        let curDate = new Date(curDateTime);
        let year = curDate.getFullYear();
        let month = curDate.getMonth() + 1;
        let day = curDate.getDate();
        return `${year}-${month < 10 ? "0" + month : month}-${day < 10 ? "0" + day : day}`
    },
    formatSecondTime(msd){//格式化秒  转化为 小时 分钟
        var time =msd

        if (null != time && "" != time) {

        if (time > 60 && time < 60 * 60) {

        time = parseInt(time / 60.0) + "分钟" + parseInt((parseFloat(time / 60.0) -

        parseInt(time / 60.0)) * 60) + "秒";

        }

        else if (time >= 60 * 60 && time < 60 * 60 * 24) {

        time = parseInt(time / 3600.0) + "小时" + parseInt((parseFloat(time / 3600.0) -

        parseInt(time / 3600.0)) * 60) + "分钟" +

        parseInt((parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) -

        parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) * 60) + "秒";

        } else if (time >= 60 * 60 * 24) {

        time = parseInt(time / 3600.0/24) + "天" +parseInt((parseFloat(time / 3600.0/24)-

        parseInt(time / 3600.0/24))*24) + "小时" + parseInt((parseFloat(time / 3600.0) -

        parseInt(time / 3600.0)) * 60) + "分钟" +

        parseInt((parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) -

        parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) * 60) + "秒";

        }

        else {

        time = parseInt(time) + "秒";

        }

        }
        return time;
    },
    //格式化渠道
    formatSpreaderID(value){
        return {
            "-1": '无',
            "null": '无',
        }[value] || value
    },
    //字段百分比
    formatDouble(value){
        return {
            "": '---',
            "null": '---',
        }[value] || (value*100).toFixed(2)+"%";
    },
    checkuserEamilType(value){
        return{
            "-1":"全部",
            "0":"其他",
            "2":"活动",
            "3":"补偿",
            "4":"召回"
          }[value] || value
    },
    null2Zero(value) {
        return {
            "": '0',
            "null": '0',
        }[value] || value
    },
    null2empty(value) {
        return {
            "": '无',
            "null": '无',
        }[value] || value
    },
    //判断是否为空,返回字符串
    isNull(value){
        return {
            "null": '无',
        }[value] || value
    },
    //添加万分位分隔符
    numTenthousand(num){
        if(num != null){
        return num.toString().replace(/\d+/, function (n) { // 先提取整数部分
            return n.replace(/(\d)(?=(\d{4})+$)/g, function ($1) { // 对整数部分添加分隔符
            return $1 + ",";
            });
        });
        }else{
        return 0 ;
        }
    },
    //添加万分位分隔符  返回 无
    numTenthousandOrNull(num){
        if(num != null){
        return num.toString().replace(/\d+/, function (n) { // 先提取整数部分
            return n.replace(/(\d)(?=(\d{4})+$)/g, function ($1) { // 对整数部分添加分隔符
            return $1 + ",";
            });
        });
        }else{
        return "无";
        }
    },
    RiQi(sj){
        if(sj != null){
            var now = new Date(sj);
            var year=now.getFullYear();
            var month=now.getMonth()+1;
            var date=now.getDate();
            var hour=now.getHours();
            var minute=now.getMinutes();
            var second=now.getSeconds();
            return year+"-"+month+"-"+date+"   "+hour+":"+minute+":"+second;
        }else{
            return "无";
        }
   },
   checkEmail(email){
        if(null==email || ''==email){
            return '无';
        }
        var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
        if(reg.test(email)){
            email=email.toString().substring(0,3)+"****"+email.toString().substring(email.toString().indexOf("@"));
            return email;
        }else{
            return email;
        }
    },
    //手机号码隐藏中间信息
    checkMobiphone(phone){
        if(phone==null || ""==phone){
            return '无' ;
        }
        var reg = /^1[0-9]{10}$/;
        if(reg.test(phone)){
        //如果是手机号码就隐藏中间四位
            phone=phone.toString().substring(0,3)+"****"+phone.toString().substring(7);
            return phone;
        }else{
            //如果不是手机号码格式的 就直接返回
            return phone.toString().substring(0,3)+"****"+phone.toString().substring(7);
        }
    },
    showExtparams(obj){
        if(null!=obj && ''!=obj){
            if(obj.indexOf("prop_id")>0){
                return "道具";
            }else{
                return "游戏币";
            }
        }else{
            return 0;
        }
    },
    promotionStatue(value){
        return {
            "1": '进行中',
        }[value] || '已结束'
    },
    usershoprushconfigTypeidStatue(value){
        return {
            "1": '免费',
            "2":"付费",
        }[value] || '全部'
    },
    usershoprushconfigShowStatue(value){
        return {
            "1": '下午',
            "2":"上午",
        }[value] || '全部'
    },
    exceptionuserTypeStatue(value){
        return {
            "1": '流量/话费兑换',
            "2":"外挂",
        }[value] || '全部状态'
    },
    checkServerRoominfoManager(value){
        return{
            "0":"未启动",
            "1":"启动中",
            "2":"已启动",
            "3":"关闭中",
            "4":"已关闭"
          }[value] || value
    },
    checkServerNameData(value){
        return {
            "": '未配置',
            "null":"未配置",
        }[value] || value
    },
    checkNodeNameData(value){
        return {
            "": '未绑定',
            "null":"未绑定",
        }[value] || value
    },
    isChanneluser(value) {
        return {
            "1": '是',
        }[value] || '否'
    },
    nullityCheck(value) {
        return {
            "1": '禁用',
        }[value] || '启用'
    },
    changeversionCheck(value){
        return{
            "0#":"不限制",
            "gt#":"大于",
            "gteq#":"大于等于",
            "lt#":"小于",
            "lteq#":"小于等于",
            "eq#":"等于"
        }[value] || value
    },
    changespreaderCheck(value){
        return{
            "0#":"不限制",
            "in#":"包含",
            "ex#":"不包含"
        }[value] || value
    },
    msgTypeCheck(value){
        return{
            "0#":"不限制",
            "in#":"包含",
            "ex#":"不包含"
        }[value] || value
    },
    isupdateCheck(value){
        return{
            "0":"不更新",
            "1":"非强制更新",
            "2":"强制更新"
        }[value] || value
    },
    updateTypeCheck(value){
        return{
            "0":"自动",
            "1":"跳转",
        }[value] || value
    },
    checkActivePhone(value){
        return{
            "0":"全部",
            "1":"苹果",
            "2":"安卓"
        }[value] || value
    },
    xiandingType(value){
        return {
            "": '未限定',
            "null":"未限定",
            "0":"未限定",
        }[value] || value
    },
    typeCheck(value){
        return{
            "0":"通用版本",
            "1":"大版本",
            "2":"指定版本"
        }[value] || value
    },
    qudaoTypeCheck(value){
        return{
            "1":"联运",
            "2":"CPS",
        }[value] || value
    },
    areaCheck(value){
        return{
            "1":"北区",
            "2":"南区",
        }[value] || value
    },
    platFormCheck(value){
        return{
            "-1":"选择类型",
            "1":"appstore",
            "2":"其他",
        }[value] || value
    },
    isSpreaderCheck(value){
        return{
            "0":"管理员",
            "1":"渠道管理员",
            "2":"外放渠道管理员",
        }[value] || value
    },
    permissiontype(value) {
        return {
            "0": '正常',
        }[value] || '冻结'
    },
    permissionTypeCheck(value) {
        return {
            "0": '查看权限',
            "1": '页面权限',
            "2":'表内权限',
            "3":'行内权限',
            "4":'行内双击权限'
        }[value] || value
    },
    qudaostatue(value){
        return {
            "0": '关闭',
            "1": '开启'
        }[value] || value
    },
    isRead(value){
        return{
            "false":'未读',
        }[value] || '已读'
    },
    examinstatus(value){
        return {
            "0": '全部状态',
            "1": '流量/话费兑换',
            "2": '外挂'
        }[value] || value
    },
    serverIdStatue(value){
        if(value == null){
            return '离线'
        }else{
            return '在线'
        }
    },
    typeIdStatue(value){
        return {
            "1": '白银卡幸运豆场',
            "2": '黄金卡幸运豆场',
            "3": '钻石卡幸运豆场',
            "4": '白银卡绿钻场',
            "5": '黄金卡绿钻场',
            "6": '钻石卡绿钻场'
        }[value] || value
    },
    checktradeType(value){
        return {
            "1":"存款",
            "2":"取款",
            "3":"邀请获取",
            "4":"被邀请获取",
            "5":"封红包",
            "6":"拆红包",
            "7":"聊天扣费",
            "8":"土豪返利",
            "9":"排行榜发奖",
            "10":"系统奖励",
            "11":"赠送道具",
            "12":"奖券兑豆",
            "13":"vip领取",
            "121":"签到",
            "134":"充值",
            "135":"补单",
            "300":"登陆领奖",
            "666":"绑定手机",
            "667":"绑定邮箱",
            "669":"抢购活动",
            "700":"赠送"
        }[value] || value
    },
    checkShopType(value){
        return{
            "1":"话费",
            "2":"实物",
            "3":"京东卡",
            "4":"流量",
            "5":"道具",
            "6":"台历",
            "7":"生活用品",
            "8":"游戏周边",
            "9":"其他",
            "10":"电子卡券"
        }[value] || value
    },
    checkIsopenType(value){
        return{
            "1":"开启",
            "0":"关闭",
        }[value] || value
    },
    checkSurveycheckbox(value){
        return{
            "1":"多选题",
            "0":"单选题",
        }[value] || value
    },
    userReportType(value){
        return{
            "1":"外挂",
            "0":"其他",
            "2":"广告"
        }[value] || value
    },
    checkIspopType(value){
        return{
            "1":"弹出",
            "0":"不弹出",
        }[value] || value
    },
    payTypeStatue(value){
        return {
            "1": '对方的sdk',
            "2": '官方sdk',
            "3": '三网支付',
            "4": '苹果商店',
        }[value] || value
    },
    drawTypeStatue(value){
        return {
            "0": '被邀请用户得分',
            "1": '邀请用户得分',
            "2": '成功发送一次邀请码',
            "3": '分享到QQ空间',
            "4": '分享到朋友圈',
            "5": '累积分享次数',
        }[value] || value
    },
    operationStatue(value){
        return {
            "sell": '出售',
            "get": '获取',
            "use": '使用',
            "compose": '合成',
            "exg": '转移',
            "useInGame": '游戏内使用',
        }[value] || value
    },
    optStatue(value){
        return {
            "gainXP": '经验',
            "login": '登陆',
            "charge": '充值'
        }[value] || value
    },
    monitoringStatue(value){
        return {
            "1": '监控',
        }[value] || '未监控'
    },
    iconStatus(value){
        return {
            "0": '停用',
        }[value] || '启用'
    },
    checkPrizeid(value){
        return {
            "1": '奖卷',
            "2": '水晶',
        }[value] || value
    },
    checkDropType(value){
      return {
        "1": '击杀掉落',
        "3": '击中掉落',
      }[value] || value
    },
    showItem(value){
        return {
            "-1": '幸运豆',
            "100307": '房卡',
        }[value] || ''
    },
    formateStatus(value){
        return {
            "0": '未完成',
            "null": 'null',
        }[value] || '完成'
    },
    examinStatus(value){
        return {
            "0": '未审核',
            "1": '审核未通过',
        }[value] || '审核通过'
    },
    qiaoDaoTypeStatue(value){
        return {
            "1": '正常签到',
        }[value] || '累计签到'
    },
    flagStatue(value){
        return {
            "1": '已发送',
        }[value] || '未发送'
    },
    recvStatue(value){
        return {
            "-1": '已领',
        }[value] || '未领'
    },
    inviteRedPackUserStatue(value){
        return {
            "0": '未授权',
            "1": '已授权,未绑定',
            "2": '已授权,已绑定'
        }[value] || value
    },
    dianZanType(value){
        return {
            "0": '捕鱼达人',
            "1": '奖券达人',
            "2": '在线时长达人',
            "3": '每日之星',
            "4": '充值获取积分',
            "5": '道具积分',
            "6": '土豪榜',
            "7": '捕鱼总数',
            "8": '俱乐部活跃排行',
        }[value] || '无'
    },
    nameSkillUseLog(value){
        return {
            "101": '101(锁定)',
            "102": '102(定屏)',
            "103": '103(加速)',
            "104": '104(低级神灯)',
            "105": '105(高级神灯)',
        }[value] || value
    },
    shopGoodsRecordStatue(value){
        return {
            "0": '未发货',
            "1": '发货中...',
            "2": '已发货',
        }[value] || '已撤销'
    },
    channelStatue(value){
        return {
            "1": '同桌',
            "2": '房间',
        }[value] || '喇叭'
    },
    checkActiveChannel(value){
        return {
            "": '全部开启',
            "null": '全部开启',
          }[value] || value
    },
    costTypeStatue(value){
        return {
            "1": '道具',
            "2": '鱼分',
            "3": '身上幸运豆'
        }[value] || '喇叭'
    },
    configIdStatue(value){
        return {
            "1": '新手赚金赛',
            "2": '2人快速赛',
            "3": '5元话费赛'
        }[value] || '2人高手赛'
    },
    showtypeStatue(value){
        return {
            "0": '全显示',
            "1": '手机游戏商城',
            "2": '微信商城'
        }[value] || '游戏商城内页显示'
    },

    checkRetatype(value){
        return {
          "0": '全部',
          "1": '非付费',
          "2": '付费',
        }[value] || value
    },
    checkGameid(value){
        return {
            "1": '捕鱼m1',
            "2": '捕鱼m2',
            "3":'捕鱼2',
            "4":'电玩城',
            "5":'水浒传',
            "6":'pp捕鱼',
            "7":'捕鱼怀旧版本',
            "8":'街机三国',
            "9":'孵化小组-真人对战捕鱼',
            "10":'四川墨菲渠道',
            "11":'缅甸外放版本',
            "12":'百易h5斗地主',
            "13":'踏仙途',
            "14":'英文版本捕鱼(代码是捕鱼2的)',
            "15":'踏仙途新版本',
            "16":'新捕鱼',
            "17":'26楼新捕鱼'
        }[value] || value
    },
    platformType(value){
        return {
            "1": 'android',
            "2": 'ios',
        }[value] || value
    },
    isLog(value){
        return {
            "0": '不打印',
            "1": '打印',
        }[value] || value
    },
    payStatue(value){
        return {
          "0": '正常',
          "1": '禁用'
        }[value] || value
    },
    thirdCallbackType(value){
        return{
            "1":"get",
            "2":"post",
            "3":"数据流",
            "4":"post+第三方渠道服务器ip",
            "5":"header头获取第三方回调信息",
            "6":"get＋数据流获取回调消息",
            "7":"以数据流形式传送字符串",
          }[value] || value
    },
    checkstatusType(value){
        return{
            "0":'未指定',
            "1":'游戏功能开关',
            "2":'充值配置'
        }[value] || value
    },
    needFirstCharge(value){
        return{
            "1":'需完成首充',
        }[value] || '不限制'
    },
    checkPhoneType(value){
        return{
            "0":'全部',
            "1":'苹果',
        }[value] || '安卓'
    },
    checknoPopVersionList(value){
        return{
            "0":'不限',
            "": '不限',
            "null": '不限',
        }[value] || value
    },
    checklimitActivityTimeUser(value){
        return{
            "0":'不限',
            "1": '是',
        }[value] || '否'
    },
    checklimitRegisterTimeUser(value){
        return{
            "0":'不限',
            "": '不限',
            "null": '不限',
        }[value] || value
    },
    checkallowVipShow(value){
        return{
            "-1":'不限',
            "": '不限',
            "null": '不限',
        }[value] || value
    },
    checkmatchPrize(value){
        return{
            "":'不通过',
            "null": '不通过',
        }[value] || value
    },
    checkwinMax(value){
        return{
            "true":'是',
        }[value] || '否'
    },
    checkBindtype(value){
        return{
            "1":'绑定',
        }[value] || '解绑'
    },
    checkPassOrNoPass(value){
        return{
            "1":'不通过',
        }[value] || '通过'
    },
    checkPasswordType(value){
        return{
            "1":'登录密码',
        }[value] || '银行密码'
    },
    checkJinyanType(value){
        return{
            "1":'禁言',
        }[value] || '解除禁言'
    },
    checkFreezeType(value){
        return{
            "1":'冻结',
        }[value] || '解冻'
    },
    checkorderStatus(value){
        return{
            "0":'未付款',
            "2":'付款成功'
        }[value] || '付款待处理'
    },
    checkcraft(value){
        return{
            "true":'开',
        }[value] || '关'
    },
    checkshopdiscountOrisnew(value){
        return{
            "0":'否',
        }[value] || '是'
    },
    checkShopdisable(value){
        return{
            "0":'正常',
        }[value] || '禁用'
    },
}
