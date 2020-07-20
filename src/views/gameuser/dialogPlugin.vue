<template>
<div>
  <el-form  :model="form" :inline="true"  :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户ID"  prop="userids">
          <el-input v-model.trim="form.userids" size="small"  placeholder="多个ID 用;分开" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="操作类型"  prop="operatype">
          <el-radio-group v-model="form.operatype" size="small">
            <el-radio label="0">添加外挂</el-radio>
            <el-radio label="1">解除外挂</el-radio>
          </el-radio-group>
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
    return {
      loading: false,
      form: {
        userids:this.getdata,
        operatype:"1"
      },
      rules: {
        userids: [
            { required: true, message: '请输入userid', trigger: 'blur' }
        ],
        operatype: [
            { required: true, message: '请选择操作', trigger: 'change' }
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
          this.$api.externalhanging(this.form).then(res =>{
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
