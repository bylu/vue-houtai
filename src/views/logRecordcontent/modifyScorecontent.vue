<template>
<div>
    <el-form :model="form" :inline="true" :rules="rules" ref="form" label-width="120px" class="demo-ruleForm">
       <el-form-item label="用户ID:" prop="userid">
          <el-input v-model.trim="form.userid" :readonly="status ? false : 'readonly'" size="small" placeholder="请输入用户ID" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="当前积分" prop="currentScore">
          <el-input v-model.trim="form.currentScore" :readonly="status ? false : 'readonly'" size="small" placeholder="请输入当前积分" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="要赠送的积分" prop="giveScore">
          <el-input v-model.trim="form.giveScore" size="small" placeholder="请输入要赠送的积分" clearable autocomplete="off"></el-input>
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="cancel">Close</el-button>
      <el-button :loading="loading" type="primary" size="small" @click="doSubmit">Save changes</el-button>
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
        userid:"",
        currentScore:"",
        giveScore:"",
      },
      rules: {
        userid: [
            { required: true, message: '请输入userid', trigger: 'blur' }
        ],
        currentScore: [
            { required: true, message: '请输入当前积分', trigger: 'blur' }
        ],
        giveScore:[
            {required: true, message: '请输入要赠送的积分', trigger: 'blur' }
        ]
      }
    };
  },
  mounted(){
   this.init()
  },
  methods: {
    init() {
      this.status = false;
      this.form.userid = this.getdata.userid;
      this.form.currentScore = this.getdata.currentScore;
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
          //uid,score
          let param = {
            uid:this.form.userid,
            score:this.form.giveScore,
          };
          this.$api.juBaoPenLogmodifyScore(param).then(res =>{
            if (res.success) {
              this.resetForm();
              this.$message({
                message: res.data,
                type: "success"
              });
              this.$emit('closedialog');
            }else{
              this.$message({
                message: res.data,
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
  width: 100%;
  float: left;
  margin:5% 0;
}
.el-form-item{
  width: 80%;
  float: left;
  margin-left:10%;
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
