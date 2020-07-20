<template>
<div>
  <el-form  :model="form" :inline="true"  :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户ID:"  prop="inputvalue1">
          <el-input v-model.trim="form.inputvalue1"  placeholder="填写用户ID，多个用；分隔" autocomplete="off" size="small" clearable></el-input>
        </el-form-item>
        <el-form-item :label="label01"  prop="inputvalue2">
          <el-input v-model.trim="form.inputvalue2" placeholder="" autocomplete="off" size="small" clearable></el-input>
        </el-form-item>
        <el-form-item :label="label02"  prop="inputvalue3">
          <el-input v-model.trim="form.inputvalue3"  placeholder="" autocomplete="off" size="small" clearable></el-input>
        </el-form-item>
        <el-form-item label="赠送类型"  prop="inputvalue4" v-show="specialtype">
          <el-radio-group v-model="inputvalue4" size="small">
            <el-radio label="0">银行幸运豆</el-radio>
            <el-radio label="1">身上幸运豆</el-radio>
          </el-radio-group>                   
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button  @click="cancel" size="small">取 消</el-button>
      <el-button  :loading="loading" type="primary" size="small" @click="doSubmit">确 定</el-button>
    </div>
</div>
</template>

<script>
export default {
  name: "",
  props: ['getdata','typeid'],
  data() {
    return {
      loading: false,
      label01:'',
      label02:'',
      posturl:'',
      paramsinfo:'',
      form: {
        inputvalue1:this.getdata,
        inputvalue2:"",
        inputvalue3:''
      },
      inputvalue4:'0',
      specialtype:false,
      rules: {
        inputvalue1: [
            { required: true, message: '请输入userid', trigger: 'blur' }
        ],
        inputvalue2: [
            { required: true, message: '请输入信息', trigger: 'blur' }
        ],
        inputvalue3:[
            {required: true, message: '请输入信息', trigger: 'blur' }
        ]
      }
    };
  },
  mounted(){
    this.init();
  },
  methods: {
    init(){
        if(this.typeid == 1){
            this.label01="会员等级:";
            this.label02="赠送原因:";
        }else if(this.typeid == 2){
            this.label01="幸运豆:";
            this.label02="赠送原因:";
            this.specialtype=true;
        }else if(this.typeid == 3){
            this.label01="经验:";
            this.label02="赠送原因:";
        }else if(this.typeid == 4){
            this.label01="等级:";
            this.label02="赠送原因:";
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
          this.loading=true;
         let getdata=this.typeid;
         if(getdata == 1){ //会员等级
            this.paramsinfo={ 
              userids: this.form.inputvalue1,
              memberOrder:this.form.inputvalue2,
              reason:this.form.inputvalue3
            };
            this.$api.updateAccountsInfo(this.paramsinfo).then(res =>{
              this.loading = false;
              if (res.success) {
                this.resetForm();
                this.$message({
                  duration:0,
                  showClose: true,
                  dangerouslyUseHTMLString: true,
                  message: "<p>"+res.message+"</p>",
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
          }
          if(getdata == 2){ //幸运豆
            this.paramsinfo={ 
              userids: this.form.inputvalue1,
              score:this.form.inputvalue2,
              reason:this.form.inputvalue3,
              xx:this.inputvalue4,
            };
            this.$api.updateAccountsInfo(this.paramsinfo).then(res =>{
              this.loading = false;
              if (res.success) {
                this.resetForm();
                this.$message({
                  duration:0,
                  showClose: true,
                  dangerouslyUseHTMLString: true,
                  message: "<p>"+res.message+"</p>",
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
          }
          if(getdata == 3){ //经验
            this.paramsinfo={ 
              userids: this.form.inputvalue1,
              experience:this.form.inputvalue2,
              reason:this.form.inputvalue3
            };
            this.$api.updateAccountsInfo(this.paramsinfo).then(res =>{
              this.loading = false;
              if (res.success) {
                this.resetForm();
                this.$message({
                  duration:0,
                  showClose: true,
                  dangerouslyUseHTMLString: true,
                  message: "<p>"+res.message+"</p>",
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
          }
          if(getdata == 4){ //等级
            this.paramsinfo={ 
              userids: this.form.inputvalue1,
              level:this.form.inputvalue2,
              reason:this.form.inputvalue3
            };
            this.$api.updateAccountsInfo(this.paramsinfo).then(res =>{
              this.loading = false;
              if (res.success) {
                this.resetForm();
                this.$message({
                  duration:0,
                  showClose: true,
                  dangerouslyUseHTMLString: true,
                  message: "<p>"+res.message+"</p>",
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
          }
      
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
  margin:3% 0;
}
.el-form-item{
  width:80%;
  float: left;
  margin-left:10%;
  margin-bottom:16px;
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
