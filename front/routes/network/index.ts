import {menuLinksProps} from '../interfaces';
import { RouteRecordRaw } from 'vue-router'
import { useCRDStore } from '../../stores'
const crds = useCRDStore().crds;
const linkChildren:Array<menuLinksProps> = [];
const routeChildren:Array<RouteRecordRaw> = [];
const linkRedirect = {path:''};
import { route as projectcalicoRoute, link as projectcalicoLink, descriptions as projectcalicoDescriptions } from './projectcalico'
if (crds['clusterinformations.crd.projectcalico.org'] != undefined) {
  linkRedirect.path = linkRedirect.path!=''?linkRedirect.path:projectcalicoRoute['redirect']!=undefined?projectcalicoRoute['redirect'].path:'/system/projectcalico'
  linkChildren.push(projectcalicoLink)
  routeChildren.push(projectcalicoRoute)
}

export const descriptions = {
  system:      {breadcrumb: 'System', icon: 'fas fa-network-wired', ns: false},
  ...projectcalicoDescriptions,
}

export const link:menuLinksProps = {
  title: 'Network', icon: 'fas fa-network-wired',
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
