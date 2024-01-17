import {menuLinksProps} from '../interfaces';
import { RouteRecordRaw } from 'vue-router'
import { useCRDStore } from '../../stores'
const crds = useCRDStore().crds;
const linkChildren:Array<menuLinksProps> = [];
const routeChildren:Array<RouteRecordRaw> = [];
const linkRedirect = {path:''};

import { route as mongodbcommunityRoute, link as mongodbcommunityLink, descriptions as mongodbcommunityDescriptions } from './mongodbcommunity'
if (crds['mongodbcommunity.mongodbcommunity.mongodb.com'] != undefined) {
  linkRedirect.path = mongodbcommunityRoute['redirect']!=undefined?mongodbcommunityRoute['redirect'].path:'/database/mongodbcommunity'
  linkChildren.push(mongodbcommunityLink)
  routeChildren.push(mongodbcommunityRoute)
}

export const descriptions = {
  database:      {breadcrumb: 'Databases', icon: 'apps', ns: false},
  ...mongodbcommunityDescriptions
}

export const link:menuLinksProps = {
  title: 'Databases', icon: 'fas fa-database',
  link: linkRedirect.path,
  level: 0,
  children: linkChildren
}
export const route = {
  path: 'database',
  name: 'database',
  redirect: linkRedirect,
  children: routeChildren
}
export default route
