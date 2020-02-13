<template>
  <div>
    <el-form ref="form" :model="playlist" label-width="80px">
      <el-form-item label="歌单名称">
        <el-input v-model="playlist.name"></el-input>
      </el-form-item>
      <el-form-item label="歌单描述">
        <el-input v-model="playlist.copywriter"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onUpdate()">更新</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { fetchById, updatePlaylist } from "@/api/playlist";
export default {
  components: {},
  data() {
    return {
      playlist: {}
    };
  },

  computed: {},

  watch: {},

  created() {
    fetchById({
      id: this.$route.params.id
    }).then(res => {
      console.log(res);
      this.playlist = res.data;
    });
  },

  mounted() {},

  methods: {
    onUpdate() {
      updatePlaylist(this.playlist).then(res => {
        if(res.data.modified>0) {
          this.$message.success('更新成功')
          this.$router.push('/playlist/list')
        }else {
          this.$message.error('更新失败')
        }
      });
    },
    onCancel() {
      this.$router.push('/playlist/list')
    }
  }
};
</script>
<style lang='scss' scoped>
</style>
