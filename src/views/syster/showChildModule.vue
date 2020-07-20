<template>
  <div>
    <el-table v-loading="loading" :data="modulechildtabledata" :cell-style="cellStyle" :header-cell-style="rowClass" highlight-current-row size="small" style="width: 98% !important;margin-left:1%;margin-bottom:3%;">
        <el-table-column prop="moduleID"  label="菜单ID" width="50px" show-overflow-tooltip />
        <el-table-column prop="title" label="模块名称" />
        <el-table-column prop="orderNo" label="显示顺序"  width="40px" show-overflow-tooltip />
        <el-table-column prop="description" label="描述" show-overflow-tooltip/>
        <el-table-column prop="link"  label="访问地址"  />
        <!-- <el-table-column prop="icon" label="图标" show-overflow-tooltip/> -->
        <el-table-column label="状态" width="90px">
            <template slot-scope="scope">
              <el-select v-model='(scope.row.nullity).toString()' @change="watchSelect(scope.row)" size="mini">
                <el-option v-for="item in allstatue" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="160px">
          <template slot-scope="scope">
            <el-button type="primary" @click="childrenMenuid=scope.row.moduleID,showthreeChildModuleModal=true" style="margin-bottom:0px;" size="mini">查看</el-button>
              <el-popover :ref="scope.row.moduleID" placement="top" width="180">
              <p>确定删除本条数据吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button  size="mini"  type="text"    @click="$refs[scope.row.moduleID].doClose()" >取消</el-button>
                <el-button  type="primary"  size="mini"  @click="subDelete(scope.row.moduleID)" >确定</el-button>
              </div>
              <el-button  slot="reference"  type="danger"  icon="el-icon-delete" style="margin-bottom:0px;"  size="mini"/>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <pcModal v-if="showthreeChildModuleModal" width="876px" title="查看三级菜单操作权限" @closeModal="showthreeChildModuleModal = false">
          <showthreechildModule :childId="childrenMenuid" @closedialog="showthreeChildModuleModal = false"></showthreechildModule>
      </pcModal>
  </div>
</template>
<script>
export default {
  name: "",
  props:['parentId'],
  components: {
     showthreechildModule:()=>import('./showthreechildModule.vue')
  },
  data() {
    return {
      loading: false,
      modulechildtabledata: [],
      allstatue : [
          { label:'正常',value:"0"},
          { label:'冻结',value:"1"}
      ],
      formdata:'',
      childrenMenuid:'',
      showthreeChildModuleModal:false,
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
      let param= {
        parentID :this.parentId
      }
      this.$api.getChildrenMenu(param).then(res =>{
        this.loading = false;
        if (res.success) {
          this.modulechildtabledata = res.data;
        }
      }).catch(err =>{
        this.$message({
          message: '请求失败!',
          type: "error"
        });
      })
    },
    watchSelect(val){
    //   let form={
    //     childrenMenu:val.menuId,
    //     menuStatus:val.menuStatus
    //   }
    //  let url = this.paramUrl;
    //   this.$http({
    //     url: url.saveChildrenMenu ,
    //     method: "post",
    //     data:form
    //   }).then(res => {
    //     this.loading = false;
    //     if (res.success) {
    //      // ;
    //       this.$message({
    //         message: res.message,
    //         type: "success"
    //       });
    //       this.$emit('shuaxin');
    //       this.$emit('closedialog');
    //     }else{
    //       this.$message({
    //         message: res.message,
    //         type: "error"
    //       });
    //       this.$emit('closedialog');
    //     }
    //   });
    },
    subDelete: function(id) {
      let param= {
        moduleID: parseInt(id)
      }
      this.$api.removeChildrenMenu(param).then(res =>{
        if (res.success) {
          this.$refs[id].doClose();
          this.beforeInit(1);
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
.el-select{
  margin-bottom: 0px;
}
</style>
