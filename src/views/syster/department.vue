<template>
  <div class="app-container">
    <h3 class="showTit">部门管理</h3>
    <div class="head-container">
      <el-row :gutter="32">
        <div style="display: inline-block;margin: 0px 5px;">
          <el-button size="mini" filter-item type="primary" v-has="'department_save'" @click="formdata='',showDepartModal=true,isAdd=true">新增部门</el-button>
        </div>
      </el-row>
    </div>
    <div>
    <el-row>
      <el-col :span="24">
        <el-table v-loading="loading" :data="data" highlight-current-row  style="width: 100%;" border :cell-style="cellStyle" :header-cell-style="rowClass">
          <el-table-column prop="id" label="部门ID" />
          <el-table-column prop="name" label="部门名称" />
          <el-table-column label="操作" width="350px" align="center">
            <template slot-scope="scope">
              <el-button type="primary" v-has="'department_Update'" style="margin-bottom:0px;" @click="formdata=scope.row,showDepartModal=true,isAdd=false" size="mini">修改</el-button>
              <el-popover :ref="scope.row.id" placement="top" width="180">
                <p>确定删除本条数据吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
                  <el-button type="primary" size="mini" @click="subDelete(scope.row.id)">确定</el-button>
                </div>
                <el-button slot="reference" type="danger" style="margin-bottom:0px;" v-has="'department_delete'" size="mini">删除</el-button>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    </div>
    <!--新增部门和编辑部门 弹框-->
    <pcModal v-if="showDepartModal" width="30%" :title="isAdd ? '新增部门' : '编辑部门'" @closeModal="showDepartModal = false">
        <addOrUpdateDepartment :getdata="formdata" @shuaxin="beforeInit"  @closedialog="showDepartModal = false"></addOrUpdateDepartment>
    </pcModal>
  </div>
</template>
<script>
export default {
  name: "departmennt",
  components: {
    addOrUpdateDepartment:() => import('./addOrUpdateDepartmentModule.vue')
  },
  data() {
    return {
      loading: false,
      isAdd: false,
      data: [],
      formdata:"",
      showDepartModal:false
    };
  },
   beforeMount() {
      this.beforeInit()
  },
  methods: {
    cellStyle(row,column,rowIndex,columnIndex){
      return 'padding:6px 0';
    },
    rowClass({row,rowIndex}){
      return 'padding:6px 0';
    },
    beforeInit() {
      this.loading = true;
      this.$api.searchDepartment().then(res =>{
        this.loading = false;
        if (res.success) {
          this.data = res.data;
        }
      }).catch(err =>{
        this.$message({
          message: '请求失败!',
          type: "error"
        });
      });
    },
    subDelete: function(id) {
      let param= { id: id }
      this.$api.delDepartment(param).then(res =>{
        if (res.success) {
          this.$refs[id].doClose();
          this.beforeInit();
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
    }
  }
};
</script>

<style scoped>
.filter-item {
  margin-bottom: 10px;
}
.el-tree-node__label {
  margin-left: 5px;
}
</style>
