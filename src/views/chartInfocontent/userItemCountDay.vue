<template>
  <div class="app-container">
    <h3 class="showTit">每日弹头水晶统计</h3>
    <el-row :gutter="32">
      <el-form ref="form" :model="form">
        <el-col :xs="24" :sm="6" :lg="4">
          <el-date-picker v-model="form.beginTime" clearable size="small" align="right" type="date"  placeholder="开始日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd" >
          </el-date-picker>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="4">
          <el-date-picker v-model="form.endTime" clearable size="small" align="right" type="date" placeholder="结束日期"  value-format="yyyy-MM-dd" format="yyyy-MM-dd">
          </el-date-picker>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="6" v-has="'userItemCountDay_search'">
          <el-button type="primary" size="small" @click="onSubmit(1)">查询</el-button>
          <el-button type="primary" size="small"  @click="beforeOneDay()" >向前一天</el-button>
          <el-button type="primary" size="small"  @click="afterOneDay()">向后一天</el-button>
        </el-col>
      </el-form>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" style="width: 100%" :cell-style="cellStyle" :header-cell-style="rowClass" border v-loading="tableloading">
          <el-table-column prop="exeTime" label="时间" show-overflow-tooltip></el-table-column>
          <el-table-column prop="item1" label="青铜弹头" show-overflow-tooltip></el-table-column>
          <el-table-column prop="item2" label="白银弹头" show-overflow-tooltip></el-table-column>
          <el-table-column prop="item3" label="黄金弹头" show-overflow-tooltip></el-table-column>
          <el-table-column prop="item4" label="白金弹头" show-overflow-tooltip></el-table-column>
          <el-table-column prop="item6" label="水晶" show-overflow-tooltip></el-table-column>
          <!-- <el-table-column label="详情" show-overflow-tooltip>
            <template slot-scope="scope">
                <el-button size="mini" type="primary" v-has="'userItemCountDay_detail'" @click="formdata=scope.row,showItemCountDayInfo=true">详情</el-button>
                <el-button size="mini" type="success" v-has="'userItemCountDay_playerDetails'" @click="formdata=scope.row,showUserItemCountDayInfo=true">玩家详情</el-button>
            </template>
          </el-table-column> -->
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

    <!--详情-->
    <pcModal v-if="showItemCountDayInfo" width="40%" :title="'详情'" @closeModal="showItemCountDayInfo = false">
        <itemCountDayInfocontent :getdata="formdata" @closedialog="showItemCountDayInfo= false"></itemCountDayInfocontent>
    </pcModal>

    <!--玩家详情-->
    <pcModal v-if="showUserItemCountDayInfo" width="40%" :title="'玩家详情'" @closeModal="showUserItemCountDayInfo = false">
        <userItemCountDayInfocontent :getdata="formdata" @closedialog="showUserItemCountDayInfo= false"></userItemCountDayInfocontent>
    </pcModal>

  </div>
</template>

<script>
    export default {
        name: "userItemCountDay",
        components:{
          itemCountDayInfocontent:() => import('./itemCountDayInfocontent.vue'),
          userItemCountDayInfocontent:() => import('./userItemCountDayInfocontent.vue'),
        },
        data(){
          return{
            currentPage: 1, //初始页
            pagesize: 30, //    每页的数据
            total: 0,
            currentTotal:0,
            form: {
              beginTime:this.moment(new Date(new Date().setHours(0, 0, 0, 0))).format("YYYY-MM-DD"),
              endTime:this.moment(new Date()).format("YYYY-MM-DD")
            },
            tableData: [],
            showItemCountDayInfo:false,
            showUserItemCountDayInfo:false,
            tableloading:false,
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
              //beginTime，endTime,currentPage,limit
              let param = {
                  beginTime:this.form.beginTime,
                  endTime:this.form.endTime,
                  currentPage:pageNum,
                  limit:this.pagesize
              };
              this.tableloading=true;
              this.$api.userItemCountDaysearch(param).then(res =>{
                this.tableloading=false;
                if (res.success) {
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
