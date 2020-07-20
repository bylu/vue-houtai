<template>
<div>
  <el-form  :model="form" :inline="true"  :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
        <el-form-item label="道具ID"  prop="propID">
          <el-input v-model.trim="form.propID" size="small"  placeholder="" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="数量"  prop="propCount">
          <el-input v-model.trim="form.propCount" size="small"  placeholder="" autocomplete="off" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button  @click="cancel" size="small">取 消</el-button>
        <el-button  :loading="loading" type="primary" size="small" @click="doSubmit">确 定</el-button>
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
        propID:'',
        propCount:''
      },
      rules: {
        propID: [
            { required: true, message: '请输入道具ID', trigger: 'blur' }
        ],
        propCount: [
            { required: true, message: '请输入道具数量', trigger: 'blur' }
        ]
      }
    };
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
          //itemId,number
          let param={
            itemId:this.form.propID,
            number:this.form.propCount,
          }
          this.$api.itemDropLogadd(param).then(res =>{
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
  margin-left:10%;
  margin-bottom:16px;
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
