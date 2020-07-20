<template>
  <div class="app-container">
    <h3 class="showTit">异常用户管理</h3>
     <el-row :gutter="32">
      <el-form ref="from" :model="form">
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.userid"  size="small"  placeholder="用户ID" clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.gameid" size="small" placeholder="游戏ID" clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="4">
         <el-select v-model="form.statue" size="small" placeholder="全部状态">
           <el-option  v-for="list in selectList.examinstatuslist" :key="list.key" :label="list.value" :value="list.key"></el-option>
         </el-select>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="6">
          <el-button type="primary" size="small" v-has="'blackList_search'" @click="onSubmit(1)">查询</el-button>
          <el-button type="danger" size="small" v-has="'blackList_addBlack'"  @click="showdialogeAdd=true">添加</el-button>
        </el-col>
      </el-form>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-table class="maintable" ref="multipleTable"  :data="tableData" border tooltip-effect="dark" style="width: 100%" v-loading="tableloading" :cell-style="cellStyle" :header-cell-style="rowClass">
          <el-table-column prop="userId" label="用户ID"></el-table-column>
          <el-table-column prop="gameid" label="游戏ID">
            <template slot-scope="scope">
              <span style="color:#1890ff;cursor: pointer;" @click="openNewWin(scope.row.gameid)">{{ scope.row.gameid }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="nickName" label="昵称"></el-table-column>
          <el-table-column prop="type" label="黑名单类型">
            <template slot-scope="scope">{{ scope.row.type | examinstatus}}</template>
          </el-table-column>
          <el-table-column prop="reason" label="黑名单原因"></el-table-column>
          <el-table-column prop="createDate" label="创建时间"></el-table-column>
          <el-table-column label="操作"  width="120">
            <template slot-scope="scope">
              <el-button size="mini" v-has="'blackList_unban'" type="danger" @click="handleOpera(scope.row.userId)">解除黑名单</el-button>
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

     <!--添加 弹框-->
    <pcModal v-if="showdialogeAdd" :xs="8" :sm="8" :lg="2" :title="'添加'" @closeModal="showdialogeAdd = false">
        <addexceptionuser @shuaxin="onSubmit(1)" @closedialog="showdialogeAdd=false"></addexceptionuser>
    </pcModal>
  </div>
</template>

<script>
    import { MessageBox } from 'element-ui'
    export default {
        name: "exceptionuser",
        components:{
           addexceptionuser:() => import('./addexceptionuser.vue')
        },
        data(){
            return{
                currentPage: 1, //初始页
                pagesize: 30, //    每页的数据
                total: 0,
                currentTotal:0,
                statuelist : [
                    { name:'外挂',key:1},
                    { name:'流量/话费兑换',key:2}
                ],
                form: {
                    userid: '',
                    gameid: '',
                    statue:'0'
                },
                tableData: [],
                showdialogeAdd:false,
                tableloading:false
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
            //userId,gameid,currentPage,limit,examinstatus(0全部，1流量，2外挂)
            let param = {
                userId:this.form.userid,
                gameid:this.form.gameid,
                examinstatus:this.form.statue,
                currentPage:pageNum,
                limit:this.pagesize
            };
            this.tableloading=true;
            this.$api.blackListsearch(param).then(res =>{
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
          handleOpera ( row) {
              this.$confirm('确定将用户'+row+'从黑名单中删除？', '解除黑名单', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
              }).then((value) => {
                let param={"userId":row}
                this.$api.blackListupdate(param).then(res =>{
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
                      message: res.data.message,
                      type: 'error'
                    });
                  }
                }).catch(err =>{
                  this.$message({
                    message: '已取消删除!',
                    type: "info"
                  });
                })
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
  .maintable{
    background: #fff;
    -webkit-box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.2);
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.2);
    border-color: rgba(0, 0, 0, 0.2);
  }
</style>
