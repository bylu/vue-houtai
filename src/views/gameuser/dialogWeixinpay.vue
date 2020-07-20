<template>
  <div>
    <el-form :model="form" :inline="true" :rules="rules"  ref="form"  label-width="100px" class="demo-ruleForm" >
      <el-form-item  label="用户ID:" prop="inputvalue1" v-if="show">
        <el-input v-model.trim="form.inputvalue1"  size="small" placeholder="填写用户ID，多个用；分隔" autocomplete="off" ></el-input>
      </el-form-item>
      <el-form-item label="充值金额："  prop="paymoney">
        <el-input v-model.trim="form.paymoney"  size="small" placeholder="" autocomplete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="订单号："  prop="orderno">
        <el-input v-model.trim="form.orderno" size="small"  clearable></el-input> 
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
      show:false,
      form: {
        inputvalue1: this.getdata,
        paymoney: "",
        orderextra:'kfwx',
        orderno:''
      },
      rules: {
        paymoney: [
            { required: true, message: '请输入充值金额', trigger: 'blur' }
        ],
        orderno: [
            { required: true, message: '请输入订单号', trigger: 'blur' }
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
          //   this.$http({
          //     url:,
          //     method: "post",
          //     data: this.form,
          //     headers: { "Content-Type": "application/json;charset=UTF-8" }
          //   }).then(res => {
          //     this.loading = false;
          //     if (res.data.success) {
          //       this.resetForm();
          //       this.$message({
          //         message: res.data.message,
          //         type: "success"
          //       });
          //       this.$emit('shuaxin');
          //       this.$emit('closedialog');
          //     }else{
          //       this.$message({
          //         message: res.data.message,
          //         type: "error"
          //       });
          //     }
          //   });
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
  width: 80%;
  float: left;
  margin-left: 10%;
}
.el-form-item > div.el-form-item__content{
  width:80%;
}
.dialog-footer {
  text-align: right;
  padding-right: 3%;
  margin-bottom: 2%;
}
</style>
