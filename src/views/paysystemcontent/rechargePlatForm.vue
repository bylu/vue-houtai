<template>
  <div class="app-container">
    <h3 class="showTit">充值平台管理</h3>
    <el-row :gutter="32" style="margin-bottom:10px;">
      <el-form ref="form" :model="form">
        <el-col :xs="24" :sm="6" :lg="2">
          <el-button type="danger" v-has="'rechargePlatForm_add'"  @click="formdata='',rechargePlatFormDialog=true,isAdd=true"  size="small">添加</el-button>
        </el-col>
      </el-form>
    </el-row>

    <el-row :gutter="32">
      <el-col :span="24">
        <el-table :data="tableData" style="width: 100%" border="" v-loading="tableloading" :cell-style="cellStyle" :header-cell-style="rowClass">
          <el-table-column prop="id" label="ID"></el-table-column>
          <el-table-column prop="orderFeature" label="订单特征"></el-table-column>
          <el-table-column prop="platformName" label="名称"></el-table-column>
          <el-table-column label="操作"  width="160px">
            <template slot-scope="scope">
               <el-button size="mini" type="primary" v-has="'rechargePlatForm_update'" @click="formdata=scope.row,rechargePlatFormDialog=true,isAdd=false" >修改</el-button>
                <el-popover :ref="scope.row.id" placement="top" width="180">
                    <p>确定删除本条数据吗？</p>
                    <div style="text-align: right; margin: 0">
                        <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
                        <el-button type="primary" size="mini" @click="subDelete(scope.row.id)">确定</el-button>
                    </div>
                    <el-button slot="reference" type="danger" v-has="'rechargePlatForm_delete'" size="mini">删除</el-button>
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
    <pcModal v-if="rechargePlatFormDialog" :xs="8" :sm="8" :lg="2" :title="isAdd ? '添加' : '修改'" @closeModal="rechargePlatFormDialog = false">
        <rechargePlatFormDialogModule :getdata="formdata" :isAdd="isAdd" @shuaxin="onSubmit(1)"  @closedialog="rechargePlatFormDialog = false"></rechargePlatFormDialogModule>
    </pcModal>

  </div>
</template>

<script>
    export default {
        name: "rechargePlatForm",
        components: {
          rechargePlatFormDialogModule:() => import('./rechargePlatFormModule.vue'),
        },
        data(){
            return{
                currentPage: 1, //初始页
                pagesize: 30, //    每页的数据
                total: 0,
                currentTotal:0,
                form: {},
                tableData: [],
                isAdd: false,
                rechargePlatFormDialog:false,
                tableloading:false
            }
        },
        mounted(){
          this.onSubmit(1);
        },
        methods:{
            cellStyle(row,column,rowIndex,columnIndex){
              return 'padding:6px 0';
            },
            rowClass({row,rowIndex}){
              return 'padding:6px 0';
            },
            onSubmit(pageNum){
                let param = {
                  currentPage:pageNum,
                  limit:this.pagesize
              };
              this.tableloading=true;
              this.$api.rechargePlatFormsearch(param).then(res =>{
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
            subDelete: function(id) {
                let param = {id: id };
                this.$api.rechargePlatFormdelete(param).then(res =>{
                  if (res.success) {
                    this.$refs[id].doClose();
                    this.onSubmit(1);
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
</style>
