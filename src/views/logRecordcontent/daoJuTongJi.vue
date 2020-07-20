<template>
  <div class="app-container">
    <h3 class="showTit">鱼掉落道具统计</h3>
    <el-row :gutter="32">
      <el-form ref="form" :model="form">
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.pid" size="small" placeholder="道具ID" clearable></el-input>
        </el-col>
        <span style="width:auto;float:left;margin-top:5px;">掉落时间：</span>
        <el-col :xs="12" :sm="6" :lg="3">
          <el-date-picker v-model="form.beginTime" size="small" align="right" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="开始日期" clearable>
          </el-date-picker>
        </el-col>
        <el-col :xs="12" :sm="6" :lg="3">
          <el-date-picker v-model="form.endTime" size="small" align="right" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="结束日期" clearable>
          </el-date-picker>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="6" v-has="'daoJuTongJi_search'">
          <el-button type="primary" size="small" @click="onSubmit(1)">查询</el-button>
          <el-button type="primary" size="small"  @click="beforeOneDay()" >向前一天</el-button>
          <el-button type="primary" size="small"  @click="afterOneDay()">向后一天</el-button>
        </el-col>
      </el-form>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" style="width: 100%" :cell-style="cellStyle" :header-cell-style="rowClass" border v-loading="tableloading">
          <el-table-column prop="" label="鱼类型"></el-table-column>
          <el-table-column prop="" label="个数"></el-table-column>
        </el-table>

      </el-col>
    </el-row>
  </div>
</template>

<script>
    export default {
        name: "daoJuTongJi",
        data(){
          return{
            form: {
              pid: '',
              beginTime:this.moment(new Date()).format("YYYY-MM-DD"),
              endTime:this.moment(new Date()).format("YYYY-MM-DD")
            },
            tableData: [],
            tableloading:false,
          }
        },
        methods:{
            cellStyle(row,column,rowIndex,columnIndex){
              return 'text-align:center';
            },
            rowClass({row,rowIndex}){
              return 'text-align:center;';
            },
            onSubmit(pageNum){
              let param = {
                // fromUid:this.form.fromUid,
                // toUid:this.form.toUid,
                // propId:this.form.propId,
                // beginTime:this.moment(this.form.beginTime).format("YYYY-MM-DD"),
                // endTime:this.moment(this.form.endTime).format("YYYY-MM-DD"),
                // currentPage:pageNum,
                // limit:this.pagesize
              };
              this.tableloading=true;
              // this.$api.giveLogSearch(param).then(res =>{
              //   if (res.success) {
              //     this.tableData = res.data.records;
              //     this.tableloading=false;
              //   } else {
              //     this.$message({
              //       message: res.message,
              //       type: "error"
              //     });
              //   }
              // }).catch(err =>{
              //   this.$message({
              //     message: '请求失败!',
              //     type: "error"
              //   });
              // })
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
        }
    }
</script>

<style scoped>
.el-date-editor.el-input, .el-date-editor.el-input__inner{
    width:100%;
}
</style>
