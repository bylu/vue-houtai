<template>
  <div style="width:100%;">
    <h3 class="title" style="text-align:left;margin:0 auto 10px">游戏付费分析-图形</h3>
    <el-row :gutter="24">
        <div class="userOptiondiv">
          <el-col :xs="24" :sm="6" :lg="4">
            <el-date-picker  v-model="searchbegin" align="right" size="small" type="date" value-format="yyyy-MM-dd"  format="yyyy-MM-dd"
                            placeholder="请输入执行时间" clearable></el-date-picker>
          </el-col>
          <el-col :xs="24" :sm="8" :lg="2">
            <el-button size="small"  type="primary" @click="initChart()">查询</el-button>
          </el-col>
        </div>
       </el-row>
    <div :id="id" :style="{width: width, height: height}" class="showchart"></div>
  </div>
</template>

<script>
import echarts from "echarts";
import westeros from "./theme/westeros";
export default {
  name: "lineEcharts",
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
  data() {
    return {
      searchbegin:this.moment(new Date()).format("YYYY-MM-DD"),
      chart: null
    };
  },
  mounted() {
    this.initChart();
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
  methods: {
    initChart() {
      let begindate = this.moment(this.searchbegin).subtract(1,'months').format('YYYY-MM-DD');
      this.chart = echarts.init(document.getElementById(this.id), "westeros");
      let param={
        spreaderId:"", 
        beginTime:begindate,
        endTime:this.searchbegin}
        this.$api.channelTopUp(param).then(res =>{
          if (res.success) {
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
      let newUsers = []; //新增设备
      let payAmount = []; //充值金额
      let payUsers = []; //充值人数
      var payCount = []; //充值次数
      let that=this;
      let xvalue="";
      $.each(data, function(key, val) {
        xvalue=that.moment(val.insertTime).format("MM月DD");
        points[key] = [xvalue];
        newUsers.push(val.newUserPayUserCount);
        payAmount.push(val.payAmount);
        payUsers.push(val.payUserCount);
        payCount.push(val.paycount);
      });
      this.chart.setOption({
        title: {
          text: "",//游戏付费分析折线图
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["充值金额", "充值人数", "充值次数", "推广用户数"]
        },
        grid: {
          left: "8%",
          right: "10%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
         
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: points,
        },
        yAxis: [
          {
            type: "value",
            name:"充值金额",
            axisLabel: {
                formatter: '{value}',
            },
            position:'left',
            axisTick: {
              inside:'false',
              length:10,
            }, 
          }, 
          {
            type: 'value',
            name: '充值人数',
            axisLabel: {
              formatter: '{value}',
            }, 
            position:'left',
            axisTick: {show:false}, 
            offset:80,
            splitNumber:10,  
          },
          {
            type: 'value',
            name: '充值次数',
            axisLabel: {
              formatter: '{value}',
            },
            position:'right',
          },
           {
            type: 'value',
            name: '推广用户数',
            axisLabel: {
              formatter: '{value}',
            },
            position:'right',
            offset:80,
            splitNumber:10,
          }
        ],
        series: [
          {
            name: "充值金额",
            type: "line",
            data: payAmount,
            smooth:true
          },
          {
            name: "充值人数",
            type: "line",
            yAxisIndex: 1,
            data: payUsers
          },
          {
            name: "充值次数",
            type: "line",
            yAxisIndex: 2,
            data: payCount
          },
          {
            name: "推广用户数",
            type: "line",
            data: newUsers,
            yAxisIndex: 3,
          }
        ]
      });
    }
  }
};
</script>

<style scoped>
.el-date-editor.el-input, .el-date-editor.el-input__inner{
    width:100%;
  }
 .showchart{
  width:100%;
  float: left;
  position: relative;
  min-height:300px;
  margin-bottom:1%;
  margin-top:1%;
 }
.userOptiondiv{
   width:100%;
   float: left;
 }
 .el-button{
  margin-bottom: 10px;
}
</style>
