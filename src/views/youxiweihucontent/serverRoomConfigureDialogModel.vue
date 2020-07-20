<template>
  <div class="app-container">
    <el-row :gutter="32" style="margin-top:10px;">
      <el-col :span="24">
        <el-table class="maintable" ref="multipleTable"  :data="tableData"  tooltip-effect="dark"  style="width: 100%"  v-loading="loading" border   :cell-style="cellStyle" :header-cell-style="rowClass">
            <el-table-column  label="房间状态" width="70">
            <template slot-scope="scope">
                {{scope.row.state | checkServerRoominfoManager}}
            </template>
            </el-table-column>
            <el-table-column label="节点服务器">
            <template slot-scope="scope">
                {{scope.row.serversname | checkServerNameData}}
            </template>
            </el-table-column>
            <el-table-column  label="协调服务器">
            <template slot-scope="scope">
                {{scope.row.coordinationServersName | checkServerNameData}}
            </template>
            </el-table-column>
            <el-table-column  label="渠道" width="70">
            <template slot-scope="scope">
                {{scope.row.spreader | checkNodeNameData}}
            </template>
            </el-table-column>
            <el-table-column prop="serverID" label="房间标识" width="50"></el-table-column>
            <el-table-column prop="serverName" label="房间名称"></el-table-column>
            <el-table-column prop="serverPort" label="端口号" width="60"></el-table-column>
            <el-table-column prop="kindname" label="游戏名称" ></el-table-column>
            <el-table-column label="游戏库存" width="106">
            <template slot-scope="scope">
                <el-button size="mini" type="danger" style="margin: 0px 0px 0px 0px" plain @click="formdata=scope.row,modifyGameInventorydialog=true">修改库存</el-button>
            </template>
            </el-table-column>
            <el-table-column prop="collectDate" label="房间配置" width="140">
                <template slot-scope="scope">
                <el-button size="mini" type="danger" style="margin: 0px 0px 0px 0px" plain @click="modifyRoomConfigure(scope.row)">修改</el-button>
                <el-button size="mini" type="primary" style="margin: 0px 0px 0px 0px" plain @click="searchRoomConfigure=true,formdata=scope.row">查询</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="enterIP" label="机器人配置"  width="80">
                <template slot-scope="scope">
                <el-button size="mini" type="danger" style="margin: 0px 0px 0px 0px" plain  @click="modifyRobotConfigure(scope.row)">修改</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="enterMachine" label="道具掉落配置" width="140">
                <template slot-scope="scope">
                <el-button size="mini" type="danger" style="margin: 0px 0px 0px 0px" plain @click="ItemDropConfigure(scope.row)">修改</el-button>
                <el-button size="mini" type="primary" style="margin: 0px 0px 0px 0px" plain  @click="itemDropConfigureRefresh(scope.row.serverID)">刷新</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="state" label="配置服务器" width="200">
                <template slot-scope="scope">
                <el-button size="mini" type="primary" plain style="margin: 0px 0px 0px 0px" @click="bindConfigureserver=true;formdata=scope.row">绑定</el-button>
                <el-button size="mini" type="primary" plain style="margin: 0px 0px 0px 0px" @click="Relieve(scope.row)">解除</el-button>
                <el-button size="mini" type="primary" plain style="margin: 0px 0px 0px 0px" @click="editBindConfigureserver=true;formdata = scope.row">复制</el-button>
                </template>
            </el-table-column>
            <el-table-column label="绑定渠道" width="140">
                <template slot-scope="scope">
                    <el-button size="mini" plain="" type="primary" style="margin: 0px 0px 0px 0px" @click="bindChannelbindlingDialog=true;formdata = scope.row">绑定</el-button>
                    <el-button size="mini" type="primary" style="margin: 0px 0px 0px 0px" plain @click="bindChannelRelease(scope.row)">解绑</el-button>
                </template>
            </el-table-column>
            <el-table-column label="房间操作" width="140">
                <template slot-scope="scope">
                    <el-button size="mini" plain="" type="danger" style="margin: 0px 0px 0px 0px" v-has="'serverRoomInfoManage_serverOn'" @click="btnopenOrClose(0,scope.row)">开启</el-button>
                    <el-button size="mini" type="danger" style="margin: 0px 0px 0px 0px" plain v-has="'serverRoomInfoManage_serverOff'" @click="btnopenOrClose(1,scope.row)">关闭</el-button>
                </template>
            </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <!--开启或者 从容关闭模块-->
    <pcModal v-if="openOrClosedialog" :xs="8" :sm="8" :lg="2" :title="isAdd ? '开启' : '从容关闭'" @closeModal="openOrClosedialog = false">
        <dialogOpenorClose :getdata="selectData" :isAdd="isAdd" @shuaxin="onSubmit(1)"  @closedialog="openOrClosedialog = false"></dialogOpenorClose>
    </pcModal>
    <!-- 修改游戏库存 -->
    <pcModal v-if="modifyGameInventorydialog" width="560px" :title="'修改游戏库存'" @closeModal="modifyGameInventorydialog = false">
        <dialogmodifyGameInventory  :getdata="formdata" @shuaxin="onSubmit(currentPage)"  @closedialog="modifyGameInventorydialog = false"></dialogmodifyGameInventory>
    </pcModal>

    <!--修改房间配置  修改机器人配置  道具掉落配置  弹框-->
    <pcModal v-if="modifyConfigure" width="46%" :title="dialogtitle"  @closeModal="modifyConfigure = false">
        <modifyConfigureModuleDialog :getdata="formdata" :typeid="typeid" @shuaxin="onSubmit(currentPage)"  @closedialog="modifyConfigure = false"></modifyConfigureModuleDialog>
    </pcModal>

    <!--查询房间配置  弹框-->
    <pcModal v-if="searchRoomConfigure" width="80%" :title="'查询房间配置'" @closeModal="searchRoomConfigure = false">
        <searchRoomConfigureModuleDialog :getdata="formdata"   @closedialog="searchRoomConfigure = false"></searchRoomConfigureModuleDialog>
    </pcModal>

    <!--配置房间服务器-->
    <pcModal v-if="bindConfigureserver" :xs="8" :sm="8" :lg="2" :title="'配置房间服务器'" @closeModal="bindConfigureserver = false">
        <bindConfigureserverModuleDialog :getdata="formdata" @shuaxin="onSubmit(currentPage)"   @closedialog="bindConfigureserver = false"></bindConfigureserverModuleDialog>
    </pcModal>

    <!--配置服务器 编辑（复制）-->
    <pcModal v-if="editBindConfigureserver" :xs="8" :sm="8" :lg="2" :title="'复制房间'" @closeModal="editBindConfigureserver = false">
        <editBindConfigureserverModuleDialog :getdata="formdata" @shuaxin="onSubmit(currentPage)"   @closedialog="editBindConfigureserver = false"></editBindConfigureserverModuleDialog>
    </pcModal>

    <!--绑定渠道 绑定功能）-->
    <pcModal v-if="bindChannelbindlingDialog" width="668px" :title="'绑定渠道'" @closeModal="bindChannelbindlingDialog = false">
        <bindChannelbindlingModuleDialog :getdata="formdata"  @shuaxin="onSubmit(currentPage)"  @closedialog="bindChannelbindlingDialog = false"></bindChannelbindlingModuleDialog>
    </pcModal>
  </div>
</template>

<script>
export default {
    name: "",
    props: ['getdata'],
    components: {
        dialogOpenorClose:() => import('./openOrClosedialogModule.vue'),
        dialogmodifyGameInventory:() => import('./dialogmodifyGameInventory.vue'),
        modifyConfigureModuleDialog:() => import('./modifyConfigureModule.vue'),
        searchRoomConfigureModuleDialog:() => import('./searchRoomConfigureModule.vue'),
        bindConfigureserverModuleDialog:() =>import('./bindConfigureServerModel.vue'),
        editBindConfigureserverModuleDialog:() =>import('./editBindConfigureserverModule.vue'),
        bindChannelbindlingModuleDialog:() =>import('./bindChannelbindlingModule.vue')
    },
    data() {
        return {
        loading:false,
        currentPage: 1, //初始页
        pagesize: 30, //    每页的数据
        total: 0,
        currentTotal:0,
        form: {
        serverID:"",
        kindID:"",
        serversid:parseInt('-2'),
        nodeID:parseInt('-1'),
        coordinationServersId:parseInt('-2'),
        serverType:"-2",
        matchId:""
        },
        tableData: [],
        multipleSelection: [],
        selectData: [],
        formdata:[],
        typeid:0,
        isAdd:false,
        dialogtitle:'',
        openOrClosedialog:false,
        modifyGameInventorydialog:false,
        modifyConfigure:false,
        searchRoomConfigure:false,
        bindConfigureserver:false,
        editBindConfigureserver:false,
        bindChannelbindlingDialog:false,
        games:[],
        rooms:[],
        servername1:[],
        servername2:[],
        allSpreadlist:[]
        };
    },
    mounted(){
        this.getParamsByroomService();
    },
    methods: {
        cellStyle(row,column,rowIndex,columnIndex){
            return 'padding:6px 0';
        },
        rowClass({row,rowIndex}){
            return 'padding:6px 0';
        },
        getParamsByroomService() {
            // 取到路由带过来的参数
            this.form.matchId = parseInt(this.getdata.matchId);
            this.form.serverType = this.getdata.servertype;
            this.onSubmit(1);
        },
        onSubmit(pageNum) {
            let getserver;
            if(this.form.serverID == '' || this.form.serverID == null){
                getserver = '-1';
            }else{
                getserver = this.form.serverID;
            }
            let kindid;
            if(this.form.kindID == '' || this.form.kindID == null){
                kindid = '-1';
            }else{
                kindid = this.form.kindID;
            }
            let getserversid;
            if(this.form.serversid == '' || this.form.serversid == null){
                getserversid = '-2';
            }else{
                getserversid = this.form.serversid;
            }
            let getnodeID;
            if(this.form.nodeID == '' || this.form.nodeID == null){
                getnodeID = '-1';
            }else{
                getnodeID = this.form.nodeID;
            }
            let getcoordinationServersId;
            if(this.form.coordinationServersId == '' || this.form.coordinationServersId == null){
                getcoordinationServersId = '-2';
            }else{
                getcoordinationServersId = this.form.coordinationServersId;
            }
            let getserverType;
            if(this.form.serverType == '' || this.form.serverType == null){
                getserverType = '-2';
            }else{
                getserverType = this.form.serverType;
            }
            let params = {
                serverID: getserver,
                kindID:kindid,
                serversid: getserversid,
                nodeID: getnodeID,
                coordinationServersId:getcoordinationServersId,
                serverType:getserverType,
                currentPage: pageNum,
                matchId:this.form.matchId,
                limit: this.pagesize
            };
            this.loading = true;
            this.$api.serverRoomInfoManagesearch(params).then(res =>{
                this.loading = false;
                if (res.success) {
                this.tableData = res.data.records;
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
                }
            }).catch(err =>{
                this.$message({
                message: '请求失败!',
                type: "error"
                });
            })
        },
        modifyRoomConfigure(data){ //修改房间配置
            this.modifyConfigure=true;
            this.dialogtitle="修改房间配置";
            this.typeid=1;
            this.formdata = data;
        },
        modifyRobotConfigure(data){ //修改机器人配置
            this.modifyConfigure=true;
            this.dialogtitle="修改机器人配置";
            this.typeid=2;
            this.formdata = data;
        },
        ItemDropConfigure(data){ //道具掉落配置
            this.modifyConfigure=true;
            this.dialogtitle="道具掉落配置";
            this.typeid=3;
            this.formdata = data;
        },
        itemDropConfigureRefresh(data){ //道具掉落配置刷新
            this.$confirm(data+'====》是否要刷新', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$api.serverRoomInfoManagerefreshPropDrop(data).then(res =>{
                    if (res.success) {
                        this.$message({
                            showClose: true,
                            message: res.message,
                            type: 'success'
                        });
                        this.onSubmit(this.currentPage);
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
            }).catch(e=>e);
        },
        Relieve(data){ //解除 配置服务器
            this.$confirm('您确定要解除绑定？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                let param={
                    serverId:data.serverID,
                    nodeServersId:data.serversid
                }
                this.$api.serverMapperdelete(param).then(res =>{
                    if (res.success) {
                        this.$message({
                            showClose: true,
                            message: res.message,
                            type: 'success'
                        });
                        this.onSubmit(this.currentPage);
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
            }).catch(e=>e);
        },
        bindChannelRelease(data){ //解除 绑定渠道
            this.$confirm('您确定要解除绑定？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                let param={
                    serverID:data.serverID,
                    nodeID:0
                }
                this.$api.serverRoomInfoManageupdateServerInfoByOne(param).then(res =>{
                    if (res.success) {
                        this.$message({
                            showClose: true,
                            message: res.message,
                            type: 'success'
                        });
                        this.onSubmit(this.currentPage);
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
            }).catch(e=>e);
        },
        btnopenOrClose(data,data1){
            this.$confirm('您确定执行此操作吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                let param={
                    btnType:data,
                    roomId:data1.serverID +"m"+data1.serversid
                }
                this.$api.ServerRoomInfoManagecontrolServer(param).then(res =>{
                    if (res.success) {
                        this.$message({
                            dangerouslyUseHTMLString: true,
                            message: "<p>"+res.message+"</p>",
                            type: "success"
                        });
                        this.onSubmit(this.currentPage);
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
            }).catch(e=>e);
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
