<template>
  <div class="app-container">
   <h3 class="showTit">房间管理</h3>
     <el-row :gutter="32">
      <el-form  :model="form">
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
        <el-col :xs="24" :sm="6" :lg="2">
          <el-button type="primary" size="small" @click="onSubmit(1)" v-has="'gameRoomInfo_search'">查询</el-button>
        </el-col>
      </el-form>
    </el-row>

    <el-row>
     <el-col :span="24">
       <el-table :data="tableData"
         style="width: 100%" :cell-style="cellStyle" :header-cell-style="rowClass" border v-loading="tableloading">
          <el-table-column prop="serverID" label="房间标识" ></el-table-column>
          <el-table-column prop="serverName" label="房间名称" width="75px"></el-table-column>
          <el-table-column prop="kindID" label="游戏标识"></el-table-column>
          <el-table-column prop="kindname" label="游戏名称"></el-table-column>
          <el-table-column prop="sortID" label="排序" width="50px"></el-table-column>
          <el-table-column prop="tableCount" label="桌子数目" ></el-table-column>
          <el-table-column prop="serverType" label="房间类型" ></el-table-column>
          <el-table-column prop="serverPort" label="房间端口" ></el-table-column>
          <el-table-column prop="minTableScore" label="最低积分"></el-table-column>
          <el-table-column prop="minEnterScore" label="最低进入积分" ></el-table-column>
          <el-table-column prop="maxEnterScore" label="最大进入积分" ></el-table-column>
          <el-table-column prop="minEnterMember" label="最小进入等级" ></el-table-column>
          <el-table-column prop="maxEnterMember" label="最大进入等级" ></el-table-column>
          <el-table-column prop="maxPlayer" label="最大人数" ></el-table-column>
          <el-table-column prop="serverRule" label="房间规则">
            <template slot-scope="scope">{{ scope.row.serverRule | null2empty }}</template>
          </el-table-column>
          <el-table-column prop="serviceMachine" label="运行机器">
            <template slot-scope="scope">{{ scope.row.serviceMachine | null2empty }}</template>
          </el-table-column>
          <el-table-column prop="nullity" label="冻结状态" width="50">
               <template slot-scope="scope">{{ scope.row.nullity | permissiontype }}</template>
          </el-table-column>
          <el-table-column prop="createDateTime" label="创建时间" width="100"></el-table-column>
          <el-table-column prop="modifyDateTime" label="修改时间" width="100"></el-table-column>
          <el-table-column label="操作" fixed="right"  width="80">
              <template slot-scope="scope">
                <el-button size="mini" style="margin:0px 0px 0px 0px" type="danger" v-has="'gameRoomInfo_modify'" @click="formdata=scope.row,showdialogeEdit=true">修改</el-button>
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

  <pcModal v-if="showdialogeEdit" width="760px" :title="'修改'" @closeModal="showdialogeEdit = false">
      <editRoomServiceModule :getdata="formdata"  @shuaxin="onSubmit(1)"  @closedialog="showdialogeEdit = false"></editRoomServiceModule>
  </pcModal>

 </div>
</template>

<script>
export default {
  name:"",
  components: {
     editRoomServiceModule:() => import('./editRoomService.vue')
  },
  data(){
    return{
        currentPage: 1, //初始页
        pagesize: 30, //    每页的数据
        total: 0,
        currentTotal:0,
        form:{
          kindID:'',
          serverID:''
        },
        tableData:[],
        thishide:false,
        showdialogeEdit:false,
        games:[],
        rooms:[],
        tableloading:false,
    }
  },
  mounted(){
    this.searchGameName();
    this.onSubmit(1);
  },
  methods:{
    cellStyle(row,column,rowIndex,columnIndex){
      return 'text-align:center;padding:6px 0;';
    },
    rowClass({row,rowIndex}){
      return 'text-align:center;padding:6px 0;';
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
        let param={
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
    onSubmit(pageNum){
      let getkindID;
      if(this.form.kindID == '' || this.form.kindID == null){
          getkindID = -1;
      }else{
        getkindID = this.form.kindID;
      }
      let getserverID;
      if(this.form.serverID == '' || this.form.serverID == null){
          getserverID = -1;
      }else{
        getserverID = this.form.serverID;
      }
      let param = {
        kindID:getkindID,
        serverID:getserverID,
        currentPage:pageNum,
        limit:this.pagesize
      };
      this.tableloading=true;
      this.$api.gameRoomInfosearch(param).then(res =>{
        if (res.success) {
          this.tableData = res.data.records;
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
    }
  }
}
</script>

<style scoped>
</style>
