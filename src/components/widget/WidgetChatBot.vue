<template>
  <section id="chatApp" class="border-1 p-0">
    <div class="container">
      <div class="title">
        <div>
          ALGO 챗봇 서비스
        </div>
      </div>
      <div class="chatAppMessages">
        <div>
          <div class="text-center text-muted mb-2">
            <span>2023-11-11 12:00:00</span>
          </div>
          <div class="flex align-items-center">
            <span>&nbsp;</span>
            <span>챗봇</span>
            <span>&nbsp;:&nbsp;</span>
            <span>안녕하세요! 무엇을 도와드릴까요?</span>
          </div>
        </div>
      </div>
      <div class="new">
        <div class="flex align-items-center">
          <input type="text" class="form-control" placeholder="메시지를 입력하세요" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  setup() {


    return {}
  }
}
</script>

<style scoped>
#chatApp {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #fff;
  border-radius: 12px;
}
.container {
  min-width: 340px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
}
.title {
  display: flex;
  gap: 10px;
  font-size: 1.1em;
  font-weight: bold;
}
.chatAppMessages {
  display: flex;
  height: 350px;
  flex-direction: column;
  gap: 10px;
  padding-bottom: 20px;
  overflow-y: auto;
}
</style>