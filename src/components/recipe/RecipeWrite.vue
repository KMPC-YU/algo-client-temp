<template>
  <div class="recipe-container mx-auto">
    <div class="card card-body p-5 mb-3">
      <div class="card-title">
        <div class="fw-bold fs-4 mb-3">
          레시피 정보
        </div>
      </div>
      <div class="row g-3 align-items-center">
        <div class="col-md-9">
          <div>
            <div class="row mb-3 g-3">
              <div class="col-2">
                <label for="recipeTitle" class="fw-medium col-form-label">레시피 제목</label>
              </div>
              <div class="col-9">
                <input type="text" id="recipeTitle" class="form-control" placeholder="레시피 이름을 입력해 주세요.">
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-2">
                <label for="recipeIntro" class="fw-medium col-form-label">레시피 소개</label>
              </div>
              <div class="col-9">
                <input type="text" id="recipeIntro" class="form-control" placeholder="레시피에 대한 간단한 설명을 입력하세요.">
              </div>
            </div>
            <div class="row mb-3 g-3">
              <div class="col-2">
                <label for="recipeCategory" class="fw-medium col-form-label">카테고리</label>
              </div>
              <div class="col-9">
                <select class="form-select" aria-label="Default select example">
                  <option selected>종류 선택</option>
                  <option value="밑반찬">밑반찬</option>
                  <option value="메인반찬">메인반찬</option>
                  <option value="국/탕">국/탕</option>
                  <option value="찌개">찌개</option>
                  <option value="디저트">디저트</option>
                  <option value="면/만두">면/만두</option>
                  <option value="밥/죽/떡">밥/죽/떡</option>
                  <option value="퓨전">퓨전</option>
                  <option value="김치/젓갈/장류">김치/젓갈/장류</option>
                  <option value="양념/소스/잼">양념/소스/잼</option>
                  <option value="양식">양식</option>
                  <option value="샐러드">샐러드</option>
                  <option value="스프">스프</option>
                  <option value="빵">빵</option>
                  <option value="과자">과자</option>
                  <option value="차/음료/술">차/음료/술</option>
                  <option value="기타">기타</option>
                </select>
              </div>
            </div>
            <div class="row mb-3 g-3">
              <div class="col-2">
                <label for="recipeCategory" class="fw-medium col-form-label">요리정보</label>
              </div>
              <div class="col-9">
                <div class="row">
                  <div class="col-9">
                    <div class="row">
                      <div class="col">
                        <select class="form-select">
                          <option selected value="">인원</option>
                          <option value="1인분">1인분</option>
                          <option value="2인분">2인분</option>
                          <option value="3인분">3인분</option>
                          <option value="4인분">4인분</option>
                          <option value="5인분">5인분</option>
                          <option value="6인분 이상">6인분+</option>
                        </select>
                      </div>
                      <div class="col">
                        <select class="form-select">
                          <option selected value="">시간</option>
                          <option value="5분 이내">5분 이내</option>
                          <option value="10분 이내">10분 이내</option>
                          <option value="15분 이내">15분 이내</option>
                          <option value="20분 이내">20분 이내</option>
                          <option value="30분 이내">30분 이내</option>
                          <option value="45분 이내">45분 이내</option>
                          <option value="1시간 이내">1시간 이내</option>
                          <option value="2시간 이내">2시간 이내</option>
                          <option value="2시간 이상">2시간 이상</option>
                        </select>
                      </div>
                      <div class="col">
                        <select class="form-select">
                          <option selected value="">난이도</option>
                          <option value="누구나">누구나</option>
                          <option value="초급">초급</option>
                          <option value="중급">중급</option>
                          <option value="고급">고급</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <img src="https://via.placeholder.com/250" alt="..." class="img-thumbnail">
        </div>
      </div>
    </div>
    <div class="card card-body p-5 mb-3">
      <div class="card-title">
        <div class="fw-bold fs-4 mb-3">
          요리 재료
        </div>
      </div>
      <div>
        <div class="row mb-3 g-3 align-items-center">
          <div class="col-1">
            <label for="recipeTitle" class="fw-medium col-form-label">재료명</label>
          </div>
          <div class="col">
            <input type="text" id="recipeTitle" class="form-control" placeholder="예) 돼지고기">
          </div>
          <div class="col-3">
            <input type="text" id="recipeTitle" class="form-control" placeholder="예) 150g">
          </div>
          <div class="col-auto">
            <button class="btn btn-light me-2">알레르기 정보</button>
            <button class="btn btn-light"><i class="bi bi-trash"></i></button>
          </div>
        </div>
        <div class="d-flex justify-content-center">
          <button class="btn btn-light btn-sm"><i class="bi bi-plus-circle-fill"></i>&nbsp;재료 추가</button>
        </div>
      </div>
    </div>
    <div class="card card-body p-5 mb-3">
      <div class="card-title">
        <div class="fw-bold fs-4 mb-3">
          요리 순서
        </div>
      </div>
      <div class="row mb-3 g-3 align-items-center">
        <div class="col-1">
          <label for="recipeStep" class="fw-bold fs-5 col-form-label">STEP 1</label>
        </div>
        <div class="col">
          <textarea type="text" id="recipeStep" class="form-control" placeholder="예) 돼지고기를 찬물에 잘 씻어주세요."></textarea>
        </div>
        <div class="col-auto">
          <img src="https://via.placeholder.com/150" alt="..." class="img-thumbnail">
        </div>
        <div class="col-auto">
          <button class="btn btn-light"><i class="bi bi-trash"></i></button>
        </div>
      </div>
      <div class="d-flex justify-content-center">
        <button class="btn btn-light btn-sm"><i class="bi bi-plus-circle-fill"></i>&nbsp;순서 추가</button>
      </div>
    </div>
    <div class="card card-body p-5 mb-3">
      <div class="card-title">
        <div class="fw-bold fs-4">
          요리팁
        </div>
      </div>
      <textarea type="text" id="recipeTip" class="form-control" placeholder="예) 돼지고기를 찬물에 잘 씻어주세요."></textarea>
    </div>
    <div class="write-button gap-2">
      <button class="btn btn-secondary" @click="cancel">취소</button>
      <button class="btn btn-primary" @click="submit">작성완료</button>
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
.recipe-container {
  max-width: 1000px;
}
.card {
  border: unset;
}
.card button {
  color: #0d0d0d;
  background-color: #eeeeee;
}
textarea {
  height: 150px;
}
.write-button {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>
