<template>
  <div class="app-container">
    <h3 class="showTit">节日奖励</h3>
    <el-row :gutter="32">
      <el-form ref="form" :model="form">
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.name" size="small" placeholder="节日名称" clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="12">
          <el-button type="primary"  @click="onSubmit(1)" v-has="'festival_search'" size="small">查询</el-button>

          <el-button type="danger" v-has="'festival_saveOrUpdate'"  @click="formdata='',showFestivalDialog=true,isAdd=true"  size="small">新增</el-button>

          <el-button type="success"  size="small" v-has="'festival_import'" @click="importFile = true">导入</el-button>
          <el-button type="danger" size="small" v-has="'festival_refresh'" @click="Refresh">刷新</el-button>
        </el-col>
      </el-form>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" style="width: 100%" v-loading="tableloading" border  :cell-style="cellStyle" :header-cell-style="rowClass">
            <el-table-column prop="id" label="ID" width="100"></el-table-column>
            <el-table-column prop="name" label="名称" width="100"></el-table-column>
            <el-table-column prop="type" label="类型" width="50"></el-table-column>
            <el-table-column prop="prizeid" label="道具奖励" width="100"></el-table-column>
            <el-table-column prop="starttime" label="开始时间" width="100"></el-table-column>
            <el-table-column prop="endtime" label="结束时间" width="100"></el-table-column>
            <el-table-column prop="content" label="节日介绍"></el-table-column>

            <el-table-column label="操作" width="100"  fixed="right">
                <template slot-scope="scope">
                    <div class="showbuttonclass" >
                        <el-button size="mini" v-has="'festival_saveOrUpdate'" type="primary"  @click="formdata=scope.row,showFestivalDialog=true,isAdd=false" >修改</el-button>
                    </div>
                    <el-button size="mini" type="success"  v-has="'festival_copy'" style="margin-bottom:10px;" @click="formdata=scope.row,copyFestivalDialog=true" >复制</el-button>
                    <el-popover :ref="scope.row.id" placement="top" width="180">
                        <p>确定删除本条数据吗？</p>
                        <div style="text-align: right; margin: 0">
                            <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
                            <el-button type="primary" size="mini" @click="subDelete(scope.row.id)">确定</el-button>
                        </div>
                        <el-button slot="reference" type="danger" v-has="'festival_delete'" style="margin-bottom:10px;"  size="mini">删除</el-button>
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

    <!--导入活动-->
    <pcModal v-if="importFile" width="30%" title="导入"  @closeModal="importFile = false">
        <importFileModel   @shuaxin="onSubmit(currentPage)"  @closedialog="importFile = false"></importFileModel>
    </pcModal>


    <!--添加、修改 弹框-->
    <pcModal v-if="showFestivalDialog" width="760px" :title="isAdd ? '新增' : '修改'" @closeModal="showFestivalDialog = false">
        <showFestivalDialogmodule :getdata="formdata" :isAdd="isAdd"  @shuaxin="onSubmit(currentPage)"  @closedialog="showFestivalDialog = false"></showFestivalDialogmodule>
    </pcModal>

    <!--复制 弹框-->
    <pcModal v-if="copyFestivalDialog" width="760px" :title="'复制'" @closeModal="copyFestivalDialog = false">
        <copyFestivalDialogmodule :getdata="formdata" @shuaxin="onSubmit(currentPage)"  @closedialog="copyFestivalDialog = false"></copyFestivalDialogmodule>
    </pcModal>

  </div>
</template>

<script>
    export default {
        name: "activities",
        components: {
          importFileModel:()=>import('./importFestivalModule.vue'),
          showFestivalDialogmodule:() => import('./showFestivalModule.vue'),
          copyFestivalDialogmodule:() => import('./copyFestivalModule.vue'),
        },
        data(){
          return{
            currentPage: 1, //初始页
            pagesize: 30, //    每页的数据
            total: 0,
            currentTotal:0,
            form: {
              name: ''
            },
            tableData: [],
            tableloading:false,
            showFestivalDialog:false,
            copyFestivalDialog:false,
            importFile:false,
            checkTypelist:"",
          }
        },
        mounted(){
        },
        methods:{
            cellStyle(row,column,rowIndex,columnIndex){
              return 'padding:6px 0';
            },
            rowClass({row,rowIndex}){
              return 'padding:6px 0';
            },

            /**
             * 查询
             */
            onSubmit(pageNum){
              let param = {
                name:this.form.name,
                currentPage:pageNum,
                limit:this.pagesize
              };
              this.tableloading=true;
              this.$api.festivalprizesearch(param).then(res =>{
                  this.tableloading=false;
                  if (res.success) {
                    this.tableData = res.data.records;
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
                 console.log(err)
              })
            },
            handleCurrentChange: function(currentPage) {
              this.currentPage = currentPage;
              this.onSubmit(currentPage);
            },
            /**
             * 删除操作
             */
            subDelete: function(id) {
              let param = {
                id:id
              };
              this.$api.festivalprizedelete(param).then(res =>{
                  if (res.success) {
                    this.$refs[id].doClose();
                      this.onSubmit(this.currentPage);
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
                 console.log(err)
              })
            },
          Refresh(){
            this.$confirm('是否刷新', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(async() => {
              this.$api.festivalprizerefresh().then(res =>{
                if (res.success) {
                  this.$message({
                    type: 'success',
                    message: res.message
                  });
                  this.onSubmit(1);
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

<style scope>
.el-date-editor.el-input, .el-date-editor.el-input__inner{
    width:100%;
}
  .el-tooltip__popper{font-size: 14px; max-width:50% }
  .el-table__row.exact-row {
    color: red;
  }
</style>
