<template>
<div>
    <el-form :model="form" :inline="true" :rules="rules" ref="form" label-width="150px" class="demo-ruleForm">
        <el-form-item label="id" prop="id" style="display:none;">
          <el-input v-model.trim="form.id"  placeholder="" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="节点服务器名称"  prop="value1">
          <el-input v-model.trim="form.value1" :readonly="status ? false : 'readonly'" size="small" placeholder="" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="协调服务器列表"  prop="value2">
          <el-select v-model="form.value2" size="small" placeholder="请选择">
            <el-option  v-for="list in xietiaolist" :key="list.key" :label="list.serversName" :value="list.id"></el-option>
          </el-select>
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="cancel">取消</el-button>
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
          id:'',
          value1:'',
          value2:'',
        },
        rules: {
            value1: [
                { required: true, message: '填写节点服务器名称', trigger: 'blur' }
            ],
            value2: [
                { required:true,message:'选择协调服务器列表',trigger:'change'}
            ]
        },
        xietiaolist:[]
    }
  },
  mounted(){
    this.init();
    this.serversCoordinationType();
  },
  methods: {
    //页面初始化
    init(){
        this.status = false;
        this.form.id=this.getdata.id;
        this.form.value1=this.getdata.serversName;
        this.form.value2=this.getdata.serversidC;
    },
    serversCoordinationType() {
      //加载协调服务器列表
      this.$api.serversCoordinationsearch().then(res =>{
        this.xietiaolist=[];
        if (res.success) {
          this.xietiaolist = res.data;
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
    //确认按钮 提交事件
    doSubmit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          //nodeServersID,coordinationServersID
          let param={
            nodeServersID:this.form.id,
            coordinationServersID:this.form.value2
          };
          this.$api.serversMappersave(param).then(res =>{
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
