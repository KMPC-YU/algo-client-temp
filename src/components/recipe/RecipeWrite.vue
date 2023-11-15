<template>
  <div class="recipe-container mx-auto">
    <div class="card card-body p-5 mb-3">
      <div class="card-title">
        <div class="fw-bold fs-4 mb-3">
          레시피 정보
        </div>
      </div>
      <div class="row g-3 align-items-center">
        <div class="col-md-9">
          <div>
            <div class="row mb-3 g-3">
              <div class="col-2">
                <label for="recipeTitle" class="fw-medium col-form-label">레시피 제목</label>
              </div>
              <div class="col-9">
                <input type="text" v-model="recipeInfo.name" id="recipeTitle" class="form-control" placeholder="레시피 이름을 입력해 주세요.">
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-2">
                <label for="recipeIntro" class="fw-medium col-form-label">레시피 소개</label>
              </div>
              <div class="col-9">
                <input type="text" v-model="recipeInfo.intro" id="recipeIntro" class="form-control" placeholder="레시피에 대한 간단한 설명을 입력하세요.">
              </div>
            </div>
            <div class="row mb-3 g-3">
              <div class="col-2">
                <label for="recipeCategory" class="fw-medium col-form-label">카테고리</label>
              </div>
              <div class="col-9">
                <select v-model="recipeInfo.type" class="form-select" aria-label="Default select example">
                  <option selected>종류 선택</option>
                  <option value="밑반찬">밑반찬</option>
                  <option value="메인반찬">메인반찬</option>
                  <option value="국/탕">국/탕</option>
                  <option value="찌개">찌개</option>
                  <option value="디저트">디저트</option>
                  <option value="면/만두">면/만두</option>
                  <option value="밥/죽/떡">밥/죽/떡</option>
                  <option value="퓨전">퓨전</option>
                  <option value="김치/젓갈/장류">김치/젓갈/장류</option>
                  <option value="양념/소스/잼">양념/소스/잼</option>
                  <option value="양식">양식</option>
                  <option value="샐러드">샐러드</option>
                  <option value="스프">스프</option>
                  <option value="빵">빵</option>
                  <option value="과자">과자</option>
                  <option value="차/음료/술">차/음료/술</option>
                  <option value="기타">기타</option>
                </select>
              </div>
            </div>
            <div class="row mb-3 g-3">
              <div class="col-2">
                <label for="recipeCategory" class="fw-medium col-form-label">요리정보</label>
              </div>
              <div class="col-9">
                <div class="row">
                  <div class="col-9">
                    <div class="row">
                      <div class="col-auto">
                        <select v-model="recipeInfo.amount" class="form-select">
                          <option selected value="">인원</option>
                          <option value="1인분">1인분</option>
                          <option value="2인분">2인분</option>
                          <option value="3인분">3인분</option>
                          <option value="4인분">4인분</option>
                          <option value="5인분">5인분</option>
                          <option value="6인분 이상">6인분+</option>
                        </select>
                      </div>
                      <div class="col-auto">
                        <select v-model="recipeInfo.time" class="form-select">
                          <option selected value="">시간</option>
                          <option value="5분 이내">5분 이내</option>
                          <option value="10분 이내">10분 이내</option>
                          <option value="15분 이내">15분 이내</option>
                          <option value="20분 이내">20분 이내</option>
                          <option value="30분 이내">30분 이내</option>
                          <option value="45분 이내">45분 이내</option>
                          <option value="1시간 이내">1시간 이내</option>
                          <option value="2시간 이내">2시간 이내</option>
                          <option value="2시간 이상">2시간 이상</option>
                        </select>
                      </div>
                      <div class="col-auto">
                        <select v-model="recipeInfo.level" class="form-select">
                          <option selected value="">난이도</option>
                          <option value="누구나">누구나</option>
                          <option value="초급">초급</option>
                          <option value="중급">중급</option>
                          <option value="고급">고급</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <input type="file" ref="oldFile" @change="handleFileUpload(1)" class="d-none" />
          <img :src="recipeInfo.thumbnail" alt="..." class="img-thumbnail" @click="mainImageUploadHandler(1)">
        </div>
      </div>
    </div>
    <div class="card card-body p-5 mb-3">
      <div class="card-title">
        <div class="fw-bold fs-4 mb-3">
          요리 재료
        </div>
      </div>
      <div>
        <div class="row mb-3 g-3 align-items-center">
          <div class="col-1">
            <label for="recipeTitle" class="fw-medium col-form-label">재료명</label>
          </div>
          <div v-for="(item, idx) in ingredients" :key="item.id" class="row justify-content-center mb-2">
            <div class="col">
              <input v-model="item.name" type="text" id="recipeTitle" class="form-control" placeholder="예) 돼지고기">
            </div>
            <div class="col-3">
              <input v-model="item.amount" type="text" id="recipeTitle" class="form-control" placeholder="예) 150g">
            </div>
            <div class="col-auto">
              <button class="btn position-relative me-4" data-bs-toggle="modal" :data-bs-target="'#allergiesModal' + item.id">
                알레르기 정보
                <span v-if="item.allergy.length" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {{  item.allergy.length }}
                </span>
              </button>
              <div class="modal fade" :id="'allergiesModal' + item.id" tabindex="-1">
                <div class="modal-dialog modal-dialog-centered">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5">재료에 해당하는 알레르기를 선택해주세요.</h1>
                      <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                      <div class="row text-center">
                        <div v-for="allergy in allergyData" :key="allergy.name" class="col-3">
                          <input type="checkbox" :id="item.id + allergy.name" v-model="item.allergy" :value="allergy.name" style="display: none">
                          <label :for="item.id + allergy.name" class="allergy-icon">
                            <img :src="allergy.src" :alt="allergy.name" width="50">
                            <p class="pt-2">{{ allergy.mean }}</p>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button class="btn btn-light" @click="removeIngredient(idx)"><i class="bi bi-trash"></i></button>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-center">
          <button class="btn btn-light btn-sm" @click="addIngredient"><i class="bi bi-plus-circle-fill"></i>&nbsp;재료 추가</button>
        </div>
      </div>
    </div>
    <div class="card card-body p-5 mb-3">
      <div class="card-title">
        <div class="fw-bold fs-4 mb-3">
          요리 순서
        </div>
      </div>
      <div class="row mb-3 g-3 align-items-center">
        <div v-for="(step, idx) in steps" :key="step.id" class="row justify-content-center mb-2">
          <div class="col-auto">
            <label for="recipeStep" class="fw-bold fs-5 col-form-label">STEP {{idx+1}}</label>
          </div>
          <div class="col">
            <textarea v-model="step.content" type="text" id="recipeStep" class="form-control" placeholder="예) 돼지고기를 찬물에 잘 씻어주세요."></textarea>
          </div>
          <div class="col-auto">
            <input type="file" ref="oldFile2" @change="handleFileUpload(2)" class="d-none" />
            <img :src="step.image" width="150" alt="..." class="img-thumbnail" @click="mainImageUploadHandler(2)">
          </div>
          <div class="col-auto">
            <button class="btn-remove btn btn-light" @click="removeStep(idx)"><i class="bi bi-trash"></i></button>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-center">
        <button class="btn btn-light btn-sm" @click="addStep"><i class="bi bi-plus-circle-fill"></i>&nbsp;순서 추가</button>
      </div>
    </div>
    <div class="card card-body p-5 mb-3">
      <div class="card-title">
        <div class="fw-bold fs-4">
          요리팁
        </div>
      </div>
      <textarea v-model="tip" type="text" id="recipeTip" class="form-control" placeholder="예) 돼지고기를 찬물에 잘 씻어주세요."></textarea>
    </div>
    <div class="write-button gap-2">
      <button class="btn btn-secondary" @click="gotoLastPage">취소</button>
      <button class="btn btn-primary" @click="onSave">작성완료</button>
    </div>
  </div>
</template>

<script>
// import Vue3TagsInput from 'vue3-tags-input'
import * as RecipeAPI from '@/services/recipe.js'
import router from "@/router/index.js";
import { useRoute } from 'vue-router'
import { allergyData } from "@compo/allergyData.js";
import Swal from 'sweetalert2'
import { ref, computed, onMounted } from 'vue'
import axios from "axios";

export default {
  setup() {
    onMounted(() => {
      if (route.path.endsWith('modify')) getRecipeData()
    })

    const route = useRoute()
    const recipeId = computed(() => route.params.recipe_id)

    const getRecipeData = () => {
      RecipeAPI.getRecipe(recipeId.value)
          .then((res) => {
            recipeInfo.value.thumbnail = res.data.recipe_thumbnail
            recipeInfo.value.name = res.data.recipe_title
            recipeInfo.value.intro = res.data.recipe_sub_title
            recipeInfo.value.type = res.data.category
            recipeInfo.value.amount = res.data.recipe_info.people_count
            recipeInfo.value.time = res.data.recipe_info.time
            recipeInfo.value.level = res.data.recipe_info.difficulty
            ingredients.value = res.data.ingredients.map((e) => { return { id: ingrId.value++, ...e  } })
            steps.value = res.data.recipe_steps.map((e) => { return { id: stepId.value++, ...e  } })
            tip.value = res.data.recipe_tip
            tags.value = res.data.recipe_tag
          })
    }

    const recipeInfo = ref({
      thumbnail: '/src/assets/icons/add-image.png',
      name: '',
      intro: '',
      type: '',
      amount: '',
      time: '',
      level: '',
    })

    const ingrId = ref(0)
    const ingredients = ref([
      { id: ingrId.value, name: '', amount: '', allergy: [] },
    ])
    const addIngredient = () => {
      ingrId.value++
      ingredients.value.push({ id: ingrId.value, name: '', amount: '', allergy: [] })
    }
    const removeIngredient = (idx) => {
      ingredients.value.splice(idx, 1)
    }

    const stepId = ref(0)
    const steps = ref([
      { id: stepId.value, content: '', image: '/src/assets/icons/add-image.png' },
    ])
    const addStep = () => {
      stepId.value++
      steps.value.push({ id: stepId.value, content: '', image: '/src/assets/icons/add-image.png' })
    }
    const removeStep = (idx) => {
      steps.value.splice(idx, 1)
    }

    /****************************** 메인 이미지 업로드 ******************************/
    const oldFile = ref(null)
    const oldFile2 = ref(null)
    const newFile = ref(null)
    const fileName = ref('')
    let imgUrl
    const handleFileUpload = (num) => {
      let blobURL = null
      if(num === 1){
        blobURL = URL.createObjectURL(oldFile.value.files[0]);
      }
      else{
        blobURL = URL.createObjectURL(oldFile2.value.files[0]);
      }
      const img = new Image();
      img.src = blobURL;
      img.onload = function () {
        let list = new DataTransfer();
        if (num === 1) {
          imageSizeChange(img,oldFile.value.files[0].size)
          list.items.add(new File([dataURItoBlob(imgUrl)], oldFile.value.files[0].name,{
            type: oldFile.value.files[0].type,
          }));
          newFile.value = list.files
        }
        else{
          imageSizeChange(img,oldFile2.value.files[0].size)
          list.items.add(new File([dataURItoBlob(imgUrl)], oldFile2.value.files[0].name,{
            type: oldFile2.value.files[0].type,
          }));
          newFile.value = list.files
        }
      }
      if(num === 1) {
        fileName.value = oldFile.value.files[0].name
      }
      else{
        fileName.value = oldFile2.value.files[0].name
      }
      requestAuth(num)
    }
    const requestAuth = (num) => { // 이미지 업로드 권한 취득
      console.log('RequestAuth Called')
      axios.post('http://be.algo.r-e.kr:8080/api/v1/recipes/images', {
        file_name: fileName.value,
        image_request_type: "POST",
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        withCredentials: true,
      }).then((res) => {
        filePath.value = res.data.substring(res.data.indexOf('amazonaws.com') + 14, res.data.indexOf('?'))  // 이미지이름.확장자
        uploadImage(res.data, num)
      }).catch ((err) => {
        console.error(err)
      })
    }
    function dataURItoBlob(dataURI) {
      let byteString = atob(dataURI.split(',')[1]);
      let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
      let ab = new ArrayBuffer(byteString.length);
      let ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ab], {type: mimeString});
    }
    const imageSizeChange = (image,size) => {
      let canvas = document.createElement("canvas"),
          max_size = 600,
          width = image.width,
          height = image.height;
      if (width > height) {
        // 가로가 길 경우
        if (width > max_size) {
          height *= max_size / width;
          width = max_size;
        }
      } else {
        // 세로가 길 경우
        if (height > max_size) {
          width *= max_size / height;
          height = max_size;
        }
      }
      canvas.width = width;
      canvas.height = height;
      canvas.getContext("2d").drawImage(image, 0, 0, width, height);
      if(size>3*1024*1024){
        imgUrl = canvas.toDataURL("image/jpeg", 0.5);
      }
      else{
        imgUrl = canvas.toDataURL("image/jpeg", 1);
      }
    }
    const filePath = ref('')
    const uploadImage = (awsURL, num) => { // 백엔드 서버에 URL 요청
      axios.put(awsURL, newFile.value[0], {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Access-Control-Allow-Origin': '*',
        },
        withCredentials: true,
      }).then((res) => {
        insertImage(filePath.value, num)
      }).catch((err) => {
        console.error(err)
      })
    }
    const insertImage = (imageUrl, num) => { // 이미지 글쓰기 본문에 삽입
      axios.post('http://be.algo.r-e.kr:8080/api/v1/recipes/images', {
        file_name: imageUrl,  // 이미지이름.확장자
        image_request_type: "GET",
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        withCredentials: true,
      }).then ((res) => {
        if (num === 1) {
          recipeInfo.value.thumbnail = res.data.substring(0, res.data.indexOf('?'))
        } else {
          steps.value[stepId.value].image = res.data.substring(0, res.data.indexOf('?'))
        }
      }).catch ((err) => {
        console.error(err)
      })
    }
    const mainImageUploadHandler = (num) => {
      if (num === 1)
        oldFile.value.click();
      else
        oldFile2.value.click();
    }

    /****************************** 메인 이미지 업로드 ******************************/

    const completeImg = recipeInfo.value.thumbnail
    const tip = ref('')
    const tags = ref([])

    const onSave = () => {
      const tmpIngred = ingredients.value.map((e) => {
        return {
          name: e.name,
          amount: e.amount,
          allergy: e.allergy,
        }
      })
      const tmpSteps = steps.value.map((e) => {
        return {
          content: e.content,
          image: e.image,
        }
      })
      if (route.path.endsWith('modify')) {
        RecipeAPI.updateRecipe(recipeId.value, {
          recipe_id: recipeId.value,
          thumbnail: recipeInfo.value.thumbnail,
          name: recipeInfo.value.name,
          intro: recipeInfo.value.intro,
          type: recipeInfo.value.type,
          recipe_info: {
            people_count: recipeInfo.value.amount,
            time: recipeInfo.value.time,
            difficulty: recipeInfo.value.level,
          },
          ingredients: tmpIngred, // [ { 돼지고기, 150g, [ 육류, ] }, { ... }, ... ]
          steps: tmpSteps, // [ { 설명, 이미지 URL }, { ... }, ... ]
          completeImg: completeImg.value,
          tip: tip.value,
          tags: tags.value,
        })
            .then(() => {
              Swal.fire({ title: '수정 완료!', text: '레시피가 수정되었습니다.', icon: 'success', showConfirmButton: false, timer: 1500 })
                  .then(() => router.push({ name: 'RecipeList' })).then(() => location.reload())
            })
            .catch(() => {
              Swal.fire({ title: '수정 실패...', text: '이름, 소개, 카테고리는 공백일 수 없습니다.', icon: 'error', showConfirmButton: false, timer: 1500 })
            })
      } else {
        RecipeAPI.createRecipe({
          thumbnail: recipeInfo.value.thumbnail,
          name: recipeInfo.value.name,
          intro: recipeInfo.value.intro,
          type: recipeInfo.value.type,
          recipe_info: {
            people_count: recipeInfo.value.amount,
            time: recipeInfo.value.time,
            difficulty: recipeInfo.value.level,
          },
          ingredients: tmpIngred,
          steps: tmpSteps,
          completeImg: completeImg.value,
          tip: tip.value,
          tags: tags.value,
        })
            .then(() => {
              Swal.fire({ title: '작성 완료!', text: '새 레시피가 작성되었습니다.', icon: 'success', showConfirmButton: false, timer: 1500 })
                  .then(() => router.push({ name: 'RecipeList' })).then(() => location.reload())
            })
            .catch(() => {
              Swal.fire({ title: '작성 실패...', text: '이름, 소개, 카테고리는 공백일 수 없습니다.', icon: 'error', showConfirmButton: false, timer: 1500 })
            })
      }
    }

    const gotoLastPage = () => {
      router.go(-1)
    }

    return {
      allergyData, recipeInfo, completeImg, tip, tags, gotoLastPage,
      ingredients, addIngredient, removeIngredient,
      steps, addStep, removeStep,
      onSave, mainImageUploadHandler,
      oldFile, oldFile2, handleFileUpload,
    }
  }
}
</script>

<style lang="scss" scoped>
.recipe-container {
  max-width: 1000px;
}
.card {
  border: unset;
}
.card button {
  color: #0d0d0d;
  background-color: #eeeeee;
}
textarea {
  height: 150px;
}
.write-button {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
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
.btn-remove {
  margin-top: 50px;
}
.img-thumbnail {
  cursor: pointer;
}
</style>
