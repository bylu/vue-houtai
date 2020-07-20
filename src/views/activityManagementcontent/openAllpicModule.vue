<template>
<div>
    <div style="width:90%;margin-left:5%">
      <el-row :gutter="32">
      <el-col :span="24">
          <el-table class="maintable" ref="multipleTable" :data="tableData4" tooltip-effect="dark" size="mini" style="width: 100%;" @selection-change="handleSelectionChange" :cell-style="cellStyle" :header-cell-style="rowClass">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="图片名称" show-overflow-tooltip>
              <template slot-scope="scope">
                  <el-button size="medium" type="text" style="margin-bottom:0px;" @click="openpic(scope.row.url)">{{scope.row.name}}</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div style="margin: 20px 0px">
            <el-button size="mini"  @click="toggleSelection()">取消选择</el-button>
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
    cellStyle(row,column,rowIndex,columnIndex){
      return 'padding:2px 0';
    },
    rowClass({row,rowIndex}){
      return 'padding:2px 0';
    },
    init(){
      this.$api.gameAdvConfiggetAllImgs(this.form).then(res =>{
        if (res.success) {
            this.tableData4=res.data.records;
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
        this.selectData =  this.multipleSelection.map((item,index)=>{return item.url}).join(";");
        this.$emit('changeData',this.selectData);
        this.$emit('closedialog');
    },
    openpic(data){
      window.open("https://"+data, '_blank')
    }
  }
};
</script>

<style scoped>
.el-form{
  width:100%;
  float: left;
  margin:1% 0 2% 0;
}
.el-form-item{
  width:auto;
  float: left;
  margin-bottom:18px;
}
.dialog-footer{
  text-align: right;
  padding-right:3%;
  margin-bottom: 2%;
}
</style>
