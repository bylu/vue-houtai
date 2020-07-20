<template>
  <div>
    <el-form :model="form" :inline="true" ref="form" :rules="rules"  label-width="120px" class="demo-ruleForm">
      <el-form-item label="用户名称" >
        <el-input v-model.trim="form.userId" size="small" autocomplete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码" >
          <el-input v-model.trim="form.userId" size="small" autocomplete="off" clearable></el-input>
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
  props: ["getdata",'isAdd'],
  data() {
    return {
      loading: false,
      form: {
        userId:"",
      },
      rules: {
        userId: [
            { required: true, message: '填写用户名称', trigger: 'blur' }
        ],
        // userId: [
        //     { required: true, message: '填写密码', trigger: 'blur' }
        // ],
      }
    };
  },
  mounted() {
      this.init();
  },
  methods: {
    init(){
        if(this.isAdd){

        }else{
          this.form.userId=this.getdata.userId;
        }
    },
    //取消按钮操作
    cancel() {
      this.$refs["form"].resetFields(); //清空表单
      this.$emit("closedialog");
    },
    //确认按钮 提交事件
    doSubmit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
            this.$http({
              url: this.paramUrl.spreaderManagesaveOrUpdate,
              method: "post",
              data: this.form
            }).then(res => {
              this.loading = false;
              if (res.success) {
                this.$emit("closedialog");
                this.$emit("shuaxin");
              } else {
                this.$message({
                  message: res.message,
                  type: "error"
                });
              }
            });
        }
      })
    }
  }
};
</script>

<style scoped>
.el-form {
  width: 100%;
  float: left;
  margin: 5% 0;
}
.el-form-item {
  width: 80%;
  float: left;
  margin-left: 10%;
}
.dialog-footer {
  text-align: right;
  padding-right: 3%;
  margin-bottom: 2%;
}
</style>
