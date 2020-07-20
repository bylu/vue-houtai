<template>
    <div class="showcontent">
      <div class="userOperaTitlecss">修改密码查询操作:</div>
        <el-row :gutter="32">
          <el-form ref="form" :model="form">
              <el-col :xs="12" :sm="6" :lg="3">
                <el-select v-model="form.type" placeholder="请输入" size="small">
                  <el-option v-for="(list,index) in selectList.operaeditTypelist" :key="index" :label="list.value" :value="list.key"></el-option>
                </el-select>
              </el-col>
              <el-col :xs="24" :sm="6" :lg="3">
                  <el-input v-model.trim="form.operatorId" size="small" placeholder="操作员ID" clearable></el-input>
              </el-col>
              <el-col :xs="24" :sm="6" :lg="3">
                  <el-input v-model.trim="form.userId" size="small" placeholder="修改对象用户ID" clearable></el-input>
              </el-col>

              <el-col :xs="12" :sm="6" :lg="4">
                  <el-date-picker v-model="form.beginTime" size="small" align="right" clearable type="date" placeholder="开始日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd"></el-date-picker>
              </el-col>
              <el-col :xs="12" :sm="6" :lg="4">
                  <el-date-picker v-model="form.endTime" size="small" align="right" clearable type="date" placeholder="结束日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd"></el-date-picker>
              </el-col>
              <el-col :xs="24" :sm="24" :lg="6">
                <el-button type="primary" size="small" @click="onSubmit(1)">查询</el-button>
                <el-button type="primary" size="small"  @click="beforeOneDay()" >向前一天</el-button>
                <el-button type="primary" size="small"  @click="afterOneDay()">向后一天</el-button>
              </el-col>
          </el-form>
        </el-row>

        <el-row  :gutter="32">
            <el-col :span="24">
                <el-table :data="tableData" style="width: 100%" :cell-style="cellStyle" :header-cell-style="rowClass" border v-loading="tableloading">
                    <el-table-column prop="operatorId" label="操作员ID"></el-table-column>
                    <el-table-column prop="operatorIp" label="操作员IP"></el-table-column>
                    <el-table-column prop="userId" label="修改对象用户ID"></el-table-column>
                    <el-table-column prop="oldPwd" label="原密码"></el-table-column>
                    <el-table-column prop="newPwd" label="新密码"></el-table-column>
                    <el-table-column prop="type" label="类型">
                      <template slot-scope="scope">{{ scope.row.type | checkPasswordType }}</template>
                    </el-table-column>
                    <el-table-column prop="createDate" label="修改时间" width="160px"></el-table-column>
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
        name: "userOperaeditPwd",
        data(){
          return{
            currentPage: 1, //初始页
            pagesize: 30, //    每页的数据
            total: 0,
            currentTotal:0,
            form: {
              type:'-1',
              operatorId:'',
              userId:'',
              beginTime:this.moment(new Date()).format("YYYY-MM-DD"),
              endTime:this.moment(new Date()).format("YYYY-MM-DD")
            },
            tableData: [],
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
              let param = {
                type:this.form.type,
                operatorId:this.form.operatorId,
                userId:this.form.userId,
                beginTime:this.moment(this.form.beginTime).format("YYYY-MM-DD"),
                endTime:this.moment(this.form.endTime).format("YYYY-MM-DD"),
                currentPage:pageNum,
                limit:this.pagesize
              };
              this.tableloading=true;
              this.$api.recordUserOperationInfoupdatePwd(param).then(res =>{
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
        }
    }
</script>

<style scoped>
  .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width:100%;
  }
</style>
