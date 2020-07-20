<template>
  <div class="app-container">
    <h3 class="showTit">用户绑定记录</h3>
    <el-row :gutter="32">
      <el-form ref="form" :model="form">
        <el-col :xs="12" :sm="6" :lg="3">
          <el-input v-model.trim="form.userid" size="small" placeholder="用户ID" clearable></el-input>
        </el-col>
        <el-col :xs="12" :sm="6" :lg="3">
          <el-input v-model.trim="form.nickname" size="small" placeholder="昵称" clearable></el-input>
        </el-col>
        <el-col :xs="12" :sm="6" :lg="3">
          <el-input v-model.trim="form.qq" size="small" placeholder="QQ" clearable></el-input>
        </el-col>
        <el-col :xs="12" :sm="6" :lg="3">
          <el-input v-model.trim="form.email" size="small" placeholder="Email" clearable></el-input>
        </el-col>
        <el-col :xs="12" :sm="6" :lg="3">
          <el-input v-model.trim="form.tel" size="small" placeholder="电话" clearable></el-input>
        </el-col>
        <el-col :xs="12" :sm="6" :lg="4">
          <el-date-picker v-model="form.beginTime" size="small" align="right" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="开始日期" clearable>
          </el-date-picker>
        </el-col>
        <el-col :xs="12" :sm="6" :lg="4">
          <el-date-picker v-model="form.endTime" size="small" align="right" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="结束日期" clearable>
          </el-date-picker>
        </el-col>
         <el-col :xs="24" :sm="24" :lg="6" v-has="'accountsBindInfo_search'">
          <el-button type="primary" size="small" @click="onSubmit(1)">查询</el-button>
          <el-button type="primary" size="small"  @click="beforeOneDay()" >向前一天</el-button>
          <el-button type="primary" size="small"  @click="afterOneDay()">向后一天</el-button>
        </el-col>
      </el-form>
    </el-row>

    <el-row :gutter="32">
      <el-col :span="24">
        <el-table :data="tableData" style="width: 100%;margin-top:10px;" :cell-style="cellStyle" :header-cell-style="rowClass" border v-loading="tableloading">
          <el-table-column prop="userID" label="用户ID"></el-table-column>
          <el-table-column prop="gameID" label="游戏ID">
            <template slot-scope="scope">
              <span style="color:#1890ff;cursor: pointer;" @click="openNewWin(scope.row.gameID)">{{ scope.row.gameID }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="nickname" label="昵称">
            <template slot-scope="scope">{{ scope.row.nickname | null2empty }}</template>
          </el-table-column>
          <el-table-column prop="mobilePhone" label="电话">
            <template slot-scope="scope">{{ scope.row.mobilePhone | checkMobiphone }}</template>
          </el-table-column>
          <el-table-column prop="qq" label="QQ">
            <template slot-scope="scope">{{ scope.row.qq | null2empty }}</template>
          </el-table-column>
          <el-table-column prop="email" label="邮箱">
            <template slot-scope="scope">{{ scope.row.email | checkEmail }}</template>
          </el-table-column>
          <el-table-column prop="registerdate" label="注册时间" width="160px">
            <template slot-scope="scope">{{ scope.row.registerdate | null2empty }}</template>
          </el-table-column>
          <el-table-column prop="modifiedTime" label="绑定时间" width="160px"></el-table-column>
          <el-table-column prop="" label="操作" width="220px">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" v-has="'accountsBindInfo_updatepasswd'" @click="formdata=scope.row,editPasswdModal=true">修改密码</el-button>
              <div class="showbuttonclass" v-show="scope.row.mobilePhone != 'DEREGISTED'">
               <el-button type="danger" size="mini" v-has="'accountsBindInfo_unbindphone'"  @click="handelPhone(scope.row)">{{scope.row.mobilephone}}解绑手机</el-button>
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

    <!--修改密码-->
    <pcModal v-if="editPasswdModal" :xs="8" :sm="8" :lg="2" :title="'修改密码'" @closeModal="editPasswdModal = false">
      <editPasswdcontent :getdata="formdata" @shuaxin="onSubmit(1)" @closedialog="editPasswdModal = false"></editPasswdcontent>
    </pcModal>

     <!--解绑手机-->
    <pcModal v-if="accountsUnbindPhone" :xs="8" :sm="8" :lg="2" :title="'解绑手机'" @closeModal="accountsUnbindPhone = false">
      <accountsUnbindPhoneDialog :getdata="formdata" @shuaxin="onSubmit(1)" @closedialog="accountsUnbindPhone = false"></accountsUnbindPhoneDialog>
    </pcModal>

  </div>
</template>

<script>
    export default {
        name: "accountsBindInfo",
        components: {
          editPasswdcontent: () => import("./editPasswdcontent"),
          accountsUnbindPhoneDialog: () => import("./accountsUnbindPhoneModule")
        },
        data(){
          return{
            currentPage: 1, //初始页
            pagesize: 30, //    每页的数据
            total: 0,
            currentTotal:0,
            form: {
              userid: '',
              nickname: '',
              qq: '',
              email: '',
              tel: '',
              beginTime:this.moment(new Date(new Date().setHours(0, 0, 0, 0))).format("YYYY-MM-DD"),
              endTime:this.moment(new Date()).format("YYYY-MM-DD")
            },
            tableData: [],
            editPasswdModal: false,
            formdata:[],
            accountsUnbindPhone:false,
            tableloading:false
          }
        },
        methods:{
            cellStyle(row,column,rowIndex,columnIndex){
              return 'text-align:center;padding:6px 0';
            },
            rowClass({row,rowIndex}){
              return 'text-align:center;padding:6px 0';
            },
            onSubmit(pageNum){
              //userID，nickname，qq，email，mobilePhone，beginTime, endTime, currentPage, limit
              let param = {
                userID:this.form.userid,
                nickname:this.form.nickname,
                qq:this.form.qq,
                email:this.form.email,
                mobilePhone:this.form.tel,
                beginTime:this.form.beginTime,
                endTime:this.form.endTime,
                currentPage:pageNum,
                limit:this.pagesize
              };
              this.tableloading=true;
              this.$api.accountsBindInfosearch(param).then(res =>{
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
            beforeOneDay(){
              if((this.form.beginTime == "" || this.form.beginTime == null) && (this.form.endTime == "" || this.form.endTime == null)){
                this.form.beginTime=this.moment(new Date()).format("YYYY-MM-DD");
                this.form.endTime=this.moment(new Date()).format("YYYY-MM-DD");
              }else{
                this.form.beginTime=this.moment(this.form.beginTime).subtract(1, 'days').format("YYYY-MM-DD");
                this.form.endTime=this.moment(this.form.endTime).subtract(1, 'days').format("YYYY-MM-DD");
              }
             
              this.onSubmit(1);
            },
            afterOneDay(){
              if((this.form.beginTime == "" || this.form.beginTime == null) && (this.form.endTime == "" || this.form.endTime == null)){
                this.form.beginTime=this.moment(new Date()).format("YYYY-MM-DD");
                this.form.endTime=this.moment(new Date()).format("YYYY-MM-DD");
              }else{
                this.form.beginTime=this.moment(this.form.beginTime).add(1, 'days').format("YYYY-MM-DD");
                this.form.endTime=this.moment(this.form.endTime).add(1, 'days').format("YYYY-MM-DD");
              }
              this.onSubmit(1);
            },
            handelPhone(data){
               this.$confirm('此操作将同时解除手机绑定和微信绑定，确认执行？', '操作提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(() => {
                  this.accountsUnbindPhone= true;
                  this.formdata=data;
                }).catch(e=>e);
            },
            openNewWin(data){
              const {href} = this.$router.resolve({
                path: '/userbaseinfo',
                query: {
                  gameID: data
                }
              })
              window.open(href, '_blank')
            }
        }
    }
</script>

<style scoped>
.el-date-editor.el-input, .el-date-editor.el-input__inner{
    width:100%;
}
</style>
