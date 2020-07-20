<template>
  <div class="app-container">
    <h3 class="showTit">充值统计</h3>
    <el-row :gutter="32">
      <el-form ref="form" :model="form">
        <el-col :xs="24" :sm="6" :lg="3">
          <el-select v-model="form.payStatisticsType" placeholder="全部" size="small">
            <el-option v-for="(list,index) in this.payStatisticsTypelist" :key="index" :label="list.platformName" :value="list.id"></el-option>
          </el-select>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="4">
          <el-date-picker v-model="form.beginTime" size="small" clearable align="right" type="date" placeholder="开始日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd"></el-date-picker>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="4">
          <el-date-picker v-model="form.endTime" size="small" clearable align="right" type="date" placeholder="结束日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd"></el-date-picker>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="8" v-has="'detailSummaryOfrp_search'">
          <el-button type="primary" size="small" @click="onSubmit(1,1)">每天</el-button>
          <el-button type="primary" size="small" @click="onSubmit(1,2)">周期</el-button>
          <el-button type="primary" size="small"  @click="beforeOneDay()" >向前一天</el-button>
          <el-button type="primary" size="small"  @click="afterOneDay()">向后一天</el-button>
        </el-col>
      </el-form>
    </el-row>

    <div class="otherdesc">
       累计充值总金额：{{sumPayAmountSummary | numTenthousand}} &nbsp;&nbsp;
       累计充值用户数量：{{sumUserCount | numTenthousand}} &nbsp;&nbsp;
       累计充值次数：{{sumDetailCount | numTenthousand}}
    </div>

    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" style="width: 100%" :cell-style="cellStyle" :header-cell-style="rowClass" border v-loading="tableloading">
          <el-table-column prop="" label="时间" show-overflow-tooltip>
            <template slot-scope="scope"><div v-html="date(scope.row)"></div></template>
          </el-table-column>
          <el-table-column prop="platformname" label="充值平台" show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.platformname | null2empty }}</template>
          </el-table-column>
          <el-table-column prop="payAmountSummary" label="充值总金额" show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.payAmountSummary | numTenthousand }}</template>
          </el-table-column>
          <el-table-column prop="userCount" label="充值用户数量" show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.userCount | null2Zero }}</template>
          </el-table-column>
          <el-table-column prop="detailCount" label="充值次数" show-overflow-tooltip></el-table-column>
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
        name: "detailSummaryOfrp",
        data(){
            return{
                currentPage: 1, //初始页
                pagesize: 30, //    每页的数据
                total: 0,
                currentTotal:0,
                form: {
                    payStatisticsType: parseInt('-1'),
                    beginTime:this.moment(new Date(new Date().setHours(0, 0, 0, 0))).format("YYYY-MM-DD"),
                    endTime:this.moment(new Date()).format("YYYY-MM-DD")
                },
                payStatisticsTypelist: [],
                tableData: [],
                sumPayAmountSummary:'',  //累计充值总金额
                sumUserCount:'',  //累计充值用户数量
                sumDetailCount:'',  //累计充值次数
                tableloading:false
            }
        },
        mounted() {
          this.rechargePlatformgetAll();
        },
        methods:{
            cellStyle(row,column,rowIndex,columnIndex){
              return 'text-align:center;padding:6px 0';
            },
            rowClass({row,rowIndex}){
              return 'text-align:center;padding:6px 0';
            },
            rechargePlatformgetAll() {
              //加载渠道
              this.$api.rechargePlatformgetAll().then(res =>{
                this.payStatisticsTypelist=[];
                if (res.success) {
                  this.payStatisticsTypelist = res.data.records;
                  this.$store.commit('setObject', JSON.stringify(res.data));//保存值
                }
              }).catch(err =>{
                this.$message({
                  message: '请求失败!',
                  type: "error"
                });
              })
            },
            onSubmit(pageNum,typeid){
              this.typeid = typeid;
              let param = {
                platformId:this.form.payStatisticsType,
                beginTime:this.form.beginTime,
                endTime:this.form.endTime,
                type:this.typeid,
                currentPage:pageNum,
                limit:this.pagesize
              };
              this.tableloading=true;
              this.$api.detailSummaryOfrpsearch(param).then(res =>{
                  this.tableloading=false;
                  if (res.success) {
                    this.tableData = res.data.records;
                    this.sumPayAmountSummary = res.params.sumPayAmountSummary;
                    this.sumUserCount = res.params.sumUserCount;
                    this.sumDetailCount = res.params.sumDetailCount;
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
              this.onSubmit(currentPage, this.typeid);
            },
            beforeOneDay(){
              if((this.form.beginTime == "" || this.form.beginTime == null) && (this.form.endTime == "" || this.form.endTime == null)){
                this.form.beginTime=this.moment(new Date()).format("YYYY-MM-DD");
                this.form.endTime=this.moment(new Date()).format("YYYY-MM-DD");
              }else{
                this.form.beginTime=this.moment(this.form.beginTime).subtract(1, 'days').format("YYYY-MM-DD");
                this.form.endTime=this.moment(this.form.endTime).subtract(1, 'days').format("YYYY-MM-DD");
              }
             
              this.onSubmit(1,this.typeid);
            },
            afterOneDay(){
              if((this.form.beginTime == "" || this.form.beginTime == null) && (this.form.endTime == "" || this.form.endTime == null)){
                this.form.beginTime=this.moment(new Date()).format("YYYY-MM-DD");
                this.form.endTime=this.moment(new Date()).format("YYYY-MM-DD");
              }else{
                this.form.beginTime=this.moment(this.form.beginTime).add(1, 'days').format("YYYY-MM-DD");
                this.form.endTime=this.moment(this.form.endTime).add(1, 'days').format("YYYY-MM-DD");
              }
              this.onSubmit(1,this.typeid);
            },
            date(data){
              if(data.type == 2){   //周期
                return  this.form.beginTime + ' -- ' + this.form.endTime;
              }else{  //每天
                return data.insertTime;
              }

            },
        }
    }
</script>

<style scoped>
.el-date-editor.el-input, .el-date-editor.el-input__inner{
    width:100%;
}
</style>
