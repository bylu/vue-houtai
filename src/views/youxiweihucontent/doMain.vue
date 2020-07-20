<template>
  <div class="app-container">
    <h3 class="showTit">域名管理</h3>
    <el-row :gutter="32">
      <el-form ref="form">
        <el-col :xs="24" :sm="3" :lg="2">
          <el-button type="primary" size="small" @click="editDoMain()">修改配置</el-button>
        </el-col>
      </el-form>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-table id="gameloginfo" :data="tableData" style="width: 100%" :cell-style="cellStyle" :header-cell-style="rowClass" border v-loading="tableloading">
          <el-table-column prop="id" label="id" show-overflow-tooltip></el-table-column>
          <el-table-column prop="name" label="name" show-overflow-tooltip></el-table-column>
          <el-table-column prop="grade_title" label="grade_title" show-overflow-tooltip></el-table-column>
          <el-table-column prop="status" label="statue" show-overflow-tooltip></el-table-column>
          <el-table-column prop="punycode" label="punycode" show-overflow-tooltip></el-table-column>
          <el-table-column prop="group_id" label="group_id" show-overflow-tooltip></el-table-column>
          <el-table-column prop="created_on" label="created_on" show-overflow-tooltip></el-table-column>
          <el-table-column prop="updated_on" label="update_on" show-overflow-tooltip></el-table-column>
          <el-table-column prop="" label="get2Domain" show-overflow-tooltip>
            <template slot-scope="scope"> 
              <el-button type="success" @click="formdata=scope.row,showConfigureModal=true" size="mini">配置</el-button>
            </template>
          </el-table-column>
        </el-table>

      </el-col>
    </el-row>

    <!-- 修改配置 -->
    <pcModal v-if="editDoMaimDialog" :xs="8" :sm="8" :lg="2" :title="'修改配置'" @closeModal="editDoMaimDialog = false">
      <dialogEditdomain :getdata="namedata" @shuaxin="onSubmit(1)" @closedialog="editDoMaimDialog= false"></dialogEditdomain>
    </pcModal>

    <!-- 查看配置 -->
    <pcModal v-if="showConfigureModal" width="60%" :title="'配置'" @closeModal="showConfigureModal = false">
      <doMainShowConfigureModule :getdata="formdata" @shuaxin="onSubmit(1)" @closedialog="showConfigureModal= false"></doMainShowConfigureModule>
    </pcModal>

  </div>
</template>

<script>
    export default {
        name: "doMain",
        components:{
          dialogEditdomain:() =>import('./doMainEditModule.vue'),
          doMainShowConfigureModule:() =>import('./doMainShowConfigureModule.vue')
        },
        data(){
          return{
            tableData: [],
            editDoMaimDialog:false,
            namedata:'',
            showConfigureModal:false,
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
              let param = {};
              this.tableloading=true;
              this.$http({
                  url: this.paramUrl.domainsearch,
                  method: "post",
                  data: param,
                  headers: { "Content-Type": "application/json;charset=UTF-8" }
              }).then(res=> {
                  if (res.success) {
                    this.tableData = res.data;
                    this.tableloading=false;
                  } else {
                    this.$message({
                      message: res.message,
                      type: "error"
                    });
                  }
              })
            },
            editDoMain(){
              this.$http({
                url: this.paramUrl.domainupdateSelect,
                method: "post",
                data: {},
                headers: { "Content-Type": "application/json;charset=UTF-8" }
              }).then(res=> {
                if (res.success) {
                    this.namedata = res.data;
                    this.editDoMaimDialog = true;
                  } else {
                    this.$message({
                      message: res.message,
                      type: "error"
                    });
                  }
              })
            }
        }
    }
</script>

<style scoped>
</style>
