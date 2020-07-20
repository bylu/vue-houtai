<template>
  <div class="app-container">
    <h3 class="showTit">封号记录</h3>
    <el-row :gutter="32">
      <el-form ref="form" :model="form">
        <el-col :xs="12" :sm="6" :lg="4">
          <el-date-picker v-model="form.beginTime" clearable size="small"  align="right" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="开始日期">
          </el-date-picker>
        </el-col>
        <el-col :xs="12" :sm="6" :lg="4">
          <el-date-picker v-model="form.endTime" clearable size="small" align="right" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="结束日期">
          </el-date-picker>
        </el-col>
        <el-col :xs="12" :sm="6" :lg="3">
          <el-select v-model="form.sealIp" size="small" placeholder="封IP"  @change="watchSelect(form.sealIp)">
            <el-option v-for="list in selectList.sealIplist" :key="list.key" :value="list.key" :label="list.value"></el-option>
          </el-select>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="6" v-has="'sealRecord_search'">
          <el-button type="primary" size="small" @click="onSubmit(1)">查询</el-button>
          <el-button type="primary" size="small"  @click="beforeOneDay()" >向前一天</el-button>
          <el-button type="primary" size="small"  @click="afterOneDay()">向后一天</el-button>
        </el-col>
      </el-form>
    </el-row>

    <el-row :gutter="32">
      <el-col :span="24">
      <el-table class="maintable"  ref="multipleTable" v-show="iphidden" :data="tableData" tooltip-effect="dark" style="width: 100%" border v-loading="tableloading" :cell-style="cellStyle" :header-cell-style="rowClass">
        <el-table-column prop="addrString" label="ADDRSTRING"></el-table-column>
        <el-table-column prop="enjoinLogon" label="ENJOINLOGON"></el-table-column>
        <el-table-column prop="enjoinRegister" label="ENJOINREGISTER"></el-table-column>
        <el-table-column prop="enjoinOverDate" label="ENJOINOVERDATE">
          <template slot-scope="scope"> {{scope.row.enjoinOverDate | null2empty }}</template>
        </el-table-column>
        <el-table-column prop="collectDate" label="COLLECTDATE"></el-table-column>
        <el-table-column prop="collectNote" label="COLLECTNOTE"></el-table-column>
      </el-table>

      <el-table class="maintable"  ref="multipleTable" v-show="machidden" :data="tableData" tooltip-effect="dark" style="width: 100%" border v-loading="tableloading" :cell-style="cellStyle" :header-cell-style="rowClass">
        <el-table-column prop="machineSerial" label="MACHINESERIAL" width="300px"></el-table-column>
        <el-table-column prop="enjoinLogon" label="ENJOINLOGON"></el-table-column>
        <el-table-column prop="enjoinRegister" label="ENJOINREGISTER"></el-table-column>
        <el-table-column prop="enjoinOverDate" label="ENJOINOVERDATE">
          <template slot-scope="scope"> {{scope.row.enjoinOverDate | null2empty }}</template>
        </el-table-column>
        <el-table-column prop="collectDate" label="COLLECTDATE"></el-table-column>
        <el-table-column prop="collectNote" label="COLLECTNOTE"></el-table-column>
      </el-table>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
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
        name: "sealRecord",
        data(){
          return{
            currentPage: 1, //初始页
            pagesize: 30, //    每页的数据
            total: 0,
            currentTotal:0,
            form: {
              beginTime:this.moment(new Date(new Date().setHours(0, 0, 0, 0))).format("YYYY-MM-DD"),
              endTime:this.moment(new Date()).format("YYYY-MM-DD"),
              sealIp:'1'
            },
            tableData: [],
            iphidden:true,
            machidden:false,
            tableloading:false
          }
        },
        methods:{
            cellStyle(row,column,rowIndex,columnIndex){
              return 'text-align:center;padding:6px 0';
            },
            rowClass({row,rowIndex}){
              return 'text-align:center;padding:6px 0';
            },
            onSubmit(pageNum){
              //type(1ip, 2mac), beginTime, endTime, currentPage, limit
              let param = {
                beginTime:this.form.beginTime,
                endTime:this.form.endTime,
                type:this.form.sealIp,
                currentPage:pageNum,
                limit:this.pagesize
              };
              this.tableloading=true;
              this.$api.sealRecordsearch(param).then(res =>{
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
            watchSelect(val){
              if(val == 1){
                this.iphidden=true;
                this.machidden=false;
              }else{
                this.iphidden=false;
                this.machidden=true;
              }
            },
        }
    }
</script>

<style scoped>
.el-date-editor.el-input, .el-date-editor.el-input__inner{
    width:100%;
}
  .maintable{
    background: #fff;
    -webkit-box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.2);
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.2);
    border-color: rgba(0, 0, 0, 0.2);
  }
</style>
