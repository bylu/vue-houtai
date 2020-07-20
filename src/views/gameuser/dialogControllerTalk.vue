<template>
  <div>
    <el-form :model="form" :inline="true" :rules="rules"  ref="form"  label-width="90px" class="demo-ruleForm" >
      <el-form-item  label="用户ID:" prop="inputvalue1">
        <el-input v-model.trim="form.inputvalue1" clearable size="small" placeholder="填写用户ID，多个用；分隔" autocomplete="off" ></el-input>
      </el-form-item>

      <el-form-item label="操作类型"  prop="typeid">
          <el-radio-group v-model="form.typeid" size="small">
            <el-radio label="1">禁言</el-radio>
            <el-radio label="0">解除禁言</el-radio>
          </el-radio-group>
      </el-form-item>

      <el-form-item label="禁言至"  prop="date1">
        <el-date-picker  v-model="form.date1"  align="right" size="small"  type="datetime" clearable  value-format="yyyy-MM-dd HH:mm:ss"  format="yyyy-MM-dd HH:mm:ss"  placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
    </el-form>
    <div  slot="footer"  class="dialog-footer" >
      <el-button @click="cancel" size="small">取 消</el-button>
      <el-button  :loading="loading" type="primary"  @click="doSubmit" size="small">确 定</el-button>
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
        inputvalue1: this.getdata,
        typeid:"1",
        date1: ""
      },
      rules: {
        inputvalue1: [
          { required: true, message: "请输入userid", trigger: "blur" }
        ],
        date1: [
          {
            type: "string",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ]
      }
    };
  },
  mounted() {},
  methods: {
    //取消按钮操作
    cancel() {
      this.resetForm();
      this.$emit("closedialog");
    },
    //确认按钮 提交事件
    doSubmit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          let url = this.paramUrl;
          let paramData={
            userID:this.form.inputvalue1,
            type:this.form.typeid,
            time:this.form.date1
          }
          this.$api.chatControl(paramData).then(res =>{
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
.el-form {
  width: 100%;
  float: left;
  margin: 3% 0;
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
.dialog-footer {
  text-align: right;
  padding-right: 3%;
  margin-bottom: 2%;
}
</style>
