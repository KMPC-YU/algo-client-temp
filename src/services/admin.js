import { instance } from './index.js'

// 관리자 확인
export function isAdmin() {
  return instance.get('/api/v1/users/check-admin')
}

// 작성된 레시피 수
export function getRecipeNum() {
  return instance.get(`/api/v1/admin/recipes-count`)
}

// 작성된 게시글 수
export function getPostNum() {
  return instance.get(`/api/v1/admin/posts-count`)
}

// 작성된 댓글 수
export function getCommentNum() {
  return instance.get(`/api/v1/admin/comments-count`)
}

// 총 가입자 수
export function getUserNum() {
  return instance.get(`/api/v1/admin/users-count`)
}

// 최근 게시글 목록 조회
export function getLastPostList() {
  return instance.get(`/api/v1/admin/recent-posts`)
}

// 최근 댓글 목록 조회
export function getLastCommentList() {
  return instance.get(`/api/v1/admin/recent-comments`)
}

// 게시판 목록 조회
export function getBoardList(category = '') {
  return category === ''
    ? instance.get(`/api/v1/admin/boards`)
    : instance.get(`/api/v1/boards?category=${category}`) // Navbar에 사용
}

// 게시판 추가
export function createBoard(boardData) {
  return instance.post('/api/v1/admin/boards', {
    board_type: boardData.board_type,
    board_name: boardData.board_name,
  })
}

// 게시판 수정
export function updateBoard(boardId, boardName) {
  return instance.patch(`/api/v1/admin/boards/${boardId}`, {
    board_name: boardName,
  })
}

// 게시판 삭제
export function deleteBoard(boardId) {
  return instance.delete(`/api/v1/admin/boards/${boardId}`)
}

// 회원 목록 조회
export function getUserList(page, keyword, searchType) {
  return instance.get(`/api/v1/admin/users?page=${page}&size=10&keyword=${keyword}&searchType=${searchType}`)
}

// 회원 상세정보 조회
export function getUserInfo(username) {
  return instance.get(`/api/v1/admin/users/${username}`)
}
