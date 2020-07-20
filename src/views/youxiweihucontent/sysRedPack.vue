<template>
    <div class="app-container">
        <h3 class="showTit">系统红包</h3>
        <el-row :gutter="32">
            <el-form  :model="form">
                <el-col :xs="24" :sm="6" :lg="3">
                    <el-input v-model.trim="form.title" size="small" placeholder="标题" clearable></el-input>
                </el-col>
                <el-col :xs="24" :sm="6" :lg="3">
                    <el-input v-model.trim="form.uid" size="small" placeholder="创建人ID" clearable></el-input>
                </el-col>
                <el-col :xs="24" :sm="12" :lg="7">
                    <el-button type="primary" size="small" v-has="'sysRedPack_search'" @click="onSubmit(1)" >查询</el-button>
                    <el-button type="success" size="small" v-has="'sysRedPack_add'" @click="formdata=' ',showAddModuledialog=true" >添加系统红包</el-button>
                    <el-button type="danger" size="small" v-has="'sysRedPack_refresh'"  @click="Refresh">刷新缓存</el-button>
                </el-col>
            </el-form>
        </el-row>
        <!-- 每一个块都是 el-row   -->
        <el-row>
            <el-col :span="24">
                <el-table class="maintable" ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" border v-loading="tableloading" :cell-style="cellStyle" :header-cell-style="rowClass">
                    <el-table-column prop="title" label="标题" width="80"></el-table-column>
                    <el-table-column prop="award" label="奖品"  width="120px"></el-table-column>
                    <el-table-column prop="amount" label="份数" width="50">
                       <template slot-scope="scope"> {{scope.row.amount | null2empty }}</template>
                    </el-table-column>
                    <el-table-column prop="timeLimit" label="时限" width="50">
                       <template slot-scope="scope"> {{scope.row.timeLimit | null2empty }}</template>
                    </el-table-column>
                    <el-table-column prop="spreader" label="渠道约束"  width="150px"></el-table-column>
                    <el-table-column prop="mqTime" label="广播时间"  width="100px"></el-table-column>
                    <el-table-column prop="isPush" label="广播是否推送" width="50">
                       <template slot-scope="scope"> {{scope.row.isPush | null2empty }}</template>
                    </el-table-column>
                    <el-table-column prop="starTime" label="开始时间"  width="100px">
                       <template slot-scope="scope"> {{scope.row.starTime | null2empty }}</template>
                    </el-table-column>
                    <el-table-column prop="isSend" label="红包是否已发" width="50"></el-table-column>
                    <el-table-column prop="uid" label="创建人" width="50"></el-table-column>
                    <el-table-column prop="message" label="消息"  width="160px">
                       <template slot-scope="scope"> {{scope.row.message | null2empty }}</template>
                    </el-table-column>
                    <el-table-column prop="inserTime" label="创建时间" width="100px">
                       <template slot-scope="scope"> {{scope.row.inserTime | null2empty }}</template>
                    </el-table-column>
                    <el-table-column prop="conf" label="配置">
                       <template slot-scope="scope"> {{scope.row.conf | null2empty }}</template>
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
        <!--添加 系统红包 弹框-->
        <pcModal v-if="showAddModuledialog" :xs="8" :sm="8" :lg="4" :title="'添加系统红包'" @closeModal="showAddModuledialog = false">
            <addModule :getdata="formdata"  @shuaxin="onSubmit(1)"  @closedialog="showAddModuledialog = false"></addModule>
        </pcModal>
    </div>
</template>
<script>
export default {
    name:'',
    components: {
        addModule:() => import('./addsysRedpackModule.vue')
    },
    data(){
        return {
            currentPage: 1, //初始页
            pagesize: 30, //    每页的数据
            total: 0,
            currentTotal:0,
            form:{
               title:"",
               uid:""
            },
            tableData:[],
            showAddModuledialog:false,
            tableloading:false
        }
    },
    mounted(){ //相当于 页面打开先加载数据
      this.onSubmit(1);
    },
    methods:{
        cellStyle(row,column,rowIndex,columnIndex){
            return 'padding:6px 0';
        },
        rowClass({row,rowIndex}){
            return 'padding:6px 0';
        },
        onSubmit(pageNum){
            let params = {
                title: this.form.title,
                uid: this.form.uid,
                currentPage: pageNum,
                limit: this.pagesize
            };
            this.tableloading=true;
            this.$api.sysRedPacksearch(params).then(res =>{
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
        handleCurrentChange: function(currentPage) {
              this.currentPage = currentPage;
              this.onSubmit(currentPage);
        },
        Refresh(){
            this.$confirm('是否刷新', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(async() => {
                    this.$api.sysRedPackrefresh().then(res =>{
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
        }
    }
}
</script>
<style  scoped>
</style>
