<template>
  <div  class="app-container">
    <el-row :gutter="32" v-has="'homeIndex_searchByDay'">
      <el-table border :data="tableData"  ref="table" highlight-current-row
       stripe  style="width:98% !important;margin-left:1%"  :cell-style="cellStyle" :header-cell-style="rowClass" >
        <el-table-column label="" width="80">
          <template slot-scope="scope">
           {{scope.row.name}}
          </template>
        </el-table-column>
        <el-table-column prop="info1" label="今日信息"></el-table-column>
        <el-table-column prop="info2" label="昨日信息"></el-table-column>
        <el-table-column prop="info3"  label="本周信息"></el-table-column>
        <el-table-column prop="info4" label="上周信息"></el-table-column> 
      </el-table>
    </el-row>

    <el-row v-has="'homeIndex_searchByWeek'">
      <el-col :span="24">
        <maintable id="maintable"></maintable>
      </el-col>
    </el-row>
    <el-row v-has="'spreaderAchievement_searchDay'">
      <el-col :span="24">
        <line-echarts id="lineEcharts" ref="echarts"></line-echarts>
      </el-col>
    </el-row>
    <el-row  v-has="'spreaderAchievement_searchDay'">
      <el-col :span="24">
       <channelPayhistoryData id="channelpay"></channelPayhistoryData>
      </el-col>
    </el-row>
    </div>
</template>

<script>
export default {
  name: "mainIndex",
  components: {
    channelPayhistoryData: () => import("../table/channelpayhistorydata"), //今日对比
    Maintable: () => import("../table/maintable"), //历史充值
    LineEcharts: () => import("../../components/ECharts/lineEcharts") //曲线图
  },
  data() {
    return {
      tableData:[],
      //今日
      newUser_todayinfo: '0笔,0人,0元',
      oldUser_todayinfo: '0笔,0人,0元',
      allUser_todayinfo: '0笔,0人,0元',
      //昨日
      newUser_yesterdayinfo: '0笔,0人,0元',
      oldUser_yesterdayinfo: '0笔,0人,0元',
      allUser_yesterdayinfo: '0笔,0人,0元',
      //本周
      newUser_weekinfo: '0笔,0人,0元',
      oldUser_weekinfo: '0笔,0人,0元',
      allUser_weekinfo: '0笔,0人,0元',
      //上周
      newUser_lastweekinfo: '0笔,0人,0元',
      oldUser_lastweekinfo: '0笔,0人,0元',
      allUser_lastweekinfo: '0笔,0人,0元'
    };
  },
  mounted() {
    this.selfAdaption();
    this.channelRecharge();
  },
  methods: {
    cellStyle(row,column,rowIndex,columnIndex){
      return 'padding:6px 0';
    },
    rowClass({row,rowIndex}){
      return 'padding:6px 0';
    },
    // echart自适应
    selfAdaption() {
      let that = this;
      setTimeout(() => {
        window.onresize = function() {
          if (that.$refs.echarts) {
            that.$refs.echarts.chart.resize();
          }
        };
      }, 10);
    },
    channelRecharge() {
      this.$api.channelRecharge().then(res =>{
         if (res.success) {
            res.data.forEach(element => {
              let params=parseInt(element.paycount) +"笔," +element.payUserCount +"人," +element.payAmountOriginal +"元";
              switch(element.type){
                  case '今日新用户': this.newUser_todayinfo =params; break;
                  case '今日老用户': this.oldUser_todayinfo =params; break;
                  case '今日总用户':  this.allUser_todayinfo =params; break;

                  case '昨日新用户': this.newUser_yesterdayinfo =params;break;
                  case '昨日老用户': this.oldUser_yesterdayinfo =params;break;
                  case '昨日总用户':  this.allUser_yesterdayinfo =params;break;

                  case '本周新用户':this.newUser_weekinfo =params; break;
                  case '本周老用户': this.oldUser_weekinfo =params;break;
                  case '本周总用户':this.allUser_weekinfo =params; break;

                  case '上周新用户': this.newUser_lastweekinfo =params; break;
                  case '上周老用户':  this.oldUser_lastweekinfo =params;break;
                  case '上周总用户': this.allUser_lastweekinfo =params;break;
              }
            });
             let data1={
                name:'新用户',
                info1:this.newUser_todayinfo,
                info2:this.newUser_yesterdayinfo,
                info3:this.newUser_weekinfo,
                info4:this.newUser_lastweekinfo
              }
              let data2={
                name:'老用户',
                info1:this.oldUser_todayinfo,
                info2:this.oldUser_yesterdayinfo,
                info3:this.oldUser_weekinfo,
                info4:this.oldUser_lastweekinfo
              }
              let data3={
                name:'总用户',
                info1:this.allUser_todayinfo,
                info2:this.allUser_yesterdayinfo,
                info3:this.allUser_weekinfo,
                info4:this.allUser_lastweekinfo
              }
              this.tableData.push(data1);
              this.tableData.push(data2);
              this.tableData.push(data3);
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
    }
  }
};
</script>

<style lang="scss" scoped>
$top: top;
$bottom: bottom;
$left: left;
$right: right;
$leftright: ($left, $right);
$pinkk: #dc2c70;
$bluee: #409eff;
$yelloww: #d8ae31;
$grennn: #279a46;
$purplee: #78a2ea;
$lightBluee: #b8d6ff;

$list: bluee pinkk yelloww grennn purplee lightBluee;
$list1: $bluee $pinkk $yelloww $grennn $purplee $lightBluee;
%shadow {
  background: #fff;
  -webkit-box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.2);
  box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.2);
  border-color: rgba(0, 0, 0, 0.2);

  // .title {
  //   font-size: 14px;
  //   padding: 10px 10px 0px 10px;
  //   margin: 0 auto;
  //   text-align: center;
  //   i {
  //     margin-#{$right}: 5px;
  //   }
  // }

  .kjfs-bluee {
    color: $grennn;
  }

  .kjfs-pinkk {
    color: $pinkk;
  }

  .kjfs-yelloww {
    color: $bluee;
  }

  .kjfs-grennn {
    color: $yelloww;
  }

  .kjfs-purplee {
    color: $purplee;
  }

  .kjfs-lightBluee {
    color: $lightBluee;
  }
}

@mixin flex($direction: row, $content: space-between) {
  display: flex;
  flex-direction: $direction;
  justify-content: $content;
}

.card {
  margin-bottom:10px;
  /*color: #666;*/
  @extend %shadow;

  ul {
    @include flex;

    li {
      flex: 1;

      a {
        color: #666666;
        align-items: center;
        padding-#{$top}: 20px;
        padding-#{$bottom}: 20px;
        @include flex(column);

        span {
          height: 44px;
        }

        .num {
          line-height: 44px;
          font-size: 42px;
          color: $bluee;
          margin: 0px;
        }
      }

      .kjfs-bluee {
        color: $bluee;
      }

      .kjfs-pinkk {
        color: $pinkk;
      }

      .kjfs-yelloww {
        color: $yelloww;
      }

      .kjfs-grennn {
        color: $grennn;
      }

      .kjfs-purplee {
        color: $purplee;
      }

      .kjfs-lightBluee {
        color: $lightBluee;
      }

      &:hover {
        .kjfs-bluee {
          color: #ffffff;
          background: $bluee;
        }

        .kjfs-pinkk {
          color: #ffffff;
          background: $pinkk;
        }

        .kjfs-yelloww {
          color: #ffffff;
          background: $yelloww;
        }

        .kjfs-grennn {
          color: #ffffff;
          background: $grennn;
        }

        .kjfs-purplee {
          color: #ffffff;
          background: $purplee;
        }

        .kjfs-lightBluee {
          color: #ffffff;
          background: $lightBluee;
        }
      }
    }
  }

  .table {
    padding: 13px;

    p {
      padding: 0;
      margin: 0;
      height: 40px;
      line-height: 40px;
      border: 1px solid #cccccc;
      overflow: hidden;
      border-#{$top}: none;
      @include flex(null, start);

      &:first-child {
        border-#{$top}: 1px solid #cccccc;
      }
      .tit {
        width: 90px;
        min-width: 90px;
        height: 100%;
        text-align: center;
        border-#{$right}: 1px solid #cccccc;
        margin-#{$right}: 18px;
      }

      span.gitbox {
        flex: 1;
        height: 100%;
        overflow: hidden;
        @include flex(row, start);

        a {
          &:first-child {
            margin-#{$right}: 30px;
          }
        }
      }
    }
  }
}

#lineEcharts {
  margin-#{$top}: 10px;
  padding-#{$top}: 10px;
  @extend %shadow;
}

#maintable {
  // margin-#{$top}: 10px;
  // padding-#{$top}: 10px;
  @extend %shadow;
}
</style>
