import {menuLinksProps} from '../interfaces';
import { RouteRecordRaw } from 'vue-router'
import { useCRDStore } from '../../stores'
const crds = useCRDStore().crds;
const linkChildren:Array<menuLinksProps> = [];
const routeChildren:Array<RouteRecordRaw> = [];
const linkRedirect = {path:''};

import { route as mariadbRoute, link as mariadbLink, descriptions as mariadbDescriptions } from './mariadb'
if (crds['mongodbcommunity.mongodbcommunity.mongodb.com'] != undefined) {
  linkRedirect.path = mariadbRoute['redirect']!=undefined?mariadbRoute['redirect'].path:linkRedirect.path!=''?linkRedirect.path:'/database/mariadb'
  linkChildren.push(mariadbLink)
  routeChildren.push(mariadbRoute)
}

import { route as mongodbcommunityRoute, link as mongodbcommunityLink, descriptions as mongodbcommunityDescriptions } from './mongodbcommunity'
if (crds['mongodbcommunity.mongodbcommunity.mongodb.com'] != undefined) {
  linkRedirect.path = mongodbcommunityRoute['redirect']!=undefined?mongodbcommunityRoute['redirect'].path:linkRedirect.path!=''?linkRedirect.path:'/database/mongodbcommunity'
  linkChildren.push(mongodbcommunityLink)
  routeChildren.push(mongodbcommunityRoute)
}

import { route as redisRoute, link as redisLink, descriptions as redisDescriptions } from './redis'
if (crds['mongodbcommunity.mongodbcommunity.mongodb.com'] != undefined) {
  linkRedirect.path = redisRoute['redirect']!=undefined?redisRoute['redirect'].path:linkRedirect.path!=''?linkRedirect.path:'/database/redis'
  linkChildren.push(redisLink)
  routeChildren.push(redisRoute)
}

import { route as postgresqlRoute, link as postgresqlLink, descriptions as postgresqlDescriptions } from './postgresql'
if (crds['mongodbcommunity.mongodbcommunity.mongodb.com'] != undefined) {
  linkRedirect.path = postgresqlRoute['redirect']!=undefined?postgresqlRoute['redirect'].path:linkRedirect.path!=''?linkRedirect.path:'/database/postgresql'
  linkChildren.push(postgresqlLink)
  routeChildren.push(postgresqlRoute)
}


export const descriptions = {
  database:      {breadcrumb: 'Databases', icon: 'apps', ns: false},
  ...mongodbcommunityDescriptions,
  ...mariadbDescriptions,
  ...postgresqlDescriptions,
  ...redisDescriptions,
}

export const link:menuLinksProps = {
  name: 'database',
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
