<template>
    <div  class="app-container">
      <el-row :gutter="32" v-has="'spreaderAchievement_searchDayBoss'">
         <el-col :span="24">
            <channelPayhistoryData id="channelpay"></channelPayhistoryData>
         </el-col>
      </el-row>
      <div v-has="'retentionRateInfo_searchBoss'">
        <rateOfuser></rateOfuser>
      </div>
      <div v-has="'newUserLtv_searchBoss'">
          <userLtv></userLtv>
      </div>
    </div>
</template>

<script>
export default {
  name: "importData",
  components: {
    channelPayhistoryData: () => import("../table/channelpayhistorydataBoss"), //今日对比
    rateOfuser:()=>import("../../views/gameuser/rateOfuserBoss"),//用户留存率
    userLtv:()=>import("../../views/gameuser/newUserLTVBoss")
  },
  data() {
    return {
    };
  },
  mounted() {
  },
  methods: {
    cellStyle(row,column,rowIndex,columnIndex){
      return 'padding:6px 0';
    },
    rowClass({row,rowIndex}){
      return 'padding:6px 0';
    },
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
