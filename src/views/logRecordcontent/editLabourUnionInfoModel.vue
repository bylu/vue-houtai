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
            <el-input v-model.trim="form.labourUnionId"  placeholder="填写名称" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="俱乐部名称" prop="labourUnionName">
            <el-input v-model.trim="form.labourUnionName" placeholder="填写名称" size="small" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="俱乐部公告" prop="labourUnionTips">
            <el-input v-model.trim="form.labourUnionTips" placeholder="填写公告" size="small" autocomplete="off" clearable></el-input>
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel" size="small">取消</el-button>
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
        labourUnionName: "",
        labourUnionTips: ""
      },
      rules: {
        labourUnionName: [
          { required: true, message: "填写俱乐部名称", trigger: "blur" }
        ],
        labourUnionTips: [
          { required: true, message: "填写俱乐部公告", trigger: "blur" }
        ]
      }
    };
  },
  mounted(){
    this.init();
  },
  methods: {
    //新增和编辑今日入页面初始化
    init(){
        this.form.labourUnionId=this.getdata.labourUnionId;
        this.form.labourUnionName=this.getdata.labourUnionName;
        this.form.labourUnionTips=this.getdata.labourUnionTips;
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
          this.$api.labourUnionInfoupdate(this.form).then(res =>{
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
