<template>
  <div class="app-container">
    <h3 class="showTit">俱乐部充值明细</h3>
    <el-row :gutter="32">
      <el-form ref="form" :model="form">
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.userid" size="small" placeholder="用户ID" clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.clubNumber" size="small" placeholder="俱乐部编号" clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="4">
          <el-date-picker v-model="form.beginTime" size="small" align="right" clearable type="date" placeholder="开始日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd"></el-date-picker>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="4">
          <el-date-picker v-model="form.endTime" size="small" align="right" clearable type="date" placeholder="结束日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd"></el-date-picker>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="6" v-has="'clubPayOrder_search'">
          <el-button type="primary" size="small" @click="onSubmit(1)">查询</el-button>
          <el-button type="primary" size="small"  @click="beforeOneDay()" >向前一天</el-button>
          <el-button type="primary" size="small"  @click="afterOneDay()">向后一天</el-button>
        </el-col>
      </el-form>
    </el-row>

    <div class="otherdesc">
      俱乐部总人数：{{sumclub | numTenthousand}} &nbsp;&nbsp;
      总充值金额：{{summoney | numTenthousand}} &nbsp;&nbsp;
      总充值人数：{{sumpay | numTenthousand}}
    </div>
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
          <el-table-column prop="pay" label="充值金额" show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.pay | numTenthousand }}</template>
          </el-table-column>
          <el-table-column prop="clubNumber" label="俱乐部编号" show-overflow-tooltip></el-table-column>
          <el-table-column prop="createDate" label="充值时间" show-overflow-tooltip></el-table-column>
          <el-table-column prop="orderId" label="订单号" show-overflow-tooltip></el-table-column>
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
        name: "clubPayOrder",
        data(){
            return{
                currentPage: 1, //初始页
                pagesize: 30, //    每页的数据
                total: 0,
                currentTotal:0,
                form: {
                  userid:'',
                  clubNumber:'',
                  beginTime:this.moment(new Date(new Date().setHours(0, 0, 0, 0))).format("YYYY-MM-DD"),
                  endTime:this.moment(new Date()).format("YYYY-MM-DD")
                },
                tableData: [],
                sumclub:'',  //俱乐部总人数
                summoney:'',  //总充值金额
                sumpay:'',  //总充值人数
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
                uid:this.form.userid,
                clubNumber:this.form.clubNumber,
                beginTime:this.form.beginTime,
                endTime:this.form.endTime,
                currentPage:pageNum,
                limit:this.pagesize
              };
              this.tableloading=true;
              this.$api.clubPayOrdersearch(param).then(res =>{
                if (res.success) {
                    this.tableData = res.data.records;
                    this.tableloading=false;
                    this.sumclub = res.params.sumclub;
                    this.summoney = res.params.summoney;
                    this.sumpay = res.params.sumpay;
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
