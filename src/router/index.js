import { createWebHistory, createRouter } from "vue-router"

const router = createRouter({
    history : createWebHistory(),
    routes : [
        { path : '/:pathMatch(.*)', name : 'not-found', component : () => import('@compo/NotFound.vue') },
        { path : '/', name : 'Main', component : () => import('@views/Home.vue') },
        { path: '/login', name: 'Login', component: () => import('@views/Login.vue') },
        { path: '/join', name: 'Join', component: () => import('@views/Join.vue') },
        { path: '/boards', name: 'PostList', component: () => import('@views/PostList.vue') },
        { path: '/boards/write', name: 'PostWrite', component: () => import('@compo/post/PostWrite.vue') },
        { path: '/boards/view', name: 'PostView', component: () => import('@compo/post/PostView.vue') },
        { path: '/foods', name: 'FoodList', component: () => import('@views/Foods.vue') },
        { path: '/recipes', name: 'RecipeList', component: () => import('@views/Recipes.vue') },
        { path: '/recipes/write', name: 'RecipeWrite', component: () => import('@compo/recipe/RecipeWrite.vue') },
        { path: '/recipes/view', name: 'RecipeView', component: () => import('@compo/recipe/RecipeView.vue') },
        { path: '/admin', name: 'AdminDashboard', component: () => import('@views/AdminDashboard.vue') },
        { path: '/findPassword', name: 'FindPassword', component: () => import('@views/FindPassword.vue') },
        { path: '/profile', name: 'Profile', component: () => import('@views/Profile.vue') },
    ]
});

export default router;