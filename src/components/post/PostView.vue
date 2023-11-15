<template>
  <button class="btn btn-light mb-3"><i class="bi bi-list"></i>&nbsp;목록으로</button>
  <div class="card">
    <div class="card-body">
      <h6>공지사항</h6>
      <h5 class="card-title fw-bold mt-2">공지사항입니다.</h5>
      <div class="mt-3">
        <div class="pf_img">
          <img src="http://algo.dothome.co.kr/img/no_profile.gif" alt="profile_image">
        </div>
        <h6 class="card-subtitle mb-2 text-body-secondary">관리자&nbsp;&nbsp;2023.11.13&nbsp;&nbsp;추천 1&nbsp;&nbsp;조회수 1763&nbsp;&nbsp;댓글 22</h6>
      </div>
      <hr>
      <p class="card-text">게시글 내용입니다.</p>
      <div class="d-flex justify-content-between align-items-center">
        <div class="left">
          <button class="btn btn-light"><i class="bi bi-list"></i>&nbsp;목록으로</button>
        </div>
        <div class="right">
          <button class="btn btn-light"><i class="bi bi-hand-thumbs-up"></i>&nbsp;추천</button>
          <button class="btn btn-light mx-2"><i class="bi bi-pencil-square"></i>&nbsp;수정</button>
          <button class="btn btn-light"><i class="bi bi-trash3"></i>&nbsp;삭제</button>
        </div>
      </div>

      <h5 class="fw-bold mt-4">댓글 (0)</h5>
      <div class="row card-body comment mx-1">
        <textarea class="comment-input" v-model="comment" placeholder="댓글을 남겨보세요"/>
        <div class="d-flex justify-content-end comment-write mt-3">
          <button class="btn btn-secondary">등록</button>
        </div>
      </div>
      <hr/>
      <comment></comment>
    </div>
  </div>
</template>

<script>
import comment from "@compo/comment/Comment.vue";
export default {
  components: {
    comment
  },
  setup() {


    return {}
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
.comment {
  background-color: #f8f9fc;
  border-radius: 8px;
}
.comment-input {
  background-color: unset;
  border: unset;
}
textarea {
  outline: none;
}
.comment-write {
  padding-right: unset;
}
</style>