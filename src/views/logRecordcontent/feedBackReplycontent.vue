<template>
  <div>
    <el-form :model="form" :inline="true" ref="form" :rules="rules"  label-width="100px" class="demo-ruleForm">
      <el-form-item label="回复内容：" prop="note" show-overflow-tooltip>
        <el-input v-model="form.note" size="small"  type="textarea" style="width:350px" :autosize="{ minRows: 4, maxRows: 6}" autocomplete="off" ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel" size="small">取消</el-button>
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
        uid:'',
        suggestion:'',
        fbid:'',
        note:''
      },
      rules: {
        note: [
            { required: true, message: '请输入回复内容', trigger: 'blur' }
        ]
      }
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init(){
        this.form.uid=this.getdata.uid;
        this.form.suggestion=this.getdata.suggestion;
        this.form.fbid=this.getdata.fbid;
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
          //uid,suggestion,reply,fbid
            let param={
              uid:this.form.uid,
              suggestion:this.form.suggestion,
              reply:this.form.note,
              fbid:this.form.fbid
            }
            this.$api.feedBackreply(param).then(res =>{
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
  margin: 5% 0;
}
.el-form-item {
  width: 98%;
  float: left;
  margin-left: 2%;
}
.dialog-footer {
  text-align: right;
  padding-right: 3%;
  margin-bottom: 2%;
}
</style>
