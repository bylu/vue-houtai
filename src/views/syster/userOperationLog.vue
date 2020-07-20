<template>
  <div class="app-container">
    <h3 class="showTit">用户操作日志</h3>
    <el-row :gutter="32">
      <el-col :xs="24" :sm="6" :lg="3">
        <el-input v-model.trim="form.userid" size="small" placeholder="用户ID" clearable></el-input>
      </el-col>
      <el-col :xs="24" :sm="6" :lg="3">
        <el-input v-model.trim="form.username" size="small" placeholder="用户昵称" clearable></el-input>
      </el-col>
      <el-form :model="form" :inline="true" ref="form" label-width="80px" class="demo-ruleForm">
        <el-col :xs="12" :sm="6" :lg="4">
          <el-date-picker v-model="form.beginTime" align="right" clearable size="small" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="请输入执行时间" ></el-date-picker>
        </el-col>
        <el-col :xs="12" :sm="6" :lg="4">
          <el-date-picker v-model="form.endTime" align="right" clearable size="small" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="请输入执行时间"></el-date-picker>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="8" v-has="'userOperationLog_search'">
          <el-button type="primary" size="small" @click="onSubmit(1)">查询</el-button>
          <el-button type="primary" size="small"  @click="beforeOneDay()" >向前一天</el-button>
          <el-button type="primary" size="small"  @click="afterOneDay()">向后一天</el-button>
          <el-button type="primary" size="small"  @click="afterOneDay7()">向后7天</el-button>
        </el-col>
      </el-form>
    </el-row>
   <el-row>
    <el-col :span="24">
      <el-table v-loading="loading" :data="moduletabledata" :cell-style="cellStyle" :header-cell-style="rowClass" highlight-current-row  style="width: 100%;" border>
        <el-table-column prop="userid" label="用户ID" width="120px"></el-table-column>
        <el-table-column prop="username" label="用户昵称" width="120px"></el-table-column>
        <el-table-column prop="ip" label="操作ip" width="120px"></el-table-column>
        <el-table-column prop="url" label="操作路径"></el-table-column>
        <el-table-column prop="params" label="操作参数" width="100px">
          <template slot-scope="scope">
            <span style="color:#1890ff;cursor: pointer;"  @click="lookInfo(scope.row.params)">查看具体参数</span>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="操作时间" width="150px"></el-table-column>
      </el-table>
      <!-- 分页 begin-->
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
      <!-- 分页end -->
      </el-col>
    </el-row>
    <!--查看具体参数 弹框-->
    <pcModal v-if="showOpen" width="800px" title="查看具体参数" @closeModal="showOpen = false">
        <showOpenDialogmodule :getdata="openParam"   @closedialog="showOpen = false"></showOpenDialogmodule>
    </pcModal>
  </div>
</template>
<script>
export default {
  name: "",
  components: {
    showOpenDialogmodule:() => import('./userOperationParam.vue')
  },
  data() {
    return {
     form:{
        userid:"",
        username:"",
        beginTime: this.moment(new Date(new Date().setHours(0, 0, 0, 0))).format("YYYY-MM-DD"),
        endTime: this.moment(new Date()).format("YYYY-MM-DD")
     },
      loading: false,
      currentPage: 1, //初始页
      pagesize: 30, //    每页的数据
      total: 0,
      currentTotal:0,
      moduletabledata: [],
      showOpen:false,
      openParam:''
    };
  },
  methods: {
    cellStyle(row,column,rowIndex,columnIndex){
      return 'padding:6px 0';
    },
    rowClass({row,rowIndex}){
      return 'padding:6px 0';
    },
    onSubmit(pageNum) {
      this.loading = true;
      let param={
          userid:this.form.userid,
          username:this.form.username,
          beginTime:this.form.beginTime,
          endTime:this.form.endTime,
          currentPage:pageNum,
          limit:this.pagesize
      }
      this.$api.userOperationLogsearchOnPage(param).then(res =>{
        this.moduletabledata = [];
        this.loading = false;
        if (res.success) {
          this.moduletabledata = res.data.records;
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
    afterOneDay7(){
      if((this.form.beginTime == "" || this.form.beginTime == null) && (this.form.endTime == "" || this.form.endTime == null)){
        this.form.beginTime=this.moment(new Date()).format("YYYY-MM-DD");
        this.form.endTime=this.moment(new Date()).format("YYYY-MM-DD");
      }else{
        this.form.beginTime=this.moment(this.form.beginTime).add(7, 'days').format("YYYY-MM-DD");
        this.form.endTime=this.moment(this.form.endTime).add(7, 'days').format("YYYY-MM-DD");
      }
      this.onSubmit(1);
    },
    lookInfo(data){
      this.showOpen=true;
      this.openParam=data;
    }
  }
};
</script>

<style scoped>
.el-date-editor.el-input, .el-date-editor.el-input__inner{
    width:100%;
}
.filter-item {
  margin-bottom: 10px;
}
</style>
