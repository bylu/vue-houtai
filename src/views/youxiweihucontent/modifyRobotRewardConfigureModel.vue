<template>
<div>
   <el-form  :model="form" :inline="true" :rules="rules" ref="form" class="demo-ruleForm">
      <el-form-item label="id" prop="id" style="display:none;">
        <el-input v-model="form.id"  placeholder="" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="" prop="desc">
        <el-input v-model="form.desc" type="textarea" style="width:293%;float:left;" :autosize="{ minRows: 6, maxRows: 6}" size="small" placeholder="" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="danger" size="small"  @click="cancel">取消</el-button>
      <el-button  size="small" type="success" @click="btnConfiguration">保存</el-button>
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
        desc: '',
      },
      rules: {
        desc: [
          { required: true, message: '填写配置', trigger: 'blur' }
        ]
      }
    };
  },
  mounted(){
    this.init();
  },
  methods: {
    init(){
      this.form.id=this.getdata.id;
      //matchId
      let params = { 
        matchId: this.getdata.id, 
      };
      this.$api.pkMatchConfiggetConfig(params).then(res =>{
        if (res.success) {
          res.data.forEach(element => {
            this.form.desc=res.data[0].androidConfig;
          });
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
    },
    //取消按钮操作
    cancel() {
        this.resetForm();
        this.$emit('closedialog');
    },
    //保存配置
    btnConfiguration(){
     this.$refs["form"].validate(valid => {
        if (valid) {
          //id，androidConfig
          let params = { 
            id: this.form.id,
            androidConfig: this.form.desc
          };
          this.$api.pkMatchConfigupdateConfig(params).then(res =>{
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
  width:98%;
  float: left;
  margin:3% 0 3% 2%;
}
.dialog-footer{
  text-align: right;
  padding-right:3%;
  margin-bottom: 2%;
}
</style>
