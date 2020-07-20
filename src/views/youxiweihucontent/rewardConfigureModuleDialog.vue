<template>
<div>
   <div  class="dialogTable">
        <el-row :gutter="32">
            <el-col :xs="12" :sm="6" :lg="3">
                <el-button type="danger" size="small"  @click="btnAdd()">添加</el-button>
            </el-col>
        </el-row>

        <el-row :gutter="32">
            <el-table
                class="maintable"
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%" size="small"
                border v-loading="loading" :cell-style="cellStyle" :header-cell-style="rowClass"
            >
                <el-table-column label="classifyId" prop="classifyId" v-if="tablehide"></el-table-column>
                <el-table-column label="奖励配置id" v-if="tablehide" prop="matchConfigId"></el-table-column>
                <el-table-column prop="" label="名次" show-overflow-tooltip>
                    <template slot-scope="scope">
                        {{scope.row.ranking}}-{{scope.row.maxranking}}
                    </template>
                </el-table-column>
                <el-table-column prop="score" label="分数" show-overflow-tooltip></el-table-column>
                <el-table-column prop="retailVouchers" label="奖券" show-overflow-tooltip></el-table-column>
                <el-table-column prop="experience" label="经验" show-overflow-tooltip></el-table-column>
                <el-table-column prop="items" label="配置" show-overflow-tooltip></el-table-column>
                <el-table-column prop="prizedesp" label="说明" show-overflow-tooltip></el-table-column>
                <el-table-column label="操作"  width="160">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" style="margin-bottom:0px;"  @click="formdata=scope.row,showrewardAddModuledialog=true,isAdd=false">修改</el-button>
                        <el-popover :ref="`popover-${scope.$index}`" placement="top" width="180">
                            <p>确定删除本条数据吗？</p>
                            <div style="text-align: right; margin: 0">
                                <el-button size="mini" type="text" @click="scope._self.$refs[`popover-${scope.$index}`].doClose()">取消</el-button>
                                <el-button type="primary" size="mini" @click="subDelete(scope.$index,scope.row)">确定</el-button>
                            </div>
                            <el-button slot="reference" type="danger" style="margin-bottom:0px;" size="mini">删除</el-button>
                        </el-popover>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="plain" size="small" @click="cancel">取消</el-button>
    </div>

    <pcModal v-if="showrewardAddModuledialog"  :xs="8" :sm="8" :lg="2" :title="isAdd ? '比赛奖励增加' : '修改比赛奖励'"  @closeModal="showrewardAddModuledialog = false">
        <showrewardAddModuledialog  :getdata="formdata" :isAdd="isAdd" @shuaxin = "searchInit()"  @closedialog="showrewardAddModuledialog = false"></showrewardAddModuledialog>
    </pcModal>

</div>
</template>

<script>
export default {
  name: "",
  props: ['getdata'],
  components:{
      showrewardAddModuledialog:() => import('./showrewardAddModuledialog.vue')
  },
  data() {
    return {
       tablehide:false,
       tableData:[],
       showrewardAddModuledialog:false,
       loading:false,
       formdata:""
    }
  },
  mounted(){
    this.searchInit()
  },
  methods: {
    cellStyle(row,column,rowIndex,columnIndex){
      return 'padding:4px 0';
    },
    rowClass({row,rowIndex}){
      return 'padding:4px 0';
    },
    searchInit(){
      this.loading=true;
      let param={"matchConfigId":this.getdata.id}
      this.$api.pkMatchConfigsearchMatchPrize(param).then(res =>{
        if (res.success) {
          this.tableData = res.data;
          this.loading = false;
        }else{
          this.$message({
              message: res.message,
              type: "error"
          });
          this.loading=false;
        }
      }).catch(err =>{
        this.$message({
          message: '请求失败!',
          type: "error"
        });
      })
    },
    btnAdd(){
        this.formdata=this.getdata.id,
        this.showrewardAddModuledialog=true,
        this.isAdd=true
    },
    //取消按钮操作
    cancel() {
      this.$emit('closedialog');
    },
    subDelete: function(ind,data) {
      let matchConfigId=data.matchConfigId;
      let param={
        "matchConfigId":data.matchConfigId,
        "ranking":data.ranking,
        "maxranking":data.maxranking,
        }
      this.$api.pkMatchConfigdelPrize(param).then(res =>{
        if (res.success) {
          this.$refs[`popover-${ind}`].doClose();
          this.searchInit();
          this.$notify({
              title: res.message,
              type: "success",
              duration: 2500
          });
        } else {
          this.$refs[`popover-${ind}`].doClose();
          this.$notify({
              title: res.message,
              type: "error",
              duration: 2500
          });
        }
      })
    },
  }
};
</script>

<style scoped>
.dialogTable{
  width:94%;
  float: left;
  margin:1% 3%;
}
.el-table{
    margin-top:1%;
}
.dialog-footer{
  text-align: right;
  padding-right:3%;
  margin-bottom: 2%;
}
</style>
