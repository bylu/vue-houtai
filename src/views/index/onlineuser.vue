<template>
  <div  class="app-container">
    <el-row>
      <el-col :span="24">
        <lineEcharts id="lineEcharts"  ref="echarts"></lineEcharts>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <onlineusertable id="onlineUsertable"></onlineusertable>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    export default {
        name: 'onlineuser',
        components: {
            lineEcharts:() => import('../../components/ECharts/lineEcharts2.vue'),
            onlineusertable:() => import('../table/onlineusertable.vue')
        },
        mounted() {
            this.selfAdaption()
        },
        methods: {
            // echart自适应
            selfAdaption() {
                let that = this
                setTimeout(() => {
                    window.onresize = function () {
                        if (that.$refs.echarts) {
                            that.$refs.echarts.chart.resize()
                        }
                    }
                }, 10)
            }
        }
    }
</script>

<style lang="scss">
  $top: top;
  $bottom: bottom;
  $left: left;
  $right: right;
  $leftright: ($left, $right);
  $pinkk: #eec2d3;
  $bluee: #409eff;
  $yelloww: #f4d884;
  $grennn: #89dda0;
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
    //   i {
    //     margin-#{$right}: 5px;
    //   }
    // }

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
  }

  @mixin flex($direction:row,$content:space-between) {
    display: flex;
    flex-direction: $direction;
    justify-content: $content;
  }

  .card {
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
      padding: 21px;

      p {
        padding: 0;
        margin:0;
        height: 52px;
        line-height: 52px;
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
    margin-#{$top}: 15px;
    padding-#{$top}: 15px;
    @extend %shadow;
  }

  #maintable {
    margin-#{$top}: 15px;
    padding-#{$top}: 10px;
    @extend %shadow;
  }
</style>
