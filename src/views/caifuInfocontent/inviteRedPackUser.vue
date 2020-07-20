<template>
  <div class="app-container">
    <h3 class="showTit">用户邀请信息</h3>
    <el-row :gutter="32">
      <el-form ref="form" :model="form">
        <el-col :xs="12" :sm="6" :lg="3">
          <el-input v-model.trim="form.gameid" size="small" placeholder="游戏ID" clearable></el-input>
        </el-col>
        <el-col :xs="12" :sm="6" :lg="3">
          <el-date-picker v-model="form.beginTime"  clearable size="small" align="right" type="date" placeholder="开始日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd"></el-date-picker>
        </el-col>
        <el-col :xs="12" :sm="6" :lg="3">
          <el-date-picker v-model="form.endTime" clearable size="small" align="right" type="date" placeholder="结束日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd"></el-date-picker>
        </el-col>
        <el-col :xs="12" :sm="6" :lg="2">
          <el-button type="primary" size="small" @click="onSubmit(1)">查询</el-button>
        </el-col>
      </el-form>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" style="width: 100%" :cell-style="cellStyle" :header-cell-style="rowClass" border v-loading="tableloading">
          <el-table-column prop="userid" label="邀请者用户ID" show-overflow-tooltip></el-table-column>
          <el-table-column prop="nickname" label="邀请者昵称" show-overflow-tooltip>
            <template slot-scope="scope"> {{scope.row.nickname | null2Zero }}</template>
          </el-table-column>
          <el-table-column prop="inviteruserid" label="被邀请用户ID" show-overflow-tooltip></el-table-column>
          <el-table-column prop="inviterNickname" label="被邀请昵称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="status" label="被邀请状态" show-overflow-tooltip>
            <template slot-scope="scope"> {{scope.row.status | inviteRedPackUserStatue }}</template>
          </el-table-column>
          <el-table-column prop="friendFirstLoginTime" label="被邀请用户登录时间" show-overflow-tooltip></el-table-column>
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
        name: "inviteRedPackUser",
        data(){
          return{
            currentPage: 1, //初始页
            pagesize: 30, //    每页的数据
            total: 0,
            currentTotal:0,
            form: {
              gameid: '',
              beginTime:this.moment(new Date(new Date().setHours(0, 0, 0, 0))).format("YYYY-MM-DD"),
              endTime:this.moment(new Date()).format("YYYY-MM-DD")
            },
            tableData: [],
            tableloading:false
          }
        },
        created(){
          this.getParams();
        },
        methods:{
            getParams() {
              // 取到路由带过来的参数
              this.form.gameid = this.$route.query.userid;
              this.form.beginTime = this.$route.query.beginDate;
              this.form.endTime = this.$route.query.endDate;
              this.onSubmit(1);
            },
            cellStyle(row,column,rowIndex,columnIndex){
              return 'text-align:center';
            },
            rowClass({row,rowIndex}){
              return 'text-align:center;';
            },
            onSubmit(pageNum){
              //userid,begintime,endTime
              let param = {
                userid:this.form.gameid,
                begintime:this.form.beginTime,
                endTime:this.form.endTime,
                currentPage:pageNum,
                limit:this.pagesize
              };
              this.tableloading=true;
              this.$api.inviteRedPackUsersearch(param).then(res =>{
                if (res.success) {
                    this.tableData = res.data.records;
                    this.tableloading=false;
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
