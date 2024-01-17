import {menuLinksProps} from '../interfaces';
import { RouteRecordRaw } from 'vue-router'
import { useCRDStore } from '../../stores'
const crds = useCRDStore().crds;
const linkChildren:Array<menuLinksProps> = [];
const routeChildren:Array<RouteRecordRaw> = [];
const linkRedirect = {path:''};

import { route as fluxcdRoute, link as fluxcdLink, descriptions as fluxcdDescriptions } from './fluxcd'
if (crds['gitrepositories.source.toolkit.fluxcd.io'] != undefined) {
  linkRedirect.path = fluxcdRoute['redirect']!=undefined?fluxcdRoute['redirect'].path:'/install/fluxcd'
  linkChildren.push(fluxcdLink)
  routeChildren.push(fluxcdRoute)
}

export const descriptions = {
  automations:      {breadcrumb: 'Automations', icon: 'apps', ns: false},
  ...fluxcdDescriptions
}

export const link:menuLinksProps = {
  title: 'Automation', icon: 'auto_mode',
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
