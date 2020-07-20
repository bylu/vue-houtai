<template>
  <div class="modal-body">
    <div style="width:100%;margin-top:10px;">
      <input type="checkbox"  class="checkAll" @click="checkAll" />
      <span style="width:40px;float:left;font-size:15px;color: #606266;margin-left:3px;">全选</span>
    </div>
    <div class="content">
        <div class="checkboxList" v-for="(item,index) in child2" :key="index">
          <!-- <el-checkbox  :key="index"  :checked="item.checked" :label="item.userId" >
            <label style="margin-left:5px;">{{item.nickName}}</label>
          </el-checkbox> -->
            <input type="checkbox"  :checked="item.checked"  :value="item.userid" class="set-checkbox" />
            <span class="checkboxnickname">{{item.nickName}}</span>
        </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button  @click="cancel" size="small">取消</el-button>
      <el-button type="primary" @click="doSubmit" size="small">确认</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  props: ["channelid"],
  data() {
    return {
      checkedList: [],
      child2: []
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      //查询该用户关联渠道信息
      // let user = this.$store.getters.params;
      // if ("" != user) {
      //   user = JSON.parse(user).userid;
      // }
      let param= {
          userID: this.channelid
        }
      this.$api.spreaderManagesearchAll(param).then(res =>{
        this.checkedList = [];
        if (res.success) {
          this.child2 = res.data;
        } else {
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
    },
    // 取消操作按钮
    cancel() {
      this.$emit("closedialog");
    },
    //确认按钮 点击提交
    doSubmit() {
      let _this=this;
      _this.checkedList = [];
      // let userid = JSON.parse(this.$store.getters.params).userid;
      $(".checkboxList").each(function(){
        $(this).find("input[type='checkbox']:checked").each(function () {
            var _that = $(this);
            var getcheckboxvalue = _that.val();
            _this.checkedList.push(getcheckboxvalue);
        });
      });
      let param={ userID: this.channelid, spreaderIds:(_this.checkedList) }
      this.$api.spreaderManageaddRelevance(param).then(res =>{
        if (res.success) {
          this.$message({
            message: res.message,
            type: "success"
          });
          this.$emit("closedialog");
          this.$emit("shuaxin");
        } else {
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
    },
    checkAll(){
      if($(".checkAll").is(":checked")){
          $("input[type='checkbox']").each(function(){
            $(this).prop('checked',true)
          })
      }else{
        $("input[type='checkbox']").each(function(){
            $(this).prop('checked',false)
        })
      }
    }
  }
};
</script>
<style scoped>
/*设置modal最大高度*/
.modal-body {
  max-height: 700px;
  overflow: auto;
}
.content {
  width: 100%;
  float: left;
  margin: 2% 0%;
}
.dialog-footer {
  width:100%;
  float: left;
  text-align: right;
  margin-bottom: 15px;
}
.checkboxList {
  width: 50%;
  float: left;
  padding-left: 5%;
  margin: 1% 0%;
  font-size: 14px;
  color: #606266;
}
.checkAll{
  margin-left:23px;
  float: left;
  margin-top:2px;
  display: inline-block;
  position: relative;
  border: 1px solid #DCDFE6;
  border-radius: 2px;
  width: 15px;
  height: 15px;
  background-color: #FFF;
  -webkit-transition: border-color .25s cubic-bezier(.71,-.46,.29,1.46),background-color .25s cubic-bezier(.71,-.46,.29,1.46);
  transition: border-color .25s cubic-bezier(.71,-.46,.29,1.46),background-color .25s cubic-bezier(.71,-.46,.29,1.46);
}
.set-checkbox{
    float: left;
    display: inline-block;
    position: relative;
    border: 1px solid #DCDFE6;
    border-radius: 2px;
    margin-top:1px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 14px;
    height: 14px;
    background-color: #FFF;
    -webkit-transition: border-color .25s cubic-bezier(.71,-.46,.29,1.46),background-color .25s cubic-bezier(.71,-.46,.29,1.46);
    transition: border-color .25s cubic-bezier(.71,-.46,.29,1.46),background-color .25s cubic-bezier(.71,-.46,.29,1.46);
}
.checkboxnickname{
  width:auto;
  float: left;
  margin-left:3px;
}

</style>
