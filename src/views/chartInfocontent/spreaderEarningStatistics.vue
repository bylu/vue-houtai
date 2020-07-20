<template>
  <div class="app-container">
    <h3 class="showTit">推广收益统计</h3>
    <el-row :gutter="32">
      <el-form ref="form" :model="form">
        <!-- <span style="width:auto;float:left;padding-top:5px;"> 注册日期：</span> -->
        <el-col :xs="24" :sm="6" :lg="4">
          <el-date-picker v-model="form.registeBeginTime" clearable size="small" align="right" type="date" placeholder="注册开始日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd"></el-date-picker>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="4">
          <el-date-picker v-model="form.registeEndTime" clearable size="small" align="right" type="date" placeholder="注册结束日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd"></el-date-picker>
        </el-col>
        <!-- <span style="width:auto;float:left;padding-top:5px;"> 充值日期：</span> -->

        <el-col :xs="24" :sm="6" :lg="4">
          <el-date-picker v-model="form.payBeginTime" clearable size="small" align="right" type="date" placeholder="充值开始日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd"></el-date-picker>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="4">
          <el-date-picker v-model="form.payEndTime" clearable size="small" align="right" type="date" placeholder="充值结束日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd"></el-date-picker>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="4">
          <el-select v-model="form.channelType" placeholder="请选择渠道" size="small">
            <el-option v-for="(list,index) in this.channelTypelist" :key="index" :label="list.accounts" :value="list.userid"></el-option>
          </el-select>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="2">
          <el-button type="primary" size="small" v-has="'spreaderEarningStatistics_search'" @click="onSubmit(1)">查询</el-button>
        </el-col>
      </el-form>
    </el-row>

    <div class="otherdesc">累计注册人数： </div>

    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" style="width: 100%" :cell-style="cellStyle" :header-cell-style="rowClass" border v-loading="tableloading">
          <el-table-column prop="spreader" label="渠道" show-overflow-tooltip></el-table-column>
          <el-table-column prop="applyDateString" label="日期" show-overflow-tooltip></el-table-column>
          <el-table-column prop="payAmount" label="充值金额" show-overflow-tooltip></el-table-column>
          <el-table-column prop="paycount" label="充值次数" show-overflow-tooltip></el-table-column>
          <el-table-column prop="payUserCount" label="充值人数" show-overflow-tooltip></el-table-column>
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
        name: "spreaderEarningStatistics",
        data(){
            return{
                currentPage: 1, //初始页
                pagesize: 30, //    每页的数据
                total: 0,
                currentTotal:0,
                form: {
                    // registeBeginTime:this.moment(new Date(new Date().setHours(0, 0, 0, 0))).format("YYYY-MM-DD"),
                    // registeEndTime:this.moment(new Date()).format("YYYY-MM-DD"),
                    // payBeginTime:this.moment(new Date(new Date().setHours(0, 0, 0, 0))).format("YYYY-MM-DD"),
                    // payEndTime:this.moment(new Date()).format("YYYY-MM-DD"),
                    registeBeginTime:"",
                    registeEndTime:"",
                    payBeginTime:"",
                    payEndTime:"",
                    channelType: parseInt('-1'),
                },
                channelTypelist: [],
                tableData: [],
                tableloading:false
            }
        },
        mounted() {
         this.$nextTick(function(){
          this.findAllSpread();
          })
        },
        methods:{
            cellStyle(row,column,rowIndex,columnIndex){
              return 'text-align:center;padding:6px 0';
            },
            rowClass({row,rowIndex}){
              return 'text-align:center;padding:6px 0';
            },
            findAllSpread() {
              //加载渠道类型
              this.$api.spreaderOrderCharacterRatefindAllSpread().then(res =>{
                this.channelTypelist=[];
                if (res.success) {
                  this.channelTypelist = res.data;
                 // this.$store.commit('setObject', JSON.stringify(res.data));//保存值
                }
              }).catch(err =>{
                this.$message({
                  message: '请求失败!',
                  type: "error"
                });
              })
            },
            onSubmit(pageNum){
              //spreaderId, regBeginTime, regEndTime, beginTime, endTime, currentPage, limit
              let param = {
                regBeginTime:this.form.registeBeginTime,
                regEndTime:this.form.registeEndTime,
                beginTime:this.form.payBeginTime,
                endTime:this.form.payEndTime,
                spreaderId:this.form.channelType,
                currentPage:pageNum,
                limit:this.pagesize
              };
              this.tableloading=true;
              this.$api.spreaderEarningStatisticssearch(param).then(res =>{
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
            }
        }
    }
</script>

<style scoped>
.el-date-editor.el-input, .el-date-editor.el-input__inner{
    width:100%;
}
</style>
