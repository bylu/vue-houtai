<template>
<div>
   <el-form
      :model="form"
      :inline="true"
      :rules="rules"
      ref="form"
      label-width="150px"
      class="demo-ruleForm"
    >
      <el-form-item label="指定限制ID" prop="value1">
        <el-input v-model.trim="form.value1" size="small" placeholder="填写名称" autocomplete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="充值限制" prop="value2">
        <el-input v-model.trim="form.value2" size="small" placeholder="填写名称" autocomplete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="替代用户" prop="value3">
        <el-input v-model.trim="form.value3" size="small" placeholder="填写名称" autocomplete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="排名限制" prop="value4">
        <el-input v-model.trim="form.value4" size="small" placeholder="填写名称" autocomplete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="每次反超的积分" prop="value5">
        <el-input v-model.trim="form.value5" size="small" placeholder="填写名称" autocomplete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="指定基础次数" prop="value6">
        <el-input v-model.trim="form.value6" size="small" placeholder="填写名称" autocomplete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="次数递增" prop="value7">
        <el-input v-model.trim="form.value7" size="small" placeholder="填写名称" autocomplete="off" clearable></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button  size="small" @click="cancel">取消</el-button>
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
        value1: "",
        value2: "",
        value3: "",
        value4: "",
        value5: "",
        value6: "",
        value7: "",
      },
      rules: {
        value1: [
          { required: true, message: "填写指定限制ID", trigger: "blur" }
        ],
        value2: [
          { required: true, message: "填写充值限制", trigger: "blur" }
        ],
        value3: [
          { required: true, message: "填写替代用户", trigger: "blur" }
        ],
        value4: [
          { required: true, message: "填写排名限制", trigger: "blur" }
        ],
        value5: [
          { required: true, message: "填写每次反超的积分", trigger: "blur" }
        ],
        value6: [
          { required: true, message: "填写指定基础次数", trigger: "blur" }
        ],
         value7: [
          { required: true, message: "填写次数递增", trigger: "blur" }
        ],
      }
    };
  },
  mounted(){
    this.Init()
  },
  methods: {
    Init(){
      this.$api.arenaSignLoggetConfig().then(res =>{
        this.loading = false;
        if (res.success) {
          this.form.value1=res.data.userId;
          this.form.value2=res.data.payAmount;
          this.form.value3=res.data.instead;
          this.form.value4=res.data.rank;
          this.form.value5=res.data.score;
          this.form.value6=res.data.count;
          this.form.value7=res.data.stepCount;
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
    cancel() {
      this.resetForm();
      this.$emit('closedialog');
    },

    doSubmit() {
        let param={
            //这里写传递的参数 修改 data1  date2 等
            userId:this.form.value1,
            payAmount:this.form.value2,
            instead:this.form.value3,
            rank:this.form.value4,
            score:this.form.value5,
            count:this.form.value6,
            stepCount:this.form.value7
        }
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$api.arenaSignLogAdd(param).then(res =>{
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
              // this.resetForm();
              this.$message({
                message: res.message,
                type: "error"
              });
              // this.$emit('closedialog');
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
  margin:1% 0;
}
.el-form-item{
  width:80%;
  float: left;
  margin-left:5%;
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
