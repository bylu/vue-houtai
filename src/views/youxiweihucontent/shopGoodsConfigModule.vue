<template>
  <div>
    <el-form
      :model="form"
      :inline="true"
      :rules="rules"
      ref="form"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-form-item label="商品ID" prop="id" style="display:none;">
        <el-input v-model.trim="form.id" size="small" placeholder autocomplete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="商品名称" prop="shopname">
        <el-input v-model.trim="form.shopname" size="small" placeholder autocomplete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="商品价格(奖券)" prop="shopspend">
        <el-input v-model.trim="form.shopspend" size="small" placeholder autocomplete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="发货数量" prop="cost">
        <el-input v-model.trim="form.cost" size="small" placeholder autocomplete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="商品类型" prop="typeid">
        <el-select v-model="form.typeid" size="small" placeholder="请选择">
          <el-option
            v-for="list in selectList.shopTypelist"
            :key="list.key"
            :label="list.value"
            :value="list.key"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="道具id" prop="mobileDataId">
        <el-input v-model.trim="form.mobileDataId" size="small" placeholder autocomplete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="渠道id" prop="channelid">
        <el-input v-model.trim="form.channelid" size="small" placeholder autocomplete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="权重" prop="weight">
        <el-input v-model.trim="form.weight" size="small" placeholder="请输入商品剩余数量" autocomplete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="展示类型" prop="showtype">
        <el-select v-model="form.showtype" size="small" placeholder="请选择">
          <el-option
            v-for="list in selectList.showtypelist"
            :key="list.key"
            :label="list.value"
            :value="list.key"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="折率" prop="discountrate">
        <el-input  v-model.trim="form.discountrate"  size="small"  placeholder="请输入商品上架数量" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="disable">
        <el-select v-model="form.disable" size="small" placeholder="请选择">
          <el-option
            v-for="list in selectList.shopStatusList"
            :key="list.key"
            :label="list.value"
            :value="list.key"
          ></el-option>
        </el-select>
      </el-form-item>
     
      <el-form-item label="是否打折" prop="discount">
        <el-select v-model="form.discount" size="small" placeholder="全部">
          <el-option
            v-for="list in selectList.shopDiscountList"
            :key="list.key"
            :label="list.value"
            :value="list.key"
          ></el-option>
        </el-select>
      </el-form-item>
      

      <el-form-item label="执行时间" prop="discountdate">
        <el-date-picker
          v-model="form.discountdate"
          align="right"
          size="small"
          type="datetime"
          value-format="yyyy-MM-dd"
          format="yyyy-MM-dd"
          placeholder="请输入执行时间" clearable
        ></el-date-picker>
      </el-form-item>

      <el-form-item label="是否新品" prop="isnew">
        <el-select v-model="form.isnew" size="small" placeholder="全部">
          <el-option
            v-for="list in selectList.shopDiscountList"
            :key="list.key"
            :label="list.value"
            :value="list.key"
          ></el-option>
        </el-select>
      </el-form-item>

      <div class="showuploadpic">
        <el-form-item label="上传小图片" prop="smallImg">
          <el-input v-model="form.smallImg" size="small" :readonly="true" placeholder="文件名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="medium"  class="picbtn" type="text" @click="opensmallpic()">显示图片</el-button>
          <el-button size="small" type="danger">上传图片</el-button>
          <input class="file" type="file" @change="uploadFile1" multiple="multiple"/>
        </el-form-item>
      </div>
      <div class="showuploadpic">
        <el-form-item label="上传大图片" prop="bigImg">
          <el-input v-model="form.bigImg" size="small"  :readonly="true" placeholder="文件名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="medium"  class="picbtn" type="text" @click="openpic()">显示图片</el-button>
          <el-button size="small" type="danger">上传图片</el-button>
          <input class="file" type="file" @change="uploadFile2" multiple="multiple"/>
        </el-form-item>
      </div>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button  size="small" @click="cancel">取消</el-button>
      <el-button :loading="loading" size="small" type="primary" @click="doSubmit('form')">确认</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: ["getdata", "isAdd"],
  data() {
    return {
      loading: false,
      form: {
        id: "",
        shopname: "",
        shopspend: "",
        typeid: "",
        stock: "",
        surplusstock: "",
        cost: "",
        mobileDataId: "",
        showtype: "",
        disable: "",
        weight: "",
        discount: "",
        discountrate:"",
        discountdate: this.moment(new Date()).format("YYYY-MM-DD"),
        isnew: "0",
        channelid:"",
        smallImg: "",
        bigImg: ""
      },
      rules: {
        shopname: [
          { required: true, message: "填写商品名称", trigger: "blur" }
        ],
        shopspend: [
          { required: true, message: "填写商品价格", trigger: "blur" }
        ],
        typeid: [
          { required: true, message: "选择商品类型", trigger: "change" }
        ],
        cost: [
          { required: true, message: "填写发货数量", trigger: "blur" }
        ],
        mobileDataId: [
          { required: true, message: "填写道具id", trigger: "blur" }
        ],
        channelid: [
          { required: true, message: "填写渠道id", trigger: "blur" }
        ],
        showtype: [
          { required: true, message: "选择展示类型", trigger: "change" }
        ],
        disable: [
          { required: true, message: "选择状态", trigger: "change" }
        ],
        weight: [
          { required: true, message: "填写权重", trigger: "blur" }
        ],
        discount: [
          { required: true, message: "选择是否打折", trigger: "change" }
        ]
      },
      showsmallpic:"",
      showbigpic:""
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    //新增和编辑今日入页面初始化
    init() {
      if (this.isAdd) {
      } else {
        this.form.id = this.getdata.id;
        this.form.shopname = this.getdata.shopname;
        this.form.shopspend = this.getdata.shopspend;
        this.form.typeid = this.getdata.typeid.toString();
        this.form.cost=this.getdata.cost;
        this.form.mobileDataId=this.getdata.mobileDataId;
        this.form.channelid=this.getdata.channelid;
        this.form.showtype=(this.getdata.showtype).toString();
        this.form.disable=(this.getdata.disable).toString();

        this.form.weight = this.getdata.weight;
        this.form.discount = this.getdata.discount.toString();
        this.form.discountrate = this.getdata.discountrate;
        this.form.discountdate = this.moment(this.getdata.inserttime).format(
          "YYYY-MM-DD"
        );
        this.form.isnew = this.getdata.isnew.toString();
        this.form.smallImg=this.getdata.smallImg;
        this.showsmallpic="https://"+this.getdata.smallImg;
        this.form.bigImg=this.getdata.bigImg;
        this.showbigpic="https://"+this.getdata.bigImg;
      }
    },
    //取消按钮操作
    cancel() {
      this.resetForm();
      this.$emit("closedialog");
    },
    //确认按钮 提交事件
    doSubmit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$api.shopGoodsConfigadd(this.form).then(res =>{
            this.loading = false;
            if (res.success) {
              this.resetForm();
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
    uploadFile1(event) {
      if(event==null){
         this.$message.error("图片格式有误!");
         return;
      }
        let file = event.target.files[0]; //获取input的图片file值
        const isJPG = file.type === "image/jpeg";
        const isGIF = file.type === "image/gif";
        const isPNG = file.type === "image/png";
        const isBMP = file.type === "image/bmp";

        if (!isJPG && !isGIF && !isPNG && !isBMP) {
          this.$message.warning("上传图片必须是JPG/GIF/PNG/BMP 格式!");
          return;
        }
        let param = new FormData(); // 创建form对象
        param.append("file", file);
        this.$api.shopGoodsConfigaddImg(param).then(res =>{
          if (res.success) {
            this.form.smallImg=res.data;
            this.showsmallpic = "https://" + res.data;
            this.$message.success(res.message);
          } else {
            this.$message.warning(res.message);
          }
        }).catch(err =>{
          this.$message({
              message: '请求失败!',
              type: "error"
          });
        })
    },
    uploadFile2(event) {
      if(event==null){
         this.$message.error("图片格式有误!");
         return;
      }
        let file = event.target.files[0]; //获取input的图片file值
        const isJPG = file.type === "image/jpeg";
        const isGIF = file.type === "image/gif";
        const isPNG = file.type === "image/png";
        const isBMP = file.type === "image/bmp";

        if (!isJPG && !isGIF && !isPNG && !isBMP) {
          this.$message.warning("上传图片必须是JPG/GIF/PNG/BMP 格式!");
          return;
        }
        let param = new FormData(); // 创建form对象
        param.append("file", file);

        this.$api.shopGoodsConfigaddImg(param).then(res =>{
          if (res.success) {
            this.form.bigImg=res.data;
            this.showbigpic = "https://" + res.data;
              this.$message.success(res.message);
          } else {
              this.$message.warning(res.message);
          }
        }).catch(err =>{
          this.$message({
              message: '请求失败!',
              type: "error"
          });
        })
    },
    opensmallpic(){
      window.open(this.showsmallpic, '_blank')
    },
    openpic(){
      window.open(this.showbigpic, '_blank')
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
  margin-bottom: 20px;
}
.el-select,.el-date-editor{
  width:92%;
}
.el-input,.el-select{
  margin-bottom:0;
}
.showuploadpic{
  width:100%;
  float: left;
  position: relative;
}
.file{
  opacity: 0.01;
  margin-left: -83px;
}

.dialog-footer {
  text-align: right;
  padding-right: 3%;
  margin-bottom: 2%;
}
</style>
