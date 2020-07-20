import request from  '../assets/js/request'
import url from '../assets/js/url'
export default{
    /**
     * 登录
     * @param {*} url
     * @param {*} params
     */
    Login(params){
        return request.Post(url.login,params)
    },
    getlogincode(params){
        return request.Post(url.getlogincode,params)
    },
    userinfo(params){
        return request.Post(url.userinfo,params)
    },
    logout(params){
        return request.Post(url.logout,params)
    },
    usersupdatePsw(params){
      return request.Post(url.usersupdatePsw,params)
    },
    /**
     * 首页部分
     */
    channelRecharge(params){
        return request.Post(url.channelRecharge,params)
    },
    channelTopUp(params){
        return request.Post(url.channelTopUp,params)
    },
    spreaderAchievementSearchDayBoss(params){
        return request.Post(url.spreaderAchievementSearchDayBoss,params)
    },
    searchOnlineUserByChannel(params){
        return request.Post(url.searchOnlineUserByChannel,params)
    },
    rechargeComparison(params){
        return request.Post(url.rechargeComparison,params)
    },
    searchUserByRoom(params){
        return request.Post(url.searchUserByRoom,params)
    },
    channelTopUpBySpreaderId(params){
        return request.Post(url.channelTopUpBySpreaderId,params)
    },
    /**
     * 统计报表
     */
    roomRevenuesearch(params){
        return request.Post(url.roomRevenuesearch,params)
    },
    roomRevenuesearchName(params){
        return request.Post(url.roomRevenuesearchName,params)
    },
    userLossWinsearchUserLossWin(params){
        return request.Post(url.userLossWinsearchUserLossWin,params)
    },
    spreaderAchievementsearch(params){
        return request.Post(url.spreaderAchievementsearch,params)
    },
    accountsInfocountAccount(params){
        return request.Post(url.accountsInfocountAccount,params)
    },
    summaryAllScoresearch(params){
        return request.Post(url.summaryAllScoresearch,params)
    },
    summaryAllScoresearchSummaryAllScoreForCharts(params){
        return request.Post(url.summaryAllScoresearchSummaryAllScoreForCharts,params)
    },
    publishScoreDaysearch(params){
        return request.Post(url.publishScoreDaysearch,params)
    },
    registeUserRechargesearch(params){
        return request.Post(url.registeUserRechargesearch,params)
    },
    spreaderChecksearch(params){
        return request.Post(url.spreaderChecksearch,params)
    },
    clubPayOrdersearch(params){
        return request.Post(url.clubPayOrdersearch,params)
    },
    stockRecordsearch(params){
        return request.Post(url.stockRecordsearch,params)
    },
    playDurationsearch(params){
        return request.Post(url.playDurationsearch,params)
    },
    detailSummaryOfrpsearch(params){
        return request.Post(url.detailSummaryOfrpsearch,params)
    },
    rechargePlatformgetAll(params){
        return request.Post(url.rechargePlatformgetAll,params)
    },
    systemDayBillssearchByDate(params){
        return request.Post(url.systemDayBillssearchByDate,params)
    },
    spreaderEarningStatisticssearch(params){
        return request.Post(url.spreaderEarningStatisticssearch,params)
    },
    spreaderOrderCharacterRatefindAllSpread(params){
        return request.Post(url.spreaderOrderCharacterRatefindAllSpread,params)
    },
    scoreSourceRecordSearch(params){
        return request.Post(url.scoreSourceRecordSearch,params)
    },
    labourUnionSignRecordSearch(params){
        return request.Post(url.labourUnionSignRecordSearch,params)
    },
    onlineOrderPointCountSearch(params){
        return request.Post(url.onlineOrderPointCountSearch,params)
    },
    vipAchievementLogSearch(params){
        return request.Post(url.vipAchievementLogSearch,params)
    },
    userOnlineTimeSearch(params){
        return request.Post(url.userOnlineTimeSearch,params)
    },
    userRoomOnlineHours(params){
        return request.Post(url.userRoomOnlineHours,params)
    },
    itemTotalsearch(params){
        return request.Post(url.itemTotalsearch,params)
    },
    itemTotalupdateValue(params){
        return request.Post(url.itemTotalupdateValue,params)
    },
    itemTotalByMinutesearchByMinute(params){
        return request.Post(url.itemTotalByMinutesearchByMinute,params)
    },
    itemTotalChartssearchItemCharts(params){
        return request.Post(url.itemTotalChartssearchItemCharts,params)
    },
    userItemCountDaysearch(params){
        return request.Post(url.userItemCountDaysearch,params)
    },
    userItemCountDaydetail(params){
        return request.Post(url.userItemCountDaydetail,params)
    },
    itemBasesearchName(params){
        return request.Post(url.itemBasesearchName,params)
    },
    itemDropLogsearch(params){
        return request.Post(url.itemDropLogsearch,params)
    },
    /**
     * 游戏用户
     */
    searchAccountsInfo(params){
        return request.Post(url.searchAccountsInfo,params)
    },
    updateAccountsInfo(params){
        return request.Post(url.updateAccountsInfo,params)
    },
    gavenickName(params){
        return request.Post(url.gavenickName,params)
    },
    kickOff(params){
        return request.Post(url.kickOff,params)
    },
    recached(params){
        return request.Post(url.recached,params)
    },
    getUserMessage(params){
        return request.Post(url.getUserMessage,params)
    },
    chatControl(params){
        return request.Post(url.chatControl,params)
    },
    externalhanging(params){
        return request.Post(url.externalhanging,params)
    },
    accountsBindInfoverifyCode(params){
        return request.Post(url.accountsBindInfoverifyCode,params)
    },
    bindCheck(params){
        return request.Post(url.bindCheck,params)
    },
    monitor(params){
        return request.Post(url.monitor,params)
    },
    onlineUserdelete(params){
        return request.Post(url.onlineUserdelete,params)
    },
    moormachine(params){
        return request.Post(url.moormachine,params)
    },
    searchRegisterUser(params){
        return request.Post(url.searchRegisterUser,params)
    },
    searchFreeze(params){
        return request.Post(url.searchFreeze,params)
    },
    onlineOrderfindAllSpread(params){
        return request.Post(url.onlineOrderfindAllSpread,params)
    },
    retentionRateInfo(params){
        return request.Post(url.retentionRateInfo,params)
    },
    retentionRateInfoBoss(params){
        return request.Post(url.retentionRateInfoBoss,params)
    },
    onlineUserSearchKind(params){
        return request.Post(url.onlineUserSearchKind,params)
    },
    onlineUserSearchServerid(params){
        return request.Post(url.onlineUserSearchServerid,params)
    },
    searchOnlineUser(params){
        return request.Post(url.searchOnlineUser,params)
    },
    newUserLtvsearch(params){
        return request.Post(url.newUserLtvsearch,params)
    },
    newUserLtvsearchBoss(params){
        return request.Post(url.newUserLtvsearchBoss,params)
    },
    userMailsearch(params){
        return request.Post(url.userMailsearch,params)
    },
    searchTreasure(params){
        return request.Post(url.searchTreasure,params)
    },
    searchBasic(params){
        return request.Post(url.searchBasic,params)
    },
    searchLogin(params){
        return request.Post(url.searchLogin,params)
    },
    userItemsearch(params){
        return request.Post(url.userItemsearch,params)
    },
    searchUserinfoStatistics(params){
        return request.Post(url.searchUserinfoStatistics,params)
    },
    blackListsearch(params){
        return request.Post(url.blackListsearch,params)
    },
    blackListupdate(params){
        return request.Post(url.blackListupdate,params)
    },
    blackListadd(params){
        return request.Post(url.blackListadd,params)
    },
    gameLogsearch(params){
        return request.Post(url.gameLogsearch,params)
    },
    gameLogmonitor(params){
        return request.Post(url.gameLogmonitor,params)
    },
    gameLogexcel(params){
        return request.Post(url.gameLogexcel,params)
    },
    accountsIconsearch(params){
        return request.Post(url.accountsIconsearch,params)
    },
    accountsIconupdateExaminstatus(params){
        return request.Post(url.accountsIconupdateExaminstatus,params)
    },
    /**
     * 游戏维护
     */
    serverRoomInfoManageserversnameSelect(params){
        return request.Post(url.serverRoomInfoManageserversnameSelect,params)
    },
    serverRoomInfoManagesearchCoordinationServersSelect(params){
        return request.Post(url.serverRoomInfoManagesearchCoordinationServersSelect,params)
    },
    serverRoomInfoManagesearch(params){
        return request.Post(url.serverRoomInfoManagesearch,params)
    },
    serverRoomInfoManagerefreshPropDrop(params){
        return request.Post(url.serverRoomInfoManagerefreshPropDrop,params)
    },
    serverMapperdelete(params){
        return request.Post(url.serverMapperdelete,params)
    },
    serverRoomInfoManageupdateServerInfoByOne(params){
        return request.Post(url.serverRoomInfoManageupdateServerInfoByOne,params)
    },
    ServerRoomInfoManagecontrolServer(params){
        return request.Post(url.ServerRoomInfoManagecontrolServer,params)
    },
    serverRoomInfoManagegetStock(params){
        return request.Post(url.serverRoomInfoManagegetStock,params)
    },
    serverRoomInfoManageupdateStock(params){
        return request.Post(url.serverRoomInfoManageupdateStock,params)
    },
    serverRoomInfoManagegetConfig(params){
        return request.Post(url.serverRoomInfoManagegetConfig,params)
    },
    serverRoomInfoManageupdateConfig(params){
        return request.Post(url.serverRoomInfoManageupdateConfig,params)
    },
    serverRoomInfoManageupdateConfigForAll(params){
        return request.Post(url.serverRoomInfoManageupdateConfigForAll,params)
    },
    serverRoomInfoManagegetOperateTime(params){
        return request.Post(url.serverRoomInfoManagegetOperateTime,params)
    },
    serverRoomInfoManagegetHistoryConfig(params){
        return request.Post(url.serverRoomInfoManagegetHistoryConfig,params)
    },
    serverMappersave(params){
        return request.Post(url.serverMappersave,params)
    },
    serverRoomInfoManagecopyServerInfo(params){
        return request.Post(url.serverRoomInfoManagecopyServerInfo,params)
    },
    serversCoordinationsearch(params){
        return request.Post(url.serversCoordinationsearch,params)
    },
    serversInfosearch(params){
        return request.Post(url.serversInfosearch,params)
    },
    serversInfodelete(params){
        return request.Post(url.serversInfodelete,params)
    },
    serversMapperdelete(params){
        return request.Post(url.serversMapperdelete,params)
    },
    serversInfoadd(params){
        return request.Post(url.serversInfoadd,params)
    },
    serversMappersave(params){
        return request.Post(url.serversMappersave,params)
    },
    serversCoordinationsearch1(params){
        return request.Post(url.serversCoordinationsearch1,params)
    },
    serversCoordinationdel(params){
        return request.Post(url.serversCoordinationdel,params)
    },
    serversCoordinationsaveOrUpdate(params){
        return request.Post(url.serversCoordinationsaveOrUpdate,params)
    },
    channelUpdatesearch(params){
        return request.Post(url.channelUpdatesearch,params)
    },
    channelUpdatedelete(params){
        return request.Post(url.channelUpdatedelete,params)
    },
    channelUpdateadd(params){
        return request.Post(url.channelUpdateadd,params)
    },
    gameInfosearchGameGame(params){
        return request.Post(url.gameInfosearchGameGame,params)
    },
    gameInfodelGameGame(params){
        return request.Post(url.gameInfodelGameGame,params)
    },
    gameInfoaddGameGame(params){
        return request.Post(url.gameInfoaddGameGame,params)
    },
    gameInfosearchGameType(params){
        return request.Post(url.gameInfosearchGameType,params)
    },
    gameInfodelGameType(params){
        return request.Post(url.gameInfodelGameType,params)
    },
    gameInfoaddGameType(params){
        return request.Post(url.gameInfoaddGameType,params)
    },
    gameInfosearchGameModel(params){
        return request.Post(url.gameInfosearchGameModel,params)
    },
    gameInfodelGameModel(params){
        return request.Post(url.gameInfodelGameModel,params)
    },
    gameInfoaddGameModel(params){
        return request.Post(url.gameInfoaddGameModel,params)
    },
    gameRoomInfosearch(params){
        return request.Post(url.gameRoomInfosearch,params)
    },
    gameRoomInfomodify(params){
        return request.Post(url.gameRoomInfomodify,params)
    },
    itemBasesearch(params){
        return request.Post(url.itemBasesearch,params)
    },
    itemBaserefresh(params){
        return request.Post(url.itemBaserefresh,params)
    },
    itemBasegiveItem(params){
        return request.Post(url.itemBasegiveItem,params)
    },
    itemBaseshiftItem(params){
        return request.Post(url.itemBaseshiftItem,params)
    },
    itemBaseimport(params){
        return request.Upload(url.itemBaseimport,params)
    },
    itemBaseimportbegin(params){
        return request.Post(url.itemBaseimportbegin,params)
    },
    pkMatchConfigsearch(params){
        return request.Post(url.pkMatchConfigsearch,params)
    },
    pkMatchConfigdeleteGame(params){
        return request.Post(url.pkMatchConfigdeleteGame,params)
    },
    pkMatchConfigrefreshCache(params){
        return request.Post(url.pkMatchConfigrefreshCache,params)
    },
    pkMatchConfigsaveConfig(params){
        return request.Post(url.pkMatchConfigsaveConfig,params)
    },
    pkMatchConfiginitItemsPackage(params){
        return request.Post(url.pkMatchConfiginitItemsPackage,params)
    },
    pkMatchConfigdelPackage(params){
        return request.Post(url.pkMatchConfigdelPackage,params)
    },
    pkMatchConfigpropBag(params){
        return request.Post(url.pkMatchConfigpropBag,params)
    },
    pkMatchConfigsavePropBag(params){
        return request.Post(url.pkMatchConfigsavePropBag,params)
    },
    pkMatchConfigsearchPkServerid(params){
        return request.Post(url.pkMatchConfigsearchPkServerid,params)
    },
    pkMatchConfigtimeStartup(params){
        return request.Post(url.pkMatchConfigtimeStartup,params)
    },
    pkMatchConfigsearchMatchPrize(params){
        return request.Post(url.pkMatchConfigsearchMatchPrize,params)
    },
    pkMatchConfigdelPrize(params){
        return request.Post(url.pkMatchConfigdelPrize,params)
    },
    pkMatchConfigsaveMatchPrize(params){
        return request.Post(url.pkMatchConfigsaveMatchPrize,params)
    },
    pkMatchConfigsearchRoom(params){
        return request.Post(url.pkMatchConfigsearchRoom,params)
    },
    pkMatchConfigdelRoom(params){
        return request.Post(url.pkMatchConfigdelRoom,params)
    },
    pkMatchConfigsearchFreeRoom(params){
        return request.Post(url.pkMatchConfigsearchFreeRoom,params)
    },
    pkMatchConfigaddRoom(params){
        return request.Post(url.pkMatchConfigaddRoom,params)
    },
    pkMatchConfiggetConfig(params){
        return request.Post(url.pkMatchConfiggetConfig,params)
    },
    pkMatchConfigupdateConfig(params){
        return request.Post(url.pkMatchConfigupdateConfig,params)
    },
    itemMapsearch(params){
        return request.Post(url.itemMapsearch,params)
    },
    itemMapimport(params){
        return request.Upload(url.itemMapimport,params)
    },
    itemMapimportbegin(params){
        return request.Post(url.itemMapimportbegin,params)
    },
    dirtyWordssearch(params){
        return request.Post(url.dirtyWordssearch,params)
    },
    dirtyWordsadd(params){
        return request.Post(url.dirtyWordsadd,params)
    },
    dirtyWordsdelete(params){
        return request.Post(url.dirtyWordsdelete,params)
    },
    dirtyWordsrefresh(params){
        return request.Post(url.dirtyWordsrefresh,params)
    },
    dirtyWordsimport(params){
        return request.Upload(url.dirtyWordsimport,params)
    },
    dirtyWordsimportbegin(params){
        return request.Post(url.dirtyWordsimportbegin,params)
    },
    shopGoodsConfigsearch(params){
        return request.Post(url.shopGoodsConfigsearch,params)
    },
    shopGoodsConfigadd(params){
        return request.Post(url.shopGoodsConfigadd,params)
    },
    shopGoodsConfigaddImg(params){
        return request.Upload(url.shopGoodsConfigaddImg,params)
    },
    shopGoodsConfigdelete(params){
        return request.Post(url.shopGoodsConfigdelete,params)
    },
    itemComposesearch(params){
        return request.Post(url.itemComposesearch,params)
    },
    itemComposeimport(params){
        return request.Upload(url.itemComposeimport,params)
    },
    itemComposeimportbegin(params){
        return request.Post(url.itemComposeimportbegin,params)
    },
    itemComposedelete(params){
        return request.Post(url.itemComposedelete,params)
    },
    itemComposerefresh(params){
        return request.Post(url.itemComposerefresh,params)
    },
    sysRedPacksearch(params){
        return request.Post(url.sysRedPacksearch,params)
    },
    sysRedPackadd(params){
        return request.Post(url.sysRedPackadd,params)
    },
    sysRedPackrefresh(params){
        return request.Post(url.sysRedPackrefresh,params)
    },
    arenaSignLogSearch(params){
        return request.Post(url.arenaSignLogSearch,params)
    },
    arenaSignLoggetConfig(params){
        return request.Post(url.arenaSignLoggetConfig,params)
    },
    arenaSignLogAdd(params){
        return request.Post(url.arenaSignLogAdd,params)
    },
    arenaSignLogUpdate(params){
        return request.Post(url.arenaSignLogUpdate,params)
    },
    itemDropLogsearchOnPage(params){
        return request.Post(url.itemDropLogsearchOnPage,params)
    },
    itemDropLogcheck(params){
        return request.Post(url.itemDropLogcheck,params)
    },
    itemDropLogadd(params){
        return request.Post(url.itemDropLogadd,params)
    },
    itemDropLogupdate(params){
        return request.Post(url.itemDropLogupdate,params)
    },
    systemAnnouncementsearch(params){
        return request.Post(url.systemAnnouncementsearch,params)
    },
    systemAnnouncementdelete(params){
        return request.Post(url.systemAnnouncementdelete,params)
    },
    systemAnnouncementadd(params){
        return request.Post(url.systemAnnouncementadd,params)
    },
    systemMessagesearch(params){
        return request.Post(url.systemMessagesearch,params)
    },
    systemMessageadd(params){
        return request.Post(url.systemMessageadd,params)
    },
    systemMessagedelete(params){
        return request.Post(url.systemMessagedelete,params)
    },
    systemMessagerefresh(params){
        return request.Post(url.systemMessagerefresh,params)
    },
    systemStatusInfosearch(params){
        return request.Post(url.systemStatusInfosearch,params)
    },
    systemStatusInfodelete(params){
        return request.Post(url.systemStatusInfodelete,params)
    },
    systemStatusInforefresh(params){
        return request.Post(url.systemStatusInforefresh,params)
    },
    systemStatusInfosaveOrUpdate(params){
        return request.Post(url.systemStatusInfosaveOrUpdate,params)
    },
    systemStatusInfogameFunction(params){
        return request.Post(url.systemStatusInfogameFunction,params)
    },
    systemStatusInfooneGameFunction(params){
        return request.Post(url.systemStatusInfooneGameFunction,params)
    },
    festivalprizesearch(params){
        return request.Post(url.festivalprizesearch,params)
    },
    festivalprizesaveOrUpdate(params){
        return request.Post(url.festivalprizesaveOrUpdate,params)
    },
    festivalprizedelete(params){
        return request.Post(url.festivalprizedelete,params)
    },
    festivalprizeimport(params){
        return request.Upload(url.festivalprizeimport,params)
    },
    festivalprizeimportbegin(params){
        return request.Post(url.festivalprizeimportbegin,params)
    },
    festivalprizecopy(params){
        return request.Post(url.festivalprizecopy,params)
    },
    festivalprizerefresh(params){
      return request.Post(url.festivalprizerefresh,params)
    },

    /**
     * 充值管理
     */
    shareDetailInfosearch(params){
        return request.Post(url.shareDetailInfosearch,params)
    },
    onlineOrdersearch(params){
        return request.Post(url.onlineOrdersearch,params)
    },
    onlineOrderrepair(params){
        return request.Post(url.onlineOrderrepair,params)
    },
    recordInsuresearch(params){
        return request.Post(url.recordInsuresearch,params)
    },
    recordApplePayRetrysearch(params){
        return request.Post(url.recordApplePayRetrysearch,params)
    },
    rechargePlatFormsearch(params){
        return request.Post(url.rechargePlatFormsearch,params)
    },
    rechargePlatFormup(params){
        return request.Post(url.rechargePlatFormup,params)
    },
    rechargeDoubleConfigsaveOrUpdate(params){
        return request.Post(url.rechargeDoubleConfigsaveOrUpdate,params)
    },
    rechargePlatFormdelete(params){
        return request.Post(url.rechargePlatFormdelete,params)
    },
    rechargeDoubleConfigsearch(params){
        return request.Post(url.rechargeDoubleConfigsearch,params)
    },
    rechargeDoubleConfigdelete(params){
        return request.Post(url.rechargeDoubleConfigdelete,params)
    },
    firstRewardActConfigsearch(params){
        return request.Post(url.firstRewardActConfigsearch,params)
    },
    firstRewardActConfigsaveOrUpdate(params){
        return request.Post(url.firstRewardActConfigsaveOrUpdate,params)
    },
    firstRewardActConfigdelete(params){
        return request.Post(url.firstRewardActConfigdelete,params)
    },
    limitPayConfigsearch(params){
        return request.Post(url.limitPayConfigsearch,params)
    },
    limitPayConfigsaveOrUpdate(params){
        return request.Post(url.limitPayConfigsaveOrUpdate,params)
    },
    limitPayConfigdelete(params){
        return request.Post(url.limitPayConfigdelete,params)
    },
    limitPayConfigupdate(params){
        return request.Post(url.limitPayConfigupdate,params)
    },
    /**
     * 活动管理
     */
    activitiesShowsearch(params){
        return request.Post(url.activitiesShowsearch,params)
    },
    activitiesreloadActIdSelect(params){
        return request.Post(url.activitiesreloadActIdSelect,params)
    },
    activitiesShowadd(params){
        return request.Post(url.activitiesShowadd,params)
    },
    activitiesShowdelete(params){
        return request.Post(url.activitiesShowdelete,params)
    },
    activitiesShowrefresh(params){
        return request.Post(url.activitiesShowrefresh,params)
    },
    activitiesShowcopy(params){
        return request.Post(url.activitiesShowcopy,params)
    },
    activitiessearch(params){
        return request.Post(url.activitiessearch,params)
    },
    activitiesreloadType(params){
        return request.Post(url.activitiesreloadType,params)
    },
    activitiesreloadTypeSelect(params){
        return request.Post(url.activitiesreloadTypeSelect,params)
    },
    activitiesadd(params){
        return request.Post(url.activitiesadd,params)
    },
    activitiesrefresh(params){
        return request.Post(url.activitiesrefresh,params)
    },
    activitiesdelete(params){
        return request.Post(url.activitiesdelete,params)
    },
    activitiescopy(params){
        return request.Post(url.activitiescopy,params)
    },
    systemMailsearch(params){
        return request.Post(url.systemMailsearch,params)
    },
    systemMailadd(params){
        return request.Post(url.systemMailadd,params)
    },
    systemMaildelete(params){
        return request.Post(url.systemMaildelete,params)
    },
    systemMailimport(params){
        return request.Upload(url.systemMailimport,params)
    },
    systemMailimportList(params){
      return request.Upload(url.systemMailimportList,params)
    },
    systemMailimportListbegin(params){
      return request.Post(url.systemMailimportListbegin,params)
    },
    systemMailshowUsers(params){
      return request.Post(url.systemMailshowUsers,params)
    },
    gameAdvConfigsearch(params){
        return request.Post(url.gameAdvConfigsearch,params)
    },
    gameAdvConfigadd(params){
        return request.Post(url.gameAdvConfigadd,params)
    },
    gameAdvConfigdelete(params){
        return request.Post(url.gameAdvConfigdelete,params)
    },
    gameAdvConfiggetAllImgs(params){
        return request.Post(url.gameAdvConfiggetAllImgs,params)
    },
    gameAdvConfigsaveImg(params){
        return request.Upload(url.gameAdvConfigsaveImg,params)
    },
    shopRushConfigsearch(params){
        return request.Post(url.shopRushConfigsearch,params)
    },
    shopRushConfigaddOrUpdate(params){
        return request.Post(url.shopRushConfigaddOrUpdate,params)
    },
    surveySearch(params){
        return request.Post(url.surveySearch,params)
    },
    surveysaveOrUpdate(params){
        return request.Post(url.surveysaveOrUpdate,params)
    },
    surveydelete(params){
        return request.Post(url.surveydelete,params)
    },
    surveysearchChildAwswer(params){
        return request.Post(url.surveysearchChildAwswer,params)
    },
    surveyaddChildAwswer(params){
        return request.Post(url.surveyaddChildAwswer,params)
    },
    surveyupdateChildAwswer(params){
        return request.Post(url.surveyupdateChildAwswer,params)
    },
    surveydeleteChildAwswer(params){
        return request.Post(url.surveydeleteChildAwswer,params)
    },
    surveyAdd(params){
        return request.Post(url.surveyAdd,params)
    },
    /**
     * 财富信息
     */
    rankssearch(params){
        return request.Post(url.rankssearch,params)
    },
    dataOfCashRedEnvelopesearch(params){
        return request.Post(url.dataOfCashRedEnvelopesearch,params)
    },
    inviteRedPackUsersearch(params){
        return request.Post(url.inviteRedPackUsersearch,params)
    },
    dataOfCashRedEnvelopebufa(params){
        return request.Post(url.dataOfCashRedEnvelopebufa,params)
    },
    itemRecordsearch(params){
        return request.Post(url.itemRecordsearch,params)
    },
    freeGoldAddsearch(params){
        return request.Post(url.freeGoldAddsearch,params)
    },
    freeGoldExchangesearch(params){
        return request.Post(url.freeGoldExchangesearch,params)
    },
    recordInviteOrShareSearch(params){
        return request.Post(url.recordInviteOrShareSearch,params)
    },
    inviteUsersearch(params){
        return request.Post(url.inviteUsersearch,params)
    },
    userWealthRankings(params){
        return request.Post(url.userWealthRankings,params)
    },
    userPrizeSearch(params){
        return request.Post(url.userPrizeSearch,params)
    },
    recordUserLoginRewardsearch(params){
        return request.Post(url.recordUserLoginRewardsearch,params)
    },
    dayScoreRecordSearch(params){
        return request.Post(url.dayScoreRecordSearch,params)
    },
    /**
     * 日志记录
     */
    recordUserOperationInfogaveScore(params){
        return request.Post(url.recordUserOperationInfogaveScore,params)
    },
    recordUserOperationInfoupdatePwd(params){
        return request.Post(url.recordUserOperationInfoupdatePwd,params)
    },
    recordUserOperationInforecordFreeze(params){
        return request.Post(url.recordUserOperationInforecordFreeze,params)
    },
    recordUserOperationInforecordBindMobile(params){
        return request.Post(url.recordUserOperationInforecordBindMobile,params)
    },
    recordUserOperationInforecordCheckIcon(params){
        return request.Post(url.recordUserOperationInforecordCheckIcon,params)
    },
    recordUserOperationInforecordGrantItem(params){
        return request.Post(url.recordUserOperationInforecordGrantItem,params)
    },
    recordUserOperationInforecordChatControl(params){
        return request.Post(url.recordUserOperationInforecordChatControl,params)
    },
    activeSearch(params){
        return request.Post(url.activeSearch,params)
    },
    redPacketsInfosearch(params){
        return request.Post(url.redPacketsInfosearch,params)
    },
    redPacketsInfonewCode(params){
        return request.Post(url.redPacketsInfonewCode,params)
    },
    redPacketsInfogenerateRedpacket(params){
        return request.Post(url.redPacketsInfogenerateRedpacket,params)
    },
    redPacketsInfoexportExcel(params){
        return request.webExportExcel(url.redPacketsInfoexportExcel,params)
    },
    redPacketsInfosetUsed(params){
        return request.Post(url.redPacketsInfosetUsed,params)
    },
    recordUserInoutsearch(params){
        return request.Post(url.recordUserInoutsearch,params)
    },
    qianDaoLogsearch(params){
        return request.Post(url.qianDaoLogsearch,params)
    },
    messageRecordsearch(params){
        return request.Post(url.messageRecordsearch,params)
    },
    shopGoodsRecordsearch(params){
        return request.Post(url.shopGoodsRecordsearch,params)
    },
    shopGoodsRecordadd(params){
        return request.Post(url.shopGoodsRecordadd,params)
    },
    shopGoodsRecordUpdateRemark(params){
      return request.Post(url.shopGoodsRecordUpdateRemark,params)
    },
    shopGoodsRecordrepeal(params){
        return request.Post(url.shopGoodsRecordrepeal,params)
    },
    feedBacksearch(params){
        return request.Post(url.feedBacksearch,params)
    },
    feedBackreply(params){
        return request.Post(url.feedBackreply,params)
    },
    sealRecordsearch(params){
        return request.Post(url.sealRecordsearch,params)
    },
    accountsBindInfosearch(params){
        return request.Post(url.accountsBindInfosearch,params)
    },
    accountsBindInfounbindMobile(params){
        return request.Post(url.accountsBindInfounbindMobile,params)
    },
    accountsBindInfoupdateMobilePasswd(params){
        return request.Post(url.accountsBindInfoupdateMobilePasswd,params)
    },
    festivalPrizesearch(params){
        return request.Post(url.festivalPrizesearch,params)
    },
    thumBupLogsearch(params){
        return request.Post(url.thumBupLogsearch,params)
    },
    skillUseLogsearch(params){
        return request.Post(url.skillUseLogsearch,params)
    },
    skillUseLogboss(params){
        return request.Post(url.skillUseLogboss,params)
    },
    skillUseLogskill(params){
        return request.Post(url.skillUseLogskill,params)
    },
    skillUseLogskill1(params){
        return request.Post(url.skillUseLogskill1,params)
    },
    skillUseLogtongji(params){
        return request.Post(url.skillUseLogtongji,params)
    },
    chatCostsearch(params){
        return request.Post(url.chatCostsearch,params)
    },
    juBaoPenLogsearch(params){
        return request.Post(url.juBaoPenLogsearch,params)
    },
    juBaoPenLoggetScore(params){
        return request.Post(url.juBaoPenLoggetScore,params)
    },
    juBaoPenLogmodifyScore(params){
        return request.Post(url.juBaoPenLogmodifyScore,params)
    },
    gamePromotionLogsearch(params){
        return request.Post(url.gamePromotionLogsearch,params)
    },
    matchInfosearch(params){
        return request.Post(url.matchInfosearch,params)
    },
    matchInfosearchMatchBaoming(params){
        return request.Post(url.matchInfosearchMatchBaoming,params)
    },
    recordUserInoutmatchRecord(params){
        return request.Post(url.recordUserInoutmatchRecord,params)
    },
    recordUserInoutsignupRecord(params){
        return request.Post(url.recordUserInoutsignupRecord,params)
    },
    skillUseLogskillsStatistical(params){
        return request.Post(url.skillUseLogskillsStatistical,params)
    },
    bossLogsearch(params){
        return request.Post(url.bossLogsearch,params)
    },
    recordUserLoginSearch(params){
        return request.Post(url.recordUserLoginSearch,params)
    },
    giveLogSearch(params){
        return request.Post(url.giveLogSearch,params)
    },
    itemStockRecordSearch(params){
        return request.Post(url.itemStockRecordSearch,params)
    },
    recordTakGoldSearch(params){
        return request.Post(url.recordTakGoldSearch,params)
    },
    labourUnionInfoSearch(params){
        return request.Post(url.labourUnionInfoSearch,params)
    },
    labourUnionInfoupdate(params){
        return request.Post(url.labourUnionInfoupdate,params)
    },
    labourUnionInfofreeze(params){
        return request.Post(url.labourUnionInfofreeze,params)
    },
    labourUnionInfounFreeeze(params){
        return request.Post(url.labourUnionInfounFreeeze,params)
    },
    labourUnionMemberSearch(params){
        return request.Post(url.labourUnionMemberSearch,params)
    },
    labourUnionMemberfreeze(params){
        return request.Post(url.labourUnionMemberfreeze,params)
    },
    labourUnionMemberkickOut(params){
        return request.Post(url.labourUnionMemberkickOut,params)
    },
    labourUnionExchageLogSearch(params){
        return request.Post(url.labourUnionExchageLogSearch,params)
    },
    privateRoomInfoSearch(params){
        return request.Post(url.privateRoomInfoSearch,params)
    },
    juBaoScoreLogSearch(params){
        return request.Post(url.juBaoScoreLogSearch,params)
    },
    userReportInfoSearch(params){
        return request.Post(url.userReportInfoSearch,params)
    },
    modifyNicknameSearch(params){
        return request.Post(url.modifyNicknameSearch,params)
    },
    dropLogSearch(params){
        return request.Post(url.dropLogSearch,params)
    },
    bombUseLogsearch(params){
        return request.Post(url.bombUseLogsearch,params)
    },
    fishRaceBetLogsearch(params){
        return request.Post(url.fishRaceBetLogsearch,params)
    },
    fishRaceLogsearch(params){
        return request.Post(url.fishRaceLogsearch,params)
    },
    fishRaceSkillLogsearch(params){
        return request.Post(url.fishRaceSkillLogsearch,params)
    },
    sxpOpenLogopenLogSearch(params){
        return request.Post(url.sxpOpenLogopenLogSearch,params)
    },
    sxpBuyLogsearch(params){
        return request.Post(url.sxpBuyLogsearch,params)
    },
    /**
     * 系统管理
     */
    searchDepartment(params){
        return request.Post(url.searchDepartment,params)
    },
    departmentAddOrUpdate(params){
        return request.Post(url.departmentAddOrUpdate,params)
    },
    delDepartment(params){
        return request.Post(url.delDepartment,params)
    },
    searchRoleName(params){
        return request.Post(url.searchRoleName,params)
    },
    searchUser(params){
        return request.Post(url.searchUser,params)
    },
    deleteUser(params){
        return request.Post(url.deleteUser,params)
    },
    userssaveOrUpdate(params){
        return request.Post(url.userssaveOrUpdate,params)
    },
    spreaderManagesearchAll(params){
        return request.Post(url.spreaderManagesearchAll,params)
    },
    spreaderManageaddRelevance(params){
        return request.Post(url.spreaderManageaddRelevance,params)
    },
    roleinfo(params){
        return request.Post(url.roleinfo,params)
    },
    delrole(params){
        return request.Post(url.delrole,params)
    },
    saverole(params){
        return request.Post(url.saverole,params)
    },
    searchrolepermisssion(params){
        return request.Post(url.searchrolepermisssion,params)
    },
    editrolepermisssion(params){
        return request.Post(url.editrolepermisssion,params)
    },
    getMenu(params){
        return request.Post(url.getMenu,params)
    },
    removeMenu(params){
        return request.Post(url.removeMenu,params)
    },
    addMenu(params){
        return request.Post(url.addMenu,params)
    },
    saveChildrenMenu(params){
        return request.Post(url.saveChildrenMenu,params)
    },
    getChildrenMenu(params){
        return request.Post(url.getChildrenMenu,params)
    },
    removeChildrenMenu(params){
        return request.Post(url.removeChildrenMenu,params)
    },
    getMenuPermission(params){
        return request.Post(url.getMenuPermission,params)
    },
    removeMenuPermission(params){
        return request.Post(url.removeMenuPermission,params)
    },
    saveMenuPermission(params){
        return request.Post(url.saveMenuPermission,params)
    },
    spreaderOrderCharacterRatesearch(params){
        return request.Post(url.spreaderOrderCharacterRatesearch,params)
    },
    spreaderOrderCharacterRatesaveOrUpdate(params){
        return request.Post(url.spreaderOrderCharacterRatesaveOrUpdate,params)
    },
    spreaderOrderCharacterRateselectCPA(params){
        return request.Post(url.spreaderOrderCharacterRateselectCPA,params)
    },
    spreaderOrderCharacterRateupdateCPA(params){
        return request.Post(url.spreaderOrderCharacterRateupdateCPA,params)
    },
    spreaderManagesearch(params){
        return request.Post(url.spreaderManagesearch,params)
    },
    spreaderManageaddToIndex(params){
        return request.Post(url.spreaderManageaddToIndex,params)
    },
    spreaderManageremoveFromIndex(params){
        return request.Post(url.spreaderManageremoveFromIndex,params)
    },
    spreaderManagesaveOrUpdate(params){
        return request.Post(url.spreaderManagesaveOrUpdate,params)
    },
    userOperationLogsearchOnPage(params){
        return request.Post(url.userOperationLogsearchOnPage,params)
    },
    /**
     * 网站运维
     */
    channelPayServiceCfgTempsearch(params){
        return request.Post(url.channelPayServiceCfgTempsearch,params)
    },
    channelPayServiceCfgTempsaveOrUpdate(params){
        return request.Post(url.channelPayServiceCfgTempsaveOrUpdate,params)
    },
    channelPayServiceConfigreloadGameName(params){
        return request.Post(url.channelPayServiceConfigreloadGameName,params)
    },
    channelPayServiceCfgTempsearchTempAll(params){
        return request.Post(url.channelPayServiceCfgTempsearchTempAll,params)
    },
    channelPayServiceConfigsearch(params){
        return request.Post(url.channelPayServiceConfigsearch,params)
    },
    channelPayServiceConfigdelete(params){
        return request.Post(url.channelPayServiceConfigdelete,params)
    },
    channelPayServiceConfigsaveOrUpdate(params){
        return request.Post(url.channelPayServiceConfigsaveOrUpdate,params)
    },
    /**
     * 数据管理
     */
    excelitemRecord(params){
        return request.exportExcel(url.excelitemRecord,params)
    },
    excelwarheadTradingLog(params){
        return request.exportExcel(url.excelwarheadTradingLog,params)
    },
    excelversionDistributionData(params){
        return request.exportExcel(url.excelversionDistributionData,params)
    },
    excelshopGoodsRecord(params){
        return request.exportExcel(url.excelshopGoodsRecord,params)
    },
    excelwarheadUse(params){
        return request.exportExcel(url.excelwarheadUse,params)
    },
    excelrechargeInterval(params){
        return request.exportExcel(url.excelrechargeInterval,params)
    },
    exceluserLoginLog(params){
        return request.exportExcel(url.exceluserLoginLog,params)
    },
    excelluckyBeanAllowance(params){
        return request.exportExcel(url.excelluckyBeanAllowance,params)
    },
    excelspecifyUserInformationimport(params){
        return request.Upload(url.excelspecifyUserInformationimport,params)
    },
    excelspecifyUserInformation(params){
        return request.exportExcel(url.excelspecifyUserInformation,params)
    },
    exceluserItemAllowance(params){
        return request.exportExcel(url.exceluserItemAllowance,params)
    },
    excelprepaidPhoneLog(params){
        return request.exportExcel(url.excelprepaidPhoneLog,params)
    },
    excelregistrationLog(params){
        return request.exportExcel(url.excelregistrationLog,params)
    },

    getdownloadFile(params){
        return request.Post(url.getdownloadFile,params)
    },
    downloadFile(params){
        return request.webExportExcel(url.downloadFile,params)
    },
    fileDelete(params){
      return request.Post(url.fileDelete,params)
    },
}
