import {menuLinksProps} from '../interfaces';
import { iconAlertmanager, iconPodMonitor, iconProbe, iconPrometheus, iconPrometheusRule, iconServiceMonitor, iconThanosRuler, iconAlertmanagerConfig, iconPrometheusAgent,  monitoringIcon, monitoringTitle }from '../../libs/monitoring/custom.js'
import {  } from '../custom.js';
import { useCRDStore } from '../../stores'
const crds = useCRDStore().crds;
export const link:menuLinksProps = {
  name: 'systemmonitoring',
  title: monitoringTitle, icon: monitoringIcon,
  link: '/system/monitoring/',
  level: 1,
  children: [
  crds['alertmanagers.monitoring.coreos.com'] == undefined?[]:[{
    name: 'monitoringAlertmanagers',
    title: 'Alertmanager', caption: 'List Alertmanager', icon: iconAlertmanager,
    link: '/system/monitoring/Alertmanager/', level: 2, children: []
  }],
  crds['podmonitors.monitoring.coreos.com'] == undefined?[]:[{
    name: 'monitoringPodMonitors',
    title: 'PodMonitor', caption: 'List PodMonitor', icon: iconPodMonitor,
    link: '/system/monitoring/PodMonitor/', level: 2, children: []
  }],
  crds['probes.monitoring.coreos.com'] == undefined?[]:[{
    name: 'monitoringProbes',
    title: 'Probe', caption: 'List Probe', icon: iconProbe,
    link: '/system/monitoring/Probe/', level: 2, children: []
  }],
  crds['prometheuses.monitoring.coreos.com'] == undefined?[]:[{
    name: 'monitoringPrometheuss',
    title: 'Prometheus', caption: 'List Prometheus', icon: iconPrometheus,
    link: '/system/monitoring/Prometheus/', level: 2, children: []
  }],
  crds['prometheusrules.monitoring.coreos.com'] == undefined?[]:[{
    name: 'monitoringPrometheusRules',
    title: 'PrometheusRule', caption: 'List PrometheusRule', icon: iconPrometheusRule,
    link: '/system/monitoring/PrometheusRule/', level: 2, children: []
  }],
  crds['servicemonitors.monitoring.coreos.com'] == undefined?[]:[{
    name: 'monitoringServiceMonitors',
    title: 'ServiceMonitor', caption: 'List ServiceMonitor', icon: iconServiceMonitor,
    link: '/system/monitoring/ServiceMonitor/', level: 2, children: []
  }],
  crds['thanosrulers.monitoring.coreos.com'] == undefined?[]:[{
    name: 'monitoringThanosRulers',
    title: 'ThanosRuler', caption: 'List ThanosRuler', icon: iconThanosRuler,
    link: '/system/monitoring/ThanosRuler/', level: 2, children: []
  }],
  crds['alertmanagerconfigs.monitoring.coreos.com'] == undefined?[]:[{
    name: 'monitoringAlertmanagerConfigs',
    title: 'AlertmanagerConfig', caption: 'List AlertmanagerConfig', icon: iconAlertmanagerConfig,
    link: '/system/monitoring/AlertmanagerConfig/', level: 2, children: []
  }],
  crds['prometheusagents.monitoring.coreos.com'] == undefined?[]:[{
    name: 'monitoringPrometheusAgents',
    title: 'PrometheusAgent', caption: 'List PrometheusAgent', icon: iconPrometheusAgent,
    link: '/system/monitoring/PrometheusAgent/', level: 2, children: []
  }],
  ].flat()
}
export const descriptions = {
  systemmonitoring:                {breadcrumb: monitoringTitle, icon: monitoringIcon, ns: false},
  systemmonitoringDashboard:       {breadcrumb: 'Dashboard', icon: monitoringIcon, ns: false},
  monitoringAlertmanager:        {breadcrumb: 'Alertmanager', icon: iconAlertmanager, ns: false},
  monitoringAlertmanagerAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  monitoringAlertmanagerTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  monitoringAlertmanagerView:     {breadcrumb: 'View', icon: iconAlertmanager, ns: true },
  monitoringAlertmanagerEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  monitoringAlertmanagerCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
  monitoringPodMonitor:        {breadcrumb: 'PodMonitor', icon: iconPodMonitor, ns: false},
  monitoringPodMonitorAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  monitoringPodMonitorTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  monitoringPodMonitorView:     {breadcrumb: 'View', icon: iconPodMonitor, ns: true },
  monitoringPodMonitorEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  monitoringPodMonitorCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
  monitoringProbe:        {breadcrumb: 'Probe', icon: iconProbe, ns: false},
  monitoringProbeAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  monitoringProbeTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  monitoringProbeView:     {breadcrumb: 'View', icon: iconProbe, ns: true },
  monitoringProbeEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  monitoringProbeCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
  monitoringPrometheus:        {breadcrumb: 'Prometheus', icon: iconPrometheus, ns: false},
  monitoringPrometheusAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  monitoringPrometheusTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  monitoringPrometheusView:     {breadcrumb: 'View', icon: iconPrometheus, ns: true },
  monitoringPrometheusEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  monitoringPrometheusCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
  monitoringPrometheusRule:        {breadcrumb: 'PrometheusRule', icon: iconPrometheusRule, ns: false},
  monitoringPrometheusRuleAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  monitoringPrometheusRuleTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  monitoringPrometheusRuleView:     {breadcrumb: 'View', icon: iconPrometheusRule, ns: true },
  monitoringPrometheusRuleEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  monitoringPrometheusRuleCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
  monitoringServiceMonitor:        {breadcrumb: 'ServiceMonitor', icon: iconServiceMonitor, ns: false},
  monitoringServiceMonitorAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  monitoringServiceMonitorTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  monitoringServiceMonitorView:     {breadcrumb: 'View', icon: iconServiceMonitor, ns: true },
  monitoringServiceMonitorEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  monitoringServiceMonitorCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
  monitoringThanosRuler:        {breadcrumb: 'ThanosRuler', icon: iconThanosRuler, ns: false},
  monitoringThanosRulerAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  monitoringThanosRulerTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  monitoringThanosRulerView:     {breadcrumb: 'View', icon: iconThanosRuler, ns: true },
  monitoringThanosRulerEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  monitoringThanosRulerCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
  monitoringAlertmanagerConfig:        {breadcrumb: 'AlertmanagerConfig', icon: iconAlertmanagerConfig, ns: false},
  monitoringAlertmanagerConfigAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  monitoringAlertmanagerConfigTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  monitoringAlertmanagerConfigView:     {breadcrumb: 'View', icon: iconAlertmanagerConfig, ns: true },
  monitoringAlertmanagerConfigEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  monitoringAlertmanagerConfigCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
  monitoringPrometheusAgent:        {breadcrumb: 'PrometheusAgent', icon: iconPrometheusAgent, ns: false},
  monitoringPrometheusAgentAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  monitoringPrometheusAgentTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  monitoringPrometheusAgentView:     {breadcrumb: 'View', icon: iconPrometheusAgent, ns: true },
  monitoringPrometheusAgentEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  monitoringPrometheusAgentCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
}
export const route = {
  path: 'monitoring',
  name: 'systemmonitoring',
  redirect: {path: link.link as string},
  children: [
    {
      path: '',
      name: 'systemmonitoringDashboard',
      component: () => import('../../pages/system/monitoring/Dashboard.vue'),
    },
    {
      path: 'Alertmanager',
      name: 'monitoringAlertmanager',
      children: [
        {
          path: '',
          name: 'monitoringAlertmanagerAllTable',
          component: () => import('../../pages/system/monitoring/AlertmanagerList.vue'),
        },
        {
          path: ':namespace',
          name: 'monitoringAlertmanagerTable',
          component: () => import('../../pages/system/monitoring/AlertmanagerList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'monitoringAlertmanagerView',
          component: () => import('../../pages/system/monitoring/AlertmanagerView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'monitoringAlertmanagerEdit',
          component: () => import('../../pages/system/monitoring/AlertmanagerEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'monitoringAlertmanagerCreate',
          component: () => import('../../pages/system/monitoring/AlertmanagerNew.vue'),
        }
      ]
    },
    {
      path: 'PodMonitor',
      name: 'monitoringPodMonitor',
      children: [
        {
          path: '',
          name: 'monitoringPodMonitorAllTable',
          component: () => import('../../pages/system/monitoring/PodMonitorList.vue'),
        },
        {
          path: ':namespace',
          name: 'monitoringPodMonitorTable',
          component: () => import('../../pages/system/monitoring/PodMonitorList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'monitoringPodMonitorView',
          component: () => import('../../pages/system/monitoring/PodMonitorView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'monitoringPodMonitorEdit',
          component: () => import('../../pages/system/monitoring/PodMonitorEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'monitoringPodMonitorCreate',
          component: () => import('../../pages/system/monitoring/PodMonitorNew.vue'),
        }
      ]
    },
    {
      path: 'Probe',
      name: 'monitoringProbe',
      children: [
        {
          path: '',
          name: 'monitoringProbeAllTable',
          component: () => import('../../pages/system/monitoring/ProbeList.vue'),
        },
        {
          path: ':namespace',
          name: 'monitoringProbeTable',
          component: () => import('../../pages/system/monitoring/ProbeList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'monitoringProbeView',
          component: () => import('../../pages/system/monitoring/ProbeView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'monitoringProbeEdit',
          component: () => import('../../pages/system/monitoring/ProbeEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'monitoringProbeCreate',
          component: () => import('../../pages/system/monitoring/ProbeNew.vue'),
        }
      ]
    },
    {
      path: 'Prometheus',
      name: 'monitoringPrometheus',
      children: [
        {
          path: '',
          name: 'monitoringPrometheusAllTable',
          component: () => import('../../pages/system/monitoring/PrometheusList.vue'),
        },
        {
          path: ':namespace',
          name: 'monitoringPrometheusTable',
          component: () => import('../../pages/system/monitoring/PrometheusList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'monitoringPrometheusView',
          component: () => import('../../pages/system/monitoring/PrometheusView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'monitoringPrometheusEdit',
          component: () => import('../../pages/system/monitoring/PrometheusEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'monitoringPrometheusCreate',
          component: () => import('../../pages/system/monitoring/PrometheusNew.vue'),
        }
      ]
    },
    {
      path: 'PrometheusRule',
      name: 'monitoringPrometheusRule',
      children: [
        {
          path: '',
          name: 'monitoringPrometheusRuleAllTable',
          component: () => import('../../pages/system/monitoring/PrometheusRuleList.vue'),
        },
        {
          path: ':namespace',
          name: 'monitoringPrometheusRuleTable',
          component: () => import('../../pages/system/monitoring/PrometheusRuleList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'monitoringPrometheusRuleView',
          component: () => import('../../pages/system/monitoring/PrometheusRuleView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'monitoringPrometheusRuleEdit',
          component: () => import('../../pages/system/monitoring/PrometheusRuleEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'monitoringPrometheusRuleCreate',
          component: () => import('../../pages/system/monitoring/PrometheusRuleNew.vue'),
        }
      ]
    },
    {
      path: 'ServiceMonitor',
      name: 'monitoringServiceMonitor',
      children: [
        {
          path: '',
          name: 'monitoringServiceMonitorAllTable',
          component: () => import('../../pages/system/monitoring/ServiceMonitorList.vue'),
        },
        {
          path: ':namespace',
          name: 'monitoringServiceMonitorTable',
          component: () => import('../../pages/system/monitoring/ServiceMonitorList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'monitoringServiceMonitorView',
          component: () => import('../../pages/system/monitoring/ServiceMonitorView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'monitoringServiceMonitorEdit',
          component: () => import('../../pages/system/monitoring/ServiceMonitorEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'monitoringServiceMonitorCreate',
          component: () => import('../../pages/system/monitoring/ServiceMonitorNew.vue'),
        }
      ]
    },
    {
      path: 'ThanosRuler',
      name: 'monitoringThanosRuler',
      children: [
        {
          path: '',
          name: 'monitoringThanosRulerAllTable',
          component: () => import('../../pages/system/monitoring/ThanosRulerList.vue'),
        },
        {
          path: ':namespace',
          name: 'monitoringThanosRulerTable',
          component: () => import('../../pages/system/monitoring/ThanosRulerList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'monitoringThanosRulerView',
          component: () => import('../../pages/system/monitoring/ThanosRulerView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'monitoringThanosRulerEdit',
          component: () => import('../../pages/system/monitoring/ThanosRulerEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'monitoringThanosRulerCreate',
          component: () => import('../../pages/system/monitoring/ThanosRulerNew.vue'),
        }
      ]
    },
    {
      path: 'AlertmanagerConfig',
      name: 'monitoringAlertmanagerConfig',
      children: [
        {
          path: '',
          name: 'monitoringAlertmanagerConfigAllTable',
          component: () => import('../../pages/system/monitoring/AlertmanagerConfigList.vue'),
        },
        {
          path: ':namespace',
          name: 'monitoringAlertmanagerConfigTable',
          component: () => import('../../pages/system/monitoring/AlertmanagerConfigList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'monitoringAlertmanagerConfigView',
          component: () => import('../../pages/system/monitoring/AlertmanagerConfigView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'monitoringAlertmanagerConfigEdit',
          component: () => import('../../pages/system/monitoring/AlertmanagerConfigEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'monitoringAlertmanagerConfigCreate',
          component: () => import('../../pages/system/monitoring/AlertmanagerConfigNew.vue'),
        }
      ]
    },
    {
      path: 'PrometheusAgent',
      name: 'monitoringPrometheusAgent',
      children: [
        {
          path: '',
          name: 'monitoringPrometheusAgentAllTable',
          component: () => import('../../pages/system/monitoring/PrometheusAgentList.vue'),
        },
        {
          path: ':namespace',
          name: 'monitoringPrometheusAgentTable',
          component: () => import('../../pages/system/monitoring/PrometheusAgentList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'monitoringPrometheusAgentView',
          component: () => import('../../pages/system/monitoring/PrometheusAgentView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'monitoringPrometheusAgentEdit',
          component: () => import('../../pages/system/monitoring/PrometheusAgentEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'monitoringPrometheusAgentCreate',
          component: () => import('../../pages/system/monitoring/PrometheusAgentNew.vue'),
        }
      ]
    },
  ],
}
export default route
