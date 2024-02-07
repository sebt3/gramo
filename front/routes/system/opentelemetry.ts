import {menuLinksProps} from '../interfaces';
import { iconInstrumentation, iconOpAMPBridge, iconOpenTelemetryCollector,  opentelemetryIcon, opentelemetryTitle }from '../../libs/opentelemetry/custom.js'
import {  } from '../custom.js';
import { useCRDStore } from '../../stores'
const crds = useCRDStore().crds;
export const link:menuLinksProps = {
  name: 'systemopentelemetry',
  title: opentelemetryTitle, icon: opentelemetryIcon,
  link: '/system/opentelemetry/',
  level: 1,
  children: [
  crds['instrumentations.opentelemetry.io'] == undefined?[]:[{
    name: 'opentelemetryInstrumentations',
    title: 'Instrumentation', caption: 'List Instrumentation', icon: iconInstrumentation,
    link: '/system/opentelemetry/Instrumentation/', level: 2, children: []
  }],
  crds['opampbridges.opentelemetry.io'] == undefined?[]:[{
    name: 'opentelemetryOpAMPBridges',
    title: 'OpAMPBridge', caption: 'List OpAMPBridge', icon: iconOpAMPBridge,
    link: '/system/opentelemetry/OpAMPBridge/', level: 2, children: []
  }],
  crds['opentelemetrycollectors.opentelemetry.io'] == undefined?[]:[{
    name: 'opentelemetryOpenTelemetryCollectors',
    title: 'OpenTelemetryCollector', caption: 'List OpenTelemetryCollector', icon: iconOpenTelemetryCollector,
    link: '/system/opentelemetry/OpenTelemetryCollector/', level: 2, children: []
  }],
  ].flat()
}
export const descriptions = {
  systemopentelemetry:                {breadcrumb: opentelemetryTitle, icon: opentelemetryIcon, ns: false},
  systemopentelemetryDashboard:       {breadcrumb: 'Dashboard', icon: opentelemetryIcon, ns: false},
  opentelemetryInstrumentation:        {breadcrumb: 'Instrumentation', icon: iconInstrumentation, ns: false},
  opentelemetryInstrumentationAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  opentelemetryInstrumentationTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  opentelemetryInstrumentationView:     {breadcrumb: 'View', icon: iconInstrumentation, ns: true },
  opentelemetryInstrumentationEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  opentelemetryInstrumentationCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
  opentelemetryOpAMPBridge:        {breadcrumb: 'OpAMPBridge', icon: iconOpAMPBridge, ns: false},
  opentelemetryOpAMPBridgeAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  opentelemetryOpAMPBridgeTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  opentelemetryOpAMPBridgeView:     {breadcrumb: 'View', icon: iconOpAMPBridge, ns: true },
  opentelemetryOpAMPBridgeEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  opentelemetryOpAMPBridgeCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
  opentelemetryOpenTelemetryCollector:        {breadcrumb: 'OpenTelemetryCollector', icon: iconOpenTelemetryCollector, ns: false},
  opentelemetryOpenTelemetryCollectorAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  opentelemetryOpenTelemetryCollectorTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  opentelemetryOpenTelemetryCollectorView:     {breadcrumb: 'View', icon: iconOpenTelemetryCollector, ns: true },
  opentelemetryOpenTelemetryCollectorEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  opentelemetryOpenTelemetryCollectorCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
}
export const route = {
  path: 'opentelemetry',
  name: 'systemopentelemetry',
  redirect: {path: link.link as string},
  children: [
    {
      path: '',
      name: 'systemopentelemetryDashboard',
      component: () => import('../../pages/system/opentelemetry/Dashboard.vue'),
    },
    {
      path: 'Instrumentation',
      name: 'opentelemetryInstrumentation',
      children: [
        {
          path: '',
          name: 'opentelemetryInstrumentationAllTable',
          component: () => import('../../pages/system/opentelemetry/InstrumentationList.vue'),
        },
        {
          path: ':namespace',
          name: 'opentelemetryInstrumentationTable',
          component: () => import('../../pages/system/opentelemetry/InstrumentationList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'opentelemetryInstrumentationView',
          component: () => import('../../pages/system/opentelemetry/InstrumentationView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'opentelemetryInstrumentationEdit',
          component: () => import('../../pages/system/opentelemetry/InstrumentationEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'opentelemetryInstrumentationCreate',
          component: () => import('../../pages/system/opentelemetry/InstrumentationNew.vue'),
        }
      ]
    },
    {
      path: 'OpAMPBridge',
      name: 'opentelemetryOpAMPBridge',
      children: [
        {
          path: '',
          name: 'opentelemetryOpAMPBridgeAllTable',
          component: () => import('../../pages/system/opentelemetry/OpAMPBridgeList.vue'),
        },
        {
          path: ':namespace',
          name: 'opentelemetryOpAMPBridgeTable',
          component: () => import('../../pages/system/opentelemetry/OpAMPBridgeList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'opentelemetryOpAMPBridgeView',
          component: () => import('../../pages/system/opentelemetry/OpAMPBridgeView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'opentelemetryOpAMPBridgeEdit',
          component: () => import('../../pages/system/opentelemetry/OpAMPBridgeEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'opentelemetryOpAMPBridgeCreate',
          component: () => import('../../pages/system/opentelemetry/OpAMPBridgeNew.vue'),
        }
      ]
    },
    {
      path: 'OpenTelemetryCollector',
      name: 'opentelemetryOpenTelemetryCollector',
      children: [
        {
          path: '',
          name: 'opentelemetryOpenTelemetryCollectorAllTable',
          component: () => import('../../pages/system/opentelemetry/OpenTelemetryCollectorList.vue'),
        },
        {
          path: ':namespace',
          name: 'opentelemetryOpenTelemetryCollectorTable',
          component: () => import('../../pages/system/opentelemetry/OpenTelemetryCollectorList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'opentelemetryOpenTelemetryCollectorView',
          component: () => import('../../pages/system/opentelemetry/OpenTelemetryCollectorView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'opentelemetryOpenTelemetryCollectorEdit',
          component: () => import('../../pages/system/opentelemetry/OpenTelemetryCollectorEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'opentelemetryOpenTelemetryCollectorCreate',
          component: () => import('../../pages/system/opentelemetry/OpenTelemetryCollectorNew.vue'),
        }
      ]
    },
  ],
}
export default route
