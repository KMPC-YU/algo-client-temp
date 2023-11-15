<template>
  <div class="container p-5">
    <div class="text-center">
      <div class="row justify-content-center mb-2">
        <div class="col-10">
          <div class="col card">
            <!-- category -->
            <div class="text-center mt-3 mb-2">
              <img :src="`https://img.shields.io/badge/종류-${recipeData.category}-ff69b4`" height="25"/>
            </div>
            <!-- thumbnail -->
            <div class="text-center mb-2" style="position: relative;">
              <img class="thumbnail" :src="recipeData.complete_img">
            </div>
            <!-- author -->
            <div class="text-center mb-4" style="position: relative; top: -55px;">
              <img class="author mb-1" :src="recipeData.author_profile_img">
              <h5>
                <a class="text-link" :href="`/profiles/${recipeData.author}`"> {{ recipeData.author }}</a>
              </h5>
            </div>
            <!-- title -->
            <div class="text-center mb-4" style="position: relative; top: -55px;">
              <h1>{{ recipeData.recipe_title }}</h1>
              <h5>{{ recipeData.recipe_sub_title }}</h5>
            </div>
            <!-- recipe info -->
            <div class="row justify-content-center text-center" style="position: relative; top: -55px;">
              <div class="col-2">
                <h3><i class="bi bi-people-fill text-secondary"></i></h3>
                <h5>{{ recipeData.recipe_info?.people_count }}</h5>
              </div>
              <div class="col-2">
                <h3><i class="bi bi-stopwatch-fill text-success"></i></h3>
                <h5>{{ recipeData.recipe_info?.time }}</h5>
              </div>
              <div class="col-2">
                <h3><i class="bi bi-speedometer text-danger"></i></h3>
                <h5>{{ recipeData.recipe_info?.difficulty }}</h5>
              </div>
              <div class="col-2">
                <h3><i class="bi bi-star-fill text-warning"></i></h3>
                <h5>{{ (recipeData.rate / 2.0).toFixed(1) + ' (' + recipeData.rate_user_count + ')' }}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- ingredients & allergies -->
      <div class="row justify-content-center mb-2">
        <div class="col-5 pe-1">
          <div class="col card">
            <div class="card-body">
              <h5 class="fw-bold mt-2 mb-4">재료</h5>
              <div v-for="item in recipeData.ingredients" class="row mb-2">
                <div class="col">
                  <div>{{ item.name === '' ? '-' : item.name }}</div>
                </div>
                <div class="col">
                  <div>{{ item.amount === '' ? '-' : item.amount }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-5 ps-1">
          <div class="col card">
            <div class="card-body">
              <h5 class="fw-bold mt-2 mb-4">재료 알레르기 분류</h5>
              <div v-for="allergies in allergyList" class="mb-2">
                {{ allergies }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- steps -->
      <div class="row justify-content-center mb-2">
        <div class="col-10">
          <div class="col card">
            <div class="card-body">
              <h5 class="fw-bold mt-2 mb-4">요리 순서</h5>
              <div v-for="step in recipeData.recipe_steps" class="row justify-content-around mb-2">
                <div class="col-4 text-center align-self-center">
                  <div>{{ step.content === '' ? '-' : step.content }}</div>
                </div>
                <div class="col-4"><img class="order-img" :src="step.image"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row justify-content-center mb-2">
        <!-- complete image -->
        <div class="col-10">
          <div class="col card">
            <div class="card-body">
              <h5 class="fw-bold mt-2 mb-4">완성 사진</h5>
              <img class="thumbnail mb-3" :src="recipeData.complete_img">
            </div>
          </div>
        </div>
      </div>
      <div class="row justify-content-center mb-5">
        <!-- tips -->
        <div class="col-10">
          <div class="col card">
            <div class="card-body">
              <h5 class="fw-bold mt-2 mb-4">요리 팁</h5>
              <div class="row">
                <img class="author p-0 ms-5" :src="recipeData.author_profile_img">
                <div class="col text-start">
                  <span class="fw-bold me-1">
                    <a class="text-link text-body" :href="`/profiles/${recipeData.author}`">{{ recipeData.author }}</a>
                  </span>
                  <div>{{ recipeData.recipe_tip === '' ? '.' : recipeData.recipe_tip }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="text-center">
      <div class="btn-group dropup dropup-center mx-2">
        <button type="button" class="btn btn-light dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
          <i class="bi bi-star-fill text-warning" :class="recipeData.user_rate ?? 'bi-star'">&nbsp;</i>
          <span class="badge text-bg-warning">{{ recipeData.user_rate === null ? null : (recipeData.user_rate / 2)?.toFixed(1) }}</span>
        </button>
        <ul class="dropdown-menu">
          <li v-for="rate in rating">
            <a class="dropdown-item text-center" href="#" @click.prevent="onRating(rate)">
              <i class="bi text-warning" :class="rate > 0.5 ? 'bi-star-fill' : rate === 0.5 ? 'bi-star-half' : 'bi-star'"></i>
              <i class="bi text-warning" :class="rate > 1.5 ? 'bi-star-fill' : rate === 1.5 ? 'bi-star-half' : 'bi-star'"></i>
              <i class="bi text-warning" :class="rate > 2.5 ? 'bi-star-fill' : rate === 2.5 ? 'bi-star-half' : 'bi-star'"></i>
              <i class="bi text-warning" :class="rate > 3.5 ? 'bi-star-fill' : rate === 3.5 ? 'bi-star-half' : 'bi-star'"></i>
              <i class="bi text-warning" :class="rate > 4.5 ? 'bi-star-fill' : rate === 4.5 ? 'bi-star-half' : 'bi-star'"></i>
              &nbsp;({{ rate.toFixed(1) }})
            </a>
          </li>
          <li><a class="dropdown-item text-center text-danger fw-bold" href="#" @click.prevent="onRating(null)">별점 삭제</a></li>
        </ul>
      </div>
      <button type="button" class="btn mx-2" :class="recipeData.is_like ? 'btn-warning' : 'btn-outline-warning'" @click="favorite">
        <i class="bi text-danger" :class="recipeData.is_like ? 'bi-heart-fill': 'bi-heart'"></i>
      </button>
      <router-link type="button" class="btn btn-primary mx-2" :to="{ name: 'RecipeModify', params: { recipe_id: recipeId } }">
        수정
      </router-link>
      <button type="button" class="btn btn-danger mx-2" @click="deleteRecipe">
        삭제
      </button>
      <button type="button" class="btn btn-secondary mx-2" @click="gotoList">
        목록
      </button>
    </div>
    <div class="row justify-content-center mt-4">
      <hr class="col-10">
      <div class="col-10 mt-1">
        <Comment boardID="Recipe" :postID="recipeId"/>
      </div>
    </div>
  </div>
</template>

<script>
import Comment from '@/components/comment/Comment.vue'
import * as RecipeAPI from '@/services/recipe.js'
import router from '@/router'
import { useRoute } from 'vue-router'
import Swal from 'sweetalert2'
import { allergyData } from "@compo/allergyData.js";
import { ref, computed, onMounted } from 'vue'

export default {
  components: {
    Comment,
  },
  setup() {
    onMounted(() => {
      getRecipeDetail()
    })

    const route = useRoute()
    const recipeId = computed(() => route.params.recipe_id)
    const recipeData = ref({})
    const allergyList = ref([])
    const rating = ref([ 5.0, 4.5, 4.0, 3.5, 3.0, 2.5, 2.0, 1.5, 1.0, 0.5, 0.0 ])

    const getRecipeDetail = () => {
      RecipeAPI.getRecipe(recipeId.value)
          .then((res) => {
            recipeData.value = res.data
            const temp = res.data.ingredients.map(e =>  e.allergy) // ex. [['BEEF', 'CHICKEN', 'EGGS'], [], ['WHEAT']]
            // console.log(recipeData.value)
            allergyList.value = temp.map(e => {
              return e.length === 0 ? '-' :
                  e.map(item => allergyData.value.find(allergy => allergy.name === item)?.mean)
                      .filter(mean => mean !== undefined).join(' ')
            })
            // console.log(allergyList.value)
          })
    }

    const onRating = (rate) => { // 서버는 0 ~ 10으로 처리하므로 *2 해야함
      if (recipeData.value.user_rate === null && rate !== null) { // 처음 별점 부여할 때
        RecipeAPI.createRates(recipeId.value, rate * 2).then(() => getRecipeDetail())
      } else if (rate !== null) { // 별점을 수정할 때
        RecipeAPI.updateRates(recipeId.value, rate * 2).then(() => getRecipeDetail())
      } else if (recipeData.value.user_rate !== null) { // 별점을 삭제할 때
        RecipeAPI.deleteRates(recipeId.value).then(() => getRecipeDetail())
      }
    }

    const favorite = () => {
      RecipeAPI.favorite(recipeData.value.is_like, recipeId.value)
          .then(() => getRecipeDetail())
    }

    const deleteRecipe = () => {
      Swal.fire({
        title: '레시피를 삭제하시겠습니까?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '삭제',
        cancelButtonText: '취소',
      }).then((res) => {
        if (res.isConfirmed) {
          RecipeAPI.deleteRecipe(recipeId.value)
              .then(() => { router.go(-1) })
        }
      })
    }

    const gotoList = () => {
      router.push({ name: 'RecipeList' }).then(() => location.reload())
    }
    return {
      recipeId,
      recipeData,
      allergyList,
      rating,
      onRating,
      favorite,
      deleteRecipe,
      gotoList,
    }
  }
}
</script>

<style scoped>
.thumbnail {
  max-height: 400px;
  width: 100%;
  height: 100%;
  object-fit: scale-down;
}
.order-img {
  max-height: 200px;
  width: 100%;
  height: 100%;
  object-fit: scale-down;
}

.author {
  width: 100px;
  height: 100px;
  border-radius: 100%;
  object-fit: cover;
}
.text-link {
  color: black;
  text-decoration: none;
}
.text-link:hover {
  text-decoration: underline;
}

.card {
  border-radius: 0;
}
</style>