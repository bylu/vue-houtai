<template>
  <div class="app-container">
    <h3 class="showTit">用户基础游戏数据</h3>
    <el-row :gutter="32">
      <el-form ref="from" :model="form">
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.userid"  size="small"  placeholder="用户ID" clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.nickname"  size="small"  placeholder="游戏昵称" clearable></el-input>
        </el-col>

        <el-col :xs="24" :sm="6" :lg="2">
          <el-button type="primary"  size="small" v-has="'userGameDataBase_search'"  @click="onSubmit(1)">查询</el-button>
        </el-col>
      </el-form>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table class="maintable" ref="multipleTable"
        :data="tableData" tooltip-effect="dark" :cell-style="cellStyle" :header-cell-style="rowClass" style="width: 100%" v-loading="tableloading" border  @sort-change='sortChange' :header-cell-class-name="handleHeaderCellClass">
          <el-table-column prop="uid" label="用户ID"  sortable="true" width="90"></el-table-column>
          <el-table-column prop="gameID" label="游戏ID" width="90">
            <template slot-scope="scope">
              <span style="color:#1890ff;cursor: pointer;" @click="openNewWin(scope.row.gameID)">{{ scope.row.gameID }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="nickName" label="昵称" width="120">
            <template slot-scope="scope">{{ scope.row.nickName | isNull }}</template>
          </el-table-column>
          <el-table-column prop="" label="总幸运豆" width="120">
            <template slot-scope="scope">{{ scope.row.score + scope.row.insureScore | numTenthousand }}</template>
          </el-table-column>
          <el-table-column prop="totalUToSyScore" label="总支出" sortable="true" width="120">
            <template slot-scope="scope">{{ scope.row.totalUToSyScore | numTenthousand }}</template>
          </el-table-column>
          <el-table-column prop="jubaoScore" label="聚宝盆" width="120">
            <template slot-scope="scope">{{ scope.row.jubaoScore | numTenthousand }}</template>
          </el-table-column>
          <el-table-column prop="itemsScore" label="弹头" width="120">
            <template slot-scope="scope">{{ scope.row.itemsScore | numTenthousand }}</template>
          </el-table-column>
          <el-table-column prop="totalPayScore" label="充值1" sortable="true" width="120">
            <template slot-scope="scope">{{ scope.row.totalPayScore | numTenthousand }}</template>
          </el-table-column>
          <el-table-column prop="totalRevenue" label="充值2" sortable="true" width="120">
            <template slot-scope="scope">{{ scope.row.totalRevenue | numTenthousand }}</template>
          </el-table-column>
          <el-table-column prop="totalSysScore" label="系统奖励" sortable="true" width="120">
            <template slot-scope="scope">{{ scope.row.totalSysScore | numTenthousand }}</template>
          </el-table-column>
          <el-table-column prop="totalTime" label="总游戏时长" sortable="true" width="120">
            <template slot-scope="scope"><div v-html="commonJs.showDuration1(scope.row.totalTime)"></div></template>
          </el-table-column>
          <el-table-column prop="totalWinScore" label="赢累计" sortable="true" width="120">
            <template slot-scope="scope"><div v-html="commonJs.col(scope.row.totalWinScore)"></div></template>
          </el-table-column>
          <el-table-column prop="totalLoseScore" label="输累计" sortable="true" width="120">
            <template slot-scope="scope"><div v-html="commonJs.col(scope.row.totalLoseScore)"></div></template>
          </el-table-column>
          <el-table-column prop="dayWinScore" label="当日赢累计" width="120">
            <template slot-scope="scope"><div v-html="commonJs.col(scope.row.dayWinScore)"></div></template>
          </el-table-column>
          <el-table-column prop="dayLoseScore" label="当日输累计" width="120">
            <template slot-scope="scope"><div v-html="commonJs.col(scope.row.dayLoseScore)"></div></template>
          </el-table-column>
          <el-table-column prop="dayRevenue" label="当日充值" width="120">
            <template slot-scope="scope"><div v-html="commonJs.col(scope.row.dayRevenue)"></div></template>
          </el-table-column>
          <el-table-column prop="payAmountSum" label="总充值金额" sortable="true" width="120">
            <template slot-scope="scope">{{ scope.row.payAmountSum+'元' | numTenthousand }}</template>
          </el-table-column>
          <el-table-column prop="nullity" label="状态" width="120">
            <template slot-scope="scope"><div v-html="commonJs.accountState(scope.row.nullity)"></div></template>
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
        name: "usergamebasedata",
        data(){
            return{
                currentPage: 1, //初始页
                pagesize: 30, //    每页的数据
                total: 0,
                currentTotal:0,
                form: {
                  userid: '',
                  nickname: ''
                },
                tableData: [],
                tableloading:false,
                curThead:'',
                sort:"",
                sortby:"",
                orderDict:[],
                orderStackSet:[]
            }
        },
        methods:{
            cellStyle(row,column,rowIndex,columnIndex){
              return 'padding:6px 0';
            },
            rowClass({row,rowIndex}){
              return 'padding:6px 0';
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
              if((this.form.userid == "" || this.form.userid ==null || typeof(this.form.userid) == undefined) &&(this.form.nickname == "" || this.form.nickname ==null || typeof(this.form.nickname) == undefined) ) {
                this.$message({
                  message:'请输入信息进行查询',
                  type: "error"
                });
                return ;
              }
              let param = {
                uid:this.form.userid,
                nickName:this.form.nickname,
                currentPage:pageNum,
                limit:this.pagesize,
                sort:this.sort,
                sortby:this.sortby
              };
              this.tableloading=true;
              this.$api.searchUserinfoStatistics(param).then(res =>{
                if (res.success) {
                  this.tableData = res.data.records;
                  this.tableloading=false;
                  this.total = res.data.total; //size
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
  .maintable{
    background: #fff;
    -webkit-box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.2);
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.2);
    border-color: rgba(0, 0, 0, 0.2);
  }
</style>
