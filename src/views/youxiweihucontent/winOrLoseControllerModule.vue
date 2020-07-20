<template>
<div>
   <el-form :model="form" :inline="true" :rules="rules" ref="form" label-width="130px" class="demo-ruleForm">
        <el-form-item label="渠道ID"  prop="value1">
          <el-input v-model.trim="form.value1" size="small" placeholder="" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="开启时间"  prop="value2">
          <el-input v-model="form.value2" size="small" clearable placeholder="格式：hhmm 小时分钟" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="关闭时间"  prop="value3">
          <el-input v-model="form.value3" size="small" clearable placeholder="格式：hhmm 小时分钟" autocomplete="off"></el-input>
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
  props: [],
  data() {
    return {
        loading: false,
        form: {
          value1:'',
          value2:'',
          value3:''
        },
        rules: {
            value1: [
                { required: true, message: '填写渠道ID', trigger: 'blur' }
            ],
            value2: [
                { required:true,message:'填写开启时间',trigger:'blur'}
            ],
            value3: [
                { required:true,message:'填写关闭时间',trigger:'blur'}
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
          //spreaderId,start,end
          let param={
            spreaderId:this.form.value1,
            start:this.form.value2,
            end:this.form.value3
          }
          this.$http({
            url:this.paramUrl.systemStatusInfoWinLoseControllerwinLoseOnOff,
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
  width:auto;
  float: left;
  margin-bottom:20px;
}
.el-input{
  margin-bottom:0px;
}
.el-select{
    width:90%;
}
.dialog-footer{
  text-align: right;
  padding-right:3%;
  margin-bottom: 2%;
}
</style>
