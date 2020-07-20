<template>
  <div class="app-container">
    <h3 class="showTit">玩家邮件查询</h3>
    <el-row :gutter="32">
      <el-form ref="form" :model="form">
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.userid" size="small" placeholder="用户ID" clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.gameID" size="small" placeholder="游戏ID" clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.nickName" size="small" placeholder="用户昵称" clearable></el-input>
        </el-col>

        <el-col :xs="24" :sm="6" :lg="2">
          <el-button type="primary" size="small" v-has="'userMail_search'" @click="onSubmit(1)">查询</el-button>
        </el-col>
      </el-form>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" style="width: 100%" :cell-style="cellStyle" :header-cell-style="rowClass" border v-loading="tableloading">
          <el-table-column prop="iUserId" label="用户ID" width="120px"></el-table-column>
          <el-table-column prop="mailBase.itemStr" label="道具" width="400px"> 
            <template slot-scope="scope">
              <span v-html="JSON.stringify(scope.row.mItem)"></span>
            </template>
          </el-table-column>
          <el-table-column prop="sContent" label="内容"></el-table-column>
          <el-table-column prop="sTime" label="邮件时间" width="130px"></el-table-column>
          <el-table-column prop="recvAwardDate" label="领取时间" width="100px">
            <template slot-scope="scope">{{ scope.row.recvAwardDate | null2empty }}</template>
          </el-table-column>
          <el-table-column  label="状态" width="70px">
            <template slot-scope="scope">{{ scope.row.read | isRead }}</template>
          </el-table-column>
        </el-table>

      </el-col>
    </el-row>
  </div>
</template>

<script>
    export default {
        name: "userMail",
        data(){
          return{
            form: {
              userid: '',
              gameID:'',
              nickName: ''
            },
            tableData: [],
            tableloading:false
          }
        },
        methods:{
            cellStyle(row,column,rowIndex,columnIndex){
              return 'padding:6px 0;';
            },
            rowClass({row,rowIndex}){
              return 'padding:6px 0;';
            },
            onSubmit(pageNum){
              if((this.form.userid == "" || this.form.userid ==null || typeof(this.form.userid) == undefined)&& (this.form.gameID == "" || this.form.gameID ==null || typeof(this.form.gameID) == undefined)&&(this.form.nickName == "" || this.form.nickName ==null || typeof(this.form.nickName) == undefined)){
                this.$message({
                      message: '请输入查询条件',
                      type: "error"
                });
                return
              }
              let param = {
                  userid:this.form.userid,
                  gameID:this.form.gameID,
                  nickName: this.form.nickName,
              };
              this.tableloading=true;
              this.$api.userMailsearch(param).then(res =>{
                if (res.success) {
                    this.tableData = res.data.records;
                    this.tableloading=false;
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
