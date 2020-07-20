import Vue from 'vue'
import Router from 'vue-router'
const NotFound = () => import('@/views/page404.vue')

Vue.use(Router)


let defaultRouter = [
  {
    path: '/login',
    name: 'Login',
    meta:{title:'登录-捕鱼新后台'},
    component: () => import('@/views/login/index'),
  },
  {
    path: '/index',
    iconCls: 'fa fa-home', // 图标样式class
    alias: '/',
    redirect: '/homeIndex',
    component: () => import('@/views/layout/layout'),
    children: [
      {
        path: '/homeIndex',
        iconCls: 'fa fa-dashboard', // 图标样式class
        name: '渠道充值',
        component: () => import('@/views/index/mainIndex'),
        affix:true,
        noCache:true,
      },
      {
        path: '/importData',
        iconCls: 'fa fa-pencil-square-o', // 图标样式class
        name: '重点数据',
        component: () => import('@/views/index/importData'),
      },
      {
        path: '/userindexpay',
        iconCls: 'fa fa-pencil-square-o', // 图标样式class
        name: '在线用户',
        component: () => import('@/views/index/onlineuser'),
      },
      {
        path:'/spreadStatistics',
        iconCls: 'fa fa-pencil-square-o', // 图标样式class
        name: '游戏付费分析',
        component: () => import('@/views/index/spreadStatistics'),
      }
    ]
  },
  {
    path: '/caozuoquanxian',
    iconCls: 'fa fa-universal-access',
    name: '权限操作',
    redirect: '/role',
    component: () => import('@/views/layout/layout'),
    children: [
      {
        path: '/role',
        iconCls: 'fa fa-user-o',
        name: '角色管理',
        component: () => import('@/views/syster/role'),
      },
      {
        path: '/module',
        iconCls: 'fa fa-cog',
        name: '模块管理',
        component: () => import('@/views/syster/module'),
      },
      {
        path:'/userManager',
        iconCls:'fa fa-user-circle',
        name:'用户管理',
        component: () => import('@/views/syster/userManager')
      },
      {
        path:'/spreaderManage',
        iconCls:'fa fa-tachometer',
        name:'渠道管理',
        component: () => import('@/views/syster/spreaderManage')
      },
      {
        path:'/spreaderOrderCharacterRate',
        iconCls:'fa fa-pie-chart',
        name:'渠道分成管理',
        component: () => import('@/views/syster/spreaderOrderCharacterRate')
      },
      {
        path:'/userOperationLog',
        iconCls:'fa fa-map',
        name:'用户操作日志',
        component: () => import('@/views/syster/userOperationLog')
      },
      {
        path:'/oldSpreaderUsers',
        iconCls:'fa fa-pencil-square',
        name:'外放渠道用户',
        component: () => import('@/views/syster/oldSpreaderUsers')
      },
      {
        path:'/department',
        iconCls:'fa fa-id-card-o',
        name:'部门管理',
        component: () => import('@/views/syster/department')
      },
    ]
  },
  {
    path: '/youxiyonghu',
    iconCls: 'fa fa-user-o',
    name: '游戏用户',
    //redirect: '/youxiyonghu/userinfo',
    component: () => import('@/views/layout/layout'),
    children: [
      {
        path: '/userinfo',
        iconCls: 'fa fa-info-circle',
        name: '用户信息',
        component: () => import('@/views/gameuser/userinfo')
      }, {
        path: '/onlineuser',
        iconCls: 'fa fa-user-times', // 图标样式class
        name: '在线玩家',
        component: () => import('@/views/gameuser/onlineuser')
      }, {
        path: '/userbaseinfo',
        iconCls: 'fa fa-tags',
        name: '用户基本信息',
        component: () => import('@/views/gameuser/userbaseinfo')
      }, {
        path: '/userrate',
        iconCls: 'fa fa-sort-amount-asc', // 图标样式class
        name: '用户留存率',
        component: () => import('@/views/gameuser/rateOfuser')
      }, {
        path: '/userfaceicon',
        iconCls: 'fa fa-sort-amount-asc', // 图标样式class
        name: '用户头像审核',
        component: () => import('@/views/gameuser/userFaceicon')
      }, {
        path: '/usermail',
        iconCls: 'fa fa-sort-amount-asc', // 图标样式class
        name: '玩家邮件查询',
        component: () => import('@/views/gameuser/userMail')
      }, {
        path: '/userdaoju',
        iconCls: 'fa fa-sort-amount-asc', // 图标样式class
        name: '用户道具信息',
        component: () => import('@/views/gameuser/userDaoju')
      }, {
        path: '/usergamebasedata',
        iconCls: 'fa fa-sort-amount-asc', // 图标样式class
        name: '用户基础游戏数据',
        component: () => import('@/views/gameuser/userGamebasedata')
      }, {
        path: '/exceptionuser',
        iconCls: 'fa fa-sort-amount-asc', // 图标样式class
        name: '异常用户管理',
        component: () => import('@/views/gameuser/exceptionuser')
      }, {
        path: '/registerUser',
        iconCls: 'fa fa-registered',
        name: '注册用户信息',
        component: () => import('@/views/gameuser/registerUser')
      }, {
        path: '/newUserLTV',
        iconCls: 'fa fa-registered',
        name: '新用户LTV',
        component: () => import('@/views/gameuser/newUserLTV')
      },
      {
        path: '/gameLog',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '玩家游戏分析',
        component: () => import('@/views/gameuser/gameLog')
      },
    ]
  },
  {
    path: '/youxiweihu',
    iconCls: 'el-icon-setting', // 图标样式class
    name: '游戏维护',
    component: () => import('@/views/layout/layout'),
    children: [
      {
        path: '/roomservice',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '房间管理',
        component: () => import('@/views/youxiweihucontent/roomService')
      },
      {
        path: '/shopGoodsConfig',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '游戏商城物品',
        component: () => import('@/views/youxiweihucontent/shopGoodsConfig')
      },
      {
        path: '/activeAllConfiguration',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '活动一键配置',
        component: () => import('@/views/youxiweihucontent/activeAllConfiguration') //每新做一个模板把这个注释解开  这个就是调取的内容
      },
      {
        path: '/gameService',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '游戏管理',
        component: () => import('@/views/youxiweihucontent/gameInfo')
      },
      {
        path: '/systemMessage',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '系统消息',
        component: () => import('@/views/youxiweihucontent/systemMessage')
      },
      {
        path: '/systemAnnouncement',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '手机公告管理',
        component: () => import('@/views/youxiweihucontent/systemAnnouncement')
      },
      {
        path: '/channelUpdate',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '渠道升级管理',
        component: () => import('@/views/youxiweihucontent/channelUpdate')
      },
      {
        path: '/sysRedPack',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '系统红包',
        component: () => import('@/views/youxiweihucontent/sysRedPack')
      },
      {
        path: '/arenaSignLog',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '竞技场积分',
        component: () => import('@/views/youxiweihucontent/arenaSignLog')
      },
      {
        path: '/dirtyWords',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '敏感词管理',
        component: () => import('@/views/youxiweihucontent/dirtyWords')
      },
      {
        path: '/itemBase',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '道具管理',
        component: () => import('@/views/youxiweihucontent/itemBase')
      },
      {
        path: '/serverRoomInfoManage',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '房间配置',
        component: () => import('@/views/youxiweihucontent/serverRoomInfoManage')
      },
      {
        path: '/pkMatchConfig',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '比赛管理',
        component: () => import('@/views/youxiweihucontent/pkMatchConfig')
      },
      {
        path: '/serversInfo',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '服务器管理',
        component: () => import('@/views/youxiweihucontent/serversInfo')
      },
      {
        path: '/serversCoordination',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '协调服务器管理',
        component: () => import('@/views/youxiweihucontent/serversCoordination')
      },
      {
        path: '/systemStatusInfo',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '系统状态管理',
        component: () => import('@/views/youxiweihucontent/systemStatusInfo')
      },
      {
        path: '/cheatPlayer',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '疑似外挂用户',
        component: () => import('@/views/youxiweihucontent/cheatPlayer')
      },
      {
        path: '/itemCompose',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '道具合成',
        component: () => import('@/views/youxiweihucontent/itemCompose')
      },
      {
        path: '/itemDropStock',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '物品掉落库存',
        component: () => import('@/views/youxiweihucontent/itemDropStock')
      },
      {
        path: '/proxy',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '代理状态',
        component: () => import('@/views/youxiweihucontent/proxy')
      },
      {
        path: '/doMain',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '域名管理',
        component: () => import('@/views/youxiweihucontent/doMain')
      },
      {
        path: '/channelInfo',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '渠道游戏版本管理',
        component: () => import('@/views/youxiweihucontent/channelInfo')
      },
      {
        path: '/itemMap',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '道具关系管理',
        component: () => import('@/views/youxiweihucontent/itemMap')
      },
      {
        path: '/baojing',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '报警配置',
        component: () => import('@/views/youxiweihucontent/baojing')
      },
      {
        path: '/festivalprize',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '节日奖励',
        component: () => import('@/views/youxiweihucontent/festivalprize')
      },
    ]
  },
  {
    path: '/paysystem',
    iconCls: 'fa fa-jpy', // 图标样式class
    name: '充值管理',
    component: () => import('@/views/layout/layout'),
    children: [
      {
        path: '/shareDetailInfo',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '充值记录',
        component: () => import('@/views/paysystemcontent/shareDetailInfo')
      },
      {
        path: '/onlineOrder',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '订单管理',
        component: () => import('@/views/paysystemcontent/onlineOrder')
      },
      {
        path: '/recordInsure',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '银行记录',
        component: () => import('@/views/paysystemcontent/recordInsure')
      },
      {
        path: '/recordApplePayRetry',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '苹果充值记录',
        component: () => import('@/views/paysystemcontent/recordApplePayRetry')
      },
      {
        path: '/rechargePlatForm',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '充值平台管理',
        component: () => import('@/views/paysystemcontent/rechargePlatForm')
      },
      {
        path: '/clubPayOrder',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '俱乐部充值明细',
        component: () => import('@/views/paysystemcontent/clubPayOrder')
      },
      {
        path: '/rechargeDoubleConfig',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '渠道首充',
        component: () => import('@/views/paysystemcontent/rechargeDoubleConfig')
      },
      {
        path: '/firstRewardActConfig',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '话费宝箱',
        component: () => import('@/views/paysystemcontent/firstRewardActConfig')
      },
      {
        path: '/limitPayConfig',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '每日充值上限',
        component: () => import('@/views/paysystemcontent/limitPayConfig')
      }
    ]
  },
  {
    path: '/chartInfo',
    iconCls: 'fa fa-area-chart', // 图标样式class
    name: '统计报表',
    component: () => import('@/views/layout/layout'),
    children: [
      {
        path: '/roomRevenue',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '房间收益统计',
        component: () => import('@/views/chartInfocontent/roomRevenue')
      },
      {
        path: '/userItemCountDay',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '每日弹头水晶统计',
        component: () => import('@/views/chartInfocontent/userItemCountDay')
      },
      {
        path: '/userLossWin',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '用户输赢统计',
        component: () => import('@/views/chartInfocontent/userLossWin')
      },
      {
        path: '/spreaderAchievement',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '推广员业绩统计',
        component: () => import('@/views/chartInfocontent/spreaderAchievement')
      },
      {
        path: '/spreaderAchievementDaily',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '推广业绩每日报表',
        component: () => import('@/views/chartInfocontent/spreaderAchievementDaily')
      },
      {
        path: '/summaryAllScore',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '游戏币监控',
        component: () => import('@/views/chartInfocontent/summaryAllScore')
      },
      {
        path:'/summaryAllScoreCharts',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '用户财富总量统计',
        component: () => import('@/views/chartInfocontent/summaryAllScoreCharts')
      },
      // {
      //   path:'/summaryAllScoreCharts1',
      //   iconCls: 'fa fa-sliders', // 图标样式class
      //   name: '用户财富总消耗',
      //   component: () => import('@/views/chartInfocontent/summaryAllScoreCharts1')
      // },
      // {
      //   path:'/summaryAllScoreCharts2',
      //   iconCls: 'fa fa-sliders', // 图标样式class
      //   name: '用户财富总发行',
      //   component: () => import('@/views/chartInfocontent/summaryAllScoreCharts2')
      // },
      {
        path: '/publishScoreDay',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '每日发行统计',
        component: () => import('@/views/chartInfocontent/publishScoreDay')
      },
      {
        path: '/registeUserRecharge',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '注册充值统计',
        component: () => import('@/views/chartInfocontent/registeUserRecharge')
      },
      {
        path: '/spreaderCheck',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '对账专用',
        component: () => import('@/views/chartInfocontent/spreaderCheck')
      },
      {
        path: '/stockRecord',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '库存统计分析',
        component: () => import('@/views/chartInfocontent/stockRecord')
      },
      {
        path: '/playDuration',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '房间在线时长',
        component: () => import('@/views/chartInfocontent/playDuration')
      },
      {
        path: '/detailSummaryOfrp',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '充值统计',
        component: () => import('@/views/chartInfocontent/detailSummaryOfrp')
      },
      {
        path: '/systemDayBills',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '系统每日流水记录',
        component: () => import('@/views/chartInfocontent/systemDayBills')
      },
      {
        path: '/promotion',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '推广活动效果',
        component: () => import('@/views/chartInfocontent/promotion')
      },
      {
        path: '/spreaderEarningStatistics',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '推广收益统计',
        component: () => import('@/views/chartInfocontent/spreaderEarningStatistics')
      },
      {
        path: '/onlineOrderPointCount',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '计费点统计',
       component: () => import('@/views/chartInfocontent/onlineOrderPointCount')
      },
      {
        path: '/vipAchievementLog',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: 'VIP用户管理',
       component: () => import('@/views/chartInfocontent/vipAchievementLog')
      },
      {
        path: '/userOnlineTime',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '用户在线时长',
        component: () => import('@/views/chartInfocontent/userOnlineTime')
      },
      {
        path:'/userRoomOnlineHours',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '用户房间在线时长',
        component: () => import('@/views/chartInfocontent/userRoomOnlineHours')
      },
      {
        path: '/daoLiang',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '导量统计',
        component: () => import('@/views/chartInfocontent/daoLiang')
      },
      {
        path: '/itemTotalCharts',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '道具余量曲线图',
        component: () => import('@/views/chartInfocontent/itemTotalCharts')
      },
      {
        path: '/itemTotalByMinute',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '道具余量明细',
        component: () => import('@/views/chartInfocontent/itemTotalByMinute')
      },
      {
        path: '/itemTotal',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '道具监控',
        component: () => import('@/views/chartInfocontent/itemTotal')
      },
      {
        path: '/itemDropLog',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '道具掉落统计',
        component: () => import('@/views/chartInfocontent/itemDropLog')
      },
    ]
  },
  {
    path: '/caifuInfo',
    iconCls: 'fa fa-money', // 图标样式class
    name: '财富信息',
    component: () => import('@/views/layout/layout'),
    children: [
      {
        path: '/ranks',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '排行榜奖励',
        component: () => import('@/views/caifuInfocontent/ranks')
      },
      {
        path: '/inviteRedPackUser',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '用户邀请信息',   //供现金红包日志中的邀请人数跳转字段使用
        component: () => import('@/views/caifuInfocontent/inviteRedPackUser')
      },
      {
        path: '/dataOfCashRedEnvelope',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '现金红包日志',
        component: () => import('@/views/caifuInfocontent/dataOfCashRedEnvelope')
      },
      {
        path: '/freeGoldAdd',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '金币领取记录',
        component: () => import('@/views/caifuInfocontent/freeGoldAdd')
      },
      {
        path: '/freeGoldExchange',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '金币使用记录',
        component: () => import('@/views/caifuInfocontent/freeGoldExchange')
      },
      {
        path: '/inviteUserScore',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '分享得分记录',
        component: () => import('@/views/caifuInfocontent/inviteUserScore')
      },
      {
        path: '/userWealthRankings',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '用户财富排行榜',
        component: () => import('@/views/caifuInfocontent/userWealthRankings')
      },
      {
        path: '/userPrize',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '用户道具统计',
        component: () => import('@/views/caifuInfocontent/userPrize')
      },
      {
        path: '/recordUserLoginReward',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '登录领奖记录',
        component: () => import('@/views/caifuInfocontent/recordUserLoginReward')
      },
      {
        path: '/dayScoreRecord',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '每日游戏币记录',
        component: () => import('@/views/caifuInfocontent/dayScoreRecord')
      }
    ]
  },
  {
    path: '/logRecord',
    iconCls: 'fa fa-sticky-note', // 图标样式class
    name: '日志记录',
    component: () => import('@/views/layout/layout'),
    children: [
      {
        path: '/recordUserInout',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '进出记录',
        component: () => import('@/views/logRecordcontent/recordUserInout')
      },
      {
        path: '/itemRecord',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '道具记录',
        component: () => import('@/views/logRecordcontent/itemRecord')
      },
      {
        path: '/qianDaoLog',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '签到记录',
        component: () => import('@/views/logRecordcontent/qianDaoLog')
      },
      {
        path: '/messageRecord',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '验证码记录',
        component: () => import('@/views/logRecordcontent/messageRecord')
      },
      {
        path: '/shopGoodsRecord',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '兑换奖品记录',
        component: () => import('@/views/logRecordcontent/shopGoodsRecord')
      },
      {
        path: '/userOperationRecord',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '用户操作记录',
        component: () => import('@/views/logRecordcontent/userOperationRecord')
      },
      {
        path: '/feedBack',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '用户反馈记录',
        component: () => import('@/views/logRecordcontent/feedBack')
      },
      {
        path: '/sealRecord',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '封号记录',
        component: () => import('@/views/logRecordcontent/sealRecord')
      },
      {
        path: '/accountsBindInfo',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '用户绑定记录',
        component: () => import('@/views/logRecordcontent/accountsBindInfo')
      },

      {
        path: '/festivalPrize',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '礼包领取记录',
        component: () => import('@/views/logRecordcontent/festivalPrize')
      },
      {
        path: '/thumBupLog',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '点赞记录',
        component: () => import('@/views/logRecordcontent/thumBupLog')
      },
      {
        path: '/skillUseLog',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '技能使用记录',
        component: () => import('@/views/logRecordcontent/skillUseLog')
      },
      {
        path: '/chatCost',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '聊天消耗记录',
        component: () => import('@/views/logRecordcontent/chatCost')
      },
      {
        path: '/juBaoPenLog',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '聚宝盆日志',
        component: () => import('@/views/logRecordcontent/juBaoPenLog')
      },
      {
        path: '/gamePromotionLog',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '福袋查询',
        component: () => import('@/views/logRecordcontent/gamePromotionLog')
      },
      {
        path: '/matchInfo',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '比赛信息',
        component: () => import('@/views/logRecordcontent/matchInfo')
      },
      {
        path: '/gameRecord',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '比赛记录',
        component: () => import('@/views/logRecordcontent/gameRecord')
      },
      {
        path: '/baomingRecord',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '报名记录',
        component: () => import('@/views/logRecordcontent/baomingRecord')
      },
      {
        path: '/skillsStatistical',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '技能统计',
        component: () => import('@/views/logRecordcontent/skillsStatistical')
      },
      {
        path: '/bossLog',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: 'BOSS鱼日志',
        component: () => import('@/views/logRecordcontent/bossLog')
      },
      {
        path: '/dropLog',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '物品掉落',
        component: () => import('@/views/logRecordcontent/dropLog')
      },
      {
        path: '/bombUseLog',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '弹头使用记录',
        component: () => import('@/views/logRecordcontent/bombUseLog')
      },
      {
        path: '/fishRaceBetLog',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '赛鱼押注记录',
        component: () => import('@/views/logRecordcontent/fishRaceBetLog')
      },
      {
        path: '/fishRaceLog',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '赛鱼日志',
        component: () => import('@/views/logRecordcontent/fishRaceLog')
      },
      {
        path: '/fishRaceSkillLog',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '赛鱼技能记录',
        component: () => import('@/views/logRecordcontent/fishRaceSkillLog')
      },
      {
        path: '/sxpOpenLog',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '双响炮开奖记录',
        component: () => import('@/views/logRecordcontent/sxpOpenLog')
      },
      {
        path: '/sxpBuyLog',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '双响炮购买记录',
        component: () => import('@/views/logRecordcontent/sxpBuyLog')
      },
      {
        path: '/recordUserLogin',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '登录日志',
         component: () => import('@/views/logRecordcontent/recordUserLogin')
      },
      {
        path: '/giveLog',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '玩家赠送记录',
        component: () => import('@/views/logRecordcontent/giveLog')
      },
      {
        path: '/itemStockRecord',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '物品库存记录',
         component: () => import('@/views/logRecordcontent/itemStockRecord')
      },
      {
        path: '/redPacketsInfo',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '红包记录',
         component: () => import('@/views/logRecordcontent/redPacketsInfo')
      },
      {
        path: '/recordTakeGold',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '救济金记录',
         component: () => import('@/views/logRecordcontent/recordTakeGold')
      },
      {
        path: '/labourUnionInfo',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '俱乐部信息',
         component: () => import('@/views/logRecordcontent/labourUnionInfo')
      },
      {
        path: '/labourUnionMember',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '俱乐部玩家基本信息',
         component: () => import('@/views/logRecordcontent/labourUnionMember')
      },
      {
        path: '/labourUnionExchangeLog',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '俱乐部商城兑换记录',
         component: () => import('@/views/logRecordcontent/labourUnionExchangeLog')
      },
      {
        path: '/labourUnionSignRecord',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '俱乐部签到记录',
        component: () => import('@/views/logRecordcontent/labourUnionSignRecord')
      },
      {
        path: '/privateRoomInfo',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '私人场玩家基本信息',
         component: () => import('@/views/logRecordcontent/privateRoomInfo')
      },
      {
        path: '/gameData',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '游戏活动日志',
         component: () => import('@/views/logRecordcontent/gameData')
      },
      {
        path: '/juBaoScoreLog',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '聚宝盆积分日志',
        component: () => import('@/views/logRecordcontent/juBaoScoreLog')
      },
      {
        path: '/daoJuTongJi',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '鱼掉落道具统计',
        component: () => import('@/views/logRecordcontent/daoJuTongJi')
      },
      {
        path: '/scoreSourceRecord',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '幸运豆来源记录',
       component: () => import('@/views/logRecordcontent/scoreSourceRecord')
      },
      {
        path: '/weChatFeedBack',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '微信反馈记录',
        component: () => import('@/views/logRecordcontent/weChatFeedBack')
      },
      {
        path: '/userReportInfo',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '举报信息',
         component: () => import('@/views/logRecordcontent/userReportInfo')
      },
      {
        path: '/midifyNickname',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '修改昵称记录',
         component: () => import('@/views/logRecordcontent/midifyNickname')
      }
    ]
  },
  {
    path: '/wangzhanyunwei',
    iconCls: 'fa fa-cogs', // 图标样式class
    name: '网站运维',
    component: () => import('@/views/layout/layout'),
    redirect: '/channelPayServiceCfgTemp',  
    children: [
      {
        path: '/channelPayServiceCfgTemp',
        iconCls: 'fa fa-home', // 图标样式class
        name: '充值模板',
        component: () => import('@/views/webyunweiContent/channelPayServiceCfgTemp'),
      },
      {
        path: '/channelPayServiceConfig',
        iconCls: 'fa fa-pencil-square-o', // 图标样式class
        name: '充值配置',
        component: () => import('@/views/webyunweiContent/channelPayServiceConfig'),
      }
    ]
  },
  {
    path: '/shujuSystem',
    iconCls: 'fa fa-database', // 图标样式class
    name: '数据管理',
    component: () => import('@/views/layout/layout'),
    redirect: '/shujutiqu',
    children: [
      {
        path: '/shujutiqu',
        iconCls: 'fa fa-cube', // 图标样式class
        name: '数据提取',
        component: () => import('@/views/shujuSystem/shujutiqu'),
      },
      {
        path: '/shujudownload',
        iconCls: 'fa fa-cloud-download', // 图标样式class
        name: '数据下载',
        component: () => import('@/views/shujuSystem/shujudownload'),
      }
    ]
  },
  {
    path: '/activityManagement',
    iconCls: 'fa fa-gift', // 图标样式class
    name: '活动管理',
    component: () => import('@/views/layout/layout'),
    children: [
      {
        path: '/activities',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '活动系统配置',
        component: () => import('@/views/activityManagementcontent/activities')
      },
      {
        path: '/activitiesShow',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '活动菜单管理',
        component: () => import('@/views/activityManagementcontent/activitiesShow')
      },
      {
        path: '/gameAdvConfig',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '广告配置',
        component: () => import('@/views/activityManagementcontent/gameAdvConfig')
      },
      {
        path: '/systemMail',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '系统邮件管理',
        component: () => import('@/views/activityManagementcontent/systemMail')
      },
      {
        path: '/usershoprushconfig',
        iconCls: 'fa fa-sort-amount-asc', // 图标样式class
        name: '限时抢购管理',
        component: () => import('@/views/activityManagementcontent/userShoprushconfig')
      },
      {
        path: '/survey',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '问卷调查',
         component: () => import('@/views/activityManagementcontent/survey')
      },
    ]
  },

  {
    name:'404',
    path: '*',
    component: () => import('@/views/features/404')
    //component:NotFound
  },
  {
    path: '/401',
    component: () => import('@/views/features/401'),
    hidden: true
  }
]

export default new Router({
  mode: 'hash', //hash history 区别
  scrollBehavior: () => ({ y: 0 }),
  routes: defaultRouter
})
