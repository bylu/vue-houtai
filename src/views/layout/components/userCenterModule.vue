<template>
<div>
   <el-form ref="form" :model="form" :inline="true" :rules="rules"  label-width="100px" class="demo-ruleForm">
     <el-form-item label="旧密码" prop="oldpassword">
       <el-input v-model.trim="form.oldpassword"  placeholder="" type="password"  autocomplete="off" size="small"></el-input>
     </el-form-item>
      <el-form-item label="新密码" prop="password">
        <el-input v-model.trim="form.password"  placeholder="" type="password"  autocomplete="off" size="small"></el-input>
      </el-form-item>
     <el-form-item label="确认新密码" prop="reppassword">
       <el-input v-model.trim="form.reppassword"  placeholder="" type="password"  autocomplete="off" size="small"></el-input>
     </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel" size="small">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit" size="small">确认</el-button>
    </div>
</div>
</template>

<script>
export default {
  name: "",
  props: [],
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
        oldpassword:"",
        password: "",
        reppassword:""
      },
      rules: {
        oldpassword:[
          { required: true, message: '请输入旧密码', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        reppassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    };
  },
  mounted(){
  },
  methods: {
    //取消按钮操作
    cancel() {
      this.resetForm();
      this.$emit('closedialog');
    },
    //确认按钮 提交事件
    doSubmit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          let param = {
            oldpassword:this.$md5(this.form.oldpassword),
            password: this.$md5(this.form.reppassword)
          }
          this.$api.usersupdatePsw(param).then(res =>{
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
        } else {
          return false;
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
.el-form{
  width:100%;
  float: left;
  margin:5% 0;
}
.el-form-item{
  width:90%;
  float: left;
  margin-left:10%;
}
.dialog-footer{
text-align: right;
padding-right:3%;
margin-bottom: 2%;
}
</style>
