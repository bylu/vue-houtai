<template>
  <div>
    <el-form :model="form" :inline="true" ref="form" :rules="rules"  label-width="60px" class="demo-ruleForm">
         <el-form-item label="questionId:" prop="questionId" style="display:none">
            <el-input v-model.trim="form.questionId" size="small" autocomplete="off" ></el-input>
        </el-form-item>
       
        <el-form-item label="问题" prop="answerContent">
          <el-input v-model="form.answerContent" style="width:280%" size="small"  type="textarea" :autosize="{ minRows: 4, maxRows: 4}" autocomplete="off" ></el-input>
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
  props: ["getdata"],
  data() {
    return {
      loading: false,
      form: {
        questionId:"",
        answerContent:""//questionId，answerContent
      },
      rules: {
        answerContent: [
            { required: true, message: '填写答案选项内容', trigger: 'blur' }
        ]
      }
    };
  },
  mounted() {
      this.init();
  },
  methods: {
    init(){
        this.form.questionId=this.getdata.questionId;
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
          this.$api.surveyaddChildAwswer(this.form).then(res =>{
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
.el-form {
  width: 100%;
  float: left;
  margin: 2% 0;
}
.el-form-item {
   width:98%;
  float: left;
  margin-left: 2%;
}
.dialog-footer {
  text-align: right;
  padding-right: 3%;
  margin-bottom: 2%;
}
</style>
