<template>
  <div class="app-container">
    <h3 class="showTit">赛鱼日志</h3>
    <el-row :gutter="32">
      <el-form ref="form" :model="form">
        <el-col :xs="12" :sm="6" :lg="4">
          <el-date-picker v-model="form.beginTime" size="small" align="right" type="date" placeholder="开始日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd" clearable>
          </el-date-picker>
        </el-col>
        <el-col :xs="12" :sm="6" :lg="4">
          <el-date-picker v-model="form.endTime" size="small" align="right" type="date" placeholder="结束日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd" clearable>
          </el-date-picker>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="6" v-has="'fishRaceLog_search'">
          <el-button type="primary" size="small" @click="onSubmit(1)">查询</el-button>
          <el-button type="primary" size="small"  @click="beforeOneDay()" >向前一天</el-button>
          <el-button type="primary" size="small"  @click="afterOneDay()">向后一天</el-button>
        </el-col>
      </el-form>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" style="width: 100%" :cell-style="cellStyle" :header-cell-style="rowClass" border v-loading="tableloading">
          <el-table-column prop="round" label="第几局" width="160px"></el-table-column>
          <el-table-column prop="fishIdRank" label="鱼的ID名次" width="120px"></el-table-column>
          <el-table-column prop="pathGroup" label="路径组"></el-table-column>
          <el-table-column prop="ucount" label="投注人数" width="120px"></el-table-column>
          <el-table-column prop="score1" label="1号压幸运豆" width="120px">
            <template slot-scope="scope">{{ scope.row.score1 | numTenthousand }}</template>
          </el-table-column>
          <el-table-column prop="score2" label="2号压幸运豆" width="120px">
            <template slot-scope="scope">{{ scope.row.score2 | numTenthousand }}</template>
          </el-table-column>
          <el-table-column prop="score3" label="3号压幸运豆" width="120px">
            <template slot-scope="scope">{{ scope.row.score3 | numTenthousand }}</template>
          </el-table-column>
          <el-table-column prop="score4" label="4号压幸运豆" width="120px">
            <template slot-scope="scope">{{ scope.row.score4 | numTenthousand }}</template>
          </el-table-column>
          <el-table-column prop="diamond1" label="1号压绿钻" width="120px"></el-table-column>
          <el-table-column prop="diamond2" label="2号压绿钻" width="120px"></el-table-column>
          <el-table-column prop="diamond3" label="3号压绿钻" width="120px"></el-table-column>
          <el-table-column prop="diamond4" label="4号压绿钻" width="120px"></el-table-column>
          <el-table-column prop="winScore" label="赢幸运豆" width="120px">
            <template slot-scope="scope"><div v-html="commonJs.col(scope.row.winScore)"></div></template>
          </el-table-column>
          <el-table-column prop="winDiamond" label="赢绿钻" width="120px"></el-table-column>
          <el-table-column prop="createdAt" label="记录时间" width="160px"></el-table-column>
          <el-table-column prop="sendAwardAt" label="发奖时间" width="160px">
            <template slot-scope="scope"> {{scope.row.sendAwardAt | null2Zero }}</template>
          </el-table-column>
          <el-table-column label="奖池赛" width="120px">
            <template slot-scope="scope">{{ scope.row.isAwardPoolRace | isChanneluser }}</template>
          </el-table-column>
          <el-table-column prop="awardPoolAward" label="奖池提供奖金" width="120px">
            <template slot-scope="scope">{{ scope.row.awardPoolAward | numTenthousand }}</template>
          </el-table-column>
          <el-table-column prop="awardPoolRate" label="奖金占奖金池" width="120px">
            <template slot-scope="scope">{{ scope.row.awardPoolRate | numTenthousand }}</template>
          </el-table-column>
          <el-table-column prop="awardPoolInject" label="注入奖池奖金" width="120px">
            <template slot-scope="scope">{{ scope.row.awardPoolInject | numTenthousand }}</template>
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
        name: "fishRaceLog",
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
        methods:{
            cellStyle(row,column,rowIndex,columnIndex){
              return 'text-align:center;padding:6px 0';
            },
            rowClass({row,rowIndex}){
              return 'text-align:center;padding:6px 0';
            },
            onSubmit(pageNum){
              //beginTime，endTime,currentPage,limit
              let param = {
                  beginTime:this.form.beginTime,
                  endTime:this.form.endTime,
                  currentPage:pageNum,
                  limit:this.pagesize
              };
              this.tableloading=true;
              this.$api.fishRaceLogsearch(param).then(res =>{
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
