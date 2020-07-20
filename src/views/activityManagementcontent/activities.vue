<template>
  <div class="app-container">
    <h3 class="showTit">活动系统配置</h3>
    <el-row :gutter="32">
      <el-form ref="form" :model="form">
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.value1" size="small" placeholder="活动名称" clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="12">
          <el-button type="primary" v-has="'activities_search'" @click="onSubmit(1,-1)" size="small">查询</el-button>

          <el-button type="warning" v-has="'activities_search'" @click="onSubmit(1,1)" size="small">进行中</el-button>

          <el-button type="danger"  v-has="'activities_search'" plain="" @click="onSubmit(1,2)" size="small">未开始</el-button>

          <el-button type="success" v-has="'activities_search'" plain="" @click="onSubmit(1,3)" size="small">已结束</el-button>

          <el-button type="danger"  v-has="'activities_add'"  @click="formdata='',showActivitiesDialog=true,isAdd=true"  size="small">添加活动</el-button>

          <el-button type="success" v-has="'activities_refresh'" size="small" @click="Refresh">刷新缓存</el-button>
        </el-col>
      </el-form>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" style="width: 100%" v-loading="tableloading" border :row-class-name="tableRowClassName">
            <el-table-column prop="id" label="ID"  width="60"></el-table-column>
            <el-table-column prop="name" label="活动名称" width="120"></el-table-column>
            <el-table-column prop="" label="活动类型" width="100">
              <template slot-scope="scope"><div v-html="checkType(scope.row.type)"></div></template>
            </el-table-column>
            <el-table-column prop="beginTime" label="活动开始时间" width="100"></el-table-column>
            <el-table-column prop="endTime" label="活动结束时间" width="100"></el-table-column>
            <el-table-column prop="vipLimit" label="最低VIP" width="50"></el-table-column>
            <el-table-column prop="levelLimit" label="最低等级" width="50"></el-table-column>
            <el-table-column prop="needFirstCharge" label="限制首充" width="70" >
              <template slot-scope="scope">{{ scope.row.needFirstCharge | needFirstCharge }}</template>
            </el-table-column>
            <el-table-column prop="minRegisteTime" label="最小注册时间" width="100">
              <template slot-scope="scope">{{ scope.row.minRegisteTime | isNull }}</template>
            </el-table-column>
            <el-table-column prop="timeLimitItems" label="时效道具" >
              <template slot-scope="scope">{{ scope.row.timeLimitItems | isNull}}</template>
            </el-table-column>
            <el-table-column prop="timeLimitItemExpireTime" label="时效道具过期时间" width="100">
              <template slot-scope="scope">{{ scope.row.timeLimitItemExpireTime | isNull }}</template>
            </el-table-column>
            <el-table-column prop="" label="配置信息" >
              <template slot-scope="scope">
                <div :title="scope.row.config" v-html="commonJs.splitChart(scope.row.config)"></div>
              </template>
            </el-table-column>
            <el-table-column prop="" label="奖励信息" >
               <template slot-scope="scope">
                 <div :title="scope.row.awards" v-html="commonJs.splitChart(scope.row.awards)"></div>
              </template>
            </el-table-column>
            <el-table-column prop="timeStr" label="活动时间" width="100">
              <template slot-scope="scope">{{ scope.row.timeStr | isNull }}</template>
            </el-table-column>
            <el-table-column prop="tips" label="活动提示" show-overflow-tooltip>
              <template slot-scope="scope"> {{scope.row.tips | null2empty }}</template>
            </el-table-column>
            <el-table-column prop="channel" label="开启渠道" width="240">
              <template slot-scope="scope">{{ scope.row.channel | checkActiveChannel }}</template>
            </el-table-column>
            <el-table-column prop="resourceId" label="资源ID" width="50">
              <template slot-scope="scope"> {{scope.row.resourceId | null2empty }}</template>
            </el-table-column>
            <el-table-column prop="createdAt" label="创建时间" width="100">
              <template slot-scope="scope">{{ scope.row.createdAt | isNull }}</template>
            </el-table-column>
            <el-table-column prop="updatedAt" label="更新时间" width="100">
              <template slot-scope="scope">{{ scope.row.updatedAt | isNull }}</template>
            </el-table-column>
            <el-table-column label="操作" width="80"  fixed="right">
                <template slot-scope="scope">
                <el-button size="mini" type="success" v-has="'activities_copy'" @click="formdata=scope.row,copyActivitiesDialog=true,isAdd=false" >复制</el-button>
                <el-popover :ref="scope.row.id" placement="top" width="180">
                    <p>确定删除本条数据吗？</p>
                    <div style="text-align: right; margin: 0">
                        <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
                        <el-button type="primary" size="mini" @click="subDelete(scope.row.id)">确定</el-button>
                    </div>
                    <el-button slot="reference" type="danger" v-has="'activities_delete'"  size="mini">删除</el-button>
                </el-popover>
                <div v-show=" new Date().getTime() < new Date(scope.row.endTime).getTime()+24*60*60*1000" class="showbuttonclass">
                  <el-button size="mini" v-has="'activities_update'" type="primary"  @click="formdata=scope.row,showActivitiesDialog=true,isAdd=false" >修改</el-button>
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
    <pcModal v-if="showActivitiesDialog" width="820px" :title="isAdd ? '添加活动' : '修改'" @closeModal="showActivitiesDialog = false">
        <showActivitiesDialogmodule :getdata="formdata" :isAdd="isAdd" @shuaxin="onSubmit(1,-1)"  @closedialog="showActivitiesDialog = false"></showActivitiesDialogmodule>
    </pcModal>

    <!--复制 弹框-->
    <pcModal v-if="copyActivitiesDialog" :xs="8" :sm="8" :lg="2" :title="'复制'" @closeModal="copyActivitiesDialog = false">
        <copyActivitiesDialogmodule :getdata="formdata" @shuaxin="onSubmit(1,-1)"  @closedialog="copyActivitiesDialog = false"></copyActivitiesDialogmodule>
    </pcModal>

  </div>
</template>

<script>
    export default {
        name: "activities",
        components: {
          showActivitiesDialogmodule:() => import('./showActivitiesModule.vue'),
          copyActivitiesDialogmodule:() => import('./copyActivitiesModule.vue')
        },
        data(){
          return{
            currentPage: 1, //初始页
            pagesize: 30, //    每页的数据
            total: 0,
            currentTotal:0,
            form: {
              value1: ''
            },
            tableData: [],
            isAdd: false,
            showActivitiesDialog:false,
            copyActivitiesDialog:false,
            submitTypeid:-1,
            tableloading:false,
            checkTypelist:[],
          }
        },
        mounted(){
          this.onSubmit(1,-1);
          this.searchList();
        },
        methods:{
            tableRowClassName({row, rowIndex}) {
              const { beginTime, endTime } = row;
              if(new Date().getTime() >= new Date(beginTime).getTime() && new Date().getTime() < new Date(endTime).getTime()){
                return 'exact-row';
              }
              return '';
            },
            onSubmit(pageNum,typeid){
              //name, status(-1查询，1进行中，2未开始，3已结束),limit,currentPage
              this.submitTypeid=typeid;
              let param = {
                name:this.form.value1,
                status:this.submitTypeid,
                currentPage:pageNum,
                limit:this.pagesize
              };
              this.tableloading=true;
              this.$api.activitiessearch(param).then(res =>{
                this.tableloading=false;
                if (res.success) {
                  this.tableData = res.data.records;
                  this.total = res.data.total; //size
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
            searchList(){
              this.$api.activitiesreloadType().then(res =>{
                if (res.success) {
                    this.checkTypelist = res.data.records;
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
            checkType(data){
              for(let i= 0;i<this.checkTypelist.length;i++){
                return this.checkTypelist[i][data];
              }
            },
            handleCurrentChange: function(currentPage) {
              this.currentPage = currentPage;
              this.onSubmit(currentPage,this.submitTypeid);
            },
            subDelete: function(id) {
              let param = {
                id:id
              };
              this.$api.activitiesdelete(param).then(res =>{
                if (res.success) {
                  this.$refs[id].doClose();
                    this.onSubmit(1,-1);
                    this.$notify({
                        title: res.message,
                        type: "success",
                        duration: 2500
                    });
                } else {
                    this.$refs[id].doClose();
                    this.$notify({
                        title: res.message,
                        type: "error",
                        duration: 2500
                    });
                }
              }).catch(err =>{
                this.$message({
                  message: '请求失败!',
                  type: "error"
                });
              })
            },
            Refresh(){
              this.$confirm('您确定要执行刷新缓存操作？', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
              }).then(async() => {
                  this.$api.activitiesrefresh().then(res =>{
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
        }
    }
</script>

<style scope>
.el-date-editor.el-input, .el-date-editor.el-input__inner{
    width:100%;
}
  .el-tooltip__popper{font-size: 14px; max-width:50% }
  .el-table__row.exact-row {
    color: red;
  }
</style>
