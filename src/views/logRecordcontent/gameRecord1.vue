<template>
  <div class="app-container">
    <el-row :gutter="32">
      <el-form ref="form" :model="form">
        <el-col :xs="12" :sm="6" :lg="3">
          <el-input v-model.trim="form.userid" size="small" placeholder="用户ID" clearable></el-input>
        </el-col>
        <el-col :xs="12" :sm="6" :lg="3">
          <el-input v-model.trim="form.matchid" size="small" placeholder="比赛ID" clearable></el-input>
        </el-col>
        <el-col :xs="12" :sm="6" :lg="4">
          <el-date-picker v-model="form.beginTime" size="small" align="right" type="date" placeholder="开始日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd" clearable>
          </el-date-picker>
        </el-col>
        <el-col :xs="12" :sm="6" :lg="2" >
          <el-button type="primary" size="small"  @click="onSubmit(1)">查询</el-button>
        </el-col>
      </el-form>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" style="width: 100%" :cell-style="cellStyle" :header-cell-style="rowClass" border v-loading="tableloading">
          <el-table-column prop="userID" label="用户id" width="100px"></el-table-column>
          <el-table-column prop="gameID" label="游戏id" width="100px">
            <template slot-scope="scope">
              <span style="color:#1890ff;cursor: pointer;" @click="openNewWin(scope.row.gameID)">{{ scope.row.gameID }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="nickName" label="昵称"></el-table-column>
          <el-table-column prop="matchid" label="比赛id"></el-table-column>
          <el-table-column prop="matchName" label="比赛名称"></el-table-column>
          <el-table-column prop="starttime" label="进入时间" width="160px"></el-table-column>
          <el-table-column prop="endtime" label="退出时间" width="160px"></el-table-column>
          <el-table-column prop="rank" label="获得名次"></el-table-column>
          <el-table-column prop="enterScore" label="进入幸运豆" width="140px"></el-table-column>
          <el-table-column prop="score" label="退出幸运豆" width="140px"></el-table-column>
          <el-table-column prop="enterUserMedal" label="进入奖券"></el-table-column>
          <el-table-column prop="userMedal" label="退出奖券"></el-table-column>
          <el-table-column prop="enterInsure" label="进入银行幸运豆" width="140px"></el-table-column>
          <el-table-column prop="insure" label="退出银行幸运豆" width="140px"></el-table-column>
          <el-table-column prop="matchPrize" label="比赛奖品">
            <template slot-scope="scope">{{ scope.row.matchPrize | checkmatchPrize }}</template>
          </el-table-column>
          <el-table-column prop="prizetime" label="发奖时间" width="160px"></el-table-column>
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
        name: "gameRecord",
        data(){
          return{
            currentPage: 1, //初始页
            pagesize: 30, //    每页的数据
            total: 0,
            currentTotal:0,
            form: {
              userid: '',
              matchid:'',
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
              //userID，matchid,beginTime,currentPage,limit
              let param = {
                  userID:this.form.userid,
                  matchid:this.form.matchid,
                  beginTime:this.form.beginTime,
                  currentPage:pageNum,
                  limit:this.pagesize
              };
              this.tableloading=true;
              this.$api.recordUserInoutmatchRecord(param).then(res =>{
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
