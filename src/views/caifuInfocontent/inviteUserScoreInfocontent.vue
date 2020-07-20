<template>
<div>
    <el-table :data="tableData" style="width: 100%" :cell-style="cellStyle" :header-cell-style="rowClass">
      <el-table-column prop="inviteuserid" label="邀请者用户ID" show-overflow-tooltip></el-table-column>
      <el-table-column prop="inviteusergameid" label="邀请者游戏ID" show-overflow-tooltip></el-table-column>
      <el-table-column prop="inviteuseraccounts" label="邀请者账号" show-overflow-tooltip></el-table-column>
      <el-table-column prop="inviteusernickname" label="邀请者昵称" show-overflow-tooltip></el-table-column>
      <el-table-column prop="inviteduserid" label="被邀请用户ID" show-overflow-tooltip></el-table-column>
      <el-table-column prop="invitedusergameid" label="被邀请游戏ID" show-overflow-tooltip></el-table-column>
      <el-table-column prop="inviteduseraccounts" label="被邀请账号" show-overflow-tooltip></el-table-column>
      <el-table-column prop="invitedusernickname" label="被邀请昵称" show-overflow-tooltip></el-table-column>
      <el-table-column prop="registerDate" label="被邀请注册时间" show-overflow-tooltip></el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" type="primary" @click="cancel">Close</el-button>
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
      //inviterUserid
      let param = {
        inviterUserid:this.getdata.userid
      };
    this.$api.inviteUsersearch(param).then(res =>{
      if (res.success) {
        this.tableData = res.data.records;
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
margin: 5% 0;
}
</style>
