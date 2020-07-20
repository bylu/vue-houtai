<template>
<div>
   <el-form :model="form" :inline="true" :rules="rules" ref="form" label-width="150px" class="demo-ruleForm">
        <el-form-item label="渠道标号"  prop="pkMatchvalue2">
          <el-input v-model.trim="form.pkMatchvalue2" size="small" placeholder="" autocomplete="off" clearable></el-input>
        </el-form-item>

        <el-form-item label="渠道分类"  prop="pkMatchvalue1" >
          <el-select v-model="form.pkMatchvalue1" size="small" placeholder="请选择" >
            <el-option  v-for="list in selectList.qudaosortList" :key="list.key" :label="list.value" :value="list.key"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="版本类型"  prop="pkMatchvalue1" >
          <el-select v-model="form.pkMatchvalue1" size="small" placeholder="请选择" >
            <el-option  v-for="list in selectList.banbenTypeList" :key="list.key" :label="list.value" :value="list.key"></el-option>
          </el-select>
        </el-form-item>


        <el-form-item label="版本号"  prop="pkMatchvalue3">
          <el-input v-model.trim="form.pkMatchvalue3" size="small" placeholder="" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="渠道推广员ID"  prop="pkMatchvalue4">
          <el-input v-model.trim="form.pkMatchvalue4" size="small" placeholder="" autocomplete="off" clearable></el-input>
        </el-form-item>
    
        <el-form-item label="包名"  prop="pkMatchvalue5">
          <el-input v-model.trim="form.pkMatchvalue5"  size="small" placeholder="" autocomplete="off" clearable></el-input>
        </el-form-item>

        <el-form-item label="下载地址"  prop="pkMatchvalue6">
          <el-input v-model.trim="form.pkMatchvalue6" size="small" placeholder="" autocomplete="off" clearable></el-input>
        </el-form-item>

        <el-form-item label="微信KEY"  prop="pkMatchvalue8">
          <el-input v-model.trim="form.pkMatchvalue8"  size="small" placeholder="" autocomplete="off" clearable></el-input>
        </el-form-item>

        <el-form-item label="升级控制版本号"  prop="pkMatchvalue8">
          <el-input v-model.trim="form.pkMatchvalue8"  size="small" placeholder="" autocomplete="off" clearable></el-input>
        </el-form-item>

        <el-form-item label="version_code"  prop="pkMatchvalue9">
          <el-input v-model.trim="form.pkMatchvalue9"  size="small" placeholder="" autocomplete="off" clearable></el-input>
        </el-form-item>

        <el-form-item label="最后更新时间"  prop="pkMatchvalue18">
          <el-date-picker v-model="form.pkMatchvalue18"
            align="right"
            size="small"
            type="datetime"
            value-format="yyyy-MM-dd"
            format="yyyy-MM-dd"
            placeholder="" clearable
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="分享链接"  prop="pkMatchvalue11">
          <el-input v-model.trim="form.pkMatchvalue11"  size="small" clearable placeholder="格式：00:00:00" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="渠道标识"  prop="pkMatchvalue12">
          <el-input v-model="form.pkMatchvalue12"  size="small" clearable placeholder="格式：00:00:00" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="是否接SDK"  prop="pkMatchvalue13">
         <el-radio-group v-model="form.nullity" size="small">
            <el-radio label="0">是</el-radio>
            <el-radio label="1">否</el-radio>
          </el-radio-group>
        </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" size="small" @click="cancel">取消</el-button>
      <el-button :loading="loading" size="small" type="primary" @click="doSubmit">确认</el-button>
    </div>

</div>
</template>

<script>
export default {
  name: "",
  props: [],
  data() {
    return {
        loading: false,
        form: {
            pkMatchvalue1:'',
            pkMatchvalue2: '',
            pkMatchvalue3: '',
            pkMatchvalue4: '',
            pkMatchvalue5: '',
            pkMatchvalue6:'',
            pkMatchvalue7:'',
            pkMatchvalue8:'',
            pkMatchvalue9:'',
            pkMatchvalue10:'',
            pkMatchvalue11:'',
            pkMatchvalue12:'',
            pkMatchvalue13:'',
            pkMatchvalue14:'',
            pkMatchvalue15:'',
            pkMatchvalue16:'',
            pkMatchvalue17:'',
            pkMatchvalue18:new Date(),
            pkMatchvalue19:'',
            pkMatchvalue20:'',
            pkMatchvalue21:'',
            pkMatchvalue22:'',
            pkMatchvalue23:'',
            pkMatchvalue24:'',
        },
        rules: {
            pkMatchvalue1: [
                { required: true, message: '选择比赛分类', trigger: 'change' }
            ],
            pkMatchvalue2: [
                {required:true,message:'输入比赛名称',trigger:'blur',}
            ],
            pkMatchvalue3: [
                {required:true,message:'输入比赛人数',trigger:'blur',}
            ],
            pkMatchvalue4: [
                {required:true,message:'输入初始化分数',trigger:'blur',}
            ],
            pkMatchvalue5: [
                {required:true,message:'输入倒计时',trigger:'blur',}
            ],
            pkMatchvalue6: [
                {required:true,message:'输入持续时长',trigger:'blur',}
            ],
            pkMatchvalue7: [
                { required: true, message:'选择金钱', trigger: 'change' }
            ],
            pkMatchvalue8: [
                {required:true,message:'输入报名费',trigger:'blur',}
            ],
            pkMatchvalue9: [
                {required:true,message:'输入排序',trigger:'blur',}
            ],
            pkMatchvalue10: [
                {required:true,message:'输入描述',trigger:'blur',}
            ],
            pkMatchvalue11: [
                {required:true,message:'输入比赛开始时段',trigger:'blur',}
            ],
            pkMatchvalue12: [
                {required:true,message:'输入比赛结束时段',trigger:'blur',}
            ],
            pkMatchvalue13: [
                {required:true,message:'输入消耗描述',trigger:'blur',}
            ],
            pkMatchvalue14: [
                {required:true,message:'输入消耗配置',trigger:'blur',}
            ],
            pkMatchvalue15: [
                {required:true,message:'输入提示',trigger:'blur',}
            ],
            pkMatchvalue16: [
                {required:true,message:'输入规则标题',trigger:'blur',}
            ],
            pkMatchvalue17: [
                {required:true,message:'输入规则详情',trigger:'blur',}
            ],
            pkMatchvalue19: [
                {required:true,message:'输入定时赛间隔时间',trigger:'blur',}
            ],
            pkMatchvalue20: [
                {required:true,message:'输入挑战赛过关分数',trigger:'blur',}
            ],
            pkMatchvalue21: [
                {required:true,message:'输入最低发炮数',trigger:'blur',}
            ],
            pkMatchvalue22: [
                {required:true,message:'输入VIP限制',trigger:'blur',}
            ],
            pkMatchvalue23: [
                {required:true,message:'输入等级限制',trigger:'blur',}
            ],
            pkMatchvalue24: [
                {required:true,message:'输入幸运豆限制',trigger:'blur',}
            ],
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

      }else{
        // this.form.editgoodname=this.getdata.shoptitle;
        // this.form.editgoodprice=this.getdata.shopvalue;
        // this.form.editinitluckbean=this.getdata.sourcegetscore;
        // this.form.edithaveluckbean=this.getdata.lastgetscore;
        // this.form.editrate=this.getdata.shopgetrate;
        // this.form.editlastnum=this.getdata.surpluschange;
        // this.form.editgoodsnum=this.getdata.totalchange;
        // this.form.editisFree=this.getdata.typeid;
        // this.form.showtype=this.getdata.show;
        // this.form.editdate=this.getdata.insertdate;
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
          let url = this.paramUrl;
          let param={
            // shoptitle:this.form.editgoodname,
            // shopvalue:this.form.editgoodprice,
            // sourcegetscore:this.form.editinitluckbean,
            // lastgetscore:this.form.edithaveluckbean,
            // shopgetrate:this.form.editrate,
            // surpluschange:this.form.editlastnum,
            // totalchange:this.form.editgoodsnum,
            // typeid:this.form.editisFree,
            // show:this.form.showtype,
            // insertdate:this.form.editdate
          }
          // this.$api.shopRushConfigaddOrUpdate(param).then(res =>{
          //   this.loading = false;
          //   if (res.success) {
          //     this.resetForm();
          //     this.$message({
          //       message: res.message,
          //       type: "success"
          //     });
          //     this.$emit('shuaxin');
          //     this.$emit('closedialog');
          //   }else{
          //     this.$message({
          //       message: res.message,
          //       type: "error"
          //     });
          //   }
          // }).catch(err =>{
          //   this.$message({
          //     message: '请求失败!',
          //     type: "error"
          //   });
          // })
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
    updataData(data){
        this.form.pkMatchvalue14=data;
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
