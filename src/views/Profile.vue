<template>
  <div class="container py-5">
    <div class="mb-5">
      <div class="card">
        <div class="card-body">
          <div class="row">
            <div class="col-lg-4 text-center">
              <div>
                <img
                  :src="profileData.profile_img"
                  class="rounded-circle mb-3"
                  height="150"
                  alt="Profile Image"
                  loading="lazy"
                />
              </div>
              <div v-if="isMine">
                <label for="inputImage" class="btn btn-primary me-2 fw-bold">이미지 변경</label>
                <input type="file" id="inputImage" accept="image/*" @change="onImageChange" hidden>
                <button class="btn btn-primary ms-2" @click="onChangePw">비밀번호 변경</button>
                <!-- <router-link class="btn btn-primary" :to="{ name: 'Chat' }">채팅</router-link> -->
              </div>
            </div>
            <div class="col-lg-8">
              <div class="row justify-content-between m-3">
                <div class="col-lg-6">
                  <h2 class="mb-3">{{ profileData.nickname }}</h2>
                  <h5 class="text-secondary">{{ profileData.email }}</h5>
                </div>
                <div class="col-lg-2 text-center">
                  <h2 class="mb-3">포인트</h2>
                  <h5>{{ profileData.point }}</h5>
                </div>
              </div>
              <hr>
              <div class="row justify-content-center text-center m-3">
                <div class="col-lg-4">
                  <h4 class="mb-lg-3 mb-0 ">게시글 작성 수</h4>
                  <div class="fw-bold mb-lg-0 mb-3">{{ profileData.count.post }}</div>
                </div>
                <div class="col-lg-4">
                  <h4 class="mb-lg-3 mb-0 ">댓글 작성 수</h4>
                  <div class="fw-bold mb-lg-0 mb-3">{{ profileData.count.comment }}</div>
                </div>
                <div class="col-lg-4">
                  <h4 class="mb-lg-3 mb-0 ">레시피 작성 수</h4>
                  <div class="fw-bold mb-lg-0 mb-3">{{ profileData.count.recipe }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row text-center">
      <div class="col-lg-4 mb-3">
        <h5 class="fw-bold">알레르기 정보</h5>
        <div class="card">
          <div class="card-body">
            {{ profileData.allergies }}
          </div>
        </div>
      </div>
      <div class="col-lg-4 mb-5">
        <h5 class="fw-bold">작성한 게시글</h5>
        <div class="card">
          <div class="card-body">
            <div v-if="lastPostList.length === 0" class="mb-2">-</div>
            <div v-else v-for="post in lastPostList">
              <div class="row mb-2 align-items-center justify-content-between">
                <router-link
                  class="col-xl-6 text-black text-decoration-none post-title"
                  :to="{ name: 'PostDetail', params: { board_id: post.board_id, post_id: post.post_id } }"
                >
                  {{ post.title }}
                </router-link>
                <code class="col-xl-6">{{ post.created_at }}</code>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-4 mb-5">
        <h5 class="fw-bold">작성한 댓글</h5>
        <div class="card">
          <div class="card-body">
            <div v-if="lastCommentList.length === 0" class="mb-2">-</div>
            <div v-else v-for="comment in lastCommentList">
              <div class="row mb-2 align-items-center justify-content-between">
                <div class="col-xl-6 text-black text-truncate">{{ comment.content }}</div>
                <code class="col-xl-6">{{ comment.created_at }}</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { allergyData } from '@compo/allergyData.js'
import * as ProfileAPI from '@/services/profile.js'
import router from '@/router/index.js'
import { usePiniaStore } from '@/stores'

export default {
  setup() {
    onMounted(() => {
      getProfileData()
      getLastPosts()
      getLastComments()
      checkNickname()
    })

    const isMine = ref(false)
    const storeNick = computed(() => usePiniaStore().nickname)
    const route = useRoute()
    const nickname = computed(() => route.params.nickname)

    const profileData = ref({
      profile_img: '',
      username: '',
      nickname: '',
      email: '',
      point: 0,
      count: {
        post: 0,
        recipe: 0,
        comment: 0,
      },
      allergies: []
    })

    const lastPostList = ref([])
    const lastCommentList = ref([])

    const output_file = ref(null)
    const fileName = ref('')
    const filePath = ref('')
    const imageSrc = ref()
    let imgUrl

    const checkNickname = () => {
      isMine.value = nickname.value === storeNick ? true : false
    }

    const getProfileData = () => {
      ProfileAPI.getProfileData(nickname.value).then((res) => {
        profileData.value = res.data
        profileData.value.allergies = profileData.value.allergies.length === 0
          ? '-'
          : profileData.value.allergies.map(item => allergyData.value.find(allergy => allergy.name === item)?.mean)
              .filter(mean => mean !== undefined).join(' ')
      })
    }

    const getLastPosts = () => {
      ProfileAPI.getLastPosts(nickname.value).then((res) => {
        lastPostList.value = res.data
      })
    }

    const getLastComments = () => {
      ProfileAPI.getLastComments(nickname.value).then((res) => {
        lastCommentList.value = res.data
      })
    }

    const onChangePw = () => {
      router.push({ name: 'FindPassword', state: { username: profileData.value.username, email: profileData.value.email }})
        .then(() => location.reload())
    }

    const onImageChange = (e) => {
      e.preventDefault()
      const blobURL = URL.createObjectURL(e.target.files[0])
      const img = new Image()
      img.src = blobURL
      img.onload = function () {
        imageSizeChange(img, e.target.files[0].size)
        let list = new DataTransfer()
        list.items.add(new File(
          [dataURItoBlob(imgUrl)],
          e.target.files[0].name,
          { type: e.target.files[0].type }
        ))
        output_file.value = list.files
      }
      fileName.value = e.target.files[0].name
      requestAuth()
    }

    const imageSizeChange = (image, size) => {
      let canvas = document.createElement('canvas'), max_size = 600, width = image.width, height = image.height
      if (width > height) { // 가로가 길 경우
        if (width > max_size) {
          height *= max_size / width
          width = max_size
        }
      } else { // 세로가 길 경우
        if (height > max_size) {
          width *= max_size / height
          height = max_size
        }
      }
      canvas.width = width
      canvas.height = height
      canvas.getContext('2d').drawImage(image, 0, 0, width, height)
      if (size > 3 * 1024 * 1024) {
        imgUrl = canvas.toDataURL('image/jpeg', 0.5)
      } else {
        imgUrl = canvas.toDataURL('image/jpeg', 1)
      }
    }

    const dataURItoBlob = (dataURI) => {
      let byteString = atob(dataURI.split(',')[1])
      let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
      let ab = new ArrayBuffer(byteString.length)
      let ia = new Uint8Array(ab)
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i)
      }
      return new Blob([ab], { type: mimeString })
    }

    const requestAuth = () => {
      axiosPost('/api/v1/profiles/images', {
        file_name: fileName.value,
        image_request_type: 'POST',
      }, (res) => {
        filePath.value = res.data.substring(res.data.indexOf('profile_image')+14, res.data.indexOf('?')) //이미지이름.확장자
        uploadImage(res.data)
      }, (err) => {
        console.error(err)
      })
    }

    const uploadImage = (awsURL) => { // 백엔드 서버에 URL 요청
      axiosPut(awsURL, output_file.value[0], {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Access-Control-Allow-Origin': '*',
        },
        withCredentials: true,
      }).then(() => {
        insertImage(filePath.value)
      }).catch((err) => {
        console.error(err)
      })
    }

    const insertImage = (imageUrl) => { // 프로필 이미지 업로드
      axiosPost('/api/v1/profiles/images', {
        file_name: imageUrl,  // 이미지이름.확장자
        image_request_type: "GET",
      }, (res) => {
        imageSrc.value = res.data.substring(0, res.data.indexOf('?'))
      }, (err) => {
        console.error(err)
      })
    }

    const updateImage = () => {
      axiosPatch('/api/v1/users/profile_images', {
        profileImageUrl: imageSrc.value
      })
    }

    return {
      isMine,
      profileData,
      lastPostList,
      lastCommentList,
      onChangePw,
      onImageChange,
    }
  }
}
</script>

<style lang="scss" scoped>

</style>