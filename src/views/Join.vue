<template>
  <div class="w-100 d-flex justify-content-center align-items-center flex-column">
    <div class="text-center m-4">
      <h1>회원가입</h1>
    </div>
    <div class="direct d-flex flex-column gap-3">
      <input type="text" class="form-control" name="username" placeholder="아이디">
      <input type="password" class="form-control" name="password" placeholder="비밀번호">
      <input type="password" class="form-control" name="password2" placeholder="비밀번호 확인">
      <input type="text" class="form-control" name="password2" placeholder="닉네임">
      <div class="d-flex gap-2">
        <input type="text" class="form-control" placeholder="이메일">
        <button class="w-50 btn btn-secondary">인증메일 발송</button>
      </div>
      <div class="d-flex gap-2">
        <input type="text" class="form-control" placeholder="이메일 인증코드">
        <button class="w-25 btn btn-secondary" disabled>인증확인</button>
      </div>
      <div class="my-2">
        <label for="allergy" class="form-label fw-bold mb-3">알레르기 정보 <span class="text-secondary fw-normal small">(선택)</span></label>
        <div class="row text-center">
          <div v-for="allergy in allergyData" :key="allergy.name" class="col-3 col-sm-2 py-2">
            <input type="checkbox" :id="allergy.name" v-model="selectedAllergies" :value="allergy.name" class="d-none">
            <label :for="allergy.mean" class="allergy-icon">
              <img :src="allergy.src" :alt="allergy.name" width="50">
              <span class="small d-block">{{ allergy.mean }}</span>
            </label>
          </div>
        </div>
      </div>
      <div class="button">
        <button class="btn btn-secondary form-control">회원가입</button>
      </div>
    </div>
  </div>
</template>

<script>
import { allergyData } from "@compo/allergyData.js";

export default {
  setup() {


    return {
      allergyData,
    }
  }
}
</script>

<style scoped>
.direct {
  width: 450px;
}
.form-control {
  border: unset;
  font-size: medium;
  height: 50px;
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

button {
  width: 100%;
  height: 50px;
  color: #fff;
  background-color: #434B57;
  border: unset;
}

.userContainer .inputsAndButtons button:hover {
  background-color: #353C45;
}
</style>