<template>
  <el-menu class="navbar" mode="horizontal">
    <nx-hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></nx-hamburger>

    <nx-breadcrumb class="breadcrumb-container"></nx-breadcrumb>

    <div class="right-menu">
      <el-dropdown class="avatar-container right-menu-item" trigger="click">
        <div class="avatar-wrapper">
          <span class="showusername"> {{username}}</span>
          <img class="user-avatar" :src="avatar">
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item><div @click="usercenterDialog = true">修改密码</div></el-dropdown-item>
          <el-dropdown-item  divided><div @click="logout()">注销登录</div></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <pcModal v-if="usercenterDialog" :xs="8" :sm="8" :lg="2" title="修改密码" @closeModal="usercenterDialog = false">
     <userCenterdialogModule @shuaxin="onSubmit(1)"  @closedialog="usercenterDialog= false"></userCenterdialogModule>
   </pcModal>
  </el-menu>
  
</template>

<script>
import { mapGetters } from 'vuex'

import nxBreadcrumb from '@/components/nx-breadcrumb'
import nxHamburger from '@/components/nx-hamburger'
export default {
  name: 'navBar',
  components: {
    nxBreadcrumb,
    nxHamburger,
    userCenterdialogModule:() => import("./userCenterModule"),
  },
  data(){
    return{
      avatar:require('../../../assets/img/face.png'),
      usercenterDialog: false,
      username:""
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'name', ])
  },
  mounted(){
    let user = localStorage.getItem("HTusername");
    if (null != user && "" != user) {
      this.username = JSON.parse(user).username;
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      //退出系统
      this.$api.logout().then(res =>{
        if (res.success) {
            this.$store.commit("clearToken"); //清空用户token信息
            this.$router.push({ path: this.redirect || "/login" }); //登陆页面
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
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .breadcrumb-container {
    float: left;
  }
  .nx-help {
    display: inline-block;
    vertical-align: top;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    float: right;
    height: 100%;
    &:focus {
      outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      height: 20px;
    }
    .international {
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      height: 50px;
      margin-right: 30px;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
    .showusername{
      height: 40px;
      line-height: 40px;
      float: left;
      vertical-align: middle;
      margin-right: 10px;
    }
  }
}
</style>
