<template>
  <div>
    <div class="fw-bold fs-4 mb-2">
      공지사항
    </div>
    <div class="board_top">
      <div class="row mb-4">
        <div class="col-auto">
          <span>Total 150 중 1페이지</span>
        </div>
        <div class="col-auto ms-auto">
          <div class="d-none d-md-block">
            <select v-model="selectedSearch" class="form-select">
              <option value="TITLE">제목</option>
              <option value="AUTHOR">작성자</option>
              <option value="TITAUTH">제목 + 작성자</option>
            </select>
          </div>
        </div>
        <div class="col-7 col-md-5 col-lg-4 col-xl-3">
          <div class="input-group">
            <input type="search" class="form-control" v-model="searchText" @keyup.enter="searchPost" placeholder="검색"/>
            <button class="input-group-text" id="basic-addon1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="board_table">
      <table class="table text-center">
        <thead class="table-light">
        <tr>
          <th scope="col" class="col-md-1  d-md-table-cell">번호</th>
          <th scope="col" class="col-9 col-md-6">제목</th>
          <th scope="col" class="col-md-1 ">작성자</th>
          <th scope="col" class="col-md-1">조회</th>
          <th scope="col" class="col-md-1 ">추천</th>
          <th scope="col" class="col-md-1">날짜</th>
        </tr>
        </thead>
        <tbody>
        <tr class="table-danger">
          <td class="text-danger fw-bold ">공지</td>
          <td class="text-start fw-bold">공지사항입니다</td>
          <td class="fw-bold ">관리자</td>
          <td class="text-muted">0</td>
          <td class="text-muted ">0</td>
          <td class="text-muted">09-01</td>
        </tr>
        </tbody>
<!--        <tbody v-if="noticePostData.length > 0">-->
<!--        <tr v-for="noticePost in noticePostData">-->
<!--          <td class="d-none d-md-table-cell title-notice">공지</td>-->
<!--          <td>-->
<!--            <router-link :to="{ name: 'PostDetail', params: { board_id: boardID, post_id: noticePost.id } }" class="text-decoration-none text-black title-notice">-->
<!--                <span class="title-notice">-->
<!--                  {{ noticePost.title }}-->
<!--                  <span v-if="boardType !== 'QUESTION'">-->
<!--                    [{{noticePost.comment_count}}]-->
<!--                  </span>-->
<!--                </span>-->
<!--            </router-link>-->
<!--          </td>-->
<!--          <td>{{ noticePost.author }}</td>-->
<!--          <td class="d-none d-md-table-cell">{{ noticePost.created_at }}</td>-->
<!--          <td class="d-none d-md-table-cell">{{ noticePost.view_count }}</td>-->
<!--          <td class="d-none d-md-table-cell">{{ noticePost.like_count }}</td>-->
<!--          <td v-if="boardType === 'QUESTION'" class="d-none d-md-table-cell">{{ noticePost.comment_count }}</td>-->
<!--        </tr>-->
<!--        </tbody>-->
<!--        <tbody v-if="postData.length > 0">-->
<!--        <tr v-for="post in postData">-->
<!--          <td class="d-none d-md-table-cell">{{ post.id }}</td>-->
<!--          <td>-->
<!--            <span v-if="boardType === 'QUESTION'" class="point">{{ post.point }}</span>-->
<!--            <router-link :to="{ name: 'PostDetail', params: { board_id: boardID, post_id: post.id } }" class="text-decoration-none text-black post-title">-->
<!--                <span class="post-title">-->
<!--                  {{ post.title }}-->
<!--                  <span v-if="boardType !== 'QUESTION'">-->
<!--                    [{{post.comment_count}}]-->
<!--                  </span>-->
<!--                </span>-->
<!--            </router-link>-->
<!--          </td>-->
<!--          <td>{{ post.author }}</td>-->
<!--          <td class="d-none d-md-table-cell">{{ post.created_at }}</td>-->
<!--          <td class="d-none d-md-table-cell">{{ post.view_count }}</td>-->
<!--          <td class="d-none d-md-table-cell">{{ post.like_count }}</td>-->
<!--          <td v-if="boardType === 'QUESTION'" class="d-none d-md-table-cell">{{ post.comment_count }}</td>-->
<!--        </tr>-->
<!--        </tbody>-->
<!--        <tbody v-if="postData.length === 0 && noticePostData.length === 0">-->
<!--        <tr>-->
<!--          <td :colspan="[boardType === 'QUESTION' ? 6 : 7]">-->
<!--            <span>작성된 글이 없습니다.</span>-->
<!--          </td>-->
<!--        </tr>-->
<!--        </tbody>-->
      </table>
    </div>
    <div class="board_bottom">
      <div class="text-end">
        <router-link class="btn btn-light" :to="{ name: 'PostWrite', params: { board_id: boardID } }">
          <i class="bi bi-pencil"></i>
          &nbsp;글쓰기
        </router-link>
      </div>
      <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
          <li class="page-item disabled">
            <a class="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">이전</span>
            </a>
          </li>
          <li class="page-item active"><a class="page-link" href="#">1</a></li>
          <li class="page-item disabled">
            <a class="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">다음</span>
            </a>
          </li>
        </ul>
      </nav>
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

</style>