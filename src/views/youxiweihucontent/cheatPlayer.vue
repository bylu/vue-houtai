<template>
  <div class="app-container">
    <h3 class="showTit">疑似外挂用户</h3>
    <el-row :gutter="32">
      <el-form ref="form" :model="form">
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.userid" size="small" placeholder="用户ID" clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="3" :lg="2">
          <el-button type="primary" @click="onSubmit(1)" size="small">查询</el-button>
        </el-col>
      </el-form>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" style="width: 100%" :cell-style="cellStyle" :header-cell-style="rowClass" border v-loading="tableloading">
            <el-table-column prop="" label="用户ID" show-overflow-tooltip></el-table-column>
            <el-table-column prop="" label="打中两条鱼的次数过多" show-overflow-tooltip></el-table-column>
            <el-table-column prop="" label="发炮速度过快" show-overflow-tooltip></el-table-column>
            <el-table-column prop="" label="对同一条鱼的击中次数过多" show-overflow-tooltip></el-table-column>
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
        name: "cheatPlayer",
        data(){
          return{
            currentPage: 1, //初始页
            pagesize: 30, //每页的数据
            total: 0,
            currentTotal:0,
            form: {
              userid: '',
            },
            tableData: [],
            tableloading:false
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
                userid:this.form.userid,
                currentPage:pageNum,
                limit:this.pagesize
              };
              this.tableloading=true;
              this.$http({
                  url: this.paramUrl.cheatPlayersearch,
                  method: "post",
                  data: param,
                  headers: { "Content-Type": "application/json;charset=UTF-8" }
              }).then(res=> {
                  if (res.success) {
                    this.tableData = res.data.records;
                    this.tableloading=false;
                    this.total = res.data.total; //size
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
              })
            },
            handleCurrentChange: function(currentPage) {
              this.currentPage = currentPage;
              this.onSubmit(currentPage);
            },
        }
    }
</script>

<style scoped>
</style>
