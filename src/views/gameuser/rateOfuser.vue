<template>
  <div  class="app-container" style="width:99%;">
    <h3 class="showTit">用户留存率</h3>
    <el-row :gutter="32">
      <el-form ref="form" :model="form">
        <el-col :xs="24" :sm="6" :lg="4">
          <el-date-picker
            v-model="form.date1"
            type="date" size="small"
            placeholder="选择日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd" clearable>
          </el-date-picker>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="4">
          <el-date-picker
            v-model="form.date2"
            type="date" size="small"
            placeholder="结束日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd" clearable>
          </el-date-picker>
        </el-col>
         <el-col :sx="24" :sm="6" :lg="4">
           <el-select v-model="form.spreaderRateInfo" placeholder="请选择" size="small"  @change="watchSelect(form.spreaderRateInfo)">
             <el-option
               v-for="(list,index) in this.spreaderRateInfoData"
               :key="index"
               :label="list.accounts"
               :value="list.userID"
             ></el-option>
           </el-select>
       </el-col>
       <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.qudao"  size="small"  @keyup.native="changeSelect(form.qudao)" placeholder="渠道ID"></el-input>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="6" v-has="'retentionRateInfo_search'">
          <el-button type="primary" size="small"  @click="onSubmit">全部</el-button>
          <el-button type="success" size="small"  @click="onSubmitNoPay">非付费</el-button>
          <el-button type="danger"  size="small"  @click="onSubmitPay">付费</el-button>
        </el-col>
      </el-form>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-table
          :data="tableData" 
          style="width: 100%" :cell-style="cellStyle" :header-cell-style="rowClass" v-loading="tableloading">
          <el-table-column  label="类型" width="150">
             <template slot-scope="scope">
                  {{scope.row.type | checkRetatype}}
              </template>
          </el-table-column>
          <el-table-column prop="registerDate"  label="注册日期" width="150"> </el-table-column>
          <el-table-column prop="registerNo" label="新增用户数" width="150"></el-table-column>
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
                  spreaderRateInfo:parseInt('-1'),
                  qudao:''
                },
                tableData: [],
                spreaderRateInfoData:[],
                tableloading:false,
                labelvalue:"",
            }
        },
        mounted() {
          this.getParams();
          this.searchSpreaderRateInfoData();
        },
        methods:{
            getParams() {
              // 取到路由带过来的参数
              if( this.$route.query.spreaderId == "" ||  this.$route.query.spreaderId ==null){
                 this.form.spreaderRateInfo=parseInt('-1')
              }else{
                  this.form.qudao = this.$route.query.spreaderId;
                  this.form.spreaderRateInfo=parseInt(this.$route.query.spreaderId);
                  this.onSubmit();
              }
              if(this.$route.query.type == 2){  //周期
                this.form.date1 = this.moment(this.$route.query.beginDate).format("YYYY-MM-DD"),
                this.form.date2 = this.moment(this.$route.query.endDate).format("YYYY-MM-DD");
              }else if(this.$route.query.type == 1){   //每天
                this.form.date1 = this.moment(this.$route.query.beginDate).format("YYYY-MM-DD"),
                this.form.date2 = this.moment(this.$route.query.beginDate).format("YYYY-MM-DD");
              }else{
                
              }
            },
            cellStyle(row,column,rowIndex,columnIndex){
              return 'text-align:center;padding:6px 0;';
            },
            rowClass({row,rowIndex}){
              return 'text-align:center;padding:6px 0;';
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
            onSubmit(){ 
              let param = {
                beginTime:this.form.date1,
                endTime:this.form.date2,
                spreaderId:this.form.spreaderRateInfo,
                qudao:this.form.qudao,
                type:"0",
              };
              this.tableloading=true;
              this.$api.retentionRateInfo(param).then(res =>{
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
            onSubmitNoPay(){
              let param = {
                beginTime:this.form.date1,
                endTime:this.form.date2,
                type:1,
                spreaderId:this.form.qudao
              };
              this.$api.retentionRateInfo(param).then(res =>{
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
            onSubmitPay(){
              let param = {
                beginTime:this.form.date1,
                endTime:this.form.date2,
                type:2,
                spreaderId:this.form.qudao
              };
               this.$api.retentionRateInfo(param).then(res =>{
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
            /**
             * 渠道下拉框绑定后面的input值
             */
            watchSelect(val){
              this.form.qudao=val;
            },
            /**
             * 输入input  绑定 select值
             */
            changeSelect(val){
              this.form.spreaderRateInfo=parseInt(val);
            }
        }
    }
</script>

<style scoped>
.el-date-editor.el-input, .el-date-editor.el-input__inner{
    width:100%;
}
</style>
