import { instance } from './index.js'

// 사용자 알레르기 정보
export function getUserAllergy() {
  return instance.get('/api/v1/users/allergies')
}

// 레시피 목록 요청
export function getRecipeList(page, sort, keyword, category, allergy_filter) {
  return instance.get(`/api/v1/recipes?page=${page}&size=8&sort=${sort}&keyword=${keyword}&category=${category}&allergy_filter=${allergy_filter}`)
}

// 레시피 상세 조회
export function getRecipe(recipeId) {
  return instance.get(`/api/v1/recipes/${recipeId}`)
}

// 레시피 작성
export function createRecipe(recipeData) {
  return instance.post('/api/v1/recipes', {
    recipe_thumbnail: recipeData.thumbnail, // 레시피 썸네일
    recipe_title: recipeData.name, // 레시피 제목
    recipe_sub_title: recipeData.intro, // 레시피 소개
    category: recipeData.type, // 레시피 카테고리
    recipe_info: recipeData.recipe_info, // { 인원, 시간, 난이도 }
    ingredients: recipeData.ingredients, // [{ 돼지고기, 150g, [ 육류, 생선 ] }, { ... }, ...]
    recipe_steps: recipeData.steps, // [{ 단계별 설명, 이미지 URL }, { ... }, ...]
    complete_img: recipeData.completeImg, // 완성 사진 URL
    recipe_tip: recipeData.tip, // 요리 TIP
    recipe_tag: recipeData.tags, // 레시피 태그
  })
}

// 레시피 수정
export function updateRecipe(recipeId, recipeData) {
  return instance.patch(`/api/v1/recipes/${recipeId}`, {
    recipe_id: recipeId,
    recipe_thumbnail: recipeData.thumbnail,
    recipe_title: recipeData.name,
    recipe_sub_title: recipeData.intro,
    category: recipeData.type,
    recipe_info: recipeData.recipe_info,
    ingredients: recipeData.ingredients,
    recipe_steps: recipeData.steps,
    complete_img: recipeData.completeImg,
    recipe_tip: recipeData.tip,
    recipe_tag: recipeData.tags,
  })
}

// 레시피 좋아요
export function favorite(isLike, recipeId) {
  return isLike
    ? instance.delete(`/api/v1/recipes/${recipeId}/likes`)
    : instance.post(`/api/v1/recipes/${recipeId}/likes`, {})
}

// 레시피 삭제
export function deleteRecipe(recipeId) {
  return instance.delete(`/api/v1/recipes/${recipeId}`)
}

// 레시피 별점 생성
export function createRates(recipeId, rates) {
  return instance.post(`/api/v1/recipes/${recipeId}/rates`, { rating: rates })
}

// 레시피 별점 수정
export function updateRates(recipeId, rates) {
  return instance.patch(`/api/v1/recipes/${recipeId}/rates`, { rating: rates })
}

// 레시피 별점 삭제
export function deleteRates(recipeId) {
  return instance.delete(`/api/v1/recipes/${recipeId}/rates`)
}

// 레시피 댓글 목록 조회
export function getComment(recipeId, page) {
  return instance.get(`/api/v1/recipes/${recipeId}/comments?page=${page}&size=10`)
}

// 레시피 댓글 생성
export function createComment(recipeId, comment) {
  return instance.post(`/api/v1/recipes/${recipeId}/comments`, { content: comment })
}

// 레시피 댓글 수정
export function updateComment(recipeId, commentId, comment) {
  return instance.patch(`/api/v1/recipes/${recipeId}/comments/${commentId}`, { content: comment })
}

// 레시피 댓글 삭제
export function deleteComment(recipeId, commentId) {
  return instance.delete(`/api/v1/recipes/${recipeId}/comments/${commentId}`)
}

// 레시피 메인 사진 업로드
export function uploadRecipeMainImg(formData) {
  return instance.post(`/api/v1/recipes/images`, formData)
}
