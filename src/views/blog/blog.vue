<template>
  <div>
    <el-table v-loading="loading" :data="blogList" stripe>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="content" label="内容"></el-table-column>
      <el-table-column prop="nickName" label="发布人"></el-table-column>
      <el-table-column prop="createTime.$date" label="创建时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="goComment(scope.row)">查看</el-button>
          <el-button size="mini" type="danger" @click="onDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 确认删除的对话框 -->
    <el-dialog title="提示" :visible.sync="delDialogVisible" width="30%">
      <span>确定删除该博客吗?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="doDel">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchBlog, delBlog } from "@/api/bloglist";
import scroll from "@/utils/scroll";
import formatTime from '@/utils/formatTime'

export default {
  components: {},
  data() {
    return {
      blogList: [],
      count: 50,
      loading: false,
      blogInfo: {},
      delDialogVisible: false
    };
  },

  computed: {},

  watch: {},

  created() {
    this.getBlog();
  },

  mounted() {
    scroll.start(this.getBlog);
  },

  methods: {
    getBlog() {
      this.loading = true;
      // console.log('blog')
      fetchBlog({
        start: this.blogList.length,
        count: this.count
      }).then(res => {
        // console.log(res)
        //时间格式化
        const data = res.data;
        // console.log(data)
          // console.log(data.length)
        
        // console.log(data)
        // const data = res.data;
        let _blogList = [];
        for (let i = 0, len = data.length; i < len; i++) {
          data[i] = JSON.parse(data[i])
          //时间戳转化为正常时间
          data[i].createTime.$date = formatTime(new Date(data[i].createTime.$date))
          // console.log(data[i])
          _blogList.push(data[i]);
        }
        this.blogList = this.blogList.concat(_blogList);
        
        

        console.log(this.blogList)
        //如果长度不足，就停止加载
        if (_blogList.length < this.count) {
          scroll.end();
        }
        this.loading = false;
        // console.log(this.blogList)
      });
    },
    goComment(row) {
      console.log(row)
      this.$router.push(`/blog/comment/${row._id}`)
    },
    onDel(row) {
      this.blogInfo = row;
      console.log(this.blogList);
      this.delDialogVisible = true
    },
    doDel() {
      this.delDialogVisible = false
      this.loading = true
      delBlog(this.blogInfo).then(res => {
        console.log(res)
        if(res.blogDelRes.deleted>0) {
          this.blogList = []
          this.getBlog()
          this.$message.success('删除成功')
          // this.loading = false
        }
      });
    }
  }
};
</script>
<style lang='scss' scoped>
</style>
