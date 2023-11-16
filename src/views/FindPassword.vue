<template>
  <div class="w-100 d-flex justify-content-center align-items-center flex-column mb-5">
    <div class="text-center m-4">
      <h1>비밀번호 {{ message }}</h1>
    </div>
    <div class="before-email-verify">
      <div class="direct d-flex flex-column gap-3">
        <input type="text" v-model="username" class="form-control" name="username" placeholder="아이디"
          maxlength="20" :disabled="sendMail" @blur="usernameValidCheck"
          :class="{'': usernameValid === 1, 'is-valid': usernameValid === 2, 'is-invalid': usernameValid === 3}">
        <div class="invalid-feedback"> {{ usernameMessage }} </div>
        <div class="d-flex gap-2">
          <input type="text" v-model="email" maxlength="40" :disabled="sendMail"
            @blur="emailValidCheck" class="form-control" placeholder="이메일"
            :class="{'': emailValid === 1, 'is-valid': emailValid === 2, 'is-invalid': emailValid === 3}">
          <button class="w-50 btn btn-secondary" @click="sendVerifyEmailCode" :disabled="sendMail">인증메일 발송</button>
        </div>
        <div class="invalid-feedback"> {{ emailMessage }} </div>
        <div class="d-flex gap-2">
          <input type="tel" v-model="authCode" class="form-control" placeholder="이메일 인증코드" maxlength="6"
            :class="{'': authCodeValid === 1, 'is-valid': authCodeValid === 2, 'is-invalid': authCodeValid === 3}">
          <button class="w-25 btn btn-secondary" @click="checkAuthCode">인증확인</button>
        </div>
        <div class="invalid-feedback"> {{ authCodeMessage }} </div>
        <!-- <div class="button">
          <button class="btn btn-secondary form-control">비밀번호 찾기</button>
        </div> -->
      </div>
    </div>

    <div class="after-email-verify">
      <div class="direct d-flex flex-column gap-3">
        <input type="password" class="form-control" name="password" placeholder="새로운 비밀번호" v-model="password"
          maxlength="20" :disabled="!isComplete" @blur="passwordValidCheck" @keyup.enter="passwordValidCheck"
          :class="{'': passwordValid === 1, 'is-valid': passwordValid === 2, 'is-invalid': passwordValid === 3}">
        <div class="invalid-feedback"> {{ passwordMessage }} </div>
        <input type="password" class="form-control" name="password2" placeholder="비밀번호 확인" v-model="password2"
          maxlength="20" :disabled="!isComplete" @blur="password2ValidCheck" @keyup.enter="password2ValidCheck"
          :class="{'': password2Valid === 1, 'is-valid': password2Valid === 2, 'is-invalid': password2Valid === 3}">
        <div class="invalid-feedback"> {{ password2Message }} </div>
        <div class="button">
          <button class="btn btn-secondary form-control" :disabled="!isComplete" @click="changePassword">비밀번호 {{ message }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import * as FindpwAPI from '@/services/findpw.js'
import router from '@/router/index.js'
import Swal from 'sweetalert2'

export default {
  setup() {
    const isComplete = ref(false)
    const message = history.state.username === '' ? ref('찾기') : ref('변경')

    const username = ref(history.state.username)
    const usernameValid = ref(1)
    const usernameMessage = ref('')

    const email = ref(history.state.email)
    const emailValid = ref(1)
    const emailMessage = ref('')

    const sendMail = ref(false)  // 인증메일 발송여부
    const inputCodeEnable = ref(false)  // 인증메일 입력칸 활성화 여부

    const authCode = ref('')  // 인증 코드
    const authCodeValid = ref(1)
    const authCodeMessage = ref('')

    const password = ref('')
    const passwordValid = ref(1)
    const passwordMessage = ref('')

    const password2 = ref('')
    const password2Valid = ref(1)
    const password2Message = ref('')

    const usernameValidCheck = () => {
      if (username.value.length === 0) {
        usernameValid.value = 3
        usernameMessage.value = '아이디를 입력하세요.'
      } else if (!/^[a-zA-Z0-9_-]{5,20}$/.test(username.value)) {
        usernameValid.value = 3
        usernameMessage.value = '5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.'
      } else {
        FindpwAPI.usernameDuplicateCheck(username.value)
          .then(() => {
            usernameValid.value = 3
            usernameMessage.value = '해당 아이디로 가입된 정보가 없습니다.'
            })
          .catch(() => {
            usernameValid.value = 2
          })
      }
    }

    const emailValidCheck = () => {
      if (email.value.length === 0) {
        emailValid.value = 3
        emailMessage.value = '이메일을 입력하세요'
      } else if (!/^[A-Za-z0-9_\\.\\-]+@[A-Za-z0-9\\-]+\.[A-Za-z0-9\\-]+/.test(email.value)) {
        emailValid.value = 3
        emailMessage.value = '이메일 형식을 확인해주세요.'
      } else {
        FindpwAPI.emailDuplicateCheck(email.value)
          .then(() => {
            emailValid.value = 3
            emailMessage.value = '해당 이메일로 가입된 정보가 없습니다.'
          })
          .catch(() => {
            emailValid.value = 2
          })
      }
    }

    const sendVerifyEmailCode = () => {
      usernameValidCheck()
      emailValidCheck()

      if (usernameValid.value === 2&& emailValid.value === 2) {
        Swal.fire({icon: 'success', title: '인증코드 발송 완료!', showConfirmButton: false, timer: 1500})

        sendMail.value = true
        inputCodeEnable.value = true

        FindpwAPI.sendVerifyEmailCode(email.value, username.value)
          .then(() => {
            authCodeMessage.value = '이메일로 발송된 6자리의 인증번호를 입력해 주세요.'
          })
          .catch((err) => {
            Swal.fire({icon: 'error', title: '인증코드 발송 실패...', showConfirmButton: false, timer: 1500})
            sendMail.value = false
            console.error(err)
          })
      }
    }

    const checkAuthCode = () => {
      if (usernameValid.value === 2&& emailValid.value === 2 && inputCodeEnable.value && sendMail.value) {
        FindpwAPI.verifyEmailCode(email.value, authCode.value)
          .then(() => {
            authCodeValid.value = 2
            isComplete.value = true
          })
          .catch(() => {
            authCodeValid.value = 3
            authCodeMessage.value = '인증번호가 일치하지 않습니다.'
          })
      }
    }

    const passwordValidCheck = () => {
      if (password.value.length === 0) {
        passwordValid.value = 3
        passwordMessage.value = '새로운 비밀번호를 입력하세요.'
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
      }
    }

    const changePassword = () => {
      passwordValidCheck()
      password2ValidCheck()

      if (passwordValid.value === 2 && password2Valid.value === 2) {
        FindpwAPI.changePassword(username.value, email.value, password.value, password2.value, authCode.value)
          .then(() => {
            Swal.fire({
              title: '비밀번호 변경 완료',
              text: '비밀번호가 변경되었습니다.',
              icon: 'success',
              showConfirmButton: false,
              timer: 1500,
            }).then(() => router.push({name: 'Login'})).then(() => location.reload())
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }

    return {
      message,
      username,
      usernameValid,
      usernameMessage,
      usernameValidCheck,
      email,
      emailValid,
      emailMessage,
      emailValidCheck,
      authCode,
      authCodeValid,
      authCodeMessage,
      checkAuthCode,
      sendMail,
      inputCodeEnable,
      isComplete,
      sendVerifyEmailCode,
      changeEmail,
      password,
      password2,
      passwordValid,
      password2Valid,
      passwordMessage,
      password2Message,
      passwordValidCheck,
      password2ValidCheck,
      changePassword,
    }
  }
}
</script>

<style lang="scss" scoped>
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