<template>
<div>
   <el-form :model="form" :inline="true" :rules="rules" ref="form" label-width="150px" class="demo-ruleForm">
        <el-form-item label="id" prop="id" style="display:none;">
          <el-input v-model.trim="form.id"  placeholder="" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="渠道id"  prop="channelId">
          <el-input v-model.trim="form.channelId" size="small" placeholder="" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="充值上限"  prop="limitPaySum">
          <el-input v-model.trim="form.limitPaySum" size="small" placeholder="" autocomplete="off" clearable></el-input>
        </el-form-item>

        <el-form-item label="描述内容"  prop="description">
          <el-input v-model="form.description" size="small" placeholder="" autocomplete="off" clearable></el-input>
        </el-form-item>

        <el-form-item label="是否开启" prop="open">
          <el-select v-model="form.open" size="small" placeholder="开启">
            <el-option  v-for="list in selectList.isOpen" :key="list.key" :label="list.value" :value="list.key"></el-option>
          </el-select>
        </el-form-item>

        <!-- <el-form-item label="白名单" prop="noLimit">
          <el-select v-model="form.noLimit" size="small" placeholder="开启">
            <el-option  v-for="list in selectList.isOpen" :key="list.key" :label="list.value" :value="list.key"></el-option>
          </el-select>
        </el-form-item> -->
      
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
  props: ['getdata','isAdd'],
  data() {
    return {
        loading: false,
        form: {
           channelId:'',
           limitPaySum:'',
           description:'',
           open:'',
           noLimit:''
        },
        rules: {
            channelId: [
                { required: true, message: '填写渠道id', trigger: 'blur' }
            ],
            limitPaySum: [
                {required:true,message:'填写充值上限',trigger:'blur'}
            ],
            description: [
                {required:true,message:'填写描述内容',trigger:'blur'}
            ],
            open: [
                {required:true,message:'请输入您的选择',trigger:'change'}
            ],
            // noLimit: [
            //     {required:true,message:'请输入您的选择',trigger:'change'}
            // ]
        },
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
          this.form.channelId=this.getdata.channelId;
          this.form.limitPaySum=this.getdata.limitPaySum;
          this.form.description=this.getdata.description;
          this.form.open=(this.getdata.open).toString();
          //this.form.noLimit=(this.getdata.noLimit).toString();
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
          this.$api.limitPayConfigsaveOrUpdate(this.form).then(res =>{
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
  margin-left:5%;
  margin-bottom:20px;
}
.el-input{
  margin-bottom: 0px;
}
.dialog-footer{
text-align: right;
padding-right:3%;
margin-bottom: 2%;
}
</style>
