<template>
    <div class="showcontent">
      <div class="userOperaTitlecss">赠送靓号查询操作:</div>
        <el-row :gutter="32">
            <el-form ref="form" :model="form">
                <el-col :xs="24" :sm="6" :lg="3">
                    <el-input v-model.trim="form.masterID" size="small" placeholder="操作员ID" clearable></el-input>
                </el-col>
                <el-col :xs="24" :sm="6" :lg="3">
                    <el-input v-model.trim="form.userID" size="small" placeholder="赠送对象用户ID" clearable></el-input>
                </el-col>
                <el-col :xs="24" :sm="6" :lg="3">
                    <el-input v-model.trim="form.gameid" size="small" placeholder="赠送对象游戏ID" clearable></el-input>
                </el-col>
                <el-col :xs="12" :sm="6" :lg="4">
                    <el-date-picker v-model="form.beginTime" clearable size="small" align="right" type="date" placeholder="开始日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd"></el-date-picker>
                </el-col>
                <el-col :xs="12" :sm="6" :lg="4">
                    <el-date-picker v-model="form.endTime" clearable size="small" align="right" type="date" placeholder="结束日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd"></el-date-picker>
                </el-col>
                <el-col :xs="24" :sm="24" :lg="6">
                  <el-button type="primary" size="small" @click="onSubmit(1)">查询</el-button>
                  <el-button type="primary" size="small"  @click="beforeOneDay()" >向前一天</el-button>
                  <el-button type="primary" size="small"  @click="afterOneDay()">向后一天</el-button>
                </el-col>
            </el-form>
        </el-row>

        <el-row  :gutter="32">
            <el-col :span="24">
                <el-table :data="tableData" style="width: 100%" :cell-style="cellStyle" :header-cell-style="rowClass" border v-loading="tableloading">
                    <el-table-column prop="masterID" label="操作员ID"></el-table-column>
                    <el-table-column prop="username" label="操作员">
                      <template slot-scope="scope">{{scope.row.username | null2Zero}}</template>
                    </el-table-column>
                    <el-table-column prop="collectDate" label="操作时间" width="160px"></el-table-column>
                    <el-table-column prop="clientIP" label="操作IP" width="120px"></el-table-column>
                    <el-table-column prop="userID" label="赠送对象用户ID" width="100px"></el-table-column>
                    <el-table-column prop="gameid" label="赠送对象游戏ID" width="100px"></el-table-column>
                    <el-table-column prop="accounts" label="赠送对象账号" width="110px"></el-table-column>
                    <el-table-column prop="nickname" label="赠送对象昵称" width="140px"></el-table-column>
                    <el-table-column prop="curGold" label="赠送前" width="140px">
                      <template slot-scope="scope"><div v-html="op1(scope.row)"></div></template>
                    </el-table-column>
                    <el-table-column prop="addGold" label="赠送" width="140px">
                      <template slot-scope="scope"><div v-html="op2(scope.row)"></div></template>
                    </el-table-column>
                    <el-table-column prop="" label="赠送后" width="140px">
                      <template slot-scope="scope"><div v-html="op3(scope.row)"></div></template>
                    </el-table-column>
                    <el-table-column prop="operation" label="操作类型" width="100px"></el-table-column>
                    <el-table-column prop="reason" label="备注" width="100px"></el-table-column>
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
        name: "userOperalianghao",
        data(){
          return{
            currentPage: 1, //初始页
            pagesize: 30, //    每页的数据
            total: 0,
            currentTotal:0,
            form: {
              masterID:'',
              userID:'',
              gameid:'',
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
                type:'4',
                masterID:this.form.masterID,
                userID:this.form.userID,
                gameid:this.form.gameid,
                beginTime:this.moment(this.form.beginTime).format("YYYY-MM-DD"),
                endTime:this.moment(this.form.endTime).format("YYYY-MM-DD"),
                currentPage:pageNum,
                limit:this.pagesize
              };
              this.tableloading=true;
              this.$api.recordUserOperationInfogaveScore(param).then(res =>{
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
            op1(data){
              if(data.username == '' || data.username == null){
                return this.numTenthousand(data.curGold);
              }else{
                if(data.operation == '赠送奖券'){
                  return data.curGold;
                }else{
                  return data.curGold-data.addGold;
                }
              }
            },
            op2(data){
              if(data.username == '' || data.username == null){
                return "<span style='color:red'>"+ this.numTenthousand(data.addGold) +"</span>";
              }else{
                if(data.operation == '赠送奖券'){
                  return data.addGold;
                }else{
                  return data.addGold;
                }
              }
            },
            op3(data){
              if(data.username == '' || data.username == null){
                return this.numTenthousand(data.curGold+data.addGold);
              }else{
                if(data.operation == '赠送奖券'){
                  return data.curGold+data.addGold;
                }else{
                  return data.curGold;
                }
              }
            },
            //添加万分位分隔符
            numTenthousand(num){
              if(num != null){
              return num.toString().replace(/\d+/, function (n) { // 先提取整数部分
                return n.replace(/(\d)(?=(\d{4})+$)/g, function ($1) { // 对整数部分添加分隔符
                return $1 + ",";
                });
              });
              }else{
                return 0;
              }
            }
        }
    }
</script>

<style scoped>
  .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width:100%;
  }
</style>
