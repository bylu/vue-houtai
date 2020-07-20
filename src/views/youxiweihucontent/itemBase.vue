<template>
    <div class="app-container">
        <h3 class="showTit">道具管理</h3>
        <el-row :gutter="32">
            <el-form  :model="form">
                <el-col :xs="24" :sm="6" :lg="3">
                    <el-input v-model.trim="form.id" size="small" placeholder="道具id" clearable></el-input>
                </el-col>
                <el-col :xs="24" :sm="6" :lg="3">
                    <el-input v-model.trim="form.fullname" size="small" placeholder="道具名称" clearable></el-input>
                </el-col>
                <el-col :xs="24" :sm="24" :lg="10">
                    <el-button type="primary" size="small" v-has="'itemBase_search'" @click="onSubmit(1)">查询</el-button>

                    <el-button type="success" size="small" v-has="'itemBase_giveItem'" @click="giftProps">赠送道具</el-button>

                    <el-button type="danger" size="small" v-has="'itemBase_refresh'" @click="Refresh">刷新</el-button>

                    <el-button type="warning" size="small" v-has="'itemBase_shiftItem'" @click="TransferProps">转移道具</el-button>

                    <el-button type="danger" size="small" v-has="'itemBase_import'" @click="showimportdialog=true"  plain="">导入</el-button>
                </el-col>
            </el-form>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-table class="maintable" ref="multipleTable" :data="tableData" border tooltip-effect="dark" style="width: 100%" v-loading="tableloading" :cell-style="cellStyle" :header-cell-style="rowClass">
                    <el-table-column prop="id" label="Eentry" width="80px"></el-table-column>
                    <el-table-column prop="fullname" label="fullName" width="80px"></el-table-column>
                    <el-table-column prop="type" label="Type" width="40px"></el-table-column>
                    <el-table-column prop="displayid" label="Displayid" ></el-table-column>
                    <el-table-column prop="quality" label="Quality" width="50px"></el-table-column>
                    <el-table-column prop="canuse" label="Use" width="50px"></el-table-column>
                    <el-table-column prop="itemtype" label="ItemType" width="55px"></el-table-column>
                    <el-table-column prop="canCompose" label="Can_Compose" width="55px"></el-table-column>
                    <el-table-column prop="bean" label="Bean" ></el-table-column>
                    <el-table-column prop="lottery" label="Lottery" ></el-table-column>
                    <el-table-column prop="quantity" label="Quantity" width="500px"></el-table-column>
                    <el-table-column prop="itemlevel" label="ItemLevel" width="55px"></el-table-column>
                    <el-table-column prop="viplevel" label="Vip" width="50px"></el-table-column>
                    <el-table-column prop="dayType" label="DayType" width="50px"></el-table-column>
                    <el-table-column prop="buy" label="Buy" ></el-table-column>
                    <el-table-column prop="buyprice" label="BuyPrice" ></el-table-column>
                    <el-table-column prop="hotsell" label="Hot_Sell" ></el-table-column>
                    <el-table-column prop="discount" label="Discount" ></el-table-column>
                    <el-table-column prop="sell" label="Sell" ></el-table-column>
                    <el-table-column prop="sellprice" label="SellPrice" ></el-table-column>
                    <el-table-column prop="stackable" label="Stackable" ></el-table-column>
                    <el-table-column prop="bonding" label="Bonding" ></el-table-column>
                    <el-table-column prop="validDate" label="ValidDate" ></el-table-column>
                    <el-table-column prop="usecount" label="UseCount" ></el-table-column>
                    <el-table-column prop="description" label="Describe" width="300px"></el-table-column>
                    <el-table-column prop="stock" label="Stock" ></el-table-column>
                    <el-table-column prop="perconsume" label="perconsume" ></el-table-column>
                    <el-table-column prop="versions" label="Versions" ></el-table-column>
                    <el-table-column prop="giveVip" label="GiveVip" ></el-table-column>
                    <el-table-column prop="giveMinNumber" label="GiveNumber" ></el-table-column>
                    <el-table-column prop="integral" label="Integral" ></el-table-column>
                    <el-table-column prop="useTime" label="useTime" ></el-table-column>
                    <el-table-column prop="validMinute" label="validMinute" ></el-table-column>
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

        <!--封装公用的    赠送道具  转移道具-->
        <pcModal v-if="showdialog" :xs="8" :sm="8" :lg="2" :title="dialogtitle" @closeModal="showdialog = false">
            <dialogcontent :typeid="typeid" @shuaxin="onSubmit(1)" @closedialog="showdialog= false"></dialogcontent>
        </pcModal>

        <pcModal v-if="showimportdialog" :xs="8" :sm="8" :lg="2" title="导入文件" @closeModal="showimportdialog = false">
            <dialogimportfilecontent @shuaxin="onSubmit(1)" @closedialog="showimportdialog= false"></dialogimportfilecontent>
        </pcModal>

    </div>
</template>
<script>
export default {
    name:'itemBase',
    components: {
        dialogcontent:() => import('./additemBasePropsModule.vue'),
        dialogimportfilecontent:() => import('./dialogimportfilecontent.vue')
    },
    data(){
        return {
            currentPage: 1, //初始页
            pagesize: 30, //    每页的数据
            total: 0,
            currentTotal:0,
            form:{
              id:'',
              fullname:''
            },
            tableData:[],
            showdialog:false,
            showimportdialog:false,
            tableloading:false,
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
        onSubmit(pageNum){
            //fullname,currentPage, limit
            let param = {
                id:this.form.id,
                fullname:this.form.fullname,
                currentPage:pageNum,
                limit:this.pagesize
            };
            this.tableloading=true;
            this.$api.itemBasesearch(param).then(res =>{
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
        giftProps(){ //赠送道具
            this.showdialog=true;
            this.dialogtitle="赠送道具";
            this.typeid=1;
        },
        TransferProps(){ //转移道具
            this.showdialog=true;
            this.dialogtitle="转移道具";
            this.typeid=2;
        },
        Refresh(){
           this.$confirm('是否刷新', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(async() => {
                    this.$api.itemBaserefresh().then(res =>{
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
