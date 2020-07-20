<template>
  <div class="channelpaydatacontent">
    <h3 class="title">渠道充值对比</h3>
    <el-row :gutter="32" style="margin:0px 0 10px 0;">
        <el-form ref="from" :model="form">
          <el-col :xs="24" :sm="12" :lg="4">
            <el-date-picker v-model="form.beginTime" clearable size="small"  align="right" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="选择日期">
            </el-date-picker>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="4">
            <el-date-picker v-model="form.endTime" clearable size="small"  align="right" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="选择日期">
            </el-date-picker>
          </el-col>
          <el-col :xs="24" :sm="24" :lg="8">
            <el-button size="small"  type="primary"  @click="searchData()">查询</el-button>
            <el-button type="primary" size="small"  @click="beforeOneDay()" >向前一天</el-button>
            <el-button type="primary" size="small"  @click="afterOneDay()">向后一天</el-button>
          </el-col>
        </el-form>
    </el-row>
    <el-table border :data="tableData"  height="750" ref="table"
       stripe show-summary :summary-method="getSummaries" v-loading="loading" :cell-style="cellStyle" :header-cell-style="rowClass">
        <el-table-column label="渠道" width="240">
          <template slot-scope="scope">
            <span style="color:#1890ff;cursor: pointer;" @click="openWindow(scope.row.spreaderId)">{{scope.row.spreader}}</span>
          </template>
        </el-table-column>
        <el-table-column  label="充值总额">
          <el-table-column prop="payAmount" :label="date1" >
            <template slot-scope="scope">
              <label v-html="showStatues(scope.row.payAmount,scope.row.comparePayAmount)"></label>
              <span> {{scope.row.payAmount}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="comparePayAmount" :label="date2"></el-table-column>
        </el-table-column>
        <el-table-column  label="充值次数">
          <el-table-column prop="paycount" :label="date1">
            <template slot-scope="scope">
              <label v-html="showStatues(scope.row.paycount,scope.row.comparePaycount)"></label>
              <span> {{scope.row.paycount}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="comparePaycount" :label="date2"></el-table-column>
        </el-table-column>

        <el-table-column  label="充值用户">
          <el-table-column prop="payUserCount"  :label="date1">
            <template slot-scope="scope">
              <label v-html="showStatues(scope.row.payUserCount,scope.row.comparePayUserCount)"></label>
              <span> {{scope.row.payUserCount}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="comparePayUserCount" :label="date2"></el-table-column>
        </el-table-column>

        <el-table-column  label="新增设备">
          <el-table-column prop="spreadUserCount" :label="date1">
            <template slot-scope="scope">
              <label v-html="showStatues(scope.row.spreadUserCount,scope.row.compareSpreadUserCount)"></label>
              <span> {{scope.row.spreadUserCount}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="compareSpreadUserCount" :label="date2"></el-table-column>
        </el-table-column>

        <el-table-column  label="DAU">
          <el-table-column prop="dau" :label="date1">
            <template slot-scope="scope">
              <label v-html="showStatues(scope.row.dau,scope.row.compareDau)"></label>
              <span> {{scope.row.dau}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="compareDau" :label="date2"></el-table-column>
        </el-table-column>

        <el-table-column  label="在线人数">
          <el-table-column prop="onlineUserCount" :label="date1">
            <template slot-scope="scope">
              <label v-html="showStatues(scope.row.onlineUserCount,scope.row.compareOnlineUserCount)"></label>
              <span> {{scope.row.onlineUserCount}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="compareOnlineUserCount" :label="date2"></el-table-column>
        </el-table-column>
      </el-table>
  </div>
</template>

<script>
  export default {
    name: 'maintable',
    data () {
      return {
        loading:false,
        form:{
          beginTime: this.moment(new Date()).format("YYYY-MM-DD"),
          endTime:this.moment().subtract('days',1).format('YYYY-MM-DD')
        },
        tableData: [],
        date1:"",
        date2:""
      }
    },
    methods: {
      cellStyle(row,column,rowIndex,columnIndex){
        return 'padding:4px 0';
      },
      rowClass({row,rowIndex}){
        return 'padding:4px 0';
      },
      /**
       * 查询操作
       */
      searchData(){
        this.loading = true;
        this.tableData=[];
        let params = {
          beginTime: this.form.beginTime,
          endTime: this.form.endTime
        };
        this.$api.rechargeComparison(params).then(res =>{
          this.loading = false;
          if (res.success) {
            this.date1=this.moment(this.form.beginTime).format("MM-DD");
            this.date2=this.moment(this.form.endTime).format("MM-DD");
            this.tableData = res.data.records;
            this.$nextTick(()=>{
              this.$refs.table.doLayout()
            }) 
          }
        }).catch(err =>{
          this.$message({
            message: '请求失败!',
            type: "error"
          });
        })
      },
      beforeOneDay(){
        if((this.form.beginTime == "" || this.form.beginTime == null) && (this.form.endTime == "" || this.form.endTime == null)){
          this.form.beginTime=this.moment(new Date()).format("YYYY-MM-DD");
          this.form.endTime=this.moment(new Date()).format("YYYY-MM-DD");
        }else{
          this.form.beginTime=this.moment(this.form.beginTime).subtract(1, 'days').format("YYYY-MM-DD");
          this.form.endTime=this.moment(this.form.endTime).subtract(1, 'days').format("YYYY-MM-DD");
        }
        
        this.searchData();
      },
      afterOneDay(){
        if((this.form.beginTime == "" || this.form.beginTime == null) && (this.form.endTime == "" || this.form.endTime == null)){
          this.form.beginTime=this.moment(new Date()).format("YYYY-MM-DD");
          this.form.endTime=this.moment(new Date()).format("YYYY-MM-DD");
        }else{
          this.form.beginTime=this.moment(this.form.beginTime).add(1, 'days').format("YYYY-MM-DD");
          this.form.endTime=this.moment(this.form.endTime).add(1, 'days').format("YYYY-MM-DD");
        }
        this.searchData();
      },

      getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计';
            return;
          }

          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += ' ';
          } else {
            sums[index] = '0';
          }
        });

        return sums;
      },
      /**
       * 首页渠道今日与昨天的充值对比
       */
      showStatues(val1,val2){
        if(val1 >val2){
          return "<i class='fa fa-arrow-up' style='color:#f56c6c'></i>";
        }else if(val1 < val2){
          return "<i class='fa fa-arrow-down'  style='color:#67c23a' ></i>";
        }else{
          return "<i class='fa fa-minus'  style='color:blue'></i>";
        }
      },
      openWindow(data){
        const {href} = this.$router.resolve({
          path: '/spreadStatistics',
          query: {
            datatime:this.form.beginTime,
            spreaderid:data
          }
        })
        window.open(href, '_blank')
      }
    },
    mounted(){
      this.searchData()
    }
  }
</script>

<style scoped>
  .channelpaydatacontent{
    width:100%;
    float:left;
    margin: 1% 0%;
  }
  .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width:100%;
}
  .title{
    width:90%;
    float: left;
    text-align: left;
    margin-bottom:10px;
    margin-left:15px;
    padding-top:10px;
  }
  .el-input,.el-button{
    margin-bottom: 10px;
  }
  .el-table{
    /* overflow:visible !important; */
    border:none
  }
  .el-table th, .el-table td{
    padding:0px 0px !important
  }
</style>
