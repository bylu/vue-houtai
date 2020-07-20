<template>
  <div style="width:100%;margin-top:10px;">
    <h3 class="showTit" style="margin-left:0px;">用户留存率</h3>
    <el-row :gutter="32" >
      <el-form ref="form" :model="form">
        <el-col :xs="24" :sm="6" :lg="4">
          <el-date-picker
            v-model="form.date1"
            type="date" size="mini"
            placeholder="选择日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
          </el-date-picker>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="4">
          <el-date-picker
            v-model="form.date2"
            type="date" size="mini"
            placeholder="结束日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
          </el-date-picker>
        </el-col>

        <el-col :xs="24" :sm="12" :lg="6">
          <el-button type="primary" size="mini"  @click="onSubmit">查询</el-button>
        </el-col>
      </el-form>
    </el-row>

    <el-row >
      <el-col :span="24">
        <el-table
          :data="tableData"
          style="width: 100%;margin-top:10px;" :cell-style="cellStyle" size="mini" :header-cell-style="rowClass" v-loading="tableloading">
          <el-table-column prop="registerDate"  label="注册日期" width="90"> </el-table-column>
          <el-table-column prop="registerNo" label="新增用户数"></el-table-column>
          <el-table-column label="留存率">
              <el-table-column prop="" label="1天后">
                <template slot-scope="scope">
                   <div  v-html="commonJs.format100rate(scope.row.logonNoDay1 / scope.row.registerNo)"> </div>
                </template>
              </el-table-column>
              <el-table-column prop="" label="2天后">
                <template slot-scope="scope">
                   <div  v-html="commonJs.format100rate(scope.row.logonNoDay2 / scope.row.registerNo)"> </div>
                </template>
              </el-table-column>
              <el-table-column prop="" label="3天后">
                <template slot-scope="scope">
                   <div  v-html="commonJs.format100rate(scope.row.logonNoDay3 / scope.row.registerNo)"> </div>
                </template>
              </el-table-column>
              <el-table-column prop="" label="4天后">
                <template slot-scope="scope">
                   <div  v-html="commonJs.format100rate(scope.row.logonNoDay4 / scope.row.registerNo)"> </div>
                </template>
              </el-table-column>
              <el-table-column prop="" label="5天后">
                <template slot-scope="scope">
                   <div  v-html="commonJs.format100rate(scope.row.logonNoDay5 / scope.row.registerNo)"> </div>
                </template>
              </el-table-column>
              <el-table-column prop="" label="6天后">
                <template slot-scope="scope">
                   <div  v-html="commonJs.format100rate(scope.row.logonNoDay6 / scope.row.registerNo)"> </div>
                </template>
              </el-table-column>
              <el-table-column prop="" label="7天后">
                <template slot-scope="scope">
                   <div  v-html="commonJs.format100rate(scope.row.logonNoDay7 / scope.row.registerNo)"> </div>
                </template>
              </el-table-column>
              <el-table-column prop="" label="14天后">
                <template slot-scope="scope">
                   <div  v-html="commonJs.format100rate(scope.row.logonNoDay14 / scope.row.registerNo)"> </div>
                </template>
              </el-table-column>
              <el-table-column prop="" label="30天后">
                <template slot-scope="scope">
                   <div  v-html="commonJs.format100rate(scope.row.logonNoDay30 / scope.row.registerNo)"> </div>
                </template>
              </el-table-column>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    export default {
        name: "userrate",
        data(){
            return{
                form: {
                  date1: this.moment(new Date()).subtract(7,'days').format("YYYY-MM-DD"),
                  date2: this.moment(new Date()).format("YYYY-MM-DD"),
                },
                tableData: [],
                spreaderRateInfoData:[],
                tableloading:false,
                labelvalue:"",
            }
        },
        mounted() {
          this.onSubmit();
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
                beginTime:this.form.date1,
                endTime:this.form.date2,
                spreaderRateInfo:parseInt('-1'),
                qudao:'',
                type:"0"

              };
              this.tableloading=true;
              this.$api.retentionRateInfoBoss(param).then(res =>{
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
            },
        }
    }
</script>

<style scoped>
.el-date-editor.el-input, .el-date-editor.el-input__inner{
    width:100%;
}
</style>
