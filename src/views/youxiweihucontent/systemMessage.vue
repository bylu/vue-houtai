<template>
    <div class="app-container">
        <h3 class="showTit">系统消息</h3>
        <el-row :gutter="32">
            <el-col :xs="24" :sm="12" :lg="4">
                <el-input v-model.trim="messageString"  size="small" placeholder="请输入消息内容" clearable></el-input>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="6">
                <el-button type="primary"  size="small" @click="onSubmit(1)" v-has="'systemMessage_search'">查询</el-button>
                <el-button type="success" size="small" v-has="'systemMessage_add'" @click="formdata=' ',showAddModuledialog=true,isAdd=true" >添加</el-button>
                <el-button type="danger" size="small" v-has="'systemMessage_refresh'" @click="onRefresh">刷新缓存</el-button>
            </el-col>
        </el-row>
        <!-- 每一个块都是 el-row   -->
        <el-row>
            <el-col :span="24">
                <el-table class="maintable" ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" border v-loading="tableloading" :cell-style="cellStyle" :header-cell-style="rowClass">
                    <el-table-column prop="id" label="消息ID"  width="80px"></el-table-column>
                    <el-table-column prop="messageType" label="消息范围"  width="100px">
                        <template slot-scope="scope"><div v-html="showType(scope.row.messageType)"></div></template>
                    </el-table-column>
                    <el-table-column prop="serverRange" label="房间范围"  width="100px">
                        <template slot-scope="scope"><div v-html="showType(scope.row.serverRange)"></div></template>
                    </el-table-column>
                    <el-table-column prop="startTime" label="开始时间"  width="100px"> </el-table-column>
                    <el-table-column prop="concludeTime" label="结束时间"  width="100px"> </el-table-column>
                    <el-table-column prop="timeRate" label="时间频率"  width="100px"></el-table-column>
                    <el-table-column prop="nullity" label="禁止标识"  width="100px">
                        <template slot-scope="scope">{{scope.row.nullity | null2empty }}</template>
                    </el-table-column>
                     <el-table-column prop="changespreader" label="渠道限制"  width="100px">
                        <template slot-scope="scope">{{scope.row.changespreader | changespreaderCheck}}{{ scope.row.spreader }}</template>
                    </el-table-column>
                   <el-table-column prop="changeversion" label="版本限制"  width="100px">
                         <template slot-scope="scope">{{ scope.row.changeversion | changeversionCheck}}{{ scope.row.version }}</template>
                    </el-table-column>
                    <el-table-column prop="messageString" label="消息内容" width="550px" >
                        <template slot-scope="scope">
                            <div v-html="scope.row.messageString"></div>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" >
                        <template slot-scope="scope">
                            <el-button size="mini" type="primary" v-has="'systemMessage_update'" @click="formdata=scope.row,showAddModuledialog=true,isAdd=false">编辑</el-button>
                            <el-popover :ref="scope.row.id" placement="top" width="180">
                                <p>确定删除本条数据吗？</p>
                                <div style="text-align: right; margin: 0">
                                    <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
                                    <el-button type="primary" size="mini" @click="subDelete(scope.row.id)">确定</el-button>
                                </div>
                                <el-button slot="reference" type="danger" v-has="'systemMessage_delete'" size="mini">删除</el-button>
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
        <!--新增活动模块和编辑 弹框-->
        <pcModal v-if="showAddModuledialog" width="760px" :title="isAdd ? '新增' : '编辑'" @closeModal="showAddModuledialog = false">
            <addModule :getdata="formdata" :isAdd="isAdd" @shuaxin="onSubmit(1)"  @closedialog="showAddModuledialog = false"></addModule>
        </pcModal>

    </div>
</template>
<script>
export default {
    name:'',
    components: {
        addModule:() => import('./addsystemMessageModule.vue')
    },
    data(){
        return {
            currentPage: 1, //初始页
            pagesize: 30, //    每页的数据
            total: 0,
            currentTotal:0,
            tableData:[],
            messageString:"",
            showAddModuledialog:false,
            tableloading:false
        }
    },
    mounted(){ //相当于 页面打开先加载数据
        this.onSubmit(1);
    },
    methods:{
        cellStyle(row,column,rowIndex,columnIndex){
            return 'text-align:center;padding:6px 0';
        },
        rowClass({row,rowIndex}){
            return 'text-align:center;padding:6px 0';
        },
        onSubmit(pageNum){
            this.loading = true;
            let params = {
                messageString:this.messageString,
                currentPage: pageNum,
                limit: this.pagesize
            };
            this.tableloading=true;
            this.$api.systemMessagesearch(params).then(res =>{
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
        handleCurrentChange: function(currentPage) {
              this.currentPage = currentPage;
              this.onSubmit(currentPage);
        },
        subDelete: function(id) {
            let param={ id: id }
            this.$api.systemMessagedelete(param).then(res =>{
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
        onRefresh:function(){
            this.$confirm('是否刷新', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(async() => {
                    this.$api.systemMessagerefresh().then(res =>{
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
        showType(obj) {
            if (obj == 0 || obj== null || obj == "") return "所有房间";
            if (obj == 1) return "游戏";
            if (obj == 2) return "房间";
            if (obj == 3) return "全部";
            if (obj == 4) return "聊天";
        }
    }
}
</script>
<style  scoped>
</style>
