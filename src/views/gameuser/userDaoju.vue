<template>
  <div class="app-container">
    <h3 class="showTit">用户道具信息</h3>
    <el-row :gutter="32">
      <el-form ref="form" :model="form">
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.userid" size="small" placeholder="用户ID" clearable></el-input>
        </el-col>

        <el-col :xs="24" :sm="6" :lg="2">
          <el-button type="primary" size="small" v-has="'userItem_search'" @click="onSubmit(1)">查询</el-button>
        </el-col>
      </el-form>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" style="width: 100%" border :cell-style="cellStyle" :header-cell-style="rowClass" v-loading="tableloading">
          <el-table-column prop="userId" label="用户ID" show-overflow-tooltip></el-table-column>
          <el-table-column prop="itemId" label="道具ID" show-overflow-tooltip></el-table-column>

          <el-table-column prop="name" label="道具名称" show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.name | null2empty }}</template>
          </el-table-column>
          <el-table-column prop="count" label="道具数量" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作" width="100" show-overflow-tooltip></el-table-column>
        </el-table>

      </el-col>
    </el-row>
  </div>
</template>

<script>
    export default {
        name: "userdaoju",
        data(){
            return{
                form: {
                  userid: ''
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
              if(this.form.userid == "" || this.form.userid ==null || typeof(this.form.userid) == undefined){
                this.$message({
                      message: '请输入用户ID',
                      type: "error"
                });
                return
              }
              let param = {
                uid:this.form.userid
              };
              this.tableloading=true;
              this.$api.userItemsearch(param).then(res =>{
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
</style>
