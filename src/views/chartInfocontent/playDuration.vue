<template>
  <div class="app-container">
    <h3 class="showTit">房间在线时长</h3>
    <el-row :gutter="32">
      <el-form ref="form" :model="form">
        <el-col :xs="24" :sm="6" :lg="3">
          <el-select v-model="form.roomType" size="small" placeholder="全部">
            <el-option v-for="list in selectList.roomTypelist" :key="list.key" :value="list.key" :label="list.value"></el-option>
          </el-select>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="4">
          <el-date-picker v-model="form.beginTime" size="small" clearable align="right" type="date" placeholder="开始日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd"></el-date-picker>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="4">
          <el-date-picker v-model="form.endTime" size="small" clearable align="right" type="date" placeholder="结束日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd"></el-date-picker>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="8" v-has="'playDuration_search'">
          <el-button type="primary" size="small" @click="onSubmit(1)">查询</el-button>
          <el-button type="primary" size="small"  @click="beforeOneDay()" >向前一天</el-button>
          <el-button type="primary" size="small"  @click="afterOneDay()">向后一天</el-button>
        </el-col>
      </el-form>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" style="width: 100%" :cell-style="cellStyle" :header-cell-style="rowClass" border v-loading="tableloading">
          <el-table-column prop="serverName" label="房间类型" show-overflow-tooltip></el-table-column>
          <el-table-column prop="totalAve" label="总平均时长" show-overflow-tooltip>
            <template slot-scope="scope"><div v-html="commonJs.showDuration1(scope.row.totalAve)"></div></template>
          </el-table-column>
          <el-table-column prop="payAve" label="付费用户平均时长" show-overflow-tooltip>
            <template slot-scope="scope"><div v-html="commonJs.showDuration1(scope.row.payAve)"></div></template>
          </el-table-column>
          <el-table-column prop="noPayAve" label="非付费用户平均时长" show-overflow-tooltip>
            <template slot-scope="scope"><div v-html="commonJs.showDuration1(scope.row.noPayAve)"></div></template>
          </el-table-column>
          <el-table-column prop="date" label="日期" show-overflow-tooltip></el-table-column>
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
      name: "playDuration",
      data(){
        return{
            currentPage: 1, //初始页
            pagesize: 30, //    每页的数据
            total: 0,
            currentTotal:0,
            form: {
              roomType: '',
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
          let param = {
            serverName:this.form.roomType,
            beginTime:this.form.beginTime,
            endTime:this.form.endTime,
            currentPage:pageNum,
            limit:this.pagesize
          };
          this.tableloading=true;
          this.$api.playDurationsearch(param).then(res =>{
            this.tableloading=false;
            if (res.success) {
              this.tableData = res.data.records;
              this.useCount= this.tableData.count;
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
