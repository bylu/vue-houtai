<template>
  <div class="app-container">
    <h3 class="showTit">限时抢购管理</h3>
    <el-row :gutter="32">
      <el-form ref="form" :model="form">
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.goodsname" size="small" placeholder="商品名称" clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.goodsprice" size="small" placeholder="活动金额" clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="3">
          <el-select v-model="form.statue" placeholder="全部" size="small">
            <el-option  v-for="list in selectList.userpayornopay" :key="list.key" :label="list.value" :value="list.key"></el-option>
          </el-select>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="3">
          <el-select v-model="form.dayinfo" placeholder="全部" size="small">
            <el-option  v-for="list in selectList.dayinfolist" :key="list.key" :label="list.value" :value="list.key"></el-option>
          </el-select>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="4">
          <el-button type="primary" v-has="'shopRushConfig_search'" @click="onSubmit(1)" size="small">查询</el-button>
          <el-button type="danger" v-has="'shopRushConfig_add'"  @click="formdata='',showdialogeEdit=true,isAdd=true" size="small">新增配置</el-button>
        </el-col>
      </el-form>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" style="width: 100%" :cell-style="cellStyle" :header-cell-style="rowClass"
        v-loading="tableloading" border @sort-change='sortChange' :header-cell-class-name="handleHeaderCellClass">
          <el-table-column prop="shoptitle" label="商品名称">
            <template slot-scope="scope">{{ scope.row.shoptitle | null2empty }}</template>
          </el-table-column>
          <el-table-column prop="shopvalue" label="活动金额" sortable="true">
            <template slot-scope="scope">{{ scope.row.shopvalue | numTenthousand }}</template>
          </el-table-column>
          <el-table-column prop="sourcegetscore" label="原始获取幸运豆" sortable="true">
            <template slot-scope="scope">{{ scope.row.sourcegetscore | numTenthousand }}</template>
          </el-table-column>
          <el-table-column prop="lastgetscore" label="实际获取幸运豆" sortable="true">
            <template slot-scope="scope">{{ scope.row.lastgetscore | numTenthousand }}</template>
          </el-table-column>
          <el-table-column prop="shopgetrate" label="翻倍比例" sortable="true">
            <template slot-scope="scope">{{ scope.row.shopgetrate | null2Zero }}</template>
          </el-table-column>
          <el-table-column prop="surpluschange" label="商品剩余数量" sortable="true">
            <template slot-scope="scope">{{ scope.row.surpluschange | null2Zero }}</template>
          </el-table-column>
          <el-table-column prop="totalchange" label="商品上架数量" sortable="true">
            <template slot-scope="scope">{{ scope.row.totalchange | null2Zero }}</template>
          </el-table-column>
          <el-table-column prop="typeid"  label="是否免费" sortable="true">
            <template slot-scope="scope">{{ scope.row.typeid | usershoprushconfigTypeidStatue }}</template>
          </el-table-column>
          <el-table-column prop="show" label="上/下午" >
            <template slot-scope="scope">{{ scope.row.show | usershoprushconfigShowStatue }}</template>
          </el-table-column>
          <el-table-column prop="insertdate" label="执行时间" width="160px" sortable="true">
            <template slot-scope="scope">{{ scope.row.insertdate | null2empty }}</template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" v-has="'shopRushConfig_update'" style="margin-bottom:0px" @click="formdata=scope.row,showdialogeEdit=true,isAdd=false" >修改</el-button>
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

    <!--新增配置和编辑 弹框-->
    <pcModal v-if="showdialogeEdit" width="760px" :title="isAdd ? '新增' : '编辑'" @closeModal="showdialogeEdit = false">
        <addshoprushconfig :getdata="formdata" :isAdd="isAdd" @shuaxin="onSubmit(1)"  @closedialog="showdialogeEdit = false"></addshoprushconfig>
    </pcModal>
  </div>
</template>

<script>
    export default {
        name: "usershoprushconfig",
        components: {
          addshoprushconfig:() => import('./addshoprushconfig.vue')
        },
        data(){
          return{
            currentPage: 1, //初始页
            pagesize: 30, //    每页的数据
            total: 0,
            currentTotal:0,
            form: {
              goodsname: '',
              goodsprice: '',
              statue:'',
              dayinfo:''
            },
            tableData: [],
            isAdd: false,
            showdialogeEdit:false,
            tableloading:false,
            sort:"desc",
            sortby:"insertdate",
            orderDict:[],
            orderStackSet:[]
          }
        },
        methods:{
            cellStyle(row,column,rowIndex,columnIndex){
              return 'text-align:center;padding:6px 0';
            },
            rowClass({row,rowIndex}){
              return 'text-align:center;padding:6px 0';
            },
            handleHeaderCellClass({row,column,rowIndex,columnIndex}){
              if(this.orderStackSet.length > 0){
                let arr =this.orderStackSet;
                let currentField =arr[arr.length - 1];
                if(currentField){
                  return this.orderDict[column.property];
                }
              }
              return "";
            },
            sortChange({column,prop,order}){
              this.orderStackSet=this.orderStackSet.filter(item => item != prop);
              if(order != null){
                this.orderDict[prop]=order;
                this.orderStackSet.push(prop);
              }else if(order == null){
                this.orderDict[prop]="";
                this.orderStackSet.push(prop);
              }else{
                delete this.orderDict[prop];
              }
               if(this.orderStackSet.length > 1){
                  let del=this.orderStackSet.splice(0,1);
                  let leftE=del[0];
                  delete this.orderDict[leftE]
              }
             if(this.orderDict[prop] == "descending"){
                  this.sort="desc"
              }else if(this.orderDict[prop] == "ascending"){
                  this.sort="asc"
              }else{
                  this.sort=""
              }
               this.sortby= (this.orderStackSet).toString();
              this.onSubmit(1);
            },
            onSubmit(pageNum){
              //shoptitle , shopvalue, typeid(0全部，1免费，2付费), show(0全部，1下午，2上午), currentPage, limit, sort
              let param = {
                shoptitle:this.form.goodsname,
                shopvalue:this.form.goodsprice,
                typeid:this.form.statue,
                show:this.form.dayinfo,
                currentPage:pageNum,
                limit:this.pagesize,
                sort:this.sort,
                sortby:this.sortby,
              };
              this.tableloading=true;
              this.$api.shopRushConfigsearch(param).then(res =>{
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
        }
    }
</script>

<style scoped>
.el-date-editor.el-input, .el-date-editor.el-input__inner{
    width:100%;
}
</style>
