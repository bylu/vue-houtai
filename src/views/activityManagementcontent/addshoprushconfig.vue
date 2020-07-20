<template>
<div>
   <el-form :model="form" :inline="true" :rules="rules" ref="form" label-width="130px" class="demo-ruleForm">
      <el-form-item label="id" prop="id" style="display:none;">
        <el-input v-model.trim="form.id"  placeholder="" autocomplete="off"></el-input>
      </el-form-item>
        <el-form-item label="商品名称"  prop="editgoodname">
          <el-input v-model.trim="form.editgoodname" size="small" placeholder="填写商品名称" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="活动金额"  prop="editgoodprice">
          <el-input v-model.trim="form.editgoodprice" size="small" placeholder="请输入活动金额" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="原始获取幸运豆"  prop="editinitluckbean">
          <el-input v-model.trim="form.editinitluckbean" size="small"  placeholder="请输入原始获取幸运豆" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="实际获取幸运豆"  prop="edithaveluckbean">
          <el-input v-model.trim="form.edithaveluckbean" size="small"  placeholder="请输入实际获取幸运豆" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="翻倍比例"  prop="editrate">
          <el-input v-model.trim="form.editrate" size="small"  placeholder="请输入翻倍比例" autocomplete="off"></el-input>
        </el-form-item>
        
        <el-form-item label="上/下午" prop="showtype" >
          <el-select v-model="form.showtype" size="small" placeholder="上午" >
            <el-option  v-for="list in selectList.dayinfolistAdd" :key="list.key" :label="list.value" :value="list.key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品上架数量" prop="editgoodsnum">
          <el-input v-model.trim="form.editgoodsnum" size="small"  placeholder="请输入商品上架数量" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="是否免费" prop="editisFree" >
          <el-select v-model="form.editisFree" size="small" placeholder="付费">
            <el-option  v-for="list in selectList.userpayornopayAdd" :key="list.key" :label="list.value" :value="list.key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品剩余数量"  prop="editlastnum">
          <el-input v-model.trim="form.editlastnum"  size="small" placeholder="请输入商品剩余数量" autocomplete="off" clearable></el-input>
        </el-form-item>
        
        <el-form-item label="执行时间"  prop="editdate">
            <el-date-picker v-model="form.editdate" align="right" size="small" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="请输入执行时间" clearable></el-date-picker>
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
  props: ['getdata','isAdd'],
  data() {
    return {
        loading: false,
        form: {
            id:'',
            editgoodname:'',
            editgoodprice: '',
            editinitluckbean: '',
            edithaveluckbean: '',
            editrate: '',
            editlastnum:'',
            editgoodsnum:'',
            editisFree:'2',
            showtype:'2',
            editdate:''
        },
        rules: {
            editgoodname: [
                { required: true, message: '填写商品名称', trigger: 'blur' }
            ],
            editgoodprice: [
                {required:true,message:'请输入活动金额',trigger:'blur',pattern: /(^[\d]|^[1-9][\d]*)($|[\.][\d]{0,2}$)/}
            ],
            editinitluckbean: [
                { required: true, message: '填写原始获取幸运豆', trigger: 'blur' }
            ],
            edithaveluckbean: [
                { required: true, message: '填写实际获取幸运豆', trigger: 'blur' }
            ],
            editrate: [
                { required: true, message: '填写翻倍比率', trigger: 'blur' }
            ],
            editlastnum: [
                { required: true, message: '填写商品剩余数量', trigger: 'blur' }
            ],
            editgoodsnum: [
                { required: true, message: '填写商品上架数量', trigger: 'blur' }
            ],
            editisFree: [
                { required: true, message: '请输入您的选择', trigger: 'change' }
            ],
            showtype:[
                { required: true, message: '请输入您的选择', trigger: 'change' }
            ]
        }
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
        this.form.editgoodname=this.getdata.shoptitle;
        this.form.editgoodprice=this.getdata.shopvalue;
        this.form.editinitluckbean=this.getdata.sourcegetscore;
        this.form.edithaveluckbean=this.getdata.lastgetscore;
        this.form.editrate=this.getdata.shopgetrate;
        this.form.editlastnum=this.getdata.surpluschange;
        this.form.editgoodsnum=this.getdata.totalchange;
        this.form.editisFree=(this.getdata.typeid).toString();
        this.form.showtype=(this.getdata.show).toString();
        this.form.editdate=this.moment(this.getdata.insertdate).format("YYYY-MM-DD HH:mm:ss");
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
          //shoptitle，shopvalue，sourcegetscore，lastgetscore，shopgetrate，surpluschange，totalchange，typeid，show，insertdate
          let url = this.paramUrl;
          let param={
            id:this.form.id,
            shoptitle:this.form.editgoodname,
            shopvalue:this.form.editgoodprice,
            sourcegetscore:this.form.editinitluckbean,
            lastgetscore:this.form.edithaveluckbean,
            shopgetrate:this.form.editrate,
            surpluschange:this.form.editlastnum,
            totalchange:this.form.editgoodsnum,
            typeid:this.form.editisFree,
            show:this.form.showtype,
            insertdate:this.form.editdate
          }
          this.$api.shopRushConfigaddOrUpdate(param).then(res =>{
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
  margin:2% 0;
}
.el-form-item{
  width:auto;
  float: left;
  margin-bottom:18px;
}
.el-input{
  margin-bottom:0px;
}
.el-date-editor.el-input, .el-date-editor.el-input__inner{
    width:100%;
  }
.dialog-footer{
text-align: right;
padding-right:3%;
margin-bottom: 2%;
}
</style>
