<template>
  <div>
    <el-table v-loading="loading" :data="modulechildtabledata" highlight-current-row size="small" style="width:96% !important;margin-left:2%" :cell-style="cellStyle" :header-cell-style="rowClass">
        <el-table-column prop="questionId"  label="问题ID"  width="80px" />
        <el-table-column prop="answerId" label="答案ID"  width="80px"  />
        <el-table-column prop="answerContent" label="答案选项"  />
        <el-table-column prop="answerNum" label="提交次数" width="80px" />
        <el-table-column label="操作" align="center" width="160px">
          <template slot-scope="scope">
            <el-button type="primary" @click="surveyChildEditDialog = true,formdata1=scope.row"  style="margin-bottom:0px;" size="mini">修改</el-button>
            <el-popover :ref="scope.row.questionId" placement="top" width="180">
                <p>确定删除本条数据吗？</p>
                <div style="text-align: right; margin: 0">
                    <el-button  size="mini"  type="text"   @click="$refs[scope.row.questionId].doClose()" >取消</el-button>
                    <el-button  type="primary"  size="mini"  @click="subDelete(scope.row.questionId,scope.row.answerId)" >确定</el-button>
                </div>
                <el-button  slot="reference"  type="danger"  style="margin-bottom:0px;"  size="mini">删除</el-button>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <!--查看答案选项的修改事件 弹框-->
      <pcModal v-if="surveyChildEditDialog" width="476px" title="修改答案选项" @closeModal="surveyChildEditDialog = false">
          <surveyChildEditDialog  :getdata="formdata1" @shuaxin="beforeInit()" @closedialog="surveyChildEditDialog = false"></surveyChildEditDialog>
      </pcModal>
  </div>
</template>
<script>
export default {
    name: "",
    props:['getdata'],
    components: {
        surveyChildEditDialog:()=>import('./surveyChildEditModule.vue')
    },
    data() {
        return {
            loading: false,
            modulechildtabledata: [],
            surveyChildEditDialog:false,
        };
    },
    beforeMount() {
        this.beforeInit()
    },
    methods: {
        cellStyle(row,column,rowIndex,columnIndex){
            return 'padding:4px 0;text-align:center';
        },
        rowClass({row,rowIndex}){
            return 'padding:4px 0;text-align:center';
        },
        beforeInit() {
            this.loading = true;
            let param = {
               questionId:this.getdata
            };
            this.$api.surveysearchChildAwswer(param).then(res =>{
                this.loading = false;
                if (res.success) {
                    this.modulechildtabledata = res.data;
                }
            }).catch(err =>{
                this.$message({
                    message: '请求失败!',
                    type: "error"
                });
            })
        },
        subDelete: function(data1,data2) {
            let url = this.paramUrl;
            let param = {
                questionId:data1,
                answerId:data2
            };
            this.$api.surveydeleteChildAwswer(param).then(res =>{
                if (res.success) {
                    this.beforeInit(1);
                    this.$message({
                        message: res.message,
                        type: "success"
                    });
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
        }
    }
};
</script>

<style scoped>
.filter-item {
  margin-bottom: 10px;
}
.el-tree-node__label {
  margin-left: 5px;
}
</style>
