<template>
<div>
   <el-form :model="form" :inline="true" :rules="rules" ref="form" label-width="130px" class="demo-ruleForm">
        <el-form-item label="房间标识"  prop="serverID">
          <el-input v-model.trim="form.serverID" size="small" placeholder="*填写房间标识" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="房间名称"  prop="serverName">
          <el-input v-model.trim="form.serverName" size="small"  placeholder="*填写房间名称" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="游戏标识"  prop="kindID">
          <el-input v-model.trim="form.kindID" size="small"  placeholder="*填写游戏标识" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="游戏名称"  prop="kindname" style="display: none">
          <el-input v-model.trim="form.kindname" size="small"  placeholder="*填写游戏名称" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="节点名字"  prop="nodeID">
          <el-input v-model.trim="form.nodeID" size="small"  placeholder="*填写节点名字" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="排序"  prop="sortID">
          <el-input v-model.trim="form.sortID" size="small"  placeholder="*填写排序" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="桌子数目" prop="tableCount">
          <el-input v-model.trim="form.tableCount" size="small"  placeholder="*填写桌子数目" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="房间类型" prop="serverType">
          <el-input v-model.trim="form.serverType" size="small"  placeholder="*填写房间类型" autocomplete="off" clearable></el-input>
        </el-form-item>

        <el-form-item label="房间端口" prop="serverPort">
          <el-input v-model.trim="form.serverPort" size="small"  placeholder="*填写房间端口" autocomplete="off" clearable></el-input>
        </el-form-item>

        <el-form-item label="最低积分" prop="minTableScore">
          <el-input v-model.trim="form.minTableScore" size="small"  placeholder="*填写最低积分" autocomplete="off" clearable></el-input>
        </el-form-item>

        <el-form-item label="最低进入积分" prop="minEnterScore">
          <el-input v-model.trim="form.minEnterScore" size="small"  placeholder="*填写最低进入积分" autocomplete="off" clearable></el-input>
        </el-form-item>

        <el-form-item label="最大进入积分" prop="maxEnterScore">
          <el-input v-model.trim="form.maxEnterScore" size="small" placeholder="*填写最大进入积分" autocomplete="off" clearable></el-input>
        </el-form-item>

        <el-form-item label="最小进入等级" prop="minEnterMember">
          <el-input v-model.trim="form.minEnterMember" size="small"  placeholder="*填写最小进入等级" autocomplete="off" clearable></el-input>
        </el-form-item>

        <el-form-item label="最大进入等级" prop="maxEnterMember">
          <el-input v-model.trim="form.maxEnterMember" size="small"  placeholder="*填写最大进入等级" autocomplete="off" clearable></el-input>
        </el-form-item>

        <el-form-item label="最大人数" prop="maxPlayer">
          <el-input v-model.trim="form.maxPlayer" size="small" placeholder="*填写最大人数" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="运行机器" prop="serviceMachine">
          <el-input v-model.trim="form.serviceMachine" size="small"  placeholder="*填写运行机器" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="冻结状态" prop="nullity">
           <el-select v-model="form.nullity" placeholder="*填写冻结状态" size="small" clearable>
            <el-option
              v-for="(list,index) in selectList.userStatusList"
              :key="index"
              :label="list.value"
              :value="list.key"
            ></el-option>
         </el-select>
        </el-form-item>

        <el-form-item label="房间规则" prop="serverRule">
          <el-input v-model.trim="form.serverRule" size="small" placeholder="*填写房间规则" autocomplete="off" clearable></el-input>
        </el-form-item>
      
        <el-form-item label="创建时间"  prop="createDateTime">
            <el-date-picker v-model="form.createDateTime" size="small" align="right" type="datetime" value-format="yyyy-MM-dd"
            format="yyyy-MM-dd"
            placeholder="请输入执行时间"
            clearable
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="修改时间"  prop="modifyDateTime">
            <el-date-picker v-model="form.modifyDateTime" size="small"
            align="right"
            type="datetime"
            value-format="yyyy-MM-dd"
            format="yyyy-MM-dd"
            placeholder="请输入执行时间"
            clearable
          ></el-date-picker>
        </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button  size="small" @click="cancel">取消</el-button>
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
        form: {
            serverID:'',
            serverName: '',
            kindID: '',
            kindname: '',
            nodeID: '',
            sortID:'',
            tableCount:'',
            serverType:'',
            serverPort:'',
            minTableScore:'',
            minEnterScore:'',
            maxEnterScore:'',
            minEnterMember:'',
            maxEnterMember:'',
            maxPlayer:'',
            serverRule:'',
            serviceMachine:'',
            nullity:'',
            createDateTime:'',
            modifyDateTime:''
        },
        rules: {
            serverID: [
                { required: true, message: '*填写房间标识', trigger: 'blur' }
            ],
            serverName: [
                {required:true,message:'*填写房间名称',trigger:'blur'}
            ],
            kindID: [
                { required: true, message: '*填写游戏标识', trigger: 'blur' }
            ],
            kindname: [
                { required: true, message: '*填写游戏名称', trigger: 'blur' }
            ],
            nodeID: [
                { required: true, message: '*填写节点名字', trigger: 'blur' }
            ],
            sortID: [
                { required: true, message: '*填写排序', trigger: 'blur' }
            ],
            tableCount: [
                { required: true, message: '*填写桌子数目', trigger: 'blur' }
            ],
            serverType: [
                { required: true, message: '*填写房间类型', trigger: 'blur' }
            ],
            serverPort:[
                { required: true, message: '*填写房间端口', trigger: 'blur' }
            ],
            minTableScore:[
                { required: true, message: '*填写最低积分', trigger: 'blur' }
            ],
            minEnterScore: [
                { required: true, message: '*填写最低进入积分', trigger: 'blur' }
            ],
            maxEnterScore: [
                { required: true, message: '*填写最大进入积分', trigger: 'blur' }
            ],
            minEnterMember: [
                { required: true, message: '*填写最小进入等级', trigger: 'blur' }
            ],
            maxEnterMember: [
                { required: true, message: '*填写最大进入等级', trigger: 'blur' }
            ],
            maxPlayer: [
                { required: true, message: '*填写最大人数', trigger: 'blur' }
            ],
            serverRule: [
                { required: true, message: '*填写房间规则', trigger: 'blur' }
            ],
            nullity:[
                { required: true, message: '*填写冻结状态', trigger: 'blur' }
            ],
            createDateTime:[
                { required: true, message: '*请输入创建时间', trigger: 'change' }
            ],
            modifyDateTime:[
                { required: true, message: '*请输入修改时间', trigger: 'blur' }
            ]
        }
    }
  },
  mounted(){
    this.init();
  },
  methods: {
    //编辑进入界面
    init(){
            this.form.serverID=this.getdata.serverID;
            this.form.serverName=this.getdata.serverName;
            this.form.kindID=this.getdata.kindID;
            this.form.kindname=this.getdata.kindname;
            this.form.nodeID=this.getdata.nodeID;
            this.form.sortID=this.getdata.sortID;
            this.form.tableCount=this.getdata.tableCount;
            this.form.serverType=this.getdata.serverType;
            this.form.serverPort=this.getdata.serverPort;
            this.form.minTableScore=this.getdata.minTableScore;
            this.form.minEnterScore=this.getdata.minEnterScore;
            this.form.maxEnterScore=this.getdata.maxEnterScore;
            this.form.minEnterMember=this.getdata.minEnterMember;
            this.form.maxEnterMember=this.getdata.maxEnterMember;
            this.form.maxPlayer=this.getdata.maxPlayer;
            this.form.serverRule=this.getdata.serverRule;
            this.form.serviceMachine=this.getdata.serviceMachine;
            this.form.nullity=(this.getdata.nullity).toString();
            this.form.createDateTime=this.moment(this.getdata.createDateTime).format("YYYY-MM-DD");
            this.form.modifyDateTime=this.moment(this.getdata.modifyDateTime).format("YYYY-MM-DD");
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
          this.$api.gameRoomInfomodify(this.form).then(res =>{
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
  margin:1% 0;
}
.el-form-item{
  width:auto;
  /* float: left; */
  margin-bottom:18px;
}
.el-date-editor.el-input, .el-date-editor.el-input__inner{
  width:200px;
}
.el-input, .el-select{
  margin-bottom:0px;
}
.el-select>.el-input{
  margin-bottom: 0px;
}
.dialog-footer{
  text-align: right;
  padding-right:3%;
  margin-bottom: 2%;
}
</style>
