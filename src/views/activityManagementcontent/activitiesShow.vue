<template>
  <div class="app-container">
    <h3 class="showTit">活动菜单管理</h3>
    <el-row :gutter="32">
      <el-form ref="form" :model="form">
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.name" size="small" placeholder="活动名称" clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="12">
          <el-button type="primary" v-has="'activitiesShow_search'" @click="onSubmit(1,-1)" size="small">查询</el-button>
          <el-button type="warning" v-has="'activitiesShow_search'" @click="onSubmit(1,1)" size="small">进行中</el-button>
          <el-button type="danger"  v-has="'activitiesShow_search'" plain="" @click="onSubmit(1,2)" size="small">未开始</el-button>
          <el-button type="success" v-has="'activitiesShow_search'" plain="" @click="onSubmit(1,3)" size="small">已结束</el-button>
          <el-button type="danger"  v-has="'activitiesShow_add'"  @click="formdata='',showActivitiesShowDialog=true,isAdd=true"  size="small">添加活动菜单</el-button>
          <el-button type="success" v-has="'activitiesShow_refresh'" size="small" @click="Refresh">刷新缓存</el-button>
        </el-col>
      </el-form>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" style="width: 100%" border v-loading="tableloading" :row-class-name="tableRowClassName" :cell-style="cellStyle" :header-cell-style="rowClass">
            <el-table-column prop="name" label="名称" width="150"></el-table-column>
            <el-table-column prop="type" label="类型" width="80"></el-table-column>
            <el-table-column prop="showBegin" label="开始时间"  width="100">
              <template slot-scope="scope"> {{scope.row.showBegin | null2Zero }}</template>
            </el-table-column>
            <el-table-column prop="showEnd" label="结束时间"  width="100">
              <template slot-scope="scope"> {{scope.row.showEnd | null2Zero }}</template>
            </el-table-column>
            <el-table-column prop="open" label="是否开放" width="60">
              <template slot-scope="scope">{{scope.row.open | isNull}}</template>
            </el-table-column>
            <el-table-column prop="phone" label="指定手机" width="80">
              <template slot-scope="scope">{{ scope.row.phone | checkPhoneType }}</template>
            </el-table-column>
            <el-table-column prop="" label="版本限定"  width="100">
                <template slot-scope="scope">
                  <div v-html="checkVersion(scope.row.version)"></div>
                </template>
            </el-table-column>
            <el-table-column prop="channel" label="渠道限定" >
                <template slot-scope="scope">
                  <div v-html="checkChannel(scope.row.channel)"></div>
                </template>
            </el-table-column>
            <el-table-column prop="" label="扩展信息" show-overflow-tooltip width="100px">
                <template slot-scope="scope">{{scope.row.extraInfo | null2empty}}</template>
            </el-table-column>
            <el-table-column prop="sortorder" label="顺序号"  width="60"></el-table-column>
            <el-table-column prop="" label="所属活动" width="60">
                <template slot-scope="scope">{{scope.row.actid | isNull}}</template>
            </el-table-column>
            <el-table-column prop="" label="红点" width="60">
                <template slot-scope="scope">{{scope.row.reddot | isNull}}</template>
            </el-table-column>
            <el-table-column label="操作"  width="230px" fixed="right"> 
                <template slot-scope="scope">
                  <el-button size="mini" type="success" v-has="'activitiesShow_copy'" @click="formdata=scope.row,copyActivitiesShowDialog=true" >复制</el-button>
                  <el-button size="mini" type="danger" v-has="'activitiesShow_delete'" @click="subDelete(scope.row.id)" >删除</el-button>
                  <div v-show="new Date().getTime() < new Date(scope.row.showEnd).getTime()+24*60*60*1000" class="showbuttonclass" > 
                    <el-button size="mini" type="primary" v-has="'activitiesShow_update'"  @click="formdata=scope.row,showActivitiesShowDialog=true,isAdd=false" >修改</el-button>
                  </div>
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
    <pcModal v-if="showActivitiesShowDialog" width="762px" :title="isAdd ? '添加活动菜单' : '修改'" @closeModal="showActivitiesShowDialog = false">
        <showActivitiesShowModule :getdata="formdata" :isAdd="isAdd" @shuaxin="onSubmit(1,-1)"  @closedialog="showActivitiesShowDialog = false"></showActivitiesShowModule>
    </pcModal>

     <!--复制 弹框-->
    <pcModal v-if="copyActivitiesShowDialog" :xs="8" :sm="8" :lg="2" title="复制" @closeModal="copyActivitiesShowDialog = false">
        <copyActivitiesShowModule :getdata="formdata"  @shuaxin="onSubmit(1,-1)"  @closedialog="copyActivitiesShowDialog = false"></copyActivitiesShowModule>
    </pcModal>

  </div>
</template>

<script>
    export default {
        name: "activitiesShow",
        components: {
          showActivitiesShowModule:() => import('./showActivitiesShowModule.vue'),
          copyActivitiesShowModule:() => import('./copyActivitiesShowModule.vue')
        },
        data(){
          return{
            currentPage: 1, //初始页
            pagesize: 30, //    每页的数据
            total: 0,
            currentTotal:0,
            form: {
              name: ''
            },
            tableData: [],
            isAdd: false,
            showActivitiesShowDialog:false,
            copyActivitiesShowDialog:false,
            status:-1,
            tableloading:false
          }
        },
        mounted(){
          this.onSubmit(1,-1);
        },
        methods:{
            cellStyle(row,column,rowIndex,columnIndex){
              return 'padding:6px 0';
            },
            rowClass({row,rowIndex}){
              return 'padding:6px 0';
            },
            tableRowClassName({row, rowIndex}) {
              const { showBegin, showEnd } = row;
              if(new Date().getTime() >= new Date(showBegin).getTime() && new Date().getTime() < new Date(showEnd).getTime()){
                return 'exact-row';
              }
              return '';
            },
            onSubmit(pageNum,statusdata){
              this.status=statusdata;
              //name, status(-1查询，1进行中，2未开始，3已结束),limit,currentPage
              let param = {
                name:this.form.name,
                status:this.status,
                currentPage:pageNum,
                limit:this.pagesize
              };
              this.tableloading=true;
              this.$api.activitiesShowsearch(param).then(res =>{
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
                  this.tableloading=false;
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
              this.onSubmit(currentPage,this.status);
            },
            checkVersion(data){
              if(data == null || data == "" || data == "0"){
                return "未限定"
              }else{
                return data;
                // let aa=data.split("#");
                // return this.versionData(aa[0])+aa[1]
              }
            },
            versionData(data){
              if(data == "0"){
                return '未限定'
              }
               if(data == "g"){
                return '大于'
              }
               if(data == "ge"){
                return '大于等于'
              }
               if(data == "e"){
                return '等于'
              }
               if(data == "le"){
                return '小于等于'
              }
               if(data == "l"){
                return '小于'
              }
            },
            checkChannel(data){
              if(data == null || data == "" || data == "0"){
                return "未限定"
              }else{
                return data;
                // let aa=data.split("#");
                // return this.channelData(aa[0])+aa[1]
              }
            },
            channelData(data){
              if(data == "0"){
                return '未限定'
              }
              if(data == "in"){
                return '仅包含'
              }
              if(data == "ex"){
                return '不包含'
              }
            },
            subDelete: function(id) {
                let param = {
                  id:id
                };
                this.$confirm('您确定要执行删除操作？', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(async() => {
                    this.$api.activitiesShowdelete(param).then(res =>{
                      if (res.success) {
                          this.$message({
                              type: 'success',
                              message: res.message
                          });
                          this.onSubmit(1,-1);
                        }else{
                          this.$message({
                              type: 'error',
                              message: res.message
                        });
                      }
                      }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消操作'
                        });
                      });
                  }).catch(e=>e);
            },
            Refresh(){
              this.$confirm('您确定要执行刷新缓存操作？', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
              }).then(async() => {
                  this.$api.activitiesShowrefresh().then(res =>{
                    if (res.success) {
                        this.$message({
                            type: 'success',
                            message: res.message
                        });
                        this.onSubmit(1,-1);
                      }else{
                        this.$message({
                            type: 'error',
                            message: res.message
                      });
                    }
                 }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消操作'
                    });
                 });
                }).catch(e=>e);
            }
        }
    }
</script>

<style>
.el-date-editor.el-input, .el-date-editor.el-input__inner{
    width:100%;
}
  .el-table__row.exact-row {
    color: red;
  }
</style>
