<template>
  <div class="app-container">
    <h3 class="showTit">用户头像审核</h3>
    <el-row :gutter="32">
      <el-form ref="form" :model="form">
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.userid"  size="small" placeholder="用户ID" clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.gameid"  size="small" placeholder="游戏ID" clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="3">
          <el-select v-model="form.statue" size="small" placeholder="全部状态">
            <el-option v-for="list in selectList.allstatuelist" :key="list.key" :label="list.value" :value="list.key"></el-option>
          </el-select>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="2">
          <el-button type="primary" size="small" v-has="'accountsIcon_search'" @click="onSubmit(1)">查询</el-button>
        </el-col>
      </el-form>
    </el-row>

    <el-row>
      <el-col :gutter="32">
        <el-table :data="tableData" style="width: 100%" :cell-style="cellStyle" :header-cell-style="rowClass" border v-loading="tableloading">
          <el-table-column prop="userid" label="用户ID"></el-table-column>
          <el-table-column prop="gameid" label="游戏id">
            <template slot-scope="scope">
              <span style="color:#1890ff;cursor: pointer;" @click="openNewWin(scope.row.gameid)">{{ scope.row.gameid }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="nickName" label="昵称"></el-table-column>
          <el-table-column prop="usestatus" label="用户使用状态">
            <template slot-scope="scope">{{ scope.row.usestatus | iconStatus}}</template>
          </el-table-column>
          <el-table-column prop="iconusage" label="图片用途"></el-table-column>
          <el-table-column label="预览">
            　<template slot-scope="scope"><img :src="scope.row.url" width="100" height="100" /></template>
          </el-table-column>
          <el-table-column prop="examinstatus" label="审核状态">
            <template slot-scope="scope">{{ scope.row.examinstatus | examinStatus}}</template>
          </el-table-column>
          <el-table-column label="操作"  width="200">
            <template slot-scope="scope">
              <el-button size="mini" v-has="'accountsIcon_pass'" @click="handleEdit(scope.$index, scope.row.userid)">通过</el-button>
              <el-button size="mini" v-has="'accountsIcon_unpass'" type="danger" @click="handleDelete(scope.$index, scope.row.userid)">不通过</el-button>
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
  </div>
</template>

<script>
    export default {
        name: "userfaceicon",
        data(){
            return{
                currentPage: 1, //初始页
                pagesize: 30, //    每页的数据
                total: 0,
                currentTotal:0,
                form: {
                    userid: '',
                    gameid: '',
                    statue:'-1'
                },
                tableData: [],
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
              let param = {
                  userid:this.form.userid,
                  gameid:this.form.gameid,
                  examinstatus:this.form.statue,
                  currentPage:pageNum,
                  limit:this.pagesize
              };
              this.tableloading=true;
              this.$api.accountsIconsearch(param).then(res =>{
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
            handleEdit (index, row) {
                let param = {
                  userid:row,
                  gameid:row,
                  examinstatus:"2",
                };
                this.$api.accountsIconupdateExaminstatus(param).then(res =>{
                  if (res.success) {
                    this.$message({
                      message: res.message,
                      type: "success"
                    });
                    this.onSubmit(1);
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
            handleDelete (index, row) {
                let param = {
                  userid:row,
                  gameid:row,
                  examinstatus:"1",
                };
                this.$api.accountsIconupdateExaminstatus(param).then(res =>{
                  if (res.success) {
                    this.$message({
                      message: res.message,
                      type: "success"
                    });
                    this.onSubmit(1);
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
</style>
