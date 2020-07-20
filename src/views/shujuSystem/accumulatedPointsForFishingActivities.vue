<template>
  <div class="showcontent">
        <h4 class="showTit">打鱼活动累计积分:</h4>
        <el-row :gutter="24">
          <el-form ref="form" :model="form">
            <el-col :xs="24" :sm="6" :lg="3">
              <el-input v-model.trim="form.userid" size="small" placeholder="用户ID" clearable></el-input>
            </el-col>
            <el-col :xs="24" :sm="6" :lg="3">
              <el-input v-model.trim="form.spreaderid" size="small" placeholder="渠道ID" clearable></el-input>
            </el-col>
            <el-col :xs="12" :sm="6" :lg="4">
              <el-date-picker v-model="form.beginTime" size="small" align="right" clearable type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="开始日期">
              </el-date-picker>
            </el-col>
            <el-col :xs="12" :sm="6" :lg="4">
              <el-date-picker v-model="form.endTime" size="small" align="right" clearable type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="结束日期">
              </el-date-picker>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="6">
              <el-button type="primary" size="small" @click="onSubmit(1)">查询</el-button>
              <el-button type="primary" size="small"  @click="beforeOneDay()" >向前一天</el-button>
              <el-button type="primary" size="small"  @click="afterOneDay()">向后一天</el-button>
            </el-col>
          </el-form>
        </el-row>
  </div>
</template>

<script>
    export default {
        name: "accumulatedPointsForFishingActivities",
        data(){
            return{
                loading:false,
                form: {
                    userid: '',
                    spreaderid: '',
                    beginTime:this.moment(new Date(new Date().setHours(0,0,0,0))).format("YYYY-MM-DD"),
                    endTime:this.moment(new Date()).format("YYYY-MM-DD")
                },
            }
        },
        methods:{
            onSubmit(pageNum){
              this.loading=true;
            
              // this.$http({
              //     //url:this.paramUrl.excelshopGoodsRecord,
              //     method: "post",
              //     data: this.form,
              //     //responseType: 'blob', // 表明返回服务器返回的数据类型
              //     headers: {
              //     'Content-Type': 'application/json'
              //     }
              // }).then(res=> {
              //     this.loading=false;
              //     this.commonJs.downloadXls(res,'新建文件'+'.xlsx')
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
