<template>
<div>
   <el-form
      :model="form"
      :inline="true"
      :rules="rules"
      ref="form"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-form-item label="红包批次" prop="sendBatch">
        <el-input v-model.trim="form.sendBatch" size="small"  placeholder="填写红包批次" clearable autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="红包道具" prop="itmeid">
        <el-input v-model.trim="form.itmeid" size="small" placeholder="填写红包道具" clearable autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="红包数量" prop="redpacketCount">
        <el-input v-model.trim="form.redpacketCount" size="small" placeholder="填写红包数量" clearable autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="限制渠道" prop="spreader">
        <el-input v-model.trim="form.spreader" size="small" placeholder="填写限制渠道" clearable autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="使用截止日期" prop="endTime">
        <el-date-picker v-model="form.endTime" size="small" align="right" clearable type="datetime" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="使用截止日期">
        </el-date-picker>
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
      form: { //sendBatch，itmeid，redpacketCount，spreader，endTime
        sendBatch: "",
        itmeid: "",
        redpacketCount: "",
        spreader:"",
        endTime:this.moment(new Date()).format("YYYY-MM-DD")
      },
      rules: {
        sendBatch: [
          { required: true, message: "填写红包批次", trigger: "blur" }
        ],
        itmeid: [
          { required: true, message: "填写红包道具", trigger: "blur" }
        ],
        redpacketCount: [
          { required: true, message: "填写红包数量", trigger: "blur" }
        ],
        spreader: [
          { required: true, message: "填写限制渠道", trigger: "blur" }
        ],
        endTime: [
          { required: true, message: "填写截止日期", trigger: "blur" }
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
          let url = this.paramUrl;
          this.loading = true
          this.$api.redPacketsInfogenerateRedpacket(this.form).then(res =>{
            this.loading = false;
            if (res.success) {
              this.$emit('closedialog');
              this.$alert(res.message, '红包批次', {
                confirmButtonText: '确定',
                callback: action => {

                }
              });
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
