<template>
  <div class="app-container">
    <h3 class="showTit">物品掉落库存</h3>
    <el-row :gutter="32">
      <el-form ref="form" :model="form">
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.value1" size="small" placeholder="道具ID" clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="4">
          <el-button type="primary" v-has="'itemDropStock_search'" @click="onSubmit(1)" size="small">查询</el-button>
          <el-button type="danger" v-has="'itemDropStock_addProp'" @click="addCountItemDropStockDialog=true"  size="small">添加</el-button>
        </el-col>

      </el-form>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" style="width: 100%" :cell-style="cellStyle" :header-cell-style="rowClass" border v-loading="tableloading">
            <el-table-column prop="itemId" label="道具ID" ></el-table-column>
            <el-table-column prop="itemName" label="道具名称"> </el-table-column>
            <el-table-column prop="" label="是否受库存控制">
              <template slot-scope="scope">
                <el-button size="mini" v-if="scope.row.stock == 1" @click="handleEdit(scope.row,0)">关闭</el-button>
                <el-button size="mini" v-if="scope.row.stock == 0" @click="handleEdit(scope.row,1)">开启</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="number" label="数量" ></el-table-column>
            <el-table-column prop="" label="操作" width="116px">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" v-has="'itemDropLog_update'" @click="formdata=scope.row,editCountItemDropStockDialog=true" >修改数量</el-button>
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

    <!--添加 弹框-->
    <pcModal v-if="addCountItemDropStockDialog" :xs="8" :sm="8" :lg="2" :title="'添加'" @closeModal="addCountItemDropStockDialog = false">
        <addCountItemDropStockDialogmodule  @shuaxin="onSubmit(1)"  @closedialog="addCountItemDropStockDialog = false"></addCountItemDropStockDialogmodule>
    </pcModal>

     <!--操作 弹框-->
    <pcModal v-if="editCountItemDropStockDialog" :xs="8" :sm="8" :lg="2" :title="'操作数量'" @closeModal="editCountItemDropStockDialog = false">
        <editCountItemDropStockDialogmodule :getdata="formdata"  @shuaxin="onSubmit(1)"  @closedialog="editCountItemDropStockDialog = false"></editCountItemDropStockDialogmodule>
    </pcModal>

  </div>
</template>

<script>
    export default {
        name: "itemDropStock",
        components: {
          addCountItemDropStockDialogmodule:() => import('./addCountItemDropStockModule.vue'),
          editCountItemDropStockDialogmodule:()=>import('./editCountItemDropStockModule.vue')
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
            addCountItemDropStockDialog:false,
            editCountItemDropStockDialog:false,
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
              //itemId,currentPage,limit
              let param = {
                itemId:this.form.value1,
                currentPage:pageNum,
                limit:this.pagesize
              };
              this.tableloading=true;
              this.$api.itemDropLogsearchOnPage(param).then(res =>{
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
            handleEdit (row,data) {
            //stock(0关闭1开启)，itemId
                let params={
                  itemId:row.itemId,
                  stock:data
                };
                this.$api.itemDropLogcheck(params).then(res =>{
                  if (res.success) {
                      this.$message({
                        showClose: true,
                        message: res.message,
                        type: 'success'
                      });
                      this.onSubmit(1);
                    }else{
                      this.$message({
                        showClose: true,
                        message: res.message,
                        type: 'error'
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
