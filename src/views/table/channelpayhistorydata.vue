<template>
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
            <!-- <el-table-column prop="pochanNum" label="破产人数"></el-table-column>
            <el-table-column prop="pochanPayNum" label="破产后充值人数"></el-table-column>
            <el-table-column prop="pochanPayCount" label="破产后充值金额"></el-table-column> -->
          </el-table>
        </template>
    </div>
</template>

<script>
export default {
  name: "channelpayhistorydata",
  data() {
    return {
      loading: false,
      tableData: [],
      getendTime: this.moment(new Date()).format("YYYY-MM-DD"),
      spreaderId:"",
    };
  },
  mounted(){
    this.searchData(7)
  },
  methods: {
    cellStyle(row, column, rowIndex, columnIndex) {
      return "text-align:center;padding:4px 0;";
    },
    rowClass({ row, rowIndex }) {
      return "text-align:center;padding:4px 0;";
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
        endTime:this.getendTime
      }
      this.$api.channelTopUp(params).then(res =>{
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
        let sumpochanNum =0;
        let sumpochanPayNum =0;
        let sumpochanPayCount =0;
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
            let pochanNum =val.pochanNum;
            let pochanPayNum =val.pochanPayNum;
            let pochanPayCount =val.pochanPayCount;
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
              "dauApru":dauApru,
              "pochanNum":pochanNum,
              "pochanPayNum":pochanPayNum,
              "pochanPayCount":pochanPayCount
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
            sumpochanNum += pochanNum;
            sumpochanPayNum += pochanPayNum;
            sumpochanPayCount += pochanPayCount;
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
              "dauApru":'',
              "pochanNum":sumpochanNum,
              "pochanPayNum":sumpochanPayNum,
              "pochanPayCount":sumpochanPayCount
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
            "dauApru":(sumDAUAPRU / index).toFixed(2),
            "pochanNum":(sumpochanNum / index).toFixed(2),
            "pochanPayNum":(sumpochanPayNum / index).toFixed(2),
            "pochanPayCount":(sumpochanPayCount / index).toFixed(2)
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
.channelpaydatacontent {
  width: 100%;
  float: left;
  margin: 1% 0% 0% 0%;
}

 .el-button{
  margin-bottom: 10px;
}
</style>
