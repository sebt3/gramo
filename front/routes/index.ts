import { createRouter, createWebHistory } from 'vue-router'
import { route as installRoute, link as installLink, descriptions as installDescriptions } from './install/index'
import {menuLinksProps} from './interfaces';
const installRedirect = installRoute.redirect!=undefined?installRoute.redirect:{path: '/install'}

export const links:Array<menuLinksProps> = [installLink];
export const descriptions = {
  root:      {breadcrumb: '', icon: 'home', ns: false},
  ...installDescriptions
}
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