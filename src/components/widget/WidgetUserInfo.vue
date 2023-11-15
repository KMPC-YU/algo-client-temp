<template>
  <section class="section userInfo">
    <div class="d-flex gap-4">
      <div class="profile_img">
        <img src="http://algo.dothome.co.kr/img/no_profile.gif" alt=""/>
      </div>
      <div id="nickName">
        <strong>관리자님</strong>
      </div>
    </div>
    <div>
      <div>
        <a href="/user/myPosts">
          <span>게시글</span>
          0개
        </a>
      </div>
      <div>
        <a href="/user/myComments">
          <span>댓글 </span>
          0개
        </a>
      </div>
    </div>
    <div class="buttons">
      <div class="split">
        <!-- <router-link :to="{name: 'Profile', params: { nickname: nickname }}">프로필</router-link> -->
        <a href="#" @click="logout">로그아웃</a>
      </div>
      <router-link :to="{name:'AdminDashboard'}">관리자 대시보드</router-link>
    </div>
  </section>
</template>

<script>
import { computed } from 'vue'
import { usePiniaStore } from '@/stores'

export default {
  setup() {

    const piniaStore = usePiniaStore()

    const logout = () => {
      piniaStore.logout()
    }

    return {
      logout
    }
  }
}
</script>

<style scoped>
.section {
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #fff;
  padding: 20px;
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
a {
  text-decoration: inherit;
  color: black;
}
.profile_img img {
  border: 1px solid #bbb;
  border-radius: 50%;
  width: 50px;
  height: 50px;
}
</style>