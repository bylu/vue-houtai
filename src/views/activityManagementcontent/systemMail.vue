<template>
    <div class="app-container">
        <h3 class="showTit">系统邮件管理</h3>
        <el-row :gutter="32">
            <el-form  :model="form">
                <el-col :xs="24" :sm="6" :lg="3">
                    <el-input v-model.trim="form.sTitle" size="small" placeholder="邮件标题" clearable></el-input>
                </el-col>
                <el-col :xs="24" :sm="6" :lg="3">
                    <el-input v-model.trim="form.sContent" size="small" placeholder="邮件正文" clearable></el-input>
                </el-col>
                <el-col :xs="24" :sm="6" :lg="3">
                    <el-input v-model.trim="form.version" size="small" placeholder="版本号" clearable></el-input>
                </el-col>
                <el-col :xs="24" :sm="6" :lg="3">
                    <el-input v-model.trim="form.channel" size="small" placeholder="渠道ID" clearable></el-input>
                </el-col>

                <el-col :xs="24" :sm="6" :lg="3">
                    <el-select v-model="form.type" size="small" placeholder="选择类型">
                        <el-option v-for="list in selectList.emailTypelist" :key="list.key" :label="list.value" :value="list.key"></el-option>
                    </el-select>
                </el-col>

                <el-col :xs="24" :sm="6" :lg="4">
                    <el-date-picker v-model="form.beginTime" clearable align="right" size="small" type="date" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期"></el-date-picker>
                </el-col>
                <el-col :xs="24" :sm="6" :lg="4">
                    <el-date-picker v-model="form.endTime" clearable align="right" size="small" type="date" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期"></el-date-picker>
                </el-col>

                <el-col :xs="24" :sm="24" :lg="12">
                    <el-button type="danger" size="small"  v-has="'systemMail_delete'" @click="deteAll()">多选批量删除</el-button>
                    <el-button type="primary" size="small" v-has="'systemMail_search'" @click="onSubmit(1)">查询</el-button>
                    <el-button type="primary" size="small" v-has="'systemMail_search'" @click="beforeOneDay()" >向前一天</el-button>
                    <el-button type="primary" size="small" v-has="'systemMail_search'" @click="afterOneDay()">向后一天</el-button>
                    <el-button type="success" size="small" v-has="'systemMail_add'" @click="formdata=' ',showAddModuledialog=true,isAdd=true" >添加系统邮件</el-button>
                    <el-button type="danger" size="small" v-has="'systemMail_addList'" @click="importMailDialog=true">批量发送</el-button>
                </el-col>
            </el-form>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-table class="maintable" ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" border v-loading="loading" :cell-style="cellStyle" :header-cell-style="rowClass"  @selection-change="handleSelectionChange"  @sort-change='sortChange'>
                    <el-table-column type="selection" width="40"></el-table-column>
                    <el-table-column prop="userid" label="用户ID" width="100px" sortable="true"></el-table-column>
                    <el-table-column prop="sTitle" label="邮件标题" width="80px"></el-table-column>
                    <el-table-column prop="sContent" label="邮件正文">
                        <template slot-scope="scope">{{scope.row.sContent | null2empty}}</template>
                    </el-table-column>
                    <el-table-column prop="" label="物品" width="150px">
                        <template slot-scope="scope">{{scope.row.sItems | null2empty}}</template>
                    </el-table-column>
                    <el-table-column prop="starttime" label="发送时间" width="100px"></el-table-column>
                    <el-table-column prop="mExpire" label="失效时间" width="100px"></el-table-column>
                    <el-table-column prop="" label="适用版本" width="70px">
                        <template slot-scope="scope">{{scope.row.version | null2empty}}</template>
                    </el-table-column>
                    <el-table-column prop="type" label="类型" width="40px">
                        <template slot-scope="scope">{{scope.row.type | checkuserEamilType}}</template>
                    </el-table-column>
                    <el-table-column prop="channel" label="指定渠道" width="150px">
                        <template slot-scope="scope">{{scope.row.channel | null2empty}}</template>
                    </el-table-column>
                    <el-table-column prop="" label="批次" width="100px">
                        <template slot-scope="scope">
                            <span style="color:#1890ff;cursor: pointer;" @click="openUser(scope.row.group)">{{scope.row.group | null2empty }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="" label="仅注册可见" width="60px">
                        <template slot-scope="scope">{{scope.row.registerUserVisible | null2empty}}</template>
                    </el-table-column>
                    <el-table-column prop="" label="VIP限制" width="50px">
                        <template slot-scope="scope">{{scope.row.vipList | null2empty}}</template>
                    </el-table-column>
                    <el-table-column prop="" label="指定活动排除" width="70px">
                        <template slot-scope="scope">{{scope.row.excludeActType | null2empty}}</template>
                    </el-table-column>
                    <el-table-column label="操作"  width="90">
                        <template slot-scope="scope">
                            <el-popover :ref="scope.row.id" placement="top" width="180">
                                <p>确定删除本条数据吗？</p>
                                <div style="text-align: right; margin: 0">
                                    <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
                                    <el-button type="primary" size="mini" @click="subDelete(scope.row.id)">确定</el-button>
                                </div>
                                <el-button slot="reference" type="danger" v-has="'systemMail_delete'" style="margin-bottom:0px;" size="mini">删除</el-button>
                            </el-popover>
                        </template>
                    </el-table-column>
                </el-table>
                <div style="margin: 20px 0px">
                    <el-button size="mini" @click="toggleSelection()">取消选择</el-button>
                </div>
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
        <pcModal v-if="showAddModuledialog" width="760px" :title="isAdd ? '添加系统邮件' : '编辑系统邮件'" @closeModal="showAddModuledialog = false">
            <addModule :getdata="formdata" :isAdd="isAdd" @shuaxin="onSubmit(1)"  @closedialog="showAddModuledialog = false"></addModule>
        </pcModal>

        <!--批次展示-->
        <pcModal v-if="showopenUserdialog" width="760px" :title="'用户ID'" @closeModal="showopenUserdialog = false">
            <openUser :getdata="formdata"   @closedialog="showopenUserdialog = false"></openUser>
        </pcModal>
        <!--批量发送-->
        <pcModal v-if="importMailDialog" :xs="8" :sm="8" :lg="2" title="导入文件" @closeModal="importMailDialog = false">
          <dialogimportfilecontent @shuaxin="onSubmit(1)"  @closedialog="importMailDialog= false"></dialogimportfilecontent>
        </pcModal>
    </div>
</template>
<script>
export default {
    name:'',
    components: {
        addModule:() => import('./addsystemMailModule.vue'),
        openUser:()=>import('./openUserMail.vue'),
        dialogimportfilecontent:()=>import('./importMail')
    },
    data(){
        return {
            currentPage: 1, //初始页
            pagesize: 30, //    每页的数据
            total: 0,
            currentTotal:0,
            form:{
                sTitle:"",
                sContent:"",
                version:"",
                channel:"",
                //beginTime:this.moment(new Date(new Date().setHours(0, 0, 0, 0))).format("YYYY-MM-DD HH:mm:ss"),
                beginTime:this.moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
                endTime:this.moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
                type:"-1"
            },
            tableData:[],
            multipleSelection: [],
            selectData:[],
            isAdd:false,
            showAddModuledialog:false,
            loading:false,
            showopenUserdialog:false,
            formdata:'',
            importMailDialog:false,
            sort:"desc",
            sortby:"starttime",
            orderDict:[],
            orderStackSet:[],
        }
    },
    mounted(){ //相当于 页面打开先加载数据
    },
    methods:{
        cellStyle(row,column,rowIndex,columnIndex){
            return 'padding:6px 0';
        },
        rowClass({row,rowIndex}){
            return 'padding:6px 0';
        },
        toggleSelection (rows) {
            if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            } else {
                this.$refs.multipleTable.clearSelection();
            }
        },
        handleSelectionChange (val) {
            this.multipleSelection = val;
        },
        handleHeaderCellClass({row,column,rowIndex,columnIndex}){
            if(this.orderStackSet.length > 0){
            let arr =this.orderStackSet;
            let currentField =arr[arr.length - 1];
            if(currentField){
                return this.orderDict[column.property];
            }
            }
            return "";
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
            let param = {
                sTitle:this.form.sTitle,
                sContent: this.form.sContent,
                version: this.form.version,
                channel:this.form.channel,
                beginTime: this.form.beginTime,
                endTime: this.form.endTime,
                type: this.form.type,
                currentPage:pageNum,
                limit:this.pagesize,
                sort:this.sort,
                sortby:this.sortby,
            };
            this.loading = true;
            this.$api.systemMailsearch(param).then(res =>{
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
            }).catch(err =>{
                this.$message({
                message: '请求失败!',
                type: "error"
                });
            })

        },
        subDelete: function(id) {
            let param={
                id:id
            }
            this.$api.systemMaildelete(param).then(res =>{
                if (res.success) {
                    this.$refs[id].doClose();
                    this.onSubmit(1);
                  this.$message({
                    duration:0,
                    showClose: true,
                    dangerouslyUseHTMLString: true,
                    message: "<p>"+res.message+"</p>",
                    type: "success"
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
        handleCurrentChange: function(currentPage) {
            this.currentPage = currentPage;
            this.onSubmit(currentPage);
        },
        beforeOneDay(){
            if((this.form.beginTime == "" || this.form.beginTime == null) && (this.form.endTime == "" || this.form.endTime == null)){
            this.form.beginTime=this.moment(new Date()).format("YYYY-MM-DD");
            this.form.endTime=this.moment(new Date()).format("YYYY-MM-DD");
            }else{
            this.form.beginTime=this.moment(this.form.beginTime).subtract(1, 'days').format("YYYY-MM-DD");
            this.form.endTime=this.moment(this.form.endTime).subtract(1, 'days').format("YYYY-MM-DD");
            }
            this.onSubmit(1);
        },
        afterOneDay(){
            if((this.form.beginTime == "" || this.form.beginTime == null) && (this.form.endTime == "" || this.form.endTime == null)){
            this.form.beginTime=this.moment(new Date()).format("YYYY-MM-DD");
            this.form.endTime=this.moment(new Date()).format("YYYY-MM-DD");
            }else{
            this.form.beginTime=this.moment(this.form.beginTime).add(1, 'days').format("YYYY-MM-DD");
            this.form.endTime=this.moment(this.form.endTime).add(1, 'days').format("YYYY-MM-DD");
            }
            this.onSubmit(1);
        },
        openUser(data){
            this.showopenUserdialog =true;
            this.formdata=data;
        },
        deteAll(){
            this.selectData =  this.multipleSelection.map((item,index)=>{return item.id}).join(",");
            let userids = this.multipleSelection.map((item,index)=>{return item.userid}).join(",");
            this.$prompt('请勾选删除的多选框！！！', '批量删除', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputValue:this.selectData,
                inputValidator:function(inputValue){
                    if(inputValue == "" ||inputValue == null){
                        return "请勾选删除的多选框"
                    }
                },
                inputPlaceholder:'勾选删除的多选框的值'
            }).then(({ value }) => {
                let param={
                    id:value,
                    userids:userids
                }
                this.$api.systemMaildelete(param).then(res =>{
                    if (res.success) {
                      this.$message({
                        duration:5000,
                        showClose: true,
                        dangerouslyUseHTMLString: true,
                        message: "<p>"+res.message+"</p>",
                        type: "success"
                      });
                      //this.$refs[id].doClose();
                      this.onSubmit(1);
                    } else {
                        //this.$refs[id].doClose();
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
            }).catch(e=>e);

        }
    }
}
</script>
<style  scoped>
.el-date-editor.el-input, .el-date-editor.el-input__inner{
    width:100%;
}
</style>
