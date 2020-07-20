<template>
<div>
   <el-form :model="form" :inline="true" :rules="rules" ref="form" label-width="120px" class="demo-ruleForm">
        <el-form-item label="id"  prop="id" style="display:none">
          <el-input v-model.trim="form.id" size="small" placeholder="" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="渠道名称"  prop="channelname">
          <el-input v-model.trim="form.channelname" size="small" placeholder="" autocomplete="off" clearable></el-input>
        </el-form-item>

         <el-form-item label="天数"  prop="days">
          <el-input v-model.trim="form.days" size="small" placeholder="" autocomplete="off" clearable></el-input>
        </el-form-item>

        <el-form-item label="是否开启" prop="isopen" >
            <el-radio-group v-model="form.isopen" size="small">
                <el-radio label="1">开启</el-radio>
                <el-radio label="0">关闭</el-radio>
            </el-radio-group>
        </el-form-item>

        <el-form-item label="是否弹出" prop="ispop" >
            <el-radio-group v-model="form.ispop" size="small">
                <el-radio label="1">弹出</el-radio>
                <el-radio label="0">不弹出</el-radio>
            </el-radio-group>
        </el-form-item>
        
        <el-form-item label="开始时间"  prop="begindate">
            <el-date-picker v-model="form.begindate"
            align="right"
            size="small"
            type="datetime"
            value-format="yyyy-MM-dd"
            format="yyyy-MM-dd"
            placeholder="请输入执行时间" clearable
          ></el-date-picker>
        </el-form-item>

         <el-form-item label="结束时间"  prop="enddate">
            <el-date-picker v-model="form.enddate"
            align="right"
            size="small"
            type="datetime"
            value-format="yyyy-MM-dd"
            format="yyyy-MM-dd"
            placeholder="请输入执行时间" clearable
          ></el-date-picker>
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
  props: ['getdata','isAdd'],
  data() {
    return {
        loading: false,
        form: {
            id:'',
            channelname: '',
            days: '',
            isopen:"0",
            ispop:"0",
            begindate:this.moment(new Date(new Date().setHours(0, 0, 0, 0))).format("YYYY-MM-DD"),
            enddate:this.moment(new Date()).format("YYYY-MM-DD")
        },
        rules: {
            channelname: [
                { required: true, message: '填写渠道名称', trigger: 'blur' }
            ],
            days: [
                { required:true,message:'填写天数',trigger:'blur' }
            ],
           
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
             this.form.channelname=this.getdata.channelname;
             this.form.days=this.getdata.days;
             this.form.isopen=(this.getdata.isopen).toString();
             this.form.ispop=(this.getdata.ispop).toString();
             this.form.begindate=this.moment(this.getdata.begindate).format("YYYY-MM-DD");
             this.form.enddate=this.moment(this.getdata.enddate).format("YYYY-MM-DD")
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
          this.$api.rechargeDoubleConfigsaveOrUpdate(this.form).then(res =>{
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
  margin-left:8%;
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
