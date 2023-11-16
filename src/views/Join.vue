<template>
  <div class="w-100 d-flex justify-content-center align-items-center flex-column">
    <div class="text-center m-4">
      <h1>회원가입</h1>
    </div>
    <div class="direct d-flex flex-column gap-3">
      <input type="text" v-model="username" class="form-control" name="username" placeholder="아이디" maxlength="20" @blur="usernameValidCheck"
        :class="{'': usernameValid === 1, 'is-valid': usernameValid === 2, 'is-invalid': usernameValid === 3}" autofocus>
      <div :class="{'valid-feedback': usernameValid === 2, 'invalid-feedback': usernameValid === 3}">
        {{ usernameMessage }}
      </div>
      <input type="password" v-model="password" class="form-control" name="password" placeholder="비밀번호" maxlength="20" @input="passwordValidCheck"
        :class="{'': passwordValid === 1, 'is-valid': passwordValid === 2, 'is-invalid': passwordValid === 3}">
      <div class="invalid-feedback">
        {{ passwordMessage }}
      </div>
      <input type="password" v-model="password2" class="form-control" name="password2" placeholder="비밀번호 확인" maxlength="20" @input="password2ValidCheck"
        :class="{'': password2Valid === 1, 'is-valid': password2Valid === 2, 'is-invalid': password2Valid === 3}">
      <div :class="{'valid-feedback': password2Valid === 2, 'invalid-feedback': password2Valid === 3}">
        {{ password2Message }}
      </div>
      <input type="text" v-model="nickname" class="form-control" name="nickname" placeholder="닉네임" maxlength="20" @blur="nicknameValidCheck"
        :class="{'': nicknameValid === 1, 'is-valid': nicknameValid === 2, 'is-invalid': nicknameValid === 3}">
      <div :class="{'valid-feedback': nicknameValid === 2, 'invalid-feedback': nicknameValid === 3}">
        {{ nicknameMessage }}
      </div>
      <div class="d-flex gap-2">
        <input type="text" class="form-control" placeholder="이메일" v-model="email" maxlength="40" @blur="emailValidCheck"
          :class="{'': emailValid === 1, 'is-valid': emailValid === 2, 'is-invalid': emailValid === 3}">
        <div :class="{'valid-feedback': emailValid === 2, 'invalid-feedback': emailValid === 3}">
          {{ emailMessage }}
        </div>
        <button class="w-50 btn btn-secondary" @click="sendVerifyEmailCode" :disabled="sendingCode">
          인증메일 발송
        </button>
      </div>
      <div class="d-flex gap-2">
        <input type="text" v-model="emailCode" class="form-control" maxlength="6" placeholder="이메일 인증코드"
          :class="{'': emailCodeValid === 1, 'is-valid': emailCodeValid === 2, 'is-invalid': emailCodeValid === 3}">
        <button class="w-25 btn btn-secondary" :disabled="emailCode === ''" @click="verifyEmailCode">인증확인</button>
      </div>
      <div :class="{'valid-feedback': emailCodeValid === 2, 'invalid-feedback': emailCodeValid === 3}">
        {{ emailCodeMessage }}
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
        <button class="btn btn-secondary form-control" @click="signup">회원가입</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import * as JoinAPI from '@/services/join.js'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

export default {
    setup() {
        const router = useRouter()

        const username = ref('')
        const password = ref('')
        const password2 = ref('')
        const email = ref('')
        const nickname = ref('')

        // 1 : 유효성 검사 전
        // 2 : 유효성 검사 통과
        // 3 : 유효성 검사 오류
        const usernameValid = ref(1)
        const passwordValid = ref(1)
        const password2Valid = ref(1)
        const emailValid = ref(1)
        const nicknameValid = ref(1)

        const sendCodeToEmail = ref(false)
        const sendingCode = ref(false)
        const emailCode = ref('')
        const emailCodeValid = ref(1)

        const usernameMessage = ref('')
        const passwordMessage = ref('')
        const password2Message = ref('')
        const emailMessage = ref('')
        const emailCodeMessage = ref('')
        const nicknameMessage = ref('')

        const selectedAllergies = ref([])

        const allergies = reactive([
            { name: "BEEF", mean: "소고기", src: "/src/assets/allergy_icon/beef.png", selected: false },
            { name: "BUCKWHEAT", mean: "메밀", src: "/src/assets/allergy_icon/buckwheat.png", selected: false },
            { name: "CHICKEN", mean: "닭", src: "/src/assets/allergy_icon/chicken.png", selected: false },
            { name: "CLAMS", mean: "조개류", src: "/src/assets/allergy_icon/clams.png", selected: false },
            { name: "CRAB", mean: "게", src: "/src/assets/allergy_icon/crab.png", selected: false },
            { name: "EGGS", mean: "난류", src: "/src/assets/allergy_icon/eggs.png", selected: false },
            { name: "FISH", mean: "생선", src: "/src/assets/allergy_icon/fish.png", selected: false },
            { name: "FRUIT", mean: "과일", src: "/src/assets/allergy_icon/fruit.png", selected: false },
            { name: "GARLIC", mean: "마늘", src: "/src/assets/allergy_icon/garlic.png", selected: false },
            { name: "MILK", mean: "우유", src: "/src/assets/allergy_icon/milk.png", selected: false },
            { name: "NUTS", mean: "견과류", src: "/src/assets/allergy_icon/nuts.png", selected: false },
            { name: "PORK", mean: "돼지고기", src: "/src/assets/allergy_icon/pork.png", selected: false },
            { name: "SESAME", mean: "참깨", src: "/src/assets/allergy_icon/sesame.png", selected: false },
            { name: "SHRIMP", mean: "새우", src: "/src/assets/allergy_icon/shrimp.png", selected: false },
            { name: "SOYBEAN", mean: "대두", src: "/src/assets/allergy_icon/soybean.png", selected: false },
            { name: "SQUID", mean: "오징어", src: "/src/assets/allergy_icon/squid.png", selected: false },
            { name: "SULPHITE", mean: "아황산류", src: "/src/assets/allergy_icon/sulphite.png", selected: false },
            { name: "TOMATO", mean: "토마토", src: "/src/assets/allergy_icon/tomato.png", selected: false },
            { name: "VEGETABLE", mean: "채소", src: "/src/assets/allergy_icon/vegetables.png", selected: false },
            { name: "WHEAT", mean: "밀", src: "/src/assets/allergy_icon/wheat.png", selected: false },
        ]);

        const sendVerifyEmailCode = () => {
            emailValidCheck()
            if (emailValid.value === 2) {
                sendingCode.value = true
                JoinAPI.sendVerifyEmailCode(email.value, username.value)
                    .then((res) => {
                        Swal.fire({icon: "success", title: "인증번호를 발송했습니다", showConfirmButton: false, timer: 1500})
                        sendCodeToEmail.value = true
                    })
                    .catch((err) => {
                        console.error(err)
                    })
                    .finally(() => {
                        sendingCode.value = false
                    })
            }
        }

        const verifyEmailCode = () => {
            emailCodeValid.value = 1
            if (emailValid.value === 2 && sendCodeToEmail.value && emailCode.value.length === 6) {
                JoinAPI.verifyEmailCode(email.value, emailCode.value)
                    .then((res) => {
                        emailCodeValid.value = 2;
                        emailCodeMessage.value = res.data
                    })
                    .catch((err) => {
                        emailCodeValid.value = 3;
                        emailCodeMessage.value = err.data
                    })
            }
        }

        // 아이디 유효성 검사
        const usernameValidCheck = () => {
            if (username.value.length === 0) {
                usernameValid.value = 3
                usernameMessage.value = '아이디를 입력하세요.'
            } else if (!/^[a-z0-9_-]{5,20}$/.test(username.value)) {
                usernameValid.value = 3
                usernameMessage.value = '5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.'
            } else {
                JoinAPI.usernameDuplicateCheck(username.value)
                    .then(() => {
                        usernameValid.value = 2
                        usernameMessage.value = '사용 가능한 아이디입니다.'
                    })
                    .catch(() => {
                        usernameValid.value = 3
                        usernameMessage.value = '이미 사용중인 아이디입니다.'
                    })
            }
        }

        const passwordValidCheck = () => {
            if (password.value.length === 0) {
                passwordValid.value = 3
                passwordMessage.value = '비밀번호를 입력하세요.'
            } else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/.test(password.value)) {
                passwordValid.value = 3
                passwordMessage.value = '비밀번호는 최소 8자 이상, 대소문자와 숫자, 특수문자를 모두 포함해야 합니다.'
            } else {
                passwordValid.value = 2
            }
        }

        const password2ValidCheck = () => {
            if (password2.value.length === 0) {
                password2Valid.value = 3
                password2Message.value = '비밀번호 재확인을 입력하세요.'
            } else if (password.value !== password2.value) {
                password2Valid.value = 3
                password2Message.value = '비밀번호가 일치하지 않습니다.'
            } else {
                password2Valid.value = 2
                password2Message.value = '비밀번호가 일치합니다.'
            }
        }

        const emailValidCheck = () => {
            if (email.value.length === 0) {
                emailValid.value = 3
                emailMessage.value = '이메일을 입력하세요.'
            } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.value)) {
                emailValid.value = 3
                emailMessage.value = '올바른 형식의 이메일을 입력해주세요.'
            } else {
                JoinAPI.emailDuplicateCheck(email.value)
                    .then(() => {
                        emailValid.value = 2
                        emailMessage.value = '사용 가능한 이메일입니다.'
                    })
                    .catch(() => {
                        emailValid.value = 3
                        emailMessage.value = '이미 사용중인 이메일입니다.'
                    })
            }
        }

        const nicknameValidCheck = () => {
            if (nickname.value.length === 0) {
                nicknameValid.value = 3
                nicknameMessage.value = '닉네임을 입력하세요.'
            } else if (!/^[가-힣a-zA-Z0-9_-]{2,20}$/.test(nickname.value)) {
                nicknameValid.value = 3
                nicknameMessage.value = '닉네임은 최소 2자 이상, 최대 20자 이하의 알파벳 대소문자, 숫자, 한글만 사용할 수 있습니다.'
            } else {
                JoinAPI.nicknameDuplicateCheck(nickname.value)
                    .then(() => {
                        nicknameValid.value = 2
                        nicknameMessage.value = '사용 가능한 닉네임입니다.'
                    })
                    .catch(() => {
                        nicknameValid.value = 3
                        nicknameMessage.value = '이미 사용중인 닉네임입니다.'
                    })
            }
        }

        const signup = () => {
            usernameValidCheck()
            passwordValidCheck()
            password2ValidCheck()
            emailValidCheck()
            nicknameValidCheck()
            if (usernameValid.value === 2 && passwordValid.value === 2
                && password2Valid.value === 2 && emailValid.value === 2 && nicknameValid.value === 2) {
                JoinAPI.signUp({
                    username: username.value,
                    password: password.value,
                    email: email.value,
                    code: emailCode.value,
                    nickname: nickname.value,
                    password_confirm: password2.value,
                    allergy_type : selectedAllergies.value,
                }).then((res) => {
                    Swal.fire({
                        title: '회원가입 완료',
                        text: res.data,
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1500,
                    }).then(() => router.push({ name: 'Login'})).then(() => location.reload())
                }).catch((err) => {
                    Swal.fire({
                        title: '회원가입 실패',
                        text: err.data,
                        icon: 'error',
                        showConfirmButton: false,
                        timer: 1500,
                    })
                })
            }
        }

        return {
            allergies, selectedAllergies, username, password, password2, email, nickname,
            usernameValid, passwordValid, password2Valid, emailValid, nicknameValid,
            usernameMessage, passwordMessage, password2Message, emailMessage, nicknameMessage,
            signup, usernameValidCheck, passwordValidCheck, password2ValidCheck, emailValidCheck, nicknameValidCheck,
            sendVerifyEmailCode, sendCodeToEmail, verifyEmailCode, emailCode, emailCodeValid, emailCodeMessage, sendingCode,
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