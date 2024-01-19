import {menuLinksProps} from '../interfaces';
const cat = 'system';
const iconAlertmanager = 'album';
const iconPodMonitor = 'album';
const iconProbe = 'album';
const iconPrometheus = 'album';
const iconPrometheusRule = 'album';
const iconServiceMonitor = 'album';
const iconThanosRuler = 'album';
const iconAlertmanagerConfig = 'album';
const iconPrometheusAgent = 'album';
export const link:menuLinksProps = {
  name: 'monitoring',
  title: 'Monitoring', icon: iconPrometheus,
  link: `/${cat}/monitoring/prometheusrules/`,
  level: 1,
  children: [
  {
    name: 'monitoringPrometheuss',
    title: 'Prometheus', caption: 'List prometheus', icon: iconPrometheus,
    link: `/${cat}/monitoring/prometheuses/`, level: 2, children: []
  },
  {
    name: 'monitoringAlertmanagers',
    title: 'Alertmanager', caption: 'List alertmanager', icon: iconAlertmanager,
    link: `/${cat}/monitoring/alertmanagers/`, level: 2, children: []
  },
  {
    name: 'monitoringPrometheusAgents',
    title: 'PrometheusAgent', caption: 'List prometheusAgent', icon: iconPrometheusAgent,
    link: `/${cat}/monitoring/prometheusagents/`, level: 2, children: []
  },
  {
    name: 'monitoringPrometheusRules',
    title: 'PrometheusRule', caption: 'List prometheusRule', icon: iconPrometheusRule,
    link: `/${cat}/monitoring/prometheusrules/`, level: 2, children: []
  },
  {
    name: 'monitoringServiceMonitors',
    title: 'ServiceMonitor', caption: 'List serviceMonitor', icon: iconServiceMonitor,
    link: `/${cat}/monitoring/servicemonitors/`, level: 2, children: []
  },
  {
    name: 'monitoringPodMonitors',
    title: 'PodMonitor', caption: 'List podMonitor', icon: iconPodMonitor,
    link: `/${cat}/monitoring/podmonitors/`, level: 2, children: []
  },
  {
    name: 'monitoringProbes',
    title: 'Probe', caption: 'List probe', icon: iconProbe,
    link: `/${cat}/monitoring/probes/`, level: 2, children: []
  },
  {
    name: 'monitoringThanosRulers',
    title: 'ThanosRuler', caption: 'List thanosRuler', icon: iconThanosRuler,
    link: `/${cat}/monitoring/thanosrulers/`, level: 2, children: []
  },
  {
    name: 'monitoringAlertmanagerConfigs',
    title: 'AlertmanagerConfig', caption: 'List alertmanagerConfig', icon: iconAlertmanagerConfig,
    link: `/${cat}/monitoring/alertmanagerconfigs/`, level: 2, children: []
  },
  ]
}
export const descriptions = {
  monitoring:                {breadcrumb: 'Monitoring', icon: iconAlertmanager, ns: false},
  monitoringAlertmanagers:        {breadcrumb: 'Alertmanager', icon: iconAlertmanager, ns: false},
  monitoringAlertmanagerAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  monitoringAlertmanagerTable:    {breadcrumb: 'List', icon: 'list', ns: true},
  monitoringAlertmanagerView:     {breadcrumb: 'View', icon: iconAlertmanager, ns: true},
  monitoringAlertmanagerEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true},
  monitoringAlertmanagerCreate:   {breadcrumb: 'Create', icon: 'add', ns: true},
  monitoringPodMonitors:        {breadcrumb: 'PodMonitor', icon: iconPodMonitor, ns: false},
  monitoringPodMonitorAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  monitoringPodMonitorTable:    {breadcrumb: 'List', icon: 'list', ns: true},
  monitoringPodMonitorView:     {breadcrumb: 'View', icon: iconPodMonitor, ns: true},
  monitoringPodMonitorEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true},
  monitoringPodMonitorCreate:   {breadcrumb: 'Create', icon: 'add', ns: true},
  monitoringProbes:        {breadcrumb: 'Probe', icon: iconProbe, ns: false},
  monitoringProbeAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  monitoringProbeTable:    {breadcrumb: 'List', icon: 'list', ns: true},
  monitoringProbeView:     {breadcrumb: 'View', icon: iconProbe, ns: true},
  monitoringProbeEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true},
  monitoringProbeCreate:   {breadcrumb: 'Create', icon: 'add', ns: true},
  monitoringPrometheuss:        {breadcrumb: 'Prometheus', icon: iconPrometheus, ns: false},
  monitoringPrometheusAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  monitoringPrometheusTable:    {breadcrumb: 'List', icon: 'list', ns: true},
  monitoringPrometheusView:     {breadcrumb: 'View', icon: iconPrometheus, ns: true},
  monitoringPrometheusEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true},
  monitoringPrometheusCreate:   {breadcrumb: 'Create', icon: 'add', ns: true},
  monitoringPrometheusRules:        {breadcrumb: 'PrometheusRule', icon: iconPrometheusRule, ns: false},
  monitoringPrometheusRuleAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  monitoringPrometheusRuleTable:    {breadcrumb: 'List', icon: 'list', ns: true},
  monitoringPrometheusRuleView:     {breadcrumb: 'View', icon: iconPrometheusRule, ns: true},
  monitoringPrometheusRuleEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true},
  monitoringPrometheusRuleCreate:   {breadcrumb: 'Create', icon: 'add', ns: true},
  monitoringServiceMonitors:        {breadcrumb: 'ServiceMonitor', icon: iconServiceMonitor, ns: false},
  monitoringServiceMonitorAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  monitoringServiceMonitorTable:    {breadcrumb: 'List', icon: 'list', ns: true},
  monitoringServiceMonitorView:     {breadcrumb: 'View', icon: iconServiceMonitor, ns: true},
  monitoringServiceMonitorEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true},
  monitoringServiceMonitorCreate:   {breadcrumb: 'Create', icon: 'add', ns: true},
  monitoringThanosRulers:        {breadcrumb: 'ThanosRuler', icon: iconThanosRuler, ns: false},
  monitoringThanosRulerAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  monitoringThanosRulerTable:    {breadcrumb: 'List', icon: 'list', ns: true},
  monitoringThanosRulerView:     {breadcrumb: 'View', icon: iconThanosRuler, ns: true},
  monitoringThanosRulerEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true},
  monitoringThanosRulerCreate:   {breadcrumb: 'Create', icon: 'add', ns: true},
  monitoringAlertmanagerConfigs:        {breadcrumb: 'AlertmanagerConfig', icon: iconAlertmanagerConfig, ns: false},
  monitoringAlertmanagerConfigAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  monitoringAlertmanagerConfigTable:    {breadcrumb: 'List', icon: 'list', ns: true},
  monitoringAlertmanagerConfigView:     {breadcrumb: 'View', icon: iconAlertmanagerConfig, ns: true},
  monitoringAlertmanagerConfigEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true},
  monitoringAlertmanagerConfigCreate:   {breadcrumb: 'Create', icon: 'add', ns: true},
  monitoringPrometheusAgents:        {breadcrumb: 'PrometheusAgent', icon: iconPrometheusAgent, ns: false},
  monitoringPrometheusAgentAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  monitoringPrometheusAgentTable:    {breadcrumb: 'List', icon: 'list', ns: true},
  monitoringPrometheusAgentView:     {breadcrumb: 'View', icon: iconPrometheusAgent, ns: true},
  monitoringPrometheusAgentEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true},
  monitoringPrometheusAgentCreate:   {breadcrumb: 'Create', icon: 'add', ns: true},
}
export const route = {
  path: 'monitoring',
  name: 'monitoring',
  redirect: {path: link.link as string},
  children: [
    {
      path: 'alertmanagers',
      name: 'monitoringAlertmanagers',
      children: [
        {
          path: '',
          name: 'monitoringAlertmanagerAllTable',
          component: () => import('../../components/monitoring/AlertmanagerAllTable.vue'),
        },
        {
          path: ':namespace',
          name: 'monitoringAlertmanagerTable',
          component: () => import('../../components/monitoring/AlertmanagerTable.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'monitoringAlertmanagerView',
          component: () => import('../../components/monitoring/AlertmanagerView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'monitoringAlertmanagerEdit',
          component: () => import('../../components/monitoring/AlertmanagerEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'monitoringAlertmanagerCreate',
          component: () => import('../../components/monitoring/AlertmanagerNew.vue'),
        }
      ]
    },
    {
      path: 'podmonitors',
      name: 'monitoringPodMonitors',
      children: [
        {
          path: '',
          name: 'monitoringPodMonitorAllTable',
          component: () => import('../../components/monitoring/PodMonitorAllTable.vue'),
        },
        {
          path: ':namespace',
          name: 'monitoringPodMonitorTable',
          component: () => import('../../components/monitoring/PodMonitorTable.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'monitoringPodMonitorView',
          component: () => import('../../components/monitoring/PodMonitorView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'monitoringPodMonitorEdit',
          component: () => import('../../components/monitoring/PodMonitorEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'monitoringPodMonitorCreate',
          component: () => import('../../components/monitoring/PodMonitorNew.vue'),
        }
      ]
    },
    {
      path: 'probes',
      name: 'monitoringProbes',
      children: [
        {
          path: '',
          name: 'monitoringProbeAllTable',
          component: () => import('../../components/monitoring/ProbeAllTable.vue'),
        },
        {
          path: ':namespace',
          name: 'monitoringProbeTable',
          component: () => import('../../components/monitoring/ProbeTable.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'monitoringProbeView',
          component: () => import('../../components/monitoring/ProbeView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'monitoringProbeEdit',
          component: () => import('../../components/monitoring/ProbeEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'monitoringProbeCreate',
          component: () => import('../../components/monitoring/ProbeNew.vue'),
        }
      ]
    },
    {
      path: 'prometheuses',
      name: 'monitoringPrometheuss',
      children: [
        {
          path: '',
          name: 'monitoringPrometheusAllTable',
          component: () => import('../../components/monitoring/PrometheusAllTable.vue'),
        },
        {
          path: ':namespace',
          name: 'monitoringPrometheusTable',
          component: () => import('../../components/monitoring/PrometheusTable.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'monitoringPrometheusView',
          component: () => import('../../components/monitoring/PrometheusView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'monitoringPrometheusEdit',
          component: () => import('../../components/monitoring/PrometheusEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'monitoringPrometheusCreate',
          component: () => import('../../components/monitoring/PrometheusNew.vue'),
        }
      ]
    },
    {
      path: 'prometheusrules',
      name: 'monitoringPrometheusRules',
      children: [
        {
          path: '',
          name: 'monitoringPrometheusRuleAllTable',
          component: () => import('../../components/monitoring/PrometheusRuleAllTable.vue'),
        },
        {
          path: ':namespace',
          name: 'monitoringPrometheusRuleTable',
          component: () => import('../../components/monitoring/PrometheusRuleTable.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'monitoringPrometheusRuleView',
          component: () => import('../../components/monitoring/PrometheusRuleView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'monitoringPrometheusRuleEdit',
          component: () => import('../../components/monitoring/PrometheusRuleEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'monitoringPrometheusRuleCreate',
          component: () => import('../../components/monitoring/PrometheusRuleNew.vue'),
        }
      ]
    },
    {
      path: 'servicemonitors',
      name: 'monitoringServiceMonitors',
      children: [
        {
          path: '',
          name: 'monitoringServiceMonitorAllTable',
          component: () => import('../../components/monitoring/ServiceMonitorAllTable.vue'),
        },
        {
          path: ':namespace',
          name: 'monitoringServiceMonitorTable',
          component: () => import('../../components/monitoring/ServiceMonitorTable.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'monitoringServiceMonitorView',
          component: () => import('../../components/monitoring/ServiceMonitorView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'monitoringServiceMonitorEdit',
          component: () => import('../../components/monitoring/ServiceMonitorEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'monitoringServiceMonitorCreate',
          component: () => import('../../components/monitoring/ServiceMonitorNew.vue'),
        }
      ]
    },
    {
      path: 'thanosrulers',
      name: 'monitoringThanosRulers',
      children: [
        {
          path: '',
          name: 'monitoringThanosRulerAllTable',
          component: () => import('../../components/monitoring/ThanosRulerAllTable.vue'),
        },
        {
          path: ':namespace',
          name: 'monitoringThanosRulerTable',
          component: () => import('../../components/monitoring/ThanosRulerTable.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'monitoringThanosRulerView',
          component: () => import('../../components/monitoring/ThanosRulerView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'monitoringThanosRulerEdit',
          component: () => import('../../components/monitoring/ThanosRulerEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'monitoringThanosRulerCreate',
          component: () => import('../../components/monitoring/ThanosRulerNew.vue'),
        }
      ]
    },
    {
      path: 'alertmanagerconfigs',
      name: 'monitoringAlertmanagerConfigs',
      children: [
        {
          path: '',
          name: 'monitoringAlertmanagerConfigAllTable',
          component: () => import('../../components/monitoring/AlertmanagerConfigAllTable.vue'),
        },
        {
          path: ':namespace',
          name: 'monitoringAlertmanagerConfigTable',
          component: () => import('../../components/monitoring/AlertmanagerConfigTable.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'monitoringAlertmanagerConfigView',
          component: () => import('../../components/monitoring/AlertmanagerConfigView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'monitoringAlertmanagerConfigEdit',
          component: () => import('../../components/monitoring/AlertmanagerConfigEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'monitoringAlertmanagerConfigCreate',
          component: () => import('../../components/monitoring/AlertmanagerConfigNew.vue'),
        }
      ]
    },
    {
      path: 'prometheusagents',
      name: 'monitoringPrometheusAgents',
      children: [
        {
          path: '',
          name: 'monitoringPrometheusAgentAllTable',
          component: () => import('../../components/monitoring/PrometheusAgentAllTable.vue'),
        },
        {
          path: ':namespace',
          name: 'monitoringPrometheusAgentTable',
          component: () => import('../../components/monitoring/PrometheusAgentTable.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'monitoringPrometheusAgentView',
          component: () => import('../../components/monitoring/PrometheusAgentView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'monitoringPrometheusAgentEdit',
          component: () => import('../../components/monitoring/PrometheusAgentEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'monitoringPrometheusAgentCreate',
          component: () => import('../../components/monitoring/PrometheusAgentNew.vue'),
        }
      ]
    },
  ],
}
export default route
