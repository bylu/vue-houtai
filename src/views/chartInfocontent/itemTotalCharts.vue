<template>
  <div class="app-container">
    <h3 class="showTit">道具余量记录曲线图</h3>
    <el-row :gutter="32">
      <el-form ref="form" :model="form">
        <el-col :xs="24" :sm="6" :lg="4">
          <el-date-picker v-model="form.beginTime" clearable size="small" align="right" type="datetime" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="开始日期">
          </el-date-picker>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="4">
          <el-date-picker v-model="form.endTime" clearable size="small" align="right" type="datetime" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="结束日期">
          </el-date-picker>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.propId" size="small" clearable placeholder="道具id"></el-input>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="8">
          <el-button type="primary" size="small" @click="initChart()">查询</el-button>
          <el-button type="primary" size="small"  @click="beforeOneDay()" >向前一天</el-button>
          <el-button type="primary" size="small"  @click="afterOneDay()">向后一天</el-button>
        </el-col>
      </el-form>
    </el-row>

    <el-row>
      <div id="chart01" :style="{width: width, height: height}" class="showchart"></div>
    </el-row>
  </div>
</template>

<script>
  import echarts from "echarts";
  import westeros from "../../components/ECharts/theme/westeros"
  const color = ['#2f7ed8', '#8bbc21', '#910000', '#1aadce', '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'];
  let series=[];
    export default {
        name: "itemTotalCharts",
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
                    propId: '',
                    beginTime:'',
                    endTime:''
                },
            }
        },
        mounted(){
          this.getParams()
        },
        methods:{
          getParams() {
              // 取到路由带过来的参数
              if(this.$route.query.begin == "" || this.$route.query.begin == null){
                this.form.beginTime=this.moment(new Date()).format("YYYY-MM-DD");
              }else{
               this.form.beginTime = this.moment(this.$route.query.begin).format("YYYY-MM-DD");
              }
              if(this.$route.query.end == "" || this.$route.query.end == null){
                this.form.endTime=this.moment(new Date()).format("YYYY-MM-DD");
              }else{
               this.form.endTime = this.moment(this.$route.query.end).format("YYYY-MM-DD");
              }
              this.form.propId = this.$route.query.itemId;
              this.initChart();
            },
            beforeOneDay(){
              if((this.form.beginTime == "" || this.form.beginTime == null) && (this.form.endTime == "" || this.form.endTime == null)){
                this.form.beginTime=this.moment(new Date()).format("YYYY-MM-DD");
                this.form.endTime=this.moment(new Date()).format("YYYY-MM-DD");
              }else{
                this.form.beginTime=this.moment(this.form.beginTime).subtract(1, 'days').format("YYYY-MM-DD");
                this.form.endTime=this.moment(this.form.endTime).subtract(1, 'days').format("YYYY-MM-DD");
              }
             
              this.initChart();
            },
            afterOneDay(){
              if((this.form.beginTime == "" || this.form.beginTime == null) && (this.form.endTime == "" || this.form.endTime == null)){
                this.form.beginTime=this.moment(new Date()).format("YYYY-MM-DD");
                this.form.endTime=this.moment(new Date()).format("YYYY-MM-DD");
              }else{
                this.form.beginTime=this.moment(this.form.beginTime).add(1, 'days').format("YYYY-MM-DD");
                this.form.endTime=this.moment(this.form.endTime).add(1, 'days').format("YYYY-MM-DD");
              }
              this.initChart();
            },
            initChart() {
                this.chart = echarts.init(document.getElementById("chart01"), "westeros");
                let param={ 
                  beginTime: this.moment(this.form.beginTime).format("YYYY-MM-DD"),
                  endTime:this.moment(this.form.endTime).format("YYYY-MM-DD"),
                  itemId:this.form.propId
                }
                this.$api.itemTotalChartssearchItemCharts().then(res =>{
                    if (res.success) {
                      this.setOptions1(res.data);
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
            setOptions1(data) {
                let points = new Array(); //X轴时间
                let onlineUsers = []; //在线人数
                let xvalue="";
                let that=this;
                $.each(data, function(key, val) {
                    xvalue=that.formatDateTime(val.inserttime);;//_this.formatDateTime()
                    points[key] = [xvalue];
                    onlineUsers.push(val.total);
                });
                let seriemoney = {
                    type: 'line',
                    name: "道具总量",
                    pointInterval: 60 * 1000,//间隔分钟
                    color: color[series.length],//显示颜色
                    data: onlineUsers//内容
                };
                series[series.length]=seriemoney
                this.chart.setOption({
                    title: {
                        text: "用户道具总量"
                    },
                    tooltip: {
                        trigger: "axis",
                        hideDelay:'25000000'
                    },
                    legend: {
                        data: ["道具总量"]
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
                        name:"道具总数",
                        axisTick: {
                            inside: true
                        },
                        scale: true,
                        axisLabel:{
                            //  formatter: function (value) {
                            //     var texts = [];
                               
                            //     if (value <= 80213650 000000) {
                            //     texts.push('好');
                            //     }
                            //     else if (value<= 2) {
                            //     texts.push('很好');
                            //     }
                            //     else if(value<= 3){
                            //     texts.push('非常好');
                            //     }
                            //     else{
                            //     texts.push('完美');
                            //     }
                            //     return texts;

                            // }
                        }
                    },
                    series: seriemoney
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
   min-height:300px;
   margin-bottom:1%;
   margin-top:3%;
 }
</style>
