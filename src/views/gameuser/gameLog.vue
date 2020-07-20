<template>
  <div class="app-container">
    <h3 class="showTit">玩家游戏分析</h3>
    <el-row :gutter="32">
      <el-form ref="form" :model="form">
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.userid" size="small" placeholder="用户ID" clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.roomid" size="small" placeholder="房间ID" clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="4">
          <el-date-picker v-model="form.beginTime" clearable align="right" size="small" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="4">
          <el-date-picker v-model="form.endTime" clearable align="right" size="small" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="6">
          <el-button type="primary" @click="onSubmit(1)" v-has="'gameLog_search'" size="small">查询</el-button>
          <el-button type="danger"  @click="jinkongDialog()" v-has="'gameLog_monitor'"  size="small">监控</el-button>
          <el-button type="success" size="small" v-has="'gameLog_merge'" @click="mergeDownload()">合并下载</el-button>
        </el-col>
      </el-form>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-table id="gameloginfo" :data="tableData" style="width: 100%" :cell-style="cellStyle" :header-cell-style="rowClass" border v-loading="tableloading">
            <el-table-column prop="id" label="ID" width="50"></el-table-column>
            <el-table-column prop="serverid" label="房间" ></el-table-column>
            <el-table-column prop="userid" label="UserID" ></el-table-column>
            <el-table-column label="操作"  width="100">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" v-has="'gameLog_download'" @click="downloadexcel(scope.row)">下载</el-button>
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
    // import FileSaver from 'file-saver'
    // import XLSX from 'xlsx'
    export default {
        name: "gameLog",
        data(){
          return{
            currentPage: 1, //初始页
            pagesize: 30, //    每页的数据
            total: 0,
            currentTotal:0,
            form: {
              userid: '',
              roomid:'',
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
              //userid,serverid,beginTime,endTime,currentPage,limit
              let param = {
                userid:this.form.userid,
                serverid:this.form.roomid,
                beginTime:this.form.beginTime,
                endTime:this.form.endTime,
                currentPage:pageNum,
                limit:this.pagesize
              };
              this.tableloading=true;
              this.$api.gameLogsearch(param).then(res =>{
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
            /**
             * 监控操作
             */
            jinkongDialog(){
              this.$prompt('用户ID：', '监控', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputValue:"",
                    inputValidator:function(inputValue){
                        if(inputValue == "" ||inputValue == null){
                            return "请输入用户ID"
                        }
                    },
                    inputPlaceholder:'多个ID 用;隔开'
                }).then(({value}) => {
                    let param={
                      userid:value
                    }
                    this.$api.gameLogmonitor(param).then(res =>{
                        if (res.success) {
                          this.$message({
                              showClose: true,
                              message: res.message,
                              type: 'success'
                          });
                          this.onSubmit(1);
                        }else{
                            this.$message({
                              showClose: true,
                              message: res.message,
                              type: 'error'
                            });
                        }
                    }).catch(err =>{
                      this.$message({
                        message: '请求失败!',
                        type: "error"
                      });
                    })
                }).catch(e=>e);
            },
            /**
             * 下载操作
             */
            downloadexcel(data){
              let param={"ids":data.id}
              this.$api.gameLogexcel(param).then(res =>{
                if (res.success) {

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
