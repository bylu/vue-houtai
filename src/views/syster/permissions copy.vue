<template>
  <div class="modal-body">
    <table id="showtable" highlight-current-row size="small" style="width: 100%;">
      <thead>
        <tr>
          <td style="width:8%">一级菜单</td>
          <td class="threechild">
            <tr style="width:100%">
              <td style="width:10%">二级菜单</td>
              <td style="width:88%">权限</td>
            </tr>
          </td>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(item , index) in getdatas">
          <td>{{item.title}}</td>
          <td class="threechild">
            <template v-for="(child,index) in item.children">
              <tr style="width:100%;">
                <td style="width:10%;">{{child.title}}</td>
                <td style="width:88%;">
                  <div class="useroption" v-for="(child2,index2) in child.children">
                    <el-checkbox-group v-model="checkedList" size="small">
                      <el-checkbox :checked="child2.cheked" :label="child2.moduleId+'_'+child2.permission" :disabled="child2.disabled">
                        <label style="margin-left:5px;">{{child2.title}}</label>
                      </el-checkbox>
                    </el-checkbox-group>
                  </div>
                </td>
              </tr>
            </template>
          </td>
        </tr>
      </tbody>
    </table>
    <div slot="footer" class="dialog-footer">
      <el-button  size="small" @click="cancel">取消</el-button>
      <el-button :loading="loading" size="small" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: ["id"],
  data() {
    return {
      loading: false,
      checkedList: [],
      roleId: null,
      getdatas: null
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    //根据id 请求数据
    initData() {
      let roleid = JSON.parse(this.$store.getters.object).roleID;
      this.$http({
        url: this.paramUrl.searchrolepermisssion,
        method: "post",
        data:{ roleId: roleid}
        }).then(res => {
          if (res.success) {
            this.getdatas = res.data;
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
      this.loading = true;
      let url = this.paramUrl;
      let role=JSON.parse(this.$store.getters.object).roleID;
        this.$http({
          url: url.editrolepermisssion,
          method: "post",
          data: { targetRoleId: role, permissions: this.checkedList }
        }).then(res => {
          this.loading = false;
          if (res.success) {
            this.$message({
              message: res.message,
              type: "success"
            });
            this.$emit("shuaxin");
            this.$emit("closedialog");
          } else {
            this.$message({
              message: res.message,
              type: "error"
            });
          }
        });
      }
    }
};
</script>

<style scoped>
#showtable {
  margin-bottom: 20px;
}
.modal-body {
  max-height: 700px;
  overflow: auto;
}
td {
  text-align: center;
  border: 1px solid #f4f4f4;
  vertical-align: middle;
  min-height: 25px;
}
.threechild {
  width: 92%;
}
.threechild > tr:nth-child(2) {
  background-color: wheat;
}
.threechild > tr {
  border-top: none;
  border-left: 0;
  border-right: 0;
  border: 1px solid transparent;
  float: left;
  width: 98%;
}
.threechild > tr > td {
  float: left;
  border: 1px solid transparent;
  border-right: 1px solid #f4f4f4;
  padding: 0 0;
}
.el-checkbox {
  width: auto;
  float: left;
  margin-right: 5px;
}
.el-checkbox__label {
  float: left;
  padding-left: 0;
}

.dialog-footer {
  text-align: right;
  padding-right: 20px;
  margin-bottom: 15px;
}
</style>
