<template>
  <div class="text-center m-5">
    <h1>ERROR!</h1>
    <h2>페이지를 찾을 수 없습니다.</h2>
    <div class="mt-5">
      <button class="btn btn-light" @click="$router.push('/')">메인페이지로 이동</button>
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

</style>