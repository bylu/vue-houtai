<template>
  <div>
    <div class="head-container">
      <el-row>
        <div style="display: inline-block;margin: 0px 5px;">
          <el-button  size="mini" filter-item type="primary" @click="showPermissionModal('')">新增</el-button>
        </div>
      </el-row>
    </div>
    <el-row>
      <!--角色管理-->
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" style="margin-bottom: 10px">
        <el-card class="box-card" shadow="never">
          <el-table
            v-loading="loading"
            :data="modulethreetabledata"
            highlight-current-row
            size="small"
            style="width: 100%;"
          >
            <el-table-column prop="parentID" v-if="show"/>
            <el-table-column prop="moduleID" v-if="show"/>
            <el-table-column prop="permissionTitle" label="权限名称" width="130px" />
            <el-table-column prop="nullity" label="状态" width="130px">
              <template slot-scope="scope">{{scope.row.nullity | permissiontype }}</template>
            </el-table-column>
            <el-table-column prop="uri" label="权限地址" />
            <el-table-column prop="permissionType" label="操作标识">
              <template slot-scope="scope">{{scope.row.permissionType | permissionTypeCheck }}</template>
            </el-table-column>
            <el-table-column label="操作" width="250px" align="center" >
              <template slot-scope="scope">
                <el-button  type="primary"   @click="showPermissionModal(scope.row)"  size="mini" >修改</el-button>
                <el-button  type="danger"  size="mini"  @click="subDelete(scope.row)"  >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <pcModal  v-if="btnaddthreeModuleModal"   width="570px"  title="添加三级菜单操作权限"   @closeModal="btnaddthreeModuleModal = false" >
      <addthreechildModule :add="add" :childModuleId="this.childId"  @shuaxin="beforeInit()"  @closedialog="btnaddthreeModuleModal = false" ></addthreechildModule>
    </pcModal>
  </div>
</template>
<script>
export default {
  name: "",
  props: ["childId"],
  components: {
    addthreechildModule: () => import("./addthreechildModule.vue")
  },
  data() {
    return {
      show: false,
      childrenMenuid: "",
      modulethreetabledata: [],
      btnaddthreeModuleModal: false
    };
  },
  beforeMount() {
    this.beforeInit();
  },
  methods: {
    beforeInit() {
      this.loading = true;
      let param= {
        moduleID: this.childId
      }
      this.$api.getMenuPermission(param).then(res =>{
        this.loading = false;
        if (res.success) {
          this.modulethreetabledata = res.data;
        }
      }).catch(err =>{
        this.$message({
          message: '请求失败!',
          type: "error"
        });
      })
    },
    subDelete: function(obj) {
      this.$messageBox.confirm(
          "您确定删除 `" + obj.permissionTitle + "` 该权限吗?",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        )
        .then(async() => {
          let param= {
              moduleID:obj.moduleID,
              permissionValue:obj.permissionValue,
              id:obj.id
            }
          this.$api.removeMenuPermission(param).then(res =>{
            if (res.success) {
              this.$refs[id].doClose();
              this.beforeInit();
              this.$message({
                message: res.message,
                type: "success"
              });
            } else {
              this.$refs[id].doClose();
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
        });
    },
    showPermissionModal(obj) {
      //添加或修改三级权限
      this.add=true;
      if(''!=obj){
        this.add=false;
      this.$store.commit('setObject',JSON.stringify(obj));
      }
      this.btnaddthreeModuleModal=true;
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
