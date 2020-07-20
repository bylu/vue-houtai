<template>
  <div class="app-container">
    <h3 class="showTit">广告配置</h3>
    <el-row :gutter="32">
      <el-form ref="form" :model="form">
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.channelid" size="small" placeholder="渠道ID" clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="4">
          <el-date-picker v-model="form.beginTime" clearable align="right" size="mini" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="4">
          <el-date-picker v-model="form.endTime" clearable align="right" size="mini" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="8">
            <el-button type="primary" size="small" v-has="'gameAdvConfig_search'" @click="onSubmit(1)">查询</el-button>
            <el-button type="primary" size="small" v-has="'gameAdvConfig_search'"  @click="beforeOneDay()" >向前一天</el-button>
            <el-button type="primary" size="small" v-has="'gameAdvConfig_search'"  @click="afterOneDay()">向后一天</el-button>
          <el-button type="danger" v-has="'gameAdvConfig_add'" @click="formdata='',gameAdvConfigureDialog=true,isAdd=true" size="small">添加广告</el-button>
        </el-col>
      </el-form>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-table id="gameloginfo" :data="tableData" style="width: 100%" :cell-style="cellStyle" :header-cell-style="rowClass" border v-loading="tableloading">
          <el-table-column prop="channelId" label="渠道ID"></el-table-column>
          <el-table-column prop="beginTime" label="开始时间" width="160px"></el-table-column>
          <el-table-column prop="endTime" label="结束时间" width="160px"></el-table-column>
          <el-table-column label="指定显示的图片" width="200px">
            <template slot-scope="scope" >
              <div v-for="(item,index) in scope.row.list" :key="index">
                <el-button type='text' style="margin-bottom:0px"  @click="openImg(item)" v-html="splitpicname(item)">{{item}}</el-button>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="noPopVersionList" label="指定不显示的版本" >
            <template slot-scope="scope">{{ scope.row.noPopVersionList  | checknoPopVersionList}}</template>
          </el-table-column>
          <el-table-column prop="limitActivityTimeUser" label="活动期间注册可见">
            <template slot-scope="scope">{{ scope.row.limitActivityTimeUser  | checklimitActivityTimeUser}}</template>
          </el-table-column>
          <el-table-column prop="limitRegisterTimeUser" label="注册N天可见">
            <template slot-scope="scope">{{ scope.row.limitRegisterTimeUser | checklimitRegisterTimeUser }}</template>
          </el-table-column>
          <el-table-column prop="allowVipShow" label="vip等级可见">
            <template slot-scope="scope">{{ scope.row.allowVipShow  | checkallowVipShow}}</template>
          </el-table-column>
          <el-table-column prop="limitPaycount" label="总充值限制">
            <template slot-scope="scope"> {{scope.row.limitPaycount | null2Zero }}</template>
          </el-table-column>
          <el-table-column prop="alonePopGroupid" label="弹框次数">
            <template slot-scope="scope"> {{scope.row.alonePopGroupid | null2Zero }}</template>
          </el-table-column>
          <el-table-column label="操作"  width="200px">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" v-has="'gameAdvConfig_update'" style="margin-bottom:0px;" @click="formdata=scope.row,gameAdvConfigureDialog=true,isAdd=false" >修改</el-button>
              <el-popover :ref="scope.row.id" placement="top" width="180">
                <p>确定删除本条数据吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
                  <el-button type="primary" size="mini" @click="subDelete(scope.row.id)">确定</el-button>
                </div>
                <el-button slot="reference" type="danger" v-has="'gameAdvConfig_delete'" style="margin-bottom:0px;" size="mini">删除</el-button>
              </el-popover>
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

    <!--添加广告  编辑广告 弹框-->
    <pcModal v-if="gameAdvConfigureDialog" width="760px" :title="isAdd ? '添加广告' : '修改广告'"  @closeModal="gameAdvConfigureDialog = false">
        <showgameAdvConfigureDialog :getdata="formdata" :isAdd="isAdd" @shuaxin="onSubmit(1)"  @closedialog="gameAdvConfigureDialog = false"></showgameAdvConfigureDialog>
    </pcModal>

  </div>
</template>

<script>
    export default {
        name: "gameAdvConfig",
        components: {
          showgameAdvConfigureDialog:() => import('./gameAdvConfigureModule.vue')
        },
        data(){
          return{
            currentPage: 1, //初始页
            pagesize: 30, //    每页的数据
            total: 0,
            currentTotal:0,
            form: {
              channelid: '',
              beginTime:this.moment(new Date()).format("YYYY-MM-DD"),
              endTime:this.moment(new Date()).format("YYYY-MM-DD")
            },
            tableData: [],
            isAdd:false,
            gameAdvConfigureDialog:false,
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
                channelId:this.form.channelid,
                beginTime: this.moment(this.form.beginTime).format("YYYY-MM-DD HH:mm:ss"),
                endTime:this.moment(this.form.endTime).format("YYYY-MM-DD HH:mm:ss"),
                currentPage:pageNum,
                limit:this.pagesize
              };
              this.tableloading=true;
              this.$api.gameAdvConfigsearch(param).then(res =>{
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
            handleCurrentChange: function(currentPage) {
              this.currentPage = currentPage;
              this.onSubmit(currentPage);
            },
            beforeOneDay(){
              if((this.form.beginTime == "" || this.form.beginTime == null) && (this.form.endTime == "" || this.form.endTime == null)){
                this.form.beginTime=this.moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
                this.form.endTime=this.moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
              }else{
                this.form.beginTime=this.moment(this.form.beginTime).subtract(1, 'days').format("YYYY-MM-DD HH:mm:ss");
                this.form.endTime=this.moment(this.form.endTime).subtract(1, 'days').format("YYYY-MM-DD HH:mm:ss");
              }
              
              this.onSubmit(1);
            },
            afterOneDay(){
              if((this.form.beginTime == "" || this.form.beginTime == null) && (this.form.endTime == "" || this.form.endTime == null)){
                this.form.beginTime=this.moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
                this.form.endTime=this.moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
              }else{
                this.form.beginTime=this.moment(this.form.beginTime).add(1, 'days').format("YYYY-MM-DD HH:mm:ss");
                this.form.endTime=this.moment(this.form.endTime).add(1, 'days').format("YYYY-MM-DD HH:mm:ss");
              }
              this.onSubmit(1);
            },
            subDelete: function(id) {
              let param = {
                id:id
              };
              this.$api.gameAdvConfigdelete(param).then(res =>{
                if (res.success) {
                    this.$refs[id].doClose();
                    this.onSubmit(1);
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
            openImg(href){
              window.open("http://"+href, '_blank')
            },
            splitpicname(data){
              if(data == null || data == ""){
                return " "
              }
              return  data.substr(data.lastIndexOf("/") + 1);
            }
        }
    }
</script>

<style scoped>
.el-date-editor.el-input, .el-date-editor.el-input__inner{
    width:100%;
}
</style>
