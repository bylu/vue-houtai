<template>
  <div class="app-container">
    <h3 class="showTit">注册充值统计</h3>
    <el-row :gutter="32">
      <el-form ref="form" :model="form">
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.channelid" size="small" placeholder="渠道ID" clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="4">
          <el-date-picker v-model="form.registeBeginTime" clearable size="small" align="right" type="date" placeholder="注册开始日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd"></el-date-picker>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="4">
          <el-date-picker v-model="form.registeEndTime" clearable size="small" align="right" type="date" placeholder="注册结束日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd"></el-date-picker>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="4">
          <el-date-picker v-model="form.payBeginTime" clearable size="small" align="right" type="date" placeholder="充值开始日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd"></el-date-picker>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="4">
          <el-date-picker v-model="form.payEndTime" clearable size="small" align="right" type="date" placeholder="充值结束日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd"></el-date-picker>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="8" v-has="'registeUserRecharge_search'">
          <el-button type="primary" size="small" @click="onSubmit(1)">查询</el-button>
          <el-button type="primary" size="small"  @click="beforeOneDay()" >向前一天</el-button>
          <el-button type="primary" size="small"  @click="afterOneDay()">向后一天</el-button>
        </el-col>
      </el-form>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" style="width: 100%;margin-top:10px;" :cell-style="cellStyle" :header-cell-style="rowClass"  @sort-change='sortChange' border v-loading="tableloading">
          <el-table-column prop="spreaderId" label="渠道ID"></el-table-column>
          <el-table-column prop="spreader" label="渠道名称" >
            <template slot-scope="scope">{{ scope.row.spreader | null2empty }}</template>
          </el-table-column>
          <el-table-column prop="registeDate" label="注册日期" sortable="true">
            <template slot-scope="scope">{{ scope.row.registeDate | null2empty }}</template>
          </el-table-column>
          <el-table-column prop="registeUserCount" label="注册人数" sortable="true">
            <template slot-scope="scope">{{ scope.row.registeUserCount | null2empty }}</template>
          </el-table-column>
          <el-table-column prop="rechargeDate" label="充值日期" sortable="true">
            <template slot-scope="scope">{{ scope.row.rechargeDate | null2empty }}</template>
          </el-table-column>
          <el-table-column prop="rechargeUserCount" label="充值人数" sortable="true">
            <template slot-scope="scope">{{ scope.row.rechargeUserCount | null2empty }}</template>
          </el-table-column>
          <el-table-column prop="recharge" label="充值金额" sortable="true">
            <template slot-scope="scope">{{ scope.row.recharge | numTenthousand }}</template>
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
        name: "registeUserRecharge",
        data(){
            return{
                currentPage: 1, //初始页
                pagesize: 30, //    每页的数据
                total: 0,
                currentTotal:0,
                form: {
                  channelid: '',
                  registeBeginTime:'',
                  registeEndTime:'',
                  payBeginTime:'',
                  payEndTime:''
                },
                tableData: [],
                tableloading:false,
                sort:"",
                sortby:"",
                orderDict:[],
                orderStackSet:[]
            }
        },
        mounted(){
          this.onSubmit(1);
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
              //spreaderId, registBegin, registend, payEnd, payBegin, currentPage limit
              let param = {
                spreaderId:this.form.channelid,
                registBegin:this.form.registeBeginTime,
                registend:this.form.registeEndTime,
                payBegin:this.form.payBeginTime,
                payEnd:this.form.payEndTime,
                currentPage:pageNum,
                limit:this.pagesize,
                sort:this.sort,
                sortby:this.sortby,
              };
              this.tableloading=true;
              this.$api.registeUserRechargesearch(param).then(res =>{
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
              if((this.form.registeBeginTime == "" || this.form.registeBeginTime == null) && (this.form.registeEndTime == "" || this.form.registeEndTime == null)&&(this.form.payBeginTime == "" || this.form.payBeginTime == null) && (this.form.payEndTime == "" || this.form.payEndTime == null)){
                this.form.registeBeginTime=this.moment(new Date()).format("YYYY-MM-DD");
                this.form.registeEndTime=this.moment(new Date()).format("YYYY-MM-DD");
                this.form.payBeginTime=this.moment(new Date()).format("YYYY-MM-DD");
                this.form.payEndTime=this.moment(new Date()).format("YYYY-MM-DD");
              }else{
                this.form.registeBeginTime=this.moment(this.form.registeBeginTime).subtract(1, 'days').format("YYYY-MM-DD");
                this.form.registeEndTime=this.moment(this.form.registeEndTime).subtract(1, 'days').format("YYYY-MM-DD");
                this.form.payBeginTime=this.moment(this.form.payBeginTime).subtract(1, 'days').format("YYYY-MM-DD");
                this.form.payEndTime=this.moment(this.form.payEndTime).subtract(1, 'days').format("YYYY-MM-DD");
              }

              this.onSubmit(1);
            },
            afterOneDay(){
              if((this.form.registeBeginTime == "" || this.form.registeBeginTime == null) && (this.form.registeEndTime == "" || this.form.registeEndTime == null)&&(this.form.payBeginTime == "" || this.form.payBeginTime == null) && (this.form.payEndTime == "" || this.form.payEndTime == null)){
                this.form.registeBeginTime=this.moment(new Date()).format("YYYY-MM-DD");
                this.form.registeEndTime=this.moment(new Date()).format("YYYY-MM-DD");
                this.form.payBeginTime=this.moment(new Date()).format("YYYY-MM-DD");
                this.form.payEndTime=this.moment(new Date()).format("YYYY-MM-DD");
              }else{
                this.form.registeBeginTime=this.moment(this.form.registeBeginTime).add(1, 'days').format("YYYY-MM-DD");
                this.form.registeEndTime=this.moment(this.form.registeEndTime).add(1, 'days').format("YYYY-MM-DD");
                this.form.payBeginTime=this.moment(this.form.payBeginTime).add(1, 'days').format("YYYY-MM-DD");
                this.form.payEndTime=this.moment(this.form.payEndTime).add(1, 'days').format("YYYY-MM-DD");
              }
              this.onSubmit(1);
            },
        }
    }
</script>

<style scoped>
.el-date-editor.el-input, .el-date-editor.el-input__inner{
    width:100%;
}
</style>
