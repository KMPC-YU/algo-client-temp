<template>
  <router-link :to="{name:'RecipeView'}">
    <div class="card">
      <img src="https://via.placeholder.com/150" alt="recipe thumbnail" class="card-img-top">
      <div class="card-body">
        <span class="title fw-medium">레시피 제목입니다.</span>
        <div class="my-2 d-flex">
          <div class="pf_img">
            <img src="http://algo.dothome.co.kr/img/no_profile.gif" alt="profile_image">
            <span class="mx-2">관리자</span>
          </div>
        </div>
        <div class="d-flex small">
          <div class="d-flex align-items-center">
            <span class="text-warning me-1">
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
            </span>
            <span class="recipe-info text-muted">(5.0)</span>
          </div>
          <div class="recipe-info d-flex align-items-center ms-3">
            <span class="text-muted">조회수 22</span>
            <span class="text-muted ms-2">좋아요 12</span>
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  setup() {


    return {}
  }
}
</script>

<style lang="scss" scoped>
a {
  color: black;
  text-decoration: none;
}
.card {
  transition: all 0.2s ease-in;
  border: none;
}
.card:hover {
  transform: scale(1.02);
}
.title {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
}
.pf_img {
  float: left;
  margin-right: 10px;
}
.pf_img img {
  border-radius: 50%;
  width: 25px;
  height: 25px;
}
.recipe-info {
  margin-top: 2px;
}
</style>