<template>
  <div class="app-container">
    <h3 class="showTit">渠道分成管理</h3>
    <el-row :gutter="32">
        <el-form :model="form" :inline="true" ref="form" label-width="80px" class="demo-ruleForm">
          <el-col :xs="24" :sm="6" :lg="3">
            <el-input v-model.trim="form.spreaderId" size="small" placeholder="渠道ID" value='' clearable></el-input>
          </el-col>
          <el-col :xs="24" :sm="6" :lg="3">
            <el-input v-model.trim="form.orderCharacter" size="small" placeholder="订单特征" value='' clearable></el-input>
          </el-col>
        
          <el-col :xs="24" :sm="24" :lg="8">
            <el-button type="primary" size="small" v-has="'spreaderOrderCharacterRate_search'"  @click="onSubmit(1)">查询</el-button>
          
            <el-button size="small"  type="danger" v-has="'spreaderOrderCharacterRate_add'" @click="formdata='',showAddModal=true,isAdd=true">添加</el-button>
         
            <el-button size="small" type="success" v-has="'spreaderOrderCharacterRate_spreadcpa'" @click="showOpenqudaoDialog = true">CPA外放渠道配置</el-button>
          </el-col>
        </el-form>
      </el-row>
    <el-row>
      <el-col :span="24">
        <el-table v-loading="loading" :data="moduletabledata" :cell-style="cellStyle" :header-cell-style="rowClass" highlight-current-row style="width: 100%;" border>
          <el-table-column prop="spreaderId" label="渠道ID"/>
          <el-table-column prop="accounts" label="渠道账号" />
          <el-table-column prop="company" label="公司名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="orderCharacter" label="订单特征" ></el-table-column>
          <el-table-column prop="orderExpandId" label="订单特征拓展" show-overflow-tooltip ></el-table-column>
          <el-table-column prop="discription" label="订单描述" show-overflow-tooltip />
          <el-table-column prop="classType" label="渠道类型"  show-overflow-tooltip>
            <template slot-scope="scope">{{scope.row.classType | qudaoTypeCheck }}</template> 
          </el-table-column>
          <el-table-column prop="commission" label="手续费"></el-table-column>
          <el-table-column prop="income" label="分成"  show-overflow-tooltip></el-table-column>
      
          <el-table-column label="操作" width="100px" align="center">
            <template slot-scope="scope"> 
              <el-button type="primary" v-has="'spreaderOrderCharacterRate_update'" style="margin-bottom:0px;"  @click="formdata=scope.row,showAddModal=true,isAdd=false" size="mini">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 begin-->
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
    <!--新增和修改-->
    <pcModal v-if="showAddModal" :xs="8" :sm="8" :lg="2" :title="isAdd ? '添加' : '修改'"  @closeModal="showAddModal = false">
      <spreaderOrderCharaterRateDialogModule  :getdata="formdata" :isAdd="isAdd"  @shuaxin="onSubmit(1)" @closedialog="showAddModal = false"></spreaderOrderCharaterRateDialogModule>
    </pcModal>
    <!-- CPA外放渠道配置-->
    <pcModal v-if="showOpenqudaoDialog" :xs="8" :sm="8" :lg="2" :title="'CPA外放渠道配置'"  @closeModal="showOpenqudaoDialog = false">
      <showOpenDialogModule   @shuaxin="onSubmit(1)" @closedialog="showOpenqudaoDialog = false"></showOpenDialogModule>
    </pcModal>
  </div>
</template>
<script>
export default {
  name: "spreaderOrderCharacterRate",
  components: {
    spreaderOrderCharaterRateDialogModule: () => import("./spreaderOrderCharaterRateModule"),
    showOpenDialogModule:()=>import("./showOpenDialogModule")
  },
  data() {
    return {
     form:{
        spreaderId:"",
        orderCharacter:""
     },
      loading: false,
      currentPage: 1, //初始页
      pagesize: 30, //    每页的数据
      total: 0,
      currentTotal:0,
      moduletabledata: [],
      showAddModal: false,
      isAdd:false,
      showOpenqudaoDialog:false
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
    onSubmit(pageNum) {
      this.loading = true;
      this.$api.spreaderOrderCharacterRatesearch(this.form).then(res =>{
        this.moduletabledata = [];
        if (res.success) {
          this.moduletabledata = res.data.records;
          this.loading = false;
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
    }
  }
};
</script>

<style scoped>
.filter-item {
  margin-bottom: 10px;
}
</style>
