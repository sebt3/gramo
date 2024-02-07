import {menuLinksProps} from '../interfaces';
import { RouteRecordRaw } from 'vue-router'
import { installIcon, installTitle, installDesc } from '../custom.js';
const linkChildren:Array<menuLinksProps> = [];
const routeChildren:Array<RouteRecordRaw> = [];
const linkRedirect = {path:''};

import { route as vynilRoute, link as vynilLink, descriptions as vynilDescriptions } from './vynil'
if (Array.isArray(vynilLink.children) && vynilLink.children.length>0) {
  linkRedirect.path = linkRedirect.path!=''?linkRedirect.path:vynilRoute['redirect']!=undefined?vynilRoute['redirect'].path:'//vynil'
  linkChildren.push(vynilLink)
  routeChildren.push(vynilRoute)
}

export const descriptions = {
  install:      {breadcrumb: installTitle, icon: installIcon, ns: false},
  ...vynilDescriptions,
}

export const link:menuLinksProps = {
  title: installTitle, caption: installDesc, icon: installIcon,
  link: linkRedirect.path,
  level: 0,
  children: linkChildren
}
export const route = {
  path: 'install',
  name: 'install',
  redirect: linkRedirect,
  children: routeChildren
}
export default route
