<template>
  <div class="app-container">
    <h3 class="showTit">推广活动效果</h3>
    <el-row :gutter="32">
      <el-form ref="form" :model="form">
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.activityid" size="small" placeholder="活动名称" clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.channelid" size="small" placeholder="渠道名称" clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="4">
          <el-date-picker v-model="form.beginTime" size="small" clearable align="right" type="date" placeholder="开始日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd"></el-date-picker>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="4">
          <el-date-picker v-model="form.endTime" size="small" clearable align="right" type="date" placeholder="结束日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd"></el-date-picker>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="2">
          <el-button type="primary" size="small" @click="onSubmit(1)">查询</el-button>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="2">
          <el-button type="danger" size="small" @click="formdata='',showAddActivitydialog=true,isAdd=true">新增活动</el-button>
        </el-col>
      </el-form>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" style="width: 100%" :cell-style="cellStyle" :header-cell-style="rowClass" border v-loading="tableloading">
          <el-table-column prop="name" label="活动名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="spreaderName" label="渠道名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="beginDate" label="开始日期" show-overflow-tooltip></el-table-column>
          <el-table-column prop="endDate" label="结束日期" show-overflow-tooltip></el-table-column>
          <el-table-column prop="state" label="状态" show-overflow-tooltip>
              <template slot-scope="scope"><span>{{ scope.row.state | promotionStatue }}</span></template>
          </el-table-column>
          <el-table-column label="操作"  width="200px" show-overflow-tooltip>
            <template slot-scope="scope">
               <el-button size="mini" type="primary" @click="formdata=scope.row,showAddActivitydialog=true,isAdd=false" >修改</el-button>
                <el-popover :ref="scope.row.promotionID" placement="top" width="180">
                    <p>确定删除本条数据吗？</p>
                    <div style="text-align: right; margin: 0">
                        <el-button size="mini" type="text" @click="$refs[scope.row.promotionID].doClose()">取消</el-button>
                        <el-button type="primary" size="mini" @click="subDelete(scope.row.promotionID)">确定</el-button>
                    </div>
                    <el-button slot="reference" type="danger"  size="mini">删除</el-button>
                </el-popover>
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

    <!--新增活动 弹框-->
    <pcModal v-if="showAddActivitydialog" :xs="8" :sm="8" :lg="2" :title="isAdd ? '新增活动' : '修改'" @closeModal="showAddActivitydialog = false">
      <addActivityModule :getdata="formdata" :isAdd="isAdd" @shuaxin="onSubmit(1)"  @closedialog="showAddActivitydialog = false"></addActivityModule>
    </pcModal>

  </div>
</template>

<script>
    export default {
        name: "promotion",
        components: {
          addActivityModule:() => import('./addActivityModule.vue')
        },
        data(){
            return{
                currentPage: 1, //初始页
                pagesize: 30, //    每页的数据
                total: 0,
                currentTotal:0,
                form: {
                  activityid: '',
                  channelid: '',
                  beginTime:this.moment(new Date(new Date().setHours(0, 0, 0, 0))).format("YYYY-MM-DD"),
                  endTime:this.moment(new Date()).format("YYYY-MM-DD")
                },
                tableData: [],
                isAdd: false,
                showAddActivitydialog:false,
                tableloading:false
            }
        },
        methods:{
            cellStyle(row,column,rowIndex,columnIndex){
              return 'text-align:center;padding:6px 0';
            },
            rowClass({row,rowIndex}){
              return 'text-align:center;padding:6px 0';
            },
            onSubmit(pageNum){
              //name,spreadername,beginTime, endTime，currentPage, limit
              let param = {
                name:this.form.activityid,
                spreadername:this.form.channelid,
                beginTime:this.form.beginTime,
                endTime:this.form.endTime,
                currentPage:pageNum,
                limit:this.pagesize
              };
              this.tableloading=true;
              this.$http({
                url: this.paramUrl.promotionsearch,
                method: "post",
                data: param,
                headers: { "Content-Type": "application/json;charset=UTF-8" }
              }).then(res=> {
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
              })
            },
            handleCurrentChange: function(currentPage) {
              this.currentPage = currentPage;
              this.onSubmit(currentPage);
            },
            subDelete: function(promotionID) {
                this.$http({
                    url:this.paramUrl.promotiondelete,
                    method: "post",
                    data: {
                      promotionID: promotionID
                    },
                    headers: { "Content-Type": "application/json;charset=UTF-8" }
                }).then(res => {
                    if (res.success) {
                        this.$refs[id].doClose();
                        this.beforeInit();
                        this.$notify({
                            title: res.message,
                            type: "success",
                            duration: 2500
                        });
                    } else {
                        this.$refs[id].doClose();
                        this.$notify({
                            title: res.message,
                            type: "error",
                            duration: 2500
                        });
                    }
                });
                this.$refs[id].doClose();
            },
        }
    }
</script>

<style scoped>
.el-date-editor.el-input, .el-date-editor.el-input__inner{
    width:100%;
}
</style>
