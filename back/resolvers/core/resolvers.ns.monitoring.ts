
import { resolver as AlertmanagerNSresolver } from '../monitoring/resolver.namespace.Alertmanager.js';
import { resolver as PodMonitorNSresolver } from '../monitoring/resolver.namespace.PodMonitor.js';
import { resolver as ProbeNSresolver } from '../monitoring/resolver.namespace.Probe.js';
import { resolver as PrometheusNSresolver } from '../monitoring/resolver.namespace.Prometheus.js';
import { resolver as PrometheusRuleNSresolver } from '../monitoring/resolver.namespace.PrometheusRule.js';
import { resolver as ServiceMonitorNSresolver } from '../monitoring/resolver.namespace.ServiceMonitor.js';
import { resolver as ThanosRulerNSresolver } from '../monitoring/resolver.namespace.ThanosRuler.js';
import { resolver as AlertmanagerConfigNSresolver } from '../monitoring/resolver.namespace.AlertmanagerConfig.js';
import { resolver as PrometheusAgentNSresolver } from '../monitoring/resolver.namespace.PrometheusAgent.js';
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
