<template>
<div>
   <el-form :model="form" :inline="true" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
       <el-form-item label="标题" prop="title">
          <el-input v-model.trim="form.title" size="small" placeholder="" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="消息" prop="message">
          <el-input v-model.trim="form.message" size="small" placeholder="" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="奖品" prop="award">
          <el-input v-model.trim="form.award" size="small" placeholder="-1,1000,-2,20000" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="份数" prop="amount">
          <el-input v-model.trim="form.amount"  size="small" placeholder="" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="时限" prop="timeLimit">
          <el-input v-model.trim="form.timeLimit" size="small" placeholder="" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="渠道约束" prop="spreader">
          <el-input v-model.trim="form.spreader"  size="small" clearable placeholder='{"type":1,"include":[1],"exclude":[1]}' autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="配置" prop="conf">
          <el-input v-model="form.conf"  size="small" clearable placeholder='{"sendTime":"1,2,3,4","Award":"一个亿的幸运豆"}' autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="开始时间"  prop="starTime" style="margin-bottom:0px;">
            <el-date-picker v-model="form.starTime" clearable align="right" size="small" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="请输入执行时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="广播时间"  prop="mqTime" style="margin-bottom:0px;">
            <el-date-picker v-model="form.mqTime" clearable align="right" size="small" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="请输入执行时间"></el-date-picker>
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
            title:'',
            message: '',
            award: '',
            amount: '',
            timeLimit: '',
            spreader:'',
            conf:'',
            starTime:this.moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
            mqTime:this.moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
        },
        rules: {
            title: [
                { required: true, message: '填写标题', trigger: 'blur' }
            ],
            message: [
                {required:true,message:'填写消息',trigger:'blur'}
            ],
            award: [
                { required: true, message: '填写奖品', trigger: 'blur' }
            ],
            amount: [
                { required: true, message: '填写份数', trigger: 'blur' }
            ],
            timeLimit: [
                { required: true, message: '填写翻倍比率', trigger: 'blur' }
            ],
            spreader: [
                { required: true, message: '填写时限', trigger: 'blur' }
            ],
            conf: [
                { required: true, message: '填写渠道约束', trigger: 'blur' }
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
          this.$api.sysRedPackadd(this.form).then(res =>{
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
.el-form{
  width:100%;
  float: left;
  margin:2% 0 0 0;
}
.el-form-item{
  width:auto;
  float: left;
  margin-bottom:20px;
}
.el-input{
    width:160%;
    margin-bottom:0px;
}
.dialog-footer{
  text-align: right;
  padding-right:3%;
  margin-bottom: 2%;
}
</style>
