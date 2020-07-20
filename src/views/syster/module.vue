<template>
  <div class="app-container">
    <h3 class="showTit">模块管理</h3>
    <div class="head-container">
      <el-row :gutter="32">
        <div style="display: inline-block;margin: 0px 5px;">
          <el-button size="mini" filter-item type="primary"  v-has="'module_add'" @click="formdata='',showAddModuleModal=true,isAdd=true">新增</el-button>
        </div>
      </el-row>
    </div>
    <el-row>
      <el-col :span="24">
        <el-table v-loading="loading" :data="moduletabledata" :cell-style="cellStyle" :header-cell-style="rowClass" highlight-current-row  style="width: 100%;" border>
          <el-table-column prop="moduleID"  label="模块ID" width="130px" />
          <el-table-column prop="title" label="模块名称" width="130px"/>
          <el-table-column prop="link"  label="衔接地址"  />
          <el-table-column prop="description" label="描述"/>

          <el-table-column prop="nullity" label="状态" >
            <template slot-scope="scope">{{scope.row.nullity | permissiontype }}</template>
          </el-table-column>
          <el-table-column label="操作"  width="450px" align="center" >
            <template slot-scope="scope">
              <el-button type="warning"  size="mini" v-has="'module_addChild'" style="margin-bottom:0px;" @click="menuId=scope.row.moduleID,addChildModuleModal=true">添加子模块</el-button>
              <el-button type="success"  size="mini" v-has="'module_optChild'" style="margin-bottom:0px;" @click="menuId=scope.row.moduleID,showChildModuleModal=true">查看子模块</el-button>
              <!-- <el-button type="primary"  @click="formdata=scope.row,showAddModuleModal=true,isAdd=false" size="mini">编辑</el-button> -->
              <el-popover :ref="scope.row.moduleID" placement="top" width="180">
                  <p>确定删除本条数据吗？</p>
                  <div style="text-align: right; margin: 0">
                      <el-button size="mini" type="text" @click="$refs[scope.row.moduleID].doClose()">取消</el-button>
                      <el-button type="primary" size="mini" @click="subDelete(scope.row.moduleID)">确定</el-button>
                  </div>
                  <el-button slot="reference" type="danger" v-has="'module_delete'" style="margin-bottom:0px;" size="mini">删除</el-button>
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
    <!--新增模块和编辑模块 弹框-->
    <pcModal v-if="showAddModuleModal" :xs="8" :sm="8" :lg="2" :title="isAdd ? '新增' : '编辑'" @closeModal="showAddModuleModal = false">
        <addModule :getdata="formdata" :isAdd="isAdd" @shuaxin="beforeInit"  @closedialog="showAddModuleModal = false"></addModule>
    </pcModal>
     <!-- 添加子模块弹框 -->
    <pcModal v-if="addChildModuleModal" :xs="8" :sm="8" :lg="2" title="添加子模块" @closeModal="addChildModuleModal = false">
        <addchildModule :id="menuId" @shuaxin="beforeInit" @closedialog="addChildModuleModal = false"></addchildModule>
    </pcModal>
    <!--查看子模块-->
    <pcModal v-if="showChildModuleModal" width="895px" title="查看子模块" @closeModal="showChildModuleModal = false">
          <showchildModule :parentId="menuId" @closedialog="showChildModuleModal = false"></showchildModule>
    </pcModal>

  </div>
</template>
<script>
export default {
  name: "module",
  components: {
     addModule:() => import('./addModule.vue'),
     addchildModule:() => import('./addChildModule.vue'),
     showchildModule:()=>import('./showChildModule.vue')
  },
  data() {
    return {
      loading: false,
      currentPage: 1, //初始页
      pagesize: 10, //    每页的数据
      total: 0,
      currentTotal:0,
      moduletabledata: [],
      isAdd: false,
      showAddModuleModal:false,
      addChildModuleModal:false,
      menuId:"",
      showChildModuleModal:false
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
    beforeInit(numpage) {
      this.loading = true;
      const sort = "menuId,desc";
      let params = { isMenu:1, page:numpage, size: this.pagesize, sort: "" };
      this.$api.getMenu(params).then(res =>{
        this.loading = false;
        if (res.success) {
          this.moduletabledata = res.data.records;
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
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      this.beforeInit(this.currentPage);
    },
    subDelete: function(id) {
      let param= {moduleID: id }
      this.$api.removeMenu(param).then(res =>{
        if (res.success) {
          this.$refs[id].doClose();
          this.beforeInit(1);
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
