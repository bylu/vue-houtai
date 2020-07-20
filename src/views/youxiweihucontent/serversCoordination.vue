<template>
  <div class="app-container">
    <h3 class="showTit">协调服务器管理</h3>
    <el-row :gutter="32">
      <el-form ref="form" :model="form">
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.serverName" size="small" placeholder="服务器名称" clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.serverIp" size="small" placeholder="服务器IP" clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="2">
          <el-button type="primary" @click="onSubmit(1)" size="small">查询</el-button>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="2">
          <el-button type="danger" @click="formdata='',showServerCoordinationdialoge=true,isAdd=true" size="small">新增协调服务器</el-button>
        </el-col>
      </el-form>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" style="width: 100%" :cell-style="cellStyle" :header-cell-style="rowClass" border v-loading="tableloading">
          <el-table-column prop="id" label="序号"></el-table-column>
          <el-table-column prop="serversName" label="协调服务器名称" how-overflow-tooltip></el-table-column>
          <el-table-column prop="serversIP" label="协调服务器IP" how-overflow-tooltip></el-table-column>
          <el-table-column prop="serversipLocal" label="内网IP"></el-table-column>
          <el-table-column prop="state" label="状态">
            <template slot-scope="scope">{{ scope.row.state == 1 ? '可用':'不用' }}</template>
          </el-table-column>
          <el-table-column label="操作"  width="200px">
            <template slot-scope="scope">
               <el-button size="mini" type="primary" style="margin-bottom:0px" @click="formdata=scope.row,showServerCoordinationdialoge=true,isAdd=false" >修改</el-button>
                <el-popover :ref="scope.row.id" placement="top" width="180">
                    <p>确定删除本条数据吗？</p>
                    <div style="text-align: right; margin: 0">
                        <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
                        <el-button type="primary" size="mini" @click="subDelete(scope.row.id)">确定</el-button>
                    </div>
                    <el-button slot="reference" type="danger" style="margin-bottom:0px"  size="mini">删除</el-button>
                </el-popover>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <!--新增服务器管理配置和编辑 弹框-->
    <pcModal v-if="showServerCoordinationdialoge" :xs="8" :sm="8" :lg="2" :title="isAdd ? '新增协调服务器配置' : '编辑协调服务器配置'" @closeModal="showServerCoordinationdialoge = false">
        <serverCoordinationDialog :getdata="formdata" :isAdd="isAdd" @shuaxin="onSubmit(1)"  @closedialog="showServerCoordinationdialoge = false"></serverCoordinationDialog>
    </pcModal>
  </div>
</template>

<script>
    export default {
        name: "serversCoordination",
        components: {
          serverCoordinationDialog:() => import('./serverCoordinationModule.vue'),
        },
        data(){
          return{
            form: {
              serverName: '',
              serverIp: ''
            },
            tableData: [],
            isAdd: false,
            showServerCoordinationdialoge:false,
            tableloading:false
          }
        },
        mounted() {
          this.onSubmit(1);
        },
        methods:{
            cellStyle(row,column,rowIndex,columnIndex){
              return 'text-align:center;padding:4px 0;';
            },
            rowClass({row,rowIndex}){
              return 'text-align:center;;padding:4px 0;';
            },
            onSubmit(){
              //serversName,serversIP
              let param = {
                serversName:this.form.serverName,
                serversIP:this.form.serverIp,
              };
              this.tableloading=true;
              this.$api.serversCoordinationsearch1(param).then(res =>{
                if (res.success) {
                  this.tableData = res.data;
                  this.tableloading=false;
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
            subDelete: function(id) {
              let param={ id: id }
              this.$api.serversCoordinationdel(param).then(res =>{
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
            }
        }
    }
</script>

<style scoped>
</style>
