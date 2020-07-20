<template>
  <div class="app-container">
    <h3 class="showTit">游戏活动日志</h3>
    <el-row :gutter="32">
      <el-form ref="form" :model="form">
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.userID" size="small" placeholder="用户ID" clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="8" :lg="4">
          <el-select v-model="form.gameType" placeholder="请选择" size="small">
            <el-option  v-for="list in selectList.activeList" :key="list.key" :label="list.value" :value="list.key"></el-option>
          </el-select>
        </el-col>
        <el-col :xs="12" :sm="6" :lg="4">
          <el-date-picker v-model="form.beginTime" size="small" align="right" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="开始日期" clearable>
          </el-date-picker>
        </el-col>
        <el-col :xs="12" :sm="8" :lg="4">
          <el-date-picker v-model="form.endTime " size="small" align="right" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="结束日期" clearable>
          </el-date-picker>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="8" v-has="'gameData_search'">
          <el-button type="primary" size="small" @click="onSubmit(1)">查询</el-button>
          <el-button type="primary" size="small"  @click="beforeOneDay()" >向前一天</el-button>
          <el-button type="primary" size="small"  @click="afterOneDay()">向后一天</el-button>
        </el-col>
      </el-form>
    </el-row>

    <el-row :gutter="32">
      <el-col :span="24">
        <el-table  v-loading = "loading"
        style="width: 100%" :cell-style="cellStyle" :header-cell-style="rowClass" border :data="tableData">
          <template v-for="(item,index) in tableHead">
            <el-table-column :prop="item.column_name" :label="item.column_comment" :key="index">
              <template slot-scope="scope">
                <span>{{scope.row[scope.column.property]}}</span>
              </template>
            </el-table-column>
          </template>
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
        name: "gameData",
        data(){
          return{
            currentPage: 1, //初始页
            pagesize: 30, //    每页的数据
            total: 0,
            currentTotal:0,
            form: {
              beginTime:this.moment(new Date()).format("YYYY-MM-DD"),
              endTime:this.moment(new Date()).format("YYYY-MM-DD"),
              userID:"",
              gameType:'-1'
            },
            tableHead:[],
            // 表格数据
            tableData: [],
            loading:false,
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
              this.loading=true;
              let param = {
                userID:this.form.userID,
                gameType:this.form.gameType,
                beginTime:this.form.beginTime,
                endTime:this.form.endTime,
                currentPage:pageNum,
                limit:this.pagesize
              };
              this.$api.activeSearch(param).then(res =>{
                this.loading=false;
                  if (res.success) {
                    this.tableHead = res.params;
                    if((res.data  == null) || (res.data == "")){
                    this.$message({
                      message: '暂无数据',
                      type: "warning"
                    });
                   }else{
                    this.tableData = res.data.records;
                    this.total = res.data.total;
                    this.pagesize=res.data.size;
                    this.currentPage = res.data.current;
                    this.currentTotal=(this.currentPage) * (this.pagesize)
                    if(this.currentTotal > this.total){
                      this.currentTotal = this.total
                    }else{
                      this.currentTotal=(this.currentPage) * (this.pagesize)
                    }
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
        }
    }
</script>

<style scoped>
.el-date-editor.el-input, .el-date-editor.el-input__inner{
    width:100%;
}
</style>
