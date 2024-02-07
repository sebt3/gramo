import {menuLinksProps} from '../interfaces';
import { RouteRecordRaw } from 'vue-router'
import { databaseIcon, databaseTitle, databaseDesc } from '../custom.js';
const linkChildren:Array<menuLinksProps> = [];
const routeChildren:Array<RouteRecordRaw> = [];
const linkRedirect = {path:''};

import { route as zalandoRoute, link as zalandoLink, descriptions as zalandoDescriptions } from './zalando'
if (Array.isArray(zalandoLink.children) && zalandoLink.children.length>0) {
  linkRedirect.path = linkRedirect.path!=''?linkRedirect.path:zalandoRoute['redirect']!=undefined?zalandoRoute['redirect'].path:'//zalando'
  linkChildren.push(zalandoLink)
  routeChildren.push(zalandoRoute)
}
import { route as mongodbRoute, link as mongodbLink, descriptions as mongodbDescriptions } from './mongodb'
if (Array.isArray(mongodbLink.children) && mongodbLink.children.length>0) {
  linkRedirect.path = linkRedirect.path!=''?linkRedirect.path:mongodbRoute['redirect']!=undefined?mongodbRoute['redirect'].path:'//mongodb'
  linkChildren.push(mongodbLink)
  routeChildren.push(mongodbRoute)
}
import { route as cnpgRoute, link as cnpgLink, descriptions as cnpgDescriptions } from './cnpg'
if (Array.isArray(cnpgLink.children) && cnpgLink.children.length>0) {
  linkRedirect.path = linkRedirect.path!=''?linkRedirect.path:cnpgRoute['redirect']!=undefined?cnpgRoute['redirect'].path:'//cnpg'
  linkChildren.push(cnpgLink)
  routeChildren.push(cnpgRoute)
}
import { route as mariadbRoute, link as mariadbLink, descriptions as mariadbDescriptions } from './mariadb'
if (Array.isArray(mariadbLink.children) && mariadbLink.children.length>0) {
  linkRedirect.path = linkRedirect.path!=''?linkRedirect.path:mariadbRoute['redirect']!=undefined?mariadbRoute['redirect'].path:'//mariadb'
  linkChildren.push(mariadbLink)
  routeChildren.push(mariadbRoute)
}
import { route as rabbitmqRoute, link as rabbitmqLink, descriptions as rabbitmqDescriptions } from './rabbitmq'
if (Array.isArray(rabbitmqLink.children) && rabbitmqLink.children.length>0) {
  linkRedirect.path = linkRedirect.path!=''?linkRedirect.path:rabbitmqRoute['redirect']!=undefined?rabbitmqRoute['redirect'].path:'//rabbitmq'
  linkChildren.push(rabbitmqLink)
  routeChildren.push(rabbitmqRoute)
}
import { route as redisRoute, link as redisLink, descriptions as redisDescriptions } from './redis'
if (Array.isArray(redisLink.children) && redisLink.children.length>0) {
  linkRedirect.path = linkRedirect.path!=''?linkRedirect.path:redisRoute['redirect']!=undefined?redisRoute['redirect'].path:'//redis'
  linkChildren.push(redisLink)
  routeChildren.push(redisRoute)
}
import { route as oracleRoute, link as oracleLink, descriptions as oracleDescriptions } from './oracle'
if (Array.isArray(oracleLink.children) && oracleLink.children.length>0) {
  linkRedirect.path = linkRedirect.path!=''?linkRedirect.path:oracleRoute['redirect']!=undefined?oracleRoute['redirect'].path:'//oracle'
  linkChildren.push(oracleLink)
  routeChildren.push(oracleRoute)
}

export const descriptions = {
  database:      {breadcrumb: databaseTitle, icon: databaseIcon, ns: false},
  ...zalandoDescriptions,
  ...mongodbDescriptions,
  ...cnpgDescriptions,
  ...mariadbDescriptions,
  ...rabbitmqDescriptions,
  ...redisDescriptions,
  ...oracleDescriptions,
}

export const link:menuLinksProps = {
  title: databaseTitle, caption: databaseDesc, icon: databaseIcon,
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
