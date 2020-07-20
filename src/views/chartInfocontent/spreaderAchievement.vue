<template>
  <div  class="app-container">
    <h3 class="showTit">推广员业绩统计</h3>
    <el-row :gutter="32">
      <el-form ref="form" :model="form">
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.promotersid" size="small" placeholder="推广员ID" clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="4">
          <el-date-picker v-model="form.beginTime" size="small" clearable align="right" type="date" placeholder="开始日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd"></el-date-picker>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="4">
          <el-date-picker v-model="form.endTime" size="small" clearable align="right" type="date" placeholder="结束日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd"></el-date-picker>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="8" v-has="'spreaderAchievement_search'">
          <el-button type="primary" size="small" @click="onSubmit(1,1)">每天</el-button>
          <el-button type="primary" size="small" @click="onSubmit(1,2)">周期</el-button>
          <el-button type="primary" size="small"  @click="beforeOneDay()" >向前一天</el-button>
          <el-button type="primary" size="small"  @click="afterOneDay()">向后一天</el-button>
        </el-col>
      </el-form>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" style="width: 100%" :cell-style="cellStyle" :header-cell-style="rowClass" border v-loading="tableloading" @sort-change='sortChange' :header-cell-class-name="handleHeaderCellClass">
          <el-table-column prop="type" label="type" v-if="labeldisplay"></el-table-column>
          <el-table-column prop="spreaderId" label="推广员ID" width="90px">
            <template slot-scope="scope">{{ scope.row.spreaderId | null2empty }}</template>
          </el-table-column>
          <el-table-column prop="spreader" label="推广员账号" width="90px">
            <template slot-scope="scope">{{ scope.row.spreader | null2empty }}</template>
          </el-table-column>
          
          <!-- <el-table-column prop="" label="二次付费人数" ></el-table-column>
          <el-table-column prop="" label="新玩家破产人数"></el-table-column> -->

          <el-table-column prop="registerdate" label="注册时间" width="100px">
            <template slot-scope="scope">{{ scope.row.registerdate | null2empty }}</template>
          </el-table-column>
          <el-table-column prop="insertTime" label="查询日期" width="100px" sortable="true">
            <template slot-scope="scope"><div v-html="date(scope.row)"></div></template>
          </el-table-column>
          <el-table-column prop="payAmount" label="充值金额" width="100px" sortable="true">
            <template slot-scope="scope">
              <span  style="color: rgb(24, 144, 255); cursor: pointer;"  @click="openNewWin1(scope.row.spreaderId)">{{ scope.row.payAmount | numTenthousand }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="newUserPayAmount" label="新用户充值金额"  sortable="true">
            <template slot-scope="scope">{{ scope.row.newUserPayAmount | numTenthousand }}</template>
          </el-table-column>
          <el-table-column prop="paycount" label="充值次数"  sortable="true">
            <template slot-scope="scope">{{ scope.row.paycount | null2Zero }}</template>
          </el-table-column>
          <el-table-column prop="payUserCount" label="充值用户数"  sortable="true">
            <template slot-scope="scope">{{ scope.row.payUserCount | null2Zero }}</template>
          </el-table-column>
          <el-table-column prop="newUserPayUserCount" label="新用户充值用户数"  sortable="true">
            <template slot-scope="scope">{{ scope.row.newUserPayUserCount | null2Zero }}</template>
          </el-table-column>
          <el-table-column prop="spreadUserCount" label="推广设备数"  sortable="true">
            <template slot-scope="scope">
              <span  style="color: rgb(24, 144, 255); cursor: pointer;" @click="openNewWin2(scope.row)">{{ scope.row.spreadUserCount | null2Zero }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="" label="低价值用户">
            <template slot-scope="scope">
              <span  style="color: rgb(24, 144, 255); cursor: pointer;" @click="look(scope.row)">查看</span>
            </template>
          </el-table-column>
          <el-table-column prop="" label="付费ARPU">
            <template slot-scope="scope">
              <div v-html="isNaN(scope.row.payAmount / scope.row.payUserCount)? '0.00' :(scope.row.payAmount / scope.row.payUserCount).toFixed(2)"></div>
            </template>
          </el-table-column>
          <el-table-column prop="" label="累计注册ARPU">
            <template slot-scope="scope">
              <div v-html="isNaN(scope.row.sumPayAmount / scope.row.sumSpreadUserCount)? '0.00' :(scope.row.sumPayAmount / scope.row.sumSpreadUserCount).toFixed(2)"></div>
            </template>
          </el-table-column>
          <el-table-column prop="loginUserCount" label="DAU"  sortable="true"></el-table-column>
          <el-table-column prop="" label="DAU付费率" show-overflow-tooltip="">
            <template slot-scope="scope">
              <div v-html="isNaN(scope.row.payUserCount / scope.row.loginUserCount)? '0.00' :(scope.row.payUserCount / scope.row.loginUserCount).toFixed(4)"></div>
            </template>
          </el-table-column>
          <el-table-column prop="" label="DAUARPU">
            <template slot-scope="scope">
              <div v-html="isNaN(scope.row.payAmount / scope.row.loginUserCount)? '0.00' :(scope.row.payAmount / scope.row.loginUserCount).toFixed(2)"></div>
            </template>
          </el-table-column>
          <el-table-column prop="" label="留存率">
            <template slot-scope="scope">
              <el-button type='text' @click="openNewWin3(scope.row)">留存率</el-button>
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

    <!--查看-->
    <pcModal v-if="showLookInfo" width="40%" :title="'查看'" @closeModal="showLookInfo = false">
        <lookInfocontent :getdata="formdata" @closedialog="showLookInfo= false"></lookInfocontent>
    </pcModal>

  </div>
</template>

<script>
    export default {
        name: "spreaderAchievement",
        components:{
          lookInfocontent:() => import('./lookInfocontent.vue'),
        },
        data(){
            return{
                labeldisplay:false,
                currentPage: 1, //初始页
                pagesize: 30, //    每页的数据
                total: 0,
                currentTotal:0,
                formdata:'',
                form: {
                  promotersid: '',
                  beginTime:this.moment(new Date()).subtract(1, 'days').format("YYYY-MM-DD"),
                  endTime:this.moment(new Date()).subtract(1, 'days').format("YYYY-MM-DD")
                },
                tableData: [],
                showLookInfo:false,
                tableloading:false,
                sort:"",
                sortby:"",
                orderDict:[],
                orderStackSet:[]
            }
        },
        mounted(){
          //this.onSubmit(1,1);
          this.getParams(1,1);
        },
        methods:{
            cellStyle(row,column,rowIndex,columnIndex){
              return 'text-align:center;padding:6px 0';
            },
            rowClass({row,rowIndex}){
              return 'text-align:center;padding:6px 0';
            },
            getParams() {
              // 取到路由带过来的参数
              this.form.promotersid = this.$route.query.spread;
            },
            handleHeaderCellClass({row,column,rowIndex,columnIndex}){
              if(this.orderStackSet.length > 0){
                let arr =this.orderStackSet;
                let currentField =arr[arr.length - 1];
                if(currentField){
                  return this.orderDict[column.property];
                }
              }
              return "";
            },
            sortChange({column,prop,order}){
              this.orderStackSet=this.orderStackSet.filter(item => item != prop);
              if(order != null){
                this.orderDict[prop]=order;
                this.orderStackSet.push(prop);
              }else if(order == null){
                this.orderDict[prop]="";
                this.orderStackSet.push(prop);
              }else{
                delete this.orderDict[prop];
              }
               if(this.orderStackSet.length > 1){
                  let del=this.orderStackSet.splice(0,1);
                  let leftE=del[0];
                  delete this.orderDict[leftE]
              }
             if(this.orderDict[prop] == "descending"){
                  this.sort="desc"
              }else if(this.orderDict[prop] == "ascending"){
                  this.sort="asc"
              }else{
                  this.sort=""
              }
               this.sortby= (this.orderStackSet).toString();
              this.onSubmit(1,this.typeid);
            },
            onSubmit(pageNum,typeid){
              this.typeid = typeid;
              //spreaderId, beginTime, endTime, type(1每天，2每周), currentPage, limit, sort
              let param = {
                spreaderId:this.form.promotersid,
                beginTime:this.form.beginTime,
                endTime:this.form.endTime,
                type:this.typeid,
                currentPage:pageNum,
                limit:this.pagesize,
                sort:this.sort,
                sortby:this.sortby
              };
              this.tableloading=true;
              this.$api.spreaderAchievementsearch(param).then(res =>{
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
              this.onSubmit(currentPage,this.typeid);
            },
            beforeOneDay(){
              if((this.form.beginTime == "" || this.form.beginTime == null) && (this.form.endTime == "" || this.form.endTime == null)){
                this.form.beginTime=this.moment(new Date()).format("YYYY-MM-DD");
                this.form.endTime=this.moment(new Date()).format("YYYY-MM-DD");
              }else{
                this.form.beginTime=this.moment(this.form.beginTime).subtract(1, 'days').format("YYYY-MM-DD");
                this.form.endTime=this.moment(this.form.endTime).subtract(1, 'days').format("YYYY-MM-DD");
              }
             
              this.onSubmit(1,this.typeid);
            },
            afterOneDay(){
              if((this.form.beginTime == "" || this.form.beginTime == null) && (this.form.endTime == "" || this.form.endTime == null)){
                this.form.beginTime=this.moment(new Date()).format("YYYY-MM-DD");
                this.form.endTime=this.moment(new Date()).format("YYYY-MM-DD");
              }else{
                this.form.beginTime=this.moment(this.form.beginTime).add(1, 'days').format("YYYY-MM-DD");
                this.form.endTime=this.moment(this.form.endTime).add(1, 'days').format("YYYY-MM-DD");
              }
              this.onSubmit(1,this.typeid);
            },
            date(data){
              if(data.type == 2){   //周期
                return  this.form.beginTime + ' -- ' + this.form.endTime;
              }else{  //每天
                return this.null2empty(data.insertTime);
              }
            },
            null2empty(obj) {
                if (obj == null || obj == '') {
                    return "无";
                } else {
                    return obj;
                }
            },
            openNewWin1(data){
              const {href} = this.$router.resolve({
                path: '/shareDetailInfo',
                query: {
                  spearderiD: data
                }
              })
              window.open(href, '_blank')
            },
            openNewWin2(data){
              let param;
              if(data.type == 2){  //周期
                 param = {
                  type:data.type,
                  spreaderId:data.spreaderId,
                  inserttime:this.form.beginTime,
                  endDate:this.form.endTime,
                };
              }else{   //每天
                 param = {
                  type:data.type,
                  spreaderId:data.spreaderId,
                  inserttime:this.moment(data.insertTime).format("YYYY-MM-DD"),
                };
              }
              const {href} = this.$router.resolve({
                path: '/registerUser',
                query: param
              })
              window.open(href, '_blank')
            },
            look(data){
              //spreaderID, beginTime，endTime
              let param;
              if(data.type == 2){  //周期
                 param = {
                  type:data.type,
                  spreaderID:data.spreaderId,
                  beginTime:this.form.beginTime,
                  endTime:this.form.endTime,
                };
              }else{   //每天
                 param = {
                  type:data.type,
                  spreaderID:data.spreaderId,
                  beginTime:this.moment(data.insertTime).format("YYYY-MM-DD"),
                };
              }
              this.formdata=param
              this.showLookInfo=true;
            },
            openNewWin3(data){
              let param;
              if(data.type == 2){  //周期
                 param = {
                  type:data.type,
                  spreaderId:data.spreaderId,
                  beginDate:this.form.beginTime,
                  endDate:this.form.endTime
                };
              }else{   //每天
                 param = {
                  type:data.type,
                  spreaderId:data.spreaderId,
                  beginDate:this.moment(data.insertTime).format("YYYY-MM-DD")
                };
              }
              const {href} = this.$router.resolve({
                path: '/userrate',
                query: param
              })
              window.open(href, '_blank')
            },
        }
    }
</script>

<style scoped>
.el-date-editor.el-input, .el-date-editor.el-input__inner{
    width:100%;
}
</style>
