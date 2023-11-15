<template>
  <section class="section userInfo">
    <div class="d-flex gap-4">
      <div class="profile_img">
        <img src="http://algo.dothome.co.kr/img/no_profile.gif" alt=""/>
      </div>
      <div id="nickName">
        <strong>{{ piniaStore.nickname }} 님</strong>
      </div>
    </div>
    <div>
      <div>
        <span>게시글</span>
        {{postCount}}개
      </div>
      <div>
        <span>댓글 </span>
        {{commentCount}}개
      </div>
    </div>
    <div class="buttons">
      <div class="split">
         <router-link :to="{name: 'Profile', params: { nickname: piniaStore.nickname }}">프로필</router-link>
        <a href="#" @click="logout">로그아웃</a>
      </div>
      <router-link :to="{name:'AdminDashboard'}">관리자 대시보드</router-link>
    </div>
  </section>
</template>

<script>
import {onBeforeMount, onMounted, ref} from 'vue'
import { usePiniaStore } from '@/stores'
import * as ProfileAPI from "@/services/profile.js";

export default {

  setup() {
    const piniaStore = usePiniaStore()
    const postCount = ref('0')
    const commentCount = ref('0')

    onMounted(() => {
      getProfileData()
    })

    const logout = () => {
      piniaStore.logout()
    }

    const getProfileData = () => {
      ProfileAPI.getProfileData(piniaStore.nickname).then((res) => {
        console.log(res.data)
        postCount.value = res.data.count.post
        commentCount.value = res.data.count.comment
      })
    }

    return {
      piniaStore,
      logout,
      postCount,
      commentCount,
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