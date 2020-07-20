<template>
  <div class="app-container">
    <h3 class="showTit">竞技场积分</h3>
    <el-row :gutter="32">
      <el-form ref="form" :model="form">
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.userid" size="small" placeholder="用户ID" clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="4">
          <el-date-picker v-model="form.beginTime" size="small" clearable align="right" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="开始日期">
          </el-date-picker>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="8">
          <el-button type="primary" v-has="'arenaSignLog_search'" size="small" @click="onSubmit(1)">查询</el-button>
          <el-button type="primary" v-has="'arenaSignLog_search'" size="small"  @click="beforeOneDay()" >向前一天</el-button>
          <el-button type="primary" v-has="'arenaSignLog_search'" size="small"  @click="afterOneDay()">向后一天</el-button>
          <el-button type="danger" v-has="'arenaSignLog_configure'" size="small" @click="addArenasigndialog='true'">配置</el-button>
        </el-col>
      </el-form>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" style="width: 100%" :cell-style="cellStyle" :header-cell-style="rowClass" border v-loading="tableloading">
          <el-table-column prop="userid" label="用户ID"></el-table-column>
          <el-table-column prop="nickname" label="昵称"></el-table-column>
          <el-table-column prop="rank" label="排名" width="100"></el-table-column>
          <el-table-column prop="score" label="竞技场积分"></el-table-column>
          <el-table-column prop="times" label="次数"></el-table-column>
          <el-table-column prop="today" label="当日充值">
            <template slot-scope="scope">{{scope.row.today | null2Zero}}</template>
          </el-table-column>
          <el-table-column prop="total" label="总充值">
            <template slot-scope="scope">{{scope.row.total | numTenthousand}}</template>
          </el-table-column>
          <el-table-column  label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" v-has="'arenaSignLog_update'" @click="editBtn(scope.row)">修改</el-button>
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
    <!--配置-->
    <pcModal v-if="addArenasigndialog" :xs="8" :sm="8" :lg="2" title="配置" @closeModal="addArenasigndialog = false">
        <dialogAddArenasign  @shuaxin="onSubmit(1)"  @closedialog="addArenasigndialog = false"></dialogAddArenasign>
    </pcModal>

    <!--编辑-->
    <pcModal v-if="editArenasigndialog" :xs="8" :sm="8" :lg="2" title="编辑" @closeModal="editArenasigndialog = false">
        <dialogEditArenasign :getdata="formdata" @shuaxin="onSubmit(1)"  @closedialog="editArenasigndialog = false"></dialogEditArenasign>
    </pcModal>
  </div>
</template>

<script>
    export default {
        name: "arenaSignLog",
        components: {
          dialogAddArenasign:() => import('./dialogAddArenasignModel.vue'),
          dialogEditArenasign:() => import('./dialogEditArenasignModel.vue'),
        },
        data(){
          return{
            currentPage: 1, //初始页
            pagesize: 30, //    每页的数据
            total: 0,
            currentTotal:0,
            form: {
                userid: '',
                beginTime:this.moment(new Date()).format("YYYY-MM-DD")
            },
            tableData: [],
            addArenasigndialog:false,
            editArenasigndialog:false,
            formdata:[],
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
            let param = {
              userid:this.form.userid,
              begintime:this.moment(this.form.beginTime).format("YYYY-MM-DD"),
              currentPage:pageNum,
              limit:this.pagesize
            };
            this.tableloading=true;
            this.$api.arenaSignLogSearch(param).then(res =>{
              if (res.success) {
                this.tableData = res.data.records;
                this.tableloading=false;
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
            if((this.form.beginTime == "" || this.form.beginTime == null) ){
              this.form.beginTime=this.moment(new Date()).format("YYYY-MM-DD");
            }else{
              this.form.beginTime=this.moment(this.form.beginTime).subtract(1, 'days').format("YYYY-MM-DD");
            }
            this.onSubmit(1);
          },
          afterOneDay(){
            if((this.form.beginTime == "" || this.form.beginTime == null) ){
              this.form.beginTime=this.moment(new Date()).format("YYYY-MM-DD");
            }else{
              this.form.beginTime=this.moment(this.form.beginTime).add(1, 'days').format("YYYY-MM-DD");
            }
            this.onSubmit(1);
          },
          handleCurrentChange: function(currentPage) {
            this.currentPage = currentPage;
            this.onSubmit(currentPage);
          },
          /**
           * 编辑操作
           */
          editBtn(data){
            this.editArenasigndialog=true;
            this.formdata={
              score:data.score,
              status:data.status,
              searchTime:this.form.beginTime,
              userid:data.userid
            }
          }
        }
    }
</script>

<style scoped>
.el-date-editor.el-input, .el-date-editor.el-input__inner{
    width:100%;
}
</style>