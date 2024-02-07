import {menuLinksProps} from '../interfaces';
import { RouteRecordRaw } from 'vue-router'
import { workloadIcon, workloadTitle, workloadDesc } from '../custom.js';
const linkChildren:Array<menuLinksProps> = [];
const routeChildren:Array<RouteRecordRaw> = [];
const linkRedirect = {path:''};

import { route as k8sRoute, link as k8sLink, descriptions as k8sDescriptions } from './k8s'
if (Array.isArray(k8sLink.children) && k8sLink.children.length>0) {
  linkRedirect.path = linkRedirect.path!=''?linkRedirect.path:k8sRoute['redirect']!=undefined?k8sRoute['redirect'].path:'//k8s'
  linkChildren.push(k8sLink)
  routeChildren.push(k8sRoute)
}

export const descriptions = {
  workload:      {breadcrumb: workloadTitle, icon: workloadIcon, ns: false},
  ...k8sDescriptions,
}

export const link:menuLinksProps = {
  title: workloadTitle, caption: workloadDesc, icon: workloadIcon,
  link: linkRedirect.path,
  level: 0,
  children: linkChildren
}
export const route = {
  path: 'workload',
  name: 'workload',
  redirect: linkRedirect,
  children: routeChildren
}
export default route
