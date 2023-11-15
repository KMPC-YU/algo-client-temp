<template>
  <div class="w-100 d-flex justify-content-center align-items-center flex-column mb-5">
    <div class="text-center m-4">
      <h1>비밀번호 찾기</h1>
    </div>
    <div class="before-email-verify">
      <div class="direct d-flex flex-column gap-3">
        <input type="text" class="form-control" name="username" placeholder="아이디">
        <div class="d-flex gap-2">
          <input type="text" class="form-control" placeholder="이메일">
          <button class="w-50 btn btn-secondary">인증메일 발송</button>
        </div>
        <div class="d-flex gap-2">
          <input type="text" class="form-control" placeholder="이메일 인증코드">
          <button class="w-25 btn btn-secondary">인증확인</button>
        </div>
        <div class="button">
          <button class="btn btn-secondary form-control">비밀번호 찾기</button>
        </div>
      </div>
    </div>

    <div class="after-email-verify">
      <div class="direct d-flex flex-column gap-3">
        <input type="password" class="form-control" name="password" placeholder="새로운 비밀번호">
        <input type="password" class="form-control" name="password2" placeholder="비밀번호 확인">
        <div class="button">
          <button class="btn btn-secondary form-control">비밀번호 변경</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {


    return {}
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