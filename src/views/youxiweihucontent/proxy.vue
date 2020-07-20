<template>
  <div class="app-container">
    <h3 class="showTit">代理状态</h3>
    <el-row :gutter="32" style="margin-bottom:10px;">
      <el-form ref="form">
        <el-col :xs="24" :sm="3" :lg="2">
          <el-button type="primary" v-has="'proxy_refresh'" @click="Refresh" size="small">刷新</el-button>
        </el-col>
      </el-form>
    </el-row>

    <el-row :gutter="32">
      <el-col :span="24">
        <el-table id="gameloginfo" :data="tableData" style="width: 100%" :cell-style="cellStyle" :header-cell-style="rowClass" border v-loading="tableloading">
            <el-table-column prop="a1" label="代理名字"></el-table-column>
            <el-table-column prop="a2" label="代理地址"></el-table-column>
            <el-table-column prop="a3" label="内网地址"></el-table-column>
            <el-table-column prop="a4" label="代理状态">
              <template slot-scope="scope">{{ scope.row.a4 == 1 ? '正常'+'('+scope.row.a4+')':'挂了'+'('+scope.row.a4+')' }}</template>
            </el-table-column>
        </el-table>
        
      </el-col>
    </el-row>
  </div>
</template>

<script>
    export default {
        name: "proxy",
        data(){
          return{
            tableData: [],
            tableloading:false
          }
        },
        mounted(){
          this.onSubmit(1);
        },
        methods:{
            cellStyle(row,column,rowIndex,columnIndex){
              return 'text-align:center;padding:6px 0';
            },
            rowClass({row,rowIndex}){
              return 'text-align:center;padding:6px 0';
            },
            onSubmit(pageNum){
              let param = {};
              this.tableloading=true;
              this.$http({
                  url: this.paramUrl.proxysearch,
                  method: "post",
                  data: param,
                  headers: { "Content-Type": "application/json;charset=UTF-8" }
              }).then(res=> {
                  if (res.success) {
                    this.tableData = res.data.records;
                    this.tableloading=false;
                  } else {
                    this.$message({
                      message: res.message,
                      type: "error"
                    });
                  }
              })
            },
            Refresh(){
              this.$confirm('您确定要执行刷新缓存操作？', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
              }).then(() => {
                  this.$message({
                      type: 'success',
                      message: '刷新成功!'
                  });
                  this.onSubmit(1);
                  }).catch(e=>e);
            }
        }
    }
</script>

<style scoped>
</style>
