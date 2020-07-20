<template>
  <div class="app-container">
    <h3 class="showTit">技能使用记录</h3>
    <el-row :gutter="32">
      <el-form ref="form" :model="form">
        <el-col :xs="12" :sm="6" :lg="3">
          <el-input v-model.trim="form.userid" size="small" placeholder="用户ID" clearable></el-input>
        </el-col>
        <el-col :xs="12" :sm="6" :lg="3">
          <el-input v-model.trim="form.skillid" size="small" placeholder="技能ID" clearable></el-input>
        </el-col>
        <el-col :xs="12" :sm="6" :lg="3">
          <el-input v-model.trim="form.callFishid" size="small" placeholder="召唤鱼ID" clearable></el-input>
        </el-col>
        <el-col :xs="12" :sm="6" :lg="4">
          <el-date-picker v-model="form.beginTime" size="small" clearable align="right" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="开始日期">
          </el-date-picker>
        </el-col>
        <el-col :xs="12" :sm="6" :lg="4">
          <el-date-picker v-model="form.endTime" size="small" clearable align="right" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="结束日期">
          </el-date-picker>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="6" v-has="'skillUseLog_search'">
          <el-button type="primary" size="small" @click="onSubmit(1)">查询</el-button>
          <el-button type="primary" size="small"  @click="beforeOneDay()" >向前一天</el-button>
          <el-button type="primary" size="small"  @click="afterOneDay()">向后一天</el-button>
        </el-col>
      </el-form>
    </el-row>

    <el-row :gutter="32">
      <div style="margin-left:1%;">
        <el-button type="primary" size="small" v-has="'skillUseLog_boss'" @click="showBigSmallBossCallNumbers=true" plain>大小boss召唤次数</el-button>
        <el-button type="primary" size="small" v-has="'skillUseLog_skill'" @click="showSkillUseNumbers=true" plain>技能使用次数</el-button>
        <el-button type="primary" size="small" v-has="'skillUseLog_skill1'" @click="showThreeTimeSkillGreenDiamondBuyNumbers=true" plain>三次技能的绿钻购买次数</el-button>
        <el-button type="primary" size="small" v-has="'skillUseLog_tongji'" @click="showTreasureStatistics=true" plain>聚宝统计</el-button>
      </div>
    </el-row>

    <div class="otherdesc">共：{{allTotalCount| numTenthousand}} 个</div>
    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" style="width: 100%" :cell-style="cellStyle" :header-cell-style="rowClass" border v-loading="tableloading">
          <el-table-column prop="uid" label="用户ID"></el-table-column>
          <el-table-column prop="gameID" label="游戏ID">
            <template slot-scope="scope">
              <span style="color:#1890ff;cursor: pointer;" @click="openNewWin(scope.row.gameID)">{{ scope.row.gameID }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="nickName" label="昵称"></el-table-column>
          <el-table-column prop="skillId" label="技能ID">
            <template slot-scope="scope"> {{scope.row.skillId | null2empty }}</template>
          </el-table-column>
          <el-table-column prop="costs" label="消耗道具列表">
            <template slot-scope="scope"> {{scope.row.costs | null2empty }}</template>
          </el-table-column>
          <el-table-column prop="fishType" label="召唤出来了哪条鱼">
            <template slot-scope="scope"> {{scope.row.fishType | null2empty }}</template>
          </el-table-column>
          <el-table-column prop="createdAt" label="创建时间">
            <template slot-scope="scope"> {{scope.row.createdAt | null2empty }}</template>
          </el-table-column>
        </el-table>

        <div class="showpaginationbody">
          <div class="currentTotal">
            {{currentTotal}}<span class="showtotal">/{{total}}</span>
          </div>
          <el-pagination
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[30]"
              :page-size="pagesize"
              layout="total,prev, pager, next, jumper"
              :total="total"
          >
          </el-pagination>
        </div>
      </el-col>
    </el-row>

    <!--大小boss召唤次数-->
    <pcModal v-if="showBigSmallBossCallNumbers" :xs="8" :sm="8" :lg="2" title="大小boss召唤次数" @closeModal="showBigSmallBossCallNumbers = false">
      <bigSmallBossCallcontent :getdata="form" @shuaxin="onSubmit(1)" @closedialog="showBigSmallBossCallNumbers= false"></bigSmallBossCallcontent>
    </pcModal>
    <!--技能使用次数-->
    <pcModal v-if="showSkillUseNumbers" :xs="8" :sm="8" :lg="2" title="技能使用次数" @closeModal="showSkillUseNumbers = false">
      <skillUsecontent :getdata="form" @shuaxin="onSubmit(1)" @closedialog="showSkillUseNumbers= false"></skillUsecontent>
    </pcModal>
    <!--三次技能的绿钻购买次数-->
    <pcModal v-if="showThreeTimeSkillGreenDiamondBuyNumbers" :xs="8" :sm="8" :lg="2" title="三次技能的绿钻购买次数" @closeModal="showThreeTimeSkillGreenDiamondBuyNumbers = false">
      <skillGreenDiamondBuycontent :getdata="form" @shuaxin="onSubmit(1)" @closedialog="showThreeTimeSkillGreenDiamondBuyNumbers= false"></skillGreenDiamondBuycontent>
    </pcModal>
    <!--聚宝统计-->
    <pcModal v-if="showTreasureStatistics" :xs="8" :sm="8" :lg="2" title="聚宝统计" @closeModal="showTreasureStatistics = false">
      <treasureStatisticscontent :getdata="form" @shuaxin="onSubmit(1)" @closedialog="showTreasureStatistics= false"></treasureStatisticscontent>
    </pcModal>

  </div>
</template>

<script>
    export default {
        name: "skillUseLog",
        components:{
          bigSmallBossCallcontent:() => import('./bigSmallBossCallcontent.vue'),
          skillUsecontent:() => import('./skillUsecontent.vue'),
          skillGreenDiamondBuycontent:() => import('./skillGreenDiamondBuycontent.vue'),
          treasureStatisticscontent:() => import('./treasureStatisticscontent.vue'),
        },
        data(){
          return{
            currentPage: 1, //初始页
            pagesize: 30, //    每页的数据
            total: 0,
            currentTotal:0,
            form: {
              userid: '',
              skillid: '',
              callFishid: '',
              beginTime:this.moment(new Date(new Date().setHours(0, 0, 0, 0))).format("YYYY-MM-DD"),
              endTime:this.moment(new Date()).format("YYYY-MM-DD")
            },
            tableData: [],
            showBigSmallBossCallNumbers:false,
            showSkillUseNumbers:false,
            showThreeTimeSkillGreenDiamondBuyNumbers:false,
            showTreasureStatistics:false,
            allTotalCount:'',  //总数量
            tableloading:false
          }
        },
        methods:{
            cellStyle(row,column,rowIndex,columnIndex){
              return 'text-align:center;padding:6px 0;';
            },
            rowClass({row,rowIndex}){
              return 'text-align:center;padding:6px 0;';
            },
            onSubmit(pageNum){
              this.$message({
                message: "数据量过大，请耐心等待",
                type: "warning"
              });
              //uid，skillId，fishType，beginTime，endTime,currentPage,limit
              let param = {
                uid:this.form.userid,
                skillId:this.form.skillid,
                fishType:this.form.callFishid,
                beginTime:this.form.beginTime,
                endTime:this.form.endTime,
                currentPage:pageNum,
                limit:this.pagesize
              };
              this.tableloading=true;
              this.$api.skillUseLogsearch(param).then(res =>{
                this.tableloading=false;
                  if (res.success) {
                    this.tableData = res.data.records;
                    this.allTotalCount = res.params.totalCount;
                    this.total = res.data.total;
                    this.pagesize=res.data.size;
                    this.currentPage = res.data.current;
                    this.currentTotal=(this.currentPage) * (this.pagesize)
                    if(this.currentTotal > this.total){
                      this.currentTotal = this.total
                    }else{
                      this.currentTotal=(this.currentPage) * (this.pagesize)
                    }
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
            handleCurrentChange: function(currentPage) {
              this.currentPage = currentPage;
              this.onSubmit(currentPage);
            },
            beforeOneDay(){
              if((this.form.beginTime == "" || this.form.beginTime == null) && (this.form.endTime == "" || this.form.endTime == null)){
                this.form.beginTime=this.moment(new Date()).format("YYYY-MM-DD");
                this.form.endTime=this.moment(new Date()).format("YYYY-MM-DD");
              }else{
                this.form.beginTime=this.moment(this.form.beginTime).subtract(1, 'days').format("YYYY-MM-DD");
                this.form.endTime=this.moment(this.form.endTime).subtract(1, 'days').format("YYYY-MM-DD");
              }
             
              this.onSubmit(1);
            },
            afterOneDay(){
              if((this.form.beginTime == "" || this.form.beginTime == null) && (this.form.endTime == "" || this.form.endTime == null)){
                this.form.beginTime=this.moment(new Date()).format("YYYY-MM-DD");
                this.form.endTime=this.moment(new Date()).format("YYYY-MM-DD");
              }else{
                this.form.beginTime=this.moment(this.form.beginTime).add(1, 'days').format("YYYY-MM-DD");
                this.form.endTime=this.moment(this.form.endTime).add(1, 'days').format("YYYY-MM-DD");
              }
              this.onSubmit(1);
            },
            openNewWin(data){
              const {href} = this.$router.resolve({
                path: '/userbaseinfo',
                query: {
                  gameID: data
                }
              })
              window.open(href, '_blank')
            }
        }
    }
</script>

<style scoped>
.el-date-editor.el-input, .el-date-editor.el-input__inner{
    width:100%;
}
</style>
