<template>
  <div>
    <el-upload
      class="upload-demo"
      action="http://localhost:3000/swiper/upload"
      :on-success="uploadSuccess"
      :show-file-list="false"
    >
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
    <el-table v-loading="loading" :data="swiperList" stripe style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column label="图片" width="400">
        <template slot-scope="scope">
          <img :src="scope.row.download_url" height="50" />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 确定删除对话框 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>确定删除该图片吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="doDelete">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchSwiperList, deleteSwiper } from "@/api/swiper";

export default {
  components: {},
  data() {
    return {
      swiperList: [],
      loading: false,
      dialogVisible: false,
      imgInfo: ""
    };
  },

  computed: {},

  watch: {},

  created() {
    this.getSwiperList();
  },

  mounted() {},

  methods: {
    getSwiperList() {
      this.loading = true;
      fetchSwiperList().then(res => {
        console.log(res);
        this.swiperList = res.data;
        this.loading = false;
      });
    },
    handleDelete(row) {
      console.log(row);
      this.dialogVisible = true;
      this.imgInfo = row;
      console.log(this.imgInfo);
    },
    doDelete() {
      this.dialogVisible = false;
      this.loading = true;
      deleteSwiper(this.imgInfo).then(res => {
        console.log(res);
        this.loading = false;
        this.getSwiperList();
        this.$message.success("删除成功");
      });
    },
    uploadSuccess(res) {
      console.log(res);
      if (res.id_list.length > 0) {
        this.$message.success("上传成功");
        this.getSwiperList();
      } else {
        this.$message.error("上传失败");
      }
    }
  }
};
</script>
<style lang='scss' scoped>
</style>
