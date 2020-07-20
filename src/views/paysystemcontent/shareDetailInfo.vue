<template>
    <div class="app-container">
        <h3 class="showTit">充值记录</h3>
        <el-row :gutter="32">
          <el-form  :model="form">
              <el-col :xs="24" :sm="6" :lg="3">
                  <el-input v-model.trim="form.userID" size="small" placeholder="用户ID" clearable></el-input>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="3">
                  <el-input v-model.trim="form.nickname" size="small" placeholder="昵称" clearable></el-input>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="3">
                  <el-input v-model.trim="form.gameID" size="small" placeholder="游戏ID" clearable></el-input>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="3">
                  <el-input v-model.trim="form.spearderiD" size="small" placeholder="渠道ID" clearable></el-input>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="4">
                  <el-input v-model.trim="form.orderID" size="small" placeholder="订单号" clearable></el-input>
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
              <el-col :xs="24" :sm="12" :lg="6" v-has="'shareDetailInfo_search'">
                  <el-button type="primary" size="small"  @click="onSubmit(1)">查询</el-button>
                  <el-button type="primary" size="small"  @click="beforeOneDay()" >向前一天</el-button>
                  <el-button type="primary" size="small"  @click="afterOneDay()">向后一天</el-button>
              </el-col>
          </el-form>
      </el-row>

      <div class="otherdesc">
        总充值金额：{{payAmount | numTenthousand}} &nbsp;&nbsp; 
        总金币数量：{{scoresum | numTenthousand}} &nbsp;&nbsp;
        总充值次数：{{paytotal | numTenthousand}} &nbsp;&nbsp;
        总充值用户数：{{users}}
      </div>
        <el-row>
            <el-col :span="24">
              <el-table class="maintable" ref="multipleTable" :data="tableData" border id="shareDetailInfo" tooltip-effect="dark" style="width: 100%" v-loading="tableloading" @sort-change='sortChange' :header-cell-class-name="handleHeaderCellClass" :cell-style="cellStyle" :header-cell-style="rowClass">
                  <el-table-column prop="userID" label="用户ID" width="90px"></el-table-column>
                  <el-table-column prop="applyDate" label="充值时间" width="100px" sortable="true"></el-table-column>
                  <el-table-column prop="registerDate" label="注册时间" width="100px" sortable="true"></el-table-column>
                  <el-table-column prop="spearderId" label="渠道ID" width="100" sortable="true"></el-table-column>
                  <el-table-column prop="gameID" label="游戏ID" width="90px" sortable="true">
                    <template slot-scope="scope">
                      <span style="color:#1890ff;cursor: pointer;" @click="openNewWin(scope.row.gameID)">{{ scope.row.gameID }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="nickname" label="昵称" width="130px"></el-table-column>
                  <el-table-column prop="orderID" label="订单号" width="130px"></el-table-column>
                  <el-table-column prop="extparams" label="订单类型" width="70px"></el-table-column>
                  <el-table-column prop="orderAmount" label="订单金额" width="120px" sortable="true">
                      <template slot-scope="scope">{{ scope.row.orderAmount | numTenthousand }}</template>
                  </el-table-column>
                  <el-table-column prop="payAmount" label="支付金额" width="120px" sortable="true">
                      <template slot-scope="scope">{{ scope.row.payAmount | numTenthousand }}</template>
                  </el-table-column>
                  <el-table-column prop="cardGold" label="赠送金币" width="120px">
                      <template slot-scope="scope">{{ scope.row.cardGold | numTenthousand }}</template>
                  </el-table-column>
                  <el-table-column prop="ipaddress" label="IP地址" width="120px"></el-table-column>
                  <el-table-column prop="paycount" label="充值次数" width="100" sortable="true">
                      <template slot-scope="scope">{{ scope.row.paycount | null2Zero }}</template>
                  </el-table-column>
                  <el-table-column prop="payAmountSum" label="充值总和" width="120px" sortable="true">
                      <template slot-scope="scope">{{ scope.row.payAmountSum | numTenthousand }}</template>
                  </el-table-column>
                  <el-table-column prop="spreaderName" label="推荐人">
                      <template slot-scope="scope">{{ scope.row.spreaderName | null2empty }}</template>
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
    import FileSaver from 'file-saver'
    import XLSX from 'xlsx'
    export default {
        name:'shareDetailInfo',
        data(){
            return {
                currentPage: 1, //初始页
                pagesize: 30, //    每页的数据
                total: 0,
                currentTotal:0,
                form:{
                    userID:'',
                    nickname:'',
                    gameID:'',
                    spearderiD:'',
                    orderID:'',
                    beginTime: this.moment(new Date(new Date().setHours(0, 0, 0, 0))).format("YYYY-MM-DD"),
                    endTime: this.moment(new Date()).format("YYYY-MM-DD")
                },
                tableData:[],
                payAmount:"0",
                scoresum:"0",
                paytotal:"0",
                users:"0",
                tableloading:false,
                sort:"",
                sortby:"",
                orderDict:[],
                orderStackSet:[]
            }
        },
        mounted(){
           this.getParams();
        },
        methods:{
            cellStyle(row,column,rowIndex,columnIndex){
              return 'padding:6px 0';
            },
            rowClass({row,rowIndex}){
              return 'padding:6px 0';
            },
            getParams() {
              // 取到路由带过来的参数
              this.form.spearderiD = this.$route.query.spearderiD;
              this.form.gameID = this.$route.query.gameID;
              if((this.form.spearderiD =="" || this.form.spearderiD == null || typeof(this.form.gameid) == undefined) && (this.form.gameID =="" || this.form.gameID == null || typeof(this.form.gameID) == undefined) ){

              }else{
                this.onSubmit(1);
              }
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
                this.loading = true;
                let params = {
                    userID:this.form.userID,
                    nickname:this.form.nickname,
                    orderID:this.form.orderID,
                    gameID:this.form.gameID,
                    spearderId:this.form.spearderiD,
                    beginTime:this.form.beginTime,
                    endTime:this.form.endTime,
                    currentPage: pageNum,
                    limit: this.pagesize,
                    sort:this.sort,
                    sortby:this.sortby,
                };
                this.tableloading=true;
                this.$api.shareDetailInfosearch(params).then(res =>{
                  this.loading = false;
                  if (res.success) {
                      this.tableData = res.data.records;
                      this.tableloading=false;
                      this.payAmount = res.params.payAmount;
                      this.scoresum = res.params.scoresum;
                      this.paytotal = res.params.total;
                      this.users = res.params.users;
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
            handleCurrentChange: function(currentPage) {
                this.currentPage = currentPage;
                this.onSubmit(currentPage);
            },
            exportExcel(){
                //表名
                var wb = XLSX.utils.table_to_book(document.querySelector('#shareDetailInfo'))
                /* get binary string as output */
                var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
                try {
                     FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'shareDetailInfo.xlsx')
                } catch (e) {
                    if (typeof console !== 'undefined')
                    console.log(e, wbout)
                }
                return wbout
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
