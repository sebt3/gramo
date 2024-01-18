import { lists } from './query.PrometheusRule.js'
export const resolver = {
    monitoringPrometheusRules: async (parent, args: object) => {
        return lists.monitoringPrometheusRules(parent,{namespace: parent.metadata.name, ...args})
    }
};
