<template>
  <div class="app-container">
    <h3 class="showTit">道具关系管理</h3>
    <el-row :gutter="32" style="margin-bottom:10px;">
      <el-form ref="form">
        <el-col :xs="24" :sm="3" :lg="2">
          <el-button type="primary" v-has="'itemMap_import'" @click="itemMapImportDialog=true" size="small">导入</el-button>
        </el-col>
      </el-form>
    </el-row>

    <el-row :gutter="32">
      <el-col :span="24">
        <el-table id="gameloginfo" :data="tableData" style="width: 100%" :cell-style="cellStyle" :header-cell-style="rowClass" border v-loading="tableloading">
            <el-table-column prop="itemId" label="ItemID"></el-table-column>
            <el-table-column prop="craft" label="Craft">
              <template slot-scope="scope">{{ scope.row.craft | checkcraft }}</template>
            </el-table-column>
            <el-table-column prop="entryId" label="EntryID"></el-table-column>
            <el-table-column prop="realid" label="RealID"></el-table-column>
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

    <!-- 导入道具关系管理 -->
    <pcModal v-if="itemMapImportDialog" :xs="8" :sm="8" :lg="2" :title="'导入道具关系管理'" @closeModal="itemMapImportDialog = false">
      <dialogItemMapImport  @closedialog="itemMapImportDialog= false"></dialogItemMapImport>
    </pcModal>

  </div>
</template>

<script>
    export default {
        name: "itemMap",
        components:{
          dialogItemMapImport:() =>import('./itemMapImportModule.vue')
        },
        data(){
          return{
            currentPage: 1, //初始页
            pagesize: 30, //    每页的数据
            total: 0,
            currentTotal:0,
            tableData: [],
            itemMapImportDialog:false,
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
              let param = {
                currentPage:pageNum,
                limit:this.pagesize
              };
              this.tableloading=true;
              this.$api.itemMapsearch(param).then(res =>{
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
            }
        }
    }
</script>

<style scoped>
</style>
