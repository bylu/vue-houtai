<template>
    <div class="app-container">
        <h3 class="showTit">库存统计分析</h3>
        <el-row :gutter="32">
          <el-form ref="from" :model="form">
            <el-col :xs="24" :sm="6" :lg="4">
              <el-date-picker v-model="form.inserttime" clearable type="date" placeholder="选择日期" size="small"></el-date-picker>
            </el-col>
            <el-col :xs="24" :sm="8" :lg="4">
              <el-button size="small"  type="primary" v-has="'stockRecord_search'"  @click="search()">查询</el-button>
            </el-col>
          </el-form>
        </el-row>
      <div :id="id" :style="{width: width, height: height}" class="showchart"></div>
    </div>
</template>

<script>
  import echarts from "echarts";
  import westeros from "../../components/ECharts/theme/westeros"
  const color = ['#2f7ed8', '#8bbc21', '#910000', '#1aadce', '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'];
  let series=[];
    export default {
      name: "stockRecord",
      props: {
        id: {
          type: String,
          default: "myChart"
        },
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
              inserttime:this.moment(new Date(new Date().setHours(0, 0, 0, 0))).format("YYYY-MM-DD"),
            },
            chart: null
        }
      },
      mounted(){
        // this.initChart(this.form.inserttime);
      },
      methods: {
        search(){
          this.loading=true;
          this.initChart(this.form.inserttime);
        },
        initChart(datetime) {
          this.chart = echarts.init(document.getElementById(this.id), "westeros");
          let param= { 
            inserttime: this.moment(datetime).format("YYYY-MM-DD")
          }
          this.$api.stockRecordsearch(param).then(res =>{
            if (res.success) {
              this.setOptions(res.data.records);
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
          let date=new Date(this.form.inserttime);
          let _this=this;
          let xvalue="";
          $.each(data, function(key, val) {
            xvalue=_this.formatDateTime(val.inserttime);//_this.formatDateTime()
            points[key] = [xvalue];
            onlineUsers.push(val.result);
          });
          let serie = {
              type: 'line',
              name: "库存统计",//显示名称 
              pointInterval: 60 * 1000,//间隔分钟
              color: color[series.length],//显示颜色
              data: onlineUsers//内容
          };
          series[series.length]=serie
          this.chart.setOption({
            title: {
              text: "" //库存统计分析折线图
            },
            tooltip: {
              trigger: "axis"
            },
            legend: {
              data: ["库存统计"]
            },
            grid: {
              left: "3%",
              right: "4%",
              bottom: "3%",
              containLabel: true
            },
            xAxis: {
              boundaryGap: false,
              data: points
            },
            yAxis: {
              type: "value",
            // boundaryGap: [0, '100%']
            },
            series: series
          });
        },
        //格式化时间 hh:mm
        formatDateTime(str){
          if(str){
              let date = new Date(str);
              let hour = date.getHours().toString().padStart(2,'0');
              let minute = date.getMinutes().toString().padStart(2,'0');
              return `${hour}:${minute}`
          }
          return str;
        }
      }
    }
</script>

<style scoped>
  .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width:100%;
}
 .chartcontent{
   width:100%;
   float: left;
   position: relative;
  }
.title{
   width:100%;
   float: left;
   text-align: left;
   margin-bottom:10px;
 }
 .showchart{
  width:100%;
   float: left;
   position: relative;
   min-height:300px;
   margin-bottom:1%;
   margin-top:3%;
 }
</style>
