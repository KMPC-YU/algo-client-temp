<template>
  <div class="widget List">
    <a href="/posts/자유게시판" class="widgetTitle">
      <h2>공지사항</h2>
      <div class="more">더보기</div>
    </a>
    <div class="items">
      <!--      최대 8개 v-for 돌리기-->
      <a href="/posts/1" class="item">
        <div class="title">
          <span class="subject">공지</span>
          <span class="text">살려주세요 헬프미 살려주세요 헬프미 살려주세요 헬프미</span>
        </div>
        <span class="datetime">2023.03.09</span>
      </a>
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

<style scoped>
.widget.List {
  border-radius: 12px;
  background-color: #fff;
}
.widgetTitle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
}
.widget h2 {
  font-size: 1.2em;
  font-weight: bold;
}
.widget.List .more {
  font-size: 0.9em;
}
a {
  color: inherit;
  text-decoration: inherit;
}
.items {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
}
.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.widget.List .title {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
}
.widget.List .item .subject {
  font-size: 0.9em;
  color: #697183;
  background-color: #f5f6f9;
  padding: 3px 6px;
  margin-right: 3px;
  border-radius: 6px;
}
.datetime {
  max-width: max-content;
  display: flex;
  justify-content: flex-end;
  font-size: 0.9em;
  color: rgb(128, 128, 128);
  margin-left: 10px;
  word-break: keep-all;
}
img {
  max-width: 100%;
  height: auto;
  display: block;
  vertical-align: middle;
}
</style>