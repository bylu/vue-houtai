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
     <el-form-item label="" prop="value3" style="display:none">
       <el-input v-model.trim="form.value3" size="small"  placeholder="" autocomplete="off"></el-input>
     </el-form-item>
      <el-form-item label="分数" prop="value1">
        <el-input v-model.trim="form.value1" size="small"  placeholder="填写名称" autocomplete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="完成状态" prop="value2">
          <el-radio-group v-model="form.value2" size="small">
            <el-radio label="0">未完成</el-radio>
            <el-radio label="1">完成</el-radio>
          </el-radio-group>
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
      form: {
        value1: "",
        value2: "1",
        value3:"",
        value4:""
      },
      rules: {
        value1: [
          { required: true, message: "填写分数", trigger: "blur" }
        ],
        value2: [
          { required: true, message: "填写次数", trigger: "blur" }
        ]
      }
    };
  },
  mounted(){
    this.init();
  },
  methods: {

    init(){
        this.form.value1=this.getdata.score;
        //this.form.value2=parseInt(this.getdata.status);
        this.form.value3=this.getdata.searchTime;
        this.form.value4=this.getdata.userid;
    },

    cancel() {
      this.resetForm();
      this.$emit('closedialog');
    },

    doSubmit() {
        let param={
            //这里写传递的参数 修改 data1  date2
            score:this.form.value1,
            times:this.form.value2,
            begintime:this.form.value3,
            userid:this.form.value4
        }
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$api.arenaSignLogUpdate(param).then(res =>{
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
              // this.resetForm();
              this.$message({
                message: res.message,
                type: "error"
              });
              // this.$emit('closedialog');
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
  margin-bottom:16px;
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
