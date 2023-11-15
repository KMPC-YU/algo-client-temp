<template>
  <div class="w-100 d-flex justify-content-center align-items-center flex-column">
    <div class="text-center m-4">
      <h1>로그인</h1>
    </div>
    <div class="direct">
      <widget-login></widget-login>
    </div>
  </div>
</template>

<script>
import WidgetLogin from "@/components/widget/WidgetLogin.vue";
export default {
  components: {
    WidgetLogin
  },
  setup() {
    return {}
  }
}
</script>

<style scoped>
.direct {
  width: 400px;
}
</style>