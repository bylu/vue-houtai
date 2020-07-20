<template>
<div>
   <el-form :model="form" :inline="true" :rules="rules" ref="form" label-width="150px" class="demo-ruleForm">
         <el-form-item label="用户ID"  prop="adduserid">
          <el-input v-model.trim="form.adduserid" size="small" placeholder="填写用户ID" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="黑名单类型" prop="addStatue" >
          <el-select v-model="form.addStatue" placeholder="全部" size="small">
             <el-option v-for="list in selectList.examinstatuslistAdd" :key="list.key" :label="list.value" :value="list.key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="黑名单原因"  prop="reason">
          <el-input v-model.trim="form.reason" size="small"  placeholder="输入添加黑名单的原因" autocomplete="off" clearable></el-input>
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel" size="small">取消</el-button>
      <el-button :loading="loading" type="primary" size="small" @click="doSubmit">确认</el-button>
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
            adduserid:'',
            addStatue: '',
            reason:''
        },
        rules: {
            adduserid: [
                { required: true, message: '填写用户ID', trigger: 'blur' }
            ],
            addStatue:[
                { required: true, message: '请选择黑名单类型', trigger: 'change' }
            ]
        }
    }
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
          let url = this.paramUrl;
          let param={
            userId: this.form.adduserid,
            type: this.form.addStatue,
            reason:this.form.reason
          }
          this.$api.blackListadd(param).then(res =>{
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
                duration:0,
                showClose: true,
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
  margin-left:2%;
}
.dialog-footer{
text-align: right;
padding-right:3%;
margin-bottom: 2%;
}
</style>
