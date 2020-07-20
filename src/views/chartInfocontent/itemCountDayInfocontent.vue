<template>
<div>
    <el-table :data="tableData" style="width: 100%" :cell-style="cellStyle" :header-cell-style="rowClass">
      <el-table-column label="日期">
        {{ exe_time }}
      </el-table-column>
      <el-table-column prop="itemid" label="道具"></el-table-column>
      <el-table-column prop="state" label="状态"></el-table-column>
      <el-table-column prop="type" label="操作"></el-table-column>
      <el-table-column prop="num" label="数量"></el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer">
      <el-button :loading="loading" type="primary" size="small" @click="cancel">Close</el-button>
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
      exe_time: '',
    };
  },
  mounted(){
    this.init();
  },
  methods: {
    init(){
      this.exe_time = this.getdata.exeTime;
      //exeDate
      let param = {
        exeDate:this.getdata.exeTime,
      };
      this.$api.userItemCountDaydetail(param).then(res =>{
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
    }
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
margin: 2% 0;
}
</style>
