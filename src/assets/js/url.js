export default{
  //登陆
  login:"login/userLogin",//登陆
  logout:'login/userLogout',//退出
  getlogincode:'login/getCode',//获取登录验证码
  //用户管理
  userinfo:'users/getUserInfo',//获取登陆信息

  searchUser:'users/search', //  用户管理 查询
  userssaveOrUpdate:'users/saveOrUpdate', //用户管理   新增  修改
  deleteUser:'users/delete',  //用户管理  删除
  usersupdatePsw:"users/updatePsw",// 用户管理 修改密码 右上角
  spreaderManagesearchAll:"spreaderManage/searchAll",//用户管理  关联渠道
  spreaderManageaddRelevance:"spreaderManage/addRelevance",//用户管理  关联渠道的提交按钮

  //角色管理
  roleinfo:'rolesInfo/search',//查询分页
  saverole:'rolesInfo/saveOrUpdate', //保存或者修改角色
  delrole:'rolesInfo/delRole',//删除角色
  searchRoleName:'users/searchRoles',//查询所有角色  选择权限
  searchrolepermisssion:'module/getModules',//查询该角色的权限
  editrolepermisssion:'rolesInfo/updatePermisson',//修改该角色的权限
  //模块管理
  getMenu:'module/search',//查询一级菜单
  addMenu:'module/addModules',//添加..
  removeMenu:'module/delModule',//删除..
  getChildrenMenu:'module/searchChild',//查询二级菜单
  saveChildrenMenu:'module/addModules', //新增或修改二级菜单请求
  modulePermissionsearch:'modulePermission/search',// 查看子模块的  查看功能
  removeChildrenMenu:'module/delModule',//删除二级菜单
  getMenuPermission:'modulePermission/search',//查询二级菜单权限 打开三级菜单
  saveMenuPermission:'modulePermission/saveOrUpdate',//添加 三级菜单
  removeMenuPermission:'modulePermission/delPermission',//删除三级菜单

  spreaderManagesearch:"spreaderManage/search",//渠道管理 查询
  spreaderManagesaveOrUpdate:"spreaderManage/saveOrUpdate",//渠道管理 新增和修改
  spreaderManageaddToIndex:"spreaderManage/addToIndex",//渠道管理 添加渠道到首页
  spreaderManageremoveFromIndex:"spreaderManage/removeFromIndex",//渠道管理 从首页删除

  spreaderOrderCharacterRatesearch:"spreaderOrderCharacterRate/search",//渠道分成管理   查询
  spreaderOrderCharacterRatesaveOrUpdate:"spreaderOrderCharacterRate/saveOrUpdate",//渠道分成管理  添加 和修改
  spreaderOrderCharacterRateselectCPA:"spreaderOrderCharacterRate/selectCPA",//渠道分成管理 查看cpa配置
  spreaderOrderCharacterRateupdateCPA:"spreaderOrderCharacterRate/updateCPA",//渠道分成管理 修改cpa配置
  searchDepartment:"department/search",//查询部门管理
  departmentAddOrUpdate:"department/saveOrUpdate",//部门管理新增和修改
  delDepartment:"department/delete",//删除部门管理

  //首页充值
  channelTopUp:'spreaderAchievement/searchDay',//游戏付费分析-图形 Table
  spreaderAchievementSearchDayBoss:'spreaderAchievement/searchDayBoss',//游戏付费分析-图形 Table BOSS
  channelTopUpBySpreaderId:'spreaderAchievement/searchDayTable',//游戏付费分析-表格 Table
  channelRecharge:'homeIndex/searchByWeek', //首页 今日 昨日 本周 上周信息
  rechargeComparison:'spreaderAchievement/searchCompare',//渠道充值对比
  searchUserByRoom:'onlineUserSpreader/searchTable', //在线用户table
  searchOnlineUserByChannel:'onlineUserSpreader/search', //在线用户曲线图
  //游戏用户
  searchAccountsInfo:"accountsInfo/searchAccountsInfo",//查询
  updateAccountsInfo:"accountsInfo/updateAccountsInfo",//解冻/冻结
  bindCheck:"accountsBindInfo/bindCheck",//绑定手机
  accountsBindInfoverifyCode: "accountsBindInfo/verifyCode",//接收验证码
  gavenickName:"accountsInfo/gavenickName",//修改昵称
  kickOff:"accountsInfo/kickOff",//踢人
  recached:"accountsInfo/recached",//刷新用户缓存
  getUserMessage:"accountsInfo/getUserMessage",//获取用户信息
  chatControl:"accountsInfo/chatControl",//聊天控制
  activeAllConfiguration:'activeAllConfiguration/search', //活动一键配置 查询
  monitor:"onlineUser/monitor",//监控
  onlineUserdelete:"onlineUser/delete",//清除卡线
  moormachine:"accountsInfo/moormachine",//锁定、解锁本机
  externalhanging: "marketingPromotion/bindPlugin",// 外挂

  //在线玩家
  searchOnlineUser:"onlineUser/searchOnlineUser",//在线玩家查询
  onlineUserSearchKind:"onlineUser/searchKind",//游戏列表查询
  onlineUserSearchServerid:"onlineUser/searchServerid",//房间列表查询
  //注册用户
  searchRegisterUser:"registAccountInfo/searchRegisterUser",//注册用户
  searchFreeze:"registerUser/searchFreeze", //解冻、冻结

  //用户基本信息
  searchBasic:"userProfile/searchBasic",//基本信息
  searchTreasure:"userProfile/searchTreasure",//财富信息
  searchLogin:"userProfile/searchLogin",//登录信息

  retentionRateInfo:"retentionRateInfo/search", //用户留存率
  retentionRateInfoBoss:"retentionRateInfo/searchBoss", //用户留存率 Boss
  //头像审核
  accountsIconsearch:"accountsIcon/search",//查询
  accountsIconupdateExaminstatus:"accountsIcon/updateExaminstatus",//操作

  userMailsearch:"userMail/search",//玩家邮件查询

  userItemsearch:"userItem/search",//玩家道具

  //限时抢购
  shopRushConfigsearch:"shopRushConfig/search",//限时抢购查询
  shopRushConfigaddOrUpdate:"shopRushConfig/addOrUpdate",//新增和修改

  searchUserinfoStatistics:"userGameDataBase/searchUserinfoStatistics",//基础游戏数据  查询

  blackListsearch:"blackList/search",//异常用户  查询
  blackListadd:"blackList/add",//异常用户  添加操作
  blackListupdate:"blackList/update",//异常用户  解除黑名单操作
  newUserLtvsearch:"newUserLtv/search",//新用户LTV  查询
  newUserLtvsearchBoss:"newUserLtv/searchBoss",//新用户LTV  查询boss
  //游戏维护

  gameRoomInfosearch:"gameRoomInfo/search",//房间管理  查询
  gameRoomInfomodify:"gameRoomInfo/modify",//房间管理 修改
  onlineUsersearchKind:"onlineUser/searchKind",//选择框 游戏
  activeAllConfigurationsearch:"activeAllConfiguration/search",//活动一键配置 查询

  gameInfosearchGameModel:"gameInfo/searchGameModel",//游戏管理  模块查询
  gameInfosearchGameType:"gameInfo/searchGameType",// 游戏管理 类型查询
  gameInfosearchGameGame:"gameInfo/searchGameGame",// 游戏管理 游戏查询查询
  gameInfoaddGameModel:"gameInfo/addGameModel",// 游戏管理  模块新增和修改
  gameInfoaddGameType:"gameInfo/addGameType",// 游戏管理 类型新增和修改
  gameInfoaddGameGame:"gameInfo/addGameGame",// 游戏管理 游戏新增和修改
  gameInfodelGameModel:"gameInfo/deleteGameModel",// 游戏管理  模块删除
  gameInfodelGameType:"gameInfo/deleteGameType",// 游戏管理 类型删除
  gameInfodelGameGame:"gameInfo/deleteGameGame",// 游戏管理 游戏删除



  systemMessagesearch:"systemMessage/search",// 系统消息   查询
  systemMessageadd:"systemMessage/add",//系统消息  添加修改 （需要再看下是不是正确  编辑和新增是同一个）
  systemMessagedelete:"systemMessage/delete",//系统消息   删除
  systemMessagerefresh:"systemMessage/refresh",//系统消息  刷新

  systemAnnouncementsearch:"systemAnnouncement/search",//手机公告管理  查询
  systemAnnouncementadd:"systemAnnouncement/add",// 手机公告管理  添加和修改
  systemAnnouncementdelete:"systemAnnouncement/delete",// 手机公告管理 删除

  channelUpdatesearch:"channelUpdate/search",// 渠道升级管理  查询
  channelUpdateadd:"channelUpdate/add",// 渠道升级管理  修改和添加
  channelUpdatedelete:"channelUpdate/delete",// 渠道升级管理  删除
  channelUpdatesearchUrl:"channelUpdate/searchUrl",// 渠道升级管理  查看安装包地址

  sysRedPacksearch:"sysRedPack/search",//系统红包 查询
  sysRedPackadd:"sysRedPack/add",//系统红包  添加
  sysRedPackrefresh:"sysRedPack/refresh",//系统红包  刷新

  systemMailsearch:"systemMail/search",// 系统邮件管理  查询
  systemMailadd:"systemMail/add",// 系统邮件管理   发送系统邮件
  systemMaildelete:"systemMail/delete",//系统邮件管理  删除
  systemMailimport:"systemMail/import",// 系统邮件管理  导入的上传文件
  systemMailshowUsers:"systemMail/showUsers",//查看邮件批次

  systemMailimportList:"systemMail/importList",// 系统邮件管理  批量发送邮件
  systemMailimportListbegin:"systemMail/importListBegin",// 系统邮件管理  批量发送邮件  提交
  dirtyWordssearch:"dirtyWords/search",// 敏感词管理 查询
  dirtyWordsadd:"dirtyWords/add",// 敏感词管理 添加和修改
  dirtyWordsrefresh:"dirtyWords/refresh",// 敏感词管理  刷新
  dirtyWordsdelete:"dirtyWords/delete",//敏感词管理 删除
  dirtyWordsimport:"dirtyWords/import",//
  dirtyWordsimportbegin:"dirtyWords/importbegin",
  itemBasesearch:"itemBase/search",//道具管理    查询
  itemBasegiveItem:"itemBase/giveItem",//道具管理  赠送
  itemBaserefresh:"itemBase/refresh",//道具管理  刷新
  itemBaseshiftItem:"itemBase/shiftItem",//道具管理  移植
  itemBasesearchName:"itemBase/searchName",//道具管理   获取物品名字
  itemBaseimport:"itemBase/import",// 道具管理  导入的上传文件
  itemBaseimportbegin:"itemBase/importbegin", //导入数据

  serverRoomInfoManageserversname:"serverRoomInfoManage/serversname",// 房间配置  查询服务器1
  serverRoomInfoManagesearchCoordinationServers:"serverRoomInfoManage/searchCoordinationServers",//房间配置  查询服务器2
  serverRoomInfoManageserversnameSelect:"serverRoomInfoManage/serversnameSelect",// 房间配置  查询服务器1
  serverRoomInfoManagesearchCoordinationServersSelect:"serverRoomInfoManage/searchCoordinationServersSelect",//房间配置  查询服务器2
  serverRoomInfoManagesearch:"serverRoomInfoManage/search",//查询
  ServerRoomInfoManagecontrolServer:"ServerRoomInfoManage/controlServer",//开启关闭
  serverRoomInfoManagegetStock:"serverRoomInfoManage/getStock",//修改游戏库存_查询
  serverRoomInfoManageupdateStock:"serverRoomInfoManage/updateStock",//修改游戏库存

  serverRoomInfoManagegetConfig:"serverRoomInfoManage/getConfig",//房间配置查询
  serverRoomInfoManagegetOperateTime:"serverRoomInfoManage/getOperateTime",//房间查询的时间列表
  serverRoomInfoManagegetHistoryConfig:"serverRoomInfoManage/getHistoryConfig",//房间配置查询——历史
  serverRoomInfoManageupdateConfig:"serverRoomInfoManage/updateConfig",//房间配置修改
  serverRoomInfoManageupdateConfigForAll:"serverRoomInfoManage/updateConfigForAll",//房间配置 修改同渠道 和全部
  serverRoomInfoManagerefreshPropDrop:"serverRoomInfoManage/refreshPropDrop",// 道具修改刷新
  serverRoomInfoManagecopyServerInfo:"serverRoomInfoManage/copyServerInfo",//房间复制
  serverMappersearch:"serverMapper/search",// 服务器查询
  serverMappersave:"serverMapper/save",//服务器绑定
  serverMapperdelete:"serverMapper/delete",//服务器解除

  serverRoomInfoManageupdateServerInfoByOne:"serverRoomInfoManage/updateServerInfoByOne",//渠道绑定解绑

  pkMatchConfigsearch:"pkMatchConfig/search",// 比赛管理 查询
  pkMatchConfigsaveConfig:"pkMatchConfig/saveConfig",// 比赛管理 添加
  pkMatchConfigsearchPkServerid:"pkMatchConfig/searchPkServerid",//  比赛管理  定时开启
  pkMatchConfiggetConfig:"pkMatchConfig/getConfig",//比赛管理  比赛机器人配置修改查询
  pkMatchConfigupdateConfig:"pkMatchConfig/updateConfig",//比赛管理  比赛机器人配置修改
  pkMatchConfigrefreshCache:"pkMatchConfig/refreshCache",//比赛管理  详情/重载奖励/动态添加比赛
  pkMatchConfigdeleteGame:"pkMatchConfig/deleteGame",//比赛管理  删除
  pkMatchConfigtimeStartup:"pkMatchConfig/timeStartup",//定时开启

  pkMatchConfigsearchMatchPrize:"pkMatchConfig/searchMatchPrize",//比赛奖励配置 查询
  pkMatchConfigsaveMatchPrize:"pkMatchConfig/saveMatchPrize",//比赛奖励配置修改
  pkMatchConfigdelPrize:"pkMatchConfig/delPrize",//比赛奖励配置删除

  pkMatchConfiginitItemsPackage:"pkMatchConfig/initItemsPackage",//比赛奖励配置修改_配置选择
  pkMatchConfigpropBag:"pkMatchConfig/propBag",//比赛奖励配置修改_配置道具包选择
  pkMatchConfigdelPackage:"pkMatchConfig/delPackage",//比赛奖励配置修改_配置删除
  pkMatchConfigsavePropBag:"pkMatchConfig/savePropBag",//比赛奖励配置修改_配置道具包选择


  pkMatchConfigsearchRoom:"pkMatchConfig/searchRoom",//比赛房间配置xiuga_查询
  pkMatchConfigsearchFreeRoom:"pkMatchConfig/searchFreeRoom",//比赛房间配置 查询空房间
  pkMatchConfigaddRoom:"pkMatchConfig/addRoom",//比赛房间配置添加
  pkMatchConfigdelRoom:"pkMatchConfig/delRoom",//比赛房间配置删除

  serversInfosearch:"serversInfo/search",//服务器管理 查询
  serversInfoadd:"serversInfo/add",//服务器管理 添加/修改
  serversInfodelete:"serversInfo/delete",//服务器管理 删除
  serversCoordinationsearch:"serversCoordination/search",//服务器管理下拉框查询
  serversCoordinationsearch1:"serversCoordination/search1",//服务器管理-协调服务器管理 查询
  serversCoordinationsaveOrUpdate:"serversCoordination/saveOrUpdate",//服务器管理-协调服务器管理 添加/修改
  serversCoordinationdel:"serversCoordination/del",//服务器管理-协调服务器管理 删除
  serversMappersave:"serversMapper/save",//服务器管理-首页绑定
  serversMapperdelete:"serversMapper/delete",//服务器管理-解除绑定
  systemStatusInfosearch:"systemStatusInfo/search",//系统状态管理 查询
  systemStatusInfosaveOrUpdate:"systemStatusInfo/saveOrUpdate",//系统状态管理 添加/修改(所有的添加和非游戏开关的修改)
  systemStatusInfodelete:"systemStatusInfo/delete",//系统状态管理 删除
  systemStatusInforefresh:"systemStatusInfo/refresh",//系统状态管理 刷新缓存
  systemStatusInfoWinLoseControllerwinLoseOnOff:"systemStatusInfoWinLoseController/winLoseOnOff",//系统状态管理 输赢上线开关控制
  systemStatusInfoiosReview:"systemStatusInfo/iosReview",//系统状态管理 苹果审核开关
  systemStatusInfogameFunction:"systemStatusInfo/gameFunction",//系统状态管理 修改游戏开关的类型
  channelSandboxConfigsearch:"channelSandboxConfig/search",//沙盒账号查询
  channelSandboxConfigopensand:"channelSandboxConfig/opensand",//开启关闭沙盒
  systemStatusInfooneGameFunction:"systemStatusInfo/oneGameFunction",//游戏类型的修改下边那么多的同类版本所有版本

  activitiessearch:"activities/search",//活动系统配置 查询
  activitiesreloadType:"activities/reloadType",//活动类型查询
  activitiesreloadTypeSelect:"activities/reloadTypeSelect",//添加活动类型查询  select
  activitiesadd:"activities/add",//活动系统配置 添加
  activitiesrefresh:"activities/refresh",//活动系统配置 刷新缓存
  activitiesdelete:"activities/delete",//活动系统配置 删除
  activitiescopy:"activities/copy",//活动系统配置 复制

  activitiesShowsearch:"activitiesShow/search", //活动菜单 查询
  activitiesreloadActIdSelect:"activities/reloadActIdSelect", //活动菜单 所属活动查询
  activitiesShowadd:"activitiesShow/add",//活动菜单  添加修改
  activitiesShowdelete:"activitiesShow/delete",//活动菜单 删除
  activitiesShowrefresh:"activitiesShow/refresh",//活动菜单 刷新缓存
  activitiesShowcopy:"activitiesShow/copy",//活动菜单  复制

  gameLogsearch:"gameLog/search",//玩家游戏分析 查询
  gameLogmonitor:"gameLog/monitor",//玩家游戏分析  监控
  gameLogexcel:"gameLog/excel",//玩家游戏分析 下载


  cheatPlayersearch:"cheatPlayer/search",//疑似外挂用户 查询
  itemDropLogsearch:"itemDropLog/search",//道具掉落统计 查询
  itemComposesearch:"itemCompose/search",//道具合成 查询
  itemComposedelete:"itemCompose/delete",//道具合成 删除
  itemComposerefresh:"itemCompose/refresh",//道具合成 刷新
  itemComposeimport:"itemCompose/import",//道具合成  导入的上传文件
  itemComposeimportbegin:"itemCompose/importbegin", //道具合成 导入数据
  itemDropLogsearchOnPage:"itemDropLog/searchOnPage",//物品掉落库存 查询
  itemDropLogadd:"itemDropLog/add",//物品掉落库存 添加/修改数量
  itemDropLogupdate:"itemDropLog/update",//物品掉落库存 修改数量
  itemDropLogcheck:"itemDropLog/check",//物品掉落库存 是否受库存控制

  gameAdvConfigsearch:"gameAdvConfig/search",//广告配置 查询
  gameAdvConfigadd:"gameAdvConfig/add",//广告配置 添加修改
  gameAdvConfigdelete:"gameAdvConfig/delete",//广告配置 删除
  gameAdvConfiggetAllImgs:"gameAdvConfig/getAllImgs",//广告配置 查看图片
  gameAdvConfigsaveImg:"gameAdvConfig/saveImg",
  proxysearch:"proxy/search",//代理状态 查询/刷新
  domainsearch:"domain/search",//域名管理 查询
  domainupdateSelect:"domain/updateSelect",//域名管理 修改查询-获取域名
  domainupdate:"domain/update",//域名管理 修改
  domaindeploy:"domain/deploy",//域名管理-配置 查询
  domainsaveOrUpdate:"domain/saveOrUpdate",//域名管理-配置 添加/修改
  domaindelete:"domain/deletee",//域名管理-配置 删除
  channelInfosearch:"channelInfo/search",//渠道游戏版本管理_查看
  channelInfoadd:"channelInfo/add",//渠道游戏版本管理_新增
  itemMapsearch:"itemMap/search",//道具关系管理 查询
  itemMapimport:"itemMap/import",//道具关系管理  导入的上传文件
  itemMapimportbegin:"itemMap/importbegin", //道具关系管理 导入数据
  baojingsearch:"baojing/search",//报警配置 导入
  baojingsaveOrUpdate:"baojing/saveOrUpdate",//报警配置 添加
  baojingdelete:"baojing/delete",//报警配置 删除
  festivalprizesearch:"festivalprize/search",//节日奖励  查询
  festivalprizesaveOrUpdate:"festivalprize/saveOrUpdate",//节日奖励 新增修改
  festivalprizedelete:"festivalprize/delete",// 节日奖励 删除
  festivalprizeimport:"festivalprize/import",// 节日奖励 导入
  festivalprizeimportbegin:"festivalprize/importbegin",//节日奖励 上传
  festivalprizecopy:"festivalprize/copy",//节日奖励  复制
  festivalprizerefresh:"festivalprize/refresh", //"刷新缓存"



  //充值管理
  shareDetailInfosearch:"shareDetailInfo/search",//订单记录 查询
  shareDetailInfoexcel:"shareDetailInfo/excel",//充值管理 导出excel
  onlineOrdersearch:"onlineOrder/search",//订单管理 查询
  onlineOrderrepair:"onlineOrder/repair",//订单管理  补单
  onlineOrderfindAllSpread:"onlineOrder/findAllSpread",//订单管理   查询框渠道列表
  recordInsuresearch:"recordInsure/search",//银行记录 查询
  recordApplePayRetrysearch:"recordApplePayRetry/search",//苹果充值记录 查询
  rechargePlatFormsearch:"rechargePlatForm/search",//充值平台管理 查询
  rechargePlatFormup:'rechargePlatForm/up',//充值平台管理 新增和修改
  rechargePlatFormdelete:"rechargePlatForm/delete",// 充值平台管理  删除
  shopGoodsConfigsearch:"shopGoodsConfig/search",// 商城物品 查询
  shopGoodsConfigadd:"shopGoodsConfig/saveOrUpdate",//商城物品  添加和修改
  shopGoodsConfigdelete:"shopGoodsConfig/delete",// 商城物品 删除
  shopGoodsConfigaddImg:'shopGoodsConfig/saveImg',//上传图
  rechargeDoubleConfigsearch:"rechargeDoubleConfig/search",// 渠道首充 查询
  rechargeDoubleConfigsaveOrUpdate:"rechargeDoubleConfig/saveOrUpdate",// 渠道首充  添加和修改
  rechargeDoubleConfigdelete:"rechargeDoubleConfig/delete",// 渠道首充  删除
  firstRewardActConfigsearch:"firstRewardActConfig/search",//  话费宝箱 查询
  firstRewardActConfigsaveOrUpdate:"firstRewardActConfig/saveOrUpdate",//  话费宝箱  添加和删除
  firstRewardActConfigdelete:"firstRewardActConfig/delete",//  话费宝箱 删除
  limitPayConfigsearch:"limitPayConfig/search",// 每日充值上限 查询
  limitPayConfigsaveOrUpdate:"limitPayConfig/saveOrUpdate",// 每日充值上限 添加/修改
  limitPayConfigdelete:"limitPayConfig/delete",// 每日充值上限 删除
  limitPayConfigupdate:"limitPayConfig/saveOrUpdate",// 每日充值上限 是否开启/白名单

  //统计报表
  roomRevenuesearch:"roomRevenue/search",//房间收益统计 查询
  roomRevenuesearchName:"roomRevenue/searchName",//查询条件房间名称
  userLossWinsearchUserLossWin:"userLossWin/searchUserLossWin",//用户输赢统计 查询
  spreaderAchievementsearch:"spreaderAchievement/search",//推广员业绩统计 查询
  accountsInfocountAccount:"accountsInfo/countAccount",//推广员业绩统计 低价值用户查看
  // spreaderAchievementsearchDaily:"spreaderAchievement/searchDaily",//推广业绩每日报表 查询
  summaryAllScoresearch:"summaryAllScore/search",//游戏币发行与流通监控 查询
  summaryAllScoresearchSummaryAllScoreForCharts:"summaryAllScore/searchSummaryAllScoreForCharts",//游戏币发行折线统计图
  publishScoreDaysearch:"publishScoreDay/search",//每日发行统计 查询
  registeUserRechargesearch:"registeUserRecharge/search",//注册充值统计 查询
  spreaderChecksearch:"spreaderCheck/search",//对账专用 查询
  clubPayOrdersearch:"clubPayOrder/search",//俱乐部充值明细 查询
  stockRecordsearch:"stockRecord/search",//库存统计分析 查询
  playDurationsearch:"playDuration/search",//房间在线时长 查询
  detailSummaryOfrpsearch:"detailSummaryOfrp/search",//充值统计 查询
  rechargePlatformgetAll:"rechargePlatform/getAll",//充值统计 渠道查询
  systemDayBillssearchByDate:"systemDayBills/searchByDate",//系统每日流水记录 查询
  // promotionsearch:"promotion/search",// 推广活动效果  查询
  spreaderEarningStatisticssearch:"spreaderEarningStatistics/search",//推广收益统计 查询
  spreaderOrderCharacterRatefindAllSpread:"spreaderOrderCharacterRate/findAllSpread",//查询条件渠道
  scoreSourceRecordSearch:"scoreSourceRecord/search",//幸运豆来源记录 查询
  labourUnionSignRecordSearch:"labourUnionSignRecord/signRecord",//俱乐部签到记录 查询
  onlineOrderPointCountSearch:"onlineOrderPointCount/search",//计费点统计 查询
  vipAchievementLogSearch:"vipAchievementLog/searchOnPage",//vip用户管理 查询
  userOnlineTimeSearch:"userOnlineTime/search",//用户在线时长 查询
  userRoomOnlineHours:"userRoomOnlineHours/search",//用户在线查询个人明细
  itemTotalsearch:"itemTotal/search",//道具发行与流通监控 查询
  itemTotalupdateValue:"itemTotal/updateValue",//道具发行与流通监控 修改阈值
  itemTotalByMinutesearchByMinute:"itemTotalByMinute/searchByMinute",//道具发行与流通监控 明细
  itemTotalChartssearchItemCharts:"itemTotalCharts/searchItemCharts",//道具发行与流通监控 明细曲线图

  //财富信息
  rankssearch:"ranks/search",//排行榜奖励 查询
  dataOfCashRedEnvelopesearch:"dataOfCashRedEnvelope/search",//现金红包日志 查询
  inviteRedPackUsersearch:"inviteRedPackUser/search",//现金红包日志 跳转用户邀请信息
  dataOfCashRedEnvelopebufa:"dataOfCashRedEnvelope/bufa",//现金红包日志 补发
  itemRecordsearch:"itemRecord/search",//道具记录 查询
  freeGoldAddsearch:"freeGoldAdd/search",//金币领取记录 查询
  freeGoldExchangesearch:"freeGoldExchange/search",//金币使用记录 查询
  recordInviteOrShareSearch:"recordInviteOrShare/search",//分享得分记录 查询
  inviteUsersearch:"inviteUser/search",//分享得分记录 查看详情
  userWealthRankings:"inviteUserScore/userWealthRankings",//用户财富排行版榜 查询
  arenaSignLogSearch:"arenaSignLog/search",//竞技场积分 查询
  arenaSignLoggetConfig:"/arenaSignLog/getConfig",//竞技场配置查询
  arenaSignLogAdd:"arenaSignLog/add",//竞技场积分 修改配置
  arenaSignLogUpdate: "arenaSignLog/update",
  userPrizeSearch:"userPrize/search",//用户道具统计 查询
  recordUserLoginRewardsearch:"recordUserLoginReward/search",//登录领奖记录
  dayScoreRecordSearch:"dayScoreRecord/search",//每日游戏币记录 查询

  //日志记录
  userOperationLogsearchOnPage:"userOperationLog/searchOnPage",//用户操作记录 查看
  recordUserOperationInfogaveScore:"recordUserOperationInfo/gaveScore",//用户操作记录  7个赠送查询 七个查询按循序1-7
  recordUserOperationInfoupdatePwd:"recordUserOperationInfo/updatePwd",//用户操作记录 修改密码
  recordUserOperationInforecordFreeze:"recordUserOperationInfo/recordFreeze",//用户操作记录  封号解封
  recordUserOperationInforecordBindMobile:"recordUserOperationInfo/recordBindMobile",//用户操作记录  绑定解绑
  recordUserOperationInforecordCheckIcon:"recordUserOperationInfo/recordCheckIcon",//用户操作记录  审核头像
  recordUserOperationInforecordGrantItem:"recordUserOperationInfo/recordGrantItem",//用户操作记录 赠送道具
  recordUserOperationInforecordChatControl:"recordUserOperationInfo/recordChatControl",//用户操作记录 禁言解禁
  activeSearch:"active/search",//游戏活动日志

  redPacketsInfosearch:"redPacketsInfo/search",//红包记录  查询
  redPacketsInfonewCode:"redPacketsInfo/newCode",//红包记录 新增红包码
  redPacketsInfogenerateRedpacket:"redPacketsInfo/generateRedpacket",//红包记录 生成红包
  redPacketsInfoexportExcel:"redPacketsInfo/exportExcel",//红包记录 导出红包
  redPacketsInfosetUsed:"redPacketsInfo/setUsed",//红包记录 修改红包码状态

  recordUserInoutsearch:"recordUserInout/search",//进出记录 查询
  qianDaoLogsearch:"qianDaoLog/search",//签到记录 查询
  messageRecordsearch:"messageRecord/search",//验证码记录 查询
  shopGoodsRecordsearch:"shopGoodsRecord/search",//兑换奖品记录 查询
  shopGoodsRecordadd:"shopGoodsRecord/add",//兑换奖品记录 发货/修改
  shopGoodsRecordUpdateRemark:"shopGoodsRecord/updateRemark",//兑换奖品记录 修改备注
  shopGoodsRecordrepeal:"shopGoodsRecord/repeal",//兑换奖品记录 撤销
  feedBacksearch:"feedBack/search",//用户反馈记录 查询
  feedBackreply:"feedBack/reply",//用户反馈记录 回复
  sealRecordsearch:"sealRecord/search",//封号记录 查询
  accountsBindInfosearch:"accountsBindInfo/search",//用户绑定记录 查询
  accountsBindInfounbindMobile:"accountsBindInfo/unbindMobile",//用户绑定记录 解绑手机操作
  accountsBindInfoupdateMobilePasswd:"accountsBindInfo/updateMobilePasswd",//修改手机密码
  festivalPrizesearch:"festivalPrize/search",//礼包领取记录 查询
  thumBupLogsearch:"thumBupLog/search",//点赞记录 查询
  skillUseLogsearch:"skillUseLog/search",//技能使用技能使用记录 查询
  skillUseLogboss:"skillUseLog/boss",//大小boss召唤次数 查询
  skillUseLogskill:"skillUseLog/skill",//技能使用次数 查询
  skillUseLogskill1:"skillUseLog/skill1",//三次技能的绿钻购买次数 查询
  skillUseLogtongji:"skillUseLog/tongji",//聚宝统计 查询
  chatCostsearch:"chatCost/search",//聊天消耗记录 查询
  juBaoPenLogsearch:"juBaoPenLog/search",//聚宝盆日志 查询
  juBaoPenLoggetScore:"juBaoPenLog/getScore",//聚宝盆日志 获取积分
  juBaoPenLogmodifyScore:"juBaoPenLog/modifyScore",//聚宝盆日志 修改
  gamePromotionLogsearch:"gamePromotionLog/search",//福袋查询 查询
  matchInfosearch:"matchInfo/search",//比赛信息 查询
  matchInfosearchMatchBaoming:"matchInfo/searchMatchBaoming",//比赛信息 详情
  recordUserInoutmatchRecord:"recordUserInout/matchRecord",//比赛记录 查询
  recordUserInoutsignupRecord:"recordUserInout/signupRecord",//报名记录 查询
  skillUseLogskillsStatistical:"skillUseLog/skillsStatistical",//技能统计 查询
  bossLogsearch:"bossLog/search",//BOSS鱼日志 查询
  recordUserLoginSearch:"recordUserLogin/search",//登录日志 查询
  giveLogSearch:"giveLog/search",//玩家赠送日志 查询
  itemStockRecordSearch:"itemStockRecord/search",//物品库存记录 查询
  recordTakGoldSearch:"recordTakeGold/search",//救济金记录 查询
  labourUnionInfoSearch:"labourUnionInfo/searchOnPage",//俱乐部信息 查询
  labourUnionInfoupdate:"labourUnionInfo/update",//俱乐部信息 修改
  labourUnionInfofreeze:"labourUnionInfo/freeze",//俱乐部信息 冻结
  labourUnionInfounFreeeze:"labourUnionInfo/unFreeeze",//俱乐部信息 解冻
  labourUnionMemberSearch:"labourUnionMember/searchOnPage",//俱乐部玩家信息 查询
  labourUnionMemberfreeze:"labourUnionMember/freeze",//俱乐部玩家信息 解冻冻结 （0正常，1冻结）
  labourUnionMemberkickOut:"labourUnionMember/kickOut",//俱乐部玩家信息 踢出
  labourUnionExchageLogSearch:"labourUnionExchangeLog/searchOnPage",//俱乐部商城兑换记录 查询
  privateRoomInfoSearch:"privateRoomInfo/searchOnPage",//私人场玩家信息 查询
  surveySearch:"survey/search",//问卷调查 查询
  surveyimportAll:"survey/importAll",//问卷调查  一键导入
  surveysaveOrUpdate:"survey/saveOrUpdate",//问卷调查  添加和修改
  surveydelete:"survey/delete",//问卷调查  删除
  surveysearchChildAwswer:"survey/searchChildAwswer",//问卷调查 查看答案选项
  surveyaddChildAwswer:"survey/addChildAwswer",//问卷调查 添加答案选项
  surveyupdateChildAwswer:"survey/updateChildAwswer",//问卷调查 修改答案选项
  surveydeleteChildAwswer:"survey/deleteChildAwswer",//问卷调查 删除答案选项
  surveyAdd:'survey/importAll',//一键导入
  juBaoScoreLogSearch: "juBaoScoreLog/search", //聚宝盆积分日志
  userReportInfoSearch:"userReportInfo/search",//举报信息 查询
  modifyNicknameSearch:"modifyNickname/search",//修改昵称记录 查询
  dropLogSearch:"dropLog/search", //物品掉落 查询
  bombUseLogsearch:"bombUseLog/search",//弹头使用记录 查询
  fishRaceBetLogsearch:"fishRaceBetLog/search",//赛鱼押注记录 查询
  fishRaceLogsearch:"fishRaceLog/search",//赛鱼日志 查询
  fishRaceSkillLogsearch:"fishRaceSkillLog/search",//赛鱼技能记录 查询
  userItemCountDaysearch:"userItemCountDay/search",//弹头日志 查询
  userItemCountDaydetail:"userItemCountDay/detail",//弹头日志 详情
  sxpOpenLogopenLogSearch:"sxpOpenLog/openLogSearch",//双响炮开奖记录 查询
  sxpBuyLogsearch:"sxpBuyLog/search",//双响炮购买记录 查询


  //网站运维
  channelPayServiceCfgTempsearch:"channelPayServiceCfgTemp/search",//充值模板 查询
  channelPayServiceCfgTempsaveOrUpdate:"channelPayServiceCfgTemp/saveOrUpdate",//充值模板 添加/修改
  channelPayServiceConfigreloadGameName:"channelPayServiceConfig/reloadGameName",//充值模板 选择游戏名称查询
  channelPayServiceCfgTempsearchTempAll:"channelPayServiceCfgTemp/searchTempAll",//充值配置 选择充值模板查询
  channelPayServiceConfigsearch:"channelPayServiceConfig/search",//充值配置 查询
  channelPayServiceConfigsaveOrUpdate:"channelPayServiceConfig/saveOrUpdate",//充值配置 添加/修改
  channelPayServiceConfigdelete:"channelPayServiceConfig/delete",//充值配置 删除
  /**============数据导出开始==========*/
  excelitemRecord: "excel/itemRecord", //道具获取
  excelwarheadTradingLog:"excel/warheadTradingLog",//弹头交易日志
  excelversionDistributionData:"excel/versionDistributionData",//版本分布数据
  excelshopGoodsRecord:"excel/shopGoodsRecord",//商品兑换记录
  excelwarheadUse:"excel/warheadUse",//弹头使用数量统计
  excelrechargeInterval:"excel/rechargeInterval",//充值区间，手机号未冻结
  exceluserLoginLog:"excel/userLoginLog",//用户登录日志
  excelluckyBeanAllowance:"excel/luckyBeanAllowance",//幸运豆余量查询
  excelspecifyUserInformationimport:"/excel/specifyUserInformation/import",//指定用户信息查询 上传
  excelspecifyUserInformation:"excel/specifyUserInformation",//指定用户信息查询
  exceluserItemAllowance:"excel/userItemAllowance",//道具余量查询
  excelprepaidPhoneLog:"excel/prepaidPhoneLog",//充值日志
  excelregistrationLog:"excel/registrationLog",//注册日志
  /**============数据导出结束==========*/
  getdownloadFile:"excel/searchFile",// 数据下载 打开页面加载数据
  downloadFile:"excel/downloadExcel",//下载数据 操作
  fileDelete:"excel/delete",//删除数据 操作
}
