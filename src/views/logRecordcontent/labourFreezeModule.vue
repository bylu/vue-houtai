<template>
<div>
   <el-form
      :model="form"
      :inline="true"
      :rules="rules"
      ref="form"
      label-width="100px"
      class="demo-ruleForm"
    >
        <el-form-item label="俱乐部id" prop="labourUnionId" style="display:none;">
            <el-input v-model.trim="form.labourUnionId"  placeholder="" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="冻结天数" prop="freezeDay">
            <el-input v-model.trim="form.freezeDay" placeholder="" clearable size="small" autocomplete="off"></el-input>
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
  props: ['getdata'],
  data() {
    return {
      loading: false,
      form: {
        labourUnionId: "",
      },
      rules: {
        freezeDay: [
          { required: true, message: "填写冻结天数", trigger: "blur" }
        ]
      }
    };
  },
  mounted(){
    this.init();
  },
  methods: {
    init(){
        this.form.labourUnionId=this.getdata.labourUnionId;
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
          this.$api.labourUnionInfofreeze(this.form).then(res =>{
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
  margin:5% 0;
}
.el-form-item{
  width:80%;
  float: left;
  margin-left:15%;
}
.dialog-footer{
text-align: right;
padding-right:3%;
margin-bottom: 2%;
}
</style>
