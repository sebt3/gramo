import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import {menuLinksProps} from './interfaces.js';
import { useConfigStore } from '../stores'
export * from './interfaces.js'
const { defaultRoute } = useConfigStore()
const routeChildren:Array<RouteRecordRaw> = [];
const linkRedirect = {path:''};
export const links:Array<menuLinksProps> = [];

import { route as automationRoute, link as automationLink, descriptions as automationDescriptions } from './automation'
console.log(automationRoute)
if (automationRoute.children != undefined && automationRoute.children?.length>0) {
  console.log('adding auto')
  routeChildren.push(automationRoute);
  links.push(automationLink)
  linkRedirect.path = automationRoute.redirect!=undefined?automationRoute.redirect.path:'/automation'
}

import { route as installRoute, link as installLink, descriptions as installDescriptions } from './install'
if (installRoute.children != undefined && installRoute.children?.length>0) {
  routeChildren.push(installRoute);
  links.push(installLink)
  linkRedirect.path = installRoute.redirect!=undefined?installRoute.redirect.path:'/install'
}

export const descriptions = {
  root:      {breadcrumb: '', icon: 'home', ns: false},
  ...installDescriptions,
  ...automationDescriptions
}
export const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      name: 'root',
      redirect: defaultRoute!=''?{path:defaultRoute}:linkRedirect,
      children: routeChildren
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('../components/navigation/PageNotFound.vue') },
  ]
})
export default router