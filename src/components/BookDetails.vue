<template lang="html">
  <el-dialog title="Tips" v-model="dialogVisible" size="tiny">
  <span>This is a message</span>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false">Done</el-button>
  </span>
  </el-dialog>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      dialogVisible: false,
    };
  },
  methods: {
    details (key) {
      this.dialogVisible = true;
      console.log("//TODO");
    }
  }
});
</script>

<style lang="css">
</style>
