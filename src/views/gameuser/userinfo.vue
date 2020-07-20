<template>
  <div class="app-container">
    <h3 class="showTit">用户信息</h3>
    <el-row :gutter="32">
      <el-form ref="from" :model="form">
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.userID" size="small" placeholder="用户ID" clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.gameID" size="small"  placeholder="游戏ID" clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.spreaderID" size="small"  placeholder="渠道ID" clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.accounts" size="small"  placeholder="账户" clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.nickName" size="small"  placeholder="昵称" clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.registerMachine" size="small"  placeholder="注册机器码" clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.lastlogonmachine" size="small"  placeholder="登录机器码" clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.registerIP" size="small"  placeholder="注册IP" clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.mobilePhone" size="small"  placeholder="绑定手机号" clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="4">
          <el-date-picker v-model="form.beginTime"  size="small"  align="right" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="选择日期" clearable>
          </el-date-picker>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="4">
          <el-date-picker
            v-model="form.endTime"
            align="right" size="small"
            type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd"
            placeholder="选择日期" clearable>
          </el-date-picker>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="6" v-has="'accountsinfo_search'">
          <el-button type="primary" size="small"  @click="onSubmit(1)">查询</el-button>
          <el-button type="primary" size="small"  @click="beforeOneDay()" >向前一天</el-button>
          <el-button type="primary" size="small"  @click="afterOneDay()">向后一天</el-button>
        </el-col>
      </el-form>
    </el-row>

    <el-row :gutter="32">
      <div style="margin-left:2%;margin-bottom:10px;">
        <el-button type="primary" size="mini" plain="" style="margin-bottom:10px;" v-has="'accountsinfo_freeze'"  @click="dialogFreeze()">冻结、解冻</el-button><!--v-if="hasPerm('syste,.post.edit')"-->

        <el-button type="primary" size="mini" plain="" style="margin-bottom:10px;" v-has="'accountsinfo_gavemember'"  @click="givePresent()" >赠送会员</el-button>

        <el-button type="primary" size="mini" plain="" v-has="'accountsinfo_gavescore'" @click="giveLuckBean()" >赠送幸运豆</el-button>

        <el-button type="primary" size="mini" plain="" v-has="'accountsinfo_gaveExperience'" @click="giveExperience()" >赠送经验</el-button>

        <el-button type="primary" size="mini" plain="" v-has="'accountsinfo_gaveLevel'" @click="giveLevel()" >赠送等级</el-button>

        <el-button type="primary" size="mini" plain="" v-has="'accountsinfo_gaveLogonpass'" @click="editLoginPwd()" >修改登录密码</el-button>

        <el-button type="primary" size="mini" plain="" v-has="'accountsinfo_gaveInsurepass'" @click="editBankPwd()" >修改银行密码</el-button>

        <el-button type="primary" size="mini" plain="" v-has="'accountsinfo_kickOff'" @click="kick()" >踢人</el-button>

        <el-button type="primary" size="mini" plain="" v-has="'accountsinfo_recached'" @click="refreshCache()" >刷新缓存</el-button>

        <el-button type="primary" size="mini" plain="" v-has="'accountsinfo_bindPhone'" @click="bindPhone()">绑定手机</el-button>

        <el-button type="primary" size="mini" plain="" v-has="'accountsinfo_userMessage'" @click="userinfo()" >用户信息</el-button>

        <el-button type="primary" size="mini" plain="" v-has="'accountsinfo_chatControl'" @click="controllerTalk()" >聊天控制</el-button>

        <!-- <el-button type="danger" size="small"  @click="weixinPay()" >微信小店充值</el-button> -->

        <el-button type="primary" size="mini" plain="" v-has="'accountsinfo_gaveNickName'" @click="editNickname()">修改昵称</el-button>

        <el-button type="primary" size="mini" plain="" v-has="'accountsinfo_addPlugin'" @click="addPlugin()">外挂</el-button>
      </div>
    </el-row>

    <el-row>
      <el-col :span="24">
          <el-table class="maintable" ref="multipleTable" :data="tableData4" tooltip-effect="dark" style="width: 100%"
           @selection-change="handleSelectionChange" border @sort-change='sortChange' :cell-style="cellStyle" :header-cell-style="rowClass" :header-cell-class-name="handleHeaderCellClass" v-loading="tableloading">
            <el-table-column type="selection" width="40"></el-table-column>
            <el-table-column prop="userID" label="用户ID" sortable="true" width="100" fixed="left">
              <template slot-scope="scope">{{ scope.row.userID }}</template>
            </el-table-column>
            <el-table-column prop="" label="游戏ID"  width="100px">
              <template slot-scope="scope">
                <span style="color:#1890ff;cursor: pointer;" @click="openNewWin(scope.row.gameID)">{{ scope.row.gameID}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="nickName" label="昵称" ></el-table-column> <!--show-overflow-tooltip-->
            <el-table-column prop="payamount" label="充值" sortable="true" width="90px">
              <template slot-scope="scope">{{ scope.row.payamount | numTenthousand }}</template>
            </el-table-column>
            <el-table-column prop="currExp" label="经验等级" sortable="true" width="90"><!--currLevel, currExp-->
              <template slot-scope="scope">
                {{ scope.row.currLevel | null2Zero }}
                ({{scope.row.currExp | null2Zero }})
                </template>
            </el-table-column>
            <el-table-column prop="score" label="幸运豆" width="120">
              <template slot-scope="scope">{{ scope.row.score | numTenthousand }}</template>
            </el-table-column>
            <el-table-column prop="insureScore" label="银行幸运豆" width="120">
              <template slot-scope="scope">{{ scope.row.insureScore | numTenthousand }}</template>
            </el-table-column>
            <el-table-column prop="score" label="总幸运豆" sortable="true" width="120">
               <template slot-scope="scope"> {{calculateTotal(scope.row)}}</template>
            </el-table-column>
            <el-table-column prop="userCrystalNum" label="水晶" sortable="true">
              <template slot-scope="scope">{{ scope.row.userCrystalNum | null2Zero }}</template>
            </el-table-column>
            <el-table-column prop="memberOrder" label="会员级别" sortable="true" width="50">
              <template slot-scope="scope">{{ scope.row.memberOrder | null2Zero }}</template>
            </el-table-column>
            <el-table-column prop="registerDate" label="注册时间" sortable="true" width="100">
              <template slot-scope="scope">{{ scope.row.registerDate | null2empty }}</template>
            </el-table-column>
            <el-table-column prop="registerIP" label="注册IP">
              <template slot-scope="scope">{{ scope.row.registerIP | null2empty }}</template>
            </el-table-column>
            <el-table-column prop="mobilePhone" label="绑定手机">
              <template slot-scope="scope"> {{scope.row.mobilePhone | checkMobiphone }}</template>
            </el-table-column>
            <el-table-column prop="lastLogonDate" label="最后登录时间" sortable="true" width="100">
              <template slot-scope="scope">{{ scope.row.lastLogonDate | null2empty }}</template>
            </el-table-column>
            <el-table-column prop="versionNo" label="最后登录版本">
              <template slot-scope="scope">{{ scope.row.versionNo | null2empty }}</template>
            </el-table-column>
            <el-table-column prop="lastLogonIP" label="最后登录ip">
              <template slot-scope="scope">{{ scope.row.lastLogonIP | null2empty }}</template>
            </el-table-column>
            <el-table-column prop="nullity" label="状态" >
              <template slot-scope="scope"> {{scope.row.nullity | permissiontype }}</template>
            </el-table-column>
            <el-table-column prop="" label="聊天" >
              <template slot-scope="scope">
                <span  v-if="scope.row.status != 1 ">正常</span>
                <el-button v-if="scope.row.status == 1"  type="danger"  size="mini" @click="dialogChatStatue(scope.row)">禁言中</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="serverId" label="锁定本机">
              <template slot-scope="scope"> {{scope.row.serverId | serverIdStatue }}</template>
            </el-table-column>
            <el-table-column label="操作"   fixed="right" width="120px" >
            <template slot-scope="scope">
              <div v-show="scope.row.monitoring == 1"  class="showbuttonclass">
                  <el-button size="mini" style="margin: 5px 10px;"  v-has="'accountsinfo_monitoring'" @click="handleEdit(scope.row,0)">取消监控</el-button>
              </div>
              <div  v-show="scope.row.monitoring != 1"  class="showbuttonclass">
                 <el-button size="mini" style="margin: 5px 10px;" v-has="'accountsinfo_monitoring'" @click="handleEdit(scope.row,1)">监控</el-button>
              </div>
              <el-button size="mini" style="margin: 5px 10px;" type="danger" v-has="'accountsinfo_remove'" @click="handleDelete(scope.row.userID)">清除卡线</el-button>
              <div v-show="scope.row.moorMachine == 1"  class="showbuttonclass">
                <el-button size="mini" style="margin: 5px 10px;" v-has="'accountsinfo_lock'"  type="success" @click="handleMoormachine(scope.row,0)">解锁本机</el-button>
              </div>
              <div v-show="scope.row.moorMachine != 1"  class="showbuttonclass">
                <el-button size="mini" style="margin: 5px 10px;" v-has="'accountsinfo_lock'" plain type="success" @click="handleMoormachine(scope.row,1)">锁定本机</el-button>
              </div>
            </template>
          </el-table-column>
          </el-table>
          <div style="margin: 20px 0px">
            <el-button size="mini" @click="toggleSelection()">取消选择</el-button>
          </div>

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

    <!--冻结、解冻模块-->
    <pcModal v-if="showdialogFreeze" :xs="8" :sm="8" :lg="2" title="冻结、解冻" @closeModal="showdialogFreeze = false">
        <dialogFreeze :getdata="selectData" @shuaxin="onSubmit(1)"  @closedialog="showdialogFreeze = false"></dialogFreeze>
    </pcModal>

    <!--封装公用的    赠送会员 赠送幸运豆  赠送经验-->
    <pcModal v-if="showdialog" :xs="8" :sm="8" :lg="2" :title="dialogtitle" @closeModal="showdialog = false">
        <dialogcontent :getdata="selectData" :typeid="typeid"  @shuaxin="onSubmit(1)"  @closedialog="showdialog= false"></dialogcontent>
    </pcModal>

    <!--封装公用的    修改登录密码  修改银行密码-->
    <pcModal v-if="showEditdialog" :xs="8" :sm="8" :lg="2" :title="dialogtitle" @closeModal="showEditdialog = false">
        <dialogEditcontent :getdata="selectData"  :typeid="typeid" @shuaxin="onSubmit(1)"  @closedialog="showEditdialog= false"></dialogEditcontent>
    </pcModal>

    <!--封装公用的  踢人 刷新缓存  用户信息-->
    <pcModal v-if="showOperadialog" :xs="8" :sm="8" :lg="2" :title="dialogtitle" @closeModal="showOperadialog = false">
        <dialogOperacontent :getdata="selectData" :typeid="typeid"  @closedialog="showOperadialog= false"></dialogOperacontent>
    </pcModal>

    <pcModal v-if="showPhonedialog" :xs="8" :sm="8" :lg="2" title="绑定手机" @closeModal="showPhonedialog = false">
        <dialogbindPhonecontent :getdata="selectData" @shuaxin="onSubmit(1)"  @closedialog="showPhonedialog= false"></dialogbindPhonecontent>
    </pcModal>

    <!--聊天控制弹框-->
    <pcModal v-if="showControllerTalkdialog" :xs="8" :sm="8" :lg="2" title="聊天控制" @closeModal="showControllerTalkdialog = false">
        <dialogControllerTalk :getdata="selectData" @shuaxin="onSubmit(1)"   @closedialog="showControllerTalkdialog= false"></dialogControllerTalk>
    </pcModal>
    <!--微信小店  -->
    <!-- <pcModal v-if="showWeixinPaydialog" :xs="8" :sm="8" :lg="2" title="微信小店充值" @closeModal="showWeixinPaydialog = false">
        <dialogWeixinpay :getdata="selectData"   @closedialog="showWeixinPaydialog= false"></dialogWeixinpay>
    </pcModal> -->

     <!--外挂-->
    <pcModal v-if="showdialogPlugin" :xs="8" :sm="8" :lg="2" title="外挂" @closeModal="showdialogPlugin = false">
        <dialogPlugin :getdata="selectData" @shuaxin="onSubmit(1)"  @closedialog="showdialogPlugin = false"></dialogPlugin>
    </pcModal>

  </div>
</template>

<script>
    import { Dialog } from 'element-ui'
    export default {
        name: "userinfo",
        components:{
          dialogFreeze:() => import('./dialogFreeze.vue'),
          dialogcontent:() => import('./dialogContent.vue'),
          dialogEditcontent:() => import('./dialogEditcontent.vue'),
          dialogOperacontent:() => import('./dialogOperacontent.vue'),
          dialogControllerTalk:() => import('./dialogControllerTalk.vue'),
          dialogWeixinpay:() => import('./dialogWeixinpay.vue'),
          dialogPlugin:() => import('./dialogPlugin.vue'),
          dialogbindPhonecontent:()=>import('./dialogBindPhone.vue')
        },
        data(){
            return{
                currentPage: 1, //初始页
                pagesize: 30, //    每页的数据
                total: 0,
                currentTotal:0,
                form: {
                    userID: '',
                    accounts: '',
                    gameID: '',
                    nickName: '',
                    registerMachine:'',
                    lastlogonmachine:'',
                    registerIP:'',
                    spreaderID:'',
                    mobilePhone:'',
                    beginTime:'',
                    endTime:''
                },
                tableData4: [],
                multipleSelection: [],
                selectData:[],
                showdialogFreeze:false,
                showdialog:false,
                dialogtitle:'',
                typeid:0,
                showEditdialog:false,
                showOperadialog:false,
                showControllerTalkdialog:false,
                showWeixinPaydialog:false,
                showdialogPlugin:false,
                showPhonedialog:false,
                tableloading:false,
                sort:"",
                sortby:"",
                orderDict:[],
                orderStackSet:[]
            }
        },
        mounted(){},
        methods:{
            cellStyle(row,column,rowIndex,columnIndex){
              return 'padding:6px 0';
            },
            rowClass({row,rowIndex}){
              return 'padding:6px 0';
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
              if((this.form.userID == "" || this.form.userID ==null || typeof(this.form.userID) == undefined) && (this.form.accounts == "" || this.form.accounts ==null || typeof(this.form.accounts) == undefined) && (this.form.gameID == "" || this.form.gameID ==null || typeof(this.form.gameID) == undefined) && (this.form.nickName == "" || this.form.nickName ==null || typeof(this.form.nickName) == undefined) && (this.form.registerMachine == "" || this.form.registerMachine ==null || typeof(this.form.registerMachine) == undefined)&& (this.form.lastlogonmachine == "" || this.form.lastlogonmachine ==null || typeof(this.form.lastlogonmachine) == undefined) && (this.form.registerIP == "" || this.form.registerIP ==null || typeof(this.form.registerIP) == undefined) && (this.form.spreaderID == "" || this.form.spreaderID ==null || typeof(this.form.spreaderID) == undefined) && (this.form.mobilePhone == "" || this.form.mobilePhone ==null || typeof(this.form.mobilePhone) == undefined) && (this.form.beginTime == "" || this.form.beginTime ==null || typeof(this.form.beginTime) == undefined) && (this.form.endTime == "" || this.form.endTime ==null || typeof(this.form.endTime) == undefined)){
                this.$message({
                      message: '请至少输入一个查询条件',
                      type: "error"
                });
                return
              }
                let params = {
                  userID: this.form.userID,
                  accounts: this.form.accounts,
                  gameID: this.form.gameID,
                  nickName: this.form.nickName,
                  registerMachine:this.form.registerMachine,
                  lastlogonmachine:this.form.lastlogonmachine,
                  registerIP:this.form.registerIP,
                  spreaderID:this.form.spreaderID,
                  mobilePhone:this.form.mobilePhone,
                  beginTime:this.form.beginTime,
                  endTime:this.form.endTime,
                  currentPage: pageNum,
                  limit: this.pagesize,
                  sort:this.sort,
                  sortby:this.sortby,
                };
                this.tableloading=true;
                this.$api.searchAccountsInfo(params).then(res =>{
                  this.loading = false;
                  if (res.success) {
                    this.tableData4 = res.data.records;
                    this.tableloading=false;
                    this.total = res.data.total;
                    this.pagesize=res.data.size;
                    this.currentPage = res.data.current;
                    this.currentTotal=(this.currentPage) * (this.pagesize)
                    if(this.currentTotal > this.total){
                      this.currentTotal = this.total
                    }else{
                      this.currentTotal=(this.currentPage) * (this.pagesize)
                    }
                  }else{
                    this.$message({
                      showClose: true,
                      message: res.data.message,
                      type: 'success'
                    });
                  }
                }).catch(err =>{
                  this.$message({
                    message: '请求失败!',
                    type: "error"
                  });
                })
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
            handleCurrentChange: function(currentPage) {
              this.currentPage = currentPage;
              this.onSubmit(currentPage);
            },
            calculateTotal(row){
                return this.numTenthousand(row.score + row.insureScore);
            },
            numTenthousand(num){
                if(num != null){
                return num.toString().replace(/\d+/, function (n) { // 先提取整数部分
                    return n.replace(/(\d)(?=(\d{4})+$)/g, function ($1) { // 对整数部分添加分隔符
                    return $1 + ",";
                    });
                });
                }else{
                return 0 ;
                }
            },
            toggleSelection (rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange (val) {
                this.multipleSelection = val;
            },
            handleEdit (row,data) { //监控 和取消监控  userID，monitoring，state（0取消， 1 监控）
                let params={
                  userID:row.userID,
                  monitoring:data,
                  state:data
                };
                this.$api.monitor(params).then(res =>{
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
            dialogChatStatue(row){
               this.$alert('禁言至:   '+row.statusEndTime, '禁言时间', {
                callback: action => {
                  this.$message({
                    type: 'info',
                    message: `关闭弹框`
                  });
                }
               });
            },
            handleDelete (row) {
                this.$prompt('请输入用户ID', '批量清卡线', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputValue:row,
                    inputValidator:function(inputValue){
                        if(inputValue == "" ||inputValue == null){
                            return "请输入用户ID"
                        }
                    },
                    inputPlaceholder:'多个ID 用;隔开/ -1代表踢全部'
                }).then(({ value }) => {
                    let param={
                      userids:value
                    }
                    this.$api.onlineUserdelete(param).then(res =>{
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
                        message: '取消输入!',
                        type: "info"
                      });
                    })
                }).catch(e=>e);
            },
            handleMoormachine(row, data){ // 解锁本机   锁定本机 userID,moorMachine(0取消，1锁定)
                let params={
                  userID:row.userID,
                  moorMachine:data
                };
                this.$api.moormachine(params).then(res =>{
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
             * 按钮 冻结、解冻 点击事件
             */
            dialogFreeze(){
                this.showdialogFreeze=true;
                this.selectData =  this.multipleSelection.map((item,index)=>{return item.userID}).join(";");
            },
            /**
             * 按钮 赠送会员 点击事件（三个选项）
             */
            givePresent(){
                this.showdialog=true;
                this.dialogtitle="赠送会员";
                this.typeid=1;
                this.selectData =  this.multipleSelection.map((item,index)=>{return item.userID}).join(";");
            },
           /**
            * 按钮  赠送幸运豆 点击事件（三个选项）
            */
           giveLuckBean(){
              this.showdialog=true;
              this.dialogtitle="赠送幸运豆";
              this.typeid=2;
              this.selectData =  this.multipleSelection.map((item,index)=>{return item.userID}).join(";");
           },
           /**
            *按钮 赠送经验 点击事件 （三个选项）
            */
           giveExperience(){
              this.showdialog=true;
              this.dialogtitle="赠送经验";
              this.typeid=3;
              this.selectData =  this.multipleSelection.map((item,index)=>{return item.userID}).join(";");
           },
           /**
            *按钮 赠送等级 点击事件 （三个选项）
            */
            giveLevel(){
              this.showdialog=true;
              this.dialogtitle="赠送等级";
              this.typeid=4;
              this.selectData =  this.multipleSelection.map((item,index)=>{return item.userID}).join(";");
            },
            /**
             * 按钮  修改登录密码  点击事件 （二个选项）
             */
            editLoginPwd(){
                this.showEditdialog=true;
                this.dialogtitle="修改登录密码";
                this.typeid=1;
                this.selectData =  this.multipleSelection.map((item,index)=>{return item.userID}).join(";");
            },
             /**
             * 按钮  修改银行密码  点击事件 （二个选项）
             */
            editBankPwd(){
                this.showEditdialog=true;
                this.dialogtitle="修改银行密码";
                this.typeid=2;
                this.selectData =  this.multipleSelection.map((item,index)=>{return item.userID}).join(";");
            },
            /**
             * 按钮 修改昵称  点击事件（二个选项）
             */
            editNickname(){
                this.showEditdialog=true;
                this.dialogtitle="修改昵称";
                this.typeid=3;
                this.selectData =  this.multipleSelection.map((item,index)=>{return item.userID}).join(";");
            },
            /**
             * 踢人 （一个选项）
             */
            kick(){
              this.showOperadialog=true;
              this.dialogtitle="踢人";
              this.typeid=1;
              this.selectData =  this.multipleSelection.map((item,index)=>{return item.userID}).join(";");
            },
            /**
             * 刷新缓存 （一个选项）
             */
            refreshCache(){
              this.showOperadialog=true;
              this.dialogtitle="刷新缓存";
              this.typeid=2;
              this.selectData =  this.multipleSelection.map((item,index)=>{return item.userID}).join(";");
            },
            /**
             * 绑定手机 （三个选项）
             */
            bindPhone(){
              this.showPhonedialog=true;
              this.selectData =  this.multipleSelection.map((item,index)=>{return item.userID}).join(";");
          },
          /**
           * 用户信息（一个选项）
           */
          userinfo(){
            this.showOperadialog=true;
            this.dialogtitle="用户信息";
            this.typeid=3;
            this.selectData =  this.multipleSelection.map((item,index)=>{return item.userID}).join(";");
          },
          /**
           * 聊天控制
           */
          controllerTalk(){
            this.showControllerTalkdialog=true;
            this.selectData =  this.multipleSelection.map((item,index)=>{return item.userID}).join(";");
          },
          /**
           * 微信小店
           */
          // weixinPay(){
          //    this.showWeixinPaydialog=true;
          //    this.selectData =  this.multipleSelection.map((item,index)=>{return item.userID}).join(";");
          // },
          /**
           * 外挂
           */

          addPlugin(){
            this.showdialogPlugin=true;
            this.selectData =  this.multipleSelection.map((item,index)=>{return item.userID}).join(";");
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
