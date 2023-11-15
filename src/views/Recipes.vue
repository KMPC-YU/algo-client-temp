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
          <input type="text" class="form-control" v-model="keyword" @keyup.enter="setPage(1)" placeholder="검색어를 입력하세요" aria-label="Input group example" aria-describedby="basic-addon1">
          <button class="btn btn-primary" id="basic-addon1" @click="setPage(1)">
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
  <div class="row justify-content-center m-3">
    <div class="card p-4 bg-body">
      <div>
        <div class="form-check form-check-inline" v-for="data in allergyData" :key="data.id">
          <input class="form-check-input" type="checkbox" v-model="data.selected" :id="`${data.name}`"
                 :value="`${data.name}`">
          <span class="form-check-label">{{ data.mean }}</span>
        </div>
      </div>
    </div>
  </div>
  <section id="recipeList">
    <div class="my-4">
      <div class="container text-center">
        <div class="row row-cols-1 row-cols-lg-2 row-cols-xl-4 g-3">
          <div v-for="recipe in recipeList" class="col">
            <RecipeCard :recipe-data="recipe"></RecipeCard>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div class="d-flex justify-content-center">
    <Pagination :currentPage="currentPage" :pageDisplayCount="5" :totalPageCount="totalPageNum" @change="setPage"/>
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import RecipeCarousel from "@compo/recipe/RecipeCarousel.vue";
import { allergyData } from "@compo/allergyData.js";
import RecipeCard from "@compo/recipe/RecipeCard.vue";
import Pagination from "@compo/Pagination.vue";
import * as RecipeAPI from "@/services/recipe.js";

export default {
  components: {
    Pagination,
    RecipeCard,
    RecipeCarousel,
  },
  setup() {
    onMounted(() => {
      getUserAllergy()
    })

    const recipeList = ref([])
    const currentPage = ref(1)
    const selectedSort = ref('createdAt,DESC')
    const keyword = ref('')
    const category = ref('')
    const allergyFilter = ref([])
    const totalPageNum = ref()

    watch([allergyData.value, selectedSort, category], () => {
      getRecipeList(1)
    })

    const getUserAllergy = () => {
      RecipeAPI.getUserAllergy()
          .then((res) => {
            const userAllergies = res.data
            for (const item of allergyData.value) {
              item.selected = userAllergies.includes(item.name)
            }
            // setAllergyFilter()
            getRecipeList(1)
          })
    }

    const setAllergyFilter = () => {
      allergyFilter.value = allergyData.value
          .filter(e => e.selected)
          .map(e => e.name)
    }

    const getRecipeList = (page = currentPage.value) => {
      setAllergyFilter()
      RecipeAPI.getRecipeList(page, selectedSort.value, keyword.value, category.value, allergyFilter.value)
          .then((res) => {
            totalPageNum.value = parseInt(res.headers['x-page-count']) === 0 ? 1 : parseInt(res.headers['x-page-count'])
            recipeList.value = res.data
            // console.log(recipeList.value)
          })
    }

    const setPage = (page = currentPage.value) => {
      getRecipeList(currentPage.value = page)
    }

    return {
      allergyData,
      recipeList,
      keyword,
      category,
      currentPage,
      totalPageNum,
      selectedSort,
      setPage,
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