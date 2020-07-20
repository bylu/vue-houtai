<template>
  <div class="app-container">
    <h3 class="showTit">登录领奖记录</h3>
    <el-row :gutter="32">
      <el-form ref="form" :model="form">
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.userID" size="small" placeholder="用户ID" clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.accounts" size="small" placeholder="账号" clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.gameID" size="small" placeholder="游戏ID" clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.nickName" size="small" placeholder="昵称" clearable></el-input>
        </el-col>
        <el-col :xs="12" :sm="6" :lg="4">
          <el-date-picker v-model="form.beginTime" clearable size="small" align="right" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="开始日期">
          </el-date-picker>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="6" v-has="'recordUserLoginReward_search'">
          <el-button type="primary" size="small" @click="onSubmit(1)">查询</el-button>
          <el-button type="primary" size="small"  @click="beforeOneDay()" >向前一天</el-button>
          <el-button type="primary" size="small"  @click="afterOneDay()">向后一天</el-button>
        </el-col>
      </el-form>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" style="width: 100%" :cell-style="cellStyle" :header-cell-style="rowClass" border v-loading="tableloading">
          <el-table-column prop="id" label="ID"></el-table-column>
          <el-table-column prop="userID" label="用户ID"></el-table-column>
          <el-table-column prop="gameID" label="游戏ID">
            <template slot-scope="scope">
              <span style="color:#1890ff;cursor: pointer;" @click="openNewWin(scope.row.gameID)">{{ scope.row.gameID }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="accounts" label="账号"></el-table-column>
          <el-table-column prop="nickName" label="昵称"></el-table-column>
          <el-table-column prop="firstGold" label="第一次领取"></el-table-column>
          <el-table-column prop="secondGold" label="第二次领取"></el-table-column>
          <el-table-column prop="memberLevel" label="会员级别"></el-table-column>
          <el-table-column prop="insertDate" label="插入时间" width="160px"></el-table-column>
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
        name: "recordUserLoginReward",
        data(){
          return{
            currentPage: 1, //初始页
            pagesize: 30, //    每页的数据
            total: 0,
            currentTotal:0,
            form: {
              gameID: '',
              nickName: '',
              accounts:'',
              userID:'',
              beginTime:this.moment(new Date()).format("YYYY-MM-DD")
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
                gameID:this.form.gameID,
                nickName:this.form.nickName,
                accounts:this.form.accounts,
                userID:this.form.userID,
                beginTime:this.moment(this.form.beginTime).format("YYYY-MM-DD") ,
                currentPage:pageNum,
                limit:this.pagesize
              };
              this.tableloading=true;
              this.$api.recordUserLoginRewardsearch(param).then(res =>{
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
              if(this.form.beginTime == "" || this.form.beginTime == null){
                this.form.beginTime=this.moment(new Date()).format("YYYY-MM-DD");
              }else{
                this.form.beginTime=this.moment(this.form.beginTime).subtract(1, 'days').format("YYYY-MM-DD");
              }
             
              this.onSubmit(1);
            },
            afterOneDay(){
              if(this.form.beginTime == "" || this.form.beginTime == null){
                this.form.beginTime=this.moment(new Date()).format("YYYY-MM-DD");
              }else{
                this.form.beginTime=this.moment(this.form.beginTime).add(1, 'days').format("YYYY-MM-DD");
              }
              this.onSubmit(1);
            },
            openNewWin(data){
              const {href} = this.$router.resolve({
                path: '/userbaseinfo',
                query: {
                  gameID: data
                }
              })
              window.open(href, '_blank')
            }
        }
    }
</script>

<style scoped>
.el-date-editor.el-input, .el-date-editor.el-input__inner{
    width:100%;
}
</style>
