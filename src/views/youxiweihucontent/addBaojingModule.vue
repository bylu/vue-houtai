<template>
<div>
  <el-form  :model="form" :inline="true" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
        <el-form-item label="名称"  prop="name">
          <el-input v-model.trim="form.name" size="small"  placeholder="" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="电话"  prop="phone">
          <el-input v-model.trim="form.phone" size="small"  placeholder="以/隔开" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="配置"  prop="json">
          <el-input v-model="form.json" size="small" clearable placeholder="json格式，例：{single:300,all:50000}" autocomplete="off"></el-input>
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
        name:'',
        phone:'',
        json:''
      },
      rules: {
        name: [
            { required: true, message: '请输入名字', trigger: 'blur' }
        ],
        phone: [
            { required: true, message: '请输入电话', trigger: 'blur' }
        ],
        json: [
            { required: true, message: '请输入配置', trigger: 'blur' }
        ],
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
          let param={
            name:this.form.name,
            phone:this.form.phone,
            json:this.form.json
          }
          this.$http({
            url:this.paramUrl.baojingsaveOrUpdate,
            method: "post",
            data: param,
            headers: { "Content-Type": "application/json;charset=UTF-8" }
          }).then(res => {
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
          });
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
}
.dialog-footer{
text-align: right;
padding-right:3%;
margin-bottom: 2%;
}
</style>
