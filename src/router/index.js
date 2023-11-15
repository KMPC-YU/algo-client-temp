import { createWebHistory, createRouter } from 'vue-router'
import { usePiniaStore } from '@/stores'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/:pathMatch(.*)', name: 'not-found', component: () => import('@compo/NotFound.vue') },
    { path: '/', name: 'Main', component: () => import('@views/Home.vue') },
    { path: '/login', name: 'Login', component: () => import('@views/Login.vue'),
      beforeEnter: (to, from, next) => {
        const piniaStore = usePiniaStore()
        if(piniaStore.isLoggedIn === 'false') next()
        else next('/')
    }},
    { path: '/signup', name: 'Join', component: () => import('@views/Join.vue'),
      beforeEnter: (to, from, next) => {
        const piniaStore = usePiniaStore()
        if(piniaStore.isLoggedIn === 'false') next()
        else next('/')
    }},
    { path: '/boards/:board_id', name: 'PostList', component: () => import('@views/PostList.vue') },
    { path: '/boards/:board_id/write', name: 'PostWrite', component: () => import('@compo/post/PostWrite.vue') },
    { path: '/boards/:board_id/posts/:post_id', name: 'PostView', component: () => import('@compo/post/PostView.vue') },
    { path: '/boards/:board_id/posts/:post_id/modify', name: 'PostModify', component: () => import('@views/Post/PostWrite.vue') },
    { path: '/foods', name: 'FoodList', component: () => import('@views/Foods.vue'),
      beforeEnter: (to, from, next) => {
        const piniaStore = usePiniaStore()
        if(piniaStore.isLoggedIn === 'false') {
          alert('로그인이 필요한 서비스입니다.')
          next('/login')
        } else {
          next()
        }
    }},
    { path: '/foods/write', name: 'FoodWrite', component: () => import('@views/food/FoodWrite.vue') },
    { path: '/foods/:food_id', name: 'FoodView', component: () => import('@views/food/FoodView.vue') },
    { path: '/foods/:food_id/modify', name: 'FoodModify', component: () => import('@views/food/FoodWrite.vue') },
    { path: '/recipes', name: 'RecipeList', component: () => import('@views/Recipes.vue'),
      beforeEnter: (to, from, next) => {
        const piniaStore = usePiniaStore()
        if(piniaStore.isLoggedIn === 'false') {
          alert('로그인이 필요한 서비스입니다.')
          next('/login')
        } else {
          next()
        }
    }},
    { path: '/recipes/write', name: 'RecipeWrite', component: () => import('@compo/recipe/RecipeWrite.vue') },
    { path: '/recipes/:recipe_id', name: 'RecipeView', component: () => import('@compo/recipe/RecipeView.vue') },
    { path: '/recipes/:recipe_id/modify', name: 'RecipeModify', component: () => import('@views/recipe/RecipeWrite.vue') },
    { path: '/admin', name: 'AdminDashboard', component: () => import('@views/AdminDashboard.vue') },
    { path: '/findpw', name: 'FindPassword', component: () => import('@views/FindPassword.vue') },
    { path: '/profile/:nickname', name: 'Profile', component: () => import('@views/Profile.vue') },
  ]
})

export default router