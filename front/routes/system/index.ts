import {menuLinksProps} from '../interfaces';
import { RouteRecordRaw } from 'vue-router'
import { systemIcon, systemTitle, systemDesc } from '../custom.js';
const linkChildren:Array<menuLinksProps> = [];
const routeChildren:Array<RouteRecordRaw> = [];
const linkRedirect = {path:''};

import { route as k8sRoute, link as k8sLink, descriptions as k8sDescriptions } from './k8s'
if (Array.isArray(k8sLink.children) && k8sLink.children.length>0) {
  linkRedirect.path = linkRedirect.path!=''?linkRedirect.path:k8sRoute['redirect']!=undefined?k8sRoute['redirect'].path:'//k8s'
  linkChildren.push(k8sLink)
  routeChildren.push(k8sRoute)
}
import { route as jaegertracingRoute, link as jaegertracingLink, descriptions as jaegertracingDescriptions } from './jaegertracing'
if (Array.isArray(jaegertracingLink.children) && jaegertracingLink.children.length>0) {
  linkRedirect.path = linkRedirect.path!=''?linkRedirect.path:jaegertracingRoute['redirect']!=undefined?jaegertracingRoute['redirect'].path:'//jaegertracing'
  linkChildren.push(jaegertracingLink)
  routeChildren.push(jaegertracingRoute)
}
import { route as k8upRoute, link as k8upLink, descriptions as k8upDescriptions } from './k8up'
if (Array.isArray(k8upLink.children) && k8upLink.children.length>0) {
  linkRedirect.path = linkRedirect.path!=''?linkRedirect.path:k8upRoute['redirect']!=undefined?k8upRoute['redirect'].path:'//k8up'
  linkChildren.push(k8upLink)
  routeChildren.push(k8upRoute)
}
import { route as monitoringRoute, link as monitoringLink, descriptions as monitoringDescriptions } from './monitoring'
if (Array.isArray(monitoringLink.children) && monitoringLink.children.length>0) {
  linkRedirect.path = linkRedirect.path!=''?linkRedirect.path:monitoringRoute['redirect']!=undefined?monitoringRoute['redirect'].path:'//monitoring'
  linkChildren.push(monitoringLink)
  routeChildren.push(monitoringRoute)
}
import { route as opentelemetryRoute, link as opentelemetryLink, descriptions as opentelemetryDescriptions } from './opentelemetry'
if (Array.isArray(opentelemetryLink.children) && opentelemetryLink.children.length>0) {
  linkRedirect.path = linkRedirect.path!=''?linkRedirect.path:opentelemetryRoute['redirect']!=undefined?opentelemetryRoute['redirect'].path:'//opentelemetry'
  linkChildren.push(opentelemetryLink)
  routeChildren.push(opentelemetryRoute)
}

export const descriptions = {
  system:      {breadcrumb: systemTitle, icon: systemIcon, ns: false},
  ...k8sDescriptions,
  ...jaegertracingDescriptions,
  ...k8upDescriptions,
  ...monitoringDescriptions,
  ...opentelemetryDescriptions,
}

export const link:menuLinksProps = {
  title: systemTitle, caption: systemDesc, icon: systemIcon,
  link: linkRedirect.path,
  level: 0,
  children: linkChildren
}
export const route = {
  path: 'system',
  name: 'system',
  redirect: linkRedirect,
  children: routeChildren
}
export default route
