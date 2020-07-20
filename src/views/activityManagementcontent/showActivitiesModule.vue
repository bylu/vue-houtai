<template>
<div>
   <el-form :model="form" :inline="true" :rules="rules" ref="form" label-width="150px" class="demo-ruleForm">
        <el-form-item label="id" prop="id" style="display:none;">
          <el-input v-model.trim="form.id"  placeholder="" autocomplete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="活动名字" prop="value1">
          <el-input v-model.trim="form.value1" :readonly="addhuodongname ? false : 'readonly'" size="small" placeholder="" autocomplete="off"></el-input>
        </el-form-item> -->
        <el-form-item label="活动名称" prop="value1" style="width:100%;">
          <el-input v-model.trim="form.value1" size="small" placeholder="" autocomplete="off" style="width:295%" clearable></el-input>
        </el-form-item>
        <el-form-item label="活动类型" prop="value2" style="width:100%;float:left;">
          <el-select v-model="form.value2" size="small" placeholder="请选择" style="width:524px" @change="watchSelect(form.value2)">
            <el-option v-for="(list,index) in allActivitiesList" :key="'info2-'+index" :label="list.value" :value="list.key"></el-option>
          </el-select>
          <el-input v-model.trim="form.activeId"  size="small" style="width:60px;" @keyup.native="changeSelect(form.activeId)" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="最低vip" prop="value5" style="margin-bottom:0px;">
          <el-input v-model.trim="form.value5" size="small" placeholder="" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="开始时间" prop="value3" style="margin-bottom:0px;">
          <el-date-picker v-model="form.value3" align="right" clearable size="small" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder=""></el-date-picker>
        </el-form-item>
        <el-form-item label="最低等级" prop="value6" style="margin-bottom:0px;">
          <el-input v-model.trim="form.value6" size="small" placeholder="" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="结束时间" prop="value4" style="margin-bottom:0px;">
          <el-date-picker v-model="form.value4" align="right" size="small" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="" clearable></el-date-picker>
        </el-form-item>

       <el-form-item label="开启渠道" prop="value11" style="margin-bottom:0px;">
          <el-input v-model.trim="form.value11" size="small" placeholder="" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="最小注册时间" prop="value8" style="margin-bottom:0px;">
          <el-date-picker v-model.trim="form.value8" align="right" size="small" type="date" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="" clearable></el-date-picker>
        </el-form-item>
        <el-form-item label="资源ID" prop="value16" style="margin-bottom:0px;">
           <el-input v-model.trim="form.value16" size="small" placeholder="" autocomplete="off" clearable></el-input>
        </el-form-item>

         <el-form-item label="是否需要完成首充" prop="value7" style="margin-bottom:0px;">
          <el-select v-model="form.value7" size="small" placeholder="请选择">
            <el-option v-for="list in selectList.isPayFirstoList" :key="list.key" :label="list.value" :value="list.key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时效道具" prop="value9" style="margin-bottom:0px;" >
          <el-input v-model.trim="form.value9" size="small" placeholder="多个道具时用逗号隔开" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="时效道具过期时间" prop="value10" style="margin-bottom:0px;">
          <el-date-picker v-model="form.value10" align="right" size="small" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="" clearable></el-date-picker>
        </el-form-item>
         <el-form-item label="活动提示" prop="value15" style="width:100%;margin-bottom:0px;">
          <el-input v-model.trim="form.value15" type="textarea" style="width:312%" :autosize="{ minRows: 1, maxRows: 1}" size="small" placeholder="" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动时间" prop="value14" style="width:100%;margin-bottom:5px;">
          <el-input v-model="form.value14" type="textarea" style="width:312%" :autosize="{ minRows: 1, maxRows: 1}" size="small" placeholder="" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="配置信息json" prop="value12" style="width:100%;margin-bottom:5px;">
          <el-input v-model="form.value12" type="textarea" style="width:312%" :autosize="{ minRows: 3, maxRows: 3}" size="small" placeholder="" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="奖励信息json" prop="value13" style="width:100%;margin-bottom:5px;">
          <el-input v-model="form.value13" type="textarea" style="width:312%" :autosize="{ minRows: 3, maxRows: 3}" size="small" placeholder="" autocomplete="off"></el-input>
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
  props: ['getdata','isAdd'],
  data() {
    return {
        loading: false,
        form: {
          id:'',
          value1:'',
          value2:'',
          value3:this.moment(new Date(new Date().setHours(0, 0, 0, 0))).format("YYYY-MM-DD HH:mm:ss"),
          value4:this.moment(new Date(new Date().setHours(0, 0, 0, 0))).format("YYYY-MM-DD HH:mm:ss"),
          value5:'',
          value6:'',
          value7:'0',
          value8:'',
          value9:'',
          value10:'',
          value11:'',
          value12:'',
          value13:'',
          value14:'',
          value15:'',
          value16:'',
          activeId:''
        },
        rules: {
          value1:[
            {required:true,message:'填写活动名字',trigger:'blur'}
          ],
          value2:[
            {required:true,message:'选择活动类型',trigger:'change'}
          ],
          value5:[
            {required:true,message:'填写最低vip',trigger:'blur'}
          ],
          value6:[
            {required:true,message:'填写最低等级',trigger:'blur'}
          ]
        },
        allActivitiesList: [],
        // addhuodongname:false
    }
  },
  mounted(){
    this.init();
    this.activitiesreloadType();
  },
  methods: {
    //新增和编辑今日入页面初始化
    init(){
      if(this.isAdd){
        // this.addhuodongname=true;
      }else{
        this.form.id=this.getdata.id;
        this.form.value1=this.getdata.name;
        this.form.activeId=this.getdata.type;
        this.form.value2=(this.getdata.type).toString();
        this.form.value3=this.getdata.beginTime;
        this.form.value4=this.getdata.endTime;
        this.form.value5=this.getdata.vipLimit;
        this.form.value6=this.getdata.levelLimit;
        this.form.value7=(this.getdata.needFirstCharge).toString();
        this.form.value8=this.getdata.minRegisteTime;
        this.form.value9=this.getdata.timeLimitItems;
        this.form.value10=this.getdata.timeLimitItemExpireTime;
        this.form.value11=this.getdata.channel;
        this.form.value12=this.getdata.config;
        this.form.value13=this.getdata.awards;
        this.form.value14=this.getdata.timeStr;
        this.form.value15=this.getdata.tips;
        this.form.value16=this.getdata.resourceId;
        // this.addhuodongname=false;
      }
    },
    activitiesreloadType() {
      //加载活动类型
      this.$api.activitiesreloadTypeSelect().then(res =>{
        this.allActivitiesList=[];
        if (res.success) {
          this.allActivitiesList = res.data.records;
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
          let param={
            id:this.form.id,
            name:this.form.value1,
            type:this.form.value2,
            beginTime:this.form.value3,
            endTime:this.form.value4,
            vipLimit:this.form.value5,
            levelLimit:this.form.value6,
            needFirstCharge:this.form.value7,
            minRegisteTime:this.form.value8,
            timeLimitItems:this.form.value9,
            timeLimitItemExpireTime:this.form.value10,
            channel:this.form.value11,
            config:this.form.value12,
            awards:this.form.value13,
            timeStr:this.form.value14,
            tips:this.form.value15,
            resourceId:this.form.value16
          }
          this.$api.activitiesadd(param).then(res =>{
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
    /**
     * 活动类型下拉框绑定后面的input值
     */
    watchSelect(val){
      this.form.activeId=val;
    },
    /**
     * 输入input  绑定 select值
     */
    changeSelect(val){
      this.form.value2=val;
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
  float: left;
  margin-bottom:18px;
}
.el-select,.el-input{
  margin-bottom:0px;
}
.el-date-editor.el-input, .el-date-editor.el-input__inner{
    width:100%;
  }
.el-select,.el-date-editor{
    width:90%;
}
.dialog-footer{
  text-align: right;
  padding-right:3%;
  margin-bottom: 2%;
}
</style>
