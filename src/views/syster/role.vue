<template>
  <div class="app-container">
    <h3 class="showTit">角色管理</h3>
    <div class="head-container">
      <el-row :gutter="32">
        <div style="display: inline-block;margin: 0px 5px;">
          <el-button size="mini" type="primary" v-has="'rolesInfo_add'" @click="add">新增</el-button>
        </div>
      </el-row>
    </div>
    <el-row>
      <el-col :span="24">
        <el-table v-loading="loading" :data="data" highlight-current-row  style="width: 100%;" border :cell-style="cellStyle" :header-cell-style="rowClass">
          <el-table-column prop="roleID" label="角色ID" />
          <el-table-column prop="roleName" label="角色名称" />
          <el-table-column prop="description" label="描述" />
          <el-table-column prop="departmentName" label="所属部门" />
          <el-table-column label="操作" width="350px" align="center">
            <template slot-scope="scope">
              <el-button type="primary" v-has="'rolesInfo_modify'" style="margin-bottom:0px;" @click="formdata=scope.row,showEFormModal=true,isAdd=false" size="mini">修改</el-button>
              <el-button type="primary" v-has="'rolesInfo_updatePermisson'" style="margin-bottom:0px;" @click="assignPermissions(scope.row)" size="mini">分配权限</el-button>
              <el-popover :ref="scope.row.roleID" placement="top" width="180">
                <p>确定删除本条数据吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="$refs[scope.row.roleID].doClose()">取消</el-button>
                  <el-button type="primary" size="mini" @click="subDelete(scope.row.roleID)">确定</el-button>
                </div>
                <el-button slot="reference" type="danger" v-has="'rolesInfo_delete'" style="margin-bottom:0px;" size="mini">删除</el-button>
              </el-popover>
              <el-button type="success" v-has="'spreaderManage_addRelevance'" style="margin-bottom:0px;"  @click="connectChannelId=scope.row.roleID,showChannelModal=true" size="mini">关联渠道</el-button>
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
    <!--新增角色和编辑角色 弹框-->
    <pcModal v-if="showEFormModal" :xs="8" :sm="8" :lg="2" :title="isAdd ? '新增角色' : '编辑角色'" @closeModal="showEFormModal = false">
        <eForm :getdata="formdata" @shuaxin="beforeInit"  @closedialog="showEFormModal = false"></eForm>
    </pcModal>
     <!-- 分配用户权限弹框 -->
      <pcModal v-if="showRoleModal" width="80%" title="分配用户权限" @closeModal="showRoleModal = false">
          <permissions  @shuaxin="beforeInit" @closedialog="showRoleModal = false"></permissions>
      </pcModal>
    <!--关联渠道弹框-->
    <pcModal v-if="showChannelModal" :xs="8" :sm="8" :lg="2" title="关联渠道" @closeModal="showChannelModal = false">
      <connectchannel :channelid="connectChannelId" @shuaxin="beforeInit"  @closedialog="showChannelModal = false"></connectchannel>
    </pcModal>

  </div>
</template>
<script>
export default {
  name: "role",
  components: {
    eForm:() => import('./form.vue'),
    permissions:() => import('./permissions.vue'),
    connectchannel:()=> import('./connectchannel.vue'),
  },
  data() {
    return {
      loading: false,
      isAdd: false,
      currentPage: 1, //初始页
      pagesize: 30, //    每页的数据
      total: 0,
      currentTotal:0,
      data: [],
      roleId:"",
      showRoleModal:false,
      formdata:"",
      showEFormModal:false,
      showChannelModal:false
    };
  },
  beforeMount() {
      this.beforeInit(1)
  },
  methods: {
    cellStyle(row,column,rowIndex,columnIndex){
      return 'padding:6px 0';
    },
    rowClass({row,rowIndex}){
      return 'padding:6px 0';
    },
    beforeInit(pagenum) {
      this.loading = true;
      let url = this.paramUrl;
      let params = { page: pagenum, size: this.pagesize, sort: "" };
      this.$api.roleinfo(params).then(res =>{
        this.loading = false;
        if (res.success) {
          this.data = res.data.records;
          this.total = res.data.total;
          this.pagesize=res.data.size;
          this.currentPage = res.data.current;
          this.currentTotal=(this.currentPage) * (this.pagesize)
          if(this.currentTotal > this.total){
            this.currentTotal = this.total
          }else{
            this.currentTotal=(this.currentPage) * (this.pagesize)
          }
        }
      }).catch(err =>{
        this.$message({
          message: '请求失败!',
          type: "error"
        });
      })
    },
    add: function() {
      this.isAdd = true;
      this.showEFormModal=true;
      this.formdata="";
    },
    subDelete: function(id) {
      let param= { roleID: id }
      this.$api.delrole(param).then(res =>{
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
    },
    handleSizeChange: function(size) {
      this.pagesize = size;
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      this.beforeInit(this.currentPage);
    },
    assignPermissions(obj){
      this.$store.commit('setObject',JSON.stringify( obj));
      this.showRoleModal=true;
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
