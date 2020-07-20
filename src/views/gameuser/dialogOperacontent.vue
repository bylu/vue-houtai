<template>
<div>
  <el-form  :model="form" :inline="true"  :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户ID:"  prop="inputvalue1" >
          <el-input v-model.trim="form.inputvalue1" size="small" clearable  placeholder="填写用户ID，多个用；分隔" autocomplete="off"></el-input>
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
  props: ['getdata','typeid'],
  data() {
    return {
      loading: false,
      posturl:'',
      form: {
        inputvalue1:this.getdata,
      },
      rules: {
        inputvalue1: [
            { required: true, message: '请输入userid', trigger: 'blur' }
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
         if(this.typeid == 1){ //踢人
            let paramData={ 
              userid: this.form.inputvalue1
            };
            this.$api.kickOff(paramData).then(res =>{
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
         if(this.typeid == 2){ //刷新缓存
            let paramData={ 
              userids: this.form.inputvalue1
            };
            this.$api.recached(paramData).then(res =>{
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
         if(this.typeid == 3){ //用户信息
            let paramData={ 
              userid: this.form.inputvalue1
            };
            this.$api.getUserMessage(paramData).then(res =>{
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
