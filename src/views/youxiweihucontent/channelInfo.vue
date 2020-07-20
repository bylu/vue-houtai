<template>
    <div class="app-container">
        <h3 class="showTit">渠道游戏版本管理</h3>
        <div class="head-container">
            <el-row :gutter="32">
                <el-form  :model="form">
                    <el-col :xs="24" :sm="6" :lg="3">
                        <el-input v-model.trim="form.name" size="small" placeholder="渠道名称" clearable></el-input>
                    </el-col>

                   <el-col :xs="8" :sm="8" :lg="2">
                        <el-button type="primary" size="small" @click="onSubmit(1)">查询</el-button>
                    </el-col>
                    <el-col :xs="8" :sm="8" :lg="2">
                        <el-button  type="success" size="small" @click="showAddModuledialog=true" >新增渠道</el-button>
                    </el-col>
                </el-form>
            </el-row>
        </div>
        <el-row>
            <el-col :span="24">
                <el-table class="maintable" ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%" border v-loading="loading">
                    <el-table-column prop="id" label="渠道编号" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="name" label="渠道名称" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="createDate" label="创建日期" show-overflow-tooltip></el-table-column>

                    <el-table-column label="操作"  width="100">
                        <template slot-scope="scope">
                            <el-button size="mini" type="primary"  @click="addTuiguangModuledialog=true">添加推广</el-button>
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
        <!--添加 新增渠道 弹框-->
        <pcModal v-if="showAddModuledialog" :xs="8" :sm="8" :lg="2" title="新增渠道" @closeModal="showAddModuledialog = false">
            <addModule  @shuaxin="onSubmit(1)"  @closedialog="showAddModuledialog = false"></addModule>
        </pcModal>

        <!--添加 添加推广 弹框-->
        <pcModal v-if="addTuiguangModuledialog" :xs="8" :sm="8" :lg="2" title="添加推广" @closeModal="addTuiguangModuledialog = false">
            <addModule1  @shuaxin="onSubmit(1)"  @closedialog="addTuiguangModuledialog = false"></addModule1>
        </pcModal>
    </div>
</template>
<script>
export default {
    name:'',
    components: {
        addModule:() => import('./addChannelInfoModule.vue'),
        addModule1:()=>import('./addTuiguangModule.vue')
    },
    data(){
        return {
            currentPage: 1, //初始页
            pagesize: 30, //    每页的数据
            total: 0,
            currentTotal:0,
            form:{
                name:"",
            },
            tableData:[],
            showAddModuledialog:false,
            addTuiguangModuledialog:false,
            loading:false
        }
    },
    mounted(){ //相当于 页面打开先加载数据
    },
    methods:{
        onSubmit(pageNum){
            this.loading = true;
            let param={
                name:this.form.name,
                currentPage: pageNum,
                limit: this.pagesize
            }
            this.$http({
                url:this.paramUrl.channelInfosearch,
                method: "post",
                data: this.form
            }).then(res => {
                if (res.success) {
                    this.tableData = res.data.records;
                    this.loading = false;
                    this.total = res.data.total;
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
                    this.loading = false;
                }
            });

        },
        handleCurrentChange: function(currentPage) {
            this.currentPage = currentPage;
            this.onSubmit(currentPage);
        }
    }
}
</script>
<style  scoped>
</style>
