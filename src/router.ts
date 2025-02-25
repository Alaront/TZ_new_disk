import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/home'
import PersonalView from './views/personal'

export default createRouter({
    history: createWebHistory(),
    routes: [
        ...HomeView,
        ...PersonalView
    ]
})
