<template>
<div>
      <el-form  :model="form" :inline="true"  :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
        <el-form-item label="itemId" prop="itemId" style="display:none;">
          <el-input v-model="form.itemId" placeholder="" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="最终数量" prop="propCount">
          <el-input-number v-model.trim="form.propCount"  @change="handleChange" :min="0" size="small"  style="width:250px;" autocomplete="off"></el-input-number>
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
  props: ["getdata"],
  data() {
    return {
      loading: false,
      form: {
        itemId:'',
        propCount:0
      },
      rules: {
        propCount: [
            { required: true, message: '请输入道具数量', trigger: 'blur' }
        ]
      }
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init(){
      this.form.itemId=this.getdata.itemId;
      this.form.propCount=this.getdata.number;
    },
    //取消按钮操作
    cancel() {
      this.resetForm();
      this.$emit('closedialog');
    },
    handleChange(value) {
      this.propCount=value;
    },
    //确认按钮 提交事件
    doSubmit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          //itemId,number
          let param={
            itemId:this.form.itemId,
            number:this.propCount,
          }
          this.$api.itemDropLogupdate(param).then(res =>{
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
  margin-left:10%;
}
.dialog-footer{
text-align: right;
padding-right:3%;
margin-bottom: 2%;
}
</style>
