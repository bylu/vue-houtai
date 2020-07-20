<template>
  <div class="app-container">
    <h3 class="showTit">道具掉落统计</h3>
    <el-row :gutter="32">
      <el-form ref="form" :model="form">
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.roomid" size="small" placeholder="房间ID" clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="4">
          <el-select v-model="form.dropType" placeholder="道具选择" size="small"  @change="watchSelect(form.dropType)">
            <el-option v-for="(list,index) in dropTypelist" :key="index" :label="list.fullname" :value="list.id"></el-option>
          </el-select>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.dropTypeid" size="small" @keyup.native="changeSelect(form.dropTypeid)" placeholder="道具ID"></el-input>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="4">
          <el-date-picker v-model="form.beginTime" clearable align="right" size="small" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="8" v-has="'itemDropLog_search'">
          <el-button type="primary" size="small" @click="onSubmit(1)">查询</el-button>
          <el-button type="primary" size="small"  @click="beforeOneDay()" >向前一天</el-button>
          <el-button type="primary" size="small"  @click="afterOneDay()">向后一天</el-button>
        </el-col>
      </el-form>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" style="width: 100%" :cell-style="cellStyle" :header-cell-style="rowClass" border v-loading="tableloading">
            <el-table-column prop="itemName" label="道具">
              <template slot-scope="scope"> {{ scope.row.itemName }}({{ scope.row.itemid }})</template>
            </el-table-column>
            <el-table-column prop="count" label="数量"></el-table-column>
            <el-table-column prop="room" label="房间">
              <template slot-scope="scope"> {{ scope.row.room | null2empty }}</template>
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
  </div>
</template>

<script>
    export default {
        name: "itemDropLog",
        data(){
          return{
            currentPage: 1, //初始页
            pagesize: 30, //    每页的数据
            total: 0,
            currentTotal:0,
            form: {
              roomid: '',
              dropType:'',
              dropTypeid:'',
              beginTime:this.moment(new Date()).format("YYYY-MM-DD")
            },
            tableData: [],
            dropTypelist: [],
            tableloading:false
          }
        },
        mounted() {
          this.itemBasesearchName();
        },
        methods:{
            cellStyle(row,column,rowIndex,columnIndex){
              return 'text-align:center';
            },
            rowClass({row,rowIndex}){
              return 'text-align:center;';
            },
            itemBasesearchName() {
              //加载道具选择
              this.$api.itemBasesearchName().then(res =>{
                this.dropTypelist=[];
                if (res.success) {
                  this.dropTypelist = res.data.records;
                  this.$store.commit('setObject', JSON.stringify(res.data.records));//保存值
                }
              }).catch(err =>{
                this.$message({
                  message: '请求失败!',
                  type: "error"
                });
              })
             
            },
            onSubmit(pageNum){
              //room,itemid,beginTime,currentPage,limit
              let param = {
                room:this.form.roomid,
                itemid:this.form.dropType,
                beginTime:this.form.beginTime,
                currentPage:pageNum,
                limit:this.pagesize
              };
              this.tableloading=true;
              this.$api.itemDropLogsearch(param).then(res =>{
                this.tableloading=false;
                if (res.success) {
                  this.tableData = res.data.records;
                  this.total = res.data.total; //size
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
              if((this.form.beginTime == "" || this.form.beginTime == null)){
                this.form.beginTime=this.moment(new Date()).format("YYYY-MM-DD");
              }else{
                this.form.beginTime=this.moment(this.form.beginTime).subtract(1, 'days').format("YYYY-MM-DD");
              }
             
              this.onSubmit(1);
            },
            afterOneDay(){
              if((this.form.beginTime == "" || this.form.beginTime == null)){
                this.form.beginTime=this.moment(new Date()).format("YYYY-MM-DD");
              }else{
                this.form.beginTime=this.moment(this.form.beginTime).add(1, 'days').format("YYYY-MM-DD");
              }
              this.onSubmit(1);
            },
             /**
             * 渠道下拉框绑定后面的input值
             */
            watchSelect(val){
              this.form.dropTypeid=val;
            },
            /**
             * 输入input  绑定 select值
             */
            changeSelect(val){
              this.form.dropType=parseInt(val);
            }
        }
    }
</script>

<style scoped>
.el-date-editor.el-input, .el-date-editor.el-input__inner{
    width:100%;
}
</style>
