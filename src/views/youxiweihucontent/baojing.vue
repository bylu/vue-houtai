<template>
  <div class="app-container">
    <h3 class="showTit">报警配置</h3>
    <el-row :gutter="32">
      <el-form ref="form" :model="form">
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.value1" size="small" placeholder="名称" clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="4">
          <el-button type="primary" @click="onSubmit(1)" size="small">查询</el-button>
       
          <el-button type="danger"  @click="addBaoJingDialog=true" size="small">添加</el-button>
        </el-col>

      </el-form>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" style="width: 100%" :cell-style="cellStyle" :header-cell-style="rowClass" border v-loading="tableloading">
            <el-table-column prop="id" label="ID" width="50"></el-table-column>
            <el-table-column prop="name" label="名称" width="100"></el-table-column>
            <el-table-column prop="json" label="参数" ></el-table-column>
            <el-table-column prop="phone" label="电话" width="120" ></el-table-column>
            <el-table-column prop="" label="操作" width="100">
                <template slot-scope="scope">
                    <el-popover :ref="scope.row.id" placement="top" width="180">
                        <p>确定删除本条数据吗？</p>
                        <div style="text-align: right; margin: 0">
                            <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
                            <el-button type="primary" size="mini" @click="subDelete(scope.row.id)">确定</el-button>
                        </div>
                        <el-button slot="reference" type="danger"  size="mini">删除</el-button>
                    </el-popover>
                </template>
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

    <!--添加和编辑 弹框-->
    <pcModal v-if="addBaoJingDialog" :xs="8" :sm="8" :lg="2" :title="'添加'" @closeModal="addBaoJingDialog = false">
        <addBaojingDialogmodule  @shuaxin="onSubmit(1)"  @closedialog="addBaoJingDialog = false"></addBaojingDialogmodule>
    </pcModal>
  </div>
</template>

<script>
    export default {
        name: "baojing",
        components: {
          addBaojingDialogmodule:() => import('./addBaojingModule.vue')
        },
        data(){
          return{
            currentPage: 1, //初始页
            pagesize: 30, //    每页的数据
            total: 0,
            currentTotal:0,
            form: {
              value1: ''
            },
            tableData: [],
            addBaoJingDialog:false,
            tableloading:false
          }
        },
        mounted(){
          this.onSubmit(1);
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
                name:this.form.value1,
                currentPage:pageNum,
                limit:this.pagesize
              };
              this.tableloading=true;
              this.$http({
                  url: this.paramUrl.baojingsearch,
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
            subDelete: function(id) {
              this.$http({
                  url:this.paramUrl.baojingdelete,
                  method: "post",
                  data: { id: id }
              }).then(res => {
                  if (res.success) {
                      this.$refs[id].doClose();
                      this.onSubmit();
                      this.$notify({
                          title: res.message,
                          type: "success",
                          duration: 2500
                      });
                  } else {
                      this.$refs[id].doClose();
                      this.$notify({
                          title: res.message,
                          type: "error",
                          duration: 2500
                      });
                  }
              });
            }
        }
    }
</script>

<style scoped>
</style>
