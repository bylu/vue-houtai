<template>
    <div class="app-container">
        <h3 class="showTit">每日充值上限</h3>
            <el-row :gutter="32">
                <el-form  :model="form">
                    <el-col :xs="24" :sm="12" :lg="3">
                        <el-input v-model.trim="form.channelId" size="small" placeholder="渠道ID" clearable></el-input>
                    </el-col>
                    <el-col :xs="24" :sm="6" :lg="4">
                        <el-button type="primary" v-has="'limitPayConfig_search'" size="small" @click="onSubmit(1)">查询</el-button>
                        <el-button type="danger" v-has="'limitPayConfig_add'"  @click="formdata='',showDialog=true,isAdd=true"  size="small">添加渠道</el-button>
                    </el-col>
                </el-form>
            </el-row>

        <el-row>
            <el-col :span="24">
                <el-table class="maintable" ref="multipleTable" :cell-style="cellStyle" :header-cell-style="rowClass" :data="tableData" tooltip-effect="dark" style="width: 100%" border v-loading="tableloading">
                    <el-table-column prop="channelId" label="渠道ID"  show-overflow-tooltip></el-table-column>
                    <el-table-column prop="limitPaySum" label="充值上限" show-overflow-tooltip>
                        <template slot-scope="scope"><div v-html="commonJs.col(scope.row.limitPaySum)"></div></template>
                    </el-table-column>
                    <el-table-column prop="description" label="描述内容" show-overflow-tooltip>
                        <template slot-scope="scope">{{scope.row.description | null2empty}}</template>
                    </el-table-column>
                    <el-table-column prop="open" label="是否开启" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <el-button size="mini" type="warning" v-if="scope.row.open == 0" @click="handleEdit(scope.row.id,1,scope.row.noLimit)">开启</el-button>
                            <el-button size="mini" type="warning" v-if="scope.row.open == 1" @click="handleEdit(scope.row.id,0,scope.row.noLimit)">关闭</el-button>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column prop="noLimit" label="白名单" show-overflow-tooltip >
                        <template slot-scope="scope">
                            <el-button size="mini" type="success" v-if="scope.row.noLimit == 0" @click="handleEdit(scope.row.id,scope.row.open,1)">开启</el-button>
                            <el-button size="mini" type="success" v-if="scope.row.noLimit == 1" @click="handleEdit(scope.row.id,scope.row.open,0)">关闭</el-button>
                        </template>
                    </el-table-column> -->
                    <el-table-column label="操作"  width="160px">
                        <template slot-scope="scope">
                            <el-button size="mini" type="primary" v-has="'limitPayConfig_Update'" @click="formdata=scope.row,showDialog=true,isAdd=false" >修改</el-button>
                            <el-popover :ref="scope.row.id" placement="top" width="180">
                                <p>确定删除本条数据吗？</p>
                                <div style="text-align: right; margin: 0">
                                    <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
                                    <el-button type="primary" size="mini" @click="subDelete(scope.row.id)">确定</el-button>
                                </div>
                                <el-button slot="reference" type="danger"  v-has="'limitPayConfig_delete'" size="mini">删除</el-button>
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
        <!--添加和编辑 弹框-->
        <pcModal v-if="showDialog" :xs="8" :sm="8" :lg="2" :title="isAdd ? '添加' : '编辑'"  @closeModal="showDialog = false">
            <DialogModule :getdata="formdata" :isAdd="isAdd"  @shuaxin="onSubmit(1)"  @closedialog="showDialog = false"></DialogModule>
        </pcModal>
    </div>
</template>
<script>
    export default {
        name:'limitPayConfig',
        components: {
         DialogModule:() => import('./limitPayConfigModule.vue'),
        },
        data(){
            return {
                currentPage: 1, //初始页
                pagesize: 30, //    每页的数据
                total: 0,
                currentTotal:0,
                form:{
                  channelId:'',
                },
                tableData:[],
                showDialog:false,
                isAdd:false,
                tableloading:false
            }
        },
        mounted(){
        },
        methods:{
            cellStyle(row,column,rowIndex,columnIndex){
              return 'padding:6px 0';
            },
            rowClass({row,rowIndex}){
              return 'padding:6px 0';
            },
            onSubmit(pageNum){
                this.loading = true;
                let params = {
                    channelId: this.form.channelId,
                    currentPage: pageNum,
                    limit: this.pagesize
                };
                this.tableloading=true;
                this.$api.limitPayConfigsearch(params).then(res =>{
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
                let param = {id: id };
                this.$api.limitPayConfigdelete(param).then(res =>{
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
            handleEdit (id,open,noLimit) {
                this.$confirm('您确认要执行此操作?', '操作提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(async() => {
                        let params={
                          id:id,
                          open:open,
                          noLimit:noLimit
                        };
                        this.$api.limitPayConfigupdate(params).then(res =>{
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
                    }).catch(e=>e);
            }
        }
    }
</script>
<style  scoped>
</style>
