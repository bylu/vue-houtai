<template>
  <div class="app-container">
    <h3 class="showTit">每日游戏币记录</h3>
    <el-row :gutter="32">
      <el-form ref="form" :model="form">
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.userId" size="small" placeholder="用户ID" clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="4">
          <el-date-picker v-model="form.beginTime" clearable size="small" align="right" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="开始日期">
          </el-date-picker>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="2">
          <el-button type="primary" size="small" v-has="'dayScoreRecord_search'" @click="onSubmit(1)">查询</el-button>
        </el-col>
      </el-form>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" style="width: 100%" :cell-style="cellStyle" :header-cell-style="rowClass" border v-loading="tableloading">
          <el-table-column prop="userId" label="用户ID"></el-table-column>
          <el-table-column prop="share" label="分享"></el-table-column>
          <el-table-column prop="invite" label="邀请"></el-table-column>
          <el-table-column prop="back" label="背包"></el-table-column>
          <el-table-column prop="bind" label="绑定"></el-table-column>
          <el-table-column prop="singin" label="连续签到"></el-table-column>
          <el-table-column prop="active" label="活跃"></el-table-column>
          <el-table-column prop="chartThumb" label="排行榜点赞"></el-table-column>
          <el-table-column prop="chartReward" label="排行榜奖励"></el-table-column>
          <el-table-column prop="lgdbReset" label="龙宫夺宝充值转盘"></el-table-column>
          <el-table-column prop="fudai" label="福袋"></el-table-column>
          <el-table-column prop="lgdbChart" label="龙宫夺宝排行奖励"></el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    export default {
        name: "dayscoreRecord",
        data(){
          return{
            currentPage: 1, //初始页
            pagesize: 30, //    每页的数据
            total: 0,
            form: {
              userId: '',
              beginTime:this.moment(new Date()).format("YYYY-MM-DD"),
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
                userId:this.form.userId,
                beginTime:this.moment(this.form.beginTime).format("YYYY-MM-DD"),
                currentPage:pageNum,
                limit:this.pagesize
              };
              this.tableloading=true;
              this.$api.dayScoreRecordSearch(param).then(res =>{
                this.tableloading=false;
                if (res.success) {
                  this.tableData = res.data.records;
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
            }
        }
    }
</script>

<style scoped>
.el-date-editor.el-input, .el-date-editor.el-input__inner{
    width:100%;
}
</style>
