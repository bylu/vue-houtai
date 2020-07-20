<template>
<div>
   <el-form  :model="form"  :inline="true"  ref="form" class="demo-ruleForm">
        <textarea  v-model="form.desc" ></textarea>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" size="small"  @click="cancel">取消</el-button>
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
        desc: '',
      }
    };
  },
  mounted(){
    this.init();
  },
  methods: {
    init(){
        this.form.desc=this.getdata;
    },
    //取消按钮操作
    cancel() {
      this.$emit('closedialog');
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
textarea{
    min-height:300px;
    width:90%;
    float: left;
    margin-left:5%;
}
.dialog-footer{
text-align: right;
padding-right:3%;
margin-bottom: 2%;
}
</style>
