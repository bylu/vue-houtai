<template>
<div>
    <el-table :data="tableData" style="width: 100%" :cell-style="cellStyle" :header-cell-style="rowClass" border>
      <el-table-column prop="costs" label="add_score"></el-table-column>
      <el-table-column prop="skillId" label="awardId">
        <template slot-scope="scope"> {{scope.row.skillId | nameSkillUseLog }}</template>
      </el-table-column>
      <el-table-column prop="total" label="total"></el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer">
      <el-button :loading="loading" @click="cancel" type="primary" size="small">Close</el-button>
    </div>
</div>
</template>

<script>
export default {
  name: "",
  props: ['getdata'],
  data() {
    return {
      loading: false,
      tableData: [],
    };
  },
  mounted(){
    this.init()
  },
  methods: {
    cellStyle(row,column,rowIndex,columnIndex){
      return 'text-align:center;padding:6px 0';
    },
    rowClass({row,rowIndex}){
      return 'text-align:center;padding:6px 0';
    },
    init(){
      //beginTime,endTime
      let param = {
        beginTime:this.getdata.beginTime,
        endTime:this.getdata.endTime,
      };
      this.$api.skillUseLogtongji(param).then(res =>{
        if (res.success) {
          this.tableData = res.data;
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
.dialog-footer{
text-align: right;
padding-right:3%;
margin-bottom: 2%;
}
.el-table{
width:100%;
float: left;
margin: 5% 0;
}
</style>
