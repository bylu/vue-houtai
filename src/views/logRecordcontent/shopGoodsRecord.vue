<template>
  <div class="app-container">
    <h3 class="showTit">兑换奖品记录</h3>
    <el-row :gutter="32">
      <el-form ref="form" :model="form">
        <el-col :xs="12" :sm="6" :lg="3">
          <el-input v-model.trim="form.userid" size="small" placeholder="用户ID" clearable></el-input>
        </el-col>
        <el-col :xs="12" :sm="6" :lg="3">
          <el-input v-model.trim="form.tel" size="small" placeholder="电话" clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="4">
          <el-input v-model.trim="form.orderid" size="small" placeholder="订单号" clearable></el-input>
        </el-col>
        <el-col :xs="12" :sm="6" :lg="3">
          <el-input v-model.trim="form.goodsname" size="small" placeholder="商品名称" clearable></el-input>
        </el-col>
        <el-col :xs="12" :sm="6" :lg="4">
          <el-date-picker v-model="form.beginTime"  size="small" clearable align="right" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="开始日期">
          </el-date-picker>
        </el-col>
        <el-col :xs="12" :sm="6" :lg="4">
          <el-date-picker v-model="form.endTime" size="small" clearable align="right" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="结束日期">
          </el-date-picker>
        </el-col>
        <el-col :xs="12" :sm="6" :lg="3">
          <el-select v-model="form.deliveryStatus" size="small" placeholder="发货状态">
            <el-option v-for="list in selectList.deliveryStatuslist" :key="list.key" :value="list.key" :label="list.value"></el-option>
          </el-select>
        </el-col>
        <el-col :xs="12" :sm="6" :lg="3">
          <el-select v-model="form.shopType" size="small" placeholder="商品类型">
            <el-option v-for="list in selectList.shopTypelist" :key="list.key" :value="list.key" :label="list.value"></el-option>
          </el-select>
        </el-col>
        <el-col :xs="12" :sm="6" :lg="3">
          <el-select v-model="form.consumeType" size="small" placeholder="消耗类型">
            <el-option v-for="list in selectList.consumeTypelist" :key="list.key" :value="list.key" :label="list.value"></el-option>
          </el-select>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="6" v-has="'shopGoodsRecord_search'">
          <el-button type="primary" size="small" @click="onSubmit(1)">查询</el-button>
          <el-button type="primary" size="small"  @click="beforeOneDay()" >向前一天</el-button>
          <el-button type="primary" size="small"  @click="afterOneDay()">向后一天</el-button>
        </el-col>
      </el-form>
    </el-row>

    <div class="otherdesc">
      总水晶：{{lotteries| numTenthousand}} &nbsp;&nbsp;总话费：{{costs | numTenthousand}} 
    </div>

    <el-row :gutter="32">
      <el-col :span="24">
        <el-table :data="tableData" style="width: 100%" border v-loading="tableloading" :cell-style="cellStyle" :header-cell-style="rowClass">
          <el-table-column prop="orderid" label="订单号" width="110px"></el-table-column>
          <el-table-column prop="userid" label="用户ID" width="90px"></el-table-column>
          <el-table-column prop="nickname" label="用户昵称" width="100px"></el-table-column>
          <!-- <el-table-column prop="gameid" label="游戏ID" width="90px">
            <template slot-scope="scope">
              <span style="color:#1890ff;cursor: pointer;" @click="openNewWin(scope.row.gameid)">{{ scope.row.gameid }}</span>
            </template>
          </el-table-column> -->
          <el-table-column prop="shopname" label="兑换商品" width="100px"></el-table-column>
          <el-table-column prop="note2" label="发货商品" width="230px">
            <template slot-scope="scope"> {{scope.row.note2 | null2empty }}</template>
          </el-table-column>
          <el-table-column prop="consumeType" label="消耗" width="100px">
            <template slot-scope="scope"><div v-html="checkConsumeType(scope.row.consumeType,scope.row.uselottery)"></div></template>
          </el-table-column>
          <el-table-column prop="name" label="真实姓名" width="80px">
            <template slot-scope="scope"> {{scope.row.name | null2empty }}</template>
          </el-table-column>
          <el-table-column prop="tel" label="联系电话" width="120px">
            <template slot-scope="scope"> {{scope.row.tel | null2Zero }}</template>
          </el-table-column>
          <el-table-column prop="" label="收货地址" width="220px">
            <template slot-scope="scope"> {{scope.row.receiveaddr+scope.row.detailaddr | null2empty }}</template>
          </el-table-column>
          <el-table-column prop="inserttime" label="兑换时间" width="100px"></el-table-column>
          <el-table-column prop="status" label="状态">
            <template slot-scope="scope"> {{scope.row.status | shopGoodsRecordStatue }}</template>
          </el-table-column>
          <el-table-column prop="remark" label="备注" >
            <template slot-scope="scope">
              <span style="color:#1890ff;cursor: pointer;"  @click="formdata=scope.row,remarkDialog=true">{{ scope.row.remark }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="" label="操作" width="90px">
            <template slot-scope="scope">
              <template v-if="scope.row.status == 0"><!--未发货-->
                  <el-button type="success" size="mini" style="margin: 5px 10px;" v-has="'shopGoodsRecord_send'" @click="formdata=scope.row,sentOutGoodDialog = true">发货</el-button>
                  <el-button type="danger"  size="mini" style="margin: 5px 10px;" v-has="'shopGoodsRecord_repeal'" @click="formdata=scope.row,cancleOperaDialog = true">撤销</el-button>
                  <div v-show="scope.row.typeId !==1 && scope.row.typeId !== 4 " class="showbuttonclass">
                    <el-button type="primary" size="mini" style="margin: 5px 10px;" v-has="'shopGoodsRecord_update'"  @click="formdata=scope.row,shopGoodsRecordeditModal=true">修改</el-button>
                  </div>
              </template>
              <template v-if="scope.row.status == 3"><!--撤销-->
                  <div v-show="scope.row.typeId !==1 && scope.row.typeId !== 4 " class="showbuttonclass">
                    <el-button type="primary" size="mini" style="margin: 5px 10px;" v-has="'shopGoodsRecord_update'"  @click="formdata=scope.row,shopGoodsRecordeditModal=true">修改</el-button>
                  </div>
              </template>
              <template v-if="scope.row.status == 2"><!--已发货-->
                <div v-show="scope.row.typeId !==1 && scope.row.typeId !== 4" class="showbuttonclass">
                    <el-button type="primary"  size="mini" style="margin: 5px 10px;" v-has="'shopGoodsRecord_update'"  @click="formdata=scope.row,shopGoodsRecordeditModal=true">修改</el-button>
                </div>
              </template>

            </template>
          </el-table-column>
        </el-table>

        <div class="showpaginationbody">
          <div class="currentTotal">
            {{currentTotal}}<span class="showtotal">/{{total}}</span>
          </div>
          <el-pagination
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[30]"
              :page-size="pagesize"
              layout="total,prev, pager, next, jumper"
              :total="total"
          >
          </el-pagination>
        </div>
      </el-col>
    </el-row>

    <!--修改-->
    <pcModal v-if="shopGoodsRecordeditModal" :xs="8" :sm="8" :lg="2" :title="'修改'"  @closeModal="shopGoodsRecordeditModal = false">
      <shopGoodsRecordeditcontent :getdata="formdata" @shuaxin="onSubmit(currentPage)" @closedialog="shopGoodsRecordeditModal = false"></shopGoodsRecordeditcontent>
    </pcModal>

    <!--发货-->
    <pcModal v-if="sentOutGoodDialog" :xs="8" :sm="8" :lg="2" :title="'发货'"  @closeModal="sentOutGoodDialog = false">
      <sentOutGoodDialogModule :getdata="formdata" @shuaxin="onSubmit(currentPage)" @closedialog="sentOutGoodDialog = false"></sentOutGoodDialogModule>
    </pcModal>

    <!--撤销-->
    <pcModal v-if="cancleOperaDialog" :xs="8" :sm="8" :lg="2" :title="'撤销'"  @closeModal="cancleOperaDialog = false">
      <cancleOperaDialogModule :getdata="formdata" @shuaxin="onSubmit(currentPage)" @closedialog="cancleOperaDialog = false"></cancleOperaDialogModule>
    </pcModal>
    <!--修改备注-->
    <pcModal v-if="remarkDialog" width="600px" :title="'修改备注'"  @closeModal="remarkDialog = false">
      <remarkDialogModule :getdata="formdata" @shuaxin="onSubmit(currentPage)" @closedialog="remarkDialog = false"></remarkDialogModule>
    </pcModal>

  </div>
</template>

<script>
    export default {
        name: "shopGoodsRecord",
        components: {
          shopGoodsRecordeditcontent: () => import("./shopGoodsRecordeditcontent"),
          sentOutGoodDialogModule: () => import("./shopGoodssentOutGoodModule"),
          cancleOperaDialogModule: () => import("./shopGoodscancleOperaModule"),
          remarkDialogModule:() => import('./remarkDialogModule')
        },
        data(){
          return{
              currentPage: 1, //初始页
              pagesize: 30, //    每页的数据
              total: 0,
              currentTotal:0,
              form: {
                userid: '',
                orderid:'',
                tel:'',
                goodsname:'',
                beginTime:this.moment(new Date(new Date().setHours(0, 0, 0, 0))).format("YYYY-MM-DD"),
                endTime:this.moment(new Date()).format("YYYY-MM-DD"),
                deliveryStatus:'-1',
                shopType:'-1',
                consumeType:'',
              },
              tableData: [],
              lotteries:'0',  //总水晶
              costs:'0',  //总话费
              shopGoodsRecordeditModal: false,
              sentOutGoodDialog:false,
              cancleOperaDialog:false,
              formdata:[],
              tableloading:false,
              remarkDialog:false,
          }
        },
        mounted(){
           this.getParams();
        },
        methods:{
            cellStyle(row,column,rowIndex,columnIndex){
              return 'padding:6px 0';
            },
            rowClass({row,rowIndex}){
              return 'padding:6px 0';
            },
            getParams() {
              // 取到路由带过来的参数
              this.form.userid = this.$route.query.gameID;
              if(this.form.userid == "" || this.form.userid ==null || typeof(this.form.userid) == undefined){

              }else{
                 this.onSubmit(1);
              }
            },
            onSubmit(pageNum){
              //userid,orderid,phone,shopname,consumeType(消耗类型),shoptypeid(商品类型),orderstatus(发货状态), beginTime,endTime,currentPage,limit
              let param = {
                userid:this.form.userid,
                orderid:this.form.orderid,
                phone:this.form.tel,
                shopname:this.form.goodsname,
                beginTime:this.form.beginTime,
                endTime:this.form.endTime,
                orderstatus:this.form.deliveryStatus,
                shoptypeid:this.form.shopType,
                consumeType:this.form.consumeType,
                currentPage:pageNum,
                limit:this.pagesize
              };
              this.tableloading=true;
              this.$api.shopGoodsRecordsearch(param).then(res =>{
                this.tableloading=false;
                  if (res.success) {
                    this.tableData = res.data.records;
                    this.lotteries = res.params.lotteries;
                    this.costs = res.params.costs;
                    this.total = res.data.total;
                    this.pagesize=res.data.size;
                    this.currentPage = res.data.current;
                    this.currentTotal=(this.currentPage) * (this.pagesize)
                    if(this.currentTotal > this.total){
                      this.currentTotal = this.total
                    }else{
                      this.currentTotal=(this.currentPage) * (this.pagesize)
                    }
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
            handleCurrentChange: function(currentPage) {
              this.currentPage = currentPage;
              this.onSubmit(currentPage);
            },
            beforeOneDay(){
              if((this.form.beginTime == "" || this.form.beginTime == null) && (this.form.endTime == "" || this.form.endTime == null)){
                this.form.beginTime=this.moment(new Date()).format("YYYY-MM-DD");
                this.form.endTime=this.moment(new Date()).format("YYYY-MM-DD");
              }else{
                this.form.beginTime=this.moment(this.form.beginTime).subtract(1, 'days').format("YYYY-MM-DD");
                this.form.endTime=this.moment(this.form.endTime).subtract(1, 'days').format("YYYY-MM-DD");
              }

              this.onSubmit(1);
            },
            afterOneDay(){
              if((this.form.beginTime == "" || this.form.beginTime == null) && (this.form.endTime == "" || this.form.endTime == null)){
                this.form.beginTime=this.moment(new Date()).format("YYYY-MM-DD");
                this.form.endTime=this.moment(new Date()).format("YYYY-MM-DD");
              }else{
                this.form.beginTime=this.moment(this.form.beginTime).add(1, 'days').format("YYYY-MM-DD");
                this.form.endTime=this.moment(this.form.endTime).add(1, 'days').format("YYYY-MM-DD");
              }
              this.onSubmit(1);
            },
            // openNewWin(data){
            //   const {href} = this.$router.resolve({
            //     path: '/userbaseinfo',
            //     query: {
            //       gameID: data
            //     }
            //   })
            //   window.open(href, '_blank')
            // },
            checkConsumeType(consumeTypes,uselottery){
              if (consumeTypes == 0){
                    return uselottery+'奖卷';
                }else if(consumeTypes == 1){
                    return '道具';
                }else if(consumeTypes == 2){
                    return uselottery+'水晶';
                }else{
                    return consumeTypes;
                }
            },
            // getAddress(data){
            //   let getinfo="";
            //   if(data.receiveaddr == "" || data.null2empty == null){
            //     getinfo="0"
            //   }else{
            //     getinfo="1";
            //   }
            //   if(data.detailaddr == "" || data.detailaddr == null){
            //     getinfo="0"
            //   }else{
            //     getinfo="1"
            //   }

            //   if(getinfo == "0"){
            //     return "无"
            //   }else{
            //     return  data.receiveaddr + data.detailaddr
            //   }

            // },
        }
    }
</script>

<style scoped>
.el-date-editor.el-input, .el-date-editor.el-input__inner{
    width:100%;
}
</style>
