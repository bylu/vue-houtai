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
      <el-form-item label="订单号码" prop="value1" show-overflow-tooltip>
        <el-input v-model.trim="form.value1" :readonly="status ? false : 'readonly'" size="small" placeholder="" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="支付金额" prop="value2" show-overflow-tooltip>
        <el-input v-model.trim="form.value2" :readonly="status ? false : 'readonly'" size="small"  placeholder="" autocomplete="off"></el-input>
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
      status:false,
      form: {
        value1: "",
        value2: ""
      },
      rules: {
        value1: [
          { required: true, message: "填写订单号码", trigger: "blur" }
        ],
        value2: [
          { required: true, message: "填写支付金额", trigger: "blur" }
        ]
      }
    };
  },
  mounted(){
    this.init();
  },
  methods: {
    init(){
        this.status = false;
        this.form.value1=this.getdata.orderID;
        this.form.value2=this.getdata.payAmount;
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
              orderID:this.form.value1,
              payAmount:this.form.value2
          }
          this.$api.onlineOrderrepair(param).then(res =>{
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
  width:110%;
}
.dialog-footer{
text-align: right;
padding-right:3%;
margin-bottom: 2%;
}
</style>
