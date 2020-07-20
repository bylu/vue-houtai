<template>
<div>
    <div slot="header" class="dialog-header">
      <el-button type="danger" @click="setparentId=parentId,formdata='',showConfigureDialog=true,isAdd=true"  size="small">添加配置</el-button>
    </div>

    <el-table :data="tableData" style="width: 100%" :cell-style="cellStyle" :header-cell-style="rowClass">
      <el-table-column prop="id" label="id"></el-table-column>
      <el-table-column prop="name" label="name"></el-table-column>
      <el-table-column prop="ttl" label="ttl"></el-table-column>
      <el-table-column prop="value" label="value"></el-table-column>
      <el-table-column prop="updated_on" label="updated_on"></el-table-column>
      <el-table-column prop="" label="操作">
        <template slot-scope="scope"> 
          <el-button size="mini" type="primary" @click="setparentId=parentId,formdata=scope.row,showConfigureDialog=true,isAdd=false" >修改</el-button>
          <el-button size="mini" type="danger" @click="deleteConfigure(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div slot="footer" class="dialog-footer">
      <el-button type="text" size="small" @click="cancel">取消</el-button>
      <el-button :loading="loading" size="small" type="primary" @click="doSubmit">确认</el-button>
    </div>

    <!--添加和修改 弹框-->
    <pcModal v-if="showConfigureDialog" :xs="8" :sm="8" :lg="2" :title="isAdd ? '添加' : '修改'" @closeModal="showConfigureDialog = false">
        <showConfigureDialogmodule :getdata="formdata" :parentid="setparentId" :isAdd="isAdd" @shuaxin="doSubmit()"  @closedialog="showConfigureDialog = false"></showConfigureDialogmodule>
    </pcModal>

</div>
</template>

<script>
export default {
  name: "",
  components: {
    showConfigureDialogmodule:() => import('./showConfigureDialogmodule.vue')
  },
  props: ['getdata'],
  data() {
    return {
      loading: false,
      tableData: [],
      isAdd: false,
      showConfigureDialog:false,
      parentId:''
    };
  },
  mounted(){
    this.doSubmit();
    this.parentId=this.getdata.id;
  },
  methods: {
    //确认按钮 提交事件
    doSubmit() {
      let param={
        id:this.getdata.id
      }
      this.$http({
        url:this.paramUrl.domaindeploy,
        method: "post",
        data: param,
        headers: { "Content-Type": "application/json;charset=UTF-8" }
      }).then(res => {
        if (res.success) {
          this.tableData = res.data;
        }else{
          this.$message({
            message: res.message,
            type: "error"
          });
        }
      });
    },
    deleteConfigure: function(id) {
      //id,objId
      let param={
        id:id,
        objId:this.parentId
      }
      this.$http({
        url:this.paramUrl.domaindelete,
        method: "post",
        data: param,
        headers: { "Content-Type": "application/json;charset=UTF-8" }
      }).then(res => {
        if (res.success) {
          this.doSubmit();
          this.$notify({
              title: res.message,
              type: "success",
              duration: 2500
          });
        } else {
          this.$notify({
              title: res.message,
              type: "error",
              duration: 2500
          });
        }
      });
    },
    cellStyle(row,column,rowIndex,columnIndex){
      return 'text-align:center';
    },
    rowClass({row,rowIndex}){
      return 'text-align:center;';
    },
    //取消按钮操作
    cancel() {
      this.$emit('closedialog');
    },
  }
};
</script>
<style scoped>
.dialog-header{
text-align: left;
padding-top:1%;
padding-left:3%;
}
.dialog-footer{
text-align: right;
padding-right:3%;
margin-bottom: 2%;
}
.el-table{
width:100%;
float: left;
margin: 3% 0;
}
</style>
