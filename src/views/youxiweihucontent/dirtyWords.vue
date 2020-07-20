<template>
    <div class="app-container">
        <h3 class="showTit">敏感词管理</h3>
        <el-row :gutter="32">
                <el-form  :model="form">
                    <el-col :xs="24" :sm="12" :lg="4">
                        <el-input v-model.trim="form.word" size="small" placeholder="敏感词" clearable></el-input>
                    </el-col>
                   <el-col :xs="24" :sm="24" :lg="8">
                        <el-button type="primary" size="small" v-has="'dirtyWords_search'" @click="onSubmit(1)">查询</el-button>
                   
                        <el-button  type="success" size="small" v-has="'dirtyWords_add'" @click="showAddModuledialog=true">添加敏感词</el-button>
                    
                        <el-button  type="danger" size="small" v-has="'dirtyWords_refresh'" @click="Refresh">刷新</el-button>
                   
                        <el-button  type="warning" size="small" v-has="'dirtyWords_import'" @click="showimportExceldialog=true">导入excel表</el-button>
                    </el-col>
                </el-form>
            </el-row>
       
        <el-row>
            <el-col :span="24">
                <el-table class="maintable" ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" border v-loading="tableloading" :cell-style="cellStyle" :header-cell-style="rowClass">
                    <el-table-column prop="word" label="敏感词" show-overflow-tooltip></el-table-column>
                    <el-table-column label="操作"  width="106">
                        <template slot-scope="scope">
                            <el-popover :ref="scope.row.word" placement="top" width="180">
                                <p>确定删除本条数据吗？</p>
                                <div style="text-align: right; margin: 0">
                                    <el-button size="mini" type="text" @click="$refs[scope.row.word].doClose()">取消</el-button>
                                    <el-button type="primary" size="mini" @click="subDelete(scope.row.word)">确定</el-button>
                                </div>
                                <el-button slot="reference" type="danger" style="margin-bottom:0px;" v-has="'dirtyWords_delete'" size="mini">删除</el-button>
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
        <!--添加敏感词 弹框-->
        <pcModal v-if="showAddModuledialog" :xs="8" :sm="8" :lg="2" :title="'添加敏感词'" @closeModal="showAddModuledialog = false">
            <addModule  @shuaxin="onSubmit(1)"  @closedialog="showAddModuledialog = false"></addModule>
        </pcModal>

        <!--导入excel 弹框-->
        <pcModal v-if="showimportExceldialog" :xs="8" :sm="8" :lg="2" :title="'导入excel文件'" @closeModal="showimportExceldialog = false">
            <importExcelModule  @shuaxin="onSubmit(1)"  @closedialog="showimportExceldialog = false"></importExcelModule>
        </pcModal>
    </div>
</template>
<script>
export default {
    name:'',
    components: {
        addModule:() => import('./addDirtyWordsModule.vue'),
        importExcelModule:()=>import('./importDirtyWordsNodule.vue')
    },
    data(){
        return {
            currentPage: 1, //初始页
            pagesize: 30, //    每页的数据
            total: 0,
            currentTotal:0,
            form:{
                word:''
            },
            tableData:[],
            showAddModuledialog:false,
            showimportExceldialog:false,
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
                word:this.form.word,
                currentPage: pageNum,
                limit: this.pagesize
            };
            this.tableloading=true;
            this.$api.dirtyWordssearch(params).then(res =>{
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
        subDelete: function(id) {
            let param={ word: id }
            this.$api.dirtyWordsdelete(param).then(res =>{
                if (res.success) {
                    this.onSubmit(1);
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
                    this.$api.dirtyWordsrefresh().then(res =>{
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
