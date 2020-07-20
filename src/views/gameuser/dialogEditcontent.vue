<template>
<div>
  <el-form  :model="form" :inline="true"  :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户ID:"  prop="inputvalue1">
          <el-input v-model.trim="form.inputvalue1"  size="small" clearable placeholder="填写用户ID，多个用；分隔" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item :label="label01"  prop="inputvalue2">
          <el-input v-model.trim="form.inputvalue2" placeholder="" size="small" autocomplete="off" clearable></el-input>
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button  size="small" @click="cancel">取 消</el-button>
      <el-button  :loading="loading" type="primary" size="small" @click="doSubmit">确 定</el-button>
    </div>
</div>
</template>

<script>
export default {
  name: "",
  props: ['getdata','typeid'],
  data() {
    return {
      loading: false,
      label01:'',
      posturl:'',
      paramsinfo:'',
      form: {
        inputvalue1:this.getdata,
        inputvalue2:""
      },
      rules: {
        inputvalue1: [
            { required: true, message: '请输入userid', trigger: 'blur' }
        ],
        inputvalue2: [
            { required: true, message: '请输入信息', trigger: 'blur' }
        ],
        inputvalue3:[
            {required: true, message: '请输入信息', trigger: 'blur' }
        ]
      }
    };
  },
  mounted(){
    this.init();
  },
  methods: {
    init(){
        if(this.typeid == 1){ //修改密码
            this.label01="登录密码:";
        }else if(this.typeid == 2){ //修改银行密码
            this.label01="银行密码:";
        }else if(this.typeid == 3){ //修改昵称
            this.label01="昵称:";
        }else{
             this.label01="请输入要写的label:"
        }
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
          let getdata=this.typeid;
          if(getdata == 1){ //修改密码
              this.paramsinfo={
                userids: this.form.inputvalue1,
                logonPass:this.form.inputvalue2
              };
              this.$api.updateAccountsInfo(this.paramsinfo).then(res =>{
                this.loading = false;
                if (res.success) {
                  this.resetForm();
                  this.$message({
                    duration:0,
                    showClose: true,
                    dangerouslyUseHTMLString: true,
                    message: "<p>"+res.message+"</p>",
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
            if(getdata == 2){ //修改银行密码
              this.paramsinfo={
                userids: this.form.inputvalue1,
                insurePass:this.form.inputvalue2
              };
              this.$api.updateAccountsInfo(this.paramsinfo).then(res =>{
                this.loading = false;
                if (res.success) {
                  this.resetForm();
                  this.$message({
                    duration:0,
                    showClose: true,
                    dangerouslyUseHTMLString: true,
                    message: "<p>"+res.message+"</p>",
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
            if(getdata == 3){ //修改昵称
              this.paramsinfo={
                userids: this.form.inputvalue1,
                nickName:this.form.inputvalue2
              };
              this.$api.gavenickName(this.paramsinfo).then(res =>{
                this.loading = false;
                if (res.success) {
                  this.resetForm();
                  this.$message({
                    duration:0,
                    showClose: true,
                    dangerouslyUseHTMLString: true,
                    message: "<p>"+res.message+"</p>",
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
