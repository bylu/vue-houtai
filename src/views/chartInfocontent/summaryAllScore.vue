<template>
  <div class="app-container">
    <h3 class="showTit">游戏币监控</h3>
    <el-row :gutter="32">
      <el-form ref="form" :model="form">
        <el-col :xs="24" :sm="6" :lg="4">
          <el-date-picker v-model="form.beginTime" clearable size="small" align="right" type="date" placeholder="开始日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd"></el-date-picker>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="4">
          <el-date-picker v-model="form.endTime" clearable size="small" align="right" type="date" placeholder="结束日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd"></el-date-picker>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="12" v-has="'summaryAllScore_search'">
          <el-button type="primary" size="small" @click="onSubmit(1)">查询</el-button>
          <el-button type="primary" size="small"  @click="beforeOneDay()" >向前一天</el-button>
          <el-button type="primary" size="small"  @click="afterOneDay()">向后一天</el-button>
          <el-button type="warning" size="small" @click="opensumAllScoreChart(0)">用户总财富</el-button>
          <el-button type="success" size="small" @click="opensumAllScoreChart(1)">总消耗</el-button>
          <el-button type="danger" size="small" @click="opensumAllScoreChart(2)">总发行</el-button>
        </el-col>
      </el-form>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" style="width: 100%" :cell-style="cellStyle" :header-cell-style="rowClass" border v-loading="tableloading">
          <el-table-column prop="insertTime" label="日期" width="160px"></el-table-column>
          <el-table-column prop="userScores" label="用户总财富" width="150px">
            <template slot-scope="scope">{{ scope.row.userScores | numTenthousand }}</template>
          </el-table-column>
          <el-table-column prop="userIncreased" label="用户总财富增长" width="150px">
            <template slot-scope="scope"><div v-html="commonJs.col(scope.row.userIncreased)"></div></template>
          </el-table-column>
          <el-table-column prop="spendScores" label="总消耗" width="180px">
            <template slot-scope="scope">{{ scope.row.spendScores | numTenthousand }}</template>
          </el-table-column>
          <el-table-column prop="spendIncreased" label="总消耗增长" width="180px">
            <template slot-scope="scope"><div v-html="commonJs.col(scope.row.spendIncreased)"></div></template>
          </el-table-column>
          <el-table-column prop="produceScores" label="总发行" width="150px">
            <template slot-scope="scope">{{ scope.row.produceScores | numTenthousand }}</template>
          </el-table-column>
          <el-table-column prop="recordTakegGold" label="救济金" width="150px">
            <template slot-scope="scope">{{ scope.row.recordTakegGold | numTenthousand }}</template>
          </el-table-column>
          <el-table-column prop="gamePromotionLog" label="福袋" width="150px">
            <template slot-scope="scope">{{ scope.row.gamePromotionLog | numTenthousand }}</template>
          </el-table-column>
          <el-table-column prop="inviteUserScore" label="邀请玩家" width="150px">
            <template slot-scope="scope">{{ scope.row.inviteUserScore | numTenthousand }}</template>
          </el-table-column>
          <el-table-column prop="redPacketsInfo" label="红包" width="150px">
            <template slot-scope="scope">{{ scope.row.redPacketsInfo | numTenthousand }}</template>
          </el-table-column>
          <el-table-column prop="accountsInfo" label="注册领取" width="150px">
            <template slot-scope="scope">{{ scope.row.accountsInfo | numTenthousand }}</template>
          </el-table-column>
          <el-table-column prop="rechargeScores" label="充值" width="150px">
            <template slot-scope="scope">{{ scope.row.rechargeScores | numTenthousand }}</template>
          </el-table-column>
          <el-table-column prop="loginScores" label="登录领奖" width="150px">
            <template slot-scope="scope">{{ scope.row.loginScores | numTenthousand }}</template>
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
        name: "summaryAllScore",
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
          this.onSubmit(1);
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
              this.$api.summaryAllScoresearch(param).then(res =>{
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
            opensumAllScoreChart(param){
               const {href} = this.$router.resolve({
                path: '/summaryAllScoreCharts',
                query: {
                  setType:param,
                  endDate: this.form.endTime,
                  beginDate:this.form.beginTime
                }
              })
              window.open(href, '_blank')
            },
        }
    }
</script>

<style scoped>
.el-date-editor.el-input, .el-date-editor.el-input__inner{
    width:100%;
}
</style>
