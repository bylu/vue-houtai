<template>
  <div class="app-container">
    <h3 class="showTit">微信反馈记录</h3>
    <el-row :gutter="32">
      <el-form ref="form" :model="form">
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.feedContent" size="small" placeholder="反馈内容" clearable></el-input>
        </el-col>
        <el-col :xs="12" :sm="6" :lg="3">
          <el-date-picker v-model="form.beginTime" size="small" align="right" clearable type="date" placeholder="开始日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd"></el-date-picker>
        </el-col>
        <el-col :xs="12" :sm="6" :lg="3">
          <el-date-picker v-model="form.endTime" size="small" align="right" clearable type="date" placeholder="结束日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd"></el-date-picker>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="2">
          <el-button type="primary" size="small" @click="onSubmit(1)">查询</el-button>
        </el-col>
      </el-form>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" style="width: 100%" :cell-style="cellStyle" :header-cell-style="rowClass" border v-loading="tableloading">
          <el-table-column prop="id" label="ID" witdh="50px;"></el-table-column>
          <el-table-column prop="serverSign" label="服务器" witdh="50px;"></el-table-column>
          <el-table-column prop="feedContent" label="反馈内容"></el-table-column>
          <el-table-column prop="createTime" label="反馈时间"></el-table-column>
          <el-table-column prop="replyContent" label="回复内容"></el-table-column>
          <el-table-column prop="replyTime" label="回复时间"></el-table-column>
          <el-table-column prop="" label="操作" width="100px">
            <template slot-scope="scope">
              <el-button size="mini" type="warning"  v-if="scope.row.freeze == 0" @click="replyDialog = true,formdata=scope.row">回复</el-button>
              <el-button size="mini" type="text"  v-if="scope.row.freeze == 1">已回复</el-button>
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
     <!--回复 弹框-->
    <pcModal v-if="replyDialog" :xs="8" :sm="8" :lg="2" title="回复" @closeModal="replyDialog = false">
        <replyDialog :getdata="formdata" @shuaxin="onSubmit(1)"  @closedialog="replyDialog = false"></replyDialog>
    </pcModal>
  </div>
</template>

<script>
    export default {
        name: "weChatFeedBack",
        components: {
          replyDialog:() => import('./replyDialogModel.vue')
        },
        data(){
          return{
            currentPage: 1, //初始页
            pagesize: 30, //    每页的数据
            total: 0,
            currentTotal:0,
            form: {
              feedContent:'',
              beginTime:this.moment(new Date()).format("YYYY-MM-DD"),
              endTime:this.moment(new Date()).format("YYYY-MM-DD")
            },
            tableData: [],
            replyDialog:false,
            tableloading:false
          }
        },
        methods:{
            cellStyle(row,column,rowIndex,columnIndex){
              return 'text-align:center';
            },
            rowClass({row,rowIndex}){
              return 'text-align:center;';
            },
            onSubmit(pageNum){
              let param = {
                feedContent:this.form.feedContent,
                beginTime:this.form.beginTime,
                currentPage:pageNum,
                limit:this.pagesize
              };
              this.tableloading=true;
              this.$http({
                url: '',
                method: "post",
                data: param,
                headers: { "Content-Type": "application/json;charset=UTF-8" }
              }).then(res=> {
                if (res.success) {
                  this.tableData = res.data.records;
                  this.tableloading=false;
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
              })
            },
            handleCurrentChange: function(currentPage) {
              this.currentPage = currentPage;
              this.onSubmit(currentPage);
            }
        }
    }
</script>

<style scoped>
.el-date-editor.el-input, .el-date-editor.el-input__inner{
    width:100%;
}
</style>
