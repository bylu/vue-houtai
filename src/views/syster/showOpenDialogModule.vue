<template>
  <div>
    <el-form :model="form" :inline="true" ref="form" :rules="rules"  label-width="120px" class="demo-ruleForm">
      <el-form-item label="CPA渠道百分比" >
        <el-input v-model="form.spreadCPA" size="small" autocomplete="off" placeholder="直接输入数值"> 
            <i slot="suffix" class="el-input__icon ">%</i>
        </el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button  @click="cancel" size="small">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit" size="small">确认</el-button>
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
        spreadCPA:"",
      },
      rules: {
        spreadCPA: [
            { required: true, message: '填写CPA渠道百分比', trigger: 'blur' }
        ]
      }
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init(){
      this.$api.spreaderOrderCharacterRateselectCPA().then(res =>{
        this.loading = false;
        if (res.success) {
          this.form.spreadCPA=res.data;
        } else {
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
    //取消按钮操作
    cancel() {
      this.$refs["form"].resetFields(); //清空表单
      this.$emit("closedialog");
    },
    //确认按钮 提交事件
    doSubmit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$api.spreaderOrderCharacterRateupdateCPA(this.form).then(res =>{
            this.loading = false;
            if (res.success) {
              this.$emit("closedialog");
              this.$emit("shuaxin");
            } else {
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
        }
      })
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
.dialog-footer {
  text-align: right;
  padding-right: 3%;
  margin-bottom: 2%;
}
</style>
