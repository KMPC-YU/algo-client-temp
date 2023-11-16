<template>
  <div class="row justify-content-center my-4">
    <div class="col-auto">
      <div class="d-md-block">
        <select v-model="selectedSort" class="form-select">
          <option value="foodId,DESC" selected>최신순</option>
          <option value="likeCount,DESC">즐겨찾기순</option>
        </select>
      </div>
    </div>
    <div class="col-7">
      <div class="" role="search">
        <div class="input-group">
          <input type="text" class="form-control" v-model="searchText" placeholder="검색어를 입력하세요" @keyup.enter="searchFood">
          <button class="btn btn-primary" @click="searchFood">
            <i class="bi bi-search"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="col-auto">
      <router-link :to="{name: 'FoodWrite'}" class="btn btn-primary">
        <i class="bi bi-pencil"></i>
        &nbsp;식품 추가
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
  <!--최근 본 식품-->
<!--  <div class="col-2 mt-4">-->
<!--    <div class="accordion position-sticky" style="top: 2rem;">-->
<!--      <div class="accordion-item">-->
<!--        <div class="accordion-header">-->
<!--          <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#leftMenu">-->
<!--            최근 본 식품-->
<!--          </button>-->
<!--        </div>-->
<!--        <div id="leftMenu" class="accordion-collapse collapse show" style="width: 110%">-->
<!--          <div class="accordion-body">-->
<!--            <ul class="list-group list-group-flush text-center" style=" max-height: 800px;-->
<!--                  overflow-y:auto;">-->
<!--              <li v-for="viewFood in viewFoodList" :key="viewFood.id" class="list-group-item">-->
<!--                <img :src="viewFood.food_image_url" height="100" width="100" alt="" /><br />-->
<!--                <router-link :to="{ name: 'FoodDetail', params: { food_id: viewFood.id } }"-->
<!--                             class="food-name stretched-link">{{ viewFood.food_name }}</router-link>-->
<!--              </li>-->
<!--            </ul>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->

  <section id="recipeList" class="col-8 card mt-4 shadow p-3 mb-5 bg-body">
    <div class="text-center">
      <div class="row row-cols-1 row-cols-lg-2 row-cols-xl-4 g-3">
        <div v-for="food in foodList" class="col">
          <FoodCard :food-data="food"></FoodCard>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center">
      <Pagination :currentPage="currentPage" :pageDisplayCount="pageDisplayCount" :totalPageCount="totalPageCount" @change="setPage" />
    </div>
  </section>
  <!--추천식품-->
<!--  <div class="col-2 mt-4">-->
<!--    <div class="accordion position-sticky" style="top: 2rem;">-->
<!--      <div class="accordion-item">-->
<!--        <div class="accordion-header">-->
<!--          <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#rightMenu">-->
<!--            추천 식품-->
<!--          </button>-->
<!--        </div>-->
<!--        <div id="rightMenu" class="accordion-collapse collapse show">-->
<!--          <div class="accordion-body">-->
<!--            <ul class="list-group list-group-flush text-center">-->
<!--              <li v-for="recFood in recFoodList" :key="recFood.id" class="list-group-item">-->
<!--                <img :src=recFood.food_image_url height="100" width="100" alt="" /><br />-->
<!--                <router-link :to="{ name: 'FoodView', params: { food_id: recFood.id } }"-->
<!--                             class="food-name stretched-link">{{ recFood.food_name }}</router-link>-->
<!--              </li>-->
<!--            </ul>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
</template>

<script>
import { onMounted, ref, watch } from 'vue'
import * as FoodAPI from '@/services/food.js'
import { allergyData } from '@/components/allergyData.js'
import Pagination from '@/components/Pagination.vue'
import FoodCard from "@compo/food/FoodCard.vue";


export default {
  components: {
    Pagination,
    FoodCard
  },
  setup() {
    const foodList = ref('')  // getFoodList()로 가져온 식품 데이터
    const recFoodList = ref('')
    const viewFoodList = ref('')
    const isAdmin = ref(false)

    watch(allergyData.value, () => {
      setAllergy_filter()
    })

    const getUserAllergy = () => {
      FoodAPI.getUserAllergy()
          .then((res) => {
            const user_allergies = res.data;

            for (const item of allergyData.value) {
              item.selected = user_allergies.includes(item.name);
            }
            setAllergy_filter()
            getFoodList(1)
          })
          .catch((err) => {
            console.error(err)
          })
    }

    let allergy_filter = ref([])
    const setAllergy_filter = () => {
      allergy_filter = allergyData.value
          .filter((item) => item.selected)
          .map((item) => item.name);
    };

    const searchText = ref('')  // 검색
    const selectedSort = ref('foodId,DESC') // 정렬
    const currentPage = ref(1)
    const pageDisplayCount = ref(10)
    const totalPageCount = ref()

    const getFoodList = (page = currentPage.value) => {
      console.log('나 호출됨 ㅋ' + page)
      setAllergy_filter()
      FoodAPI.getFoodList(page, selectedSort.value, searchText.value, allergy_filter)
          .then((res) => {
            totalPageCount.value = parseInt(res.headers['x-page-count']) === 0 ? 1 : parseInt(res.headers['x-page-count'])
            if (res.data.length !== 0) {
              foodList.value = res.data
            } else {
              foodList.value = null
            }
          })
          .catch((err) => {
            console.error(err)
          })
    }

    // Todo: 백엔드 구현 후 테스트해보기
    const getRecentFood = () => {
      FoodAPI.getRecentFood().then((res) => {
        viewFoodList.value = res.data
        console.log(res.data)
      })
    }

    // Todo: 백엔드 구현 후 테스트해보기
    const getRecommendFood = () => {
      FoodAPI.getRecommendFood()
          .then(res => recFoodList.value = res.data)
          .catch(err => console.error(err))
    }

    const setPage = (page) => {
      currentPage.value = page
      getFoodList(page)
    }

    const searchFood = () => {
      currentPage.value = 1
      getFoodList(1)
    }

    const checkPermission = () => {
      isAdmin.value = false
      FoodAPI.isAdmin().then(() => isAdmin.value = true)
      // if (store.state.isLogin) {
      //   if (store.state.isAdmin) {
      //     axiosGet('/api/v1/admin', () => {
      //       isAdmin.value = true
      //     }, () => {
      //       isAdmin.value = false
      //     })
      //   }
      // }
    }

    const favorite = (isLike, foodId) => {
      FoodAPI.favorite(isLike, foodId)
          .then(() => location.reload())
    }

    watch(selectedSort, () => {
      getFoodList(1)
    })

    onMounted(() => {
      getUserAllergy()
      getRecommendFood()
      getRecentFood()
      checkPermission()
    })

    return {
      allergyData,
      getFoodList,
      searchFood,
      foodList,
      searchText,
      currentPage,
      pageDisplayCount,
      totalPageCount,
      setPage,
      getRecommendFood,
      recFoodList,
      viewFoodList,
      isAdmin,
      favorite,
      selectedSort,
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
#recipeList {
  width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
}
</style>