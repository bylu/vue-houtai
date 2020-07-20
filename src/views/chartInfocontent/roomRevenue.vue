<template>
  <div class="app-container">
    <h3 class="showTit">房间收益统计</h3>
    <el-row :gutter="32">
      <el-form ref="form" :model="form">
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.roomid" size="small" placeholder="房间ID" clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="3">
          <el-select v-model="form.roomName" placeholder="房间名称" size="small">
            <el-option v-for="(list,index) in roomNameTypelist" :key="index" :label="list.serverName" :value="list.serverName"></el-option>
          </el-select>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="4">
          <el-date-picker v-model="form.beginTime" clearable size="small" align="right" type="date"  placeholder="开始日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd"></el-date-picker>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="6" v-has="'roomRevenue_search'">
          <el-button type="primary" size="small" @click="onSubmit(1)">查询</el-button>
          <el-button type="primary" size="small"  @click="beforeOneDay()" >向前一天</el-button>
          <el-button type="primary" size="small"  @click="afterOneDay()">向后一天</el-button>
        </el-col>
      </el-form>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" style="width: 100%" :cell-style="cellStyle" :header-cell-style="rowClass" border v-loading="tableloading" @sort-change='sortChange' :header-cell-class-name="handleHeaderCellClass">
          <el-table-column prop="serverID" label="房间ID"></el-table-column>
          <el-table-column prop="serverName" label="房间名称"></el-table-column>
          <el-table-column prop="roomScore" label="房间收益" sortable="true">
            <template slot-scope="scope"><div v-html="commonJs.col(scope.row.roomScore)"></div></template>
          </el-table-column>
          <el-table-column prop="roomRevenue" label="税收" sortable="true">
            <template slot-scope="scope"><div v-html="commonJs.col(scope.row.roomRevenue)"></div></template>
          </el-table-column>
          <el-table-column prop="sumScore" label="累计(收益+税收)" sortable="true">
            <template slot-scope="scope"><div v-html="commonJs.col(scope.row.roomScore + scope.row.roomRevenue)"></div></template>
          </el-table-column>
          <el-table-column prop="onlineNums" label="在线人数" sortable="true">
            <template slot-scope="scope"> {{scope.row.onlineNums | numTenthousand }}</template>
          </el-table-column>
          <el-table-column prop="timeCountSum" label="在线时长" sortable="true">
            <template slot-scope="scope"><div v-html="commonJs.showDuration1(scope.row.timeCountSum)"></div></template>
          </el-table-column>
          <el-table-column prop="onlineNums" label="人均时长">
            <template slot-scope="scope"><div v-html="commonJs.showDuration1(scope.row.onlineNums > 0 ? commonJs.division(scope.row.timeCountSum, scope.row.onlineNums, 0):0)"></div></template>
          </el-table-column>
          <el-table-column prop="" label="人均收益">
            <template slot-scope="scope"><div v-html="commonJs.col(scope.row.onlineNums > 0 ? commonJs.division(scope.row.roomScore, scope.row.onlineNums, 2):0)"></div></template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" style="margin-bottom:0px;" size="mini" v-has="'roomRevenue_detail'" @click="detailedJump(scope.row.serverID)" plain>明细</el-button>
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
        name: "roomRevenue",
        data(){
            return{
                currentPage: 1, //初始页
                pagesize: 30, //    每页的数据
                total: 0,
                currentTotal:0,
                form: {
                    roomid: '',
                    roomName: '全部',
                    beginTime:this.moment(new Date()).format("YYYY-MM-DD"),
                },
                roomNameTypelist: [],
                tableData: [],
                tableloading:false,
                sort:"",
                sortby:"",
                orderDict:[],
                orderStackSet:[]
            }
        },
        mounted() {
          this.roomRevenuesearchName();
        },
        methods:{
            cellStyle(row,column,rowIndex,columnIndex){
              return 'text-align:center;padding:6px 0';
            },
            rowClass({row,rowIndex}){
              return 'text-align:center;padding:6px 0';
            },
            roomRevenuesearchName() {
              //beginTime
              let param = {
                beginTime:this.moment(new Date()).format("YYYY-MM-DD"),
              };
              //加载房间名称
              this.$api.roomRevenuesearchName(param).then(res =>{
                  this.roomNameTypelist=[];
                  if (res.success) {
                    this.roomNameTypelist = res.data;
                    this.$store.commit('setObject', JSON.stringify(res.data));//保存值
                  }
              }).catch(err =>{
                this.$message({
                  message: '请求失败!',
                  type: "error"
                });
              })
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
              //serverID, serverName, beginTime, currentPage, limit, sort
              let param = {
                serverID:this.form.roomid,
                serverName:this.form.roomName,
                beginTime:this.form.beginTime,
                currentPage:pageNum,
                limit:this.pagesize,
                sort:this.sort,
                sortby:this.sortby
              };
              this.tableloading=true;
              this.$api.roomRevenuesearch(param).then(res =>{
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
            //serverID,beginTime, currentPage, limit, sort
            detailedJump(data){
              const {href} = this.$router.resolve({
                path: '/userLossWin',
                query: {
                  serverID: data,
                  beginTime:this.form.beginTime,
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
