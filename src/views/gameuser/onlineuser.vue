<template>
  <div class="app-container">
    <h3 class="showTit">在线玩家</h3>
     <el-row :gutter="32">
      <el-form ref="from" :model="form">
        <el-col :xs="24" :sm="6" :lg="2">
          <el-button type="success" size="small" v-has="'onlineUser_deleteOnlineUser'" @click="onClearn">批量清卡线</el-button>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.userid" size="small" placeholder="用户ID" clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.nicename" size="small" placeholder="昵称" clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="4">
         <el-select v-model="form.kindID" placeholder="请选择游戏" size="small"  @change="watchSelect(form.kindID)">
           <el-option
             v-for="(list,index) in games"
             :key="index"
             :label="list.kindName"
             :value="list.kindID"
           ></el-option>
         </el-select>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="4">
         <el-select v-model="form.serverID" placeholder="请选择房间" size="small" clearable>
           <el-option
             v-for="(list,index) in rooms"
             :key="index"
             :label="`${list.serverName}${list.serverID}`"
             :value="list.serverID"
           ></el-option>
         </el-select>
       </el-col>
        <el-col :xs="24" :sm="6" :lg="2" >
          <el-button type="primary" size="small" v-has="'onlineUser_searchOnlineUse'" @click="onSubmit(1)">查询</el-button>
        </el-col>
      </el-form>
    </el-row>

     <el-row :gutter="32">
       <el-col :span="24">
        <el-table class="maintable" ref="multipleTable" :data="tableData" tooltip-effect="dark"
        style="width: 100%" border @selection-change="handleSelectionChange" @sort-change='sortChange' :header-cell-class-name="handleHeaderCellClass" :cell-style="cellStyle" :header-cell-style="rowClass" v-loading="tableloading">
          <el-table-column type="selection"  width="55"></el-table-column>
          <el-table-column prop="userID" label="用户ID" width="100">
            <template slot-scope="scope">{{ scope.row.userID }}</template>
          </el-table-column>
          <el-table-column prop="gameID" label="游戏ID" sortable="true" width="100">
            <template slot-scope="scope">
              <span style="color:#1890ff;cursor: pointer;" @click="openNewWin(scope.row.gameID)">{{ scope.row.gameID }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="nickName" label="昵称" sortable="true"></el-table-column>
          <el-table-column prop="score" label="幸运豆" sortable="true">
            <template slot-scope="scope">
              {{scope.row.score | numTenthousandOrNull}}
            </template>
          </el-table-column>
          <el-table-column prop="insurescore" label="银行" sortable="true">
            <template slot-scope="scope">
              {{scope.row.insurescore | numTenthousandOrNull}}
            </template>
          </el-table-column>
          <el-table-column prop="scoresum" label="幸运豆总数" sortable="true">
            <template slot-scope="scope">
              {{scope.row.scoresum | numTenthousandOrNull}}
            </template>
          </el-table-column>
          <el-table-column prop="rechargecount" label="充值次数" sortable="true"></el-table-column>
          <el-table-column prop="payamount" label="总充值" sortable="true">
            <template slot-scope="scope">
              {{scope.row.payamount | numTenthousandOrNull}}
            </template>
          </el-table-column>
          <el-table-column prop="servername" label="房间" sortable="true"></el-table-column>
          <el-table-column prop="onlineTime" label="在线时长">
             <template slot-scope="scope"><div v-html="commonJs.showDuration1(scope.row.onlineTime)"></div></template>
          </el-table-column>
          <el-table-column prop="collectDate" label="上线时间" sortable="true"></el-table-column>
          <el-table-column prop="enterIP" label="IP" ></el-table-column>
          <el-table-column prop="enterMachine" label="机器码" ></el-table-column>
          <el-table-column prop="monitoring" label="状态" show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.monitoring | monitoringStatue}}</template>
          </el-table-column>
          <el-table-column label="操作"  width="110"  ><!--fixed="right"-->
            <template slot-scope="scope">
              <div v-show="scope.row.monitoring == 1"  class="showbuttonclass">
                <el-button size="mini" v-has="'onlineUser_monitor'"  @click="handleEdit(scope.row)">取消监控</el-button>
              </div>
              <div v-show="scope.row.monitoring != 1"  class="showbuttonclass">
                <el-button size="mini" v-has="'onlineUser_monitor'" @click="handleEdit(scope.row)">监控</el-button>
              </div>
              <el-button size="mini" v-has="'onlineUser_remove'" type="danger" style="margin-top:5px;" @click="handleDelete(scope.row.userID)">清除卡线</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin-top: 20px">
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
  </div>
</template>

<script>
export default {
    name: "onlineuser",
    data(){
        return{
            form: {
                userid: '',
                nicename: '',
                game:'',
                kindID:''
            },
            currentPage: 1, //初始页
            pagesize: 30, //    每页的数据
            total: 0,
            currentTotal:0,
            tableData: [],
            multipleSelection: [],
            selectData:[],
            games:[],
            rooms:[],
            tableloading:false,
            sort:"",
            sortby:"",
            orderDict:[],
            orderStackSet:[]
        }
    },
    created(){
        this.searchGameName();
    },
    methods:{
      cellStyle(row,column,rowIndex,columnIndex){
        return 'padding:6px 0';
      },
      rowClass({row,rowIndex}){
        return 'padding:6px 0';
      },
      searchGameName() {
        //加载游戏列表
        this.$api.onlineUserSearchKind().then(res =>{
          this.loading = false;
          if (res.success) {
            this.games = res.data;
          }
        }).catch(err =>{
          this.$message({
            message: '请求失败!',
            type: "error"
          });
        })
      },
      watchSelect(val){
        if(this.form.serverID){
          this.form.serverID='';
        }
        let param= {
          kindID:val,
        }
        this.$api.onlineUserSearchServerid(param).then(res =>{
          this.loading = false;
          if (res.success) {
            this.rooms = res.data;
          }
        }).catch(err =>{
          this.$message({
            message: '请求失败!',
            type: "error"
          });
        })
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
          this.loading = true;
          let params = {
            userID:this.form.userid,
            nickName:this.form.nicename,
            gameID:this.form.game,
            kindID:this.form.kindID,
            currentPage: pageNum,
            sort:this.sort,
            sortby:this.sortby,
            limit: this.pagesize
          };
          this.tableloading=true;
          this.$api.searchOnlineUser(params).then(res =>{
            this.loading = false;
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
            }
          }).catch(err =>{
            this.$message({
              message: '请求失败!',
              type: "error"
            });
          })
      },
      toggleSelection (rows) {
          if (rows) {
              rows.forEach(row => {
                  this.$refs.multipleTable.toggleRowSelection(row.userid);
              });
          } else {
              this.$refs.multipleTable.clearSelection();
          }
      },
      handleSelectionChange (val) {
          this.multipleSelection = val;
      },
      handleEdit (row) { //监控
          let state = 1;
          if(row.monitoring == 1){
            state = 0;
          }else if(row.monitoring == 0) {
            state = 1;
          }else{
            state = 1;
          }
          let params={
            userID:row.userID,
            monitoring:state,
            state:state
          };
          this.$api.monitor(params).then(res =>{
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
      handleDelete (row) {
        this.$prompt('您确认要执行清除卡线操作?', {
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
              this.loading = false;
            if (res.success) {
              this.$message({
                showClose: true,
                message: res.message,
                type: 'success'
              });
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
      onClearn(){
          this.selectData =  this.multipleSelection.map((item,index)=>{return item.userID}).join(";");
          this.$prompt('请输入用户ID', '批量清卡线', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
              // inputErrorMessage: '邮箱格式不正确'
              inputValue:this.selectData,
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
              this.loading = false;
              if (res.success) {
                this.$message({
                  showClose: true,
                  message: res.message,
                  type: 'success'
                });
              }else{
                this.$message({
                  showClose: true,
                  message: res.data.message,
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
  .maintable{
    background: #fff;
    -webkit-box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.2);
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.2);
    border-color: rgba(0, 0, 0, 0.2);
  }
  
</style>
