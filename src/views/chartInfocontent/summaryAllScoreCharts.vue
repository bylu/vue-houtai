<template>
  <div class="app-container">
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="24">
        <div class="chartcontent">
            <h3 class="title">{{getTitle}}</h3>
            <div class="userOptiondiv">
              <el-form ref="from" :model="form">
                <el-col :xs="24" :sm="6" :lg="4">
                    <el-date-picker v-model="form.beginDate" clearable type="date" placeholder="选择日期" size="small"></el-date-picker>
                </el-col>
                <el-col :xs="24" :sm="6" :lg="4">
                    <el-date-picker v-model="form.endDate"  clearable type="date" placeholder="选择日期" size="small"></el-date-picker>
                </el-col>
                <el-col :xs="24" :sm="12" :lg="8">
                    <el-button size="mini"  type="primary" @click="search()">查询</el-button>
                    <el-button type="primary" size="small"  @click="beforeOneDay()" >向前一天</el-button>
                    <el-button type="primary" size="small"  @click="afterOneDay()">向后一天</el-button>
                </el-col>
              </el-form>
            </div>
        
            <div id="chart01" :style="{width: width, height: height}" class="showchart"></div>
            <!-- <div id="chart02" :style="{width: width, height: height}" class="showchart"></div> -->
        </div>
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
        name: "",
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
                  beginDate:"",
                  endDate:""
                },
                chart: null,
                //chart2:null,
                type:'',
                getTitle:'',
                getName:'',
                chartName:'',
                setHeadTitle:'',
            }
        },
        mounted(){
          this.getParams();
        },
         methods: {
            getParams() {
                this.form.beginDate= this.moment(this.$route.query.beginDate).format("YYYY-MM-DD");
                this.form.endDate= this.moment(this.$route.query.endDate).format("YYYY-MM-DD");
                this.type=this.$route.query.setType;
                if(this.type == "0"){
                    this.getTitle="用户财富总量统计";
                    this.getName="用户财富";
                    this.chartName="用户财富折线图";
                    this.setHeadTitle="用户财富";
                }else if(this.type == "1"){
                    this.getTitle="用户财富总消耗"
                    this.getName="消耗";
                    this.chartName="用户消耗折线图";
                    this.setHeadTitle="消耗";
                }else if(this.type == "2"){
                    this.getTitle="用户财富总发行"
                    this.getName="发行";
                    this.chartName="用户发行折线图";
                    this.setHeadTitle="发行";
                }
                this.search();
            },
            beforeOneDay(){
              if((this.form.beginDate == "" || this.form.beginDate == null) && (this.form.endDate == "" || this.form.endDate == null)){
                this.form.beginDate=this.moment(new Date()).format("YYYY-MM-DD");
                this.form.endDate=this.moment(new Date()).format("YYYY-MM-DD");
              }else{
                this.form.beginDate=this.moment(this.form.beginDate).subtract(1, 'days').format("YYYY-MM-DD");
                this.form.endDate=this.moment(this.form.endDate).subtract(1, 'days').format("YYYY-MM-DD");
              }
              this.search();
            },
            afterOneDay(){
              if((this.form.beginDate == "" || this.form.beginDate == null) && (this.form.endDate == "" || this.form.endDate == null)){
                this.form.beginDate=this.moment(new Date()).format("YYYY-MM-DD");
                this.form.endDate=this.moment(new Date()).format("YYYY-MM-DD");
              }else{
                this.form.beginDate=this.moment(this.form.beginDate).add(1, 'days').format("YYYY-MM-DD");
                this.form.endDate=this.moment(this.form.endDate).add(1, 'days').format("YYYY-MM-DD");
              }
             this.search();
            },

            search(){
                this.loading=true;
                this.initChart();
               // this.initChart2();
            },
            initChart() {
                this.chart = echarts.init(document.getElementById("chart01"), "westeros");
                let params={
                  beginTime: this.moment(this.form.beginDate).format("YYYY-MM-DD"),
                  endTime:this.moment(this.form.endDate).format("YYYY-MM-DD")
                }
                this.$api.summaryAllScoresearchSummaryAllScoreForCharts(params).then(res =>{
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
        
                if(this.type == 0){ //用户总财富
                    $.each(data, function(key, val) { 
                        xvalue=that.moment(val.insertTime).format("MM-DD HH:mm");
                        points[key] = [xvalue];
                        onlineUsers.push(val.userScores);
                    });
                }else if(this.type == 1){ //总消耗
                    $.each(data, function(key, val) {
                        xvalue=that.moment(val.searchDate).format("MM-DD HH:mm");
                        points[key] = [xvalue];
                        onlineUsers.push(val.spendScores);
                    });
                }else if(this.type == 2){ //总发行
                    $.each(data, function(key, val) {
                        xvalue=that.moment(val.searchDate).format("MM-DD HH:mm");
                        points[key] = [xvalue];
                        onlineUsers.push(val.produceScores);
                    });
                }

                let seriemoney = {
                    type: 'line',
                    name: this.getName,
                    pointInterval: 60 * 1000,//间隔分钟
                    color: color[series.length],//显示颜色
                    data: onlineUsers//内容
                };
                series[series.length]=seriemoney
                this.chart.setOption({
                    title: {
                        text: ""//this.chartName
                    },
                    tooltip: {
                        trigger: "axis",
                        hideDelay:'25000000'
                    },
                    legend: {
                        data: [this.setHeadTitle]
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
                        },
                        axisLabel:{
                            rotate:40  
                        }
                    },
                    yAxis: {
                        type: "value",
                        name:"在线人数",
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
            // initChart2() {
            //     this.chart2 = echarts.init(document.getElementById("chart02"), "westeros");
            //     this.$http({
            //         url: this.paramUrl.summaryAllScoresearchSummaryAllScoreForCharts,
            //         method: "post",
            //         data: { beginTime: this.moment(this.form.beginDate).format("YYYY-MM-DD"),endTime:this.moment(this.form.endDate).format("YYYY-MM-DD")},
            //         headers: { "Content-Type": "application/json;charset=UTF-8" }
            //     })
            //     .then(res => {
            //         if (res.success) {
            //         this.setOptions2(res.data);
            //         } else {
            //         this.$message({
            //             message: res.message,
            //             type: "error"
            //         });
            //         }
            //     });
            // },
            // setOptions2(data) {
            //     let points = new Array(); //X轴时间
            //     let onlineUsers1 = []; //在线人数
            //     let xvalue="";
            //     let that=this;
            //     $.each(data, function(key, val) {
            //         xvalue=that.moment(val.insertTime).format("MM-DD HH:mm");//_this.formatDateTime()
            //         points[key] = [xvalue];
            //         onlineUsers1.push(val.userIncreased);
            //     });
            //     let serie1 = {
            //         type: 'bar',
            //         name: "增量统计",
            //         pointInterval: 60 * 1000,//间隔分钟
            //         color: color[series.length],//显示颜色
            //         data: onlineUsers1, //内容
            //     };
            //     series[series.length]=serie1
            //     this.chart2.setOption({
            //         title: {
            //             text: "用户财富增量统计"
            //         },
            //         tooltip: {
            //             trigger: "axis",
            //         },
            //         legend: {
            //             data: ["增量统计"]
            //         },
            //         grid: {
            //             left: "3%",
            //             right: "4%",
            //             bottom: "3%",
            //             containLabel: true,
            //             x:'30%'
            //         },
            //         xAxis: {
            //             type:'category',
            //             boundaryGap: true,
            //             data: points,
            //             axisLine: {onZero: true},
            //             splitLine: {show: false},
            //             splitArea: {show: false},
            //             axisLabel:{
            //                 rotate:40  
            //             }
            //         },
            //         yAxis: {
            //             type: "value",
            //             name:"在线人数",
            //         },
            //         series: serie1
            //     });
            // },
            //格式化时间 hh:mm
            // formatDateTime(str){
            //     if(str){
            //         let date = new Date(str);
            //         let hour = date.getHours().toString().padStart(2,'0');
            //         let minute = date.getMinutes().toString().padStart(2,'0');
            //         return `${hour}:${minute}`
            //     }
            //     return str;
            // }
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
   min-height:500px;
   margin-bottom:1%;
   margin-top:3%;
 }

</style>
