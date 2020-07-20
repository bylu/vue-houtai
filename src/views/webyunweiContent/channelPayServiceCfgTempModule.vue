<template>
  <div>
    <el-form :model="form" :inline="true" ref="form" :rules="rules"  label-width="150px" class="demo-ruleForm">
      <el-form-item label="id" prop="id" style="display:none;">
        <el-input v-model.trim="form.id"  placeholder="" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="SERVICE_NAME" prop="value1">
        <el-input v-model.trim="form.value1" size="small" autocomplete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="SERVER_PARAMS" prop="value2">
        <el-input v-model.trim="form.value2" size="small" autocomplete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="CLIENT_PARAMS" prop="value3">
        <el-input v-model.trim="form.value3" size="small" autocomplete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="NOTE" prop="value4">
        <el-input v-model.trim="form.value4" size="small" autocomplete="off" clearable></el-input>
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
  props: ["getdata",'isAdd'],
  data() {
    return {
      loading: false,
      form: {
        id:'',
        value1:'',
        value2:'',
        value3:'',
        value4:'',
        value5:''
      },
      rules: {
        value1: [
            { required: true, message: '填写模板名称', trigger: 'blur' }
        ],
        value2: [
            { required: true, message: '填写服务端配置参数', trigger: 'blur' }
        ],
      }
    };
  },
  mounted() {
      this.init();
  },
  methods: {
    init(){
        if(this.isAdd){
          this.form.value5=this.moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
        }else{
          this.form.id=this.getdata.id;
          this.form.value1=this.getdata.serviceName;
          this.form.value2=this.getdata.serverParams;
          this.form.value3=this.getdata.clientParams;
          this.form.value4=this.getdata.note;
          this.form.value5=this.moment(this.getdata.insertDate).format("YYYY-MM-DD HH:mm:ss");
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
          //serviceName=测试&serverParams=测试&clientParams=测试&note=测试&insertDate
          let param={
            id:this.form.id,
            serviceName:this.form.value1,
            serverParams:this.form.value2,
            clientParams:this.form.value3,
            note:this.form.value4,
            insertDate:this.moment(this.form.value5).format("YYYY-MM-DD HH:mm:ss")
          }
          this.$api.channelPayServiceCfgTempsaveOrUpdate(param).then(res =>{
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
.el-form {
  width: 100%;
  float: left;
  margin: 5% 0;
}
.el-form-item {
  width: 80%;
  float: left;
  margin-left: 8%;
}
.el-input{
  margin-bottom:0px;
}
.dialog-footer {
  text-align: right;
  padding-right: 3%;
  margin-bottom: 2%;
}
</style>
