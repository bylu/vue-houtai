<template>
  <div class="app-container">
    <h3 class="showTit">聊天消耗记录</h3>
    <el-row :gutter="32">
      <el-form ref="form" :model="form">
        <el-col :xs="12" :sm="6" :lg="3">
          <el-input v-model.trim="form.userid" size="small" placeholder="用户ID" clearable></el-input>
        </el-col>
        <el-col :xs="12" :sm="6" :lg="4">
          <el-date-picker v-model="form.beginTime" size="small" align="right" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd" clearable>
          </el-date-picker>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="6" v-has="'chatCost_search'">
          <el-button type="primary" size="small" @click="onSubmit(1)">查询</el-button>
          <el-button type="primary" size="small"  @click="beforeOneDay()" >向前一天</el-button>
          <el-button type="primary" size="small"  @click="afterOneDay()">向后一天</el-button>
        </el-col>
      </el-form>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" style="width: 100%" :cell-style="cellStyle" :header-cell-style="rowClass" border v-loading="tableloading">
          <el-table-column prop="uid" label="用户ID" show-overflow-tooltip></el-table-column>
          <el-table-column prop="gameID" label="游戏ID" show-overflow-tooltip>
            <template slot-scope="scope">
              <span style="color:#1890ff;cursor: pointer;" @click="openNewWin(scope.row.gameID)">{{ scope.row.gameID }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="nickName" label="昵称" show-overflow-tooltip></el-table-column>
          <el-table-column label="聊天频道" show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.channel | channelStatue }}</template>
          </el-table-column>
          <el-table-column label="消耗类型" show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.costType | costTypeStatue }}</template>
          </el-table-column>
          <el-table-column prop="toolId" label="消耗道具ID" show-overflow-tooltip></el-table-column>
          <el-table-column prop="cost" label="消耗数目" show-overflow-tooltip></el-table-column>
          <el-table-column prop="createdAt" label="记录时间" show-overflow-tooltip></el-table-column>
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
        name: "chatCost",
        data(){
          return{
            currentPage: 1, //初始页
            pagesize: 30, //    每页的数据
            total: 0,
            currentTotal:0,
            form: {
              userid: '',
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
              //uid,beginTime,currentPage,limit
              let param = {
                uid:this.form.userid,
                beginTime:this.form.beginTime,
                currentPage:pageNum,
                limit:this.pagesize
              };
              this.tableloading=true;
              this.$api.chatCostsearch(param).then(res =>{
                this.tableloading=false;
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
