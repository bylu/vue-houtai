<template>
  <div  class="app-container">
    <div style="width:100%;">
      <h3 class="title" style="text-align:left;margin:0 auto 10px">游戏付费分析-图形</h3>
      <el-row :gutter="24">
          <div class="userOptiondiv">
            <el-col :xs="24" :sm="6" :lg="4">
              <el-date-picker  v-model="getendTime" align="right" size="small" type="date" value-format="yyyy-MM-dd"  format="yyyy-MM-dd"
                              placeholder="请输入执行时间" clearable></el-date-picker>
            </el-col>
            <el-col :xs="24" :sm="8" :lg="2">
              <el-button size="small"  type="primary" @click="initChart()">查询</el-button>
            </el-col>
          </div>
        </el-row>
      <div :id="id" :style="{width: width, height: height}" class="showchart"></div>
    </div>
    <div class="channelpaydatacontent">
      <h3 class="showTit" style="margin-left:0px;">游戏付费分析表格</h3>
       <el-row :gutter="32">
        <div style="width:100%">
            <el-button size="small"  type="primary" @click="searchData(7)" style="margin-left:1%">7天</el-button>
            <el-button size="small"  type="danger"  @click="searchData(30)">30天</el-button>
            <el-button size="small"  type="success" @click="searchData(60)">60天</el-button>
        </div>
       </el-row>
        <template>
          <el-table
            border
            :data="tableData"
            style="width: 100%"
            :cell-style="cellStyle"
            :header-cell-style="rowClass" v-loading="loading"
          >
            <el-table-column prop="date" label="日期"></el-table-column>
            <el-table-column prop="payAmount" label="充值金额"></el-table-column>
            <el-table-column prop="newPayAmount" label="新用户充值金额"></el-table-column>
            <el-table-column prop="payCount" label="充值次数" width="130"></el-table-column>
            <el-table-column prop="payUsers" label="充值用户数"></el-table-column>
            <el-table-column prop="newUserPayCount" label="新用户充值用户数"></el-table-column>
            <el-table-column prop="newUsers" label="新增设备数"></el-table-column>
            <el-table-column prop="arpu" label="付费ARPU"></el-table-column>
            <el-table-column prop="totalArpu" label="累计注册ARPU"></el-table-column>
            <el-table-column prop="dau" label="DAU"></el-table-column>
            <el-table-column prop="dauPru" label="DAU付费率"></el-table-column>
            <el-table-column prop="dauApru" label="DAU ARPU"></el-table-column>
          </el-table>
        </template>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import westeros from"../../components/ECharts/theme/westeros"
export default {
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
      getendTime:"",
      spreaderId:"",
      chart: null,
      loading: false,
      tableData: [],
    };
  },
  mounted() {
    this.getParams();
  },
  methods: {
    cellStyle(row, column, rowIndex, columnIndex) {
      return "text-align:center";
    },
    rowClass({ row, rowIndex }) {
      return "text-align:center;";
    },
    getParams() {
        // 取到路由带过来的参数
        this.getendTime = this.$route.query.datatime;
        this.spreaderId=this.$route.query.spreaderid;
        this.initChart();
    },
    initChart() {
      let begindate = this.moment(this.getendTime).subtract(1,'months').format('YYYY-MM-DD');
      this.chart = echarts.init(document.getElementById(this.id), "westeros");
      let param={
        spreaderId:this.spreaderId, 
        beginTime:begindate, 
        endTime:this.getendTime
      }
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
          text: "游戏付费分析折线图",
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
    },

    /**
     * data: 查询的参数
     * 查询时间
     */
    searchData(data) {
      this.loading = true;
      let params ={
        spreaderId:this.spreaderId,
        beginTime: this.commonJs.getCurDate(-data),
        endTime: this.moment(new Date()).format("YYYY-MM-DD")
      }
      this.$api.channelTopUpBySpreaderId(params).then(res =>{
        this.loading = false;
        let rs = new Array();
        let sumPayAmount = 0;
        let sumNewUserAmount = 0;
        let sumPaycount = 0;
        let sumUser = 0;
        let sumNewUser = 0;
        let sumRegister = 0;
        let sumARPU = 0;
        let sumTotalArpu = 0;
        let sumDAU = 0;
        let sumDAUPRU = 0;
        let sumDAUAPRU = 0;
        if (res.success) {
         if(res.data.length > 0){
            $.each(res.data, function(key, val) {
            let date = val.insertTime;
            let payAmount = val.payAmount;
            let newPayAmount = val.newUserPayAmount;
            let payCount = val.paycount;
            let payUsers = val.payUserCount;
            let newUserPayCount = val.newUserPayUserCount;
            let newUsers = val.spreadUserCount;
            let totalPayAmount = val.sumPayAmount;
            let totalUser = val.sumSpreadUserCount;
            let arpu = isNaN(payAmount / payUsers)? '0.00' :(payAmount / payUsers).toFixed(2);
            let totalArpu = isFinite(totalPayAmount / totalUser) ?  (totalPayAmount / totalUser).toFixed(2):'0.00';
            let dau = val.dau;
            let dauPru = isNaN(payUsers / dau)? '0.00' :(payUsers / dau).toFixed(2);
            let dauApru = isNaN(payAmount / dau)? '0.00' :(payAmount / dau).toFixed(2);
            rs[key] = {
              "date":date,
              "payAmount":payAmount,
              "newPayAmount": newPayAmount,
              "payCount":payCount,
              "payUsers":payUsers,
              "newUserPayCount":newUserPayCount,
              "newUsers" :newUsers,
              "arpu":arpu,
              "totalArpu":totalArpu,
              "dau":dau,
              "dauPru":dauPru,
              "dauApru":dauApru
            };
            sumPayAmount += payAmount;//总金额
            sumNewUserAmount += newPayAmount;//新用户充值金额
            sumPaycount += payCount;//总次数
            sumUser += payUsers;//充值总用户数
            sumNewUser += newUserPayCount;//新用户充值用户数
            sumRegister += newUsers;//新增设备
            sumARPU += parseFloat(arpu);//总付费ARPU
            sumTotalArpu += parseFloat(totalArpu);//历史总ARPU
            sumDAU += dau;//总登陆人数
            sumDAUPRU += parseFloat(dauPru);//dau付费率
            sumDAUAPRU += parseFloat(dauApru);//dauarpu
          });
          //合计
          rs[res.data.length + 1] = {
             "date":"合计",
              "payAmount":sumPayAmount,
             "newPayAmount": sumNewUserAmount,
              "payCount":sumPaycount,
             "payUsers":sumUser,
              "newUserPayCount":sumNewUser,
             "newUsers" :sumRegister,
              "arpu":'',
              "totalArpu":'',
              "dau":'',
              "dauPru":'',
              "dauApru":''
          };
          let index=res.data.length;
          rs[res.data.length + 2] = {
            "date":"平均",
            "payAmount":(parseInt(sumPayAmount) / parseInt(index)).toFixed(2),
            "newPayAmount":(sumNewUserAmount / index).toFixed(2),
            "payCount":(sumPaycount / index).toFixed(2),
            "payUsers":(sumUser / index).toFixed(2),
            "newUserPayCount":(sumNewUser / index).toFixed(2),
            "newUsers" :(sumRegister / index).toFixed(2),
            "arpu":(sumARPU / index).toFixed(2),
            "totalArpu":(sumTotalArpu / index).toFixed(2),
            "dau":(sumDAU / index).toFixed(2),
            "dauPru":(sumDAUPRU / index).toFixed(2),
            "dauApru":(sumDAUAPRU / index).toFixed(2)
          };
         }
        }
        this.tableData = rs;
      }).catch(err =>{
        this.$message({
          message: '请求失败!',
          type: "error"
        });
      })
    }
  }
};
</script>

<style scoped>
 .showchart{
    width:100%;
   float: left;
   position: relative;
   min-height:300px;
   margin-bottom:1%;
   margin-top:3%;
 }
  .userOptiondiv{
   width:99%;
   float: left;
   margin: 0 0 0 1%;
   padding:1% 0;
 }
 .el-button{
  margin-bottom: 10px;
}
</style>
