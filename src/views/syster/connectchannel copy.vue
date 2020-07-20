<template>
  <div class="modal-body">
    <div style="width:100%;float:left;">
       <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选
  7             </el-checkbox>
    </div>
    <div class="qudaocontent">
        <el-checkbox-group v-model="checkedCities" size="small" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="(item,index) in labels" :label="item.userId" :key="index" >
            <label style="margin-left:5px;"> {{item.userId}}</label>
          </el-checkbox>
        </el-checkbox-group>
    
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
      checkAll: false,
      checkedCities: ['10184824', '10184822'],
      allElection: [], // 全选
      selectionArr: [], // 选中要传给后台的数据 对象
      isIndeterminate: true,
      labels:[]
    };
  },
  props:{
    labels:Array,
  },
  mounted() {
    this.init();
    this.allElectionFun();
    this.DefaultFullSelection();
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
          this.labels = res.data;
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
    },
    DefaultFullSelection(){ // 初始化 默认全部选中
      this.checkedCities = this.allElection;
      let checkedCount = this.checkedCities.length;
      this.checkAll = checkedCount === this.labels.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.labels.length;
      this.selectionFun(this.checkedCities);
    },
   
    allElectionFun() { // 全选数组
        this.allElection = [];
        for (var i = 0; i < this.labels.length; i++) {
            this.allElection.push(this.labels[i].userId)
        }
    },

    selectionFun(selectionArr) { // 获取选中的对象
        this.selectionArr = [];
        for (var i = 0; i < this.labels.length; i++) {
            for (var j = 0; j < selectionArr.length; j++) {
                if (selectionArr[j] === this.labels[i].userId) {
                    this.selectionArr.push(this.labels[i])
                }
            }
        }
    },
    handleCheckAllChange(val) { // 全选
        this.allElectionFun();
        this.checkedCities = val ? this.allElection : [];
        this.isIndeterminate = false;
        this.selectionFun(this.checkedCities);
    },
    handleCheckedCitiesChange(value) { // 选中
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.labels.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.labels.length;
        this.selectionFun(value);
     
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
.qudaocontent {
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
