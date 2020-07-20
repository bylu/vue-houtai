<template>
  <div>
    <el-form :model="form" :inline="true" ref="form" :rules="rules"  label-width="150px" class="demo-ruleForm">
      <el-form-item label="userID" prop="userID" style="display:none;">
        <el-input v-model.trim="form.userID"  placeholder="" autocomplete="off" ></el-input>
      </el-form-item>
      <el-form-item label="输入新密码：" prop="password">
        <el-input v-model.trim="form.password" size="small" autocomplete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="确认密码：" prop="repassword">
        <el-input v-model.trim="form.repassword" size="small" autocomplete="off" clearable></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button  @click="cancel" size="small">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit" size="small">确认</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: ["getdata"],
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
          callback(new Error('请再次输入密码'));
      } else if (value !== this.form.password) {
          callback(new Error('两次输入密码不一致!'));
      } else {
          callback();
      }
    };
    return {
      loading: false,
      form: {
        userID:'',
        password:'',
        repassword:''
      },
      rules: {
        password: [
            { required: true, message: '请输入新密码', trigger: 'blur' }
        ],
        repassword: [
            { required: true, message: '请确认密码', trigger: 'blur' },
            { validator: validatePass, trigger: 'blur' }
        ],
      }
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init(){
        this.form.userID=this.getdata.userID;
    },
     //取消按钮操作
    cancel() {
      this.resetForm();
      this.$emit('closedialog');
    },
    //确认按钮 提交事件
    doSubmit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
            //userID,mobilePasswd
            let param={
              userID:this.form.userID,
              mobilePasswd:this.form.password
            }
            this.$api.accountsBindInfoupdateMobilePasswd(param).then(res =>{
              this.loading = false;
              if (res.success) {
                this.resetForm();
                this.$message({
                  message: res.message,
                  type: "success"
                });
                this.$emit('shuaxin');
                this.$emit('closedialog');
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
          }
      });
    },
    resetForm() {
      this.$refs["form"].resetFields();
    }
    
  }
};
</script>

<style scoped>
.el-form {
  width: 100%;
  float: left;
  margin: 5% 0;
}
.el-form-item {
  width: 80%;
  float: left;
  margin-left: 8%;
}
.dialog-footer {
  text-align: right;
  padding-right: 3%;
  margin-bottom: 2%;
}
</style>
