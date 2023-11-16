<template>
  <div class="container">
    <div class="card">
      <div class="card-body">
        <h4 v-if="!editable" class="card-title">새로운 식품 등록</h4>
        <h4 v-else class="card-title">식품 수정</h4>
        <div class="row">
          <div class="col-4">
            <div class="card mb-2">
              <img v-if="foodData.food_image_url === ''" src="/src/assets/default.png" alt="...">
              <img v-else :src=foodData.food_image_url alt="" />
            </div>
            <!--            <div class="input-group mt-3">-->
            <!--              <span class="input-group-text">이미지 URL</span>-->
            <!--              <input type="text" class="form-control" v-model="imageURL" @keyup.enter="changeImage">-->
            <!--            </div>-->
            <!--            <button class="btn btn-primary mt-2" @click="changeImage">이미지 미리보기</button>-->
            <input type="file" class="form-control" @change="fileChange" ref="oldFile">
          </div>
          <div class="col-8">
            <div class="row">
              <div class="col-3">
                <h5 class="form-label">식품명</h5>
              </div>
              <div class="col-9">
                <input type="text" class="form-control" id="food_name" v-model="foodName">
              </div>
            </div>
            <div class="row mt-4">
              <div class="col-3">
                <h5 class="form-label">식품보고번호</h5>
              </div>
              <div class="col-9">
                <input type="text" class="form-control" id="food_report_number" v-model="foodCode">
              </div>
            </div>
            <div class="row mt-4">
              <div class="col-3">
                <h5 class="form-label">식품 종류</h5>
              </div>
              <div class="col-9">
                <input type="text" class="form-control" id="product_kind" v-model="foodKind">
              </div>
            </div>
            <div class="row mt-4">
              <div class="col-3">
                <h5 class="form-label">영양 성분</h5>
              </div>
              <div class="col-9">
                <input type="text" class="form-control" id="nutrition" v-model="foodNutirition">
              </div>
            </div>
            <div class="row mt-4">
              <div class="col-3">
                <h5 class="form-label">원재료명</h5>
              </div>
              <div class="col-9">
                <input type="text" class="form-control" id="raw_materials" v-model="foodRawMeterials">
              </div>
            </div>

            <div class="mb-3 mt-4">
              <div class="card p-3 mb-3 bg-body">
                <h5>알레르기 정보</h5>
                <div>
                  <div class="form-check form-check-inline" v-for="data in allergyData" :key="data.id">
                    <input class="form-check-input" type="checkbox" v-model="data.selected" :id="`${data.name}`"
                           :value="`${data.name}`">
                    <span class="form-check-label">{{ data.mean }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <button type="button" class="btn btn-primary" @click="onSave"
                      style=" float: right;margin-left: 5px;">저장</button>
              <button type="button" class="btn btn-primary" @click="moveToFoodList" style=" float: right;">목록</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch, onMounted } from 'vue'
import * as FoodAPI from '@/services/food.js'
import Swal from 'sweetalert2'
import { useRoute, useRouter } from 'vue-router'
import {allergyData} from "@compo/allergyData.js";
import {axios} from "@bundled-es-modules/axios";

export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    const editable = ref(route.query.editable)
    const foodId = route.query.id
    const imageURL = ref('')
    const previewImage = ref('')

    const changeImage = () => {
      previewImage.value = imageURL.value
    }

    watch(imageURL, () => {
      if (imageURL.value === '') previewImage.value = ''
    })

    const foodData = ref({
      raw_materials: '',
      allergy: '',
      food_image_url: '',
      code: '',
      food_name: '',
      is_like: '',
      like_count: '',
      nutrition: '',
      product_kind: '',
    })

    const foodName = ref('')
    const foodCode = ref('')
    const foodKind = ref('')
    const foodNutirition = ref('')
    const foodRawMeterials = ref('')

    watch(allergyData.value, () => {
      setAllergy_filter()
    })

    // const checkSelected = () => {
    //   for (let i = 0; i < allergyData.value.length; i++) {
    //     allergyData.set(allergyData.value[i].name, allergyData.value[i].selected)
    //   }
    // }

    const getFoodData = () => {
      FoodAPI.getFood(foodId)
          .then((res) => {
            console.log(res.data)
            foodName.value = res.data.food_name
            foodCode.value = res.data.code
            foodKind.value = res.data.product_kind
            foodNutirition.value = res.data.nutrition
            foodRawMeterials.value = res.data.raw_materials
            foodData.value.food_image_url = res.data.food_image_url

            const food_allergies = res.data.allergy;

            for (const item of allergyData.value) {
              item.selected = food_allergies.includes(item.name);
            }
            setAllergy_filter()
          })
          .catch(err => console.error(err))
    }

    let allergy_filter = ref([])
    const setAllergy_filter = () => {
      allergy_filter = allergyData.value
          .filter((item) => item.selected)
          .map((item) => item.name);
    };

    const onSave = () => {
      if (editable.value) {
        FoodAPI.updateFood(foodId, {
          code: Number(foodCode.value),
          nutrition: foodNutirition.value,
          allergy_type: allergy_filter,
          food_name: foodName.value,
          raw_materials: foodRawMeterials.value,
          product_kind: foodKind.value,
          food_image_url: previewImage.value,
        })
            .then(() => {
              Swal.fire({ title: '수정 완료!', text: '식품 수정이 완료되었습니다.', icon: 'success', showConfirmButton: false, timer: 1500 })
                  .then(() => router.push({ name: 'FoodList' })).then(() => location.reload())
            })
            .catch(() => {
              Swal.fire({ title: '작성 내용을 다시 확인해주세요.', text: '식품 보고번호는 숫자만 가능합니다.', icon: 'error', showConfirmButton: false, timer: 1500 })
            })
      } else {
        FoodAPI.createFood({
          code: Number(foodCode.value),
          nutrition: foodNutirition.value,
          allergy_type: allergy_filter,
          food_name: foodName.value,
          raw_materials: foodRawMeterials.value,
          product_kind: foodKind.value,
          food_image_url: previewImage.value,
        })
            .then(() => {
              Swal.fire({ title: '추가 완료!', text: '새 식품이 추가되었습니다.', icon: 'success', showConfirmButton: false, timer: 1500 })
                  .then(() => router.push({ name: 'FoodList' })).then(() => location.reload())
            })
            .catch(() => {
              Swal.fire({ title: '작성 내용을 다시 확인해주세요.', text: '식품 보고번호는 숫자만 가능합니다.', icon: 'error', showConfirmButton: false, timer: 1500 })
            })
      }
    }

    const moveToFoodList = () => {
      router.push('/foods')
    }

    onMounted(() => {
      if (editable.value) {
        getFoodData()
      }
    })

    let imgUrl

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

    const dataURItoBlob = (dataURI) => {
      let byteString = atob(dataURI.split(',')[1]);
      let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
      let ab = new ArrayBuffer(byteString.length);
      let ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ab], {type: mimeString});
    }

    const oldFile = ref(null)
    const newFile = ref(null)
    const fileName = ref('')

    const fileChange = () => {
      const blobURL = URL.createObjectURL(oldFile.value.files[0]);
      const img = new Image();
      img.src = blobURL;
      img.onload = function () {
        imageSizeChange(img,oldFile.value.files[0].size)
        let list = new DataTransfer();
        list.items.add(new File([dataURItoBlob(imgUrl)], oldFile.value.files[0].name,{
          type: oldFile.value.files[0].type,
        }));
        newFile.value = list.files
      }
      fileName.value = oldFile.value.files[0].name
      requestAuth()
    }

    const filePath = ref('')
    const requestAuth = () => { // 이미지 업로드 권한 취득
      console.log('RequestAuth Called')
      axios.post('http://be.algo.r-e.kr:8080/api/v1/foods/images', {
        file_name: fileName.value,
        image_request_type: "POST",
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        withCredentials: true,
      }).then((res) => {
        filePath.value = res.data.substring(res.data.indexOf('amazonaws.com') + 19, res.data.indexOf('?'))  // 이미지이름.확장자
        console.log(filePath.value)
        uploadImage(res.data)
      }).catch ((err) => {
        console.error(err)
      })
    }

    const uploadImage = (awsURL) => { // 백엔드 서버에 URL 요청
      axios.put(awsURL, newFile.value[0], {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Access-Control-Allow-Origin': '*',
        },
        withCredentials: true,
      }).then((res) => {
        insertImage(filePath.value)
      }).catch((err) => {
        console.error(err)
      })
    }

    const insertImage = (imageUrl) => { // 이미지 글쓰기 본문에 삽입
      axios.post('http://be.algo.r-e.kr:8080/api/v1/foods/images/thumbnails', {
        filename: imageUrl,  // 이미지이름.확장자
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        withCredentials: true,
      }).then ((res) => {
        // foodData.value.food_image_url = res.data.substring(0, res.data.indexOf('?'))
        foodData.value.food_image_url = res.data
        console.log(foodData.value.food_image_url )
      }).catch ((err) => {
        console.error('비상' + err)
      })
    }

    return {
      allergyData,
      foodName,
      foodCode,
      foodKind,
      foodNutirition,
      foodRawMeterials,
      onSave,
      moveToFoodList,
      editable,
      foodData,
      imageURL,
      changeImage,
      previewImage,
      fileChange,
      oldFile,
    }
  }
}
</script>

<style scoped></style>