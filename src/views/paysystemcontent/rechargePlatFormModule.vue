<template>
<div>
   <el-form
      :model="form"
      :inline="true"
      :rules="rules"
      ref="form"
      label-width="80px"
      class="demo-ruleForm"
    >
      <el-form-item label="ID" prop="value1" style="display:none;">
        <el-input v-model.trim="form.value1" size="small" placeholder="" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="名称" prop="value2">
        <el-input v-model.trim="form.value2" size="small" placeholder="" autocomplete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="订单特征" prop="value3">
        <el-input v-model.trim="form.value3" size="small"  placeholder="" autocomplete="off" clearable></el-input>
      </el-form-item>
      
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button  size="small" @click="cancel">取消</el-button>
      <el-button :loading="loading" size="small" type="primary" @click="doSubmit">确认</el-button>
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
        value1: "",
        value2: "",
        value3:""
      },
      rules: {
        value2: [
          { required: true, message: "填写名称", trigger: "blur" }
        ],
        value3: [
          { required: true, message: "填写订单特征", trigger: "blur" }
        ]
      }
    };
  },
  mounted(){
    this.init();
  },
  methods: {
    init(){
      if(this.isAdd){

      }else{
        this.form.value1=this.getdata.id;
        this.form.value2=this.getdata.platformName;
        this.form.value3=this.getdata.orderFeature;
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
          let param={
              id:this.form.value1,
              orderFeature:this.form.value3,
              platformName:this.form.value2
          }
          this.$api.rechargePlatFormup(param).then(res =>{
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
}
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
  margin-bottom:20px;
}
.el-input{
  margin-bottom: 0px;
}
.dialog-footer{
text-align: right;
padding-right:3%;
margin-bottom: 2%;
}
</style>
