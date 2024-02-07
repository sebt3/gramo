import {menuLinksProps} from '../interfaces';
import { RouteRecordRaw } from 'vue-router'
import { securityIcon, securityTitle, securityDesc } from '../custom.js';
const linkChildren:Array<menuLinksProps> = [];
const routeChildren:Array<RouteRecordRaw> = [];
const linkRedirect = {path:''};

import { route as k8sRoute, link as k8sLink, descriptions as k8sDescriptions } from './k8s'
if (Array.isArray(k8sLink.children) && k8sLink.children.length>0) {
  linkRedirect.path = linkRedirect.path!=''?linkRedirect.path:k8sRoute['redirect']!=undefined?k8sRoute['redirect'].path:'//k8s'
  linkChildren.push(k8sLink)
  routeChildren.push(k8sRoute)
}
import { route as projectcalicoRoute, link as projectcalicoLink, descriptions as projectcalicoDescriptions } from './projectcalico'
if (Array.isArray(projectcalicoLink.children) && projectcalicoLink.children.length>0) {
  linkRedirect.path = linkRedirect.path!=''?linkRedirect.path:projectcalicoRoute['redirect']!=undefined?projectcalicoRoute['redirect'].path:'//projectcalico'
  linkChildren.push(projectcalicoLink)
  routeChildren.push(projectcalicoRoute)
}

export const descriptions = {
  security:      {breadcrumb: securityTitle, icon: securityIcon, ns: false},
  ...k8sDescriptions,
  ...projectcalicoDescriptions,
}

export const link:menuLinksProps = {
  title: securityTitle, caption: securityDesc, icon: securityIcon,
  link: linkRedirect.path,
  level: 0,
  children: linkChildren
}
export const route = {
  path: 'security',
  name: 'security',
  redirect: linkRedirect,
  children: routeChildren
}
export default route
