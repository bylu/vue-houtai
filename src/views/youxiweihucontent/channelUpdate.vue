<template>
    <div class="app-container">
        <h3 class="showTit">渠道升级管理</h3>
            <el-row :gutter="32">
                <el-form  :model="form">
                    <el-col :xs="24" :sm="12" :lg="3">
                        <el-input v-model.trim="form.spreadid" size="small" placeholder="渠道ID" clearable></el-input>
                    </el-col>
                    <el-col :xs="24" :sm="12" :lg="3">
                        <el-input v-model.trim="form.channelName" size="small" placeholder="渠道标识" clearable></el-input>
                    </el-col>
                    <el-col :xs="24" :sm="12" :lg="3">
                        <el-select v-model="form.type" placeholder="请选择" size="small">
                            <el-option   v-for="list in selectList.editionstatue" :key="list.key" :label="list.value" :value="list.key"></el-option>
                        </el-select>
                    </el-col>
                   <el-col :xs="24" :sm="12" :lg="4">
                        <el-button type="primary" size="small" v-has="'channelUpdate_search'" @click="onSubmit(1)">查询</el-button>
                        <el-button  type="warning" size="small" v-has="'channelUpdate_add'" @click="formdata=' ',showAddModuledialog=true,isAdd=true" >添加渠道</el-button>
                    </el-col>
                </el-form>
            </el-row>
        <!-- 每一个块都是 el-row   -->
        <el-row>
            <el-col :span="24">
                <el-table class="maintable" ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%" border v-loading="tableloading" :cell-style="cellStyle" :header-cell-style="rowClass"  @sort-change='sortChange'>
                    <el-table-column prop="type" label="类型" >
                        <template slot-scope="scope">
                            {{scope.row.type | typeCheck}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="spreadid" label="渠道ID" ></el-table-column>
                    <el-table-column prop="channelName" label="渠道标识" ></el-table-column>
                    <el-table-column prop="platform" label="平台" ></el-table-column>
                    <el-table-column prop="gameid" label="游戏ID" ></el-table-column>
                    <el-table-column prop="clientVersion" label="客户端版本号" ></el-table-column>
                    <el-table-column prop="serverVersion" label="服务端版本号" ></el-table-column>
                    <el-table-column prop="isupdate" label="更新方式" >
                        <template slot-scope="scope">
                            {{scope.row.isupdate | isupdateCheck}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="updateType" label="自动or手动" >
                        <template slot-scope="scope">
                            {{scope.row.updateType | updateTypeCheck}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="downloadurl" label="安装包下载地址" width="80px">
                        <template slot-scope="scope">
                            <span style="color:#1890ff;cursor: pointer;" @click="showDownloadUrl(scope.row.downurl)">查看</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="userDefined" label="自定义参数">
                        <template slot-scope="scope">{{ scope.row.userDefined | null2empty }}</template>
                    </el-table-column>
                    <el-table-column prop="note" label="说明"></el-table-column>
                    <el-table-column prop="createDate" label="创建时间" sortable="true"></el-table-column>
                    <el-table-column prop="updateDate" label="更新时间" sortable="true"></el-table-column>
                    <el-table-column label="操作"  width="230" fixed="right">
                        <template slot-scope="scope">
                            <el-button size="mini" type="primary" v-has="'channelUpdate_update'" @click="formdata=scope.row,showAddModuledialog=true,isAdd=false">编辑</el-button>
                            <el-popover :ref="scope.row.id" placement="top" width="180">
                                <p>确定删除本条数据吗？</p>
                                <div style="text-align: right; margin: 0">
                                    <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
                                    <el-button type="primary" size="mini" @click="subDelete(scope.row.id)">确定</el-button>
                                </div>
                                <el-button slot="reference" type="danger" v-has="'channelUpdate_delete'" size="mini">删除</el-button>
                            </el-popover>
                            <el-button size="mini" type="success" v-has="'channelUpdate_copy'" @click="formdata=scope.row,channelUpdateModifyModuledialog=true">复制</el-button>
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
        <pcModal v-if="showAddModuledialog" width="780px" :title="isAdd ? '新增渠道' : '编辑渠道'" @closeModal="showAddModuledialog = false">
            <addModule :getdata="formdata" :isAdd="isAdd" @shuaxin="onSubmit(1)"  @closedialog="showAddModuledialog = false"></addModule>
        </pcModal>

        <!--复制 弹框-->
        <pcModal v-if="channelUpdateModifyModuledialog" width="780px" :title="'复制'" @closeModal="channelUpdateModifyModuledialog = false">
            <channelUpdateModifyModule :getdata="formdata" @shuaxin="onSubmit(1)"  @closedialog="channelUpdateModifyModuledialog = false"></channelUpdateModifyModule>
        </pcModal>

        <!--安装包下载地址  弹框-->
        <!-- <pcModal v-if="showdialogeLook" :xs="8" :sm="8" :lg="2" :title="'安装包下载地址'" @closeModal="showdialogeLook = false">
            <downloadurlDialogModule :getdata="formdata"   @closedialog="showdialogeLook = false"></downloadurlDialogModule>
        </pcModal> -->

    </div>
</template>
<script>
export default {
    name:'channelUpdate',
    components: {
        addModule:() => import('./addChannelupdateModule.vue'),
        channelUpdateModifyModule:() => import('./channelUpdateModifyModule.vue'),
       // downloadurlDialogModule:()=>import('./downloadurlDialogModule.vue')
    },
    data(){
        return {
            currentPage: 1, //初始页
            pagesize: 30, //    每页的数据
            total: 0,
            currentTotal:0,
            form:{
                channelName:'',
                spreadid:'',
                type:"0"
            },
            tableData:[],
            showdialogeLook:false,
            showAddModuledialog:false,
            channelUpdateModifyModuledialog:false,
            tableloading:false,
            sort:"desc",
            sortby:"updateDate",
            orderDict:[],
            orderStackSet:[]
        }
    },
    mounted(){
        this.onSubmit(1);
    },
    methods:{
        cellStyle(row,column,rowIndex,columnIndex){
            return 'padding:6px 0';
        },
        rowClass({row,rowIndex}){
            return 'padding:6px 0';
        },
        sortChange({column,prop,order}){
        this.orderStackSet=this.orderStackSet.filter(item => item != prop);
        if(order != null){
          this.orderDict[prop]=order;
          this.orderStackSet.push(prop);
        }else if(order == null){
          this.orderDict[prop]="";
          this.orderStackSet.push(prop);
        }else{
          delete this.orderDict[prop];
        }
        if(this.orderStackSet.length > 1){
          let del=this.orderStackSet.splice(0,1);
          let leftE=del[0];
          delete this.orderDict[leftE]
        }
        if(this.orderDict[prop] == "descending"){
          this.sort="desc"
        }else if(this.orderDict[prop] == "ascending"){
          this.sort="asc"
        }else{
          this.sort=""
        }
        this.sortby= (this.orderStackSet).toString();
        this.onSubmit(1);
      },
        onSubmit(pageNum){
            this.loading = true;
            let param={
                spreadid:this.form.spreadid,
                channelName:this.form.channelName,
                type:this.form.type,
                currentPage: pageNum,
                limit: this.pagesize,
                sort:this.sort,
                sortby:this.sortby,
            }
            this.tableloading=true;
            this.$api.channelUpdatesearch(param).then(res =>{
                this.loading = false;
                if (res.success) {
                    this.tableData = res.data.records;
                    this.tableloading=false;
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
            this.$api.channelUpdatedelete(param).then(res =>{
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
        showDownloadUrl(data){
            this.$alert(data, '下载地址:', {
                confirmButtonText: '确定',
            }).catch(e=>e);
        }
    }
}
</script>
<style  scoped>
</style>
