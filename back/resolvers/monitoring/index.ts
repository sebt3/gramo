import { queries as customQueries, resolvers as customResolvers, mutations as customMutations } from './custom.js';
import { mutations as AlertmanagerMutations, resolvers as AlertmanagerResolvers } from './Alertmanager.js';
import { mutations as PodMonitorMutations, resolvers as PodMonitorResolvers } from './PodMonitor.js';
import { mutations as ProbeMutations, resolvers as ProbeResolvers } from './Probe.js';
import { mutations as PrometheusMutations, resolvers as PrometheusResolvers } from './Prometheus.js';
import { mutations as PrometheusRuleMutations, resolvers as PrometheusRuleResolvers } from './PrometheusRule.js';
import { mutations as ServiceMonitorMutations, resolvers as ServiceMonitorResolvers } from './ServiceMonitor.js';
import { mutations as ThanosRulerMutations, resolvers as ThanosRulerResolvers } from './ThanosRuler.js';
import { mutations as AlertmanagerConfigMutations, resolvers as AlertmanagerConfigResolvers } from './AlertmanagerConfig.js';
import { mutations as PrometheusAgentMutations, resolvers as PrometheusAgentResolvers } from './PrometheusAgent.js';
export const queries = {
    ...customQueries
};

export const resolvers = {
    ...AlertmanagerResolvers,
    ...PodMonitorResolvers,
    ...ProbeResolvers,
    ...PrometheusResolvers,
    ...PrometheusRuleResolvers,
    ...ServiceMonitorResolvers,
    ...ThanosRulerResolvers,
    ...AlertmanagerConfigResolvers,
    ...PrometheusAgentResolvers,
    ...customResolvers
};

export const mutations = {
    ...AlertmanagerMutations,
    ...PodMonitorMutations,
    ...ProbeMutations,
    ...PrometheusMutations,
    ...PrometheusRuleMutations,
    ...ServiceMonitorMutations,
    ...ThanosRulerMutations,
    ...AlertmanagerConfigMutations,
    ...PrometheusAgentMutations,
    ...customMutations
};
