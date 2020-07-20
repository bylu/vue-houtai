<template>
  <div>
    <el-form :model="form" :inline="true" ref="form" :rules="rules"  label-width="190px" class="demo-ruleForm">
        <el-form-item label="id" prop="id" style="display:none;">
          <el-input v-model.trim="form.id"  placeholder="" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="GAME_ID" prop="value1">
          <el-select v-model="form.value1" placeholder="---请选择游戏---" size="small">
            <el-option v-for="list in gameTypeList" :key="list.key" :label="list.name" :value="list.gameId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="SPREADID" prop="value2">
            <el-input v-model.trim="form.value2" size="small" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="PLATFORM_TYPE" prop="value3">
          <el-select v-model="form.value3" placeholder="android" size="small">
            <el-option v-for="list in selectList.platFormTypeListAdd" :key="list.key" :label="list.value" :value="list.key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="ORDER_PREFIX" prop="value4">
          <el-input v-model.trim="form.value4" size="small" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="CPSF_ID" prop="value5">
          <el-select v-model="form.value5" placeholder="-请选择模板-" size="small">
            <el-option v-for="list in modulTypeList" :key="list.key" :label="list.serviceName" :value="list.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="IS_LOG" prop="value7">
          <el-select v-model="form.value7" placeholder="不打印日志" size="small">
            <el-option v-for="list in selectList.islogList" :key="list.key" :label="list.value" :value="list.key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="STATUS" prop="value8">
          <el-select v-model="form.value8" placeholder="正常" size="small">
            <el-option v-for="list in selectList.isStatusList" :key="list.key" :label="list.value" :value="list.key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="THIRO_CALLBACK_TYPE" prop="value9">
          <el-select v-model="form.value9" placeholder="get" size="small">
            <el-option v-for="list in selectList.thiroCallbackTypeList" :key="list.key" :label="list.value" :value="list.key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="SERVER_PARAMS" prop="value6" style="width:90%;">
          <el-input v-model="form.value6" size="small"  type="textarea" style="width:330%;" :autosize="{ minRows: 10, maxRows: 10}" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="NOTE" prop="value10" style="width:90%;">
          <el-input v-model="form.value10" size="small"  type="textarea" style="width:330%;" :autosize="{ minRows: 3, maxRows: 3}" autocomplete="off" ></el-input>
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel" size="small">取消</el-button>
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
        value1:'',
        value2:'',
        value3:'1',
        value4:'',
        value5:'',
        value6:'',
        value7:'0',
        value8:'0',
        value9:'1',
        value10:'',
        value11:''
      },
      rules: {
        value1: [
            { required: true, message: '选择游戏', trigger: 'blur' }
        ],
        value2: [
            { required: true, message: '填写渠道号', trigger: 'blur' }
        ],
        value3: [
            { required: true, message: '选择平台', trigger: 'blur' }
        ],
        value4: [
            { required: true, message: '填写订单前缀', trigger: 'blur' }
        ],
        value5: [
            { required: true, message: '选择模板', trigger: 'blur' }
        ],
        value6: [
            { required: true, message: '填写服务端配置参数', trigger: 'blur' }
        ],
        value7: [
            { required: true, message: '选择是否打印', trigger: 'blur' }
        ],
        value8: [
            { required: true, message: '选择状态', trigger: 'blur' }
        ],
        value9: [
            { required: true, message: '选择第三方回调接口接受方式', trigger: 'blur' }
        ],
        value10: [
            { required: true, message: '填写备注', trigger: 'blur' }
        ]
      },
      gameTypeList: [],
      modulTypeList: [],
    };
  },
  mounted() {
      this.init();
      this.channelPayServiceConfigreloadGameName();
      this.channelPayServiceCfgTempsearchTempAll();
  },
  methods: {
    init(){
        if(this.isAdd){
          this.form.value11=this.moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
        }else{
          this.form.id=this.getdata.id;
          this.form.value1=this.getdata.gameId;
          this.form.value2=this.getdata.spreadid;
          this.form.value3=(this.getdata.platformType).toString();
          this.form.value4=this.getdata.orderPrefix;
          this.form.value5=this.getdata.cpsfId;
          this.form.value6=this.getdata.serverParams;
          this.form.value7=(this.getdata.isLog).toString();
          this.form.value8=(this.getdata.status).toString();
          this.form.value9=(this.getdata.thirdCallbackType).toString();
          this.form.value10=this.getdata.note;
          this.form.value11=this.moment(this.getdata.insertDate).format("YYYY-MM-DD HH:mm:ss");
        }
    },
    channelPayServiceConfigreloadGameName() {
      //加载游戏名称
      this.$api.channelPayServiceConfigreloadGameName().then(res =>{
        this.gameTypeList=[];
        if (res.success) {
          this.gameTypeList = res.data.records;
        }
      }).catch(err =>{
        this.$message({
          message: '请求失败!',
          type: "error"
        });
      })
    },
    channelPayServiceCfgTempsearchTempAll() {
      //加载充值模板
      this.$api.channelPayServiceCfgTempsearchTempAll().then(res =>{
        this.modulTypeList=[];
        if (res.success) {
          this.modulTypeList = res.data.records;
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
          //shoptitle，shopvalue，sourcegetscore，lastgetscore，shopgetrate，surpluschange，totalchange，typeid，show，insertdate
          let param={
            id:this.form.id,
            gameId:this.form.value1,
            spreadid:this.form.value2,
            platformType:this.form.value3,
            orderPrefix:this.form.value4,
            cpsfId:this.form.value5,
            serverParams:this.form.value6,
            isLog:this.form.value7,
            status:this.form.value8,
            thirdCallbackType:this.form.value9,
            note:this.form.value10,
            insertDate:this.form.value11
          }
          this.$api.channelPayServiceConfigsaveOrUpdate(param).then(res =>{
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
  margin: 1% 0 2% 0;
}
.el-form-item {
  width: auto;
}
.el-select,.el-input{
  margin-bottom:0px;
}
.dialog-footer {
  text-align: right;
  padding-right: 3%;
  margin-bottom: 2%;
}
</style>
