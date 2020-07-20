<template>
  <div class="app-container">
    <h3 class="showTit">充值配置</h3>
    <el-row :gutter="32">
      <el-form :model="form" :inline="true" ref="form" label-width="80px" class="demo-ruleForm">
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.spreadid" size="small" placeholder="渠道ID" value='' clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.orderPrefix" size="small" placeholder="订单前缀" value='' clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.modulName" size="small" placeholder="渠道模板名称" value='' clearable></el-input>
        </el-col>
        <el-col :sx="24" :sm="6" :lg="3">
          <el-select v-model="form.gameType" placeholder="---请选择游戏---" size="small">
            <el-option v-for="(list,index) in this.gameTypeList" :key="index" :label="list.name" :value="list.gameId"></el-option>
          </el-select>
        </el-col>
        <el-col :sx="24" :sm="6" :lg="3">
          <el-select v-model="form.modulType" placeholder="-请选择模板-" size="small">
            <el-option v-for="(list,index) in this.modulTypeList" :key="index" :label="list.serviceName" :value="list.id"></el-option>
          </el-select>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="4">
          <el-button type="primary" size="small" v-has="'channelPayServiceConfig_search'" @click="onSubmit(1)">查询</el-button>
          <el-button size="small"  type="danger" v-has="'channelPayServiceConfig_add'" @click="formdata='',showAddModal=true,isAdd=true">添加配置</el-button>
        </el-col>
      </el-form>
    </el-row>

    <el-row>
      <el-col :span="24">
          <el-table v-loading="tableloading" :data="tableData" highlight-current-row  style="width: 100%;" border>

            <el-table-column prop="gameName" label="GAME_ID" width="85px">

            </el-table-column>
            <el-table-column prop="spreadid" label="SPREADID" width="95px"></el-table-column>
            <el-table-column prop="platformType" label="PLATFORM_TYPE" width="140px">
              <template slot-scope="scope">
                {{ scope.row.platformType | platformType}}
              </template>
            </el-table-column>
            <el-table-column prop="orderPrefix" label="ORDER_PREFIX" width="120px"></el-table-column>
            <el-table-column prop="cpsfId" label="CPSF_ID" width="75px"></el-table-column>
            <el-table-column prop="serverParams" label="SERVER_PARAMS" show-overflow-tooltip></el-table-column>
            <el-table-column prop="isLog" label="IS_LOG" width="70px">
              <template slot-scope="scope">
                {{scope.row.isLog | isLog }}
              </template>
            </el-table-column>
            <el-table-column prop="status" label="STATUS" width="75px">
              <template slot-scope="scope">
                {{ scope.row.status | payStatue}}
              </template>
            </el-table-column>
            <el-table-column prop="thirdCallbackType" label="THIRO_CALLBACK_TYPE" width="180px">
              <template slot-scope="scope">
                {{ scope.row.thirdCallbackType | thirdCallbackType}}
              </template>
            </el-table-column>
            <el-table-column prop="note" label="NOTE" width="105px"/>
            <el-table-column prop="insertDate" label="INSERT_DATE" width="100"></el-table-column>
            <el-table-column prop="" label="OPTION" width="100px" align="center">
              <template slot-scope="scope">
                <el-button type="primary" v-has="'channelPayServiceConfig_update'" style="margin-bottom:5px;" @click="formdata=scope.row,showAddModal=true,isAdd=false" size="mini">修改</el-button>
                <el-popover :ref="scope.row.id" placement="top">
                    <p>确定删除本条数据吗？</p>
                    <div style="text-align: right; margin: 0">
                        <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
                        <el-button type="primary" size="mini" @click="subDelete(scope.row.id)">确定</el-button>
                    </div>
                    <el-button slot="reference" v-has="'channelPayServiceConfig_delete'" type="danger"  size="mini">删除</el-button>
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

    <!--新增和修改-->
    <pcModal v-if="showAddModal" width="880px" :title="isAdd ? '添加配置' : '修改配置'"  @closeModal="showAddModal = false">
      <channelPayServiceConfigDialogModule :getdata="formdata" :isAdd="isAdd" @shuaxin="onSubmit(1)" @closedialog="showAddModal = false"></channelPayServiceConfigDialogModule>
    </pcModal>

  </div>
</template>
<script>
    export default {
        name: "channelPayServiceConfig",
        components: {
          channelPayServiceConfigDialogModule: () => import("./channelPayServiceConfigModule")
        },
        data() {
          return {
            currentPage: 1, //初始页
            pagesize: 30, //    每页的数据
            total: 0,
            currentTotal:0,
            form:{
              spreadid:"",
              orderPrefix:"",
              modulName:"",
              gameType:"",
              modulType:""
            },
            tableData: [],
            gameTypeList: [],
            modulTypeList: [],
            showAddModal: false,
            isAdd:false,
            tableloading:false
          };
        },
        mounted() {
          this.channelPayServiceConfigreloadGameName();
          this.channelPayServiceCfgTempsearchTempAll();
        },
        methods: {
          cellStyle(row,column,rowIndex,columnIndex){
            return 'text-align:center';
          },
          rowClass({row,rowIndex}){
            return 'text-align:center;';
          },
          channelPayServiceConfigreloadGameName() {
            //加载游戏名称
            this.$api.channelPayServiceConfigreloadGameName().then(res =>{
              this.gameTypeList=[];
              if (res.success) {
                this.gameTypeList = res.data.records;
                this.$store.commit('setObject', JSON.stringify(res.data));//保存值
              }
            }).catch(err =>{
              this.$message({
                message: '请求失败!',
                type: "error"
              });
            })
          },
          channelPayServiceCfgTempsearchTempAll() {
            //加载充值模板
            this.$api.channelPayServiceCfgTempsearchTempAll().then(res =>{
              this.modulTypeList=[];
              if (res.success) {
                this.modulTypeList = res.data.records;
                this.$store.commit('setObject', JSON.stringify(res.data));//保存值
              }
            }).catch(err =>{
              this.$message({
                message: '请求失败!',
                type: "error"
              });
            })
          },
          onSubmit(pageNum){
            //spreadid，orderPrefix， gameId, cpsfId
            let param = {
              spreadid:this.form.spreadid,
              orderPrefix:this.form.orderPrefix,
              gameId:this.form.gameType,
              cpsfName:this.form.modulName,
              cpsfId:this.form.modulType,
              currentPage:pageNum,
              limit:this.pagesize
            };
            this.tableloading=true;
            this.$api.channelPayServiceConfigsearch(param).then(res =>{
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
          },
          subDelete: function(id) {
            this.$api.channelPayServiceConfigdelete({id: id }).then(res =>{
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
        }
    };
</script>

<style scoped>
.filter-item {
  margin-bottom: 10px;
}
</style>
