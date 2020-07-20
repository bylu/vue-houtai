<template>
  <div class="app-container" style="width:99%">
    <h3 class="showTit">新用户LTV</h3>
    <el-row :gutter="32">
      <el-form ref="form" :model="form">
        <el-col :xs="24" :sm="6" :lg="2">
          <el-select v-model="form.userLtvType" size="small" placeholder="LTV">
            <el-option v-for="list in selectList.userLtvTypelist" :key="list.key" :value="list.key" :label="list.value"></el-option>
          </el-select>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="3">
          <el-select v-model="form.userLtvChannelType" size="small" placeholder="所有渠道">
            <el-option v-for="list in selectList.userLtvChannelTypelist" :key="list.key" :value="list.key" :label="list.value"></el-option>
          </el-select>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="4">
          <el-input v-model.trim="form.channelId" size="small" placeholder="渠道ID,英文,隔开" clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="4">
          <el-date-picker v-model="form.beginTime" clearable  size="small"  align="right" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="开始日期">
          </el-date-picker>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="4">
          <el-date-picker v-model="form.endTime" size="small" clearable align="right" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="结束日期">
          </el-date-picker>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="2">
          <el-button type="primary" size="small" v-has="'newUserLtv_search'" @click="onSubmit()">查询</el-button>
        </el-col>
      </el-form>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" style="width: 100%" :cell-style="cellStyle" :header-cell-style="rowClass" border v-loading="tableloading">
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
              beginTime:this.moment(new Date(new Date().setHours(0, 0, 0, 0))).format("YYYY-MM-DD HH:mm:ss"),
              endTime:this.moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
              userLtvChannelType: '0',
              channelId: ''
            },
            tableData: [],
            tableloading:false
          }
        },
        methods:{
            cellStyle(row,column,rowIndex,columnIndex){
              return 'text-align:center;padding:6px 0;';
            },
            rowClass({row,rowIndex}){
              return 'text-align:center;padding:6px 0;';
            },
            onSubmit(){
              if(this.form.userLtvChannelType != "0" && (this.form.channelId == "" || this.form.channelId ==null || typeof(this.form.channelId) == undefined)){
                this.$message({
                      message: '请输入渠道ID',
                      type: "error"
                });
                return
              }
              //dataType，beginTime，endTime,spreaderType,spreaderIds
              let param = {
                dataType:this.form.userLtvType,
                beginTime:this.form.beginTime,
                endTime:this.form.endTime,
                spreaderType:this.form.userLtvChannelType,
                spreaderIds:this.form.channelId
              };
              this.tableloading=true;
              this.$api.newUserLtvsearch(param).then(res =>{
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
