<template>
<div>
   <el-form :model="form" :inline="true" :rules="rules" ref="form" label-width="150px" class="demo-ruleForm">
        <el-form-item label="道具ID" prop="value1" show-overflow-tooltip>
          <el-input v-model.trim="form.value1" :readonly="status ? false : 'readonly'" size="small" placeholder="" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="监控数值" prop="value2" show-overflow-tooltip>
          <el-input v-model.trim="form.value2" clearable size="small" placeholder="默认0不限,大于多少(正整数)" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="value3" show-overflow-tooltip>
          <el-input v-model.trim="form.value3" size="small" placeholder="" clearable autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="短信间隔时间" prop="value4" show-overflow-tooltip>
          <el-input v-model.trim="form.value4" size="small" clearable placeholder="(分)间隔时间内不再给相同的人发短信" autocomplete="off"></el-input>
        </el-form-item>
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
  props: ['getdata'],
  data() {
    return {
      loading: false,
      status:false,
      form: {
        value1:'',
        value2:'',
        value3:'',
        value4:''
      },
      rules: {
          value1: [
              { required: true, message: '道具ID', trigger: 'blur' }
          ],
          value2: [
              { required:true,message:'监控数值',trigger:'change'}
          ],
          value3: [
              { required: true, message: '手机号码', trigger: 'blur' }
          ],
          value4: [
              { required: true, message: '短信间隔时间', trigger: 'blur' }
          ],
      }
    }
  },
  mounted(){
    this.init();
  },
  methods: {
    init(){
      this.status=false;
      this.form.value1=this.getdata.itemId;
      this.form.value2=(this.getdata.fazhi).toString();
      this.form.value3=this.getdata.phone;
      this.form.value4=this.getdata.timeIntervel;
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
          //itemId，fazhi，phone，timeIntervel
          let param={
            itemId:this.form.value1,
            fazhi:this.form.value2,
            phone:this.form.value3,
            timeIntervel:this.form.value4,
          }
          this.$api.itemTotalupdateValue(param).then(res =>{
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
