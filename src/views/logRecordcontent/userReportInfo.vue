<template>
  <div class="app-container">
    <h3 class="showTit">举报信息</h3>
    <el-row :gutter="32">
      <el-form ref="form" :model="form">
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.reportUserId" size="small" placeholder="举报人ID" clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.beReportUserId" size="small" placeholder="被举报人ID" clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="4">
          <el-date-picker v-model="form.reportTime" size="small" clearable align="right" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="开始日期">
          </el-date-picker>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="4">
          <el-date-picker v-model="form.reportendTime" size="small" clearable align="right" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="结束日期">
          </el-date-picker>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="6" v-has="'userReportInfo_search'">
          <el-button type="primary" size="small" @click="onSubmit(1)">查询</el-button>
          <el-button type="primary" size="small"  @click="beforeOneDay()" >向前一天</el-button>
          <el-button type="primary" size="small"  @click="afterOneDay()">向后一天</el-button>
        </el-col>
      </el-form>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" style="width: 100%" :cell-style="cellStyle" :header-cell-style="rowClass" border v-loading="tableloading">
          <el-table-column prop="beReportUserId" label="被举报人ID"></el-table-column>
          <el-table-column prop="beReportUserName" label="被举报人昵称"></el-table-column>
          <el-table-column prop="reportUserId" label="举报人ID"></el-table-column>
          <el-table-column prop="" label="被举报类型">
            <template slot-scope="scope">
              {{scope.row.reportType| userReportType}}
            </template>
          </el-table-column>
          <el-table-column prop="reportContent" label="举报详情"></el-table-column>
          <el-table-column prop="reportTime" label="被举报时间"></el-table-column>
          <el-table-column prop="status" label="状态">
            <template slot-scope="scope">
                <el-button size="mini" type="danger" v-if="scope.row.status == 1" @click="handleEdit(scope.row.endTime)">监控中</el-button>
                <span  v-if="scope.row.status == 0" >正常</span>
            </template>
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
        name: "userReportInfo",
        data(){
          return{
            currentPage: 1, //初始页
            pagesize: 30, //    每页的数据
            total: 0,
            currentTotal:0,
            form: {
              reportUserId: '',
              beReportUserId: '',
              reportTime:this.moment(new Date()).format("YYYY-MM-DD"),
              reportendTime:this.moment(new Date()).format("YYYY-MM-DD"),
            },
            tableData: [],
            tableloading:false,
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
               let param = {
                reportUserId:this.form.reportUserId,
                beReportUserId:this.form.beReportUserId,
                reportbeginTime:this.form.reportTime,
                reportendTime:this.form.reportendTime,
                currentPage:pageNum,
                limit:this.pagesize
              };
              this.tableloading=true;
              this.$api.userReportInfoSearch(param).then(res =>{
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
              if((this.form.reportTime == "" || this.form.reportTime == null) && (this.form.reportendTime == "" || this.form.reportendTime == null)){
                this.form.reportTime=this.moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
                this.form.reportendTime=this.moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
              }else{
                this.form.reportTime=this.moment(this.form.reportTime).subtract(1, 'days').format("YYYY-MM-DD HH:mm:ss");
                this.form.reportendTime=this.moment(this.form.reportendTime).subtract(1, 'days').format("YYYY-MM-DD HH:mm:ss");
              }
              this.onSubmit(1);
            },
            afterOneDay(){
              if((this.form.reportTime == "" || this.form.reportTime == null) && (this.form.reportendTime == "" || this.form.reportendTime == null)){
                this.form.reportTime=this.moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
                this.form.reportendTime=this.moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
              }else{
                this.form.reportTime=this.moment(this.form.reportTime).add(1, 'days').format("YYYY-MM-DD HH:mm:ss");
                this.form.reportendTime=this.moment(this.form.reportendTime).add(1, 'days').format("YYYY-MM-DD HH:mm:ss");
              }
               this.onSubmit(1);
            },
            /**
             * 监控中事件
             */
            handleEdit(data){
                this.$confirm('监控至:  '+ data, '监控时间', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'info'
                }).then(() => {

                }).catch(() => {

                });
            }
        }
    }
</script>

<style scoped>
.el-date-editor.el-input, .el-date-editor.el-input__inner{
    width:100%;
}
  .el-button--text{
    color:#000;
  }
</style>
