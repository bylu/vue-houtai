<template>
<div>
   <el-form :model="form" :inline="true" :rules="rules" ref="form" label-width="120px" class="demo-ruleForm">
        <el-form-item label="id" prop="id" style="display:none;">
          <el-input v-model="form.id" size="small" placeholder="" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动名称" prop="name" style="width:100%">
          <el-input v-model.trim="form.name" size="small" style="width:284%;" placeholder="" autocomplete="off" clearable></el-input>
        </el-form-item>
       
        <el-form-item label="活动类型" prop="type" style="width:100%">
          <el-select v-model="form.type" size="small" placeholder="全部"  style="width:462px" @change="watchSelect(form.type)">
            <el-option v-for="list in allActivitiesList" :key="list.key" :label="list.value" :value="list.key"></el-option>
          </el-select>
          <el-input v-model.trim="form.activeId"  size="small" style="width:100px;" @keyup.native="changeSelect(form.activeId)" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否开放" prop="open" style="margin-bottom:0px;">
          <el-radio-group v-model="form.open" size="small">
              <el-radio label="true">是&nbsp;&nbsp;&nbsp;</el-radio>
              <el-radio label="false">否&nbsp;&nbsp;</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="开始时间" prop="showBegin" style="margin-left:9.5%;margin-bottom:0px;">
            <el-date-picker v-model="form.showBegin" align="right" size="small" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder=""></el-date-picker>
        </el-form-item>
        <el-form-item label="指定" prop="phone" style="margin-bottom:0px;" >
         <el-radio-group v-model="form.phone" size="small">
            <el-radio label="0">全部</el-radio>
            <el-radio label="1">苹果</el-radio>
            <el-radio label="2">安卓</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="结束时间" prop="showEnd" style="margin-bottom:0px;">
          <el-date-picker v-model="form.showEnd" align="right" size="small"  type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder=""></el-date-picker>
        </el-form-item>
        <el-form-item label="红点"  prop="reddot" style="margin-bottom:0px;">
          <el-radio-group v-model="form.reddot" size="small">
              <el-radio label="true">显示</el-radio>
              <el-radio label="false">不显示</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="排序号" prop="sortorder" style="margin-left:6.5%;">
           <el-input v-model.trim="form.sortorder" size="small" placeholder="" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="版本限定" prop="version" style="width:100%;margin-bottom:0px;">
          <el-select v-model="form.version" size="small" placeholder="请选择" style="width:100px">
            <el-option  v-for="list in selectList.versioninfolist" :key="list.key" :label="list.value" :value="list.key"></el-option>
          </el-select>
          <el-input style="width:462px;" v-model.trim="form.versioninfo" placeholder="填写版本号" size="small" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="渠道限定" prop="channel" style="width:100%;margin-bottom:0px;">
          <el-select v-model="form.channel" size="small" placeholder="请选择" style="width:100px">
            <el-option v-for="list in selectList.qudaoLimitlist" :key="list.key" :label="list.value" :value="list.key"></el-option>
          </el-select>
           <el-input style="width:462px;" v-model.trim="form.channelinfo" placeholder="填写渠道号" size="small" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="所属活动" prop="actid" style="margin-bottom:0px;">
          <el-select v-model="form.actid" size="small" placeholder="全部" style="width:462px" @change="watchSelect1(form.actid)">
            <el-option  v-for="list in belongActivitiesList" :key="list.key" :label="list.name" :value="list.id"></el-option>
          </el-select>
          <el-input v-model.trim="form.belongActivitiesid"  size="small" style="width:100px;" @keyup.native="changeSelect1(form.belongActivitiesid)" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="扩展信息" prop="extraInfo" style="width:100%;margin-bottom:0px;">
          <el-input v-model="form.extraInfo" type="textarea" style="width:300%;" :autosize="{ minRows: 5, maxRows: 5}" size="small" placeholder="" autocomplete="off"></el-input>
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
          id:"",
          name:'',
          type:'',
          showBegin:this.moment(new Date(new Date().setHours(0, 0, 0, 0))).format("YYYY-MM-DD HH:mm:ss"),
          showEnd:this.moment(new Date(new Date().setHours(0, 0, 0, 0))).format("YYYY-MM-DD HH:mm:ss"),
          open:'true',
          phone:'0',
          extraInfo:'',
          version:'0',
          versioninfo:'',
          channel:'0',
          channelinfo:'',
          sortorder:'',
          actid:'',
          reddot:'true',
          activeId:'',
          belongActivitiesid:''
        },
        rules: {
          name:[
            {required:true,message:'填写名字',trigger:'blur'}
          ],
          type:[
            {required:true,message:'选择类型',trigger:'change'}
          ], 
          sortorder:[
            {required:true,message:'填写排序号',trigger:'blur'}
          ],
        },
        allActivitiesList: [],
        belongActivitiesList: [],
    }
  },
  mounted(){
    this.init();
    this.activitiesreloadType();
    this.activitiesreloadActId();
  },
  methods: {
    //新增和编辑今日入页面初始化
    init(){
      if(this.isAdd){

      }else{
        this.form.id=this.getdata.id;
        this.form.name=this.getdata.name;
        this.form.type=(this.getdata.type).toString();
        this.form.activeId=this.getdata.type;
        this.form.showBegin=this.moment(this.getdata.showBegin).format("YYYY-MM-DD HH:mm:ss");
        this.form.showEnd=this.moment(this.getdata.showEnd).format("YYYY-MM-DD HH:mm:ss");
        this.form.open=(this.getdata.open).toString();
        this.form.phone=(this.getdata.phone).toString();
        this.form.extraInfo=this.getdata.extraInfo;
        if(this.getdata.version == null || this.getdata.version == '' || this.getdata.version == '0'){
          this.form.version = '0';
        }else{
          let a =this.getdata.version.split('#');
          this.form.version=a[0];
          this.form.versioninfo=a[1];
        }
        if(this.getdata.channel == null || this.getdata.channel == '' || this.getdata.channel == '0'){
          this.form.channel = '0';
        }else{
         // this.form.channel=(this.getdata.channel).toString();
          let a =this.getdata.channel.split('#');
          this.form.channel=(a[0]);
          this.form.channelinfo=a[1];
        }
        this.form.sortorder=this.getdata.sortorder;
        this.form.actid=this.getdata.actid;
        this.form.belongActivitiesid=this.getdata.actid;
        this.form.reddot=(this.getdata.reddot).toString();
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
    activitiesreloadActId() {
      //加载所属活动
      this.$api.activitiesreloadActIdSelect().then(res =>{
        this.belongActivitiesList=[];
        if (res.success) {
          this.belongActivitiesList = res.data;
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
          let setversion;
          let setChannel;
          if(this.form.version  == '0' || this.form.versioninfo == ""){
              setversion='';
          }else{
            setversion=this.form.version+"#"+this.form.versioninfo;
          }

          if(this.form.channel == '0' || this.form.channelinfo == "" ){
            setChannel=''
          }else{
            setChannel=this.form.channel+"#"+this.form.channelinfo;
          }

          let param={
            id:this.form.id,
            name:this.form.name,
            type:this.form.type,
            showBegin:this.form.showBegin,
            showEnd:this.form.showEnd,
            open:this.form.open,
            phone:this.form.phone,
            extraInfo:this.form.extraInfo,
            version:setversion,
            channel:setChannel,
            sortorder:this.form.sortorder,
            actid:this.form.actid,
            reddot:this.form.reddot,
            activeId:this.form.activeId
          }
          this.$api.activitiesShowadd(param).then(res =>{
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
      this.form.type=val;
    },
    /**
     * 活动类型下拉框绑定后面的input值
     */
    watchSelect1(val){
      this.form.belongActivitiesid=val;
    },
    /**
     * 输入input  绑定 select值
     */
    changeSelect1(val){
      this.form.actid=parseInt(val);
    }
  }
};
</script>

<style scoped>
.el-form{
  width:100%;
  float: left;
  margin:1% 0 2% 0;
}
.el-form-item{
  width:auto;
  float: left;
  margin-bottom:18px;
}
.el-input{
  margin-bottom:0px;
}
.el-select{
    width:100%;
    margin-bottom:0px;
}
.el-radio{
  margin-right:12px;
}
.dialog-footer{
  text-align: right;
  padding-right:3%;
  margin-bottom: 2%;
}
</style>
