<template>
  <div class="app-container">
    <h3 class="showTit">手机公告管理</h3>
    <div class="head-container">
            <el-row :gutter="32">
                <el-button type="danger" size="small" v-has="'systemAnnouncement_delete'" @click="onClearn">删除</el-button>
                <el-button type="primary" size="small" v-has="'systemAnnouncement_add'"  @click="formdata=' ',showAddModuledialog=true,isAdd=true" >创建新公告</el-button>
            </el-row>
        </div>

     <el-row :gutter="32">
       <el-col :span="24">
        <el-table class="maintable" ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" :cell-style="cellStyle" :header-cell-style="rowClass" border v-loading="tableloading">
          <el-table-column type="selection"  width="50"></el-table-column>
          <el-table-column prop="id" label="公告ID" width="80px"> </el-table-column>
          <el-table-column prop="theme" label="主题"  width="150px"></el-table-column>
          <el-table-column prop="content" label="内容" show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.content | null2empty }}</template>
          </el-table-column>
          <el-table-column prop="msgType" label="公告状态" width="50px">
             <template slot-scope="scope">{{ scope.row.msgType | null2empty }}</template>
          </el-table-column>
          <el-table-column label="操作" width="100px">
            <template slot-scope="scope">
              <el-button size="mini" style="margin-bottom:0px;" v-has="'systemAnnouncement_update'" type="danger" @click="formdata=scope.row,showAddModuledialog=true,isAdd=false">修改</el-button>
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

     <!--创建新公告 和编辑 弹框-->
        <pcModal v-if="showAddModuledialog" width="650px" :title="isAdd ? '创建新公告' : '编辑公告'" @closeModal="showAddModuledialog = false">
            <addsystemAnnouncementModule :getdata="formdata" :isAdd="isAdd" @shuaxin="onSubmit(1)"  @closedialog="showAddModuledialog = false"></addsystemAnnouncementModule>
        </pcModal>
  </div>
</template>

<script>
    export default {
        name: "",
        components:{
          addsystemAnnouncementModule:() => import('./addsystemAnnouncementModule.vue')
        },
        data(){
          return{
            currentPage: 1, //初始页
            pagesize: 30, //    每页的数据
            total: 0,
            currentTotal:0,
            tableData: [],
            multipleSelection: [],
            selectData:[],
            showAddModuledialog:false,
            tableloading:false
          }
        },
        mounted(){
          this.onSubmit(1);
        },
        methods:{
          cellStyle(row,column,rowIndex,columnIndex){
            return 'text-align:center;padding:5px 0;';
          },
          rowClass({row,rowIndex}){
            return 'text-align:center;padding:5px 0;';
          },
          onSubmit(pageNum){
            let params = {
              currentPage: pageNum,
              limit: this.pagesize
            };
            this.tableloading=true;
            this.$api.systemAnnouncementsearch(params).then(res =>{
              if (res.success) {
                this.tableData = res.data.records;
                this.tableloading=false;
                this.total = res.data.total; //size
                this.pagesize=res.data.size;
                this.currentPage = res.data.current;
                this.currentTotal=(this.currentPage) * (this.pagesize)
                if(this.currentTotal > this.total){
                  this.currentTotal = this.total
                }else{
                  this.currentTotal=(this.currentPage) * (this.pagesize)
                }
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
          handleSelectionChange (val) { //table有选择框的话需要添加次事件
              this.multipleSelection = val;
          },
          onClearn(){
              this.selectData =  this.multipleSelection.map((item,index)=>{return item.id}).join(";");
              this.$prompt('确定要删除？', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  inputValue:this.selectData,
                  inputValidator:function(inputValue){
                      if(inputValue == "" ||inputValue == null){
                          return "请输入用户ID"
                      }
                  },
                  inputPlaceholder:'多个ID 用;隔开/ -1代表踢全部'
              }).then(async({ value }) => {
                let param={ids:value}
                this.$api.systemAnnouncementdelete(param).then(res =>{
                  if (res.success) {
                    this.$message({
                        type: 'success',
                        message: res.message
                    });
                    this.onSubmit(1);
                  }else{
                    this.$message({
                        type: 'error',
                        message: res.message
                    });
                  }
                }).catch(err =>{
                  this.$message({
                    message: '请求失败!',
                    type: "error"
                  });
                })
              }).catch(e=>e);
          },
          handleCurrentChange: function(currentPage) {
            this.currentPage = currentPage;
            this.onSubmit(currentPage);
          },
        }
    }
</script>

<style  scoped>
</style>
