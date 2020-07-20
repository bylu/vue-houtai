<template>
<div>
   <el-form :model="form" :inline="true" :rules="rules" ref="form" label-width="150px" class="demo-ruleForm">
        <el-form-item label="id" prop="id" style="display:none;">
          <el-input v-model.trim="form.id"  placeholder="" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="objId" prop="objId" style="display:none;">
          <el-input v-model.trim="form.objId"  placeholder="" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="subDomain" prop="value1">
          <el-input v-model.trim="form.value1" size="small" placeholder="" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="value" prop="value2">
          <el-input v-model.trim="form.value2" size="small" placeholder="" autocomplete="off" clearable></el-input>
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
  props: ['getdata','isAdd','parentid'],
  data() {
    return {
        loading: false,
        form: {
          id:'',
          objId:'',
          value1:'',
          value2:''
        },
        rules: {
            value1: [
                { required: true, message: '填写subDomain', trigger: 'blur' }
            ],
            value2: [
                { required:true,message:'填写value',trigger:'change'}
            ]
        },
    }
  },
  mounted(){
    this.init();
    // alert(this.parentid);
  },
  methods: {
    //新增和编辑今日入页面初始化
    init(){
      if(this.isAdd){
        this.form.id=this.getdata.id;
        this.form.objId=this.parentid;
      }else{
        this.form.id=this.getdata.id;
        this.form.objId=this.parentid;
        this.form.value1=this.getdata.value;
        this.form.value2=this.getdata.name;
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
          //id,objId,subDomain,value
          let param={
            id:this.form.id,
            objId:this.form.objId,
            subDomain:this.form.value1,
            value:this.form.value2
          }
          this.$http({
            url:this.paramUrl.domainsaveOrUpdate,
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
.el-select{
    width:90%;
}
.dialog-footer{
  text-align: right;
  padding-right:3%;
  margin-bottom: 2%;
}
</style>
