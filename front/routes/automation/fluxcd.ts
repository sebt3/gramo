import {menuLinksProps} from '../interfaces';
import { RouteRecordRaw } from 'vue-router'
import { useCRDStore } from '../../stores'
const crds = useCRDStore().crds;
const linkChildren:Array<menuLinksProps> = [];
const routeChildren:Array<RouteRecordRaw> = [{
  path: '',
  name: 'fluxcdOverview',
  component: () => import('../../components/fluxcd/Overview.vue'),
}];
const linkRedirect = {path:''};
import { route as imageRoute, link as imageLink, descriptions as imageDescriptions } from './fluxcd.image'
if (crds['imagerepositories.image.toolkit.fluxcd.io'] != undefined) {
  linkRedirect.path = linkRedirect.path!=''?linkRedirect.path:imageRoute['redirect']!=undefined?imageRoute['redirect'].path:'/automation/fluxcd/imagepolicies'
  linkChildren.push(...imageLink.children as Array<menuLinksProps>)
  routeChildren.push(...imageRoute.children)
}
import { route as sourceRoute, link as sourceLink, descriptions as sourceDescriptions } from './fluxcd.source'
if (crds['gitrepositories.source.toolkit.fluxcd.io'] != undefined) {
  linkRedirect.path = linkRedirect.path!=''?linkRedirect.path:sourceRoute['redirect']!=undefined?sourceRoute['redirect'].path:'/automation/fluxcd/gitrepositories'
  linkChildren.push(...sourceLink.children as Array<menuLinksProps>)
  routeChildren.push(...sourceRoute.children)
}
import { route as kustomizeRoute, link as kustomizeLink, descriptions as kustomizeDescriptions } from './fluxcd.kustomize'
if (crds['kustomizations.kustomize.toolkit.fluxcd.io'] != undefined) {
  linkRedirect.path = linkRedirect.path!=''?linkRedirect.path:kustomizeRoute['redirect']!=undefined?kustomizeRoute['redirect'].path:'/automation/fluxcd/kustomizations'
  linkChildren.push(...kustomizeLink.children as Array<menuLinksProps>)
  routeChildren.push(...kustomizeRoute.children)
}
import { route as helmRoute, link as helmLink, descriptions as helmDescriptions } from './fluxcd.helm'
if (crds['helmreleases.helm.toolkit.fluxcd.io'] != undefined) {
  linkRedirect.path = linkRedirect.path!=''?linkRedirect.path:helmRoute['redirect']!=undefined?helmRoute['redirect'].path:'/automation/fluxcd/helmreleases'
  linkChildren.push(...helmLink.children as Array<menuLinksProps>)
  routeChildren.push(...helmRoute.children)
}
import { route as notificationRoute, link as notificationLink, descriptions as notificationDescriptions } from './fluxcd.notification'
if (crds['alerts.notification.toolkit.fluxcd.io'] != undefined) {
  linkRedirect.path = linkRedirect.path!=''?linkRedirect.path:notificationRoute['redirect']!=undefined?notificationRoute['redirect'].path:'/automation/fluxcd/alerts'
  linkChildren.push(...notificationLink.children as Array<menuLinksProps>)
  routeChildren.push(...notificationRoute.children)
}

export const descriptions = {
  fluxcd:                {breadcrumb: 'FluxCD', icon: 'auto_mode', ns: false},
  fluxcdOverview:        {breadcrumb: 'Overview', icon: 'visibility', ns: false},
  ...sourceDescriptions,
  ...notificationDescriptions,
  ...kustomizeDescriptions,
  ...imageDescriptions,
  ...helmDescriptions
}

export const link:menuLinksProps = {
  title: 'FluxCD', icon: 'auto_mode',
  link: linkRedirect.path,
  name: 'fluxcd',
  level: 1,
  children: linkChildren
}
export const route = {
  path: 'fluxcd',
  name: 'fluxcd',
//  redirect: linkRedirect,
  children: routeChildren
}
export default route
