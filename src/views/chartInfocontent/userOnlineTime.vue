<template>
  <div class="app-container">
    <h3 class="showTit">用户在线时长</h3>
    <el-row :gutter="32">
      <el-form ref="form" :model="form">
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.userID" size="small" placeholder="用户ID" clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.loveliness" size="small" placeholder="渠道ID" clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.gameid" size="small" placeholder="游戏ID" clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="4">
          <el-date-picker v-model="form.beginTime" clearable size="small" align="right" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="开始日期">
          </el-date-picker>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="8" v-has="'userOnlineTime_search'">
          <el-button type="primary" size="small" @click="onSubmit(1)">查询</el-button>
          <el-button type="primary" size="small"  @click="beforeOneDay()" >向前一天</el-button>
          <el-button type="primary" size="small"  @click="afterOneDay()">向后一天</el-button>
        </el-col>
      </el-form>
    </el-row>
    <div class="otherdesc">
      在线总人数:{{onlinePeople | numTenthousand}} &nbsp;&nbsp;
      平均在线时长:<span v-html="formatSecondTime(onlineOnlineTime)"></span>
    </div>
    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" style="width: 100%" :cell-style="cellStyle" :header-cell-style="rowClass" border v-loading="tableloading" @sort-change='sortChange' :header-cell-class-name="handleHeaderCellClass">
          <el-table-column prop="userID" label="用户ID"></el-table-column>
          <el-table-column prop="gameID" label="游戏ID">
            <template slot-scope="scope">
              <span style="color:#1890ff;cursor: pointer;" @click="openNewWin(scope.row.gameID)">{{ scope.row.gameID }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="nickName" label="昵称"></el-table-column>
          <el-table-column prop="loveLiness" label="渠道ID">
            <template slot-scope="scope">
              {{scope.row.loveLiness | formatSpreaderID}}
            </template>
          </el-table-column>
          <el-table-column prop="secondMillsCount" label="游戏时长" sortable="true">
              <template slot-scope="scope">
                <div  style="color: rgb(24, 144, 255); cursor: pointer;" @click="openNewWinByUserRoomOnlineHours(scope.row)" >
                  <span v-html="formatSecondTime(scope.row.secondMillsCount)"></span>
                </div>
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
    export default {
        name: "userOnlineTime",
        data(){
            return{
                currentPage: 1, //初始页
                pagesize: 30, //    每页的数据
                total: 0,
                currentTotal:0,
                form: {
                    userID:'',
                    gameid: '',
                    loveliness: '',
                    sort:'',
                    beginTime:this.moment(new Date(new Date().setHours(0, 0, 0, 0))).format("YYYY-MM-DD"),
                    endTime:this.moment(new Date()).format("YYYY-MM-DD")
                },
                tableData: [],
                onlinePeople:0,
                onlineOnlineTime:0,
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
              let param = {
                userID:this.form.userID,
                gameid:this.form.gameid,
                loveLiness:this.form.loveliness,
                sort:this.form.sort,
                beginTime:this.form.beginTime,
                currentPage:pageNum,
                limit:this.pagesize,
                sort:this.sort,
                sortby:this.sortby,
              };
              this.tableloading=true;
              this.$api.userOnlineTimeSearch(param).then(res =>{
                this.tableloading=false;
                if (res.success) {
                  this.tableData = res.data.records;
                  this.total = res.data.total;
                  this.pagesize=res.data.size;
                  this.currentPage = res.data.current;
                  this.onlinePeople=res.params.UsersCount,
                  this.onlineOnlineTime=res.params.secondMillsCount,
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
            openNewWinByUserRoomOnlineHours(data){
               const {href} = this.$router.resolve({
                path: '/userRoomOnlineHours',
                query: {
                  gameid: data.gameID,
                  beginTime:this.form.beginTime,
                }
              })
              window.open(href, '_blank')
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
