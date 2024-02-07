import {menuLinksProps} from '../interfaces';
import { RouteRecordRaw } from 'vue-router'
import { monitoringIcon, monitoringTitle, monitoringDesc } from '../custom.js';
const linkChildren:Array<menuLinksProps> = [];
const routeChildren:Array<RouteRecordRaw> = [];
const linkRedirect = {path:''};

import { route as opentelemetryRoute, link as opentelemetryLink, descriptions as opentelemetryDescriptions } from './opentelemetry'
if (Array.isArray(opentelemetryLink.children) && opentelemetryLink.children.length>0) {
  linkRedirect.path = linkRedirect.path!=''?linkRedirect.path:opentelemetryRoute['redirect']!=undefined?opentelemetryRoute['redirect'].path:'//opentelemetry'
  linkChildren.push(opentelemetryLink)
  routeChildren.push(opentelemetryRoute)
}

export const descriptions = {
  monitoring:      {breadcrumb: monitoringTitle, icon: monitoringIcon, ns: false},
  ...opentelemetryDescriptions,
}

export const link:menuLinksProps = {
  title: monitoringTitle, caption: monitoringDesc, icon: monitoringIcon,
  link: linkRedirect.path,
  level: 0,
  children: linkChildren
}
export const route = {
  path: 'monitoring',
  name: 'monitoring',
  redirect: linkRedirect,
  children: routeChildren
}
export default route
