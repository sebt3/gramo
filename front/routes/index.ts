import { createRouter, createWebHistory } from 'vue-router'
import { route as installRoute, link as installLink } from './install/index'
const installRedirect = installRoute.redirect!=undefined?installRoute.redirect:{path: '/install'}

export const links = [installLink];
export const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      name: 'root',
      redirect: installRedirect,
      children: [installRoute]
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('../components/navigation/PageNotFound.vue') },
  ]
})
export default router