<template>
<div>
   <el-form
      :model="form"
      :inline="true"
      :rules="rules"
      ref="form"
      label-width="80px"
      class="demo-ruleForm"
    >
      <el-form-item label="模块ID" prop="moduleID" style="display:none;">
        <el-input v-model.trim="form.moduleID"  placeholder="" autocomplete="off" size="small" clearable></el-input>
      </el-form-item>
      <el-form-item label="模块名称" prop="title">
        <el-input v-model.trim="form.title"  placeholder="填写模块名称" autocomplete="off" size="small" clearable></el-input>
      </el-form-item>
      <el-form-item label="衔接地址" prop="link">
        <el-input v-model.trim="form.link" placeholder="填写衔接地址" autocomplete="off" size="small" clearable></el-input>
      </el-form-item>
       <el-form-item label="模块排序" prop="orderNo">
        <el-input v-model.trim="form.orderNo"  placeholder="填写模块排序" autocomplete="off" size="small" clearable></el-input>
      </el-form-item>
      <el-form-item label="模块描述" prop="description">
        <el-input v-model.trim="form.description" placeholder="填写模块描述" autocomplete="off" size="small" clearable></el-input>
      </el-form-item>
       <el-form-item label="图标" prop="icon">
        <el-input v-model.trim="form.icon" placeholder="" autocomplete="off" size="small" clearable></el-input>
      </el-form-item>
       <el-form-item label="状态" prop="nullity">
        <el-radio-group v-model="form.nullity" size="small">
          <el-radio  :label="0">启用</el-radio>
          <el-radio  :label="1">禁用</el-radio>
        </el-radio-group>
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
  props: ['getdata','isAdd'],
  data() {
    return {
      loading: false,
      form: {
        moduleID: "",
        title: "",
        link:"",
        orderNo:"",
        description: "",
        icon:"",
        nullity:0
      },
      rules: {
        title: [
          { required: true, message: "填写模块名称", trigger: "blur" }
        ],
        link:[
           { required: true, message: "填写衔接地址", trigger: "blur" }
        ],
        orderNo:[
           { required: true, message: "填写模块排序", trigger: "blur" }
        ],
        description: [
          { required: true, message: "填写模块描述", trigger: "blur" }
        ],
        icon:[
           { required: true, message: "填写图标", trigger: "blur" }
        ]
      }
    };
  },
  mounted(){
    this.init();
  },
  methods: {
    //新增和编辑今日入页面初始化
    init(){
      if(this.isAdd){

      }else{
        this.form.moduleID=this.getdata.moduleID;
        this.form.title=this.getdata.title;
        this.form.link=this.getdata.link;
        this.form.orderNo=this.getdata.orderNo;
        this.form.description=this.getdata.description;
        this.form.icon=this.getdata.icon;
        this.form.nullity=parseInt(this.getdata.nullity);
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
          this.$api.addMenu(this.form).then(res =>{
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
  margin:5% 0;
}
.el-form-item{
  width:80%;
  float: left;
  margin-left:15%;
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
