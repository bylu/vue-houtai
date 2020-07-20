<template>
<div>
    <div style="width:90%;margin-left:5%">
      <el-row :gutter="32">
      <el-col :span="24">
          <el-table class="maintable" ref="multipleTable" :data="tableData4" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="房间ID" show-overflow-tooltip>
              <template slot-scope="scope">{{scope.row.serverID}}</template>
            </el-table-column>
            <el-table-column prop="serverName" label="房间名称"></el-table-column>
          </el-table>
          <div style="margin: 20px 0px">
            <el-button size="mini" @click="toggleSelection()">取消选择</el-button>
          </div>
      </el-col>
    </el-row>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button  size="small" @click="cancel">取消</el-button>
      <el-button size="small" type="primary" @click="doSubmit">确认</el-button>
    </div>

</div>
</template>

<script>
export default {
  name: "",
  props: ['setdata'],
  data() {
    return {
        tableData4:[],
        selectData:''
    }
  },
  mounted(){
    this.init();
  },
  methods: {
    init(){
      this.$api.pkMatchConfigsearchFreeRoom(this.form).then(res =>{
        if (res.success) {
            this.tableData4=res.data;
        }else{
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
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange (val) {
        this.multipleSelection = val;
    },
    //取消按钮操作
    cancel() {
      this.$emit('closedialog');
    },
    //确认按钮 提交事件
    doSubmit() {
      this.selectData =  this.multipleSelection.map((item,index)=>{return item.serverID}).join(";");
      let param={
        match_type_id:this.setdata,
        serverids:this.selectData
      }
      this.$api.pkMatchConfigaddRoom(param).then(res =>{
        this.loading = false;
        if (res.success) {
          this.$message({
            message: res.message,
            type: "success"
          });
          this.$emit('shuaxin');
          this.$emit('closedialog');
        }else{
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
  }
};
</script>

<style scoped>
.el-form{
  width:100%;
  float: left;
  margin:5% 0;
}
.el-form-item{
  width:auto;
  float: left;
  margin-bottom:20px;
}
.el-select{
    width:90%;
}
.dialog-footer{
  text-align: right;
  padding-right:3%;
  margin-bottom: 2%;
}
</style>
