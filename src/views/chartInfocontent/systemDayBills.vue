<template>
  <div class="app-container">
    <h3 class="showTit">系统每日流水记录</h3>
    <el-row :gutter="32">
      <el-form ref="form" :model="form">
        <el-col :xs="24" :sm="6" :lg="4">
          <el-date-picker v-model="form.beginTime" clearable size="small" align="right" type="date" placeholder="开始日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd"></el-date-picker>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="4">
          <el-date-picker v-model="form.endTime" clearable size="small" align="right" type="date" placeholder="结束日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd"></el-date-picker>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="3">
          <el-select v-model="form.opt" placeholder="房间名称" size="small">
            <el-option v-for="(list,index) in selectList.scoreTypelist" :key="index" :label="list.value" :value="list.key"></el-option>
          </el-select>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="8" v-has="'systemDayBills_search'">
          <el-button type="primary" size="small" @click="onSubmit(1)">查询</el-button>
          <el-button type="primary" size="small"  @click="beforeOneDay()" >向前一天</el-button>
          <el-button type="primary" size="small"  @click="afterOneDay()">向后一天</el-button>
        </el-col>
      </el-form>
    </el-row>
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="24">
          <div id="chart01" :style="{width: width, height: height}" class="showchart"></div>
      </el-col>
    </el-row>
    <el-row :gutter="32">
      <el-col :span="24">
        <el-table  v-loading = "loading" style="width: 100%" :cell-style="cellStyle" :header-cell-style="rowClass" :data="tableData">
          <template v-for="(item,index) in tableHead">
            <el-table-column :prop="item.column_name" :label="item.column_comment" :key="index">
              <template slot-scope="scope">
                <span v-if="scope.row[scope.column.property]> 0" style="color:red">{{scope.row[scope.column.property] | numTenthousand}}</span>
                <span v-else-if="scope.row[scope.column.property] < 0" style="color: #37B328">{{scope.row[scope.column.property] | numTenthousand}}</span>
                <span v-else>{{scope.row[scope.column.property]}}</span>
              </template>
            </el-table-column>
          </template>
          <template>
          </template>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    import echarts from "echarts";
    import westeros from "../../components/ECharts/theme/westeros"
    const color = ['#2f7ed8', '#8bbc21', '#910000', '#1aadce', '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'];
    let series=[];
    export default {
        name: "systemDayBills",
        props: {
          width: {
            type: String,
            default: "100%"
          },
          height: {
            type: String,
            default: "100%"
          }
        },
        data(){
            return{
                form: {
                  beginTime:this.moment(new Date(new Date().setHours(0, 0, 0, 0))).format("YYYY-MM-DD"),
                  endTime:this.moment(new Date()).format("YYYY-MM-DD"),
                  opt: '-1'
                },
                loading:false,
                chart: null,
                tableHead:[],
                // 表格数据
                tableData: [],
            }
        },
        methods:{
            cellStyle(row,column,rowIndex,columnIndex){
              return 'text-align:center;padding:6px 0';
            },
            rowClass({row,rowIndex}){
              return 'text-align:center;padding:6px 0';
            },
            onSubmit(){
              this.chart = echarts.init(document.getElementById("chart01"), "westeros");
              this.loading=true;
              this.$api.systemDayBillssearchByDate(this.form).then(res =>{
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
                    this.setOptions(res.paramsext);
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
            setOptions(data) {
                let points = new Array(); //X轴时间
                let onlineUsers = []; //在线人数
                let xvalue="";
                let that=this;
                $.each(data, function(key, val) {
                    xvalue=that.moment(val.column_name).format("MM-DD");//_this.formatDateTime()
                    points[key] = [xvalue];
                    onlineUsers.push(val.column_comment);
                });
                let seriemoney = {
                    type: 'line',
                    name: "当天收支小计",
                    pointInterval: 60 * 1000,//间隔分钟
                    color: color[series.length],//显示颜色
                    data: onlineUsers//内容
                };
                series[series.length]=seriemoney
                this.chart.setOption({
                    title: {
                        text: "当天收支小计折线图"
                    },
                    tooltip: {
                        trigger: "axis",
                        hideDelay:'25000000'
                    },
                    legend: {
                        data: ["当天收支小计"]
                    },
                    grid: {
                        left: "3%",
                        right: "4%",
                        bottom: "3%",
                        containLabel: true
                    },
                    xAxis: {
                        type:'category',
                        boundaryGap: false,
                        data: points,
                        axisTick: {
                            inside: true,
                            alignWithLabel: true
                        }
                    },
                    yAxis: {
                        type: "value",
                        name:"幸运豆收支",
                        axisTick: {
                            inside: true
                        },
                        scale: true,
                        axisLabel:{
                        }
                    },
                    series: seriemoney
                });
            },
            beforeOneDay(){
              if((this.form.beginTime == "" || this.form.beginTime == null) && (this.form.endTime == "" || this.form.endTime == null)){
                this.form.beginTime=this.moment(new Date()).format("YYYY-MM-DD");
                this.form.endTime=this.moment(new Date()).format("YYYY-MM-DD");
              }else{
                this.form.beginTime=this.moment(this.form.beginTime).subtract(1, 'days').format("YYYY-MM-DD");
                this.form.endTime=this.moment(this.form.endTime).subtract(1, 'days').format("YYYY-MM-DD");
              }
             
              this.onSubmit();
            },
            afterOneDay(){
              if((this.form.beginTime == "" || this.form.beginTime == null) && (this.form.endTime == "" || this.form.endTime == null)){
                this.form.beginTime=this.moment(new Date()).format("YYYY-MM-DD");
                this.form.endTime=this.moment(new Date()).format("YYYY-MM-DD");
              }else{
                this.form.beginTime=this.moment(this.form.beginTime).add(1, 'days').format("YYYY-MM-DD");
                this.form.endTime=this.moment(this.form.endTime).add(1, 'days').format("YYYY-MM-DD");
              }
              this.onSubmit();
            },
        }
    }
</script>

<style scoped>
.el-date-editor.el-input, .el-date-editor.el-input__inner{
    width:100%;
}
.showchart{
    width:100%;
   float: left;
   position: relative;
   min-height:500px;
   margin-bottom:1%;
   margin-top:3%;
 }
</style>
