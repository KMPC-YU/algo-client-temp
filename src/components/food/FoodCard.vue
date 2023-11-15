<template>
  <router-link :to="{name:'FoodView'}">
    <img src="https://via.placeholder.com/150" alt="recipe thumbnail" class="card card-img-top">
    <i type="button" class="like bi bi-star"></i>
  </router-link>
  <div class="my-2 mb-4">
    <span class="title fw-medium">식품 제목입니다.</span>
    <div class="recipe-info d-flex justify-content-start small text-muted">
      <i class="bi bi-star"></i>
      <span class="mx-1">9</span>
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

<style lang="scss" scoped>
a {
  color: black;
  text-decoration: none;
}
.card img{
  transition: all 0.2s ease-in;
  border: none;
  border-radius: unset;
}
.card img:hover {
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
hr {
  margin: 5px 0;
}
.like {
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>