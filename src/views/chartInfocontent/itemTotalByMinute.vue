<template>
  <div class="app-container">
    <h3 class="showTit">道具余量明细</h3>
    <el-row :gutter="32">
      <el-form ref="form" :model="form">
        <el-col :xs="24" :sm="6" :lg="4">
          <el-date-picker v-model="form.beginTime" size="small" clearable align="right" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="开始日期"></el-date-picker>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="4">
          <el-date-picker v-model="form.endTime" size="small" clearable align="right" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="结束日期"></el-date-picker>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.itemId" size="small" placeholder="道具id" clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="8">
          <el-button type="primary" size="small" @click="onSubmit(1)">查询</el-button>
          <el-button type="primary" size="small"  @click="beforeOneDay()" >向前一天</el-button>
          <el-button type="primary" size="small"  @click="afterOneDay()">向后一天</el-button>
        </el-col>
      </el-form>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" style="width: 100%" :cell-style="cellStyle" :header-cell-style="rowClass" border v-loading="tableloading">
          <el-table-column prop="itemId" label="道具id" show-overflow-tooltip></el-table-column>
          <el-table-column prop="itemName" label="道具名称" show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.itemName | null2empty }}</template>
          </el-table-column>
          <el-table-column prop="" label="当前余量" show-overflow-tooltip>
            <template slot-scope="scope">
              <span style="color:#1890ff;cursor: pointer;" @click="showP(scope.row)">{{ scope.row.total | null2Zero }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="totalGrowth" label="余量增长" show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.totalGrowth | null2Zero }}</template>
          </el-table-column>
          <el-table-column prop="addTotal" label="当日发行" show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.addTotal | null2Zero }}</template>
          </el-table-column>
          <el-table-column prop="" label="发行增长" show-overflow-tooltip>
            <template slot-scope="scope">
              <span style="color:#1890ff;cursor: pointer;" @click="showAddP(scope.row)">{{ scope.row.addGrowth | null2Zero }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="loseTotal" label="当日消耗" show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.loseTotal | null2Zero }}</template>
          </el-table-column>
          <el-table-column prop="" label="消耗增长" show-overflow-tooltip>
            <template slot-scope="scope">
              <span style="color:#1890ff;cursor: pointer;" @click="showLoseP(scope.row)">{{ scope.row.loseGrowth | null2Zero }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="inserttime" label="时间" width="160px">
            <template slot-scope="scope">{{ scope.row.inserttime | null2empty }}</template>
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
        name: "itemTotalByMinute",
        data(){
          return{
            currentPage: 1, //初始页
            pagesize: 30, //    每页的数据
            total: 0,
            currentTotal:0,
            form: {
              beginTime:this.moment(new Date(new Date().setHours(0, 0, 0, 0))).format("YYYY-MM-DD"),
              endTime:this.moment(new Date()).format("YYYY-MM-DD"),
              itemId: ''
            },
            tableData: [],
            tableloading:false
          }
        },
        mounted(){
          this.getParams()
        },
        methods:{
            getParams() {
              // 取到路由带过来的参数
              if(this.$route.query.beginTime == "" || this.$route.query.beginTime == null){
                this.form.beginTime=this.moment(new Date()).format("YYYY-MM-DD");
              }else{
               this.form.beginTime = this.moment(this.$route.query.beginTime).format("YYYY-MM-DD");
              }
              if(this.$route.query.endTime == "" || this.$route.query.endTime == null){
                this.form.endTime=this.moment(new Date()).format("YYYY-MM-DD");
              }else{
               this.form.endTime = this.moment(this.$route.query.endTime).format("YYYY-MM-DD");
              }
              this.form.itemId = this.$route.query.itemId;
              this.onSubmit(1);
            },
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
                itemId:this.form.itemId,
                currentPage:pageNum,
                limit:this.pagesize
              };
              this.tableloading=true;
              this.$api.itemTotalByMinutesearchByMinute(param).then(res =>{
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
            showP(data){
              let begin=this.moment(data.inserttime).format("YYYY-MM-DD");
              let end = this.moment(data.inserttime).format("YYYY-MM-DD");

              const {href} = this.$router.resolve({
                path: '/itemTotalCharts',
                query: {
                  begin: begin,
                  end: end,
                  itemId: data.itemId
                }
              })
              window.open(href, '_blank')
            },
            showAddP(data){
              let begin = this.moment(data.inserttime).format("YYYY-MM-DD");
              let end = this.moment(data.inserttime).format("YYYY-MM-DD");
              const {href} = this.$router.resolve({
                path: '/itemRecord',
                query: {
                  begin: begin,
                  end: end,
                  itemId: data.itemId,
                  type: 'get'
                }
              })
              window.open(href, '_blank')
            },
            showLoseP(data){
              let begin = this.moment(data.inserttime).format("YYYY-MM-DD");
              let end = this.moment(data.inserttime).format("YYYY-MM-DD");

              const {href} = this.$router.resolve({
                path: '/itemRecord',
                query: {
                  begin: begin,
                  end: end,
                  itemId:data.itemId,
                  type: 'use'
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
