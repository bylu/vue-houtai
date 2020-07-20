<template>
  <div class="app-container">
    <h3 class="showTit">道具合成</h3>
    <el-row :gutter="32">
      <el-form ref="form" :model="form">
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.id"  size="small" placeholder="道具ID" clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.name"  size="small" placeholder="道具名字" clearable></el-input>
        </el-col>    
         <el-col :xs="24" :sm="12" :lg="6">
          <el-button type="primary" v-has="'itemCompose_search'" @click="init(1)" size="small">查询</el-button>
       
          <el-button type="danger" v-has="'itemCompose_import'" @click="showimportdialog =true" size="small">导入</el-button>
        
          <el-button type="success" v-has="'itemCompose_refresh'" @click="Refresh" size="small">刷新</el-button>
        </el-col>
      </el-form>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" style="width: 100%" :cell-style="cellStyle" :header-cell-style="rowClass" border v-loading="tableloading">
            <el-table-column prop="id" label="id"></el-table-column>
            <el-table-column prop="name" label="Name"></el-table-column>
            <el-table-column prop="condition" label="condition"></el-table-column>
            <el-table-column prop="consume" label="consume"></el-table-column>
            <el-table-column prop="number" label="number"></el-table-column>
            <el-table-column label="操作" width="106">
              <template slot-scope="scope">
                <el-popover :ref="`popover-${scope.$index}`" placement="top" width="180" >
                    <p>确定删除本条数据吗？</p>
                    <div style="text-align: right; margin: 0">
                      <el-button size="mini" type="text" @click="scope._self.$refs[`popover-${scope.$index}`].doClose()">取消</el-button>
                      <el-button type="primary" size="mini" @click="subDelete(scope.$index,scope.row.id)">确定</el-button>
                    </div>
                    <el-button slot="reference" type="danger" style="margin-bottom:0" v-has="'itemCompose_delete'"  size="mini">删除</el-button>
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

    <!--导入-->
    <pcModal v-if="showimportdialog" :xs="8" :sm="8" :lg="2" :title="'导入文件'" @closeModal="showimportdialog = false">
      <dialogimportfilecontent @closedialog="showimportdialog= false"></dialogimportfilecontent>
    </pcModal>

  </div>
</template>

<script>
    export default {
        name: "itemCompose",
        components:{
          dialogimportfilecontent:() =>import('./dialogItemComposeFileModule.vue')
        },
        data(){
          return{
            currentPage: 1, //初始页
            pagesize: 30, //    每页的数据
            total: 0,
            currentTotal:0,
            form:{
              id:"",
              name:""
            },
            tableData: [],
            showimportdialog:false,
            tableloading:false
          }
        },
        mounted(){
          this.init(1);
        },
        methods:{
            cellStyle(row,column,rowIndex,columnIndex){
              return 'text-align:center;padding:6px 0';
            },
            rowClass({row,rowIndex}){
              return 'text-align:center;padding:6px 0';
            },
            init(pageNum){
              let param = {
                id:this.form.id,
                name:this.form.name,
                currentPage:pageNum,
                limit:this.pagesize
              };
              this.tableloading=true;
              this.$api.itemComposesearch(param).then(res =>{
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
              this.init(currentPage);
            },
            subDelete: function(ind,id) {
              let param={ id: id }
              this.$api.itemComposedelete(param).then(res =>{
                if (res.success) {
                  this.$refs[`popover-${ind}`].doClose();
                  this.init(1);
                  this.$notify({
                    title: res.message,
                    type: "success",
                    duration: 2500
                  });
                } else {
                  this.$refs[`popover-${ind}`].doClose();
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
            Refresh(){
              this.$confirm('您确定要执行刷新缓存操作？', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
              }).then(async() => {
                this.$api.itemComposerefresh().then(res =>{
                  if (res.success) {
                    this.$message({
                        type: 'success',
                        message: res.message
                    });
                    this.init(1);
                  }else{
                    this.$message({
                        type: 'error',
                        message: res.message
                    });
                  }
                }).catch(err =>{
                  this.$message({
                    message: '请求失败!',
                    type: "error"
                  });
                })
              }).catch(e=>e);
            }
        }
    }
</script>

<style scoped>
</style>
