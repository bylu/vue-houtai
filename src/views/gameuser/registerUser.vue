<template>
  <div class="app-container">
    <h3 class="showTit">注册用户信息</h3>
    <el-row :gutter="32">
      <el-form ref="from" :model="form">
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.qudaoid" id="qudaoId" @blur.native.capture="testqudao"  size="small" placeholder="渠道ID" clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="4">
          <el-input v-model.trim="form.registerjiqima" size="small" placeholder="注册机器码" clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="4">
          <el-input v-model.trim="form.loginjiqima" size="small" placeholder="登录机器码" clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.registerIp" size="small" placeholder="注册IP" clearable></el-input>
        </el-col>

        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.loginIp" size="small" placeholder="登录IP" clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="3">
          <el-select v-model="form.isyouke" placeholder="请选择" size="small">
            <el-option  v-for="list in selectList.isyoukelist" :key="list.key" :label="list.value" :value="list.key"></el-option>
          </el-select>
        </el-col>

        <el-col :xs="24" :sm="8" :lg="3">
          <el-select v-model="form.ispay" placeholder="请选择" size="small">
            <el-option  v-for="list in selectList.ispaylist" :key="list.key" :label="list.value" :value="list.key"></el-option>
          </el-select>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="4">
          <el-date-picker
            v-model="form.beginTime"
            align="right"
            size="small"
            type="date"
            value-format="yyyy-MM-dd"
            format="yyyy-MM-dd"
            placeholder="开始日期" clearable
          ></el-date-picker>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="4">
          <el-date-picker
            v-model="form.endTime"
            align="right"
            size="small"
            type="date"
            value-format="yyyy-MM-dd"
            format="yyyy-MM-dd"
            placeholder="结束日期" clearable
          ></el-date-picker>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="6" v-has="'registAccountInfo_search'">
          <el-button type="primary" size="small" @click="onSubmit(1,1)">查询</el-button>
          <el-button type="primary" size="small"  @click="beforeOneDay()" >向前一天</el-button>
          <el-button type="primary" size="small"  @click="afterOneDay()">向后一天</el-button>
        </el-col>
        <!-- <el-col :xs="8" :sm="8" :lg="2">
          <el-button type="success" size="small" @click="onSubmit(1,2)">冻结并检索</el-button>
        </el-col>
         <el-col :xs="8" :sm="8" :lg="2">
          <el-button type="danger" size="small" @click="onSubmit(1,2)">解冻并检索</el-button>
        </el-col> -->
      </el-form>
    </el-row>
    <!-- 查询框end -->
    <!-- 查询列名begin -->
    <el-row>
      <el-col :span="24">
        <el-table class="maintable" ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%"
         v-loading="tableloading" border @sort-change="sortChange" :header-cell-class-name="handleHeaderCellClass" :cell-style="cellStyle" :header-cell-style="rowClass" >
         <el-table-column prop="userID" label="用户ID" width="90px"></el-table-column>
          <el-table-column prop="gameID" label="游戏ID" width="90px" sortable="true">
            <template slot-scope="scope">
              <span style="color:#1890ff;cursor: pointer;" @click="openNewWin(scope.row.gameID)">{{ scope.row.gameID }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="nickName" label="昵称" width="100px"></el-table-column>
          <el-table-column label="游客" width="50px">
            <template slot-scope="scope">
              {{ (scope.row.accounts == scope.row.registerMachine) ? '是':'否'}}
            </template>
          </el-table-column>
          <el-table-column prop="sumscore" label="总幸运豆" sortable="true" width="120">
             <template slot-scope="scope">{{ scope.row.sumscore | numThousandth }}</template>
          </el-table-column>
          <el-table-column prop="registerDate" label="注册时间" width="100px" sortable="true"></el-table-column>
          <el-table-column prop="registerIP" label="注册IP" sortable="true" width="125px">
            <template slot-scope="scope">{{ scope.row.registerIP | null2empty }}</template>
          </el-table-column>
          <el-table-column prop="lastLogonDate" label="最后登录时间" width="100px" sortable="true">
            <template slot-scope="scope">{{ scope.row.lastLogonDate | null2empty }}</template>
          </el-table-column>
          <el-table-column prop="registerMachine" label="注册机器码" sortable="true">
            <template slot-scope="scope">{{ scope.row.registerMachine | null2empty }}</template>
          </el-table-column>
          <el-table-column prop="lastLogonIP" label="登录IP" sortable="true" width="125px">
            <template slot-scope="scope">{{ scope.row.lastLogonIP | null2empty }}</template>
          </el-table-column>
          <el-table-column prop="lastlogonmachine" label="登录机器码" >
            <template slot-scope="scope">{{ scope.row.lastlogonmachine | null2empty }}</template>
          </el-table-column>
          <el-table-column prop="spreaderID" label="推广账号" sortable="true" width="90px"></el-table-column>
          <el-table-column prop="payamountSum" label="总充值金额" sortable="true" width="100px">
            <template slot-scope="scope">{{ scope.row.payamountSum | numThousandth }}</template>
          </el-table-column>
          <el-table-column prop="nullity" label="状态" width="50px;">
            <template slot-scope="scope">{{ scope.row.nullity | permissiontype }}</template>
          </el-table-column>
          <el-table-column label="操作" width="100px" align="center" fixed="right">
            <template slot-scope="scope">
              <div v-show="scope.row.nullity == 0"  class="showbuttonclass">
                <el-button v-has="'registAccountInfo_searchFreeze'" type="danger"  size="mini" @click="removeUser(scope.row,1)">冻结</el-button>
              </div>
              <div v-show="scope.row.nullity == 1"  class="showbuttonclass">
                <el-button  v-has="'registAccountInfo_searchUnFreeze'" type="success"  size="mini" @click="removeUser(scope.row,0)">解冻</el-button>
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
    <!-- 查询列名end -->
  </div>
</template>

<script>
export default {
  name: "registerUser",
  components: {},
  data() {
    return {
      form: {
        qudaoid:'',
        registerjiqima:'',
        loginjiqima:'',
        registerIp:'',
        loginIp:'',
        beginTime:this.moment(new Date(new Date().setHours(0, 0, 0, 0))).format("YYYY-MM-DD"),
        endTime:this.moment(new Date()).format("YYYY-MM-DD"),
        isyouke:'-1',
        ispay:'-1',
        sort:"",
        sortby:"",
        orderDict:[],
        orderStackSet:[]
      },
      tableData: [],
      currentPage: 1, //初始页
      pagesize: 30, //    每页的数据
      total: 0,
      currentTotal:0,
      typeid:1,
      tableloading:false,
      sort:"",
      sortby:"",
      orderDict:[],
      orderStackSet:[]
    };
  },
  mounted() {
    this.getParams();
  },
  methods: {
    getParams() {
      // 取到路由带过来的参数
      this.form.qudaoid = this.$route.query.spreaderId;
      if(this.$route.query.type == 2){  //周期
        this.form.beginTime = this.$route.query.inserttime;
        this.form.endTime = this.$route.query.endDate;
      }else if(this.$route.query.type == 1){   //每天
        this.form.beginTime = this.$route.query.inserttime;
        this.form.endTime = this.$route.query.inserttime;
      }else{

      }
      let geturltypeid= this.$route.query.setid;
      if(geturltypeid == 1){
        this.form.loginIp=this.$route.query.setparam;
      }
      if(geturltypeid == 2){
        this.form.loginjiqima=this.$route.query.setparam;
      }
      if(geturltypeid == 3){
        this.form.registerIp=this.$route.query.setparam;
      }
      if(geturltypeid == 4){
        this.form.registerjiqima=this.$route.query.setparam;
      }
      if(geturltypeid == 1 || geturltypeid == 2 || geturltypeid == 3 || geturltypeid == 4){
        this.form.beginTime="";
        this.form.endTime="";
         this.onSubmit(1,1)
      }else{

      }

    },
    cellStyle(row,column,rowIndex,columnIndex){
      return 'padding:6px 0';
    },
    rowClass({row,rowIndex}){
      return 'padding:6px 0';
    },
    isCellQudao(val) {
	      if (!/^[0-9]*$/.test(val)) {
           this.$message({
            message: '渠道输入必须是数字',
            type: "error"
          });
          this.form.qudaoid="";
	        return false;
	      } else {
	        return true;
	      }
      },
    testqudao(){
       if(!this.isCellQudao(this.form.qudaoid)){
        $("#qudaoId").focus();
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
      this.onSubmit(1,1);
    },
    onSubmit(pageNum,typeid) {
      this.typeid = typeid;
      let params = {
        spreaderID:this.form.qudaoid,
        registerMachine:this.form.registerjiqima,
        lastlogonmachine:this.form.loginjiqima,
        registerIP:this.form.registerIp,
        lastLogonIP:this.form.loginIp,
        beginTime:this.form.beginTime,
        endTime:this.form.endTime,
        visitor:this.form.isyouke,
        pay:this.form.ispay,
        currentPage:pageNum,
        limit: this.pagesize,
        sort:this.sort,
        sortby:this.sortby,
      };
      this.tableloading=true;
      if(typeid ==1){
        this.$api.searchRegisterUser(params).then(res =>{
          if (res.success) {
            this.tableData = res.data.records;
            this.tableloading=false;
            this.total = res.data.total;
            this.pagesize = res.data.size;
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
      }
      if(typeid == 2){
          this.$api.searchFreeze(params).then(res =>{
          if (res.success) {
            this.tableData = res.data.records;
            this.tableloading=false;
            this.total = res.data.total;
            this.pagesize = res.data.size;
            this.currentPage = res.data.current;
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
      }

    },
    beforeOneDay(){
      if((this.form.beginTime == "" || this.form.beginTime == null) && (this.form.endTime == "" || this.form.endTime == null)){
        this.form.beginTime=this.moment(new Date()).format("YYYY-MM-DD");
        this.form.endTime=this.moment(new Date()).format("YYYY-MM-DD");
      }else{
        this.form.beginTime=this.moment(this.form.beginTime).subtract(1, 'days').format("YYYY-MM-DD");
        this.form.endTime=this.moment(this.form.endTime).subtract(1, 'days').format("YYYY-MM-DD");
      }

      this.onSubmit(1,1);
    },
    afterOneDay(){
      if((this.form.beginTime == "" || this.form.beginTime == null) && (this.form.endTime == "" || this.form.endTime == null)){
        this.form.beginTime=this.moment(new Date()).format("YYYY-MM-DD");
        this.form.endTime=this.moment(new Date()).format("YYYY-MM-DD");
      }else{
        this.form.beginTime=this.moment(this.form.beginTime).add(1, 'days').format("YYYY-MM-DD");
        this.form.endTime=this.moment(this.form.endTime).add(1, 'days').format("YYYY-MM-DD");
      }
      this.onSubmit(1,1);
    },
    removeUser(row,data){
      this.$prompt('操作原因', '用户解冻、冻结操作', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue:'',
        inputValidator:function(inputValue){
          if($.trim(inputValue) == "" ||inputValue == null){
            return "请输入原因"
          }
        },
        inputPlaceholder:'原因必填'
      }).then(({ value }) => {
        let param = {
          userids:row.userID,
          nullity:data,
          reason:value
        };
        this.$api.updateAccountsInfo(param).then(res =>{
          if (res.success) {
            this.$message({
              duration:0,
              showClose: true,
              dangerouslyUseHTMLString: true,
              message: "<p>"+res.message+"</p>",
              type: 'success'
            });
            this.onSubmit(1, this.typeid);
          }else{
            this.$message({
              duration:0,
              showClose: true,
              dangerouslyUseHTMLString: true,
              message: "<p>"+res.message+"</p>",
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
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      this.onSubmit(currentPage,this.typeid);
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
};
</script>

<style scoped>
.el-date-editor.el-input, .el-date-editor.el-input__inner{
    width:100%;
}
.maintable {
  background: #fff;
  -webkit-box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.2);
  box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.2);
  border-color: rgba(0, 0, 0, 0.2);
}
</style>
