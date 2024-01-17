import {menuLinksProps} from '../interfaces';
import { RouteRecordRaw } from 'vue-router'
import { useCRDStore } from '../../stores'
const crds = useCRDStore().crds;
const linkChildren:Array<menuLinksProps> = [];
const routeChildren:Array<RouteRecordRaw> = [];
const linkRedirect = {path:''};
const cat = 'automation';

import { route as sourceRoute, link as sourceLink, descriptions as sourceDescriptions } from './fluxcd.source'
if (crds['gitrepositories.source.toolkit.fluxcd.io'] != undefined) {
  linkRedirect.path = sourceRoute['redirect']!=undefined?sourceRoute['redirect'].path:linkRedirect.path!=''?linkRedirect.path:'/automation/fluxcd/gitrepositories'
  linkChildren.push(...sourceLink.children)
  routeChildren.push(...sourceRoute.children)
}
import { route as helmRoute, link as helmLink, descriptions as helmDescriptions } from './fluxcd.helm'
if (crds['helmreleases.helm.toolkit.fluxcd.io'] != undefined) {
  linkRedirect.path = helmRoute['redirect']!=undefined?helmRoute['redirect'].path:linkRedirect.path!=''?linkRedirect.path:'/automation/fluxcd/helmreleases'
  linkChildren.push(...helmLink.children)
  routeChildren.push(...helmRoute.children)
}
import { route as imageRoute, link as imageLink, descriptions as imageDescriptions } from './fluxcd.image'
if (crds['imagerepositories.image.toolkit.fluxcd.io'] != undefined) {
  linkRedirect.path = imageRoute['redirect']!=undefined?imageRoute['redirect'].path:linkRedirect.path!=''?linkRedirect.path:'/automation/fluxcd/imagepolicies'
  linkChildren.push(...imageLink.children)
  routeChildren.push(...imageRoute.children)
}
import { route as kustomizeRoute, link as kustomizeLink, descriptions as kustomizeDescriptions } from './fluxcd.kustomize'
if (crds['kustomizations.kustomize.toolkit.fluxcd.io'] != undefined) {
  linkRedirect.path = kustomizeRoute['redirect']!=undefined?kustomizeRoute['redirect'].path:linkRedirect.path!=''?linkRedirect.path:'/automation/fluxcd/kustomizations'
  linkChildren.push(...kustomizeLink.children)
  routeChildren.push(...kustomizeRoute.children)
}
import { route as notificationRoute, link as notificationLink, descriptions as notificationDescriptions } from './fluxcd.notification'
if (crds['alerts.notification.toolkit.fluxcd.io'] != undefined) {
  linkRedirect.path = notificationRoute['redirect']!=undefined?notificationRoute['redirect'].path:linkRedirect.path!=''?linkRedirect.path:'/automation/fluxcd/alerts'
  linkChildren.push(...notificationLink.children)
  routeChildren.push(...notificationRoute.children)
}

export const descriptions = {
  fluxcd:                {breadcrumb: 'FluxCD', icon: 'auto_mode', ns: false},
  ...sourceDescriptions,
  ...notificationDescriptions,
  ...kustomizeDescriptions,
  ...imageDescriptions,
  ...helmDescriptions
}

export const link:menuLinksProps = {
  title: 'FluxCD', icon: 'auto_mode',
  link: `/${cat}/fluxcd/gitrepositories/`,
  level: 1,
  children: linkChildren
}
export const route = {
  path: 'fluxcd',
  name: 'fluxcd',
  redirect: linkRedirect,
  children: routeChildren
}
export default route
