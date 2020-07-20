<template>
    <div class="app-container">
        <h3 class="showTit">订单管理</h3>
        <el-row :gutter="32">
          <el-form  :model="form">
              <el-col :xs="24" :sm="6" :lg="3">
                  <el-input v-model.trim="form.userID" size="small" placeholder="用户ID" clearable></el-input>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="3">
                  <el-input v-model.trim="form.gameID" size="small" placeholder="游戏ID" clearable></el-input>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="4">
                  <el-input v-model.trim="form.spearderId" size="small" placeholder="渠道ID" clearable></el-input>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="4">
                  <el-input v-model.trim="form.orderID" size="small" placeholder="订单号" clearable></el-input>
              </el-col>
              <el-col :sx="12" :sm="6" :lg="3">
                  <el-select v-model="form.orderStatus" placeholder="全部" size="small">
                  <el-option
                      v-for="(list,index) in selectList.payinfoList"
                      :key="index"
                      :label="list.value"
                      :value="list.key"
                  ></el-option>
                  </el-select>
              </el-col>
              <el-col :sx="12" :sm="6" :lg="4">
                  <el-select v-model="form.spreaderRateInfo" placeholder="全部" size="small">
                      <el-option
                          v-for="(list,index) in spreaderRateInfoData"
                          :key="index"
                          :label="list.accounts"
                          :value="list.userID"
                      ></el-option>
                  </el-select>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="4">
                  <el-date-picker v-model="form.beginTime" align="right" size="small" type="date" value-format="yyyy-MM-dd"  format="yyyy-MM-dd"
                      placeholder="请输入执行时间" clearable
                  ></el-date-picker>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="4">
                  <el-date-picker v-model="form.endTime" align="right" size="small" type="date" value-format="yyyy-MM-dd"  format="yyyy-MM-dd"
                      placeholder="请输入执行时间" clearable
                  ></el-date-picker>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="10" v-has="'onlineOrder_search'">
                  <el-button type="primary" size="small" @click="onSubmit(1)">查询</el-button>
                  <el-button type="primary" size="small"  @click="beforeOneDay()" >向前一天</el-button>
                  <el-button type="primary" size="small"  @click="afterOneDay()">向后一天</el-button>
              </el-col>
          </el-form>
        </el-row>
        <div class="otherdesc">
          总订单数量: {{totalOrder | numTenthousand}} &nbsp;&nbsp;
          成功订单数量: {{succ | numTenthousand}} &nbsp;&nbsp;
          失败订单数量：{{fail | numTenthousand}}
        </div>
        <el-row>
          <el-col :span="24">
              <el-table class="maintable" ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%;margin-top:10px;"
              v-loading="tableloading" border @sort-change='sortChange' :header-cell-class-name="handleHeaderCellClass" :cell-style="cellStyle" :header-cell-style="rowClass">
                  <el-table-column prop="userID" label="用户ID" width="90px"></el-table-column>
                  <el-table-column prop="applyDate" label="订单日期" width="100px" sortable="true"></el-table-column>
                  <el-table-column prop="orderID" label="订单号码" width="220px"></el-table-column>
                  <el-table-column prop="spearderId" label="渠道ID" width="100px"></el-table-column>
                  <el-table-column prop="channelorderid" label="渠道订单号码" width="220px">
                      <template slot-scope="scope">{{ scope.row.channelorderid | null2empty }}</template>
                  </el-table-column>
                  <el-table-column prop="gameID" label="游戏ID" width="90px">
                    <template slot-scope="scope">
                      <span style="color:#1890ff;cursor: pointer;" @click="openNewWin(scope.row.gameID)">{{ scope.row.gameID }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="extParams" label="订单类型" width="70">
                      <template slot-scope="scope">{{ scope.row.extParams | showExtparams }}</template>
                  </el-table-column>
                  <el-table-column prop="orderAmount" label="订单金额" width="60px" sortable="true">
                      <template slot-scope="scope">{{ scope.row.orderAmount | numTenthousand }}</template>
                  </el-table-column>
                  <el-table-column prop="cardGold" label="赠送金币" width="60px" sortable="true">
                      <template slot-scope="scope">{{ scope.row.cardGold | numTenthousand }}</template>
                  </el-table-column>
                  <el-table-column prop="payAmount" label="实付金额" width="60px" sortable="true">
                      <template slot-scope="scope">{{ scope.row.payAmount | numTenthousand }}</template>
                  </el-table-column>
                  <el-table-column prop="ipaddress" label="充值IP" width="120px"></el-table-column>
                  <el-table-column prop="orderStatus" label="订单状态" width="80px">
                    <template slot-scope="scope">{{ scope.row.orderStatus | checkorderStatus }}</template>
                  </el-table-column>
                  <el-table-column prop="extParams" label="物品" ></el-table-column>
                  <el-table-column prop="" label="操作" width="90px" >
                    <template slot-scope="scope" >
                      <div v-show="scope.row.orderStatus == 0">
                          <el-button v-has="'onlineOrder_repair'"   type="success" size="mini" @click="selectData=scope.row,addOrderDialog = true">补单</el-button>
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
        <pcModal v-if="addOrderDialog" :xs="8" :sm="8" :lg="2" title="补单" @closeModal="addOrderDialog = false">
            <addOrderDialogModule :getdata="selectData" @shuaxin="onSubmit(1)"  @closedialog="addOrderDialog = false"></addOrderDialogModule>
        </pcModal>
    </div>
</template>
<script>
    export default {
        name:'onlineOrder',
        components:{
            addOrderDialogModule:() => import('./addOrderModule.vue'),
        },
        data(){
            return {
                currentPage: 1, //初始页
                pagesize: 30, //每页的数据
                total: 0,
                currentTotal:0,
                form:{
                    userID:"",
                    gameID:'',
                    spearderId:'',
                    orderID:'',
                    beginTime:this.moment(new Date(new Date().setHours(0, 0, 0, 0))).format("YYYY-MM-DD"),
                    endTime:this.moment(new Date()).format("YYYY-MM-DD"),
                    orderStatus:"-1",
                    spreaderRateInfo:parseInt('-1')
                },
                tableData:[],
                selectData:[],
                spreaderRateInfoData:[],
                addOrderDialog:false,
                totalOrder: "0",
                succ: "0",
                fail: "0",
                tableloading:false,
                sort:"desc",
                sortby:"applyDate",
                orderDict:[],
                orderStackSet:[]
            }
        },
        mounted(){
          this.searchSpreaderRateInfoData()
        },
        methods:{
          cellStyle(row,column,rowIndex,columnIndex){
            return 'padding:6px 0';
          },
          rowClass({row,rowIndex}){
            return 'padding:6px 0';
          },
          searchSpreaderRateInfoData() {
            //加载渠道下拉框列表
            this.$api.onlineOrderfindAllSpread().then(res =>{
              if (res.success) {
                this.spreaderRateInfoData = res.data;
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
              let params = {
                  userID:this.form.userID,
                  gameID:this.form.gameID,
                  spearderId:this.form.spearderId,
                  orderID:this.form.orderID,
                  beginTime: this.form.beginTime,
                  endTime:this.form.endTime,
                  orderStatus:this.form.orderStatus,
                  spreaderRateInfo:this.form.spreaderRateInfo,
                  currentPage: pageNum,
                  limit: this.pagesize,
                  sort:this.sort,
                  sortby:this.sortby,
              };
              this.tableloading=true;
              this.$api.onlineOrdersearch(params).then(res =>{
                if (res.success) {
                  this.tableData = res.data.records;
                  this.tableloading=false;
                  this.totalOrder = res.params.total;
                  this.succ = res.params.succ;
                  this.fail = res.params.fail;
                  this.total = res.data.total; //size
                  this.pagesize=res.data.size;
                  this.currentPage = res.data.current;
                  this.currentTotal=(this.currentPage) * (this.pagesize)
                  if(this.currentTotal > this.total){
                    this.currentTotal = this.total
                  }else{
                    this.currentTotal=(this.currentPage) * (this.pagesize)
                  }
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
<style  scoped>
.el-date-editor.el-input, .el-date-editor.el-input__inner{
    width:100%;
}
</style>
