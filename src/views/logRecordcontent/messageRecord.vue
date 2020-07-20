<template>
  <div class="app-container">
    <h3 class="showTit">验证码记录</h3>
    <el-row :gutter="32">
      <el-form ref="form" :model="form">
        <el-col :xs="12" :sm="6" :lg="3">
          <el-input v-model.trim="form.mobilePhone" size="small" placeholder="手机号" clearable></el-input>
        </el-col>
        <el-col :xs="12" :sm="6" :lg="2">
          <el-button type="primary" size="small" v-has="'messageRecord_search'" @click="onSubmit(1)">查询</el-button>
        </el-col>
      </el-form>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" style="width: 100%" :cell-style="cellStyle" :header-cell-style="rowClass" border v-loading="tableloading">
          <el-table-column prop="id" label="序号" width="100px"></el-table-column>
          <el-table-column prop="phone" label="手机号" width="110px">
            <template slot-scope="scope">{{ scope.row.phone | checkMobiphone }}</template>
          </el-table-column>
          <el-table-column prop="info" label="短信内容"></el-table-column>
          <el-table-column prop="expiredtime" label="失效时间" width="180px">
            <template slot-scope="scope">{{ scope.row.expiredtime | RiQi }}</template>
          </el-table-column>
          <el-table-column prop="flag" label="状态" width="100px">
            <template slot-scope="scope">{{ scope.row.flag | flagStatue }}</template>
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
        name: "messageRecord",
        data(){
          return{
              currentPage: 1, //初始页
              pagesize: 30, //    每页的数据
              total: 0,
              currentTotal:0,
              form: {
                mobilePhone: ''
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
              //phone,currentPage,limit
              let param = {
                phone:this.form.mobilePhone,
                currentPage:pageNum,
                limit:this.pagesize
              };
              this.tableloading=true;
              this.$api.messageRecordsearch(param).then(res =>{
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
            }
        }
    }
</script>

<style scoped>
</style>
