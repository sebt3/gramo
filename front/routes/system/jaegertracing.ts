import {menuLinksProps} from '../interfaces';
import { iconJaeger,  jaegertracingIcon, jaegertracingTitle }from '../../libs/jaegertracing/custom.js'
import {  } from '../custom.js';
import { useCRDStore } from '../../stores'
const crds = useCRDStore().crds;
export const link:menuLinksProps = {
  name: 'systemjaegertracing',
  title: jaegertracingTitle, icon: jaegertracingIcon,
  link: '/system/jaegertracing/',
  level: 1,
  children: [
  crds['jaegers.jaegertracing.io'] == undefined?[]:[{
    name: 'jaegertracingJaegers',
    title: 'Jaeger', caption: 'List Jaeger', icon: iconJaeger,
    link: '/system/jaegertracing/Jaeger/', level: 2, children: []
  }],
  ].flat()
}
export const descriptions = {
  systemjaegertracing:                {breadcrumb: jaegertracingTitle, icon: jaegertracingIcon, ns: false},
  systemjaegertracingDashboard:       {breadcrumb: 'Dashboard', icon: jaegertracingIcon, ns: false},
  jaegertracingJaeger:        {breadcrumb: 'Jaeger', icon: iconJaeger, ns: false},
  jaegertracingJaegerAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  jaegertracingJaegerTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  jaegertracingJaegerView:     {breadcrumb: 'View', icon: iconJaeger, ns: true },
  jaegertracingJaegerEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  jaegertracingJaegerCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
}
export const route = {
  path: 'jaegertracing',
  name: 'systemjaegertracing',
  redirect: {path: link.link as string},
  children: [
    {
      path: '',
      name: 'systemjaegertracingDashboard',
      component: () => import('../../pages/system/jaegertracing/Dashboard.vue'),
    },
    {
      path: 'Jaeger',
      name: 'jaegertracingJaeger',
      children: [
        {
          path: '',
          name: 'jaegertracingJaegerAllTable',
          component: () => import('../../pages/system/jaegertracing/JaegerList.vue'),
        },
        {
          path: ':namespace',
          name: 'jaegertracingJaegerTable',
          component: () => import('../../pages/system/jaegertracing/JaegerList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'jaegertracingJaegerView',
          component: () => import('../../pages/system/jaegertracing/JaegerView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'jaegertracingJaegerEdit',
          component: () => import('../../pages/system/jaegertracing/JaegerEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'jaegertracingJaegerCreate',
          component: () => import('../../pages/system/jaegertracing/JaegerNew.vue'),
        }
      ]
    },
  ],
}
export default route
