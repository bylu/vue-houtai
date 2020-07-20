<template>
<div>
   <el-form :model="form" :inline="true" :rules="rules" ref="form" label-width="150px" class="demo-ruleForm">
        <el-form-item label="渠道名称"  prop="name">
          <el-input v-model.trim="form.name" size="small" placeholder="" autocomplete="off" clearable></el-input>
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" size="small" @click="cancel">取消</el-button>
      <el-button :loading="loading" size="small" type="primary" @click="doSubmit">确认</el-button>
    </div>
</div>
</template>

<script>
export default {
  name: "",
  props: [],
  data() {
    return {
        loading: false,
        form: {
            name:""
        },
        rules: {
            name: [
                { required: true, message: '请输入渠道名称', trigger: 'change' }
            ],
        },
    }
  },
  mounted(){ },
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
          let url = this.paramUrl;
          this.$http({
            url:url.channelInfoadd,
            method: "post",
            data: {"name":this.form.name},
            headers: { "Content-Type": "application/json;charset=UTF-8" }
          }).then(res => {
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
          });
        } else {
          return false;
        }
      });
    },
    resetForm() {
      this.$refs["form"].resetFields();
    },
    btnXiaohaopeizhi(){
        this.propbagDialog=true;
    },
    updataData(data){
        this.form.pkMatchvalue14=data;
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
  width:auto;
  float: left;
  margin-bottom:20px;
}
.el-select{
    width:90%;
}
.dialog-footer{
  text-align: right;
  padding-right:3%;
  margin-bottom: 2%;
}
</style>
