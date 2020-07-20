<template>
<div>
   <el-form :model="form" :inline="true" :rules="rules" ref="form" label-width="120px" class="demo-ruleForm">
        <el-form-item label="classifyId"  prop="classifyId" style="display:none;">
          <el-input v-model.trim="form.classifyId" size="small" placeholder="" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="matchConfigId"  prop="matchConfigId" style="display:none;">
          <el-input v-model.trim="form.matchConfigId" size="small" placeholder="" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="最低名次"  prop="ranking" >
          <el-input v-model.trim="form.ranking" size="small" placeholder="" autocomplete="off" clearable></el-input>
        </el-form-item>

       <el-form-item label="最高名次"  prop="maxranking">
          <el-input v-model.trim="form.maxranking" size="small" placeholder="" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="分数"  prop="score">
          <el-input v-model.trim="form.score" size="small" placeholder="" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="奖券"  prop="retailVouchers">
          <el-input v-model.trim="form.retailVouchers" size="small" placeholder="" autocomplete="off" clearable></el-input>
        </el-form-item>

        <el-form-item label="经验"  prop="experience">
          <el-input v-model.trim="form.experience"  size="small" placeholder="" autocomplete="off" clearable></el-input>
        </el-form-item>


        <el-form-item label="配置"  prop="items">
          <el-input v-model="form.items"  size="small" placeholder="" autocomplete="off"></el-input>
          <el-button @click="btnXiaohaopeizhi" type="danger" size="small">选择</el-button>
        </el-form-item>

        <el-form-item label="配置描述"  prop="prizedesp" style="margin-top:10px;">
          <el-input v-model="form.prizedesp"  style="width:300px;" type="textarea" :autosize="{ minRows: 4, maxRows: 4}" disabled  size="small" placeholder="" autocomplete="off"></el-input>
        </el-form-item>


    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button  size="small" @click="cancel">取消1</el-button>
      <el-button :loading="loading" size="small" type="primary" @click="doSubmit">确认1</el-button>
    </div>

    <pcModal v-if="propbagDialog"  width="30%" title="配置道具包" @closeModal="propbagDialog = false">
          <propbagModule  @changeData="updateData"  @closedialog="propbagDialog = false"></propbagModule>
    </pcModal>
</div>
</template>

<script>
export default {
  name: "",
  props: ['getdata','isAdd'],
  components:{
      propbagModule:() => import('./propbagModule.vue'),
  },
  data() {
    return {
        loading: false,
        form: {
            classifyId:"0",
            matchConfigId:"",
            ranking:'',
            maxranking: '',
            score: '',
            retailVouchers: '',
            experience: '',
            items:'',
            prizedesp:''
        },
        rules: {
            ranking: [
                { required: true, message: '输入最低名次', trigger: 'blur' }
            ],
            maxranking: [
                {required:true,message:'输入最高名次',trigger:'blur',}
            ],
            score: [
                {required:true,message:'分数',trigger:'blur',}
            ],
            retailVouchers: [
                {required:true,message:'奖券',trigger:'blur',}
            ],
            experience: [
                {required:true,message:'经验',trigger:'blur',}
            ],
            items: [
                {required:true,message:'配置',trigger:'blur',}
            ],
            prizedesp: [
                { required: true, message:'描述', trigger: 'blur' }
            ]
        },
        propbagDialog:false,
    }
  },
  mounted(){
    this.init();
  },
  methods: {
    //新增和编辑今日入页面初始化
    init(){

      if(this.isAdd){
        this.form.matchConfigId=this.getdata;
      }else{
        this.form.classifyId=this.getdata.classifyId;
        this.form.matchConfigId=this.getdata.matchConfigId;
        this.form.ranking=this.getdata.ranking;
        this.form.maxranking=this.getdata.maxranking;
        this.form.score=this.getdata.score;
        this.form.retailVouchers=this.getdata.retailVouchers;
        this.form.experience=this.getdata.experience;
        this.form.items=this.getdata.items;
        this.form.prizedesp=this.getdata.prizedesp;
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
          this.$api.pkMatchConfigsaveMatchPrize(this.form).then(res =>{
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
    },
    btnXiaohaopeizhi(){
        this.propbagDialog=true;
    },
    updateData(data){
      var str=[];
      str=data.split("&");
      this.form.items=str[0];
      this.form.prizedesp=str[1];
    },

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
  /* float: left; */
  margin-bottom:16px;
}
.el-input{
  margin-bottom: 0px;
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
