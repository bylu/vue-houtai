<template>
  <div class="app-container">
    <h3 class="showTit">充值模板</h3>
    <el-row :gutter="32">
      <el-form :model="form" :inline="true" ref="form" label-width="80px" class="demo-ruleForm">
        <el-col :xs="24" :sm="12" :lg="4">
          <el-input v-model.trim="form.mould" size="small" placeholder="模板名称" value='' clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="4">
          <el-button type="primary" size="small" v-has="'channelPayServiceCfgTemp_search'" @click="onSubmit(1)">查询</el-button>
          <el-button size="small" filter-item type="danger" v-has="'channelPayServiceCfgTemp_add'" @click="formdata='',showAddModal=true,isAdd=true">添加模板</el-button>
        </el-col>
      </el-form>
    </el-row>
    <el-row>
      <el-col :span="24">
          <el-table v-loading="tableloading" :data="tableData" highlight-current-row style="width: 100%;" border>
            <el-table-column prop="serviceName" label="SERVICE_NAME" width="200px"></el-table-column>
            <el-table-column prop="serverParams" label="SERVER_PARAMS"></el-table-column>
            <el-table-column prop="clientParams" label="CLENT_PARAMS" width="480px"></el-table-column>
            <el-table-column prop="note" label="NOTE" width="130px"></el-table-column>
            <el-table-column prop="insertDate" label="INSERT_DATE" width="100px"></el-table-column>
            <el-table-column prop="" label="OPTION" width="100px" align="center">
              <template slot-scope="scope">
                <el-button type="primary" v-has="'channelPayServiceCfgTemp_update'" @click="formdata=scope.row,showAddModal=true,isAdd=false" size="mini">修改</el-button>
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
    <!--新增和修改-->
    <pcModal v-if="showAddModal" :xs="8" :sm="8" :lg="2" :title="isAdd ? '添加模板' : '修改模板'"  @closeModal="showAddModal = false">
      <channelPayServiceCfgTempDialogModule :getdata="formdata" :isAdd="isAdd" @shuaxin="onSubmit(1)" @closedialog="showAddModal = false"></channelPayServiceCfgTempDialogModule>
    </pcModal>

  </div>
</template>

<script>
    export default {
        name: "channelPayServiceCfgTemp",
        components: {
          channelPayServiceCfgTempDialogModule: () => import("./channelPayServiceCfgTempModule")
        },
        data() {
          return {
            currentPage: 1, //初始页
            pagesize: 30, //    每页的数据
            total: 0,
            currentTotal:0,
            form:{
              mould:""
            },
            tableData: [],
            showAddModal: false,
            isAdd:false,
            tableloading:false
          };
        },
        methods: {
          cellStyle(row,column,rowIndex,columnIndex){
            return 'text-align:center';
          },
          rowClass({row,rowIndex}){
            return 'text-align:center;';
          },
          onSubmit(pageNum){
            //serviceName
            let param = {
              serviceName:this.form.mould,
              currentPage:pageNum,
              limit:this.pagesize
            };
            this.tableloading=true;
            this.$api.channelPayServiceCfgTempsearch(param).then(res =>{
              if (res.success) {
                this.tableData = res.data.records;
                this.tableloading=false;
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
    };
</script>

<style scoped>
.filter-item {
  margin-bottom: 10px;
}
</style>
