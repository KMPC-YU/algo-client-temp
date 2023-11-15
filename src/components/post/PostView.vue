<template>
  <button class="btn btn-light mb-3" @click="moveToPostListPage"><i class="bi bi-list"></i>&nbsp;목록으로</button>
  <div class="card">
    <div class="card-body">
      <h6>{{ boardName }}</h6>
      <h5 class="card-title fw-bold mt-2">
        <span v-if="boardType === 'QUESTION'" class="point">100</span>
        {{ postDetailData.title }}
      </h5>
      <div class="mt-3">
        <div class="pf_img">
          <img src="http://algo.dothome.co.kr/img/no_profile.gif" alt="profile_image">
        </div>
        <h6 class="card-subtitle mb-2 text-body-secondary">
          <span>
            <router-link :to="{ name: 'Profile', params: { nickname: postDetailData.author } }">{{ postDetailData.author }}</router-link>
          </span>
          <i class="bi bi-dot me-1"></i>
          <code class="align-text-bottom">{{ postDetailData.created_at }}</code>
          <i class="bi bi-dot me-1"></i>
          <span>추천 {{ postDetailData.like_count }}</span>
          <i class="bi bi-dot me-1"></i>
          <span>조회 {{ postDetailData.view_count }}</span>
        </h6>
      </div>
      <hr>
      <p class="card-text">
        <div v-dompurify-html="postDetailData.content"></div>
      </p>
      <div class="d-flex justify-content-between align-items-center">
        <div class="left">
          <button class="btn btn-light" @click="moveToPostListPage"><i class="bi bi-list"></i>&nbsp;목록으로</button>
        </div>
        <div class="right">
          <button class="btn btn-light" @click="postLikeHandler">
            <i class="bi" :class="[postDetailData.is_like ? 'bi-hand-thumbs-up-fill' : 'bi-hand-thumbs-up']"></i>&nbsp;추천
          </button>
          <router-link class="btn btn-light mx-2" :to="{ name: 'PostModify', params: { board_id: boardID, post_id: postID } }">
            <i class="bi bi-pencil-square"></i>&nbsp;수정
          </router-link>
          <button class="btn btn-light" @click="postDelete"><i class="bi bi-trash3"></i>&nbsp;삭제</button>
        </div>
      </div>
      <comment></comment>
    </div>
  </div>
</template>

<script>
import router from "@/router/index.js";
import { useRoute } from 'vue-router'
import * as PostAPI from '@/services/post.js'
import { ref, onMounted, computed } from "vue";
import Swal from "sweetalert2";
import comment from "@compo/comment/Comment.vue";

export default {
  components: {
    CommentWrite,
  },
  setup() {
    const route = useRoute()
    const boardID = computed(() => {
      return route.params.board_id
    })

    const postID = computed(() => {
      return route.params.post_id
    })

    onMounted(() => {
      getPostDetail()
      getBoardInfo()
    })

    const moveToPostListPage = () => {
      router.go(-1)
    }

    const postDetailData = ref('')
    const boardName = ref('')
    const boardType = ref('')

    const getPostDetail = () => {
      PostAPI.postDetail(boardID.value, postID.value).then((res) => {
        console.log(res.data)
        postDetailData.value = res.data
      }).catch((err) => {
        console.error(err)
      })
    }

    const getBoardInfo = () => {
      PostAPI.BoardInfo(boardID.value).then((res) => {
        boardName.value = res.data.board_name
        boardType.value = res.data.board_type
      })
    }

    const postDelete = () => {
      Swal.fire({
        title: '게시글을 삭제하시겠습니까?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '삭제',
        cancelButtonText: '취소',
      }).then((result) => {
        if (result.isConfirmed) {
          PostAPI.postDelete(boardID.value, postID.value).then(() => {
            router.push({ name: 'PostList', params: { board_id: boardID.value }, query: { page: 1 } })
          })
        }
      })
    }

    const postLikeHandler = () => {
      console.log(postDetailData.value.is_like)
      if (postDetailData.value.is_like) {
        PostAPI.postLikeDelete(boardID.value, postID.value).then(() => {
          alert('추천취소됨')
          getPostDetail()
        }).catch((err) => {
          console.error(err)
        })
      } else {
        PostAPI.postLikeCreate(boardID.value, postID.value).then(() => {
          alert('추천완료')
          getPostDetail()
        }).catch((err) => {
          console.error(err)
        })
      }
    }

    return {
      moveToPostListPage, postDetailData, boardID, postID, postDelete, postLikeHandler, boardName, boardType,
    }
  }
}
</script>

<style scoped>
.card {
  border-color: #e2e2e2;
}
.btn-light {
  background-color: #F5F6F9;
}
.pf_img {
  float: left;
  margin-right: 10px;
}
img {
  border-radius: 50%;
  width: 25px;
  height: 25px;
}
.card-subtitle {
  padding-top: 5px;
}
.point {
  background-color: #7f8fa4;
  border-radius: 2px;
  color: #FFFFFF;
  font-weight: bold;
  padding: 3px;
  margin-right: 5px;
  font-size: 15px;
}
</style>