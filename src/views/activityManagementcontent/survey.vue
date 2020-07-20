<template>
  <div class="app-container">
    <h3 class="showTit">问卷调查</h3>
    <el-row :gutter="32">
      <el-form ref="form" :model="form">
        <el-col :xs="24" :sm="10" :lg="3">
          <el-input v-model.trim="form.activityId" size="small" placeholder="活动ID" clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="6">
          <el-button type="primary" size="small" v-has="'survey_search'" @click="onSubmit(1)">查询</el-button>
          <el-button type="danger" size="small" v-has="'survey_add'" @click="surveyEditorAddDialog = true,formdata='',isAdd=true">添加</el-button>
          <el-button type="success" size="small" v-has="'survey_aKeyToimport'" @click="addVey= true" >一键导入</el-button>
        </el-col>
      </el-form>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" style="width: 100%" v-loading="tableloading" border :cell-style="cellStyle" :header-cell-style="rowClass">
          <el-table-column prop="activityId" label="活动ID" width="100px;"></el-table-column>
          <el-table-column prop="questionTitle" label="问题题目"></el-table-column>
          <el-table-column prop="" label="是否单选" width="100px;">
            <template slot-scope="scope">{{ scope.row.isMultiChoice | checkSurveycheckbox}}</template>
          </el-table-column>
          <el-table-column prop="" label="操作" width="400px">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" v-has="'survey_modify'" style="margin-bottom:0px"  @click="surveyEditorAddDialog = true,formdata=scope.row,isAdd=false">修改</el-button>
              <el-button size="mini" type="danger" v-has="'survey_delete'" style="margin-bottom:0px" @click="deleteSurvey(scope.row)">删除</el-button>
              <el-button size="mini" type="info" v-has="'survey_optionChild'" style="margin-bottom:0px" @click="surveySearchDialog= true,formdata=scope.row.questionId">查看答案选项</el-button>
               <el-button size="mini" type="warning" v-has="'survey_addChild'" style="margin-bottom:0px" @click="surveyAddQuestionDialog= true,formdata=scope.row">添加答案选项</el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="showpaginationbody">
          <div class="currentTotal">
            {{currentTotal}}<span class="showtotal">/{{total}}</span>
          </div>
          <el-pagination
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[30]"
              :page-size="pagesize"
              layout="total,prev, pager, next, jumper"
              :total="total"
          >
          </el-pagination>
        </div>
      </el-col>
    </el-row>
    <!--添加和编辑 弹框-->
    <pcModal v-if="surveyEditorAddDialog" width="666px" :title="isAdd ? '添加' : '编辑'" @closeModal="surveyEditorAddDialog = false">
        <surveyAddOrUpdate  :isAdd="isAdd" :getdata="formdata" @shuaxin="onSubmit(1)" @closedialog="surveyEditorAddDialog=false"></surveyAddOrUpdate>
    </pcModal>
    <!--查看答案选项 弹框-->
    <pcModal v-if="surveySearchDialog" width="760px" :title="'查看答案选项'" @closeModal="surveySearchDialog = false">
        <surveySearch  :getdata="formdata" @shuaxin="onSubmit(1)" @closedialog="surveySearchDialog=false"></surveySearch>
    </pcModal>
    <!--添加答案选项 弹框-->
    <pcModal v-if="surveyAddQuestionDialog" width="640px" :title="'添加答案选项'" @closeModal="surveyAddQuestionDialog = false">
        <surveyAddQuestion  :getdata="formdata" @shuaxin="onSubmit(1)" @closedialog="surveyAddQuestionDialog=false"></surveyAddQuestion>
    </pcModal>
    <pcModal v-if="addVey" width="40%" :title="'导入'" @closeModal="addVey = false">
        <surveyAdd   @shuaxin="onSubmit(1)" @closedialog="addVey=false"></surveyAdd>
    </pcModal>
  </div>
</template>

<script>
    export default {
        name: "survey",
        components:{
          surveyAddOrUpdate:() => import('./surveyAddOrUpdateModule.vue'),
          surveySearch:() => import('./surveySearchModule.vue'),
          surveyAddQuestion:() => import('./surveyAddQuestionModule.vue'),
          surveyAdd:()=>import('./surveyAdd.vue')
        },
        data(){
            return{
                currentPage: 1, //初始页
                pagesize: 30, //    每页的数据
                total: 0,
                currentTotal:0,
                form: {
                  activityId: '',
                },
                tableData: [],
                isAdd:false,
                formdata:[],
                surveyEditorAddDialog:false,
                surveySearchDialog:false,
                surveyAddQuestionDialog:false,
                tableloading:false,
                addVey:false
            }
        },
        methods:{
            cellStyle(row,column,rowIndex,columnIndex){
              return 'padding:6px 0';
            },
            rowClass({row,rowIndex}){
              return 'padding:6px 0';
            },
            onSubmit(pageNum){
              let param = {
                activityId:this.form.activityId,
                currentPage:pageNum,
                limit:this.pagesize
              };
              this.tableloading=true;
              this.$api.surveySearch(param).then(res =>{
                this.tableloading=false;
                if (res.success) {
                  this.tableData = res.data.records;
                  this.total = res.data.total;
                  this.pagesize=res.data.size;
                  this.currentPage = res.data.current;
                  this.currentTotal=(this.currentPage) * (this.pagesize)
                  if(this.currentTotal > this.total){
                    this.currentTotal = this.total
                  }else{
                    this.currentTotal=(this.currentPage) * (this.pagesize)
                  }
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
            handleCurrentChange: function(currentPage) {
              this.currentPage = currentPage;
              this.onSubmit(currentPage);
            },
            /**
             * 删除操作
             */
            deleteSurvey(data){
              this.$confirm('您确定删除该活动的该条问题吗', '操作提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let param={
                      questionId:data.questionId,
                      activityId:data.activityId
                    }
                    this.$api.surveydelete(param).then(res =>{
                     this.loading = false;
                        if (res.success) {
                          this.$message({
                              showClose: true,
                              message: res.message,
                              type: 'success'
                          });
                          this.onSubmit(1);
                        }else{
                          this.$message({
                            showClose: true,
                            message: res.message,
                            type: 'error'
                          });
                        }
                    }).catch(() => {
                      this.$message({
                          type: 'info',
                          message: '取消输入'
                      });
                    });
                  }).catch(e=>e);
            }
        }
    }
</script>

<style scoped>
.el-date-editor.el-input, .el-date-editor.el-input__inner{
    width:100%;
}
</style>
