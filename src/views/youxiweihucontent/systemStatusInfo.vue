<template>
  <div class="app-container">
    <h3 class="showTit">系统状态管理</h3>
    <el-row :gutter="32">
      <el-form ref="form" :model="form">
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.statusName" size="small" placeholder="状态名字" clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.statusTip" size="small" placeholder="状态显示名称" clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="4">
          <el-select v-model="form.value2" placeholder="全部" size="small">
            <el-option  v-for="list in selectList.systemStatusInfoList" :key="list.key" :label="list.value" :value="list.key"></el-option>
          </el-select>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="12">
          <el-button type="primary" v-has="'systemStatusInfo_search'" @click="onSubmit(1)" size="small">查询</el-button>
        
          <el-button type="danger" v-has="'systemStatusInfo_add'"  @click="formdata='',showSystemstatusinfoDialog=true,isAdd=true"  size="small">添加</el-button>
        
          <el-button type="success" v-has="'systemStatusInfo_refresh'" size="small" @click="Refresh">刷新缓存</el-button>
        
          <el-button type="warning" size="small" v-has="'systemStatusInfo_winLoseOnOff'" @click="winOrLoseControllerDialog=true">输赢上限开关控制</el-button>
       
          <el-button type="danger" plain="" size="small" v-has="'systemStatusInfo_iosReview'" @click="appleAuditSwitchDialog = true">苹果审核开关</el-button>
        </el-col>
      </el-form>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" :cell-style="cellStyle" :header-cell-style="rowClass" border v-loading="tableloading">
          <el-table-column prop="statusName" label="状态名字"></el-table-column>
          <el-table-column prop="statusTip" label="状态显示名称" ></el-table-column>
          <el-table-column prop="statusValue" label="状态数值" width="50"></el-table-column>
          <el-table-column prop="statusString" label="状态字符" show-overflow-tooltip></el-table-column>
          <el-table-column prop="statusDescription" label="字符描述">
            <template slot-scope="scope"> {{scope.row.statusDescription | null2empty }}</template>
          </el-table-column>
          <!-- <el-table-column prop="" label="沙盒账号" show-overflow-tooltip>
            <template slot-scope="scope">
              <div v-html="shahe(scope.row)"></div>
              <el-button size="mini" type="danger" v-if="scope.row.statusType == 1" @click="openOrCloseClick(scope.row)" >开启</el-button>
            </template>
          </el-table-column> -->
          <el-table-column prop="statusType" label="状态类型" width="110">
            <template slot-scope="scope">
              {{ scope.row.statusType | checkstatusType}}</template>
          </el-table-column>
          <el-table-column label="操作"  width="250px">
            <template slot-scope="scope">
              <div v-show="scope.row.statusType != 1" class="showbuttonclass">
                <el-button size="mini" v-has="'systemStatusInfo_update'" style="margin-bottom:0px"  type="primary" @click="formdata=scope.row,showSystemstatusinfoDialog=true,isAdd=false" >修改</el-button>
              </div>
              <div v-show="scope.row.statusType == 1" class="showbuttonclass">
                <el-button size="mini" v-has="'systemStatusInfo_update'" style="margin-bottom:0px"  type="primary" @click="formdata=scope.row,showSystemstatusinfoDialog1=true,isAdd=false" >修改</el-button>
              </div>
              <el-popover :ref="scope.row.statusName" placement="top" width="180">
                <p>确定删除本条数据吗？</p>
                <div style="text-align: right; margin: 0">
                    <el-button size="mini" type="text" @click="$refs[scope.row.statusName].doClose()">取消</el-button>
                    <el-button type="primary" size="mini" @click="subDelete(scope.row.statusName)">确定</el-button>
                </div>
                <el-button slot="reference" type="danger" style="margin-bottom:0px" v-has="'systemStatusInfo_delete'"  size="mini">删除</el-button>
              </el-popover>
              <el-button size="mini" type="success" style="margin-bottom:0px" v-has="'systemStatusInfo_copy'" @click="formdata=scope.row,systemstatusinfoModifyDialog=true">复制</el-button>
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
    <pcModal v-if="showSystemstatusinfoDialog" width="800px" :title="isAdd ? '添加' : '修改'" @closeModal="showSystemstatusinfoDialog = false">
        <systemStatusinfoDialogmodule :getdata="formdata" :isAdd="isAdd" @shuaxin="onSubmit(1)"  @closedialog="showSystemstatusinfoDialog = false"></systemStatusinfoDialogmodule>
    </pcModal>
    <!--游戏功能开关的类型 编辑-->
    <pcModal v-if="showSystemstatusinfoDialog1" width="800px" :title="isAdd ? '添加' : '修改'" @closeModal="showSystemstatusinfoDialog1 = false">
        <systemStatusinfoDialogmodule1 :getdata="formdata" :isAdd="isAdd" @shuaxin="onSubmit(1)"  @closedialog="showSystemstatusinfoDialog1 = false"></systemStatusinfoDialogmodule1>
    </pcModal>

    <!--复制 弹框-->
    <pcModal v-if="systemstatusinfoModifyDialog" width="800px" :title="'复制'" @closeModal="systemstatusinfoModifyDialog = false">
        <systemStatusinfoModifyModule :getdata="formdata" @shuaxin="onSubmit(1)"  @closedialog="systemstatusinfoModifyDialog = false"></systemStatusinfoModifyModule>
    </pcModal>

    <!--输赢上限开关控制 弹框-->
    <pcModal v-if="winOrLoseControllerDialog" :xs="8" :sm="8" :lg="2" :title="'输赢上限开关控制'" @closeModal="winOrLoseControllerDialog = false">
        <winOrLoseControllerDialog  @shuaxin="onSubmit(1)"  @closedialog="winOrLoseControllerDialog = false"></winOrLoseControllerDialog>
    </pcModal>
    <!--苹果审核开关 弹框-->
    <pcModal v-if="appleAuditSwitchDialog" :xs="8" :sm="8" :lg="2" :title="'苹果审核开关'" @closeModal="appleAuditSwitchDialog = false">
        <appleAuditSwitchDialogModule  @shuaxin="onSubmit(1)"  @closedialog="appleAuditSwitchDialog = false"></appleAuditSwitchDialogModule>
    </pcModal>

  </div>
</template>

<script>
    export default {
      name: "systemStatusInfo",
      components: {
        systemStatusinfoDialogmodule:() => import('./systemStatusinfoModule.vue'),
        systemStatusinfoDialogmodule1:()=>import('./systemStatusinfoModule1.vue'),
        systemStatusinfoModifyModule:() => import('./systemStatusinfoModifyModule.vue'),
        winOrLoseControllerDialog:()=> import('./winOrLoseControllerModule.vue'),
        appleAuditSwitchDialogModule:() => import('./appleAuditSwitchModule.vue')
      },
      data(){
        return{
          currentPage: 1, //初始页
          pagesize: 30, //    每页的数据
          total: 0,
          currentTotal:0,
          form: {
            statusName:'',
            statusTip: '',
            value2: ''
          },
          tableData: [],
          isAdd: false,
          showSystemstatusinfoDialog:false,
          systemstatusinfoModifyDialog:false,
          winOrLoseControllerDialog:false,
          appleAuditSwitchDialog:false,
          showSystemstatusinfoDialog1:false,
          tableloading:false
        }
      },
      mounted() {
        this.onSubmit(1);
      },
      methods:{
        cellStyle(row,column,rowIndex,columnIndex){
          return 'text-align:center;padding:6px 0';
        },
        rowClass({row,rowIndex}){
          return 'text-align:center;padding:6px 0';
        },
        onSubmit(pageNum){
          let param = {   
            statusName:this.form.statusName,
            statusTip:this.form.statusTip,
            statusType:this.form.value2,
            currentPage:pageNum,
            limit:this.pagesize
          };
          this.tableloading=true;
          this.$api.systemStatusInfosearch(param).then(res =>{
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
        shahe(data){
          let statustype=data.statusType;
          let statusName =data.statusName;
          var str="";
          // if(statustype == 1){
          //   this.$http({
          //     url:this.paramUrl.channelSandboxConfigsearch,
          //     method: "post",
          //     data: { statusname: statusName },
          //     headers: { "Content-Type": "application/json;charset=UTF-8" }
          // }).then(res => {
          //     if (res.success) {
          //         str=`<el-button type="danger" @click="closesand(statusname)">关闭</el-button>`;
          //     } else {
          //         str=`<el-button type="danger" @click="opensand(statusname)">开启</el-button>`;
          //     }
          // });
          // }
          return str;
        },
        closesand:function(data){ //
          // this.$http({
          //     url:this.paramUrl.channelSandboxConfigopensand,
          //     method: "post",
          //     data: {
          //       "statusname": data,
          //       "type":"0"
          //     },
          //     headers: { "Content-Type": "application/json;charset=UTF-8" }
          // }).then(res => {
          //     if (res.success) {
          //         this.onSubmit(1);
          //         this.$notify({
          //             title: res.message,
          //             type: "success",
          //             duration: 2500
          //         });
          //     } else {
          //         this.$notify({
          //             title: res.message,
          //             type: "error",
          //             duration: 2500
          //         });
          //     }
          // });
        },
        opensand:function(data){
          // this.$http({
          //     url:this.paramUrl.channelSandboxConfigopensand,
          //     method: "post",
          //     data: {
          //       "statusname": data,
          //       "type":"1"
          //     },
          //     headers: { "Content-Type": "application/json;charset=UTF-8" }
          // }).then(res => {
          //     if (res.success) {
          //         this.onSubmit(1);
          //         this.$notify({
          //             title: res.message,
          //             type: "success",
          //             duration: 2500
          //         });
          //     } else {
          //         this.$notify({
          //             title: res.message,
          //             type: "error",
          //             duration: 2500
          //         });
          //     }
          // });
        },
        subDelete: function(statusName) {
          let param={ statusName: statusName }
          this.$api.systemStatusInfodelete(param).then(res =>{
            if (res.success) {
              this.onSubmit(1);
              this.$notify({
                  title: res.message,
                  type: "success",
                  duration: 2500
              });
            } else {
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
            this.$api.systemStatusInforefresh().then(res =>{
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
        // openOrCloseClick(data){
        //   this.$confirm(data+'您确定要执行此操作？', '关闭操作', {
        //       confirmButtonText: '确定',
        //       cancelButtonText: '取消',
        //       type: 'warning'
        //   }).then(() => {
        //       this.$message({
        //           type: 'success',
        //           message: '刷新成功!'
        //       });
        //       this.onSubmit(1);
        //       }).catch(() => {
        //       this.$message({
        //           type: 'info',
        //           message: '已取消操作'
        //       });
        //   });
        // }
      }
    }
</script>

<style scoped>
.el-table{
   width:99.9%!important;
}
</style>
