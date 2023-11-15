<template>
  <main>
    <section id="main">
      <div id="article">
        <section id="banner" class="grid">
          <div class="container text-center">
            <div class="row">
              <div class="col-md-6">
                <a href="https://www.foodsafetykorea.go.kr/portal/fooddanger/foodDirectImportView.do?menu_no=4901&menu_grp=MENU_NEW01">
                  <img src="https://www.foodsafetykorea.go.kr/common/ecmFileView.do?ecm_file_no=1Oj1205TJ5B" class="rounded img-fluid" alt="banner1">
                </a>
              </div>
              <div class="col-md-6">
                <a href="https://radsafe.mfds.go.kr/">
                  <img src="https://www.foodsafetykorea.go.kr/common/ecmFileView.do?ecm_file_no=1OYPnPXPKzL" class="rounded img-fluid" alt="banner2">
                </a>
              </div>
            </div>
          </div>
        </section>
        <section id="widget" class="mt-3">
          <WidgetList></WidgetList>
          <WidgetList></WidgetList>
          <WidgetPhoto></WidgetPhoto>
          <WidgetPhoto></WidgetPhoto>
        </section>
      </div>
    </section>
    <aside class="d-none d-lg-block">
      <section id="userContainer">
        <WidgetLogin v-if="isLoggedIn === 'false'"></WidgetLogin>
        <widget-user-info v-else></widget-user-info>
      </section>
      <section id="chat" class="mt-4">
        <WidgetChatBot></WidgetChatBot>
      </section>
    </aside>
  </main>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { usePiniaStore } from '@/stores'
import * as AdminAPI from '@/services/admin.js'
import WidgetPhoto from "@compo/widget/WidgetPhoto.vue";
import WidgetList from "@compo/widget/WidgetList.vue";
import WidgetLogin from "@compo/widget/WidgetLogin.vue";
import WidgetChatBot from "@compo/widget/WidgetChatBot.vue";
import WidgetUserInfo from "@compo/widget/WidgetUserInfo.vue";

export default {
  components: {
    WidgetUserInfo,
    WidgetPhoto,
    WidgetList,
    WidgetLogin,
    WidgetChatBot,
  },
  setup() {
    const isAdmin = ref()
    const piniaStore = usePiniaStore()
    const isLoggedIn = computed(() => piniaStore.isLoggedIn)
    const nickname = computed(() => piniaStore.nickname)

    return {
      isAdmin, isLoggedIn, nickname,
    }
  }
}
</script>

<style scoped>
#widget {
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
  display: grid;
  gap: 20px;
}

@media (max-width: 767px) {
  #widget {
    grid-template-columns: repeat(1, 1fr);
  }
}
main {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
  margin: 0 auto 100px;
}
#main {
  width: 100%;
  margin-right: 10px;
}

aside {
  width: 340px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-sizing: border-box;
}
</style>