<template>
  <div class="app-container">
    <h3 class="showTit">服务器管理</h3>
    <el-row :gutter="32">
      <el-form ref="form" :model="form">
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.value1" size="small" placeholder="节点服务器名称" clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.value2" size="small" placeholder="节点服务器IP" clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="4">
          <el-select v-model="form.value3" placeholder="未绑定协调服务器" size="small">
            <el-option v-for="(list,index) in serverinfolist" :key="index" :label="list.serversName" :value="list.id"></el-option>
          </el-select>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="6">
          <el-button type="primary" v-has="'serversInfo_search'" @click="onSubmit(1)" size="small">查询</el-button>
        
          <el-button type="danger" v-has="'serversInfo_add'"  @click="formdata='',showServerInfodialogeEdit=true,isAdd=true"  size="small">添加</el-button>
       
          <el-button type="success"  @click="openserversCoordination()"  size="small">配置协调服务器</el-button>
        </el-col>
      </el-form>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" style="width: 100%" :cell-style="cellStyle" :header-cell-style="rowClass" border v-loading="tableloading">
          <el-table-column prop="serversName" label="节点服务器名称" ></el-table-column>
          <el-table-column prop="serversIP" label="节点服务器IP" ></el-table-column>
          <el-table-column prop="serversipLocal" label="内网ip" ></el-table-column>
          <el-table-column prop="state" label="状态" width="50"></el-table-column>
          <el-table-column prop="serversnameC" label="协调服务器名称" >
            <template slot-scope="scope">{{ scope.row.serversnameC == null ? '--':scope.row.serversnameC }}</template>
          </el-table-column>
          <el-table-column prop="serversipC" label="协调服务器IP" >
            <template slot-scope="scope">{{ scope.row.serversipC == null ? '--':scope.row.serversipC }}</template>
          </el-table-column>
          <el-table-column label="绑定控制" width="116px">
            <template slot-scope="scope">
              <div v-show="scope.row.serversidC == null || scope.row.serversidC == ''"  class="showbuttonclass">
                <el-button size="mini" type="danger" style="margin-bottom:0px" v-has="'serversInfo_bind'"  @click="formdata=scope.row,serverInfoBindClick=true" >绑定</el-button>
              </div>
              <div v-show="scope.row.serversidC != null && scope.row.serversidC != ''"  class="showbuttonclass">
                <el-button size="mini" type="warning" style="margin-bottom:0px" v-has="'serversInfo_unbind'" @click="noBindClick(scope.row),showNoBindDialog=true" >解除绑定</el-button>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作"  width="200px">
            <template slot-scope="scope">
               <el-button size="mini" type="primary" v-has="'serversInfo_update'" style="margin-bottom:0px" @click="formdata=scope.row,showServerInfodialogeEdit=true,isAdd=false" >修改</el-button>
                <el-popover :ref="scope.row.id" placement="top" width="180">
                    <p>确定删除本条数据吗？</p>
                    <div style="text-align: right; margin: 0">
                        <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
                        <el-button type="primary" size="mini" @click="subDelete(scope.row.id)">确定</el-button>
                    </div>
                    <el-button slot="reference" type="danger" style="margin-bottom:0px" v-has="'serversInfo_delete'" size="mini">删除</el-button>
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

    <!--新增服务器管理配置和编辑 弹框-->
    <pcModal v-if="showServerInfodialogeEdit" :xs="8" :sm="8" :lg="2" :title="isAdd ? '新增服务器配置' : '编辑服务器配置'" @closeModal="showServerInfodialogeEdit = false">
        <serverInfodialogeEdit :getdata="formdata" :isAdd="isAdd" @shuaxin="onSubmit(1)"  @closedialog="showServerInfodialogeEdit = false"></serverInfodialogeEdit>
    </pcModal>
    <!--绑定 弹框-->
    <pcModal v-if="serverInfoBindClick" :xs="8" :sm="8" :lg="2" :title="'绑定'" @closeModal="serverInfoBindClick = false">
        <serverInfoBindDialog :getdata="formdata"  @shuaxin="onSubmit(1)"  @closedialog="serverInfoBindClick = false"></serverInfoBindDialog>
    </pcModal>
  </div>
</template>

<script>
    export default {
        name: "serversInfo",
        components: {
          serverInfodialogeEdit:() => import('./serverInfodialogeModule.vue'),
          serverInfoBindDialog:() => import('./serverInfoBindModule.vue')
        },
        data(){
          return{
            currentPage: 1, //初始页
            pagesize: 30, //    每页的数据
            total: 0,
            currentTotal:0,
            form: {
              value1: '',
              value2: '',
              value3:parseInt('-1')
            },
            tableData: [],
            multipleSelection: [],
            isAdd: false,
            showServerInfodialogeEdit:false,
            serverInfoBindClick:false,
            serverinfolist: [],
            tableloading:false,
            showNoBindDialog:false
          }
        },
        mounted() {
          this.serversCoordinationsearch();
          this.onSubmit(1);
        },
        methods:{
            cellStyle(row,column,rowIndex,columnIndex){
              return 'text-align:center;padding:4px 0';
            },
            rowClass({row,rowIndex}){
              return 'text-align:center;padding:4px 0';
            },
            serversCoordinationsearch() {
              this.$api.serversCoordinationsearch().then(res =>{
                this.serverinfolist=[];
                if (res.success) {
                  this.serverinfolist = res.data;
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
              let param = {
                serversName:this.form.value1,
                serversIP:this.form.value2,
                serversnameC:this.form.value3,
                currentPage:pageNum,
                limit:this.pagesize
              };
              this.tableloading=true;
              this.$api.serversInfosearch(param).then(res =>{
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
              let param={ id: id }
              this.$api.serversInfodelete(param).then(res =>{
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
            noBindClick(data){
              this.$confirm('您确定要执行解绑操作？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(async() => {
                  //nodeServersID,coordinationServersID
                    let param = {
                      nodeServersID:data.id,
                      coordinationServersID:data.serversidC
                    };
                    this.$api.serversMapperdelete(param).then(res =>{
                      if (res.success) {
                        this.$message({
                            type: 'success',
                            message: res.message
                        });
                        this.onSubmit(1);
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
                }).catch(e=>e);
          },
          openserversCoordination(){
            const {href} = this.$router.resolve({
                path: '/serversCoordination'
              })
              window.open(href, '_blank')
          }
        }
    }
</script>

<style scoped>
</style>
