<template>
  <div class="app-container">
    <h3 class="showTit">用户管理</h3>
    <el-row :gutter="32">
        <el-form :model="form" :inline="true" ref="form" label-width="80px" class="demo-ruleForm">
          <el-col :xs="24" :sm="6" :lg="3">
            <el-input v-model.trim="form.username" size="small" placeholder="用户名称" value='' clearable></el-input>
          </el-col>
          <el-col :xs="24" :sm="6" :lg="3">
            <el-select v-model="form.role" placeholder="权限类型" size="small">
              <el-option v-for="(list,index) in roles" :key="index" :label="list.roleName" :value="list.roleID"></el-option>
            </el-select>
          </el-col>

          <el-col :xs="24" :sm="6" :lg="4">
            <el-select v-model="form.isSpreader" placeholder="请选择" size="small">
              <el-option v-for="(list,index) in selectList.isSpreaderList" :key="index" :label="list.value" :value="list.key"></el-option>
            </el-select>
          </el-col>

          <el-col :xs="8" :sm="3" :lg="2">
            <el-button type="primary" size="small" @click="onSubmit(1)" v-has="'user_search'">查询</el-button>
          </el-col>
          <!-- <el-col :xs="8" :sm="4" :lg="3" style="display:none">
            <el-button size="small" filter-item type="success" @click="formdata(1)">注册渠道用户</el-button>
          </el-col> -->
          <el-col :xs="8" :sm="4" :lg="3">
            <el-button size="small"   type="danger" v-has="'users_add'" @click="formdata='',showAddModal=true,isAdd=true">添加后台用户</el-button>
          </el-col>
        </el-form>
      </el-row>
    <el-row>
      <el-col :span="24">
          <el-table v-loading="loading" :data="moduletabledata" :cell-style="cellStyle" :header-cell-style="rowClass" highlight-current-row  style="width: 100%;" border>
            <el-table-column prop="userID" label="用户id" v-if="show" />
            <el-table-column prop="username" label="用户名" />
            <el-table-column prop="roleName" label="角色" width="130px" >
                <template slot-scope="scope">{{ scope.row.roleName }}</template>
            </el-table-column>
            <el-table-column prop="roleid" label="" v-if="show" >
              
            </el-table-column>
            <el-table-column prop="lastLogintime" label="最后登录时间" show-overflow-tooltip>
              <template slot-scope="scope">{{scope.row.lastLogintime }}</template>
            </el-table-column>
            <el-table-column prop="lastLoginIP" label="最后登录ip" show-overflow-tooltip />
            <el-table-column prop="secret" label="验证码" show-overflow-tooltip />
            <el-table-column prop="mobile" label="绑定手机"  show-overflow-tooltip/>
            <el-table-column prop="isSpreader" label="用户类型">
              <template slot-scope="scope">{{scope.row.isSpreader | isSpreaderCheck }}</template>
            </el-table-column>
            <el-table-column label="操作" width="200px" align="center">
              <template slot-scope="scope"> 
                <el-button type="primary"   v-has="'user_update'" style="margin-bottom:0px;"  @click="formdata=scope.row,showAddModal=true,isAdd=false" size="mini">修改</el-button><!-- v-if="hasPerm('user_update')" -->
                <!-- <el-button  type="success"   size="mini" @click="showChannel(scope.row)">关联渠道</el-button> -->
               <el-popover :ref="scope.row.userID" placement="top" width="180">
                  <p>确定删除本条数据吗？</p>
                  <div style="text-align: right; margin: 0">
                    <el-button size="mini" type="text" @click="$refs[scope.row.userID].doClose()">取消</el-button>
                    <el-button type="primary" size="mini" @click="removeUser(scope.row.userID)">确定</el-button>
                  </div>
                  <el-button slot="reference" type="danger" v-has="'users_delete'" style="margin-bottom:0px;" size="mini">删除</el-button>
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
      </el-col>
    </el-row>
    <!--新增和修改-->
    <pcModal v-if="showAddModal" :xs="8" :sm="8" :lg="2" :title="isAdd ? '添加后台用户' : '修改用户信息'"  @closeModal="showAddModal = false">
      <adduserModule  :getdata="formdata" :isAdd="isAdd"  @shuaxin="onSubmit(1)" @closedialog="showAddModal = false"/>
    </pcModal>

    <!--注册渠道/关联渠道-->
    <!-- <pcModal  v-if="showChannelModal"  width="40%"  title="注册渠道"  @closeModal="showChannelModal = false">
      <registerchannel @closedialog="showChannelModal = false"></registerchannel>
    </pcModal> -->

    <!--关联渠道弹框--> 
    <pcModal v-if="showChannelModal" :xs="8" :sm="8" :lg="2" title="关联渠道" @closeModal="showChannelModal = false">
      <connectchannel :channelid="connectChannelId" @closedialog="showChannelModal = false"></connectchannel>
    </pcModal>
  </div>


</template>
<script>
import { Alert, Select } from "element-ui";
export default {
  name: "",
  components: {
    adduserModule: () => import("./adduserModule"),
    // registerchannel: () => import("./registerchannel.vue"),
    connectchannel: () => import("./connectchannel.vue")
  },
  data() {
    return {
      form: {
        username: "",
        role: "",
        isSpreader:''
      },
      roles: [],
      loading: false,
      currentPage: 1, //初始页
      pagesize: 30, //    每页的数据
      total: 0,
      currentTotal:0,
      moduletabledata: [],
      show: false,
      showAddModal: false,
      showChannelModal: false,
      connectChannelId: "",
      isAdd:false
    };
  },
  created() {
    this.searchRoleName();
    this.onSubmit(1);
  },
  methods: {
    cellStyle(row,column,rowIndex,columnIndex){
      return 'padding:6px 0';
    },
    rowClass({row,rowIndex}){
      return 'padding:6px 0';
    },
    searchRoleName() {
      //加载角色名称
      this.$api.searchRoleName().then(res =>{
        this.loading = false;
        this.roles=[];
        if (res.success) {
          this.roles = res.data;
          this.$store.commit('setObject', JSON.stringify(res.data));//保存值
        }
      }).catch(err =>{
        this.$message({
          message: '请求失败!',
          type: "error"
        });
      })
    },
    onSubmit(pageNum) {
      let params = {
        page: pageNum,
        size: this.pagesize,
        roleid:this.form.role,
        username: this.form.username,
        isSpreader:this.form.isSpreader
      };
      this.loading = true;
      this.$api.searchUser(params).then(res =>{
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
    showChannel(obj){
      //判断当前是否渠道用户
      if(obj.isSpreader > 0){
        this.showChannelModal=true;
        this.connectChannelId=obj.userID;
      }else{
        this.$message({
            message: '该用户不是渠道用户!',
            type: "error"
          });
        }
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      this.onSubmit(currentPage);
    },
    mounted() {
      this.searchRoleName();
    },
    removeUser(obj){
      let param={userID:obj}
      this.$api.deleteUser(param).then(res =>{
         if (res.success) {
          this.onSubmit(1);
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
