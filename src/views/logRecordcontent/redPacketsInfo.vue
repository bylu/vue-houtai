<template>
  <div class="app-container">
    <h3 class="showTit">红包记录</h3>
    <el-row :gutter="32">
      <el-form ref="form" :model="form">
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.sourcegameid" size="small" placeholder="源游戏ID" clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.targetgameid" size="small" placeholder="目标游戏ID" clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.redPacketCoding" size="small" placeholder="红包码" clearable></el-input>
        </el-col>
        <el-col :xs="12" :sm="6" :lg="4">
          <el-date-picker v-model="form.beginTime" clearable size="small" align="right" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="开始日期">
          </el-date-picker>
        </el-col>
        <el-col :xs="12" :sm="6" :lg="4">
          <el-date-picker v-model="form.endTime" size="small" clearable align="right" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="结束日期">
          </el-date-picker>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="6" v-has="'redPacketsInfo_search'">
          <el-button type="primary" size="small" @click="onSubmit(1)">查询</el-button>
          <el-button type="primary" size="small"  @click="beforeOneDay()" >向前一天</el-button>
          <el-button type="primary" size="small"  @click="afterOneDay()">向后一天</el-button>
          <!-- <el-button type="primary" size="small" plain="" >导出excel</el-button> -->
        </el-col>
      </el-form>
    </el-row>
    <el-row :gutter="32">
        <el-col :span="24">
        <el-button type="success" size="small" v-has="'redPacketsInfo_newCode'" :loading="loading" @click="addRedPacketClick">新增红包码</el-button>

        <el-button type="warning" size="small" v-has="'redPacketsInfo_generateRedpacket'" @click="addRedPacketsDialog=true" >生成红包</el-button>

        <el-button type="danger" size="small" v-has="'redPacketsInfo_exportRedpacket'" @click="exportRedPackets" >导出红包</el-button>

        <el-button type="primary" size="small" v-has="'redPacketsInfo_setCodingUsed'" @click="updateRedPackets" plain>更新红包码状态</el-button>
        </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" style="width: 100%;margin-top:10px;" border v-loading="tableloading" :cell-style="cellStyle" :header-cell-style="rowClass">
          <el-table-column prop="redPacketCoding" label="红包码" width="110px"></el-table-column>
          <el-table-column prop="" label="源用户ID">
            <template slot-scope="scope">
              {{ scope.row.sourceUserId | null2Zero}}
            </template>
          </el-table-column>
          <el-table-column prop="" label="红包批次">
            <template slot-scope="scope">
              {{ scope.row.sendBatch | null2Zero}}
            </template>
          </el-table-column>
          <el-table-column prop="" label="道具id">
            <template slot-scope="scope">
              {{ scope.row.itmeid | null2Zero}}
            </template>
          </el-table-column>
          <el-table-column prop="" label="发送前银行" width="120px">
            <template slot-scope="scope">
              {{ scope.row.sourceBankScore | numTenthousandOrNull}}
            </template>
          </el-table-column>
          <el-table-column prop="score" label="发送金额">
             <template slot-scope="scope">
              {{ scope.row.score | numTenthousandOrNull}}
            </template>
          </el-table-column>
          <el-table-column prop="sourceBankScore" label="发送后银行" width="120px">
            <template slot-scope="scope">
              {{ scope.row.sourceBankScore | numTenthousandOrNull}}
            </template>
          </el-table-column>
          <el-table-column prop="collectDate" label="发送时间" width="100px"></el-table-column>
          <el-table-column prop="targetUserId" label="目标用户ID" width="100px"></el-table-column>
          <el-table-column prop="" label="目标游戏ID" width="100px">
            <template slot-scope="scope">
              {{ scope.row.targetgameid | null2empty}}
            </template>
          </el-table-column>
          <el-table-column prop="" label="目标账号" width="230">
            <template slot-scope="scope">
              {{ scope.row.targetaccount | null2empty}}
            </template>
          </el-table-column>
          <el-table-column prop="" label="收红包前银行" width="100px">
            <template slot-scope="scope">
              {{ scope.row.targetBankScore | numTenthousandOrNull}}
            </template>
          </el-table-column>

          <el-table-column prop="" label="收红包后银行" width="100px">
            <template slot-scope="scope">
              {{ scope.row.targetbank | null2empty}}
            </template>
          </el-table-column>

          <el-table-column prop="targetDate" label="收红包时间" width="100px"></el-table-column>
          <el-table-column prop="redPacketType" label="状态"></el-table-column>
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
    <!--生成红包-->
    <pcModal v-if="addRedPacketsDialog" :xs="8" :sm="8" :lg="2" title="生成红包" @closeModal="addRedPacketsDialog = false">
        <dialogAddRedPackets    @closedialog="addRedPacketsDialog = false"></dialogAddRedPackets>
    </pcModal>

  </div>
</template>

<script>
    export default {
        name: "redPacketsInfo",
        components:{
          dialogAddRedPackets:() => import('./redPacketsAddModule.vue'),
        },
        data(){
            return{
                currentPage: 1, //初始页
                pagesize: 30, //    每页的数据
                total: 0,
                currentTotal:0,
                form: {
                  sourcegameid: '',
                  targetgameid: '',
                  redPacketCoding: '',
                  beginTime:this.moment(new Date()).format("YYYY-MM-DD"),
                  endTime:this.moment(new Date()).format("YYYY-MM-DD")
                },
                tableData: [],
                addRedPacketsDialog:false,
                loading: false,
                tableloading:false,
            }
        },
        methods:{
            cellStyle(row,column,rowIndex,columnIndex){
              return 'padding:6px 0';
            },
            rowClass({row,rowIndex}){
              return 'padding:6px 0';
            },
            onSubmit(pageNum){
              let param = {
                sourcegameid:this.form.sourcegameid,
                targetgameid:this.form.targetgameid,
                redPacketCoding:this.form.redPacketCoding,
                beginTime:this.moment(this.form.beginTime).format("YYYY-MM-DD"),
                endTime:this.moment(this.form.endTime).format("YYYY-MM-DD"),
                currentPage:pageNum,
                limit:this.pagesize
              };
              this.tableloading=true;
              this.$api.redPacketsInfosearch(param).then(res =>{
                this.tableloading=false;
                if (res.success) {
                  this.tableData = res.data.records;
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
            handleCurrentChange: function(currentPage) {
              this.currentPage = currentPage;
              this.onSubmit(currentPage);
            },
            /**
             * 新增红包码 操作
             */
            addRedPacketClick(){
              this.loading = true;
              this.$api.redPacketsInfonewCode().then(res =>{
                if (res.success) {
                  this.loading = false;
                  this.$message({
                    message: res.message,
                    type: "success"
                  });
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
            /**
             * 导出红包操作
             */
            exportRedPackets(){
              this.$prompt('', '请输入要导出的批次号', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputValue:'',
                    inputValidator:function(inputValue){
                        if(inputValue == "" ||inputValue == null){
                            return "请输入批次号"
                        }
                    },
                }).then(({ value }) => {
                    let param = {
                      sendBatch:value
                    };
                    this.$api.redPacketsInfoexportExcel(param).then(res =>{
                      this.commonJs.downloadXls1(res,value+'.xlsx')
                        // this.loading = false;
                        // if (res.success) {
                        //   this.$message({
                        //       showClose: true,
                        //       message: res.message,
                        //       type: 'success'
                        //   });
                        // }else{
                        //     this.$message({
                        //       showClose: true,
                        //       message: res.message,
                        //       type: 'error'
                        //     });
                        // }
                      }).catch(() => {
                          this.$message({
                              type: 'info',
                              message: '取消输入'
                          });
                      });
                    }).catch(e=>e);
            },
            /**
             * 更新红包码状态
             */
            updateRedPackets(){
              this.$prompt('', '请输入要更新的红包码', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputValue:'',
                    inputValidator:function(inputValue){
                        if(inputValue == "" ||inputValue == null){
                            return "请输入红包码"
                        }
                    },
                }).then(({ value }) => {
                    let param = {
                      redPacketCoding:value
                    };
                    this.$api.redPacketsInfosetUsed(param).then(res =>{
                      this.loading = false;
                        if (res.success) {
                          this.$message({
                              showClose: true,
                              message: res.message,
                              type: 'success'
                          });
                          this.onSubmit(1);
                        }else{
                            this.$message({
                              showClose: true,
                              message: res.message,
                              type: 'error'
                            });
                        }
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '取消输入'
                        });
                    });
                  }).catch(e=>e);
            }
        }
    }
</script>

<style scoped>
.el-date-editor.el-input, .el-date-editor.el-input__inner{
    width:100%;
}
</style>
