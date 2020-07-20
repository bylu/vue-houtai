<template>
  <div class="login">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules"  label-position="left"  label-width="0px" class="login-form">
      <div class="showLogo">
        <img :src="logoImg" />
      </div>
      <!-- <h3 class="title">渠道后台管理系统</h3> -->
      <el-form-item prop="username">
        <el-input v-model.trim="loginForm.username" type="text" size="small"  placeholder="账号" clearable></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model.trim="loginForm.password" type="password" size="small"  placeholder="密码" clearable></el-input><!--@keyup.enter.native="handleLogin('loginForm')"-->
      </el-form-item>
      <el-form-item prop="code">
        <el-input v-model.trim="loginForm.code" style="width:52%" type="code" size="small"  placeholder="验证码" clearable></el-input>
        <el-button size="small" type="danger" plain="" :disabled="disabled"   @click="sendcode">{{btntxt}}</el-button>
      </el-form-item>
      <!-- <el-checkbox v-model.trim="loginForm.rememberMe" style="margin:0px 0px 25px 0px;">记住我</el-checkbox> -->
      <el-form-item style="width:100%;">
        <el-button :loading="loading" size="small" type="warning" style="width:100%;" @click.native.prevent="handleLogin">
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
export default {
  name: "Login",
  data() {
    return {
      logoImg: require('../../assets/img/logo-m1.png'),
      loginForm: {
        username: "root",
        password: "ws789htgly",
        code:"验证码",
        rememberMe: true
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: "用户名不能为空" }
        ],
        password: [
          { required: true, trigger: "blur", message: "密码不能为空" }
        ],
        code:[
          {required:true,trigger:"blur",message:"验证码不能为空"}
        ]
      },
      loading: false,
      btntxt:"获取验证码",
      disabled:false,
      time:0,
    };
  },
  created() {
    var _self=this;
    document.onkeydown=function(e){
      var key=window.event.keyCode;
      if(key == 13 || key== 108){
        _self.handleLogin();
      }
    }
  },
  methods: {
    sendcode:function(){
      if(this.loginForm.username == '' || this.loginForm.password == ''){
          this.$message({
            message: "请输入登录的用户名和密码",
            type: "error"
          });
          return ;
      }

      let usercode={
          username:this.loginForm.username,
          password:this.$md5(this.loginForm.password)
      }
      this.$api.getlogincode(usercode).then(res =>{
        if (res.success) {
          this.time=60;
          this.disabled=true;
          this.timer();
          this.$message({
            message: res.message,
            type: "success"
          });
        }else{
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
    timer:function () {
      if (this.time > 0) {
          this.time--;
          this.btntxt="重新发送("+this.time+")";
          setTimeout(this.timer, 1000);
      } else{
          this.time=0;
          this.btntxt="获取验证码";
          this.disabled=false;
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        const user = {
          username: this.loginForm.username,
          password: this.$md5(this.loginForm.password),
          mobileCode:this.loginForm.code,
          rememberMe: this.loginForm.rememberMe
        };
        if (valid) {
          if (user.rememberMe) {
            this.loading = true;
            this.$api.Login(user).then(res =>{
              this.loading = false;
              if (res.success) {
                for(let a in res.data){
                  localStorage.setItem(a, res.data[a]);
                }
                sessionStorage.setItem("token",res.params)
                this.getUserinfo(res.params);//获得用户页面权限信息
                this.$store.commit('setToken', res.params);
              } else {
                this.loading = false;
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
        } else {
          this.$message({
            message: "登录信息不能为空",
            type: "error"
          });
          return false;
        }
      });
    },
    getUserinfo(gettoken) {
      this.$api.userinfo().then(res =>{
        if (res.success) {
          this.loading = false;
          for (var key in res.data) {
            if(key=='users'){
              localStorage.setItem("HTusername",res.data[key])
            }else if(key=='userMenu'){
              localStorage.setItem('userMenu',res.data[key])
            }
          }
           let linkPath=JSON.parse(localStorage.getItem("userMenu"))[0].children[0].link;
           this.$router.push({ path:  linkPath });
        }else{
            this.$message({
            message: res.message,
            type: "error"
          });
          this.$store.commit('clearToken');
          this.$router.push({ path: this.redirect || "/login" });
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
<style rel="stylesheet/scss" lang="scss">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url("../../assets/img/loginBg.jpg");
  background-size: cover;
}
.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
}
.showLogo {
//margin: 0px auto 30px auto;
  text-align: center;
}

.login-form {
  border-radius: 6px;
  background-color: transparent;
  width: 300px;
  padding: 25px 25px 5px 25px;
  .el-input {
    height: 38px;
    input {
      height: 38px;
    }
  }
  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.login-code {
  width: 33%;
  display: inline-block;
   height: 38px;
  // float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
</style>

