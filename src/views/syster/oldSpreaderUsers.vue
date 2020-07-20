<template>
  <div class="app-container">
    <h3 class="showTit">外放渠道用户</h3>
    <div class="head-container">
      <el-row :gutter="32">
        <el-form :model="form" :inline="true" ref="form" label-width="80px" class="demo-ruleForm">
          <el-col :xs="12" :sm="6" :lg="3">
            <el-input v-model.trim="form.userId" size="small" placeholder="用户名" value='' clearable></el-input>
          </el-col>
          <el-col :xs="8" :sm="3" :lg="2">
            <el-button type="primary" size="small" @click="onSubmit(1)">查询</el-button>
          </el-col>
          <el-col :xs="8" :sm="4" :lg="2">
            <el-button size="small" filter-item  type="danger" @click="formdata='',showAddModal=true,isAdd=true">添加</el-button>
          </el-col>
        </el-form>
      </el-row>
    </div>
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" style="margin-bottom: 10px">
        <el-card class="box-card" shadow="never">
          <el-table v-loading="loading" :data="moduletabledata" highlight-current-row size="small" style="width: 100%;" border>
            <el-table-column prop="userId" label="用户名"/>
            <el-table-column prop="accounts" label="角色" />
            <el-table-column prop="company" label="上次登录时间" show-overflow-tooltip></el-table-column>
            <el-table-column prop="nickName" label="上次登录IP" ></el-table-column>
            <el-table-column prop="platform" label="最后登录时间" show-overflow-tooltip >
                <template slot-scope="scope">{{ scope.row.platform | platFormCheck }}</template>
            </el-table-column>
            <el-table-column prop="commission" label="最后登录IP" show-overflow-tooltip />
            <el-table-column prop="rewardRate" label="验证码"  show-overflow-tooltip/>
            <el-table-column prop="area" label="渠道用户">
               <template slot-scope="scope">{{scope.row.area | areaCheck }}</template> 
            </el-table-column>
        
            <el-table-column label="操作" width="350px" align="center" fixed="right">
              <template slot-scope="scope"> 
                <el-button type="primary"   @click="formdata=scope.row,showAddModal=true,isAdd=false" size="mini">修改</el-button>
                <el-popover :ref="scope.row.roleID" placement="top" width="180">
                  <p>确定删除本条数据吗？</p>
                  <div style="text-align: right; margin: 0">
                    <el-button size="mini" type="text" @click="$refs[scope.row.roleID].doClose()">取消</el-button>
                    <el-button type="primary" size="mini" @click="subDelete(scope.row.roleID)">确定</el-button>
                  </div>
                  <el-button slot="reference" type="danger"  size="mini">删除</el-button>
                </el-popover>
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
          <!-- 分页end -->
        </el-card>
      </el-col>
    </el-row>
    <!--新增和修改-->
    <pcModal v-if="showAddModal" :xs="8" :sm="8" :lg="2" :title="isAdd ? '添加' : '修改'"  @closeModal="showAddModal = false">
      <oldSpreadDialogModule  :getdata="formdata" :isAdd="isAdd"  @shuaxin="onSubmit(1)" @closedialog="showAddModal = false"></oldSpreadDialogModule>
    </pcModal>
  </div>
</template>
<script>
export default {
  name: "",
  components: {
    oldSpreadDialogModule: () => import("./oldSpreadModule")
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
      moduletabledata: [],
      showAddModal: false,
      isAdd:false,
      showOpenqudaoDialog:false
    };
  },
  mounted() {
  },
  methods: {
    onSubmit(pageNum) {
      this.$http({
        url: this.paramUrl.spreaderManagesearch,
        method: "post",
        data: this.form
      }).then(res => {
        this.moduletabledata = [];
        if (res.success) {
          this.moduletabledata = res.data.records;
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
      });
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      onSubmit(currentPage);
    },
    subDelete: function(id) {
      let url = this.paramUrl;
      this.$http({
        url:url.delrole,
        method: "post",
        data: { roleID: id }
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
    },
  }
};
</script>

<style scoped>
.filter-item {
  margin-bottom: 10px;
}
</style>
