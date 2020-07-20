<template>
  <div  style="width:100%;margin-top:10px;">
    <h3 class="showTit" style="margin-left:0px;">新用户LTV</h3>
    <el-row :gutter="32">
      <el-form ref="form" :model="form">
        <el-col :xs="24" :sm="6" :lg="4">
          <el-date-picker v-model="form.beginTime"  size="mini"  align="right" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="开始日期">
          </el-date-picker>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="4">
          <el-date-picker v-model="form.endTime" size="mini" align="right" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="结束日期">
          </el-date-picker>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="2">
          <el-button type="primary" size="mini" @click="onSubmit()">查询</el-button>
        </el-col>
      </el-form>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" style="width: 100%;margin-top:10px;" size="mini" :cell-style="cellStyle" :header-cell-style="rowClass" border  v-loading="tableloading"
    element-loading-text="数据加载约20秒，请稍等" element-loading-spinner="el-icon-loading">
          <el-table-column prop="registerDate" label="注册日期"></el-table-column>
          <el-table-column prop="registerNo" label="注册人数"></el-table-column>
          <el-table-column prop="ltvDay1" label="1天内">
            <template slot-scope="scope"><div v-html="commonJs.numToFixed2(scope.row.ltvDay1)"></div></template>
          </el-table-column>
          <el-table-column prop="ltvDay3" label="3天内">
            <template slot-scope="scope"><div v-html="commonJs.numToFixed2(scope.row.ltvDay3)"></div></template>
          </el-table-column>
          <el-table-column prop="ltvDay7" label="7天内">
            <template slot-scope="scope"><div v-html="commonJs.numToFixed2(scope.row.ltvDay7)"></div></template>
          </el-table-column>
          <el-table-column prop="ltvDay15" label="15天内">
            <template slot-scope="scope"><div v-html="commonJs.numToFixed2(scope.row.ltvDay15)"></div></template>
          </el-table-column>
          <el-table-column prop="ltvDay30" label="30天内">
            <template slot-scope="scope"><div v-html="commonJs.numToFixed2(scope.row.ltvDay30)"></div></template>
          </el-table-column>
          <el-table-column prop="ltvDay60" label="60天内">
            <template slot-scope="scope"><div v-html="commonJs.numToFixed2(scope.row.ltvDay60)"></div></template>
          </el-table-column>
          <el-table-column prop="ltvDay90" label="90天内">
            <template slot-scope="scope"><div v-html="commonJs.numToFixed2(scope.row.ltvDay90)"></div></template>
          </el-table-column>

        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    export default {
        name: "newUserLTV",
        data(){
          return{
            form: {
              userLtvType: '0',
              beginTime:this.moment(new Date()).subtract(7,'days').format("YYYY-MM-DD"),
              endTime:this.moment(new Date()).format("YYYY-MM-DD"),
              userLtvChannelType: '0',
              channelId: ''
            },
            tableData: [],
            tableloading:false
          }
        },
        mounted(){
          this.onSubmit()
        },
        methods:{
            cellStyle(row,column,rowIndex,columnIndex){
              return 'text-align:center;padding:4px 0;';
            },
            rowClass({row,rowIndex}){
              return 'text-align:center;padding:4px 0;';
            },
            onSubmit(){
              let param = {
                beginTime1:this.form.beginTime,
                endTime1:this.form.endTime,
              };
              this.tableloading=true;
              this.$api.newUserLtvsearchBoss(param).then(res =>{
                if (res.success) {
                  this.tableData = res.data;
                  this.tableloading=false;
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
            }
        }
    }
</script>

<style scoped>
.el-date-editor.el-input, .el-date-editor.el-input__inner{
    width:100%;
}
</style>
