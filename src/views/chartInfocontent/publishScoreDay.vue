<template>
  <div class="app-container">
    <h3 class="showTit">每日发行统计</h3>
    <el-row :gutter="32">
      <el-form ref="form" :model="form">
        <el-col :xs="24" :sm="6" :lg="4">
          <el-date-picker v-model="form.beginTime" size="small" clearable align="right" type="date" placeholder="开始日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd"></el-date-picker>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="4">
          <el-date-picker v-model="form.endTime" size="small" clearable align="right" type="date" placeholder="结束日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd"></el-date-picker>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="8" v-has="'publishScoreDay_search'">
          <el-button type="primary" size="small" @click="onSubmit(1)">查询</el-button>
          <el-button type="primary" size="small"  @click="beforeOneDay()" >向前一天</el-button>
          <el-button type="primary" size="small"  @click="afterOneDay()">向后一天</el-button>
        </el-col>
      </el-form>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" style="width: 100%" :cell-style="cellStyle" :header-cell-style="rowClass" border v-loading="tableloading">
          <el-table-column prop="date"  label="时间" width="100px"></el-table-column>
          <el-table-column prop="crystal" label="游戏内水晶掉落">
            <template slot-scope="scope">{{ scope.row.crystal | null2Zero }}</template>
          </el-table-column>
          <el-table-column prop="login" label="新手任务水晶掉落">
            <template slot-scope="scope">{{ scope.row.login | null2Zero }}</template>
          </el-table-column>
          <el-table-column prop="topUp" label="充值" width="120px">
            <template slot-scope="scope">{{ scope.row.topUp | numTenthousand }}</template>
          </el-table-column>
          <el-table-column prop="system" label="系统奖励" width="120px">
            <template slot-scope="scope">{{ scope.row.system | null2Zero }}</template>
          </el-table-column>
          <el-table-column prop="monthCard" label="购买月卡数">
            <template slot-scope="scope">{{ scope.row.monthCard | null2Zero }}</template>
          </el-table-column>
          <el-table-column prop="singIn" label="签到" width="120px">
            <template slot-scope="scope">{{ scope.row.singIn | null2Zero }}</template>
          </el-table-column>
          <el-table-column prop="chart" label="排行榜" width="120px">
            <template slot-scope="scope">{{ scope.row.chart | null2Zero }}</template>
          </el-table-column>
          <el-table-column prop="invite" label="邀请">
            <template slot-scope="scope">{{ scope.row.invite | null2Zero }}</template>
          </el-table-column>
          <el-table-column prop="redPackage" label="红包" width="120px">
            <template slot-scope="scope">{{ scope.row.redPackage | numTenthousand }}</template>
          </el-table-column>
          <el-table-column prop="relief" label="救济金" width="120px">
            <template slot-scope="scope">{{ scope.row.relief | numTenthousand }}</template>
          </el-table-column>
          <el-table-column prop="fu" label="福袋" width="120px">
            <template slot-scope="scope">{{ scope.row.fu | null2Zero }}</template>
          </el-table-column>
          <el-table-column prop="prop" label="道具出售" width="120px">
            <template slot-scope="scope">{{ scope.row.prop | null2Zero }}</template>
          </el-table-column>
          <el-table-column prop="register" label="注册赠送" width="120px">
            <template slot-scope="scope">{{ scope.row.register | null2Zero }}</template>
          </el-table-column>
          <el-table-column prop="share" label="分享">
            <template slot-scope="scope">{{ scope.row.share | null2Zero }}</template>
          </el-table-column>
          <el-table-column prop="holiday" label="节日和首充" width="120px">
            <template slot-scope="scope"><div v-html="commonJs.col(scope.row.holiday)"></div></template>
          </el-table-column>
          <el-table-column prop="gameTaskCrystal" label="抢购活动免费获取">
            <template slot-scope="scope">{{ scope.row.gameTaskCrystal | null2Zero }}</template>
          </el-table-column>
          <el-table-column prop="newgift" label="新版礼包">
            <template slot-scope="scope">{{ scope.row.newgift | null2Zero }}</template>
          </el-table-column>
          <el-table-column prop="bind" label="手机绑定">
            <template slot-scope="scope">{{ scope.row.bind | null2Zero }}</template>
          </el-table-column>
          <el-table-column prop="dynamic" label="活跃任务" width="120px">
            <template slot-scope="scope">{{ scope.row.dynamic | null2Zero }}</template>
          </el-table-column>
          <el-table-column prop="online" label="在线时长1小时以上">
            <template slot-scope="scope">{{ scope.row.online | null2Zero }}</template>
          </el-table-column>
          <el-table-column prop="onlineReward" label="在线时长奖励">
            <template slot-scope="scope">{{ scope.row.onlineReward | null2Zero }}</template>
          </el-table-column>
          <el-table-column prop="panicBuy" label="幸运豆总数" width="120px">
            <template slot-scope="scope">{{ scope.row.panicBuy | numTenthousand }}</template>
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
  </div>
</template>

<script>
    export default {
        name: "publishScoreDay",
        data(){
            return{
                currentPage: 1, //初始页
                pagesize: 30, //    每页的数据
                total: 0,
                currentTotal:0,
                form: {
                  beginTime:this.moment(new Date(new Date().setHours(0, 0, 0, 0))).format("YYYY-MM-DD"),
                  endTime:this.moment(new Date()).format("YYYY-MM-DD")
                },
                tableData: [],
                tableloading:false
            }
        },
        mounted(){
        },
        methods:{
            cellStyle(row,column,rowIndex,columnIndex){
              return 'text-align:center;padding:6px 0';
            },
            rowClass({row,rowIndex}){
              return 'text-align:center;padding:6px 0';
            },
            onSubmit(pageNum){
              //beginTime，endTime,currentPage, limit
              let param = {
                beginTime:this.form.beginTime,
                endTime:this.form.endTime,
                currentPage:pageNum,
                limit:this.pagesize
              };
              this.tableloading=true;
              this.$api.publishScoreDaysearch(param).then(res =>{
                this.tableloading=false;
                if (res.success) {
                  this.tableData = res.data.records;
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
        }
    }
</script>

<style scoped>
.el-date-editor.el-input, .el-date-editor.el-input__inner{
    width:100%;
}
</style>
