<template>
    <div class="datacontent">
      <h3 class="title">在线用户--统计</h3>
      <div class="otherdesc">在线用户合计：{{sumAccount| numTenthousand}}</div>
      <template>
        <el-table border :data="tableData" style="width: 100%" :cell-style="cellStyle" :header-cell-style="rowClass">
          <el-table-column prop="serverid" label="房间编号"></el-table-column>
          <el-table-column prop="kindName" label="游戏玩法"></el-table-column>
          <el-table-column prop="servername" label="房间名称"></el-table-column>
          <el-table-column prop="usercount" label="在线用户"></el-table-column>
          <!-- <el-table-column prop="usernum" label="对局人数"></el-table-column> -->
        </el-table>
      </template>
    </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      tableData: [],
      sumAccount:0,
    }
  },
  methods: {
    cellStyle(row,column,rowIndex,columnIndex){
      return 'text-align:center;padding:4px 0';
    },
    rowClass({row,rowIndex}){
      return 'text-align:center;padding:4px 0';
    },
   /**
    * 查询操作
    */
   searchData(){
    this.$api.searchUserByRoom().then(res =>{
      if (res.success) {
        this.tableData = res.data;
        this.sumAccount=res.params
      }
    }).catch(err =>{
      this.$message({
        message: '请求失败!',
        type: "error"
      });
    })
   }
  },
  mounted(){
    this.searchData()
  }
}
</script>

<style scoped>
  .datacontent{
  width:100%;
  float:left;
  margin:0% 0% 2% 0%;
}
 .title{
   width:100%;
   float: left;
   text-align: left;
   margin-bottom:10px;
 }
</style>
