import { createRouter, createWebHistory } from 'vue-router'
import { route as installRoute, link as installLink } from './install/index'
export const links = [installLink];
export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'root',
      redirect: installRoute.redirect!=undefined?installRoute.redirect:{path: '/install'},
      children: [installRoute]
    }
  ]
})
export default router