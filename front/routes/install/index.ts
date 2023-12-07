import {menuLinksProps} from '../interfaces';
import { RouteRecordRaw } from 'vue-router'
import { useCRDStore } from '../../stores'
const crds = useCRDStore().crds;
const linkChildren:Array<menuLinksProps> = [];
const routeChildren:Array<RouteRecordRaw> = [];
const linkRedirect = {path:''};

import { route as vynilRoute, link as vynilLink, descriptions as vynilDescriptions } from './vynil'
if (crds['installs.vynil.solidite.fr'] != undefined) {
  linkRedirect.path = vynilRoute['redirect']!=undefined?vynilRoute['redirect'].path:'/install/vynil'
  linkChildren.push(vynilLink)
  routeChildren.push(vynilRoute)
}

export const descriptions = {
  install:      {breadcrumb: 'Applications', icon: 'apps', ns: false},
  ...vynilDescriptions
}

export const link:menuLinksProps = {
  title: 'Installation', caption: "d'applications", icon: 'apps',
  link: linkRedirect.path,
  level: 0,
  children: linkChildren
}
export const route = {
  path: 'install',
  name: 'install',
  redirect: linkRedirect,
  children: routeChildren
}
export default route
