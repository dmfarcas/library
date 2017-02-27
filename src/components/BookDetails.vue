<template lang="html">
  <el-dialog title="Tips" v-model="dialogVisible" size="tiny">
  <!-- <span>{{currentBook.description }}</span> -->
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false">Done</el-button>
  </span>
  </el-dialog>
</template>

<script>
import Vue from 'vue';
import eventHub from '../EventHub';

export default Vue.extend({
  data() {
    return {
      currentBook: null,
      dialogVisible: false,
    };
  },
  methods: {
    details (currentBook) {
      this.currentBook = currentBook;
      console.log(currentBook);
      this.dialogVisible = true;

    }
  },
  created() {
    eventHub.$on('open-modal', this.details)
  }
});
</script>

<style lang="css">
</style>
