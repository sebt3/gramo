
import { queries as AlertmanagerQueries } from './query.Alertmanager.js';
import { mutations as AlertmanagerMutations } from './mutation.Alertmanager.js';
import { queries as PodMonitorQueries } from './query.PodMonitor.js';
import { mutations as PodMonitorMutations } from './mutation.PodMonitor.js';
import { queries as ProbeQueries } from './query.Probe.js';
import { mutations as ProbeMutations } from './mutation.Probe.js';
import { queries as PrometheusQueries } from './query.Prometheus.js';
import { mutations as PrometheusMutations } from './mutation.Prometheus.js';
import { queries as PrometheusRuleQueries } from './query.PrometheusRule.js';
import { mutations as PrometheusRuleMutations } from './mutation.PrometheusRule.js';
import { queries as ServiceMonitorQueries } from './query.ServiceMonitor.js';
import { mutations as ServiceMonitorMutations } from './mutation.ServiceMonitor.js';
import { queries as ThanosRulerQueries } from './query.ThanosRuler.js';
import { mutations as ThanosRulerMutations } from './mutation.ThanosRuler.js';
import { queries as AlertmanagerConfigQueries } from './query.AlertmanagerConfig.js';
import { mutations as AlertmanagerConfigMutations } from './mutation.AlertmanagerConfig.js';
import { queries as PrometheusAgentQueries } from './query.PrometheusAgent.js';
import { mutations as PrometheusAgentMutations } from './mutation.PrometheusAgent.js';
export const queries = {
    ...AlertmanagerQueries,
    ...PodMonitorQueries,
    ...ProbeQueries,
    ...PrometheusQueries,
    ...PrometheusRuleQueries,
    ...ServiceMonitorQueries,
    ...ThanosRulerQueries,
    ...AlertmanagerConfigQueries,
    ...PrometheusAgentQueries,
};

export const resolvers = {
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
};
