<template>
  <div class="app-container">
    <h3 class="showTit">用户输赢统计</h3>
    <el-row :gutter="32">
      <el-form ref="form" :model="form">
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.userID" size="small" placeholder="用户ID" clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.gameid" size="small" placeholder="游戏ID" clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.nickName" size="small" placeholder="昵称" clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="4">
          <el-date-picker v-model="form.beginTime" size="small" clearable align="right" type="date"  placeholder="开始日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd" ></el-date-picker>
        </el-col>
       <el-col :xs="24" :sm="24" :lg="6" v-has="'userLossWin_search'">
          <el-button type="primary" size="small" @click="onSubmit(1)">查询</el-button>
          <el-button type="primary" size="small"  @click="beforeOneDay()" >向前一天</el-button>
          <el-button type="primary" size="small"  @click="afterOneDay()">向后一天</el-button>
        </el-col>
      </el-form>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" style="width: 100%" :cell-style="cellStyle" :header-cell-style="rowClass" border v-loading="tableloading"  @sort-change='sortChange' :header-cell-class-name="handleHeaderCellClass">
          <el-table-column prop="userID" label="用户ID"></el-table-column>
          <el-table-column prop="kindName" label="游戏名称"></el-table-column>
          <el-table-column prop="serverName" label="房间名称" sortable="true"></el-table-column>
          <el-table-column prop="gameID" label="游戏ID">
            <template slot-scope="scope">
              <span style="color:#1890ff;cursor: pointer;" @click="openNewWin(scope.row.gameID)">{{ scope.row.gameID }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="nickName" label="用户昵称"></el-table-column>
          <el-table-column prop="lose" label="输局" sortable="true"></el-table-column>
          <el-table-column prop="win" label="赢局" sortable="true"></el-table-column>
          <el-table-column prop="draw" label="平局" sortable="true"></el-table-column>
          <el-table-column prop="revenue" label="税收" sortable="true">
            <template slot-scope="scope"><div v-html="commonJs.col(scope.row.revenue)"></div></template>
          </el-table-column>
          <el-table-column prop="changeScore" label="幸运豆变化" sortable="true">
            <template slot-scope="scope"><div v-html="commonJs.col(scope.row.changeScore)"></div></template>
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
    export default {
        name: "userLossWin",
        data(){
            return{
                currentPage: 1, //初始页
                pagesize: 30, //    每页的数据
                total: 0,
                currentTotal:0,
                form: {
                  userID:"",
                  serverID:'',
                  gameid: '',
                  nickName: '',
                  beginTime:this.moment(new Date()).format("YYYY-MM-DD")
                },
                tableData: [],
                tableloading:false,
                sort:"",
                sortby:"",
                orderDict:[],
                orderStackSet:[]
            }
        },
        created(){
          this.getParams();
        },
        methods:{
            getParams() {
              // 取到路由带过来的参数
              this.form.serverID = this.$route.query.serverID;
              if(this.$route.query.beginTime == "" || this.$route.query.beginTime == null){
                this.form.beginTime=this.moment(new Date()).format("YYYY-MM-DD");
              }else{
               this.form.beginTime = this.$route.query.beginTime;
              }
              this.onSubmit(1);
            },
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
              //serverID, gameID, nickName, beginTime, currentPage, limit, sort
              let param = {
                userID:this.form.userID,
                serverID:this.form.serverID,
                gameID:this.form.gameid,
                nickName:this.form.nickName,
                beginTime:this.form.beginTime,
                currentPage:pageNum,
                limit:this.pagesize,
                sort:this.sort,
                sortby:this.sortby
              };
              this.tableloading=true;
              this.$api.userLossWinsearchUserLossWin(param).then(res =>{
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
              if((this.form.beginTime == "" || this.form.beginTime == null) ){
                this.form.beginTime=this.moment(new Date()).format("YYYY-MM-DD");
              }else{
                this.form.beginTime=this.moment(this.form.beginTime).subtract(1, 'days').format("YYYY-MM-DD");
              }
              this.onSubmit(1);
            },
            afterOneDay(){
              if((this.form.beginTime == "" || this.form.beginTime == null)){
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
            },
        }
    }
</script>

<style scoped>
.el-date-editor.el-input, .el-date-editor.el-input__inner{
    width:100%;
}
</style>
