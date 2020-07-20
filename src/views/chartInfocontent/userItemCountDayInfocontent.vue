<template>
<div class="app-container">
  <el-form :model="form" :inline="true" ref="form" label-width="120px" class="demo-ruleForm">
    <el-col :xs="24" :sm="6" :lg="2">
      <el-input v-model.trim="form.userid" size="small" clearable placeholder="用户ID"></el-input>
    </el-col>
    <el-col :xs="24" :sm="6" :lg="2">
      <el-button type="primary" size="small" @click="onSubmit(1)">查询</el-button>
    </el-col>
  </el-form>
  <el-table :data="tableData" style="width: 100%" :cell-style="cellStyle" :header-cell-style="rowClass">
    <el-table-column prop="exe_time" label="日期" show-overflow-tooltip></el-table-column>
    <el-table-column prop="" label="用户" show-overflow-tooltip></el-table-column>
    <el-table-column prop="itemid" label="道具" show-overflow-tooltip></el-table-column>
    <el-table-column prop="state" label="状态" show-overflow-tooltip></el-table-column>
    <el-table-column prop="" label="操作" show-overflow-tooltip></el-table-column>
    <el-table-column prop="num" label="数量" show-overflow-tooltip></el-table-column>
  </el-table>
  <div slot="footer" class="dialog-footer">
    <el-button size="small" @click="cancel">Close</el-button>
  </div>
</div>
</template>

<script>
export default {
  name: "",
  props: ['getdata'],
  data() {
    return {
      form: {
        userid: ''
      },
      tableData: [
        {
          "uid": null,
          "exe_time": "2019-10-24",
          "item1": null,
          "item2": null,
          "item3": null,
          "item4": null,
          "item5": null,
          "item6": null,
          "item7": null,
          "item8": null,
          "item9": null,
          "item10": null,
          "awards": null,
          "state": "获取",
          "type": "聚宝盆",
          "itemid": "100266",
          "num": 10
        }
      ],
    };
  },
  mounted(){
    this.init()
  },
  methods: {
    init(){
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
.el-form{
  width: 100%;
  float: left;
  margin:3% 0;
}
.el-col{
  width: 30%;
  float: left;
  margin-left:2%;
}
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
