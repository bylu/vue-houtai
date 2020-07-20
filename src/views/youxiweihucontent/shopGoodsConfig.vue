<template>
    <div class="app-container">
        <h3 class="showTit">游戏商城物品</h3>
        <el-row :gutter="32">
            <el-form  :model="form">
                <el-col :xs="24" :sm="6" :lg="3">
                    <el-input v-model.trim="form.shopname" size="small" placeholder="商品名称" clearable></el-input>
                </el-col>
                <el-col :xs="24" :sm="6" :lg="3">
                    <el-input v-model.trim="form.shopspend" size="small" placeholder="价格" clearable></el-input>
                </el-col>

                <el-col :xs="24" :sm="6" :lg="4">
                    <el-button type="primary" size="small" v-has="'shopGoodsConfig_search'" @click="onSubmit(1)">查询</el-button>
                    <el-button type="danger" v-has="'shopGoodsConfig_add'" @click="formdata='',shopGoodsConfigDialog=true,isAdd=true"  size="small">添加</el-button>
                </el-col>
            </el-form>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-table class="maintable" ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%"
                 v-loading="tableloading" border @sort-change='sortChange' :header-cell-class-name="handleHeaderCellClass" :cell-style="cellStyle" :header-cell-style="rowClass" >
                    <el-table-column prop="id" label="ID"></el-table-column>
                    <el-table-column prop="shopname" label="商品名称" width="100px">
                    </el-table-column>
                    <el-table-column prop="shopspend" label="商品价值(奖券)" sortable="true"></el-table-column>
                    <el-table-column prop="" label="商品类型">
                        <template slot-scope="scope">{{scope.row.typeid | checkShopType}}</template>
                    </el-table-column>
                    <el-table-column prop="channelid" label="渠道号" width="90px">
                        <template slot-scope="scope">{{scope.row.channelid | null2empty}}</template>
                    </el-table-column>
                    <el-table-column prop="inserttime" label="插入时间" width="100px" sortable="true"></el-table-column>
                    <el-table-column prop="cost" label="发货数量" sortable="true">
                        <template slot-scope="scope">{{scope.row.cost | null2empty}}</template>
                    </el-table-column>
                    <el-table-column prop="mobileDataId" label="道具ID">
                        <template slot-scope="scope">{{scope.row.mobileDataId | null2empty}}</template>
                    </el-table-column>
                    <el-table-column prop="showtype" label="展示类型" width="100px">
                        <template slot-scope="scope">{{scope.row.showtype | showtypeStatue}}</template>
                    </el-table-column>
                    <el-table-column prop="disable" label="状态">
                        <template slot-scope="scope">{{ scope.row.disable | checkShopdisable }}</template>
                    </el-table-column>
                    <el-table-column prop="weight" label="权重" width="120px">
                        <template slot-scope="scope">{{scope.row.weight | null2empty}}</template>
                    </el-table-column>
                    <el-table-column prop="discount" label="打折" width="50px">
                        <template slot-scope="scope">{{ scope.row.discount  | checkshopdiscountOrisnew }}</template>
                    </el-table-column>
                    <el-table-column prop="discountrate" label="折率" sortable="true">
                        <template slot-scope="scope">{{scope.row.discountrate | null2empty}}</template>
                    </el-table-column>
                    <el-table-column prop="discountdate" label="打折时间" width="100px" sortable="true">
                        <template slot-scope="scope">{{scope.row.discountdate | null2empty}}</template>
                    </el-table-column>
                    <el-table-column prop="isnew" label="新品" width="50px">
                        <template slot-scope="scope">{{ scope.row.isnew | checkshopdiscountOrisnew }}</template>
                    </el-table-column>
                    <el-table-column label="图片"   width="110px">
                        <template slot-scope="scope">
                            <span style="color:#1890ff;cursor: pointer;"  @click="openPic(scope.row.bigImg)" v-if="scope.row.bigImg != null">大图&nbsp;&nbsp; | &nbsp;</span>
                            <span v-else></span>
                            <span style="color:#1890ff;cursor: pointer;"  @click="openPic(scope.row.smallImg)" v-if="scope.row.smallImg != null">小图</span>
                            <span v-else></span>
                            
                        </template>
                    </el-table-column>
                    <el-table-column label="操作"  width="160px">
                        <template slot-scope="scope">
                        <el-button size="mini" type="primary" v-has="'shopGoodsConfig_update'" @click="formdata=scope.row,shopGoodsConfigDialog=true,isAdd=false" >修改</el-button>
                            <el-popover :ref="scope.row.id" placement="top" width="180">
                                <p>确定删除本条数据吗？</p>
                                <div style="text-align: right; margin: 0">
                                    <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
                                    <el-button type="primary" size="mini" @click="subDelete(scope.row.id)">确定</el-button>
                                </div>
                                <el-button slot="reference" type="danger" v-has="'shopGoodsConfig_delete'" size="mini">删除</el-button>
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
        <pcModal v-if="shopGoodsConfigDialog" width="760px" :title="isAdd ? '添加' : '编辑'" @closeModal="shopGoodsConfigDialog = false">
            <shopGoodsConfigDialogModule :getdata="formdata" :isAdd="isAdd" @shuaxin="onSubmit(1)"  @closedialog="shopGoodsConfigDialog = false"></shopGoodsConfigDialogModule>
        </pcModal>
    </div>
</template>
<script>
    export default {
        name:'',
        components:{
            shopGoodsConfigDialogModule:() => import('./shopGoodsConfigModule.vue')
        },
        data(){
            return {
                currentPage: 1, //初始页
                pagesize: 30, //    每页的数据
                total: 0,
                currentTotal:0,
                form:{
                    shopname:'',
                    shopspend:'',
                },
                tableData:[],
                shopGoodsConfigDialog:false,
                isAdd:false,
                tableloading:false,
                sort:"",
                sortby:"",
                orderDict:[],
                orderStackSet:[]
            }
        },
        mounted(){
           //this.onSubmit(1);
        },
        methods:{
            cellStyle(row,column,rowIndex,columnIndex){
            return 'padding:6px 0;';
            },
            rowClass({row,rowIndex}){
            return 'padding:6px 0;';
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
                this.loading = true;
                let params = {
                    shopname:this.form.shopname,
                    shopspend: this.form.shopspend,
                    currentPage: pageNum,
                    limit: this.pagesize,
                    sort:this.sort,
                    sortby:this.sortby,
                };
                this.tableloading=true;
                this.$api.shopGoodsConfigsearch(params).then(res =>{
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
            subDelete: function(id) {
                let param={id: id }
                this.$api.shopGoodsConfigdelete(param).then(res =>{
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
            openPic(data){
             window.open("https://"+data, '_blank')
            }
        }
    }
</script>
<style  scoped>
</style>
