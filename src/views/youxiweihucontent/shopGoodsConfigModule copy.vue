<template>
  <div>
    <el-form
      :model="form"
      :inline="true"
      :rules="rules"
      ref="form"
      label-width="150px"
      class="demo-ruleForm"
    >
      <el-form-item label="商品ID" prop="shopid" style="display:none;">
        <el-input v-model="form.shopid" size="small" placeholder autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="商品名称" prop="shopname">
        <el-input v-model="form.shopname" size="small" placeholder autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="商品价格（奖券）" prop="shopspend">
        <el-input v-model="form.shopspend" size="small" placeholder autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="商品类型" prop="shoptype">
        <el-select v-model="form.shoptype" size="small" placeholder="请选择">
          <el-option
            v-for="list in selectList.shopTypelist"
            :key="list.key"
            :label="list.value"
            :value="list.key"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发货数量" prop="shopcount">
        <el-input v-model="form.shopcount" size="small" placeholder autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="道具id" prop="propid">
        <el-input v-model="form.propid" size="small" placeholder autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="渠道id" prop="qudaoid">
        <el-input v-model="form.qudaoid" size="small" placeholder autocomplete="off"></el-input>
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
      <el-form-item label="状态" prop="statue">
        <el-select v-model="form.statue" size="small" placeholder="请选择">
          <el-option
            v-for="list in selectList.shopStatusList"
            :key="list.key"
            :label="list.value"
            :value="list.key"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="权重" prop="weight">
        <el-input v-model="form.weight" size="small" placeholder="请输入商品剩余数量" autocomplete="off"></el-input>
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
      <el-form-item label="折率" prop="discountrate">
        <el-input
          v-model="form.discountrate"
          size="small"
          placeholder="请输入商品上架数量"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item label="执行时间" prop="discountdate">
        <el-date-picker
          v-model="form.discountdate"
          align="right"
          size="small"
          type="datetime"
          value-format="yyyy-MM-dd"
          format="yyyy-MM-dd"
          placeholder="请输入执行时间"
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

      <el-form-item label="上传小图片" prop="smallImg">
        <el-input v-model="form.smallImg" :readonly="true" placeholder="文件名"></el-input>
      <input class="file" type="file" @change="uploadFile1" multiple="multiple"/>
      </el-form-item>

       <el-form-item label="上传大图片" prop="bigImg">
      <el-input v-model="form.bigImg" :readonly="true" placeholder="文件名"></el-input>
      <input class="file" type="file" @change="uploadFile2" multiple="multiple"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" size="small" @click="cancel">取消</el-button>
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
        shopid: "",
        shopname: "",
        shopspend: "",
        shoptype: "",
        shopcount: "",
        propid: "",
        qudaoid: "",
        showtype: "",
        statue: "",
        weight: "",
        discount: "",
        discountrate: "",
        discountdate: this.moment(new Date()).format("YYYY-MM-DD"),
        isnew: "0",
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
        shoptype: [
          { required: true, message: "选择商品类型", trigger: "change" }
        ],
        shopcount: [
          { required: true, message: "填写发货数量", trigger: "blur" }
        ],
        propid: [{ required: true, message: "填写道具id", trigger: "blur" }],
        qudaoid: [{ required: true, message: "填写渠道id", trigger: "blur" }],
        showtype: [
          { required: true, message: "选择展示类型", trigger: "change" }
        ],
        statue: [{ required: true, message: "选择状态", trigger: "change" }],
        weight: [{ required: true, message: "填写权重", trigger: "blur" }],
        discount: [
          { required: true, message: "选择是否打折", trigger: "change" }
        ],
        discountrate: [{ required: true, message: "填写折率", trigger: "blur" }]
        // ,
        //   smallImg:[
        //       { required: true, message: '请上传小图片', trigger: 'blur' }
        //   ],
        //   bigImg:[
        //       { required: true, message: '请上传大图片', trigger: 'blur' }
        //   ]
      },
      fileList1: [],
      fileList2: [],
      newUploadForm: {
        fileName: ""
      }
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
        this.form.shopid = this.getdata.id;
        this.form.shopname = this.getdata.shopname;
        this.form.shopspend = this.getdata.shopspend;
        this.form.shoptype = this.getdata.typeid.toString();
        //this.form.shopcount=this.getdata.;
        //this.form.propid=this.getdata.shopspend;
        //this.form.qudaoid=this.getdata.shopspend;
        // this.form.showtype=this.getdata.shopspend;
        // this.form.statue=this.getdata.shopspend;
        this.form.weight = this.getdata.weight;
        this.form.discount = this.getdata.discount.toString();
        this.form.discountrate = this.getdata.discountrate;
        this.form.discountdate = this.moment(this.getdata.inserttime).format(
          "YYYY-MM-DD"
        );
        this.form.isnew = this.getdata.isnew.toString();
        // this.form.smallImg=this.getdata.smallImg;
        let name1 = this.getdata.smallImg.substring(
          this.getdata.smallImg.lastIndexOf("/") + 1
        );
        let url1 = this.getdata.smallImg;
        this.fileList1.push({ name: name1, url: url1 });
        //this.form.bigImg=this.getdata.bigImg;
        this.form.smallImg = name;
        let name2 = this.getdata.bigImg.substring(
          this.getdata.bigImg.lastIndexOf("/") + 1
        );
        let url2 = this.getdata.bigImg;
        this.fileList2.push({ name: name2, url: url2 });
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
          let url = this.paramUrl;
            let param={
              shoptitle:this.form.editgoodname,
              shopvalue:this.form.editgoodprice,
              sourcegetscore:this.form.editinitluckbean,
              lastgetscore:this.form.edithaveluckbean,
              shopgetrate:this.form.editrate,
              surpluschange:this.form.editlastnum,
              totalchange:this.form.editgoodsnum,
              typeid:this.form.editisFree,
              show:this.form.showtype,
              insertdate:this.form.editdate
            }
          this.$http({
            url: url.shopGoodsConfigadd,
            method: "post",
            data: param
          }).then(res => {
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
          });
        } else {
          return false;
        }
      });
    },
    resetForm() {
      this.$refs["form"].resetFields();
    },
    handleRemove(file, fileList) {
    },
    handlePreview(file) {
      this.form.smallImg=file.name;
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    beforeUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isGIF = file.type === "image/gif";
      const isPNG = file.type === "image/png";
      const isBMP = file.type === "image/bmp";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG && !isGIF && !isPNG && !isBMP) {
        this.$message.warning("上传图片必须是JPG/GIF/PNG/BMP 格式!");
        return;
      }
      if (!isLt2M) {
        this.$message.warning("上传图片大小不能超过 2MB!");
        return;
      }
      this.form.value4 = file.name;
      // setTimeout(() => {
      //     this.submitUpload();
      // },500);
      return false; // 返回false不会自动上传
    },
    uploadFile1(event) {

     //this.$refs.upload.submit();
      if(event==null){
         this.$message.error("图片格式有误!");
         return;
      }
        let file = event.target.files[0]; //获取input的图片file值
        let param = new FormData(); // 创建form对象
        param.append("file", file);
        // 执行上传excel
        let id = '';
        this.$http({
                url:this.paramUrl.shopGoodsConfigaddImg,
                method: "post",
                data:param,
                headers:{
                  'Content-Type':'multipart/form-data'
                }
            }).then(res => {
                if (res.success) {
                  this.form.smallImg=res.data;
                    this.$message.success("上传成功");
                } else {
                   this.$message.warning("上传失败");
                }
            }).catch((e) => {
              this.$message.error("上传失败，请重新上传");
          });
    },uploadFile2(event) {

     //this.$refs.upload.submit();
      if(event==null){
         this.$message.error("图片格式有误!");
         return;
      }
        let file = event.target.files[0]; //获取input的图片file值
        let param = new FormData(); // 创建form对象
        param.append("file", file);
        // 执行上传excel
        let id = '';
        this.$http({
                url:this.paramUrl.shopGoodsConfigaddImg,
                method: "post",
                data:param,
                headers:{
                  'Content-Type':'multipart/form-data'
                }
            }).then(res => {
                if (res.success) {
                  this.form.bigImg=res.data;
                    this.$message.success("上传成功");
                } else {
                   this.$message.warning("上传失败");
                }
            }).catch((e) => {
              this.$message.error("上传失败，请重新上传");
          });
    }
  }
};
</script>

<style scoped>
.el-form {
  width: 100%;
  float: left;
  margin: 5% 0;
}
.el-form-item {
  width: 80%;
  float: left;
  margin-left: 8%;
  margin-bottom: 20px;
}
.dialog-footer {
  text-align: right;
  padding-right: 3%;
  margin-bottom: 2%;
}
</style>
