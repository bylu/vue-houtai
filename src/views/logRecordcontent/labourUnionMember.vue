<template>
  <div class="app-container">
    <h3 class="showTit">俱乐部玩家基本信息</h3>
    <el-row :gutter="32">
      <el-form ref="form" :model="form">
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.labourUnionId" size="small" placeholder="俱乐部ID" clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.labourUnionName" size="small" placeholder="俱乐部名称" clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.userId" size="small" placeholder="用户ID" clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.memberNickName" size="small" placeholder="玩家昵称" clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="2">
          <el-button type="primary" size="small" v-has="'labourUnionMember_search'" @click="onSubmit(1)">查询</el-button>
        </el-col>
      </el-form>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" style="width: 100%" :cell-style="cellStyle" :header-cell-style="rowClass" border v-loading="tableloading" @sort-change='sortChange' :header-cell-class-name="handleHeaderCellClass">
          <el-table-column prop="userId" label="用户ID" width="150px">
            <template slot-scope="scope">
              <div v-html="BindUser(scope.row.userId,scope.row.labourUnionId)"></div>
            </template>
          </el-table-column>
          <el-table-column prop="gameID" label="游戏ID">
            <template slot-scope="scope">
              <span style="color:#1890ff;cursor: pointer;" @click="openNewWin(scope.row.gameID)">{{ scope.row.gameID }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="" label="玩家昵称">
            <template slot-scope="scope">
              {{ scope.row.memberNickName | null2Zero }}
            </template>
          </el-table-column>
          <el-table-column prop="labourUnionName" label="俱乐部名称"></el-table-column>
          <el-table-column prop="" label="成员VIP等级" width="100px">
            <template slot-scope="scope">
              {{ scope.row.memberOrder | null2Zero }}
            </template>
          </el-table-column>
          <el-table-column prop="" label="成员捐款幸运豆">
            <template slot-scope="scope">
              {{ scope.row.contributeScore | numTenthousand }}
            </template>
          </el-table-column>
          <el-table-column prop="" label="总活跃度" sortable="true">
            <template slot-scope="scope">
              {{ scope.row.userActivityHistory | numTenthousand }}
            </template>
          </el-table-column>
          <el-table-column prop="dayActivity" label="今日活跃度">
             <template slot-scope="scope">
              {{ scope.row.dayActivity | numTenthousand }}
            </template>
          </el-table-column>
          <el-table-column prop="userHistContribution" label="总贡献度" sortable="true">
            <template slot-scope="scope">
              {{ scope.row.userHistContribution | numTenthousand }}
            </template>
          </el-table-column>
          <el-table-column prop="" label="今日贡献度">
            <template slot-scope="scope">
              {{ scope.row.dayContribution | numTenthousand }}
            </template>
          </el-table-column>
          <el-table-column prop="joinTime" label="加入俱乐部时间" width="160px" sortable="true"></el-table-column>
          <el-table-column prop="" label="操作"  width="150px;">
            <template slot-scope="scope">
              <div class="showbuttonclass" v-show="scope.row.freeze == 0">
                <el-button size="mini" type="warning"  v-has="'labourUnionMember_freeze'"  @click="handleEdit(scope.row.userId,1)">冻结</el-button>
              </div>
              <div class="showbuttonclass" v-show="scope.row.freeze == 1">
                <el-button size="mini" type="success" v-has="'labourUnionMember_freeze'"   @click="handleEdit(scope.row.userId,0)">解冻</el-button>
              </div>
              <el-button size="mini" type="danger" v-has="'labourUnionMember_kickOut'" @click="handleKickOut(scope.row)">踢出</el-button>
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
        name: "labourUnionMember",
        data(){
          return{
            currentPage: 1, //初始页
            pagesize: 30, //    每页的数据
            total: 0,
            currentTotal:0,
            form: {
              labourUnionId: '',
              labourUnionName: '',
              userId: '',
              memberNickName: ''
            },
            tableData: [],
            tableloading:false,
            sort:"",
            sortby:"",
            orderDict:[],
            orderStackSet:[]
          }
        },
        mounted(){
          this.getParams()
        },
        methods:{
            cellStyle(row,column,rowIndex,columnIndex){
              return 'text-align:center;padding:6px 0';
            },
            rowClass({row,rowIndex}){
              return 'text-align:center;padding:6px 0';
            },
            getParams() {
              // 取到路由带过来的参数
              this.form.labourUnionId = this.$route.query.labourUnionId;
              if(this.form.labourUnionId == "" || this.form.labourUnionId ==null || typeof(this.form.labourUnionId) == undefined){

              }else{
                 this.onSubmit(1);
              }
            },
             handleHeaderCellClass({row,column,rowIndex,columnIndex}){
              if(this.orderStackSet.length > 0){
                let arr =this.orderStackSet;
                let currentField =arr[arr.length - 1];
                if(currentField){
                  return this.orderDict[column.property];
                }
              }
              return "";
            },
            sortChange({column,prop,order}){
              this.orderStackSet=this.orderStackSet.filter(item => item != prop);
              if(order != null){
                this.orderDict[prop]=order;
                this.orderStackSet.push(prop);
              }else if(order == null){
                this.orderDict[prop]="";
                this.orderStackSet.push(prop);
              }else{
                delete this.orderDict[prop];
              }
               if(this.orderStackSet.length > 1){
                  let del=this.orderStackSet.splice(0,1);
                  let leftE=del[0];
                  delete this.orderDict[leftE]
              }
             if(this.orderDict[prop] == "descending"){
                  this.sort="desc"
              }else if(this.orderDict[prop] == "ascending"){
                  this.sort="asc"
              }else{
                  this.sort=""
              }
               this.sortby= (this.orderStackSet).toString();
              this.onSubmit(1);
            },
            onSubmit(pageNum){ 
              if((this.form.labourUnionId == "" || this.form.labourUnionId ==null || typeof(this.form.labourUnionId) == undefined) && (this.form.labourUnionName == "" || this.form.labourUnionName ==null || typeof(this.form.labourUnionName) == undefined) && (this.form.memberNickName == "" || this.form.memberNickName ==null || typeof(this.form.memberNickName) == undefined) && (this.form.userId == "" || this.form.userId ==null || typeof(this.form.userId) == undefined)){
                this.$message({
                  message: "数据量过大，请输入查询条件！",
                  type: "error"
                });
                return
              }
              let param = {
                labourUnionId:this.form.labourUnionId,
                labourUnionName:this.form.labourUnionName,
                memberNickName:this.form.memberNickName,
                userId:this.form.userId,
                currentPage:pageNum,
                limit:this.pagesize,
                sort:this.sort,
                sortby:this.sortby
              };
              this.tableloading=true;
              this.$api.labourUnionMemberSearch(param).then(res =>{
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
             * 渲染玩家ID
             */
            BindUser(data1,data2){
              if(data1 == data2){
                return "<span style='color:red'>"+data1+"</span>"
              }else{
                return "<span>"+data1+"</span>"
              }
            },
            /**
             * 冻结解冻
             */
            handleEdit (row,data) {
                let params={
                  userId:row,
                  freeze:data
                };
                this.$api.labourUnionMemberfreeze(params).then(res =>{
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
                }).catch(err =>{
                  this.$message({
                    message: '请求失败!',
                    type: "error"
                  });
                })
            },
            /**
             * 踢出操作
             */
            handleKickOut(data){
              this.$prompt('您确定要将此玩家踢出俱乐部吗？', '踢出', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputValue:data.userId,
                    inputValidator:function(inputValue){
                        if(inputValue == "" ||inputValue == null){
                            return "请输入用户ID"
                        }
                    },
                    inputPlaceholder:'请输入用户ID'
                }).then(({ value }) => {
                    let param={
                      userId:data.userId,
                      labourUnionId:data.labourUnionId
                    }
                    this.$api.labourUnionMemberkickOut(param).then(res =>{
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
