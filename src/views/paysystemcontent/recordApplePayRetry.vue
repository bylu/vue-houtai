<template>
    <div class="app-container">
        <h3 class="showTit">苹果充值记录</h3>
        <el-row :gutter="32">
            <el-form  :model="form">
                <el-col :xs="24" :sm="12" :lg="3">
                    <el-input v-model.trim="form.gameid" size="small" placeholder="游戏ID" clearable></el-input>
                </el-col>
                <el-col :xs="24" :sm="12" :lg="3">
                    <el-input v-model.trim="form.userid" size="small" placeholder="用户ID" clearable></el-input>
                </el-col>
                <el-col :xs="24" :sm="12" :lg="3">
                    <el-input v-model.trim="form.nickname" size="small" placeholder="昵称" clearable></el-input>
                </el-col>
                <el-col :xs="24" :sm="12" :lg="4">
                    <el-date-picker v-model="form.beginTime" align="right" clearable size="small" type="date" value-format="yyyy-MM-dd"  format="yyyy-MM-dd" placeholder="请输入执行时间"></el-date-picker>
                </el-col>
                    <el-col :xs="24" :sm="12" :lg="4">
                    <el-date-picker v-model="form.endTime" align="right" clearable size="small" type="date" value-format="yyyy-MM-dd"  format="yyyy-MM-dd" placeholder="请输入执行时间" ></el-date-picker>
                </el-col>
                <el-col :xs="24" :sm="12" :lg="6" v-has="'recordApplePayRetry_search'">
                    <el-button type="primary" size="small" @click="onSubmit(1)">查询</el-button>
                    <el-button type="primary" size="small"  @click="beforeOneDay()" >向前一天</el-button>
                    <el-button type="primary" size="small"  @click="afterOneDay()">向后一天</el-button>
                </el-col>
            </el-form>
            </el-row>
        <el-row>
            <el-col :span="24">
                <el-table class="maintable" ref="multipleTable" :cell-style="cellStyle" :header-cell-style="rowClass" :data="tableData" tooltip-effect="dark" style="width: 100%" border v-loading="tableloading">
                    <el-table-column prop="userid" label="用户ID"></el-table-column>
                    <el-table-column prop="gameid" label="游戏ID">
                      <template slot-scope="scope">
                        <span style="color:#1890ff;cursor: pointer;" @click="openNewWin(scope.row.gameid)">{{ scope.row.gameid | null2Zero}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="nickname" label="用户昵称">
                        <template slot-scope="scope"> {{scope.row.nickname | null2Zero }}</template>
                    </el-table-column>
                    <el-table-column prop="status" label="状态"></el-table-column>
                    <el-table-column prop="retrynum" label="点击次数"></el-table-column>
                    <el-table-column prop="md5key" label="MD5key" width="290px"></el-table-column>
                    <el-table-column prop="insertdate" label="录入时间"></el-table-column>
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
    </div>
</template>
<script>
    export default {
        name:'recordApplePayRetry',
        data(){
            return {
                currentPage: 1, //初始页
                pagesize: 30, //    每页的数据
                total: 0,
                currentTotal:0,
                form:{
                    gameid:'',
                    userid:'',
                    nickname:'',
                    beginTime:this.moment(new Date(new Date().setHours(0, 0, 0, 0))).format("YYYY-MM-DD"),
                    endTime:this.moment(new Date()).format("YYYY-MM-DD"),
                },
                tableData:[],
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
                    gameid: this.form.gameid,
                    userid:this.form.userid,
                    nickname: this.form.nickname,
                    beginTime: this.form.beginTime,
                    endTime:this.form.endTime,
                    currentPage: pageNum,
                    limit: this.pagesize
                };
                this.tableloading=true;
                this.$api.recordApplePayRetrysearch(params).then(res =>{
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
            openNewWin(data){
              const {href} = this.$router.resolve({
                path: '/userbaseinfo',
                query: {
                  gameID: data
                }
              })
              window.open(href, '_blank')
            },
        }
    }
</script>
<style  scoped>
.el-date-editor.el-input, .el-date-editor.el-input__inner{
    width:100%;
}
</style>
