<template>
  <div>
    <el-form :model="form" :inline="true" ref="form" :rules="rules"  label-width="80px" class="demo-ruleForm">
         <el-form-item label="活动ID" prop="activityId">
            <el-input v-model.trim="form.activityId" size="small" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="是否单选" prop="isMultiChoice">
            <el-radio-group v-model="form.isMultiChoice" size="small">
                <el-radio :label="0">单选题</el-radio>
                <el-radio :label="1">多选题</el-radio>
            </el-radio-group>
        </el-form-item>

        <el-form-item label="问题" prop="questionTitle">
          <el-input v-model="form.questionTitle" size="small" style="width:280%"  type="textarea" :autosize="{ minRows: 10, maxRows: 10}" autocomplete="off" ></el-input>
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
  props: ["getdata",'isAdd'],
  data() {
    return {
      loading: false,
      form: {
        id:'',
        questionId:'',
        activityId:"",
        isMultiChoice:1,
        questionTitle:""
      },
      rules: {
        activityId: [
            { required: true, message: '填写活动ID', trigger: 'blur' }
        ],
        questionTitle: [
            { required: true, message: '填写问题', trigger: 'blur' }
        ]
      }
    };
  },
  mounted() {
      this.init();
  },
  methods: {
    init(){
        if(this.isAdd){

        }else{
          this.form.id=2;
          this.form.questionId=this.getdata.questionId;
          this.form.activityId=this.getdata.activityId;
          this.form.isMultiChoice=parseInt(this.getdata.isMultiChoice);
          this.form.questionTitle=this.getdata.questionTitle;
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
          let param = {
            id:this.form.id,
            questionId:this.form.questionId,
            activityId:this.form.activityId,
            isMultiChoice:this.form.isMultiChoice,
            questionTitle:this.form.questionTitle
          };
          this.$api.surveysaveOrUpdate(param).then(res =>{
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
.el-form {
  width: 100%;
  float: left;
  margin: 2% 0;
}
.el-form-item {
  width:98%;
  float: left;
  margin-left: 2%;
}
.el-input{
  margin-bottom:0px;
}
.dialog-footer {
  text-align: right;
  padding-right: 3%;
  margin-bottom: 2%;
}
</style>
