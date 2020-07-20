<template>
    <div class="app-container">
        <h3 class="showTit">话费宝箱</h3>
            <el-row :gutter="32">
                <el-form  :model="form">
                    <el-col :xs="24" :sm="12" :lg="3">
                        <el-input v-model.trim="form.name" size="small" placeholder="名称" clearable></el-input>
                    </el-col>
                    <el-col :xs="24" :sm="12" :lg="3">
                        <el-input v-model.trim="form.intro" size="small" placeholder="简介" clearable></el-input>
                    </el-col>
                    <el-col :xs="24" :sm="6" :lg="4">
                        <el-button type="primary" size="small" v-has="'firstRewardActConfig_search'" @click="onSubmit(1)">查询</el-button>
                        <el-button type="danger" v-has="'firstRewardActConfig_add'"  @click="formdata='',firstRewardActconfigDialog=true,isAdd=true"  size="small">添加</el-button>
                    </el-col>
                </el-form>
            </el-row>

        <el-row>
            <el-col :span="24">
                <el-table class="maintable" ref="multipleTable" :data="tableData" :cell-style="cellStyle" :header-cell-style="rowClass" tooltip-effect="dark" style="width: 100%" border v-loading="tableloading">
                    <el-table-column prop="id" label="ID" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="name" label="名称" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="intro" label="简介" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="isopen" label="是否开启" show-overflow-tooltip>
                        <template slot-scope="scope">{{scope.row.isopen | checkIsopenType}}</template>
                    </el-table-column>
                    <el-table-column prop="begindate" label="开始时间" width="160px"></el-table-column>
                    <el-table-column prop="days" label="开启天数" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="wincount" label="中奖人数" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="reward" label="奖励奖券" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="lucknum" label="概念（万分之）" show-overflow-tooltip></el-table-column>
                    <el-table-column label="操作"  width="160px">
                        <template slot-scope="scope">
                        <el-button size="mini" type="primary" v-has="'firstRewardActConfig_update'" @click="formdata=scope.row,firstRewardActconfigDialog=true,isAdd=false" >修改</el-button>
                            <el-popover :ref="scope.row.id" placement="top" width="180">
                                <p>确定删除本条数据吗？</p>
                                <div style="text-align: right; margin: 0">
                                    <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
                                    <el-button type="primary" size="mini" @click="subDelete(scope.row.id)">确定</el-button>
                                </div>
                                <el-button slot="reference" type="danger" v-has="'firstRewardActConfig_delete'" size="mini">删除</el-button>
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
        <pcModal v-if="firstRewardActconfigDialog" :xs="8" :sm="8" :lg="2" :title="isAdd ? '添加' : '编辑'" @closeModal="firstRewardActconfigDialog = false">
            <DialogModule :getdata="formdata" :isAdd="isAdd" @shuaxin="onSubmit(1)"  @closedialog="firstRewardActconfigDialog = false"></DialogModule>
        </pcModal>
    </div>
</template>
<script>
    export default {
        name:'firstRewardActConfig',
        components: {
         DialogModule:() => import('./firstRewardActconfigModule.vue'),
        },
        data(){
            return {
                currentPage: 1, //初始页
                pagesize: 30, //    每页的数据
                total: 0,
                currentTotal:0,
                form:{
                    name:'',
                    intro:'',
                },
                tableData:[],
                firstRewardActconfigDialog:false,
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
                    name:this.form.name,
                    intro: this.form.intro,
                    currentPage: pageNum,
                    limit: this.pagesize
                };
                this.tableloading=true;
                this.$api.firstRewardActConfigsearch(params).then(res =>{
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
                let param = {id: id }
                this.$api.firstRewardActConfigdelete(param).then(res =>{
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
<style  scoped>
</style>
