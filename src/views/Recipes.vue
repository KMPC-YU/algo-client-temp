<template>
  <RecipeCarousel></RecipeCarousel>
  <div class="row justify-content-center my-4">
    <div class="col-auto">
      <div class="d-md-block">
        <select v-model="selectedSort" class="form-select">
          <option value="createdAt,DESC" selected>최신순</option>
          <option value="likeCount,DESC">추천순</option>
          <option value="viewCount,DESC">조회순</option>
          <option value="ratePoint,DESC">별점순</option>
        </select>
      </div>
    </div>
    <div class="col-7">
      <form class="" role="search">
        <div class="input-group">
          <input type="text" class="form-control" placeholder="검색어를 입력하세요" aria-label="Input group example" aria-describedby="basic-addon1">
          <button class="btn btn-primary" id="basic-addon1">
            <i class="bi bi-search"></i>
          </button>
        </div>
      </form>
    </div>
    <div class="col-auto">
      <router-link :to="{name: 'RecipeWrite'}" class="btn btn-primary">
        <i class="bi bi-pencil"></i>
        &nbsp;레시피 작성
      </router-link>
    </div>
  </div>
  <div class="m-3">
    <p class="d-inline-flex gap-1">
      <button class="btn btn-light dropdown-toggle" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
        알레르기 필터링
      </button>
    </p>
    <div class="collapse" id="collapseExample">
      <div class="card card-body">
        <div class="row text-center">
          <div v-for="allergy in allergyData" :key="allergy.name" class="col-lg-1 col-2">
            <input type="checkbox" :id="allergy.name" v-model="selectedAllergies" :value="allergy.name" class="d-none">
            <label :for="allergy.mean" class="allergy-icon">
              <img :src="allergy.src" :alt="allergy.name" width="30">
              <span class="small d-block">{{ allergy.mean }}</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
  <section id="recipeList">
    <div class="my-4">
      <div class="container text-center">
        <div class="row row-cols-1 row-cols-lg-2 row-cols-xl-4 g-3">
          <div class="col"><RecipeCard></RecipeCard></div>
          <div class="col"><RecipeCard></RecipeCard></div>
          <div class="col"><RecipeCard></RecipeCard></div>
          <div class="col"><RecipeCard></RecipeCard></div>
          <div class="col"><RecipeCard></RecipeCard></div>
          <div class="col"><RecipeCard></RecipeCard></div>
          <div class="col"><RecipeCard></RecipeCard></div>
          <div class="col"><RecipeCard></RecipeCard></div>
          <div class="col"><RecipeCard></RecipeCard></div>
          <div class="col"><RecipeCard></RecipeCard></div>
          <div class="col"><RecipeCard></RecipeCard></div>
          <div class="col"><RecipeCard></RecipeCard></div>
        </div>
      </div>
    </div>
  </section>
  <div class="d-flex justify-content-center">
    <Pagination></Pagination>
  </div>
</template>

<script>
import RecipeCarousel from "@compo/recipe/RecipeCarousel.vue";
import { allergyData } from "@compo/allergyData.js";
import RecipeCard from "@compo/recipe/RecipeCard.vue";
import Pagination from "@compo/Pagination.vue";


export default {
  components: {
    Pagination,
    RecipeCard,
    RecipeCarousel,
  },
  setup() {


    return {
      allergyData,
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  //max-width: 1100px;
  margin: 0 auto;
  border: unset;
}
.allergy-icon {
  opacity:0.3;
  cursor: pointer;
  transition:all .3s ease;
}
.allergy-icon:hover {
  opacity:1.0;
  transform:scale(1.15);
}
input[type="checkbox"]:checked + .allergy-icon {
  opacity: 1.0;
  transform:scale(1.15);
  font-weight: bold;
}

</style>