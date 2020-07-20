<template>
  <div class="app-container">
    <h3 class="showTit">现金红包日志</h3>
    <el-row :gutter="32">
      <el-form ref="form" :model="form">
        <el-col :xs="12" :sm="6" :lg="3">
          <el-input v-model.trim="form.userid" size="small" placeholder="用户ID" clearable></el-input>
        </el-col>
        <el-col :xs="12" :sm="6" :lg="4">
          <el-date-picker v-model="form.beginTime" clearable size="small" align="right" type="date" placeholder="开始日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd"></el-date-picker>
        </el-col>
        <el-col :xs="12" :sm="6" :lg="4">
          <el-date-picker v-model="form.endTime" clearable size="small" align="right" type="date" placeholder="结束日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd"></el-date-picker>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="6" v-has="'dataOfCashRedEnvelope_search'">
          <el-button type="primary" size="small" @click="onSubmit(1)">查询</el-button>
          <el-button type="primary" size="small"  @click="beforeOneDay()" >向前一天</el-button>
          <el-button type="primary" size="small"  @click="afterOneDay()">向后一天</el-button>
        </el-col>
      </el-form>
    </el-row>

    <div class="otherdesc">
      发放总金额：{{totalMoney | numTenthousand}} &nbsp;&nbsp;
      发放总次数：{{totalCount | numTenthousand}} &nbsp;&nbsp;
      发放总人数：{{countNum | numTenthousand}} &nbsp;&nbsp;
      邀请成功人数：{{numberOfSuccessfulApplicants | numTenthousand}}
    </div>

    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" style="width: 100%" :cell-style="cellStyle" :header-cell-style="rowClass" border v-loading="tableloading">
          <el-table-column prop="userid" label="用户id"></el-table-column>
          <el-table-column prop="nickname" label="用户昵称">
            <template slot-scope="scope"> {{scope.row.nickname | null2Zero }}</template>
          </el-table-column>
          <el-table-column prop="numberOfApplicants" label="邀请人数">
            <template slot-scope="scope">
              <el-button type='text' @click="openNewWin(scope.row.userid)">{{ scope.row.numberOfApplicants }}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="" label="红包总金额">
            <template slot-scope="scope"><div v-html="showUserTotalMoney(scope.row.userGet66Money, scope.row.userGet88Money)"></div></template>
          </el-table-column>
          <el-table-column prop="userGet66Money" label="66红包金额">
            <template slot-scope="scope"> {{scope.row.userGet66Money | null2Zero }}</template>
          </el-table-column>
          <el-table-column prop="userGet66Time" label="发放时间" width="160px">
            <template slot-scope="scope" >
              <div v-if="show66Time(scope.row.userGet66Money,scope.row.userGet66Time) == '未发放66红包'">
                <el-button type='text' @click="_replacement(scope.row.id66)">补发</el-button>
              </div>
              <div v-else><div v-html="show66Time(scope.row.userGet66Money,scope.row.userGet66Time)"></div></div>
            </template>
          </el-table-column>
          <el-table-column prop="userGet88Money" label="88红包金额">
            <template slot-scope="scope"> {{scope.row.userGet88Money | null2Zero }}</template>
          </el-table-column>
          <el-table-column prop="userGet88Time" label="发放时间" width="160px">
            <template slot-scope="scope" >
              <div v-if="show88Time(scope.row.userGet88Money,scope.row.userGet88Time) == '未发放88红包'">
                <el-button type='text' @click="_replacement(scope.row.id88)">补发</el-button>
              </div>
              <div v-else><div v-html="show88Time(scope.row.userGet88Money,scope.row.userGet88Time)"></div></div>
            </template>
          </el-table-column>
          <el-table-column prop="expireTime" label="失效时间" width="160px">
            <template slot-scope="scope"><div v-html="showTime(scope.row.expireTime)"></div></template>
          </el-table-column>
          <!-- <el-table-column prop="" label="操作"></el-table-column> -->
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
        name: "dataOfCashRedEnvelope",
        data(){
          return{
            currentPage: 1, //初始页
            pagesize: 30, //    每页的数据
            total: 0,
            currentTotal:0,
            form: {
              userid: '',
              beginTime:this.moment(new Date(new Date().setHours(0, 0, 0, 0))).format("YYYY-MM-DD"),
              endTime:this.moment(new Date()).format("YYYY-MM-DD")
            },
            tableData: [],
            totalMoney:'',  //发放总金额
            totalCount:'',  //发放总次数
            countNum:'',  //发放总人数
            numberOfSuccessfulApplicants:'',  //邀请成功人数
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
              //userid,begintime,endTime,currentPage,limit
              let param = {
                userid:this.form.userid,
                beginTime:this.form.beginTime,
                endTime:this.form.endTime,
                currentPage:pageNum,
                limit:this.pagesize
              };
              this.tableloading=true;
              this.$api.dataOfCashRedEnvelopesearch(param).then(res =>{
                this.tableloading=false;
                if (res.success) {
                  this.tableData = res.data.records;
                  this.totalMoney = res.params.totalMoney;
                  this.totalCount = res.params.totalCount;
                  this.countNum = res.params.countNum;
                  this.numberOfSuccessfulApplicants = res.params.numberOfSuccessfulApplicants;
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
            openNewWin(userid){
              const {href} = this.$router.resolve({
                path: '/inviteRedPackUser',
                query: {
                  userid: userid,
                  beginDate: this.form.beginTime,
                  endDate: this.form.endTime
                }
              })
              window.open(href, '_blank')
            },
            showUserTotalMoney(obj1,obj2){
              if (obj1==null){
                return this.null2Zero(obj2);
              }else if(obj2==null){
                return this.null2Zero(obj1);
              }else{
                return this.null2Zero(obj1+obj2).toFixed(2);
              }
            },
            null2Zero(obj) {
                if (obj == null || obj == '') {
                    return "0";
                } else {
                    return obj;
                }
            },
            _replacement(id){
              //id
              let param = {
                id:id
              };
              this.$api.dataOfCashRedEnvelopebufa(param).then(res =>{
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
            },
            show66Time(obj1,obj2){
              //红包
              if (obj1==null){
                  return "无";
              }else{
                  if (null==obj2){
                      return "未发放66红包";
                  }else{
                      return obj2;
                  }
              }
            },
            show88Time(obj1,obj2){
              if (obj1==null){
                  return "无";
              }else{
                  if (null==obj2){
                      return "未发放88红包";
                  }else{
                      return obj2;
                  }
              }
            },
            showTime(obj){
              //展示剩余时间
              if (null==obj){
                  return obj;
              }else{
                  var  d=new Date();
                  var ex=new Date(obj);
                  return ex-d<=0? "已结束":this.showDuration(ex);
              }
            },
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
