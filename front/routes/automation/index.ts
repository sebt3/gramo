import {menuLinksProps} from '../interfaces';
import { RouteRecordRaw } from 'vue-router'
import { automationIcon, automationTitle, automationDesc } from '../custom.js';
const linkChildren:Array<menuLinksProps> = [];
const routeChildren:Array<RouteRecordRaw> = [];
const linkRedirect = {path:''};

import { route as fluxcdRoute, link as fluxcdLink, descriptions as fluxcdDescriptions } from './fluxcd'
if (Array.isArray(fluxcdLink.children) && fluxcdLink.children.length>0) {
  linkRedirect.path = linkRedirect.path!=''?linkRedirect.path:fluxcdRoute['redirect']!=undefined?fluxcdRoute['redirect'].path:'//fluxcd'
  linkChildren.push(fluxcdLink)
  routeChildren.push(fluxcdRoute)
}

export const descriptions = {
  automation:      {breadcrumb: automationTitle, icon: automationIcon, ns: false},
  ...fluxcdDescriptions,
}

export const link:menuLinksProps = {
  title: automationTitle, caption: automationDesc, icon: automationIcon,
  link: linkRedirect.path,
  level: 0,
  children: linkChildren
}
export const route = {
  path: 'automation',
  name: 'automation',
  redirect: linkRedirect,
  children: routeChildren
}
export default route
