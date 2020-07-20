<template>
  <div class="app-container">
    <h3 class="showTit">道具监控</h3>
    <el-row :gutter="32">
      <el-form ref="form" :model="form">
        <el-col :xs="24" :sm="6" :lg="4">
          <el-date-picker v-model="form.beginTime" clearable size="small" align="right" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="开始日期" >
          </el-date-picker>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="4">
          <el-date-picker v-model="form.endTime" clearable size="small" align="right" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="结束日期">
          </el-date-picker>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.dropId" size="small" placeholder="道具ID" clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="8" v-has="'itemTotal_search'">
          <el-button type="primary" size="small" @click="onSubmit(1)">查询</el-button>
          <el-button type="primary" size="small"  @click="beforeOneDay()" >向前一天</el-button>
          <el-button type="primary" size="small"  @click="afterOneDay()">向后一天</el-button>
        </el-col>
      </el-form>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" style="width: 100%" :cell-style="cellStyle" :header-cell-style="rowClass" border v-loading="tableloading">
          <el-table-column prop="itemId" label="道具id"></el-table-column>
          <el-table-column prop="itemName" label="道具名称">
            <template slot-scope="scope">{{ scope.row.itemName | null2empty }}</template>
          </el-table-column>
          <el-table-column prop="itemTotal" label="当前余量">
            <template slot-scope="scope">{{ scope.row.itemTotal | numTenthousand }}</template>
          </el-table-column>
          <el-table-column prop="addItem" label="总发行">
            <template slot-scope="scope">{{ scope.row.addItem | numTenthousand }}</template>
          </el-table-column>
          <el-table-column prop="loseItem" label="总消耗">
            <template slot-scope="scope">{{ scope.row.loseItem | numTenthousand }}</template>
          </el-table-column>
          <el-table-column prop="fazhi" label="监控阈值">
            <template slot-scope="scope">{{ scope.row.fazhi | null2Zero }}</template>
          </el-table-column>
          <el-table-column prop="date" label="时间">
            <template slot-scope="scope">{{ scope.row.date | null2empty }}</template>
          </el-table-column>
          <el-table-column prop="" label="操作" width="200px">
            <template slot-scope="scope">
              <el-button type="success" size="mini" v-has="'itemTotal_updateValue'" style="margin-bottom:0px" @click="formdata=scope.row,itemTotalModifyDialog=true" >修改阈值</el-button>
              <el-button type="primary" size="mini" v-has="'itemTotal_searchThisItem'" style="margin-bottom:0px" @click="detailedJump(scope.row.itemId)" plain>明细</el-button>
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

    <!--修改阈值 弹框-->
    <pcModal v-if="itemTotalModifyDialog" :xs="8" :sm="8" :lg="2" :title="'修改阈值'" @closeModal="itemTotalModifyDialog = false">
        <itemTotalModifyModule :getdata="formdata" @shuaxin="onSubmit(1)" @closedialog="itemTotalModifyDialog = false"></itemTotalModifyModule>
    </pcModal>

  </div>
</template>

<script>
    export default {
        name: "itemTotal",
        components: {
          itemTotalModifyModule:() => import('./itemTotalModifyModule.vue')
        },
        data(){
          return{
            currentPage: 1, //初始页
            pagesize: 30, //    每页的数据
            total: 0,
            currentTotal:0,
            form: {
              beginTime:this.moment(new Date(new Date().setHours(0, 0, 0, 0))).format("YYYY-MM-DD"),
              endTime:this.moment(new Date()).format("YYYY-MM-DD"),
              dropId:''
            },
            tableData: [],
            itemTotalModifyDialog:false,
            tableloading:false
          }
        },
        methods:{
            cellStyle(row,column,rowIndex,columnIndex){
              return 'text-align:center;padding:6px 0';
            },
            rowClass({row,rowIndex}){
              return 'text-align:center;padding:6px 0';
            },
            onSubmit(pageNum){
              //beginTime,endTime,itemId,currentPage,limit
              let param = {
                beginTime:this.form.beginTime,
                endTime:this.form.endTime,
                itemId:this.form.dropId,
                currentPage:pageNum,
                limit:this.pagesize
              };
              this.tableloading=true;
              this.$api.itemTotalsearch(param).then(res =>{
                this.tableloading=false;
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
                } else {
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
            //beginTime,endTime,itemId
            detailedJump(data){
              const {href} = this.$router.resolve({
                path: '/itemTotalByMinute',
                query: {
                  beginTime:this.form.beginTime,
                  endTime:this.form.endTime,
                  itemId: data,
                }
              })
              window.open(href, '_blank')
            }
        }
    }
</script>

<style scoped>
.el-date-editor.el-input, .el-date-editor.el-input__inner{
    width:100%;
}
</style>
