import {menuLinksProps} from '../interfaces';
import { RouteRecordRaw } from 'vue-router'
import { useCRDStore } from '../../stores'
const crds = useCRDStore().crds;
const linkChildren:Array<menuLinksProps> = [];
const routeChildren:Array<RouteRecordRaw> = [];
const linkRedirect = {path:''};

import { route as secretgeneratorRoute, link as secretgeneratorLink, descriptions as secretgeneratorDescriptions } from './secretgenerator'
if (crds['stringsecrets.secretgenerator.mittwald.de'] != undefined) {
  linkRedirect.path = secretgeneratorRoute['redirect']!=undefined?secretgeneratorRoute['redirect'].path:'/config/secretgenerator'
  linkChildren.push(secretgeneratorLink)
  routeChildren.push(secretgeneratorRoute)
}

export const descriptions = {
  config:      {breadcrumb: 'Configurations', icon: 'apps', ns: false},
  ...secretgeneratorDescriptions
}

export const link:menuLinksProps = {
  title: 'Configuration', icon: 'settings_suggest',
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
