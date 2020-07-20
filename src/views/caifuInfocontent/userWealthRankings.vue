<template>
  <div class="app-container">
    <h3 class="showTit">用户财富排行榜</h3>
    <el-row :gutter="32">
      <el-form ref="form" :model="form">
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.userID" size="small" placeholder="用户ID" clearable></el-input>
        </el-col>
        <el-col :xs="12" :sm="6" :lg="3">
          <el-input v-model.trim="form.gameid" size="small" placeholder="游戏ID" clearable></el-input>
        </el-col>
        <el-col :xs="12" :sm="6" :lg="3">
          <el-input v-model.trim="form.nickname" size="small" placeholder="昵称" clearable></el-input>
        </el-col>
        <el-col :xs="12" :sm="6" :lg="4">
          <el-date-picker v-model="form.beginTime" clearable  size="small" align="right" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="开始日期">
          </el-date-picker>
        </el-col>
        <el-col :xs="12" :sm="6" :lg="4">
          <el-date-picker v-model="form.endTime" size="small" align="right" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="结束日期">
          </el-date-picker>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="6" v-has="'userWealthRankings_search'">
          <el-button type="primary" size="small" @click="onSubmit(1)">查询</el-button>
          <el-button type="primary" size="small"  @click="beforeOneDay()" >向前一天</el-button>
          <el-button type="primary" size="small"  @click="afterOneDay()">向后一天</el-button>
        </el-col>
      </el-form>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" style="width: 100%" :cell-style="cellStyle" :header-cell-style="rowClass" border v-loading="tableloading" @sort-change='sortChange' :header-cell-class-name="handleHeaderCellClass">
          <el-table-column prop="userID" label="游戏ID" width="90px">
            <template slot-scope="scope">
              <span style="color:#1890ff;cursor: pointer;" @click="openNewWin(scope.row.userID)">{{ scope.row.userID }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="nickName" label="用户昵称" width="140px"></el-table-column>
          <el-table-column prop="score" label="幸运豆" width="120px" sortable="true">
            <template slot-scope="scope">{{ scope.row.score | numTenthousand }}</template>
          </el-table-column>
          <el-table-column prop="insureScore" label="银行幸运豆" width="120px" sortable="true">
            <template slot-scope="scope">{{ scope.row.insureScore | numTenthousand }}</template>
          </el-table-column>
          <el-table-column prop="sumscore" label="总幸运豆" width="120px" sortable="true">
            <template slot-scope="scope">{{ scope.row.sumscore | numTenthousand }}</template>
          </el-table-column>
          <el-table-column prop="memberOrder" label="会员"></el-table-column>
          <el-table-column prop="experience" label="等级" sortable="true"></el-table-column>
          <el-table-column prop="item1" label="青铜弹头" sortable="true"></el-table-column>
          <el-table-column prop="item2" label="白银弹头" sortable="true"></el-table-column>
          <el-table-column prop="item3" label="黄金弹头" sortable="true"></el-table-column>
          <el-table-column prop="item4" label="白金弹头" sortable="true"></el-table-column>
          <el-table-column prop="item5" label="核弹头" sortable="true"></el-table-column>
          <el-table-column prop="payamount" label="充值金额" width="120px" sortable="true">
            <template slot-scope="scope">{{ scope.row.payamount | numTenthousand }}</template>
          </el-table-column>
          <el-table-column prop="wincount" label="赢局" sortable="true">
            <template slot-scope="scope">{{ scope.row.wincount | null2Zero }}</template>
          </el-table-column>
          <el-table-column prop="lostcount" label="输局" sortable="true">
            <template slot-scope="scope">{{ scope.row.lostcount | null2Zero }}</template>
          </el-table-column>
          <el-table-column prop="gameLogonTimes" label="登录次数" width="120px" sortable="true"></el-table-column>
          <el-table-column prop="paytimescount" label="游戏时长" sortable="true"></el-table-column>
          <el-table-column prop="registerDate" label="注册时间" width="160px"></el-table-column>
          <el-table-column prop="lastLogonDate" label="最后登录时间" width="160px"></el-table-column>
          <el-table-column prop="lastLogonIP" label="登录IP" width="120px"></el-table-column>
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
        name: "userWealthRankings",
        data(){
          return{
            currentPage: 1, //初始页
            pagesize: 30, //    每页的数据
            total: 0,
            currentTotal:0,
            form: {
              userID:'',
              gameid: '',
              nickname: '',
              beginTime:this.moment(new Date(new Date().setHours(0, 0, 0, 0))).format("YYYY-MM-DD"),
              endTime:this.moment(new Date()).format("YYYY-MM-DD")
            },
            tableData: [],
            tableloading:false,
            sort:"",
            sortby:"",
            orderDict:[],
            orderStackSet:[]
          }
        },
        methods:{
            cellStyle(row,column,rowIndex,columnIndex){
              return 'text-align:center;padding:6px 0';
            },
            rowClass({row,rowIndex}){
              return 'text-align:center;padding:6px 0';
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
              this.onSubmit(1);
            },
            onSubmit(pageNum){
              //gameid，nickname，beginTime,endTime,currentPage,limit,sort
              let param = {
                userID:this.form.userID,
                gameID:this.form.gameid,
                nickName:this.form.nickname,
                beginTime:this.form.beginTime,
                endTime:this.form.endTime,
                currentPage:pageNum,
                limit:this.pagesize,
                sort:this.sort,
                sortby:this.sortby
              };
              this.tableloading=true;
              this.$api.userWealthRankings(param).then(res =>{
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
