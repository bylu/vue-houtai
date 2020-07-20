<template>
<div>
   <el-form :model="form" :inline="true" :rules="rules" ref="form" label-width="140px" class="demo-ruleForm">
        <el-form-item label="状态名字"  prop="value1">
          <el-input v-model.trim="form.value1" :readonly="status ? false : 'readonly'" size="small" placeholder="" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="状态显示名字"  prop="value2">
          <el-input v-model.trim="form.value2" size="small" placeholder="" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="状态数值"  prop="value3">
          <el-input v-model.trim="form.value3" size="small" placeholder="" autocomplete="off" clearable></el-input>
        </el-form-item>
        
        <el-form-item label="类型"  prop="value6">
          <el-select v-model="form.value6" size="small" placeholder="请选择">
            <el-option  v-for="list in selectList.addSystemStatusInfoList" :key="list.key" :label="list.value" :value="list.key"></el-option>
          </el-select>
        </el-form-item>
        <div class="el-form-item">
          <label for="checkedList" class="el-form-item__label" style="width: 130px;float:left;">部门列表:</label>
          <div style="width:78%;float:left;">
            <el-checkbox-group v-model="checkedList" size="small">
              <template v-for="(item,index) in departmentlist">
              <el-checkbox  :checked="item.checked" :label="item.id" :key="index">
                <span >{{item.name}}</span>
              </el-checkbox>
              </template>
            </el-checkbox-group>
          </div>
        </div>
        <div class="addSpecalcss">
          <el-form-item label="状态字符"  prop="value4">
            <el-input v-model="form.value4" type="textarea" style="width:310%" :autosize="{ minRows: 10, maxRows: 10}" size="small" placeholder="" autocomplete="off"></el-input>
          </el-form-item>
        </div>
        <div class="addSpecalcss">
          <el-form-item label="字符描述"  prop="value5">
            <el-input v-model="form.value5" type="textarea" style="width:310%" :autosize="{ minRows: 4, maxRows: 4}" size="small" placeholder="" autocomplete="off"></el-input>
          </el-form-item>
        </div>
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
      status:false,
      form: {
        id:'',
        value1:'',
        value2:'',
        value3:'',
        value4:'',
        value5:'',
        value6:'0',
      },
      checkedList:[],
      departmentlist:[],
      rules: {
          value1: [
              { required: true, message: '填写状态名字', trigger: 'blur' }
          ],
          value2: [
              { required:true,message:'填写状态显示名字',trigger:'blur'}
          ],
          value3: [
              { required: true, message: '填写状态数值', trigger: 'blur' }
          ],
          value4: [
              { required: true, message: '填写状态字符', trigger: 'blur' }
          ],
          value5: [
              { required: true, message: '填写状态描述', trigger: 'blur' }
          ],
          value6: [
              { required: true, message: '选择类型', trigger: 'change' }
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
      if(this.isAdd){    //添加时id=0
        this.status=true;
        this.form.id='0';
        this.$api.searchDepartment().then(res =>{
          this.loading = false;
          if (res.success) {
            this.departmentlist = res.data;
          }
        }).catch(err =>{
          this.$message({
            message: '请求失败!',
            type: "error"
          });
        })
      }else{
        //非游戏开关修改时id=2(即状态类型不是游戏功能开关时 id=2)
        this.status=false;
        this.form.id='2';
        this.form.value1=this.getdata.statusName;
        this.form.value2=this.getdata.statusTip;
        this.form.value3=this.getdata.statusValue;
        this.form.value4=this.getdata.statusString;
        this.form.value5=this.getdata.statusDescription;
        this.form.value6=(this.getdata.statusType).toString();
        this.departmentlist=this.getdata.lists;
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
          if((this.checkedList).toString() == ""){
              this.$message({
                message: '请选择部门',
                type: "error"
              });
              return
          }
          let param={
            id:this.form.id,
            statusName:this.form.value1,
            statusTip:this.form.value2,
            statusValue:this.form.value3,
            statusString:this.form.value4,
            statusDescription:this.form.value5,
            statusType:this.form.value6,
            departmentId: (this.checkedList).toString()
          }
          this.$api.systemStatusInfosaveOrUpdate(param).then(res =>{
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
  }
};
</script>

<style scoped>
.el-form{
  width:100%;
  float: left;
  margin:3% 0;
}
.el-form-item{
  width:auto;
  float: left;
  margin-bottom:20px;
}
.el-input{
  margin-bottom:0px;
}
.el-input{
  width:120%;
}
.el-select{
    width:90%;
}
.el-checkbox-group{
  width:100%;
}
.el-checkbox {
  width: auto;
  float: left;
  margin-right: 15px;
  margin-bottom:10px;
}
.el-checkbox__label {
  float: left;
  padding-left: 0;
}
.addSpecalcss{
  width:100%;
  float: left;
}
.dialog-footer{
  text-align: right;
  padding-right:3%;
  margin-bottom: 2%;
}
</style>
