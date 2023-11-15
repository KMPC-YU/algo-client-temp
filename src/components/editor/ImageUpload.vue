<template>
  <div>
    <input type="file" ref="fileInput" @change="handleFileUpload" class="d-none" />
  </div>
<!--  <div class="modal" v-if="show">-->
<!--    <div class="modal-dialog">-->
<!--      <div class="modal-content">-->
<!--        <div class="modal-header">-->
<!--          <h3 class="modal-title">이미지 추가</h3>-->
<!--          <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>-->
<!--        </div>-->
<!--        <div class="modal-body">-->
<!--          <input class="form-control" type="file" accept=".JPG, .jpg, .jpeg, ,JPEG, .gif, .png" @change="fileChange" ref="oldFile"/>-->
<!--        </div>-->
<!--        <div class="modal-footer">-->
<!--          <button @click="closeModal" class="btn btn-outline-secondary">-->
<!--            닫기-->
<!--          </button>-->
<!--          <button class="btn btn-success" @click="requestAuth" :disabled="!validImage">-->
<!--            추가-->
<!--          </button>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
</template>

<script>
import { ref } from 'vue'

export default {
  setup(props, context) {
    const fileInput = ref(null);
    const openFileInput = () => {
      fileInput.value.click();
    }

    const handleFileUpload = () => {
      const file = fileInput.value.files[0];
      console.log(file);
    }

    return {
      fileInput,
      openFileInput,
      handleFileUpload,
    }
  },
}
</script>

<style scoped>

</style>