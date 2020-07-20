<template>
<div>
   <el-form :model="form" :inline="true" :rules="rules" ref="form" label-width="130px" class="demo-ruleForm">
       <el-form-item label="id" prop="id">
         <el-input v-model="form.id" size="small" placeholder="" autocomplete="off"></el-input>
       </el-form-item>
       <el-form-item label="类型"  prop="type">
         <el-radio-group v-model="form.type" size="small">
           <el-radio label="1">1</el-radio>
           <el-radio label="0">0</el-radio>
         </el-radio-group>
       </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" size="small" placeholder="" autocomplete="off"></el-input>
        </el-form-item>
         <el-form-item label="开始时间"  prop="starttime">
           <el-date-picker v-model="form.starttime" align="right" size="small" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="请输入执行时间" clearable></el-date-picker>
         </el-form-item>
        <el-form-item label="道具奖励" prop="prizeid">
          <el-input v-model="form.prizeid" size="small" placeholder="" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="结束时间"  prop="endtime">
            <el-date-picker v-model="form.endtime" align="right" size="small" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="请输入执行时间" clearable></el-date-picker>
        </el-form-item>
        <el-form-item  label="节日内容" prop="content" style="width:100%;">
          <el-input v-model="form.content" type="textarea" style="width:305%" :autosize="{ minRows: 10, maxRows: 10}" size="small" placeholder="" autocomplete="off"></el-input>
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
        form: {
          id:'',
          name:'',
          type:'',
          prizeid:"",
          starttime:"",
          endtime:"",
          content:""
        },
        rules: {
          id: [
            {required:true,message:'填写ID',trigger:'blur'}
          ],
          name: [
              {required:true,message:'填写名称',trigger:'blur'}
          ],
          prizeid: [
              { required: true, message: '填写道具奖励', trigger: 'blur' }
          ],
          starttime: [
              {required:true,message:'填写开始时间',trigger:'blur'}
          ],
          endtime: [
              { required: true, message: '填写结束时间', trigger: 'blur' }
          ],
          content:[
              { required: true, message: '填写节日内容', trigger: 'blur' }
          ],
        }
    }
  },
  mounted(){
    this.init();
  },
  methods: {
    init(){
      this.form.id=this.getdata.id;
      this.form.name=this.getdata.name;
      this.form.type=(this.getdata.type).toString();
      this.form.prizeid=this.getdata.prizeid;
      this.form.starttime=this.moment(this.getdata.starttime).format("YYYY-MM-DD HH:mm:ss");
      this.form.endtime=this.moment(this.getdata.endtime).format("YYYY-MM-DD HH:mm:ss"), this.form.content=this.getdata.content;
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
          this.$api.festivalprizecopy(this.form).then(res =>{
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
              console.log(err)
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
  margin:2% 0;
}
.el-form-item{
  width:auto;
  float: left;
  margin-bottom:20px;
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
