<template>
    <div class="app-container">
        <h3 class="showTit">活动一键配置</h3>
        <div class="head-container">
            <el-row :gutter="32">
                <el-form  :model="form">
                    <el-col :xs="12" :sm="6" :lg="3">
                        <el-input v-model.trim="form.name" size="small" placeholder="活动名称" clearable></el-input>
                    </el-col>
                    <el-col :xs="12" :sm="6" :lg="3">
                        <el-input v-model.trim="form.id" size="small" placeholder="活动类型Id" clearable></el-input>
                    </el-col>
                    <el-col :xs="12" :sm="6" :lg="3">
                        <el-select v-model="form.statue" placeholder="全部" size="small">
                            <el-option   v-for="list in selectList.allstatue" :key="list.key" :label="list.value" :value="list.key"></el-option>
                        </el-select>
                    </el-col>
                   <el-col :xs="8" :sm="8" :lg="2">
                        <el-button type="primary" size="small" @click="onSubmit">查询</el-button>
                    </el-col>
                    <el-col :xs="8" :sm="8" :lg="2">
                        <el-button  type="success" size="small" @click="formdata=' ',showAddModuledialog=true,isAdd=true" >活动模板</el-button>
                    </el-col>
                </el-form>
            </el-row>
        </div>
        <!-- 每一个块都是 el-row   -->
        <el-row>
            <el-col :span="24">
                <el-table class="maintable" ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%">
                    <el-table-column prop="id" label="活动id" ></el-table-column>
                    <el-table-column prop="name" label="活动名称" ></el-table-column>
                    <el-table-column prop="beginTime" label="开始时间">
                        <!-- <template slot-scope="scope">{{ scope.row.beginTime | formatDateTime }}</template> -->
                    </el-table-column>
                    <el-table-column prop="endTime" label="结束时间" ></el-table-column>
                    <el-table-column prop="" label="开启渠道" >
                         <!-- <template slot-scope="scope">{{ scope.row.qudao }}</template> -->
                    </el-table-column>
                    <el-table-column prop="prize" label="奖励信息" >
                        <template slot-scope="scope">
                            <el-button size="mini" type="success"  @click="formdata=scope.row.awards,showdialogeLook=true">查看</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="email" label="邮件信息" >
                        <template slot-scope="scope">
                            <el-button size="mini" type="warning"  @click="formdata=scope.row.awards,showdialogeInfo=true">详情</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="imgshow" label="弹框图" ></el-table-column>
                    <el-table-column label="操作"  width="200">
                        <template slot-scope="scope">
                            <el-button size="mini" type="primary"  @click="formdata=scope.row,showAddModuledialog=true,isAdd=false">编辑</el-button>
                            <el-popover :ref="scope.row.id" placement="top" width="180">
                                <p>确定删除本条数据吗？</p>
                                <div style="text-align: right; margin: 0">
                                    <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
                                    <el-button type="primary" size="mini" @click="subDelete(scope.row.id)">确定</el-button>
                                </div>
                                <el-button slot="reference" type="danger"  size="mini">删除</el-button>
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
        <pcModal v-if="showAddModuledialog" :xs="8" :sm="8" :lg="2" :title="isAdd ? '新增' : '编辑'" @closeModal="showAddModuledialog = false">
            <addModule :getdata="formdata" :isAdd="isAdd" @shuaxin="onSubmit(1)"  @closedialog="showAddModuledialog = false"></addModule>
        </pcModal>

        <!--奖励配置信息  弹框-->
        <pcModal v-if="showdialogeLook" :xs="8" :sm="8" :lg="2" :title=" '奖励配置信息'" @closeModal="showdialogeLook = false">
            <rewardinfoDialogModule :getdata="formdata"   @closedialog="showdialogeLook = false"></rewardinfoDialogModule>
        </pcModal>

    </div>
</template>
<script>
export default {
    name:'',
    components: {
        addModule:() => import('./addActiveallconfigurationModule.vue'),
        rewardinfoDialogModule:()=>import('./rewardinfoDialogModule.vue')
    },
    data(){
        return {
            currentPage: 1, //初始页
            pagesize: 30, //    每页的数据
            total: 0,
            currentTotal:0,
            form:{
                name:'',
                id:'',
                statue:''
            },
            tableData:[],
            showdialogeLook:false,
            showdialogeInfo:false,
            showAddModuledialog:false
        }
    },
    mounted(){ //相当于 页面打开先加载数据
    },
    methods:{
        onSubmit(pageNum){
            this.loading = true;
            let url = this.paramUrl;
            let params = {
                name:this.form.name,
                status:this.form.statue,
                typeId:this.form.id,
                currentPage: pageNum,
                limit: this.pagesize
            };
            this.$http({
                url:url.activeAllConfigurationsearch,
                method: "post",
                data: this.form
            }).then(res => {
                this.loading = false;
                if (res.success) {
                    this.tableData = res.data.records;
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
            });

        },
        handleCurrentChange: function(currentPage) {
              this.currentPage = currentPage;
              this.onSubmit(currentPage);
        },
        subDelete: function(id) {
            // let url = this.paramUrl;
            // this.$http({
            //     url:url.delrole,
            //     method: "post",
            //     data: { roleId: id }
            // }).then(res => {
            //     if (res.success) {
            //         this.$refs[id].doClose();
            //         this.beforeInit();
            //         this.$notify({
            //             title: res.message,
            //             type: "success",
            //             duration: 2500
            //         });
            //     } else {
            //         this.$refs[id].doClose();
            //         this.$notify({
            //             title: res.message,
            //             type: "error",
            //             duration: 2500
            //         });
            //     }
            // });
            this.$refs[id].doClose();
        },
    }
}
</script>
<style  scoped>
</style>
