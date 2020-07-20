<template>
<div>
    <el-table :data="tableData" style="width: 100%" :cell-style="cellStyle" :header-cell-style="rowClass" border>
      <el-table-column prop="uid" label="用户id"></el-table-column>
      <el-table-column prop="configId" label="比赛名称">
        <template slot-scope="scope"> {{scope.row.configId | configIdStatue }}</template>
      </el-table-column>
      <el-table-column prop="matchid" label="比赛id"></el-table-column>
      <el-table-column prop="fee" label="报名费"></el-table-column>
      <el-table-column prop="cancel" label="已经取消比赛">
        <template slot-scope="scope"> {{scope.row.cancel | isChanneluser }}</template>
      </el-table-column>
      <el-table-column prop="rank" label="排名"></el-table-column>
      <el-table-column prop="score" label="得分"></el-table-column>
      <el-table-column prop="createdAt" label="创建时间" width="160px"></el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" size="small" @click="cancel">Close</el-button>
    </div>
</div>
</template>

<script>
export default {
  name: "",
  props: ['getdata'],
  data() {
    return {
      tableData: [],
    };
  },
  mounted(){
    this.init();
  },
  methods: {
    init(){
      //matchId,beginTime
      let param = {
        matchId:this.getdata.matchId,
        beginTime:this.moment(this.getdata.startTime).format("YYYY-MM-DD")
      };
      this.$api.matchInfosearchMatchBaoming(param).then(res =>{
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
      return 'text-align:center;padding:6px 0';
    },
    rowClass({row,rowIndex}){
      return 'text-align:center;padding:6px 0';
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
margin: 0% 0 1% 0;
}
</style>
