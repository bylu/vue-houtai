<template>
  <div class="app-container">
    <h3 class="showTit">双响炮开奖记录</h3>
    <el-row :gutter="32">
      <el-form ref="form" :model="form">
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.userid" size="small" placeholder="用户ID" clearable></el-input>
        </el-col>
        <el-col :xs="12" :sm="6" :lg="4">
          <el-date-picker v-model="form.beginTime" clearable size="small" align="right" type="date" placeholder="开始日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
          </el-date-picker>
        </el-col>
        <el-col :xs="12" :sm="6" :lg="4">
          <el-date-picker v-model="form.endTime" clearable size="small" align="right" type="date" placeholder="结束日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
          </el-date-picker>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="6"  v-has="'sxpOpenLog_search'">
          <el-button type="primary" size="small" @click="onSubmit(1)">查询</el-button>
          <el-button type="primary" size="small"  @click="beforeOneDay()" >向前一天</el-button>
          <el-button type="primary" size="small"  @click="afterOneDay()">向后一天</el-button>
        </el-col>
      </el-form>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" style="width: 100%" :cell-style="cellStyle" :header-cell-style="rowClass" border v-loading="tableloading">
          <el-table-column prop="uid" label="用户ID"></el-table-column>
          <el-table-column prop="typeId" label="双响炮类型">
            <template slot-scope="scope"> {{scope.row.typeId | typeIdStatue }}</template>
          </el-table-column>
          <el-table-column prop="winScore" label="赢得幸运豆">
            <template slot-scope="scope">{{ scope.row.winScore | numTenthousand }}</template>
          </el-table-column>
          <el-table-column prop="winDiamond" label="赢得绿钻"></el-table-column>
          <el-table-column prop="afterCount" label="剩余彩票数"></el-table-column>
          <el-table-column prop="winMax" label="是否获得头奖">
            <template slot-scope="scope">{{ scope.row.winMax | checkwinMax }}</template>
          </el-table-column>
          <el-table-column prop="winViceAll" label="是否获得副奖励区全部奖励">
            <template slot-scope="scope">{{ scope.row.winViceAll | checkwinMax }}</template>
          </el-table-column>
          <el-table-column prop="map" label="map">
            <template slot-scope="scope"><div v-html="getShuangXiangPaoMapDesc(scope.row.map)"></div></template>
          </el-table-column>
          <el-table-column prop="createdAt" label="记录时间"></el-table-column>
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
        name: "sxpOpenLog",
        data(){
          return{
            currentPage: 1, //初始页
            pagesize: 30, //    每页的数据
            total: 0,
            currentTotal:0,
            form: {
              userid: '',
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
              //uid，beginTime，endTime,currentPage,limit
              let param = {
                  uid:this.form.userid,
                  beginTime:this.form.beginTime,
                  endTime:this.form.endTime,
                  currentPage:pageNum,
                  limit:this.pagesize
              };
              this.tableloading=true;
              this.$api.sxpOpenLogopenLogSearch(param).then(res =>{
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
            getShuangXiangPaoMapDesc(log) {
              var mapper = {
                  0: "红车",
                  1: "红马",
                  2: "红炮",
                  3: "红士",
                  4: "红象",
                  5: "红帅",
                  6: "红兵",
                  7: "黑车",
                  8: "黑马",
                  9: "黑炮",
                  10: "黑士",
                  11: "黑象",
                  12: "黑帅",
                  13: "黑兵"
              };
              var parts = {};
              var result = '';
              var idAndCount = {};
              parts = log.split(";");
              result = mapper[parts[0]] + "," + mapper[parts[1]] + " ";
              for (var i = 2; i <= 7; i++) {
                  idAndCount = parts[i].split(",");
                  result += mapper[idAndCount[0]] + ":" + idAndCount[1] + " ";
              }
              return result;
          }
        }
    }
</script>

<style scoped>
.el-date-editor.el-input, .el-date-editor.el-input__inner{
    width:100%;
}
</style>
