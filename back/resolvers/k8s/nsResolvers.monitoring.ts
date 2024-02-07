import { nsResolver as AlertmanagerNSresolver } from '../monitoring/Alertmanager.js';
import { nsResolver as PodMonitorNSresolver } from '../monitoring/PodMonitor.js';
import { nsResolver as ProbeNSresolver } from '../monitoring/Probe.js';
import { nsResolver as PrometheusNSresolver } from '../monitoring/Prometheus.js';
import { nsResolver as PrometheusRuleNSresolver } from '../monitoring/PrometheusRule.js';
import { nsResolver as ServiceMonitorNSresolver } from '../monitoring/ServiceMonitor.js';
import { nsResolver as ThanosRulerNSresolver } from '../monitoring/ThanosRuler.js';
import { nsResolver as AlertmanagerConfigNSresolver } from '../monitoring/AlertmanagerConfig.js';
import { nsResolver as PrometheusAgentNSresolver } from '../monitoring/PrometheusAgent.js';
export const resolvers = {
    ...AlertmanagerNSresolver,
    ...PodMonitorNSresolver,
    ...ProbeNSresolver,
    ...PrometheusNSresolver,
    ...PrometheusRuleNSresolver,
    ...ServiceMonitorNSresolver,
    ...ThanosRulerNSresolver,
    ...AlertmanagerConfigNSresolver,
    ...PrometheusAgentNSresolver,
};
