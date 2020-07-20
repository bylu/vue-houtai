<template>
  <div class="app-container">
    <h3 class="showTit">渠道管理</h3>
    <el-row :gutter="32">
      <el-form :model="form" :inline="true" ref="form" label-width="80px" class="demo-ruleForm">
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.userId" size="small" placeholder="渠道ID" value='' clearable></el-input>
        </el-col>
        <el-col :xs="24" :sm="6" :lg="3">
          <el-input v-model.trim="form.accounts" size="small" placeholder="渠道账号" value='' clearable></el-input>
        </el-col>
      
        <el-col :xs="24" :sm="12" :lg="6">
          <el-button type="primary" size="small" v-has="'spreaderManage_search'" @click="onSubmit(1)">查询</el-button>

          <el-button size="small" type="danger" v-has="'spreaderManage_newSpreader'" @click="formdata='',showAddModal=true,isAdd=true">新增渠道</el-button>
        </el-col>

          <!-- <el-col :xs="8" :sm="4" :lg="3">
          <el-button size="small" filter-item  type="danger">账号创建渠道</el-button>
        </el-col> -->
      </el-form>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table v-loading="loading" :data="moduletabledata" :cell-style="cellStyle" :header-cell-style="rowClass" highlight-current-row  style="width: 100%;" border>
          <el-table-column prop="userId" label="渠道ID"/>
          <el-table-column prop="accounts" label="渠道账号" />
          <el-table-column prop="nickName" label="渠道名称" ></el-table-column>
          <el-table-column prop="company" label="公司名称" ></el-table-column>
          <el-table-column prop="platform" label="平台类型"  >
              <template slot-scope="scope">{{ scope.row.platform | platFormCheck }}</template>
          </el-table-column>
          <el-table-column prop="commission" label="手续费"  />
          <el-table-column prop="rewardRate" label="分成"  />
          <el-table-column prop="area" label="区域">
              <template slot-scope="scope">{{scope.row.area | areaCheck }}</template> 
          </el-table-column>
          <el-table-column prop="classType" label="渠道类型"  >
                <template slot-scope="scope">{{scope.row.classType | qudaoTypeCheck }}</template> 
          </el-table-column>
          <el-table-column prop="registerDate" label="注册时间" width="150px"  />
          <el-table-column label="操作" width="230px">
            <template slot-scope="scope"> 
              <el-button type="primary"  style="margin-bottom:0px;" v-has="'spreaderManage_update'"  @click="formdata=scope.row,showAddModal=true,isAdd=false" size="mini">修改</el-button>
              <div class="showbuttonclass" v-show='scope.row.add == 0' >
                <el-button style="margin-bottom:0px;" type="danger" v-has="'spreaderManage_addToIndex'" size="mini" @click="addIndexPage(scope.row)">添加渠道到首页</el-button>
              </div>
              <div class="showbuttonclass" v-show='scope.row.add == 1'>
                <el-button style="margin-bottom:0px;" type="success" v-has="'spreaderManage_removeFirst'" size="mini" @click="removeIndexPage(scope.row)">从首页移除</el-button>
              </div>
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
    <pcModal v-if="showAddModal" width="724px" :title="isAdd ? '新增渠道' : '修改渠道'"  @closeModal="showAddModal = false">
      <addSpreaderManagerModule  :getdata="formdata" :isAdd="isAdd"  @shuaxin="onSubmit(1)" @closedialog="showAddModal = false"></addSpreaderManagerModule>
    </pcModal>
  </div>


</template>
<script>
export default {
  name: "spreaderManage",
  components: {
    addSpreaderManagerModule: () => import("./addSpreaderManagerModule"),
  },
  data() {
    return {
     form:{
        userId:"",
        accounts:""
     },
      loading: false,
      currentPage: 1, //初始页
      pagesize: 30, //    每页的数据
      total: 0,
      currentTotal:0,
      currentTotal:0,
      moduletabledata: [],
      showAddModal: false,
      isAdd:false
    };
  },
  mounted() {},
  methods: {
    cellStyle(row,column,rowIndex,columnIndex){
      return 'padding:6px 0';
    },
    rowClass({row,rowIndex}){
      return 'padding:6px 0';
    },
    onSubmit(pageNum) {
      this.loading = true;
      this.$api.spreaderManagesearch(this.form).then(res =>{
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
    },
    addIndexPage(data){
        this.$confirm('确定将渠道“'+data.accounts+'”添加到首页？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(async() => {
              let param={
                  userId:data.userId,
                  accounts:data.accounts
              }
              this.$api.spreaderManageaddToIndex(param).then(res =>{
                  this.loading = false;
                  if (res.success) {
                    this.$message({
                        type: 'success',
                        message: res.message
                    });
                    this.onSubmit(1);
                  }else{
                    this.$message({
                        type: 'error',
                        message: res.message
                    });
                  }
              }).catch(err =>{
                this.$message({
                  message: '请求失败!',
                  type: "error"
                });
              })
            }).catch(e=>e);
    },
    removeIndexPage(data){
         this.$confirm('确定将渠道“'+data.accounts+'”从首页移除？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(async() => {
              let param= {
                    userId:data.userId
                }
              this.$api.spreaderManageremoveFromIndex(param).then(res =>{
                this.loading = false;
                if (res.success) {
                  this.$message({
                      type: 'success',
                      message: res.message
                  });
                  this.onSubmit(1);
                }else{
                  this.$message({
                      type: 'error',
                      message: res.message
                  });
                }
              }).catch(err =>{
                this.$message({
                  message: '请求失败!',
                  type: "error"
                });
              })
            }).catch(e=>e);
    }
  }
};
</script>

<style scoped>
.filter-item {
  margin-bottom: 10px;
}
.el-tree-node__label {
  margin-left: 5px;
}
</style>
