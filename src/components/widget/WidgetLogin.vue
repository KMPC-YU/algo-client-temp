<template>
  <div class="userContainer mb-5">
    <div class="inputsAndButtons">
      <input type="text" class="form-control" name="email" placeholder="아이디">
      <input type="password" class="form-control" name="password" placeholder="비밀번호">
      <button class="btn btn-secondary form-control">로그인</button>
    </div>
    <div class="joinAndFindPassword">
      <router-link :to="{name: 'FindPassword'}">비밀번호 찾기</router-link>
      <router-link :to="{name: 'Join'}">회원가입</router-link>
    </div>
<!--    <span class="d-block text-center text-secondary">&mdash; 다른 서비스로 로그인 &mdash;</span>-->

<!--    <div class="social-login text-center">-->
<!--      <a href="#">-->
<!--        <img src="/src/assets/icons/kakaoLogo.png" alt=""/>-->
<!--      </a>-->
<!--      <a href="#">-->
<!--        <img src="/src/assets/icons/naverLogo.png" alt=""/>-->
<!--      </a>-->
<!--      <a href="#">-->
<!--        <img src="/src/assets/icons/googleLogo.png" alt=""/>-->
<!--      </a>-->
<!--    </div>-->
  </div>
</template>

<script>
export default {
  setup() {


    return {}
  }
}
</script>

<style scoped>
.form-control {
  border: unset;
  font-size: medium;
  height: 50px;
}
.userContainer {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.userContainer .inputsAndButtons {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.userContainer .inputsAndButtons input {
  width: 100%;
  height: 50px;
  padding-left: 15px;
  padding-right: 15px;
  background-color: #fff;
  border: unset;
}
.userContainer .inputsAndButtons button {
  width: 100%;
  height: 50px;
  color: #fff;
  background-color: #434B57;
  border: unset;
}

.userContainer .inputsAndButtons button:hover {
  background-color: #353C45;
}

.joinAndFindPassword {
  display: flex;
  justify-content: space-between;
  font-size: 0.9em;
  color: rgba(0, 0, 0, 0.5);
}

.joinAndFindPassword a {
  display: flex;
  color: rgba(0, 0, 0, 0.5);
}

.joinAndFindPassword a:hover {
  color: rgba(0, 0, 0, 0.8);
}

.userInfo {

}

.userInfo .buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.userInfo .buttons .split {
  display: flex;
  gap: 10px;
}

.userInfo .buttons a {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #697183;
  background-color: #f5f6f9;
  padding: 6px;
  border-radius: 6px;
}

.userInfo .buttons a:hover {
  font-weight: bold;
  background-color: #EEF0F4;
}

.social-login a {
  text-decoration: none;
  position: relative;
  text-align: center;
  color: #fff;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: inline-block;
}
.social-login img {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50%;
  position: relative;
}
</style>