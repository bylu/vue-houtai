<template>
  <div>
    <el-form :model="form" :inline="true" ref="form"   label-width="80px" class="demo-ruleForm">
        <el-form-item label="导入内容" prop="addSvey">
          <el-input v-model="form.addSvey" size="small"  style="width:280%" type="textarea" :autosize="{ minRows: 15, maxRows: 15}" autocomplete="off" ></el-input>
        </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button  @click="cancel" size="small">取消</el-button>
      <el-button  type="primary" @click="doSubmit" size="small">确认</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data(){
    return {
      form: {
        addSvey:''
      },
    }
  },
  mounted() {

  },
  methods: {
    //取消按钮操作
    cancel() {
      this.resetForm();
      this.$emit('closedialog');
    },
    //确认按钮 提交事件
    doSubmit() {
      let param = {
        content:this.form.addSvey
      };
      this.$api.surveyAdd(param).then(res =>{
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
