<template>
    <div class="app-container">
        <h3 class="showTit">银行记录</h3>
        <el-row :gutter="32">
            <el-form  :model="form">
                <el-col :xs="24" :sm="12" :lg="3">
                    <el-input v-model.trim="form.targetUserID" size="small" placeholder="目标用户ID" clearable></el-input>
                </el-col>
                <el-col :sx="12" :sm="6" :lg="4">
                    <el-select v-model="form.tradeType" placeholder="请选择类型" size="small">
                    <el-option
                        v-for="(list,index) in selectList.allpayResultList"
                        :key="index"
                        :label="list.value"
                        :value="list.key"
                    ></el-option>
                    </el-select>
                </el-col>
                <el-col :xs="24" :sm="12" :lg="4">
                    <el-date-picker v-model="form.beginTime" align="right" size="small" type="date" value-format="yyyy-MM-dd"  format="yyyy-MM-dd"
                        placeholder="请输入执行时间" clearable
                    ></el-date-picker>
                </el-col>

                <el-col :xs="24" :sm="12" :lg="4">
                    <el-date-picker v-model="form.endTime" align="right" size="small" type="date" value-format="yyyy-MM-dd"  format="yyyy-MM-dd"
                        placeholder="请输入执行时间" clearable
                    ></el-date-picker>
                </el-col>

                <el-col :xs="24" :sm="12" :lg="6" v-has="'recordInsure_search'">
                    <el-button type="primary" size="small" @click="onSubmit(1)">查询</el-button>
                    <el-button type="primary" size="small"  @click="beforeOneDay()" >向前一天</el-button>
                    <el-button type="primary" size="small"  @click="afterOneDay()">向后一天</el-button>
                </el-col>
            </el-form>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-table class="maintable" ref="multipleTable" :data="tableData" :cell-style="cellStyle" :header-cell-style="rowClass" tooltip-effect="dark" style="width: 100%" border v-loading="tableloading">
                    <el-table-column prop="sourceUserID" label="用户ID">
                      <template slot-scope="scope">
                        <span style="color:#1890ff;cursor: pointer;" type='text' @click="openNewWin(scope.row.sourceUserID)">{{ scope.row.sourceUserID }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="tradeType" label="交易类型" >
                        <template slot-scope="scope">{{ scope.row.tradeType | checktradeType }}</template>
                    </el-table-column>
                    <el-table-column prop="" label="交易金额">
                        <template slot-scope="scope"><div v-html="commonJs.col(swapScore1(scope.row.tradeType,scope.row.swapScore))"></div></template>
                    </el-table-column>
                    <el-table-column prop="sourceBank" label="操作前">
                        <template slot-scope="scope">{{ scope.row.sourceBank | numTenthousand }}</template>
                    </el-table-column>
                  <el-table-column prop="" label="操作后">
                      <template slot-scope="scope"> {{sourceBank(scope.row.swapScore,scope.row.tradeType,scope.row.sourceBank)}}</template>
                  </el-table-column>
                  <el-table-column prop="targetUserID" label="目标用户ID"></el-table-column>
                  <el-table-column prop="collectDate" label="操作时间" width="160px"></el-table-column>
                  <el-table-column prop="isGamePlaza" label="操作场所">
                      <template slot-scope="scope"> {{isGamePlaza(scope.row.isGamePlaza)}}</template>
                  </el-table-column>
                  <el-table-column prop="collectNote" label="备注">
                      <template slot-scope="scope">{{ scope.row.collectNote | null2empty }}</template>
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
    </div>
</template>
<script>
    export default {
        name:'recordInsure',
        data(){
            return {
                currentPage: 1, //初始页
                pagesize: 30, //    每页的数据
                total: 0,
                currentTotal:0,
                form:{
                    targetUserID:'',
                    beginTime:this.moment(new Date(new Date().setHours(0, 0, 0, 0))).format("YYYY-MM-DD"),
                    endTime:this.moment(new Date()).format("YYYY-MM-DD"),
                    tradeType:'-1',
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
                    targetUserID:this.form.targetUserID,
                    beginTime: this.form.beginTime,
                    endTime:this.form.endTime,
                    tradeType:this.form.tradeType,
                    currentPage: pageNum,
                    limit: this.pagesize
                };
                this.tableloading=true;
                this.$api.recordInsuresearch(params).then(res =>{
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
            swapScore1(tradeType,swapScore){
                if(swapScore == null) {
                    return "";
                }else{
                    if(tradeType ==2) {
                        return (-swapScore);//"取款";
                    }else{
                        return (swapScore);
                    }
                }
            },
            sourceBank(swapScore,tradeType,sourceBank){
                var sum = 0;
                if(tradeType ==2) {
                    sum = this.commonJs.numTenthousand(sourceBank - swapScore);
                }else{
                    sum = this.commonJs.numTenthousand(sourceBank + swapScore);
                }
                return (this.commonJs.numTenthousand(sum));
            },
            isGamePlaza(isGamePlaza){
                if(isGamePlaza == null) {
                    return "";
                }else{
                    if (isGamePlaza == 0) {
                        return "大厅";
                    }else {
                        return "网页";
                    }
                }
            }
        }
    }
</script>
<style  scoped>
.el-date-editor.el-input, .el-date-editor.el-input__inner{
    width:100%;
}
</style>
