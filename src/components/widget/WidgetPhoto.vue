<template>
  <div class="widget Photo">
    <a href="/posts/자유게시판" class="widgetTitle">
      <h2>식품 추천</h2>
      <div class="more">더보기</div>
    </a>
    <div class="items">
      <a href="/posts/1" class="item">
        <div class="image">
          <img src="https://i.namu.wiki/i/pTVoWDp5G09PGTRUTbCy8raXo9CB47uF2wcuzdUYTlPwRjU6zjl0Reoih4MIXXRTnfxVl-yKlPjTQSVhAbfSxA.webp" alt="아이폰14 프로 실버(뒷면 요청사진)">
        </div>
        <div class="title">
          맛있는 치킨이다아아아아아악
        </div>
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
.widget {
  display: flex;
  flex-direction: column;
}
.widget.Photo {
  border-radius: 12px;
  background-color: #fff;
}
.widgetTitle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
}
a {
  color: inherit;
  text-decoration: inherit;
}
.widget h2 {
  font-size: 1.2em;
  font-weight: bold;
}
.items {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  padding: 20px;
}
.image {
  position: relative;
  width: 100%;
  padding: 0;
  padding-bottom: 78.43%;
  margin: 0;
}
img {
  border-radius: 8px;
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  max-width: 100%;
  display: block;
  vertical-align: middle;
}
.title {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  text-align: center;
}
</style>