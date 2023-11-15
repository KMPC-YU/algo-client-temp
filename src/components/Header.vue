<template>
  <div>
    <section id="sub">
      <ul class="container justify-content-end align-items-center px-2 py-2 d-flex list-unstyled">
        <li>
          <router-link class="nav-link" :to="{name: 'Join'}">회원가입</router-link>
        </li>
        <li class="text-muted mx-2">
          |
        </li>
        <li>
          <router-link class="nav-link" :to="{name: 'Login'}">로그인</router-link>
        </li>
      </ul>
    </section>
    <section id="navbar">
      <header class="border-bottom mb-4">
        <div class="container">
          <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a href="/" class="logo">
              <img src="../assets/icons/ALGO_Title.png" height="96" width="210" alt="logo" />
            </a>

            <ul class="nav nav-underline col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li><router-link :to="{name: 'FoodList'}" class="nav-link px-2 link-body-emphasis fs-5">식품정보</router-link></li>
              <li><router-link :to="{name: 'RecipeList'}" class="nav-link px-2 link-body-emphasis fs-5">레시피</router-link></li>
              <li class="nav-item dropdown fs-5">
                <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false" style="color: black">커뮤니티</a>
                <ul class="dropdown-menu">
                  <li>
                    <router-link :to="{name: 'PostList'}" class="dropdown-item">공지사항</router-link>
                  </li>
                </ul>
              </li>
            </ul>
<!--            <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">-->
<!--              <div class="input-group">-->
<!--                <input type="text" class="form-control" placeholder="검색어를 입력하세요" aria-label="Input group example" aria-describedby="basic-addon1">-->
<!--                <button class="input-group-text" id="basic-addon1">-->
<!--                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">-->
<!--                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>-->
<!--                  </svg>-->
<!--                </button>-->
<!--              </div>-->
<!--            </form>-->
          </div>
        </div>
      </header>
    </section>
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
#sub {
  height: 40px;
}
.nav-link:hover {
  font-weight: bold;
}
</style>