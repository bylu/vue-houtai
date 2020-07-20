<template>
<div>
   <el-form :model="form" :inline="true" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
        <el-form-item label="id" prop="id" style="display:none">
          <el-input v-model.trim="form.id" size="small" placeholder="请输入公告标题" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="公告标题" prop="theme" >
          <el-input v-model.trim="form.theme" size="small" placeholder="请输入公告标题" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="公告内容"  prop="content">
          <el-input v-model="form.content" type="textarea" style="width:250%;float:left;" :autosize="{ minRows: 15, maxRows: 15}" size="small" placeholder="填写商品名称" autocomplete="off"></el-input>
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="cancel">取消</el-button>
      <el-button :loading="loading" size="small" type="primary" @click="doSubmit">确认</el-button>
    </div>
</div>
</template>

<script>
export default {
  name: "",
  props: ['getdata','isAdd'],
  data() {
    return {
        loading: false,
        form: {
            id:"",
            theme: "",
            content:""
        },
        rules: {
            theme: [
                { required: true, message: '填写公告标题', trigger: 'blur' }
            ],
            content: [
                { required: true, message:'填写公告内容', trigger:'blur'}
            ]
        }
    }
  },
  mounted(){
    this.init();
  },
  methods: {
    //新增和编辑今日入页面初始化
    init(){
      if(this.isAdd){

      }else{
        this.form.id=this.getdata.id;
        this.form.theme=this.getdata.theme;
        this.form.content=this.getdata.content;
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
          this.$api.systemAnnouncementadd(this.form).then(res =>{
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
  margin:1% 0;
}
.el-form-item{
  width:100%;
  float: left;
  margin-left:0%;
  margin-bottom:20px;
}
.el-input{
  margin-bottom:0px;
}
.dialog-footer{
text-align: right;
padding-right:3%;
margin-bottom: 2%;
}
</style>
