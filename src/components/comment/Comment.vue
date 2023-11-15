<template>
  <div>
    <div class="">
      <div class="pf_img">
        <img src="http://algo.dothome.co.kr/img/no_profile.gif" alt="profile_image">
      </div>
      <div class="comment-content">
        <h6 class="text-body-secondary">관리자&nbsp;&nbsp;2023.11.13&nbsp;12:49</h6>
        <p>댓글 내용입니다.</p>
      </div>
      <div class="dropdown">
        <button class="btn comment-options btn-lg" data-bs-toggle="dropdown" aria-expanded="false">
          <i class="bi bi-three-dots-vertical text-muted"></i>
        </button>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="#">답변</a></li>
          <li><a class="dropdown-item" href="#">수정</a></li>
          <li><a class="dropdown-item" href="#">삭제</a></li>
        </ul>
      </div>
    </div>
  </div>
  <div>
    <hr/>
    <div class="ms-5">
      <div class="pf_img">
        <img src="http://algo.dothome.co.kr/img/no_profile.gif" alt="profile_image">
      </div>
      <div class="comment-content">
        <h6 class="text-body-secondary">관리자&nbsp;&nbsp;2023.11.13&nbsp;12:49</h6>
        <p>답글 내용입니다.</p>
      </div>
      <div class="dropdown">
        <button class="btn comment-options btn-lg" data-bs-toggle="dropdown" aria-expanded="false">
          <i class="bi bi-three-dots-vertical text-muted"></i>
        </button>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="#">답변</a></li>
          <li><a class="dropdown-item" href="#">수정</a></li>
          <li><a class="dropdown-item" href="#">삭제</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {


    return {}
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