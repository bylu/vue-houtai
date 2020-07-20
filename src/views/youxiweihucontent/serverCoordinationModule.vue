<template>
<div>
   <el-form :model="form" :inline="true" :rules="rules" ref="form" label-width="150px" class="demo-ruleForm">
       <el-form-item label="id" prop="id" style="display:none;">
          <el-input v-model.trim="form.id"  placeholder="" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="协调服务器名称"  prop="value1">
          <el-input v-model.trim="form.value1" size="small" placeholder="" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="协调服务器IP"  prop="value2">
          <el-input v-model.trim="form.value2" size="small" placeholder="" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="内网IP"  prop="value3">
          <el-input v-model.trim="form.value3" size="small" placeholder="" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="状态"  prop="value4">
          <el-radio-group v-model="form.value4" size="small">
            <el-radio label="1">可用</el-radio>
            <el-radio label="0">不用</el-radio>
          </el-radio-group>
        </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" size="small" @click="cancel">取消</el-button>
      <el-button :loading="loading" size="small" type="primary" @click="doSubmit">确认</el-button>
    </div>
</div>
</template>

<script>
export default {
  name: "",
  props: ['getdata','isAdd'],
  data() {
    return {
        loading: false,
        form: {
          id:'',
          value1:'',
          value2:'',
          value3:'',
          value4:"1"
        },
        rules: {
            value1: [
                { required:true,message:'填写协调服务器名称',trigger:'blur'}
            ],
            value2: [
                { required:true,message:'填写协调服务器IP',trigger:'blur'}
            ],
            value3: [
                { required: true, message: '填写内网Ip', trigger: 'blur' }
            ]
        }
    }
  },
  mounted(){
    this.init();
  },
  methods: {
    //新增和编辑今日入页面初始化
    init(){
      if(this.isAdd){

      }else{
        this.form.id=this.getdata.id;
        this.form.value1=this.getdata.serversName;
        this.form.value2=this.getdata.serversIP;
        this.form.value3=this.getdata.serversipLocal;
        this.form.value4=(this.getdata.state).toString();
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
          //id,serverName,serversIP,state,serversipLocal
          let param={
            id:this.form.id,
            serversName:this.form.value1,
            serversIP:this.form.value2,
            serversipLocal:this.form.value3,
            state:this.form.value4
          }
          this.$api.serversCoordinationsaveOrUpdate(param).then(res =>{
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
  margin:5% 0;
}
.el-form-item{
  width:auto;
  float: left;
  margin-bottom:16px;
}
.el-input{
  margin-bottom: 0px;
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
