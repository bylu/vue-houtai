<template>
<div>
  <el-form  :model="form" :inline="true"  :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
        <el-form-item :label="label00"  prop="inputvalue1">
          <el-input v-model.trim="form.inputvalue1"  placeholder="" autocomplete="off" size="small" clearable></el-input>
        </el-form-item>
        <el-form-item :label="label01"  prop="inputvalue2">
          <el-input v-model.trim="form.inputvalue2" placeholder="" autocomplete="off" size="small" clearable></el-input>
        </el-form-item>
        <el-form-item :label="label02"  prop="inputvalue3">
          <el-input v-model.trim="form.inputvalue3"  placeholder="" autocomplete="off" size="small" clearable></el-input>
        </el-form-item>
         <el-form-item :label="label03"  prop="inputvalue4" >
          <el-input v-model.trim="form.inputvalue4"  placeholder="" autocomplete="off" size="small" clearable></el-input>
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
  props: ['typeid'],
  data() {
    return {
      loading: false,
      label00:'',
      label01:'',
      label02:'',
      label03:'',
      posturl:'',
      paramsinfo:'',
      form: {
        inputvalue1:"",
        inputvalue2:"",
        inputvalue3:'',
        inputvalue4:''
      },
      rules: {
        inputvalue1: [
            { required: true, message: '请输入用户Id', trigger: 'blur' }
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
            this.label00="用户ID:";
            this.label01="道具标识:";
            this.label02="道具数量:";
            this.label03="赠送原因:";
            let getdata=sessionStorage.getItem("saveUserBaseProp1");
            if( getdata == null || getdata == ""){
            }else{
              let getUserBaseProp=JSON.parse(sessionStorage.getItem("saveUserBaseProp1"));
              this.form.inputvalue1=getUserBaseProp.userId;
              this.form.inputvalue2=getUserBaseProp.itemId;
              this.form.inputvalue3=getUserBaseProp.count;
              this.form.inputvalue4=getUserBaseProp.reason;
            }
        }else if(this.typeid == 2){
            this.label00="从用户ID:";
            this.label01="到用户ID:";
            this.label02="夺宝卡:";
            this.label03="初级参赛卡:";
            let getdata=sessionStorage.getItem("saveUserBaseProp2");
            if( getdata== null || getdata == ""){
            }else{
              let getUserBaseProp=JSON.parse(sessionStorage.getItem("saveUserBaseProp2"));
              this.form.inputvalue1=getUserBaseProp.userId;
              this.form.inputvalue2=getUserBaseProp.userIds;
              this.form.inputvalue3=getUserBaseProp.dbCard;
              this.form.inputvalue4=getUserBaseProp.entryCard;
            }   
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
         let getdata=this.typeid;
         if(getdata == 1){ //赠送道具
            this.paramsinfo={ 
              userId: this.form.inputvalue1,
              itemId:this.form.inputvalue2,
              count:this.form.inputvalue3,
              reason:this.form.inputvalue4,
            };
            this.$api.itemBasegiveItem(this.paramsinfo).then(res =>{
              if (res.success) {
                this.resetForm();
                this.$message({
                  message: res.message,
                  type: "success"
                });
                sessionStorage.setItem("saveUserBaseProp1",JSON.stringify(this.paramsinfo));
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
          if(getdata == 2){ //转移道具
            this.paramsinfo={ 
              userId: this.form.inputvalue1,
              userIds:this.form.inputvalue2,
              dbCard:this.form.inputvalue3,
              entryCard:this.form.inputvalue4,
            };
            this.$api.itemBaseshiftItem(this.paramsinfo).then(res =>{
              if (res.success) {
                this.resetForm();
                this.$message({
                  message: res.message,
                  type: "success"
                });
                sessionStorage.setItem("saveUserBaseProp2",JSON.stringify(this.paramsinfo));
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
  margin:1% 0;
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
