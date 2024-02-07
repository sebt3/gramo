import {menuLinksProps} from '../interfaces';
import { iconInstrumentation, iconOpAMPBridge, iconOpenTelemetryCollector,  }from '../../libs/opentelemetry/custom.js'
import { opentelemetryIcon, opentelemetryTitle } from '../custom.js';
import { useCRDStore } from '../../stores'
const crds = useCRDStore().crds;
export const link:menuLinksProps = {
  name: 'monitoringopentelemetry',
  title: opentelemetryTitle, icon: opentelemetryIcon,
  link: '/monitoring/opentelemetry/Instrumentation/',
  level: 1,
  children: [
  crds['instrumentations.opentelemetry.io'] == undefined?[]:[{
    name: 'opentelemetryInstrumentations',
    title: 'Instrumentation', caption: 'List Instrumentation', icon: iconInstrumentation,
    link: '/monitoring/opentelemetry/Instrumentation/', level: 2, children: []
  }],
  crds['opampbridges.opentelemetry.io'] == undefined?[]:[{
    name: 'opentelemetryOpAMPBridges',
    title: 'OpAMPBridge', caption: 'List OpAMPBridge', icon: iconOpAMPBridge,
    link: '/monitoring/opentelemetry/OpAMPBridge/', level: 2, children: []
  }],
  crds['opentelemetrycollectors.opentelemetry.io'] == undefined?[]:[{
    name: 'opentelemetryOpenTelemetryCollectors',
    title: 'OpenTelemetryCollector', caption: 'List OpenTelemetryCollector', icon: iconOpenTelemetryCollector,
    link: '/monitoring/opentelemetry/OpenTelemetryCollector/', level: 2, children: []
  }],
  ].flat()
}
export const descriptions = {
  monitoringopentelemetry:                {breadcrumb: opentelemetryTitle, icon: opentelemetryIcon, ns: false},
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
  name: 'monitoringopentelemetry',
  redirect: {path: link.link as string},
  children: [
    {
      path: 'Instrumentation',
      name: 'opentelemetryInstrumentation',
      children: [
        {
          path: '',
          name: 'opentelemetryInstrumentationAllTable',
          component: () => import('../../pages/monitoring/opentelemetry/InstrumentationList.vue'),
        },
        {
          path: ':namespace',
          name: 'opentelemetryInstrumentationTable',
          component: () => import('../../pages/monitoring/opentelemetry/InstrumentationList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'opentelemetryInstrumentationView',
          component: () => import('../../pages/monitoring/opentelemetry/InstrumentationView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'opentelemetryInstrumentationEdit',
          component: () => import('../../pages/monitoring/opentelemetry/InstrumentationEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'opentelemetryInstrumentationCreate',
          component: () => import('../../pages/monitoring/opentelemetry/InstrumentationNew.vue'),
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
          component: () => import('../../pages/monitoring/opentelemetry/OpAMPBridgeList.vue'),
        },
        {
          path: ':namespace',
          name: 'opentelemetryOpAMPBridgeTable',
          component: () => import('../../pages/monitoring/opentelemetry/OpAMPBridgeList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'opentelemetryOpAMPBridgeView',
          component: () => import('../../pages/monitoring/opentelemetry/OpAMPBridgeView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'opentelemetryOpAMPBridgeEdit',
          component: () => import('../../pages/monitoring/opentelemetry/OpAMPBridgeEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'opentelemetryOpAMPBridgeCreate',
          component: () => import('../../pages/monitoring/opentelemetry/OpAMPBridgeNew.vue'),
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
          component: () => import('../../pages/monitoring/opentelemetry/OpenTelemetryCollectorList.vue'),
        },
        {
          path: ':namespace',
          name: 'opentelemetryOpenTelemetryCollectorTable',
          component: () => import('../../pages/monitoring/opentelemetry/OpenTelemetryCollectorList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'opentelemetryOpenTelemetryCollectorView',
          component: () => import('../../pages/monitoring/opentelemetry/OpenTelemetryCollectorView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'opentelemetryOpenTelemetryCollectorEdit',
          component: () => import('../../pages/monitoring/opentelemetry/OpenTelemetryCollectorEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'opentelemetryOpenTelemetryCollectorCreate',
          component: () => import('../../pages/monitoring/opentelemetry/OpenTelemetryCollectorNew.vue'),
        }
      ]
    },
  ],
}
export default route
