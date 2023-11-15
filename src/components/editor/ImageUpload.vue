<template>
  <div>
    <input type="file" ref="oldFile" @change="handleFileUpload" class="d-none" />
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
import axios from 'axios'

export default {
  setup(props, context) {
    const imageSrc = ref('')
    const oldFile = ref(null)
    const newFile = ref(null)
    const fileName = ref('')
    let imgUrl
    const openFileInput = () => {
      oldFile.value.click();
    }

    const handleFileUpload = () => {
      const blobURL = URL.createObjectURL(oldFile.value.files[0]);
      const img = new Image();
      img.src = blobURL;
      img.onload = function () {
        imageSizeChange(img,oldFile.value.files[0].size)
        let list = new DataTransfer();
        list.items.add(new File([dataURItoBlob(imgUrl)], oldFile.value.files[0].name,{
          type: oldFile.value.files[0].type,
        }));
        newFile.value = list.files
      }
      fileName.value = oldFile.value.files[0].name
      requestAuth()
    }

    function dataURItoBlob(dataURI) {
      let byteString = atob(dataURI.split(',')[1]);
      let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
      let ab = new ArrayBuffer(byteString.length);
      let ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ab], {type: mimeString});
    }

    const imageSizeChange = (image,size) => {
      let canvas = document.createElement("canvas"),
          max_size = 600,
          width = image.width,
          height = image.height;
      if (width > height) {
        // 가로가 길 경우
        if (width > max_size) {
          height *= max_size / width;
          width = max_size;
        }
      } else {
        // 세로가 길 경우
        if (height > max_size) {
          width *= max_size / height;
          height = max_size;
        }
      }
      canvas.width = width;
      canvas.height = height;
      canvas.getContext("2d").drawImage(image, 0, 0, width, height);
      if(size>3*1024*1024){
        imgUrl = canvas.toDataURL("image/jpeg", 0.5);
      }
      else{
        imgUrl = canvas.toDataURL("image/jpeg", 1);
      }
    }

    const filePath = ref('')

    const requestAuth = () => { // 이미지 업로드 권한 취득
      console.log('RequestAuth Called')
      axios.post('http://be.algo.r-e.kr:8080/api/v1/posts/images', {
        file_name: fileName.value,
        image_request_type: "POST",
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        withCredentials: true,
      }).then((res) => {
        filePath.value = res.data.substring(res.data.indexOf('amazonaws.com') + 14, res.data.indexOf('?'))  // 이미지이름.확장자
        console.log(filePath.value)
        uploadImage(res.data)
      }).catch ((err) => {
        console.error(err)
      })
    }

    const uploadImage = (awsURL) => { // 백엔드 서버에 URL 요청
      axios.put(awsURL, newFile.value[0], {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Access-Control-Allow-Origin': '*',
        },
        withCredentials: true,
      }).then((res) => {
        insertImage(filePath.value)
      }).catch((err) => {
        console.error(err)
      })
    }

    const insertImage = (imageUrl) => { // 이미지 글쓰기 본문에 삽입
      axios.post('http://be.algo.r-e.kr:8080/api/v1/posts/images', {
        file_name: imageUrl,  // 이미지이름.확장자
        image_request_type: "GET",
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        withCredentials: true,
      }).then ((res) => {
        console.log(res.data)
        imageSrc.value = res.data.substring(0, res.data.indexOf('?'))
        context.emit('onConfirm', {
          src: imageSrc.value
        })
        closeModal()
      }).catch ((err) => {
        console.error(err)
      })
    }

    return {
      oldFile,
      openFileInput,
      handleFileUpload,
    }
  },
}
</script>

<style scoped>

</style>