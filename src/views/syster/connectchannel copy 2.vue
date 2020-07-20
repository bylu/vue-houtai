<template>
  <div class="modal-body">
    <div class="content">
      <template v-for="(item,index) in child2" >
        <el-checkbox-group v-model="checkedList" size="small">
          <el-checkbox :checked="item.checked" :label="item.userId" >
            <label style="margin-left:5px;">{{item.nickName}}</label>
          </el-checkbox>
        </el-checkbox-group>
      </template>
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
      this.$http({
        url: this.paramUrl.spreaderManagesearchAll,
        method: "post",
        data: {
          roleID: this.channelid
        }
      }).then(res => {
        this.checkedList = [];
        if (res.success) {
          this.child2 = res.data;
        } else {
          this.$message({
            message: res.message,
            type: "error"
          });
        }
      });
    },
    // 取消操作按钮
    cancel() {
      this.$emit("closedialog");
    },
    //确认按钮 点击提交
    doSubmit() {
      // let userid = JSON.parse(this.$store.getters.params).userid;
      this.$http({
        url: this.paramUrl.spreaderManageaddRelevance,
        method: "post",
        data: { userID: this.channelid, spreaderIds:this.checkedList }
      }).then(res => {
        if (res.success) {
          this.$emit("closedialog");
          this.$emit("shuaxin");
          //this.reload();
        } else {
          this.$message({
            message: res.message,
            type: "error"
          });
        //this.$emit("closedialog");
        }
      });
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
  overflow: auto;
}
.el-checkbox-group {
  width: 50%;
  float: left;
  padding-left: 5%;
  margin: 1% 0%;
}
.dialog-footer {
  text-align: right;
  padding-right: 20px;
  margin-bottom: 15px;
}
</style>
