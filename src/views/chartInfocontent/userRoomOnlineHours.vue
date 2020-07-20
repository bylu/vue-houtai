<template>
  <div class="app-container">
    <h3 class="showTit">用户房间在线时长</h3>
    <el-row :gutter="32">
      <el-form ref="form" :model="form">
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.gameid" size="small" placeholder="游戏ID" clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="4">
          <el-date-picker v-model="form.beginTime"  clearable size="small" align="right" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="开始日期">
          </el-date-picker>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="2">
          <el-button type="primary" size="small" @click="onSubmit(1)">查询</el-button>
        </el-col>
      </el-form>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" style="width: 100%" :cell-style="cellStyle" :header-cell-style="rowClass" border v-loading="tableloading">
          <el-table-column prop="gameID" label="游戏ID"></el-table-column>
          <el-table-column prop="serverID" label="房间ID"></el-table-column>
          <el-table-column prop="serverName" label="房间名称"></el-table-column>
          <el-table-column prop="" label="游戏时长">
              <template slot-scope="scope">
                <div v-html="formatSecondTime(scope.row.secondMillsCount)"></div>
              </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    export default {
        name: "userRoomOnlineHours",
        data(){
            return{
                currentPage: 1, //初始页
                pagesize: 30, //    每页的数据
                total: 0,
                form: {
                    gameid: '',
                    sort:'',
                    beginTime:""
                },
                tableData: [],
                tableloading:false
            }
        },
        mounted(){
        this.getParams()
        },
        methods:{
            getParams() {
              // 取到路由带过来的参数
               this.form.gameid = this.$route.query.gameid;
               this.form.beginTime= this.moment(this.$route.query.beginTime).format("YYYY-MM-DD") ;
               this.onSubmit(1);
            },
            cellStyle(row,column,rowIndex,columnIndex){
              return 'text-align:center';
            },
            rowClass({row,rowIndex}){
              return 'text-align:center;';
            },
            onSubmit(pageNum){
              let param = {
                gameID:this.form.gameid,
                beginTime:this.form.beginTime,
                currentPage:pageNum,
                limit:this.pagesize
              };
              this.tableloading=true;
              this.$api.userRoomOnlineHours(param).then(res =>{
                this.tableloading=false;
                if (res.success) {
                  this.tableData = res.data.records;
                  this.total = res.data.total;
                  this.pagesize=res.data.size;
                  this.currentPage = res.data.current;
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
            formatSecondTime(obj){
                if(null==obj){
                    return;
                }
                return this.showDuration(obj*1000);
            },
            //时间毫秒数格式化为天小时分钟秒
            showDuration(secondNum){
              var str = "";
              if(secondNum == null || secondNum == '') return "0";
              else secondNum = Math.round(secondNum / 1000);
              var temp = this.div( secondNum , 60*60*24 );
              if(temp>0){
                str = str + temp +"天";
                secondNum = secondNum % (60*60*24);
              }
              temp = this.div( secondNum , 60*60 );
              if(temp>0){
                str = str + temp +"时";
                secondNum = secondNum % (60*60);
              }
              temp = this.div( secondNum , 60 );
              if(temp>0){
                str = str + temp +"分";
                secondNum = secondNum % (60);
              }
              if(str.length == 0 || secondNum != 0) {
                str = str +  secondNum  +"秒";
              }
              return str;
            },
            div(exp1, exp2){
              var n1 = Math.round(exp1); //四舍五入
              var n2 = Math.round(exp2); //四舍五入
              var rslt = n1/n2; //除
              if (rslt >= 0){
                rslt = Math.floor(rslt); //返回小于等于原rslt的最大整数。
              }else{
                rslt = Math.ceil(rslt); //返回大于等于原rslt的最小整数。
              }
              return rslt;
            }
        }
    }
</script>

<style scoped>
.el-date-editor.el-input, .el-date-editor.el-input__inner{
    width:100%;
}
</style>
