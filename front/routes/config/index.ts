import {menuLinksProps} from '../interfaces';
import { RouteRecordRaw } from 'vue-router'
import { configIcon, configTitle, configDesc } from '../custom.js';
const linkChildren:Array<menuLinksProps> = [];
const routeChildren:Array<RouteRecordRaw> = [];
const linkRedirect = {path:''};

import { route as k8sRoute, link as k8sLink, descriptions as k8sDescriptions } from './k8s'
if (Array.isArray(k8sLink.children) && k8sLink.children.length>0) {
  linkRedirect.path = linkRedirect.path!=''?linkRedirect.path:k8sRoute['redirect']!=undefined?k8sRoute['redirect'].path:'//k8s'
  linkChildren.push(k8sLink)
  routeChildren.push(k8sRoute)
}
import { route as secretgeneratorRoute, link as secretgeneratorLink, descriptions as secretgeneratorDescriptions } from './secretgenerator'
if (Array.isArray(secretgeneratorLink.children) && secretgeneratorLink.children.length>0) {
  linkRedirect.path = linkRedirect.path!=''?linkRedirect.path:secretgeneratorRoute['redirect']!=undefined?secretgeneratorRoute['redirect'].path:'//secretgenerator'
  linkChildren.push(secretgeneratorLink)
  routeChildren.push(secretgeneratorRoute)
}

export const descriptions = {
  config:      {breadcrumb: configTitle, icon: configIcon, ns: false},
  ...k8sDescriptions,
  ...secretgeneratorDescriptions,
}

export const link:menuLinksProps = {
  title: configTitle, caption: configDesc, icon: configIcon,
  link: linkRedirect.path,
  level: 0,
  children: linkChildren
}
export const route = {
  path: 'config',
  name: 'config',
  redirect: linkRedirect,
  children: routeChildren
}
export default route
