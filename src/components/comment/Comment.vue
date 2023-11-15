<template>
  <h5 class="fw-bold mt-4">댓글 {{ commentCnt }}</h5>
  <div class="row card-body comment mx-1">
    <textarea class="comment-input" v-model="comment" placeholder="댓글을 남겨보세요" @keydown="resize" @keyup="resize" style="resize: none; overflow: hidden"/>
    <div class="d-flex justify-content-end comment-write mt-3">
      <button class="btn btn-secondary" @click="addComment">등록</button>
    </div>
  </div>
  <hr/>
  <div>
    <div v-for="comment in commentList" :key="comment.comment_id" :class="!!comment.parent === false ? '' : 'ms-5'">
      <div class="pf_img">
        <img :src="comment.author_profile_img ?? 'http://algo.dothome.co.kr/img/no_profile.gif'" alt="profile_image">
      </div>
      <div class="comment-content">
        <h6 v-if="!comment.is_deleted" class="text-body-secondary">
          <span>
            <router-link :to="{ name: 'Profile', params: { nickname: comment.author } }">{{ comment.author }}</router-link>
          </span>
          <i class="bi bi-dot me-1"></i>
          <code class="align-text-bottom">{{ comment.created_at === comment.modified_at ? comment.created_at : comment.modified_at + ' (수정됨)' }}</code>
        </h6>
        <h6 v-else>
          <span class="invisible fw-bold me-3">deleted</span>
          <code class="invisible">deleted</code>
          <div>[ 삭제된 댓글입니다. ]</div>
        </h6>
        <p>{{ comment.content }}</p>
      </div>
      <div v-if="!comment.is_deleted && !(comment.author !== nickname && comment.parent !== null)" class="dropdown">
        <button class="btn comment-options btn-lg" data-bs-toggle="dropdown" aria-expanded="false">
          <i class="bi bi-three-dots-vertical text-muted"></i>
        </button>
        <ul class="dropdown-menu text-center">
          <li v-if="comment.author === nickname"><a class="dropdown-item" @click="modifyId = comment.comment_id; newComment = comment.content">수정</a></li>
          <li v-if="comment.author === nickname"><a class="dropdown-item" @click="deleteComment(comment.comment_id)">삭제</a></li>
          <li v-if="comment.parent === null"><a class="dropdown-item" @click="subCommId = comment.comment_id; subComment = ''">답글</a></li>
        </ul>
      </div>
      <!-- modify comment -->
      <div v-if="comment.comment_id === modifyId" class="row card-body comment mx-1">
        <textarea class="comment-input" v-model="newComment" @keydown="resize" @keyup="resize" style="resize: none; overflow: hidden"/>
        <div class="d-flex justify-content-end comment-write mt-3">
          <button class="btn btn-secondary me-2" @click="modifyComment(comment.comment_id)">수정</button>
          <button class="btn btn-light" @click="modifyId = -1; newComment = ''">취소</button>
        </div>
      </div>
      <!-- add sub-comment form -->
      <div v-if="comment.comment_id === subCommId" class="row card-body comment mx-1">
        <textarea class="comment-input" v-model="subComment" @keydown="resize" @keyup="resize" style="resize: none; overflow: hidden"/>
        <div class="d-flex justify-content-end comment-write mt-3">
          <button class="btn btn-secondary me-2" @click="addSubComment(comment.comment_id)">등록</button>
          <button class="btn btn-secondary" @click="subCommId = -1; subComment = ''">취소</button>
        </div>
      </div>
    </div>
  </div>
  <Pagination :currentPage="currCommPage" :pageDisplayCount="5" :totalPageCount="numOfCommPage" @change="setPage"/>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { usePiniaStore } from '@/stores'
import * as CommentAPI from '@/services/comment.js'
import * as RecipeAPI from '@/services/recipe.js'
import Pagination from '@compo/Pagination.vue'
import Swal from 'sweetalert2'

export default {
  components: {
    Pagination
  },
  props: {
    boardID: {
      required: true
    },
    postID: {
      required: true
    },
  },
  setup(props) {
    onMounted(() => {
      getCommentsList(1)
    })

    const commentList = ref('') // 댓글 목록
    const comment = ref('') // 댓글 내용
    const currCommPage = ref(1) // 현재 댓글 페이지
    const numOfCommPage = ref(1)  // 총 댓글 페이지 수

    // modify variables
    const modifyId = ref(-1)
    const newComment = ref('')  // modify comment string variable

    // sub-comment variables
    const subCommId = ref(-1)
    const subComment = ref('')

    const nickname = computed(() => usePiniaStore().nickname)
    const commentCnt = ref('')

    const getCommentsList = (page = currCommPage.value) => {
      if (props.boardID === 'Recipe') {
        RecipeAPI.getComment(props.postID, page)
          .then((res) => {
            numOfCommPage.value = parseInt(res.headers['x-page-count']) === 0 ? 1 : parseInt(res.headers['x-page-count'])
            commentCnt.value = parseInt(res.headers['x-comment-count'])
            commentList.value = res.data
          })
      } else {
        CommentAPI.getCommentsList(props.boardID, props.postID, page)
          .then((res) => {
            console.log(res.data)
            if (res.data.page_num === 0) {
              numOfCommPage.value = 1
            } else {
              numOfCommPage.value = res.data.page_num
            }
            commentList.value = res.data.comment_list_dto
            commentCnt.value = res.data.comment_num
          })
          .catch((err) => {
            console.error(err)
          })
      }
    }
    const addComment = () => {
      if (comment.value.length < 1) {
        alert('댓글 내용을 입력하세요')
      } else if (props.boardID === 'Recipe') {
        RecipeAPI.createComment(props.postID, comment.value)
          .then(() => {
            comment.value = ''
            getCommentsList(1)
          })
      } else {
        CommentAPI.commentWrite(props.boardID, props.postID, comment.value, null)
            .then((res) => {
              comment.value = ''
              getCommentsList(1)
              console.log(res)
            })
            .catch((err) => {
              alert('등록실패')
              console.error(err)
            })
      }
    }

    const addSubComment = (parentCommId) => {
      if (subComment.value.length < 1) {
        alert('댓글 내용을 입력하세요')
      } else {
        CommentAPI.commentWrite(props.boardID, props.postID, subComment.value, parentCommId)
            .then((res) => {
              subComment.value = ''
              getCommentsList(currCommPage.value)
              subCommId.value = -1
              console.log(res)
            })
            .catch((err) => {
              alert('등록실패')
              console.error(err)
            })
      }
    }

    const modifyComment = (commentId) => {
      if (newComment.value.length < 1) {
        alert('댓글 내용을 입력하세요')
      } else if (props.boardID === 'Recipe') {
        RecipeAPI.updateComment(props.postID, commentId, newComment.value)
          .then(() => {
            newComment.value = ''
            getCommentsList(currCommPage.value)
            modifyId.value = -1
          })
      } else {
        CommentAPI.commentModify(props.boardID, props.postID, commentId, newComment.value)
            .then((res) => {
              newComment.value = ''
              getCommentsList(currCommPage.value)
              modifyId.value = -1
              console.log(res)
            })
            .catch((err) => {
              alert('등록실패')
              console.error(err)
            })
      }
    }

    const deleteComment = (commentId) => {
      Swal.fire({
        title: '댓글을 삭제하시겠습니까?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '삭제',
        cancelButtonText: '취소',
      }).then((result) => {
        if (result.isConfirmed) {
          if (props.boardID === 'Recipe') {
            RecipeAPI.deleteComment(props.postID, commentId).then(() => getCommentsList(currCommPage.value))
          } else {
            CommentAPI.commentDelete(props.boardID, props.postID, commentId).then(() => {
              getCommentsList(currCommPage.value)
            }).catch((err) => {
              console.error(err)
            })
          }
        }
      })
    }

    const resize = (evt) => {
      evt.target.style.height = '1px'
      evt.target.style.height = (12 + evt.target.scrollHeight) + 'px'
    }

    const setPage = (page = currCommPage.value) => {
      getCommentsList(currCommPage.value = page)
    }

    return {
      comment, addComment, resize, commentList, getCommentsList, currCommPage, numOfCommPage,
      modifyId, newComment, subCommId, subComment, nickname, addSubComment, modifyComment, deleteComment,
      commentCnt, setPage
    }
  }
}
</script>

<style scoped>
.pf_img {
  float: left;
  margin-right: 10px;
}
img {
  border-radius: 50%;
  width: 50px;
  height: 50px;
}
.comment-content {
  float: left;
  width: 90%;
}
.comment-options {
  border: unset;
}
</style>