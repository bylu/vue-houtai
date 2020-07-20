<template>
  <div class="app-container">
    <h3 class="showTit">进出记录</h3>
    <el-row :gutter="32">
      <el-form ref="form" :model="form">
        <el-col :xs="12" :sm="6" :lg="3">
          <el-input v-model.trim="form.userid" size="small" placeholder="用户ID" clearable></el-input>
        </el-col>
        <el-col :xs="12" :sm="6" :lg="3">
          <el-input v-model.trim="form.gameID" size="small" placeholder="游戏ID" clearable></el-input>
        </el-col>
        <el-col :xs="12" :sm="6" :lg="3">
          <el-input v-model.trim="form.roomid" size="small" placeholder="房间ID" clearable></el-input>
        </el-col>
        <el-col :xs="12" :sm="6" :lg="4">
          <el-date-picker v-model="form.beginTime" clearable size="small"  align="right" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="选择日期">
          </el-date-picker>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="6" v-has="'recordUserInout_search'">
          <el-button type="primary" size="small" @click="onSubmit(1)">查询</el-button>
          <el-button type="primary" size="small"  @click="beforeOneDay()" >向前一天</el-button>
          <el-button type="primary" size="small"  @click="afterOneDay()">向后一天</el-button>
        </el-col>
      </el-form>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" style="width: 100%" border :cell-style="cellStyle"
        :header-cell-style="rowClass" v-loading="tableloading" @sort-change='sortChange' :header-cell-class-name="handleHeaderCellClass">
          <el-table-column prop="userID" label="用户ID" width="90px"></el-table-column>
          <el-table-column prop="gameID" label="游戏ID" width="90px">
            <template slot-scope="scope">
              <span style="color:#1890ff;cursor: pointer;" @click="openNewWin(scope.row.gameID)">{{ scope.row.gameID }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="nickName" label="昵称" width="80px"></el-table-column>
          <el-table-column prop="serverID" label="房间ID" width="50px"></el-table-column>
          <el-table-column prop="serverName" label="房间" width="100px"></el-table-column>
          <el-table-column prop="enterTime" label="进入时间" width="100px" sortable="true"></el-table-column>
          <el-table-column prop="enterScore" label="进入幸运豆" width="110px" sortable="true">
            <template slot-scope="scope"> {{ scope.row.enterScore | numTenthousand }}</template>
          </el-table-column>
          <el-table-column prop="enterInsure" label="进入银行" width="110px" sortable="true">
            <template slot-scope="scope"> {{ scope.row.enterInsure | numTenthousand }}</template>
          </el-table-column>
          <el-table-column prop="leaveTime" label="离开时间" width="100px">
            <template slot-scope="scope"><div v-html="checkLeaveTime(scope.row.leaveTime)"></div></template>
          </el-table-column>
          <el-table-column prop="scoreDifference" label="输赢" width="110px" sortable="true">
            <template slot-scope="scope"><div v-html="commonJs.col( scope.row.leaveTime == null ? 0:scope.row.scoreDifference)"></div></template>
          </el-table-column>
          <el-table-column prop="score" label="离开幸运豆" width="110px" sortable="true">
            <template slot-scope="scope"> {{ scope.row.score | numTenthousand }}</template>
          </el-table-column>
          <el-table-column prop="takeScore" label="银行取款" width="110px" sortable="true">
            <template slot-scope="scope"> {{ (scope.row.leaveTime == null ? 0:scope.row.takeScore) | numTenthousand }}</template>
          </el-table-column>
          <el-table-column prop="leaveInsure" label="离开银行" width="110px" sortable="true">
            <template slot-scope="scope"> {{ scope.row.leaveInsure | numTenthousand }}</template>
          </el-table-column>
          <el-table-column prop="" label="充值" width="70px">
            <template slot-scope="scope"> {{ scope.row.leaveTime == null ? 0:(scope.row.leaveInsure+scope.row.takeScore-scope.row.enterInsure) | numTenthousand }}</template>
          </el-table-column>
          <el-table-column prop="revenue" label="充值2" width="100px" sortable="true">
            <template slot-scope="scope"> {{ scope.row.revenue | numTenthousand }}</template>
          </el-table-column>
          <el-table-column prop="onLineTimeCount" label="在线时长" width="120px" sortable="true">
            <template slot-scope="scope"><div v-html="commonJs.showDuration1(scope.row.onLineTimeCount)"></div></template>
          </el-table-column>
          <el-table-column prop="leaveReason" label="离开原因">
            <template slot-scope="scope"><div v-html="checkLeaveReason(scope.row.leaveReason)"></div></template>
          </el-table-column>
          <el-table-column prop="playTimeCount" label="游戏时长" width="120px" sortable="true">
            <template slot-scope="scope"><div v-html="commonJs.showDuration1(scope.row.playTimeCount)"></div></template>
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
        name: "recordUserInout",
        data(){
          return{
            currentPage: 1, //初始页
            pagesize: 30, //    每页的数据
            total: 0,
            currentTotal:0,
            form: {
              userid: '',
              gameID: '',
              roomid:'',
              beginTime:this.moment(new Date()).format("YYYY-MM-DD")
            },
            tableData: [],
            sort:"desc",
            sortby:"enterTime",
            tableloading:false,
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
              //userID,serverID,beginTime,currentPage,limit
              let param = {
                userID:this.form.userid,
                gameID:this.form.gameID,
                serverID:this.form.roomid,
                beginTime:this.form.beginTime,
                sort:this.sort,
                sortby:this.sortby,
                currentPage:pageNum,
                limit:this.pagesize
              };
              this.tableloading=true;
              this.$api.recordUserInoutsearch(param).then(res =>{
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
            openNewWin(data){
              const {href} = this.$router.resolve({
                path: '/userbaseinfo',
                query: {
                  gameID: data
                }
              })
              window.open(href, '_blank')
            },
            checkLeaveTime(data){
              if(data == null){
                return "<span style='color:green'>"+正在游戏中+"</span>";
              }else{
                return data;
              }
            },
            checkLeaveReason(data){
              var msg = "";
              switch (data){
                  case 0:
                      msg = "<span style='color:green'>常规离开</span>";
                      break;
                  case 1:
                      msg = "<span style='color:red'>系统原因</span>";
                      break;
                  case 2:
                      msg = "<span style='color:pink'>用户冲突</span>";
                      break;
                  case 3:
                      msg = "<span style='color:blue'>网络原因</span>";
                      break;
                  case null:
                      msg = "";
                      break;
                  default:
                      msg = "<span style='color:orange'>人满为患</span>";
                      break;
              }
              return msg;
            }
        }
    }
</script>

<style scoped>
.el-date-editor.el-input, .el-date-editor.el-input__inner{
    width:100%;
}
</style>
