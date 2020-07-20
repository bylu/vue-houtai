<template>
<div>
   <el-form :model="form" :inline="true" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
       <el-form-item label="" prop="id" style="display:none">
          <el-input v-model="form.id" size="small" placeholder="" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="开始时间"  prop="showBegin">
            <el-date-picker v-model="form.showBegin" clearable align="right" size="small" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="请输入执行时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间"  prop="showEnd">
            <el-date-picker v-model="form.showEnd" clearable align="right" size="small" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="请输入执行时间"></el-date-picker>
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
          showBegin:"",
          showEnd:""
        },
        rules: {
          showBegin: [
              {required:true,message:'填写开始时间',trigger:'blur'}
          ],
          showEnd: [
              { required: true, message: '填写结束时间', trigger: 'blur' }
          ]
        }
    }
  },
  mounted(){
    this.form.id=this.getdata.id;
    let getdata=sessionStorage.getItem("activitiesCopyDate");
    if( getdata== null || getdata == ""){
    }else{
      let activitiesCopyDateInfo=JSON.parse(sessionStorage.getItem("activitiesCopyDate"));
      this.form.showBegin=activitiesCopyDateInfo.beginTime;
      this.form.showEnd=activitiesCopyDateInfo.endTime;
    } 
  },
  methods: {
    //取消按钮操作
    cancel() {
      this.resetForm();
      this.$emit('closedialog');
    },
    //确认按钮 提交事件
    doSubmit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          //id, beginTime,endTime
          let param={
            id:this.form.id,
            beginTime:this.moment(this.form.showBegin).format("YYYY-MM-DD HH:mm:ss"),
            endTime:this.moment(this.form.showEnd).format("YYYY-MM-DD HH:mm:ss"),
          }
          this.$api.activitiescopy(param).then(res =>{
            if (res.success) {
              sessionStorage.setItem("activitiesCopyDate",JSON.stringify(param));
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
.el-input{
    width:160%;
    margin-bottom:0px;
}
.dialog-footer{
  text-align: right;
  padding-right:3%;
  margin-bottom: 2%;
}
</style>
