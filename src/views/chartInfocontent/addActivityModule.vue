<template>
<div>
   <el-form :model="form" :inline="true" :rules="rules" ref="form" label-width="150px" class="demo-ruleForm">
    <el-form-item label="活动名称" prop="value1">
      <el-input v-model.trim="form.value1" size="small" placeholder="" autocomplete="off" clearable></el-input>
    </el-form-item>

    <el-form-item label="渠道名称" prop="value2">
      <el-select v-model="form.value2" size="small" placeholder="请选择" autocomplete="off" clearable> 
       <el-option
               v-for="(list,index) in this.spreaderRateInfoData"
               :key="index"
               :label="list.accounts"
               :value="list.userID"
             ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="开始时间" prop="value3">
      <el-date-picker v-model="form.value3" align="right" size="small" type="date" placeholder=""></el-date-picker>
    </el-form-item>

    <el-form-item label="结束时间" prop="value4">
        <el-date-picker v-model="form.value4" align="right" size="small" type="date" placeholder=""></el-date-picker>
    </el-form-item>

    <el-form-item label="活动状态" prop="value5">
      <el-radio-group v-model="form.value5" size="small">
        <el-radio label="1">进行中</el-radio>
        <el-radio label="0">已结束</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="备注" prop="value6">
      <el-input v-model.trim="form.value6" size="small" placeholder="" autocomplete="off"></el-input>
    </el-form-item>
    
   </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" size="small" @click="cancel">关闭</el-button>
      <el-button :loading="loading" size="small" type="primary" @click="doSubmit">保存</el-button>
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
            value1:'',
            value2:'',
            value3:'',
            value4:'',
            value5:'1',
            value6:''
        },
        rules: {
            value1: [
                { required: true, message: '填写活动名称', trigger: 'blur' }
            ],
            value2: [
                {required:  true, message:'请选择渠道名称',trigger:'blur' }
            ],
            value3: [
                { required: true, message: '请选择您的开始时间', trigger: 'blur' }
            ],
            value4: [
                { required: true, message: '请选择您的结束时间', trigger: 'blur' }
            ],
            value5: [
                { required: true, message: '请选择活动状态', trigger: 'blur' }
            ],
        },
        spreaderRateInfoData:[]
    }
  },
  mounted(){
    this.init();
    this.searchSpreaderRateInfoData()
  },
  methods: {
    //新增和编辑今日入页面初始化
    init(){
      if(this.isAdd){

      }else{
        this.form.value1=this.getdata.name;
        this.form.value2=this.getdata.spreaderName;
        this.form.value3= this.moment(this.getdata.beginDate).format("YYYY-MM-DD");
        this.form.value4=this.moment(this.getdata.endDate).format("YYYY-MM-DD");
        this.form.value5=(this.getdata.state).toString();
        this.form.value6=this.getdata.remarks;
      }
    },
    searchSpreaderRateInfoData() {
        //加载渠道下拉框列表
        this.$http({
          url: this.paramUrl.onlineOrderfindAllSpread,
          method: "post",
          data: {}
        }).then(res => {
          if (res.success) {
            this.spreaderRateInfoData = res.data;
          }
        });
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
          let param={
            name:this.form.value1,
            spreaderName:this.form.value2,
            beginDate:this.moment(this.form.value3).format("YYYY-MM-DD"),
            endDate:this.moment(this.form.value4).format("YYYY-MM-DD"),
            state:this.form.value5,
            remarks:this.form.value6
          }
        
          this.$http({
            url:this.paramUrl.promotionsaveOrUpdate,
            method: "post",
            data: param,
            headers: { "Content-Type": "application/json;charset=UTF-8" }
          }).then(res => {
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
              // this.resetForm();
              this.$message({
                message: res.message,
                type: "error"
              });
              // this.$emit('closedialog');
            }
          });
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
