import {menuLinksProps} from '../interfaces';
import { RouteRecordRaw } from 'vue-router'
import { useCRDStore } from '../../stores'
const crds = useCRDStore().crds;
const linkChildren:Array<menuLinksProps> = [];
const routeChildren:Array<RouteRecordRaw> = [];
const linkRedirect = {path:''};

import { route as monitoringRoute, link as monitoringLink, descriptions as monitoringDescriptions } from './monitoring'
if (crds['prometheusrules.monitoring.coreos.com'] != undefined) {
  linkRedirect.path = linkRedirect.path!=''?linkRedirect.path:monitoringRoute['redirect']!=undefined?monitoringRoute['redirect'].path:'/system/monitoring'
  linkChildren.push(monitoringLink)
  routeChildren.push(monitoringRoute)
}

import { route as k8upRoute, link as k8upLink, descriptions as k8upDescriptions } from './k8up'
if (crds['backups.k8up.io'] != undefined) {
  linkRedirect.path = linkRedirect.path!=''?linkRedirect.path:k8upRoute['redirect']!=undefined?k8upRoute['redirect'].path:'/system/k8up'
  linkChildren.push(k8upLink)
  routeChildren.push(k8upRoute)
}

export const descriptions = {
  system:      {breadcrumb: 'System', icon: 'apps', ns: false},
  ...monitoringDescriptions,
  ...k8upDescriptions,
}

export const link:menuLinksProps = {
  title: 'System', icon: 'pending',
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
