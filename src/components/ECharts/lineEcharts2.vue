<template>
  <div class="chartcontent">
      <h3 class="title">在线用户-曲线图</h3>
      <el-row :gutter="32">
        <div class="userOptiondiv">
          <el-form ref="from" :model="form">
            <el-col :xs="24" :sm="6" :lg="4">
              <el-date-picker v-model="form.date" align="right" size="small" type="date" value-format="yyyy-MM-dd"  format="yyyy-MM-dd"
              placeholder="请输入执行时间" clearable></el-date-picker>
            </el-col>
            <el-col :xs="24" :sm="8" :lg="2">
              <el-button size="small" :loading="loading"  type="primary"  @click="search()">查询</el-button>
            </el-col>
          </el-form>
        </div>
      </el-row>
    <div :id="id" :style="{width: width, height: height}" class="showchart"></div>
  </div>
</template>

<script>
import echarts from "echarts";
import westeros from "./theme/westeros";
//let moment = require("moment")
const color = ['#2f7ed8', '#8bbc21', '#910000', '#1aadce', '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'];
let series=[];
export default {
  name: "",
  props: {
    id: {
      type: String,
      default: "chart"
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
  data() {
    return {
      form:{
        date:this.moment(new Date()).format("YYYY-MM-DD")
      },
      loading:false,
      chart: null,
      chartnames:[]
    };
  },
  mounted() {
    this.chartnames=[];
    $("#lineEcharts").removeAttr("_echarts_instance_").empty();
    this.initChart(this.form.date);
  },
  watch: {
    // options:{
    //   handler(options){
    //     ths.chart.setOption(this.options)
    //   },
    //   deep:true
    // }
    // seriesData(val){
    //   this.setOptions({series:val})
    // }
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.clear()
    this.chart.dispose()
    this.chart = null;
    this.$router.go(0)  
  },
  destroyed(){
    //this.chart.clear()
    //this.chart.dispose()
    this.chart = null;
     $("#lineEcharts").removeAttr("_echarts_instance_").empty();
  },
  methods: {
    search(){
      this.loading=true;
      this.initChart(this.form.date);
    },
    initChart(datetime) {
      this.chart = echarts.init(document.getElementById(this.id), "westeros");
      let param={
        beginTime: datetime
      }
      this.$api.searchOnlineUserByChannel(param).then(res =>{
        this.loading=false;
        if (res.success) {
          this.chartnames.push(datetime);
          this.setOptions(res.data);
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
      let date=new Date(this.form.date);
      let _this=this;
      let xvalue="";
      $.each(data, function(key, val) {
        xvalue=_this.formatDateTime(val.insertTime);
        points[key] = [xvalue];
        onlineUsers.push(val.onlineUserCount);
      });
       let serie = {
            type: 'line',
            name: this.form.date,//显示名称
            pointInterval: 1800 * 1000,//间隔分钟
            color: color[series.length],//显示颜色
            data: onlineUsers//内容
        };
       
        series[series.length]=serie
        this.chart.setOption({
          title: {
            text: ""//在线玩家折线图
          },
          tooltip: {
            trigger: "axis"
          },
          legend:{
            data:this.chartnames
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true
          },
          toolbox: {
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: points,
            name:'时间'
          },
          yAxis: {
            type: "value",
            name:"在线人数",
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
};
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
  .userOptiondiv{
   width:100%;
   float: left;
   margin: 0;
   padding-top:0.5%;
 }
 .showchart{
    width:100%;
   float: left;
   position: relative;
   min-height:480px;
   margin-bottom:1%;
 }
</style>
