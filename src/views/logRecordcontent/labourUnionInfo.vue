<template>
  <div class="app-container">
    <h3 class="showTit">俱乐部信息</h3>
    <el-row :gutter="32">
      <el-form ref="form" :model="form">
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.labourUnionId" size="small" placeholder="俱乐部ID" clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.labourUnionName" size="small" placeholder="俱乐部名称" clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.labourUnionUid" size="small" placeholder="部长ID" clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.labourUnionLeaderName" size="small" placeholder="部长昵称" clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="2">
          <el-button type="primary" size="small" v-has="'labourUnionInfo_search'" @click="onSubmit(1)">查询</el-button>
        </el-col>
      </el-form>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" style="width: 100%" :cell-style="cellStyle" :header-cell-style="rowClass" border v-loading="tableloading">
          <el-table-column prop="labourUnionId" label="俱乐部ID"></el-table-column>
          <el-table-column prop="" label="俱乐部名称">
            <template slot-scope="scope">
               <span style="color:#1890ff;cursor: pointer;"  @click="openWindow(scope.row.labourUnionId)">{{scope.row.labourUnionName}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="labourUnionUid" label="部长ID"></el-table-column>
          <el-table-column prop="labourUnionLeaderName" label="部长昵称" width="140px"></el-table-column>
          <el-table-column prop="" label="俱乐部人数">
            <template slot-scope="scope">
              {{ scope.row.labourUnionManCount}} / {{scope.row.maxMemberCount}}
            </template>
          </el-table-column>
          <el-table-column prop="joinTime" label="俱乐部创建时间" width="160px"></el-table-column>
          <el-table-column prop="" label="俱乐部本周活跃度">
            <template slot-scope="scope">
              {{ scope.row.weeklyActivity | numTenthousand }}
            </template>
          </el-table-column>
          <el-table-column prop="" label="历史提取水晶总数">
            <template slot-scope="scope">
              {{ scope.row.extractedProfit | numTenthousand }}
            </template>
          </el-table-column>
          <el-table-column prop="" label="剩余水晶总数">
            <template slot-scope="scope">
              {{ (scope.row.historyProfit - scope.row.extractedProfit)| numTenthousand}}
            </template>
          </el-table-column>
          <el-table-column prop="" label="本周可提取水晶">
            <template slot-scope="scope">
              {{ scope.row.weekCanProfit | numTenthousand }}
            </template>
          </el-table-column>
          <el-table-column prop="" label="俱乐部公告">
            <template slot-scope="scope">
              {{ scope.row.labourUnionTips | null2empty }}
            </template>
          </el-table-column>
          <el-table-column prop="" label="操作" width="150px;">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" style="margin: 5px 10px;" v-has="'labourUnionInfo_update'"  @click="editDialog=true, formdata=scope.row">修改</el-button>
              <div class="showbuttonclass"  v-show="scope.row.freeze == 0">
                  <el-button size="mini" type="warning" style="margin: 5px 10px;" v-has="'labourUnionInfo_freeze'"  @click="labourFreezeDialog = true,formdata=scope.row">冻结</el-button>
              </div>
              <div class="showbuttonclass" v-show="scope.row.freeze == 1" >
                  <el-button size="mini" type="success" style="margin: 5px 10px;" v-has="'labourUnionInfo_freeze'"  @click="handleDelete(scope.row.labourUnionName,scope.row.labourUnionId)">解冻</el-button>
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
    <!--修改 弹框-->
    <pcModal v-if="editDialog" :xs="8" :sm="8" :lg="2" title="编辑" @closeModal="editDialog = false">
        <editDialog :getdata="formdata" @shuaxin="onSubmit(1)"  @closedialog="editDialog = false"></editDialog>
    </pcModal>
    <!--冻结操作 -->
    <pcModal v-if="labourFreezeDialog" :xs="8" :sm="8" :lg="2" title="冻结" @closeModal="labourFreezeDialog = false">
        <FreezeDialog :getdata="formdata" @shuaxin="onSubmit(1)"  @closedialog="labourFreezeDialog = false"></FreezeDialog>
    </pcModal>
  </div>
</template>

<script>
    export default {
        name: "labourUnionInfo",
        components: {
          editDialog:() => import('./editLabourUnionInfoModel.vue'),
          FreezeDialog:() => import('./labourFreezeModule.vue')
        },
        data(){
            return{
              currentPage: 1, //初始页
              pagesize: 30, //    每页的数据
              total: 0,
              currentTotal:0,
              form: {
                labourUnionId: '',
                labourUnionName: '',
                labourUnionUid: '',
                labourUnionLeaderName: ''
              },
              tableData: [],
              editDialog:false,
              labourFreezeDialog:false,
              tableloading:false,
            }
        },
        mounted(){
          this.getParams();
        },
        methods:{
            getParams() {
                // 取到路由带过来的参数
                this.form.labourUnionId = this.$route.query.labourUnionId;
                if(this.form.labourUnionId == "" || this.form.labourUnionId ==null || typeof(this.form.labourUnionId) == undefined){

              }else{
                 this.onSubmit(1);
              }
            },
            cellStyle(row,column,rowIndex,columnIndex){
              return 'text-align:center;padding:6px 0';
            },
            rowClass({row,rowIndex}){
              return 'text-align:center;padding:6px 0';
            },
            onSubmit(pageNum){
              let param = {
                labourUnionId:this.form.labourUnionId,
                labourUnionName:this.form.labourUnionName,
                labourUnionUid:this.form.labourUnionUid,
                labourUnionLeaderName:this.form.labourUnionLeaderName,
                currentPage:pageNum,
                limit:this.pagesize
              };
              this.tableloading=true;
              this.$api.labourUnionInfoSearch(param).then(res =>{
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
             * 解冻操作
             */
            handleDelete(dataname,row){
              this.$confirm('确定解冻俱乐部："'+dataname+'"吗？', '解冻', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type:'warning'
                }).then(() => {
                    let param = {
                      labourUnionId:row
                    };
                    this.$api.labourUnionInfounFreeeze(param).then(res =>{
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
            /**
             * 点击俱乐部跳转
             */
            openWindow(data){
              const {href} = this.$router.resolve({
                path: '/labourUnionMember',
                query: {
                  labourUnionId: data
                }
              })
              window.open(href, '_blank')
            }
        }
    }
</script>

<style scoped>
</style>
