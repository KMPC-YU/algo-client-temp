<template>
  <router-link :to="{name:'RecipeView', params: { recipe_id: recipeData.recipe_id }}">
    <div class="card">
      <img :src="recipeData.recipe_thumbnail" alt="recipe thumbnail" class="card-img-top">
      <div class="card-body">
        <span class="title fw-medium">{{recipeData.recipe_title}}</span>
        <div class="my-2 d-flex">
          <div class="pf_img">
            <img src="http://algo.dothome.co.kr/img/no_profile.gif" alt="profile_image">
            <span class="mx-2">{{ recipeData.author }}</span>
          </div>
        </div>
        <div class="d-flex small">
          <div class="d-flex align-items-center">
            <span class="text-warning me-1">
<!--              TODO: 별점 표시-->
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
            </span>
            <span class="recipe-info text-muted">({{recipeData.rating}})</span>
          </div>
          <div class="recipe-info d-flex align-items-center ms-3">
            <span class="text-muted">조회수 {{ recipeData.view_count }}</span>
            <span class="text-muted ms-2">좋아요 {{ recipeData.like_count }}</span>
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
import {ref} from "vue";
import recipes from "../../views/Recipes.vue";

export default {
  computed: {
    recipes() {
      return recipes
    }
  },
  props: {
    recipeData: {
      type: Object,
      required: true,
    }
  },
  setup(props, { emit }) {
    const recipeData = ref(props.recipeData)

    return {
      recipeData,
    }
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