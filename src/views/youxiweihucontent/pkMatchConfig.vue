<template>
  <div class="app-container">
    <h3 class="showTit">比赛管理</h3>
    <el-row :gutter="32">
      <el-form ref="from" :model="form">
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.matchName" size="small" placeholder="比赛名称" clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="2">
          <el-button type="primary" size="small" v-has="'pkMatchConfig_search'" @click="onSubmit(1)">查询</el-button>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="2">
          <el-button type="danger" size="small" v-has="'pkMatchConfig_addGame'"  @click="formdata='',addOrEditMatchDialog=true,isAdd=true" style="display:none;">添加比赛</el-button>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="2">
           <el-button type="warning" size="small" v-has="'pkMatchConfig_timeStartup'" @click="TimingOpenDialog=true" style="display:none;">定时开启</el-button>
        </el-col>
      </el-form>
    </el-row>

    <el-row >
      <el-col :span="24">
        <el-table
        class="maintable"
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%" :cell-style="cellStyle" :header-cell-style="rowClass"
        border v-loading="loading"
      >
        <el-table-column label="比赛名称"  width="70">
          <template slot-scope="scope">{{ scope.row.matchName }}</template>
        </el-table-column>
        <el-table-column prop="classifyname" label="比赛分类" width="60"></el-table-column>
        <el-table-column prop="count" label="人数" width="80"></el-table-column>
        <el-table-column prop="inintScore" label="初始化分数"></el-table-column>
        <el-table-column prop="countdown" label="倒计时" width="50"></el-table-column>
        <el-table-column prop="sustainedTime" label="持续时长" width="50"></el-table-column>
        <el-table-column prop="classifyId" label="比赛类型" width="50"></el-table-column>
        <el-table-column prop="signUpFree" label="报名限制" width="50"></el-table-column>
        <el-table-column prop="consumeDesp" label="消耗说明" ></el-table-column>
        <el-table-column prop="consume" label="消耗配置" ></el-table-column>
        <el-table-column prop="tips" label="提示" show-overflow-tooltip></el-table-column>
        <el-table-column prop="ruleTitle" label="提示规则" ></el-table-column>
        <el-table-column prop="ruleDesp" label="规则详情" show-overflow-tooltip></el-table-column>
        <el-table-column prop="vipLimit" label="vip限制" width="50"></el-table-column>
        <el-table-column prop="levelLimit" label="等级限制" width="50"></el-table-column>
        <el-table-column prop="scoreLimit" label="幸运豆限制" width="50"></el-table-column>
        <el-table-column prop="startTime" label="比赛开始时段" width="100"></el-table-column>
        <el-table-column prop="endTime" label="比赛结束时段" width="100"></el-table-column>
        <el-table-column prop="dInitBeginTime" label="定时赛初始时间" width="100"></el-table-column>
        <el-table-column prop="dMinuteInterval" label="定时赛间隔时间" width="70"></el-table-column>
        <el-table-column prop="tScorePass" label="挑战赛过关分数" width="50"></el-table-column>
        <el-table-column prop="fireLimit" label="最低发炮数" width="50"></el-table-column>

        <el-table-column prop="" label="比赛奖励配置"  show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="competitionRewardConfigure=true,formdata=scope.row">配置</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="" label="比赛房间配置" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button size="mini" type="warning" plain="" @click="rewardRoomConfigure=true,formdata=scope.row">配置</el-button>
            </template>
        </el-table-column>
        <el-table-column prop="" label="比赛机器人配置" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button size="mini" type="danger" plain="" @click="formdata=scope.row,modifyRobotRewardConfigure=true">修改</el-button>
            </template>
        </el-table-column>
        <el-table-column prop="" label="比赛房间管理" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="roomService(scope.row.id)">管理</el-button>
            </template>
        </el-table-column>
        <el-table-column prop="state" label="操作" width="460">
            <template slot-scope="scope">
              <el-button size="mini" type="success" v-has="'pkMatchConfig_updateGame'" @click="formdata=scope.row,addOrEditMatchDialog=true,isAdd=false">修改</el-button>
              <el-popover :ref="scope.row.id" placement="top" width="180">
                    <p>确定删除本条数据吗？</p>
                    <div style="text-align: right; margin: 0">
                        <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
                        <el-button type="primary" size="mini" @click="subDelete(scope.row.id)">确定</el-button>
                    </div>
                    <el-button slot="reference" type="danger" v-has="'pkMatchConfig_deleteGame'" size="mini">删除</el-button>
                </el-popover>
              <el-button size="mini" type="info" v-has="'pkMatchConfig_matchDetails'" @click="infoConfigureRefresh('5001',scope.row)">详情</el-button>
              <el-button size="mini" type="warning" v-has="'pkMatchConfig_refreshPrize'" @click="infoConfigureRefresh('5002',scope.row)" >重载奖励</el-button>
              <el-button size="mini" type="primary" v-has="'pkMatchConfig_refreshMatch'" @click="infoConfigureRefresh('5003',scope.row)">动态添加比赛</el-button>
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

    <!--添加比赛 或者 修改  模块-->
    <pcModal v-if="addOrEditMatchDialog" width="1100px" :title="isAdd ? '添加比赛' : '修改比赛'" @closeModal="addOrEditMatchDialog = false">
        <addOrEditMatchModule :getdata="formdata" :isAdd="isAdd" @shuaxin="onSubmit(1)"  @closedialog="addOrEditMatchDialog = false"></addOrEditMatchModule>
    </pcModal>

    <!-- 定时开启 -->
    <pcModal v-if="TimingOpenDialog" width="30%" :title="'定时开启'" @closeModal="TimingOpenDialog = false">
        <dialogTimingOpen @shuaxin="onSubmit(1)" @closedialog="TimingOpenDialog = false"></dialogTimingOpen>
    </pcModal>

     <!--比赛奖励配置  弹框-->
    <pcModal v-if="competitionRewardConfigure" width="680px" :title="'比赛奖励配置'"  @closeModal="competitionRewardConfigure = false">
        <rewardConfigureModuleDialog :getdata="formdata"   @closedialog="competitionRewardConfigure = false"></rewardConfigureModuleDialog>
    </pcModal>

    <!--比赛房间配置  弹框-->
    <pcModal v-if="rewardRoomConfigure" width="600px" :title="'比赛房间配置'" @closeModal="rewardRoomConfigure = false">
        <rewardRoomConfigureModuleDialog :getdata="formdata"   @closedialog="rewardRoomConfigure = false"></rewardRoomConfigureModuleDialog>
    </pcModal>

    <!--比赛机器人配置  修改 弹框-->
    <pcModal v-if="modifyRobotRewardConfigure" width="600px" :title="'比赛机器人配置'" @closeModal="modifyRobotRewardConfigure = false">
        <modifyRobotRewardConfigureDialog :getdata="formdata" @shuaxin="onSubmit(1)"  @closedialog="modifyRobotRewardConfigure = false"></modifyRobotRewardConfigureDialog>
    </pcModal>

    <!--配置服务器 编辑（复制）-->
    <!-- <pcModal v-if="editBindConfigureserver" :xs="8" :sm="8" :lg="2" :title="'修改配置服务器'" @closeModal="editBindConfigureserver = false">
        <editBindConfigureserverModuleDialog :getdata="formdata"   @closedialog="editBindConfigureserver = false"></editBindConfigureserverModuleDialog>
    </pcModal> -->

    <!--绑定渠道 绑定功能）-->
    <!-- <pcModal v-if="bindChannelbindlingDialog" :xs="8" :sm="8" :lg="2" :title="'绑定渠道'" @closeModal="bindChannelbindlingDialog = false">
        <bindChannelbindlingModuleDialog :getdata="formdata"   @closedialog="bindChannelbindlingDialog = false"></bindChannelbindlingModuleDialog>
    </pcModal> -->

    <!--比赛房间管理 弹框-->
    <pcModal v-if="serverRoomConfigure" width="86%" :title="'比赛房间管理'" @closeModal="serverRoomConfigure = false">
        <serverRoomConfigureDialog :getdata="serverRoomData" @shuaxin="onSubmit(1)"  @closedialog="serverRoomConfigure = false"></serverRoomConfigureDialog>
    </pcModal>
  </div>
</template>

<script>
export default {
  name: "pkMatchConfig",
  components: {
        addOrEditMatchModule:() => import('./addOrEditMatchModule.vue'),
        dialogTimingOpen:() => import('./dialogTimingOpenModule.vue'),
        rewardConfigureModuleDialog:() => import('./rewardConfigureModuleDialog.vue'),
        rewardRoomConfigureModuleDialog:() => import('./rewardRoomConfigureModule.vue'),
        modifyRobotRewardConfigureDialog:() =>import('./modifyRobotRewardConfigureModel.vue'),
        // editBindConfigureserverModuleDialog:() =>import('./editBindConfigureserverModule.vue'),
        // bindChannelbindlingModuleDialog:() =>import('./bindChannelbindlingModule.vue')
        serverRoomConfigureDialog:() =>import('./serverRoomConfigureDialogModel.vue')

  },
  data() {
    return {
      currentPage: 1, //初始页
      pagesize: 30, //    每页的数据
      total: 0,
      currentTotal:0,
      form: {
        matchName: ""
      },
      tableData: [],
      multipleSelection: [],
      formdata:[],
      serverRoomData:"",
      typeid:0,
      isAdd:false,
      dialogtitle:'',
      addOrEditMatchDialog:false,
      TimingOpenDialog:false,
      competitionRewardConfigure:false,
      rewardRoomConfigure:false,
      modifyRobotRewardConfigure:false,
      loading:false,
      serverRoomConfigure:false
    };
  },
  mounted(){
    this.onSubmit(1);
  },
  methods: {
    cellStyle(row,column,rowIndex,columnIndex){
      return 'text-align:center;padding:6px 0;';
    },
    rowClass({row,rowIndex}){
      return 'text-align:center;padding:6px 0;';
    },
    onSubmit(pageNum) {
      //matchName
      let params = {
        matchName: this.form.matchName,
      };
      this.loading = true;
      this.$api.pkMatchConfigsearch(params).then(res =>{
        if (res.success) {
          this.tableData = res.data.records;
          this.loading = false;
          this.total = res.data.total; //size
          this.pagesize = res.data.size;
          this.currentPage = res.data.current;
          this.currentTotal=(this.currentPage) * (this.pagesize)
          if(this.currentTotal > this.total){
            this.currentTotal = this.total
          }else{
            this.currentTotal=(this.currentPage) * (this.pagesize)
          }
        }else{
          this.$message({
              message: res.message,
              type: "error"
          });
          this.loading=false;
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
    roomService(data){
      this.serverRoomConfigure=true;
      this.serverRoomData={
        matchId: data,
        servertype: 2
      }
    },
    subDelete: function(id) {
      let param={ id: id }
      this.$api.pkMatchConfigdeleteGame(param).then(res =>{
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
    infoConfigureRefresh(code,data){
        let params = {
          code: code,
          id: data.id,
          classifyId: data.classifyId,
        };
        this.$api.pkMatchConfigrefreshCache(params).then(res =>{
          if (res.success) {
            this.$confirm( res.message, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              }).then(() => {
                // this.$message({
                //   type: 'success',
                //   message: '删除成功!'
                // });
              }).catch(() => {
                // this.$message({
                //   type: 'info',
                //   message: '已取消删除'
                // });          
              });
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
    }
  }
};
</script>

<style scoped>
.maintable {
  background: #fff;
  -webkit-box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.2);
  box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.2);
  border-color: rgba(0, 0, 0, 0.2);
}
</style>
