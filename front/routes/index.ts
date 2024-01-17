import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import {menuLinksProps} from './interfaces.js';
import { useConfigStore } from '../stores'
export * from './interfaces.js'
const { defaultRoute } = useConfigStore()
const routeChildren:Array<RouteRecordRaw> = [];
const linkRedirect = {path:''};
export const links:Array<menuLinksProps> = [];

import { route as installRoute, link as installLink, descriptions as installDescriptions } from './install'
if (installRoute.children != undefined && installRoute.children?.length>0) {
  routeChildren.push(installRoute);
  links.push(installLink)
  linkRedirect.path = installRoute.redirect!=undefined?installRoute.redirect.path:'/install'
}

import { route as automationRoute, link as automationLink, descriptions as automationDescriptions } from './automation'
if (automationRoute.children != undefined && automationRoute.children?.length>0) {
  routeChildren.push(automationRoute);
  links.push(automationLink)
  linkRedirect.path = automationRoute.redirect!=undefined?automationRoute.redirect.path:'/automation'
}

import { route as databaseRoute, link as databaseLink, descriptions as databaseDescriptions } from './database'
if (databaseRoute.children != undefined && databaseRoute.children?.length>0) {
  routeChildren.push(databaseRoute);
  links.push(databaseLink)
  linkRedirect.path = databaseRoute.redirect!=undefined?databaseRoute.redirect.path:'/database'
}

import { route as configRoute, link as configLink, descriptions as configDescriptions } from './config'
if (configRoute.children != undefined && configRoute.children?.length>0) {
  routeChildren.push(configRoute);
  links.push(configLink)
  linkRedirect.path = configRoute.redirect!=undefined?configRoute.redirect.path:'/config'
}

export const descriptions = {
  root:      {breadcrumb: '', icon: 'home', ns: false},
  ...installDescriptions,
  ...automationDescriptions,
  ...configDescriptions,
  ...databaseDescriptions,
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