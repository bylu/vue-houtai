<template>
  <div class="app-container">
    <h3 class="showTit">推广业绩每日报表</h3>
    <el-row :gutter="32">
      <el-form ref="form" :model="form">
        <el-col :xs="24" :sm="6" :lg="4">
          <el-date-picker v-model="form.beginTime" clearable size="small" align="right" type="date" placeholder="开始日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd"></el-date-picker>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="4"> 
          <el-date-picker v-model="form.endTime" clearable size="small" align="right" type="date" placeholder="结束日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd"></el-date-picker>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="2">
          <el-button type="primary" size="small" @click="onSubmit(1)">查询</el-button>
        </el-col>
      </el-form>
    </el-row> 
    <div class="otherdesc">
      总充值金额：{{sumclub | numTenthousand}} &nbsp;&nbsp;
      总消费金额：{{summoney | numTenthousand}} &nbsp;&nbsp;
      官方充值：{{sumpay | numTenthousand}} &nbsp;&nbsp;
      实卡充值：{{sumpay | numTenthousand}} &nbsp;&nbsp;
    </div>
    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" style="width: 100%" :cell-style="cellStyle" :header-cell-style="rowClass" border v-loading="tableloading">
          <el-table-column prop="spreader" label="渠道" show-overflow-tooltip></el-table-column>
          <el-table-column prop="official" label="官方充值" show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.official | numTenthousand }}</template>
          </el-table-column>
          <el-table-column prop="cards" label="实卡充值" show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.cards | numTenthousand }}</template>
          </el-table-column>
          <el-table-column prop="payAmount" label="充值总额" show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.payAmount | numTenthousand }}</template>
          </el-table-column>
          <el-table-column prop="baiduMoney" label="推广消费" show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.baiduMoney | numTenthousand }}</template>
          </el-table-column>
          <el-table-column prop="rmb" label="折合人民币消费" show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.rmb | numTenthousand }}</template>
          </el-table-column>
          <el-table-column prop="spreadUserCount" label="推广用户数" show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.spreadUserCount | null2Zero }}</template>
          </el-table-column>
          <el-table-column prop="cost" label="注册成本" show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.cost | numTenthousand }}</template>
          </el-table-column>
          <el-table-column prop="paycount" label="充值总次数" show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.paycount | null2Zero }}</template>
          </el-table-column>
          <el-table-column prop="payUserCount" label="充值用户数" show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.payUserCount | null2Zero }}</template>
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
        name: "spreaderAchievementDaily",
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
                sumclub:'0',  //总充值金额
                summoney:'0',  //总消费金额
                sumpay:'0',  //官方充值
                sumpay:'0',  //实卡充值
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
              //beginTime,endTime,currentPage, limit
              let param = {
                beginTime:this.form.beginTime,
                endTime:this.form.endTime,
                currentPage:pageNum,
                limit:this.pagesize
              };
              this.tableloading=true;
              this.$http({
                url: this.paramUrl.spreaderAchievementsearchDaily,
                method: "post",
                data: param,
                headers: { "Content-Type": "application/json;charset=UTF-8" }
              }).then(res=> {
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
              })
            },
            handleCurrentChange: function(currentPage) {
              this.currentPage = currentPage;
              this.onSubmit(currentPage);
            }
        }
    }
</script>

<style scoped>
.el-date-editor.el-input, .el-date-editor.el-input__inner{
    width:100%;
}
</style>
