<template>
<div>
    <el-form :model="form" :inline="true" ref="form" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户ID:" prop="userID" style="display:none">
          <el-input v-model.trim="form.userID" autocomplete="off" size="small" ></el-input>
        </el-form-item>
        <el-form-item label="手机号码:" prop="mobilePhone" style="display:none">
          <el-input v-model.trim="form.mobilePhone" autocomplete="off" size="small" ></el-input>
        </el-form-item>
        <el-form-item label="验证码:" prop="code">
          <el-input v-model.trim="form.code" :readonly="status ? false : 'readonly'" placeholder="" autocomplete="off" size="small"></el-input>
          <el-button size="mini" type="success" @click="sentCode">重新发送</el-button>
        </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel" size="small">取 消</el-button>
      <el-button :loading="loading" type="primary" size="small" @click="doSubmit">确 定</el-button>
    </div>
</div>
</template>

<script>
export default {
  name: "",
  props: ['getdata'],
  data() {
    return {
      status:false,
      loading: false,
      showerror:false,
      form: {
        userID:this.getdata.userID,
        mobilePhone:this.getdata.mobilePhone,
        code:'',
        type: 2,
      }
    };
  },
  mounted(){
    this.init();
  },
  methods: {
    //取消按钮操作
    cancel() {
      this.$emit('closedialog');
    },
    init(){
      this.sentCode();
    },
    sentCode(){
        this.$api.accountsBindInfoverifyCode(this.form).then(res =>{
          this.loading = false;
          if (res.success) {
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

    },
    //确认按钮 提交事件
    doSubmit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.loading=true;
          this.$api.accountsBindInfounbindMobile(this.form).then(res =>{
            this.loading = false;
            if (res.success) {
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
   width:80%;
  float: left;
  margin-left:10%;
}
.dialog-footer{
  text-align: right;
  padding-right:3%;
  margin-bottom: 2%;
}
</style>
