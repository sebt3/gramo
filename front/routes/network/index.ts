import {menuLinksProps} from '../interfaces';
import { RouteRecordRaw } from 'vue-router'
import { networkIcon, networkTitle, networkDesc } from '../custom.js';
const linkChildren:Array<menuLinksProps> = [];
const routeChildren:Array<RouteRecordRaw> = [];
const linkRedirect = {path:''};

import { route as k8sRoute, link as k8sLink, descriptions as k8sDescriptions } from './k8s'
if (Array.isArray(k8sLink.children) && k8sLink.children.length>0) {
  linkRedirect.path = linkRedirect.path!=''?linkRedirect.path:k8sRoute['redirect']!=undefined?k8sRoute['redirect'].path:'//k8s'
  linkChildren.push(k8sLink)
  routeChildren.push(k8sRoute)
}
import { route as certmanagerRoute, link as certmanagerLink, descriptions as certmanagerDescriptions } from './certmanager'
if (Array.isArray(certmanagerLink.children) && certmanagerLink.children.length>0) {
  linkRedirect.path = linkRedirect.path!=''?linkRedirect.path:certmanagerRoute['redirect']!=undefined?certmanagerRoute['redirect'].path:'//certmanager'
  linkChildren.push(certmanagerLink)
  routeChildren.push(certmanagerRoute)
}
import { route as projectcalicoRoute, link as projectcalicoLink, descriptions as projectcalicoDescriptions } from './projectcalico'
if (Array.isArray(projectcalicoLink.children) && projectcalicoLink.children.length>0) {
  linkRedirect.path = linkRedirect.path!=''?linkRedirect.path:projectcalicoRoute['redirect']!=undefined?projectcalicoRoute['redirect'].path:'//projectcalico'
  linkChildren.push(projectcalicoLink)
  routeChildren.push(projectcalicoRoute)
}
import { route as traefikRoute, link as traefikLink, descriptions as traefikDescriptions } from './traefik'
if (Array.isArray(traefikLink.children) && traefikLink.children.length>0) {
  linkRedirect.path = linkRedirect.path!=''?linkRedirect.path:traefikRoute['redirect']!=undefined?traefikRoute['redirect'].path:'//traefik'
  linkChildren.push(traefikLink)
  routeChildren.push(traefikRoute)
}

export const descriptions = {
  network:      {breadcrumb: networkTitle, icon: networkIcon, ns: false},
  ...k8sDescriptions,
  ...certmanagerDescriptions,
  ...projectcalicoDescriptions,
  ...traefikDescriptions,
}

export const link:menuLinksProps = {
  title: networkTitle, caption: networkDesc, icon: networkIcon,
  link: linkRedirect.path,
  level: 0,
  children: linkChildren
}
export const route = {
  path: 'network',
  name: 'network',
  redirect: linkRedirect,
  children: routeChildren
}
export default route
