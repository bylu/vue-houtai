<template>
  <div class="app-container">
    <h3 class="showTit">分享得分记录</h3>
    <el-row :gutter="32">
      <el-form ref="form" :model="form">
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.userid" size="small" placeholder="用户ID" clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="4">
          <el-select v-model="form.drawType" size="small" placeholder="请选择类型">
            <el-option v-for="list in selectList.shareScoreTypelist" :key="list.key" :value="list.key" :label="list.value"></el-option>
          </el-select>
        </el-col>
        <el-col :xs="12" :sm="6" :lg="4">
          <el-date-picker v-model="form.beginTime" clearable size="small" align="right" type="date" placeholder="开始日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd"></el-date-picker>
        </el-col>
        <el-col :xs="12" :sm="6" :lg="4">
          <el-date-picker v-model="form.endTime" clearable size="small" align="right" type="date" placeholder="结束日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd" ></el-date-picker>
        </el-col>


        <el-col :xs="24" :sm="24" :lg="6" v-has="'inviteUserScore_search'">
          <el-button type="primary" size="small" @click="onSubmit(1)">查询</el-button>
          <el-button type="primary" size="small"  @click="beforeOneDay()" >向前一天</el-button>
          <el-button type="primary" size="small"  @click="afterOneDay()">向后一天</el-button>
        </el-col>
      </el-form>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" style="width: 100%;" :cell-style="cellStyle" :header-cell-style="rowClass" border v-loading="tableloading">
          <el-table-column prop="userid" label="用户ID" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type='text' @click="openNewWin(scope.row.userid)">{{ scope.row.userid }}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="totalPoint" label="邀请积分" show-overflow-tooltip>
            <template slot-scope="scope"> {{scope.row.totalPoint | null2Zero }}</template>
          </el-table-column>
          <el-table-column prop="drawType" label="类型" show-overflow-tooltip>
            <template slot-scope="scope"> {{scope.row.drawType | drawTypeStatue }}</template>
          </el-table-column>
          <el-table-column prop="score" label="得分" show-overflow-tooltip></el-table-column>
          <el-table-column prop="collectDate" label="时间" show-overflow-tooltip></el-table-column>
          <el-table-column label="邀请详情" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button size="mini" type="primary" v-has="'inviteUserScore_detail'" @click="formdata=scope.row,showInviteUserScoreInfo=true">查看</el-button>
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

    <!--查看-->
    <pcModal v-if="showInviteUserScoreInfo" width="72%" :title="'查看'" @closeModal="showInviteUserScoreInfo = false">
      <inviteUserScoreInfocontent :getdata="formdata" @closedialog="showInviteUserScoreInfo= false"></inviteUserScoreInfocontent>
    </pcModal>

  </div>
</template>

<script>
    export default {
        name: "inviteUserScore",
        components:{
          inviteUserScoreInfocontent:() => import('./inviteUserScoreInfocontent.vue'),
        },
        data(){
          return{
            currentPage: 1, //初始页
            pagesize: 30, //    每页的数据
            total: 0,
            currentTotal:0,
            form: {
              userid: '',
              drawType: '-1',
              beginTime:this.moment(new Date()).format("YYYY-MM-DD"),
              endTime:this.moment(new Date()).format("YYYY-MM-DD")
            },
            tableData: [],
            showInviteUserScoreInfo:false,
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
              //userid,drawType(看后列),beginTime,currentPage,limit
              let param = {
                userid:this.form.userid,
                drawType:this.form.drawType,
                beginTime:this.form.beginTime,
                endTime:this.form.endTime,
                currentPage:pageNum,
                limit:this.pagesize
              };
              this.tableloading=true;
              this.$api.recordInviteOrShareSearch(param).then(res =>{
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
            openNewWin(data){
              const {href} = this.$router.resolve({
                path: '/userbaseinfo',
                query: {
                  gameID: data
                }
              })
              window.open(href, '_blank')
            },
            openNewWin1(data){
              const {href} = this.$router.resolve({
                path: '/inviteUser',
                query: {
                  inviteruserid: data
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
