<template>
<div>
  <el-form  :model="form" :inline="true"  :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户ID:"  prop="userID">
          <el-input v-model.trim="form.userID"  placeholder="填写用户ID，多个用；分隔" autocomplete="off" size="small" clearable></el-input>
        </el-form-item>
        <el-form-item label="手机号:"  prop="mobilePhone" style="width:85%;">
          <el-input v-model.trim="form.mobilePhone" ref="input_description" placeholder="" autocomplete="off" size="small" style="width:45%;" ></el-input>
          <el-button size="mini" type="success" @click="sentCode">发送验证码</el-button>
          <div class="el-form-item__error" v-if="showerror">
            请输入正确的手机号
          </div>
        </el-form-item>
        <el-form-item label="验证码:"  prop="code">
          <el-input v-model.trim="form.code"  :readonly="status ? false : 'readonly'"  placeholder="" autocomplete="off" size="small" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码:"  prop="mobilePasswd">
          <el-input v-model.trim="form.mobilePasswd" type="password"  placeholder="" autocomplete="off" size="small" clearable></el-input>
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button  @click="cancel" size="small">取 消</el-button>
      <el-button  :loading="loading" type="primary" size="small" @click="doSubmit">确 定</el-button>
    </div>
</div>
</template>

<script>
export default {
  name: "",
  props: ['getdata'],
  data() {
    var checkphone = (rule, value, callback) => {
		      if (value == "") {
		        callback(new Error("请输入正确的手机号!"));
		      } else if (!this.isCellPhone(value)) {//引入methods中封装的检查手机格式的方法
		        callback(new Error("请输入正确的手机号!"));
		      } else {
		        callback();
		      }
		    };
    return {
      loading: false,
      showerror:false,
      form: {
        userID:this.getdata,
        mobilePhone:"",
        mobilePasswd:'',
        code:''
      },
      status:false,
      rules: {
        userID: [
            { required: true, message: '请输入userid', trigger: 'blur' }
        ],
        mobilePhone: [
            { required: true, message: '请输入正确的手机号!', trigger: 'blur', showerror:false,validate:checkphone }
        ],
        mobilePasswd:[
            {required: true, message: '请输入密码', trigger: 'blur' }
        ],
        code:[
            {required: true, message: '请填写手机号发送验证码', trigger: 'blur' }
        ]
      },
    };
  },
  mounted(){
  },
  methods: {
    isCellPhone(val) {
	      if (!/^1[3|4|5|7|8|9][0-9]{9}$/.test(val)) {
	        return false;
	      } else {
	        return true;
	      }
	    },
    //取消按钮操作
    cancel() {
      this.resetForm();
      this.$emit('closedialog');
    },
    sentCode(){
      if(this.form.mobilePhone == "" || this.form.mobilePhone == null || !this.isCellPhone(this.form.mobilePhone)){
        this.$refs.input_description.focus();
        this.showerror=true;
      }else{
        this.showerror=false;
        let param={
          mobilePhone:this.form.mobilePhone,
          userID:this.form.userID,
          type:1
        }
        this.$api.accountsBindInfoverifyCode(param).then(res =>{
          if (res.success){
            this.form.code=res.data;
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
    },
    //确认按钮 提交事件
    doSubmit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.loading=true;
          this.$api.bindCheck(this.form).then(res =>{
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
  margin:3% 0;
}
.el-form-item{
  width:80%;
  float: left;
  margin-left:10%;
  margin-bottom:16px;
}
.el-input{
  margin-bottom: 0px;
}
.dialog-footer{
  text-align: right;
  padding-right:3%;
  margin-bottom: 2%;
}
</style>
