<template>
<div>
   <el-form :model="form" :inline="true" :rules="rules" ref="form" label-width="130px" class="demo-ruleForm">
        <el-form-item label="比赛名称"  prop="matchName">
          <el-input v-model.trim="form.matchName" size="small" placeholder="" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="id:"  prop="id" style="display: none">
          <el-input v-model.trim="form.id" size="small" placeholder="" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="比赛人数"  prop="count">
          <el-input v-model.trim="form.count" size="small" placeholder="" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="比赛分类"  prop="classifyId">
          <el-select v-model="form.classifyId" size="small" placeholder="请选择" >
            <el-option  v-for="list in selectList.pkMatchList" :key="list.key" :label="list.value" :value="list.key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="初始化分数"  prop="inintScore">
          <el-input v-model.trim="form.inintScore" size="small" placeholder="" autocomplete="off" clearable></el-input>
        </el-form-item>

        <el-form-item label="倒计时"  prop="countdown">
          <el-input v-model.trim="form.countdown"  size="small" placeholder="" autocomplete="off" clearable></el-input>
        </el-form-item>

        <el-form-item label="持续时长"  prop="sustainedTime">
          <el-input v-model.trim="form.sustainedTime" size="small" placeholder="" autocomplete="off" clearable></el-input>
        </el-form-item>

        <el-form-item label="报名费"  prop="signUpFree">
          <el-input v-model.trim="form.signUpFree"  size="small" placeholder="" autocomplete="off" clearable></el-input>
        </el-form-item>

        <el-form-item label="排序"  prop="sort">
          <el-input v-model.trim="form.sort"  size="small" placeholder="" autocomplete="off" clearable></el-input>
        </el-form-item>

        <el-form-item label="金钱"  prop="selfScore" >
          <el-select v-model="form.selfScore" size="small" placeholder="请选择" >
            <el-option  v-for="list in selectList.pkMatchMoneyList" :key="list.key" :label="list.value" :value="list.key"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="描述"  prop="desp">
          <el-input v-model="form.desp"  size="small" placeholder="" autocomplete="off" clearable></el-input>
        </el-form-item>

        <el-form-item label="比赛开始时段"  prop="startTime">
          <el-date-picker v-model="form.startTime"
                          align="right"
                          size="small"
                          type="datetime"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          format="yyyy-MM-dd HH:mm:ss"
                          placeholder="" clearable
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="比赛结束时段"  prop="endTime" style="margin-left:-2%;">
          <el-date-picker v-model="form.endTime"
                          align="right"
                          size="small"
                          type="datetime"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          format="yyyy-MM-dd HH:mm:ss"
                          placeholder="" clearable
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="消耗描述"  prop="consumeDesp" style="margin-bottom:0px;">
          <el-input v-model.trim="form.consumeDesp"  size="small" placeholder="" autocomplete="off" clearable></el-input>
        </el-form-item>

        <el-form-item label="消耗配置"  prop="consume" style="margin-bottom:0px;">
          <el-input v-model="form.consume" style="width:160px;"  size="small" placeholder="" clearable autocomplete="off"></el-input>
          <el-button @click="btnXiaohaopeizhi" type="danger" size="small">选择</el-button>
        </el-form-item>

        <el-form-item label="规则标题"  prop="ruleTitle" style="margin-left:-2%;">
          <el-input v-model.trim="form.ruleTitle"  size="small" placeholder="" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="幸运豆限制"  prop="scoreLimit">
          <el-input v-model.trim="form.scoreLimit"  size="small" placeholder="" autocomplete="off" clearable></el-input>
        </el-form-item>
  
        <el-form-item label="挑战赛过关分数"  prop="tScorePass">
          <el-input v-model.trim="form.tScorePass"  size="small" placeholder="" autocomplete="off" clearable></el-input>
        </el-form-item>

        <el-form-item label="最低发炮数"  prop="fireLimit">
          <el-input v-model.trim="form.fireLimit"  size="small" placeholder="" autocomplete="off" clearable></el-input>
        </el-form-item>

        <el-form-item label="vip限制"  prop="vipLimit">
          <el-input v-model.trim="form.vipLimit"  size="small" placeholder="" autocomplete="off" clearable></el-input>
        </el-form-item>

        <el-form-item label="等级限制"  prop="levelLimit">
          <el-input v-model.trim="form.levelLimit"  size="small" placeholder="" autocomplete="off" clearable></el-input>
        </el-form-item>

        <el-form-item label="定时赛初始时间"  prop="dInitBeginTime">
          <el-date-picker v-model="form.dInitBeginTime"
            align="right"
            size="small"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            format="yyyy-MM-dd HH:mm:ss"
            placeholder="" clearable
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="定时赛间隔时间"  prop="dMinuteInterval">
          <el-input v-model.trim="form.dMinuteInterval"  size="small" placeholder="" autocomplete="off" clearable></el-input>
        </el-form-item>
      

        <div class="addSpecialcss">
          <el-form-item label="规则详情"  prop="ruleDesp">
            <el-input v-model.trim="form.ruleDesp"  type="textarea" style="width:490%" :autosize="{ minRows: 8, maxRows: 8}"   size="small" placeholder="" autocomplete="off"></el-input>
          </el-form-item>
        </div>

        <div class="addSpecialcss">
          <el-form-item label="提示"  prop="tips">
            <el-input v-model.trim="form.tips"  type="textarea" style="width:490%" :autosize="{ minRows: 3, maxRows:3}"   size="small" placeholder="" autocomplete="off"></el-input>
          </el-form-item>
        </div>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" size="small" @click="cancel">取消</el-button>
      <el-button :loading="loading" size="small" type="primary" @click="doSubmit">确认</el-button>
    </div>

    <pcModal v-if="propbagDialog"  width="50%" title="配置道具包" @closeModal="propbagDialog = false">
          <propbagModule  @changeData="updataData" @closedialog="propbagDialog = false"></propbagModule>
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
            id: '',
            classifyId: '',
            matchName: '',
            count: '',
            inintScore:'',
            countdown:'',
            sustainedTime:'',
            selfScore:'1',
            signUpFree:'',
            sort:'',
            desp:'',
            startTime:'',
            endTime:'',
            consumeDesp:'',
            consume:'',
            tips:'',
            ruleTitle:"",
            ruleDesp:'',
            dInitBeginTime:'',
            dMinuteInterval:'',
            tScorePass:'',
            fireLimit:'',
            vipLimit:'',
            levelLimit:'',
            scoreLimit:''
        },
        rules: {
          classifyId: [
                { required: true, message: '选择比赛分类', trigger: 'change' }
            ],
            matchName: [
                {required:true,message:'输入比赛名称',trigger:'blur',}
            ],
            count: [
                {required:true,message:'输入比赛人数',trigger:'blur',}
            ],
            inintScore: [
                {required:true,message:'输入初始化分数',trigger:'blur',}
            ],
            countdown: [
                {required:true,message:'输入倒计时',trigger:'blur',}
            ],
            sustainedTime: [
                {required:true,message:'输入持续时长',trigger:'blur',}
            ],
            selfScore: [
                { required: true, message:'选择金钱', trigger: 'change' }
            ],
            signUpFree: [
                {required:true,message:'输入报名费',trigger:'blur',}
            ],
            sort: [
                {required:true,message:'输入排序',trigger:'blur',}
            ],
            desp: [
                {required:true,message:'输入描述',trigger:'blur',}
            ],
            startTime: [
                {required:true,message:'输入比赛开始时段',trigger:'blur',}
            ],
            endTime: [
                {required:true,message:'输入比赛结束时段',trigger:'blur',}
            ],

            tips: [
                {required:true,message:'输入提示',trigger:'blur',}
            ],
            ruleTitle: [
                {required:true,message:'输入规则标题',trigger:'blur',}
            ],
            ruleDesp: [
                {required:true,message:'输入规则详情',trigger:'blur',}
            ],
            dMinuteInterval: [
                {required:true,message:'输入定时赛间隔时间',trigger:'blur',}
            ],
            tScorePass: [
                {required:true,message:'输入挑战赛过关分数',trigger:'blur',}
            ],
            fireLimit: [
                {required:true,message:'输入最低发炮数',trigger:'blur',}
            ],
            vipLimit: [
                {required:true,message:'输入VIP限制',trigger:'blur',}
            ],
            levelLimit: [
                {required:true,message:'输入等级限制',trigger:'blur',}
            ],
            scoreLimit: [
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
            this.form.id=this.getdata.id;
            this.form.classifyId=(this.getdata.classifyId).toString();
            this.form.matchName=this.getdata.matchName;
            this.form.count=this.getdata.count;
            this.form.inintScore=this.getdata.inintScore;
            this.form.countdown=this.getdata.countdown;
            this.form.sustainedTime=this.getdata.sustainedTime;
            this.form.selfScore=(this.getdata.selfScore).toString();
            this.form.signUpFree=this.getdata.signUpFree;
            this.form.sort=this.getdata.sort;
             this.form.desp=this.getdata.desp;
             this.form.startTime=this.moment(this.getdata.startTime).format("YYYY-MM-DD HH:mm:ss");
             this.form.endTime=this.moment(this.getdata.endTime).format("YYYY-MM-DD HH:mm:ss");
             this.form.consumeDesp=this.getdata.consumeDesp;
             this.form.consume=this.getdata.consume;
             this.form.tips=this.getdata.tips;
             this.form.ruleTitle=this.getdata.ruleTitle;
             this.form.ruleDesp=this.getdata.ruleDesp;
             this.form.dInitBeginTime=this.moment(this.getdata.dInitBeginTime).format("YYYY-MM-DD HH:mm:ss");
             this.form.dMinuteInterval=this.getdata.dMinuteInterval;
             this.form.tScorePass=this.getdata.tScorePass;
             this.form.fireLimit=this.getdata.fireLimit;
             this.form.vipLimit=this.getdata.vipLimit;
             this.form.levelLimit=this.getdata.levelLimit;
             this.form.scoreLimit=this.getdata.scoreLimit;
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
          this.$api.pkMatchConfigsaveConfig(this.form).then(res =>{
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
    updataData(data){
       // this.form.consume=data;
      var str=[];
      str=data.split("&");
      this.form.consume=str[0];
      //this.form.prizedesp=str[1];
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
  margin-bottom:16px;
}
.el-input{
  margin-bottom: 0px;
}
.el-select{
    width:90%;
}
.addSpecialcss{
  width:100%;
  float: left;
}
.dialog-footer{
  text-align: right;
  padding-right:3%;
  margin-bottom: 2%;
}
</style>
