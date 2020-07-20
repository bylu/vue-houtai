<template>
<div>
   <div  class="dialogTable">
        <el-row :gutter="32">
            <el-col :xs="12" :sm="6" :lg="3">
                <el-button type="danger" size="small"  @click="formdata1=setid,showrewardRoomAddModuledialog=true">房间查询</el-button>
            </el-col>
        </el-row>

        <el-row :gutter="32">
            <el-table
                class="maintable"
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%" size="small"
                border v-loading="loading" :cell-style="cellStyle" :header-cell-style="rowClass"
            >
                <el-table-column prop="serverID" label="房间标识" show-overflow-tooltip></el-table-column>
                <el-table-column prop="serverName" label="房间名称" show-overflow-tooltip></el-table-column>
                <el-table-column label="操作" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-popover :ref="scope.row.serverID" placement="top" width="180">
                            <p>确定删除本条数据吗？</p>
                            <div style="text-align: right; margin: 0">
                                <el-button size="mini" type="text" @click="$refs[scope.row.serverID].doClose()">取消</el-button>
                                <el-button type="primary" size="mini" @click="subDelete(scope.row.serverID)">确定</el-button>
                            </div>
                            <el-button slot="reference" type="danger" style="margin-bottom:0px" size="mini">删除</el-button>
                        </el-popover>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="warning" size="small" @click="cancel">取消</el-button>
    </div>

    <pcModal v-if="showrewardRoomAddModuledialog"  width="36%" :title="'房间配置查询'"  @closeModal="showrewardRoomAddModuledialog = false">
        <showrewardRoomAddModuledialog :setdata="formdata1" @shuaxin="searchInit()"  @closedialog="showrewardRoomAddModuledialog = false"></showrewardRoomAddModuledialog>
    </pcModal>

</div>
</template>

<script>
export default {
  name: "",
  props: ['getdata'],
  components:{
      showrewardRoomAddModuledialog:() => import('./showrewardRoomAddModuledialog.vue')
  },
  data() {
    return {
       tablehide:false,
       tableData:[
       ],
       showrewardRoomAddModuledialog:false,
       loading:false,
       setid: ''
    }
  },
  mounted(){
       this.searchInit();
       this.setid = this.getdata.id;
  },
  methods: {
    cellStyle(row,column,rowIndex,columnIndex){
      return 'padding:4px 0';
    },
    rowClass({row,rowIndex}){
      return 'padding:4px 0';
    },
    searchInit(){
      this.loading=true;
      let param={"match_type_id":this.getdata.id}
      this.$api.pkMatchConfigsearchRoom(param).then(res =>{
        if (res.success) {
          this.tableData = res.data;
          this.loading = false;
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
    //取消按钮操作
    cancel() {
      this.$emit('closedialog');
    },
    subDelete: function(id) {
      let param={ serverId: id }
      this.$api.pkMatchConfigdelRoom(param).then(res =>{
        if (res.success) {
          this.searchInit();
          this.$notify({
              title: res.message,
              type: "success",
              duration: 2500
          });
        } else {
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
.dialogTable{
  width:94%;
  float: left;
  margin:1% 3%;
}
.el-table{
    margin-top:1%;
}
.dialog-footer{
  text-align: right;
  padding-right:3%;
  margin-bottom: 2%;
}
</style>
